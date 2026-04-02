// ══════════════════════════════════════════
// SABI — Profile Matcher (Orchestrator)
// ══════════════════════════════════════════

import { db } from '../database/client'
import { matchings, appelsOffres, entreprises } from '../database/schema'
import { getEntrepriseById, getDocumentsEntreprise, getEntreprisesActives } from '../database/queries/entreprise'
import { getAOActifs, upsertMatching } from '../database/queries/matching'
import { calculerScore } from './score-calculator'
import { eq, and, gte } from 'drizzle-orm'

/**
 * Lance le matching complet pour une entreprise contre TOUS les AO actifs
 */
export async function matcherTousLesAO(entrepriseId: string) {
  console.log(`\n🧠 Matching : Calcul des opportunités pour l'entreprise ${entrepriseId}...`)
  
  const entreprise = await getEntrepriseById(entrepriseId)
  if (!entreprise) {
    throw new Error(`Entreprise ${entrepriseId} introuvable.`)
  }

  const docs = await getDocumentsEntreprise(entrepriseId)
  const aos = await getAOActifs()
  
  console.log(`🔎 Comparaison avec ${aos.length} AO actifs...`)
  
  const results = []

  for (const ao of aos) {
    const scoreData = calculerScore(entreprise, ao, docs)
    
    // On ne stocke que les scores > 0 (ou on stocke tout mais on filtre à l'affichage)
    if (scoreData.scoreTotal > 0) {
      const match = await upsertMatching({
        entrepriseId: entrepriseId,
        appelOffreId: ao.id,
        scoreTotal: scoreData.scoreTotal,
        scoreSecteur: scoreData.scoreSecteur,
        scoreBudget: scoreData.scoreBudget,
        scoreLocalisation: scoreData.scoreLocalisation,
        scoreExperience: scoreData.scoreExperience,
        scoreDocuments: scoreData.scoreDocuments,
        scoreDelai: scoreData.scoreDelai,
        details: scoreData.details,
        notifie: false
      })
      results.push({ ...match, appelOffre: ao })
    }
  }

  // Trier par score décroissant
  return results.sort((a, b) => b.scoreTotal - a.scoreTotal)
}

/**
 * Quand un NOUVEL AO arrive, on cherche toutes les entreprises qui matchent
 * Utilisé pour les notifications WhatsApp push
 */
export async function matcherNouveauxAO(appelOffreId: string) {
  console.log(`\n🧠 Matching : Nouveau marché détecté (${appelOffreId}). Recherche de PME candidates...`)
  
  const ao = await db.query.appelsOffres.findFirst({
    where: eq(appelsOffres.id, appelOffreId)
  })
  if (!ao) throw new Error("AO introuvable.")

  const entreprisesCandidates = await getEntreprisesActives()
  const matchingEntreprises = []

  for (const pme of entreprisesCandidates) {
    const docs = await getDocumentsEntreprise(pme.id)
    const scoreData = calculerScore(pme, ao, docs)
    
    // Seuil de notification arbitraire à 60%
    if (scoreData.scoreTotal >= 60) {
      await upsertMatching({
        entrepriseId: pme.id,
        appelOffreId: ao.id,
        scoreTotal: scoreData.scoreTotal,
        scoreSecteur: scoreData.scoreSecteur,
        scoreBudget: scoreData.scoreBudget,
        scoreLocalisation: scoreData.scoreLocalisation,
        scoreExperience: scoreData.scoreExperience,
        scoreDocuments: scoreData.scoreDocuments,
        scoreDelai: scoreData.scoreDelai,
        details: scoreData.details,
        notifie: false
      })
      matchingEntreprises.push({ pme, scoreData })
    }
  }

  console.log(`✅ ${matchingEntreprises.length} PME candidates trouvées pour ce marché.`)
  return matchingEntreprises
}
