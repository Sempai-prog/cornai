"use server"

import { db } from "@/database/client"
import { matchings, soumissions, appelsOffres } from "@/database/schema"
import { eq, and, desc } from "drizzle-orm"
import { formatDistanceToNow, isAfter, isBefore } from "date-fns"
import { fr } from "date-fns/locale"

import { getMatchingsParEntreprise } from "@/database/queries/matching"

const DEMO_ENTREPRISE_ID = "cf83af70-d49b-4a72-8222-201f08a05a8a"

export type OpportunityStatus = 'QUALIF' | 'DECISION' | 'MONTAGE' | 'DEPOT' | 'ATTRIBUTION'

export interface Opportunity {
  id: string
  ac: string                     // MO
  type: string                   // AONO...
  title: string                  // Titre
  deadline: string               // J-X
  caution: string                // Caution
  envelopes: { a: boolean, b: boolean, c: boolean } 
  status: OpportunityStatus
  isUrgent?: boolean
  score: number                  // Matching IA (%)
}

export async function getPipelineOpportunities(): Promise<Opportunity[]> {
  try {
    // 1. Get all matchings for the enterprise using the query engine
    const allMatchings = await getMatchingsParEntreprise(DEMO_ENTREPRISE_ID, 50)

    // 2. Get all soumissions for the enterprise
    const allSoumissions = await db.query.soumissions.findMany({
      where: eq(soumissions.entrepriseId, DEMO_ENTREPRISE_ID)
    })

    // Create a map of soumissions by AO ID
    const soumissionMap = new Map(allSoumissions.map(s => [s.appelOffreId, s]))

    // 3. Map to Opportunity type
    const pipeline: Opportunity[] = allMatchings.map(m => {
      const ao = m.appelOffre
      const s = soumissionMap.get(ao.id)

      // Calculate Deadline string
      let deadlineStr = "Indéfini"
      let isUrgent = false
      if (ao.dateLimiteSoumission) {
        const now = new Date()
        const diffDays = Math.ceil((ao.dateLimiteSoumission.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        
        if (diffDays < 0) {
           deadlineStr = "Clos"
        } else if (diffDays === 0) {
           deadlineStr = "Aujourd'hui"
           isUrgent = true
        } else {
           deadlineStr = `J-${diffDays}`
           if (diffDays <= 5) isUrgent = true
        }
      }

      // Map status
      let status: OpportunityStatus = 'QUALIF'
      
      if (s) {
        if (s.statut === 'gagne' || s.statut === 'perdu') {
          status = 'ATTRIBUTION'
        } else if (s.statut === 'soumis' || s.statut === 'depose') {
          status = 'DEPOT'
        } else {
          status = 'MONTAGE'
        }
      } else {
        // High scores move to DECISION automatically for demo
        if (m.scoreTotal >= 92) {
          status = 'DECISION'
        } else {
          status = 'QUALIF'
        }
      }

      // Format Caution
      const cautionStr = ao.cautionMontant 
        ? `${(ao.cautionMontant / 1000000).toFixed(1)}M FCFA`
        : "N/A"

      return {
        id: ao.id,
        ac: ao.institution?.split(' ')[0] || "MO",
        type: ao.typeMarche || "AONO",
        title: ao.titreComplet,
        deadline: deadlineStr,
        caution: cautionStr,
        envelopes: { 
          a: !!s, 
          b: false, 
          c: false 
        }, // Simplification for demo
        status,
        isUrgent,
        score: m.scoreTotal
      }
    })

    return pipeline
  } catch (error) {
    console.error("[PIPELINE ERROR]", error)
    return []
  }
}
