// ══════════════════════════════════════════
// CORNAi — AO Extractor (Gemini + DB)
// ══════════════════════════════════════════

import { db } from '@/database/client'
import { appelsOffres } from '@/database/schema'
import { extraireAO } from '@/lib/gemini'
import { eq, or, desc } from 'drizzle-orm'
import { z } from 'zod'

// Schéma Zod pour validation
const AO_SCHEMA = z.object({
  numero_marche: z.string().nullable(),
  titre_complet: z.string(),
  resume: z.string().nullable(),
  type_marche: z.enum(['travaux', 'fournitures', 'services', 'prestations_intellectuelles']).default('travaux'),
  institution: z.string(),
  direction: z.string().nullable(),
  budget_estime: z.number().nullable(),
  source_financement: z.string().nullable(),
  date_publication: z.string().nullable(),
  date_limite_soumission: z.string().nullable(),
  lieu_execution: z.string().nullable(),
  region_execution: z.string().nullable(),
  ville_execution: z.string().nullable(),
  lieu_depot: z.string().nullable(),
  caution_soumission_montant: z.number().nullable(),
  visite_obligatoire: z.boolean().default(false),
  visite_date: z.string().nullable(),
  visite_lieu: z.string().nullable(),
  mode_passation: z.string().nullable(),
  mode_evaluation: z.enum(['binaire', 'points', 'mixte']).default('binaire'),
  seuil_technique: z.number().nullable(),
  delai_execution: z.string().nullable(),
  est_alloti: z.boolean().default(false),
  finance_par_bailleur: z.boolean().default(false),
  bailleur: z.string().nullable(),
  pieces_requises: z.array(z.any()).nullable(),
  criteres_eliminatoires: z.array(z.string()).nullable(),
})

/**
 * Parse une date de manière sécurisée
 */
function safeDate(dateStr: string | null | undefined): Date | null {
  if (!dateStr) return null
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? null : d
}

/**
 * Prend du texte brut d'un AO, l'extrait via Gemini et le stocke en base
 */
export async function extraireEtStocker(
  texteBrut: string, 
  source: 'armp' | 'coleps' | 'other' = 'armp',
  urlOriginale?: string
) {
  console.log(`\n🧠 Parser : Extraction IA Gemini en cours...`)
  
  try {
    // 1. Extraction via Gemini
    const rawJSON = await extraireAO(texteBrut)
    
    // 2. Validation avec Zod
    const validatedData = AO_SCHEMA.parse(rawJSON)
    
    // 3. Vérifier si l'AO existe déjà par numéro de marché ou titre
    const existingAO = await db.query.appelsOffres.findFirst({
      where: or(
        validatedData.numero_marche ? eq(appelsOffres.numeroMarche, validatedData.numero_marche) : undefined,
        eq(appelsOffres.titreComplet, validatedData.titre_complet)
      )
    })

    // 4. Préparation des dates
    const datePublication = safeDate(validatedData.date_publication) || new Date()
    const dateLimite = safeDate(validatedData.date_limite_soumission)
    const visiteDate = safeDate(validatedData.visite_date)

    const aoValues = {
      numeroMarche: validatedData.numero_marche,
      titreComplet: validatedData.titre_complet,
      resume: validatedData.resume,
      typeMarche: validatedData.type_marche,
      institution: validatedData.institution,
      direction: validatedData.direction,
      budgetEstime: validatedData.budget_estime,
      sourceFinancement: validatedData.source_financement,
      datePublication: datePublication.toISOString().split('T')[0],
      dateLimiteSoumission: dateLimite,
      lieuExecution: validatedData.lieu_execution,
      regionExecution: validatedData.region_execution,
      villeExecution: validatedData.ville_execution,
      lieuDepot: validatedData.lieu_depot,
      cautionMontant: validatedData.caution_soumission_montant,
      visiteObligatoire: validatedData.visite_obligatoire,
      visiteDate: visiteDate ? visiteDate.toISOString().split('T')[0] : null,
      visiteLieu: validatedData.visite_lieu,
      modePassation: validatedData.mode_passation,
      modeEvaluation: validatedData.mode_evaluation,
      seuilTechnique: validatedData.seuil_technique ? String(validatedData.seuil_technique) : null,
      delaiExecution: validatedData.delai_execution,
      estAlloti: validatedData.est_alloti,
      financeParBailleur: validatedData.finance_par_bailleur,
      bailleur: validatedData.bailleur,
      statut: 'actif' as const,
      sourceScraping: source,
      urlSource: urlOriginale || null,
      updatedAt: new Date()
    }

    if (existingAO) {
      console.log(`♻️ MÀJ : AO "${validatedData.titre_complet.substring(0, 30)}..." existe déjà. Mise à jour...`)
      const [updated] = await db
        .update(appelsOffres)
        .set(aoValues)
        .where(eq(appelsOffres.id, existingAO.id))
        .returning()
      return updated
    } else {
      console.log(`✨ NOUVEAU : Insertion de l'AO "${validatedData.titre_complet.substring(0, 30)}..."`)
      const [inserted] = await db
        .insert(appelsOffres)
        .values({
          ...aoValues,
          id: crypto.randomUUID(),
          createdAt: new Date()
        })
        .returning()
      return inserted
    }
  } catch (error: any) {
    console.error(`❌ Erreur extraction/stockage: ${error?.message || String(error)}`)
    throw error
  }
}
