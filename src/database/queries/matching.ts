// ══════════════════════════════════════════
// SABI — Queries : Matchings
// ══════════════════════════════════════════

import { db } from '../client'
import { matchings, appelsOffres } from '../schema'
import { eq, and, gte, desc, or, isNull } from 'drizzle-orm'

/**
 * Récupère les matchings par entreprise
 */
export async function getMatchingsParEntreprise(entrepriseId: string, limit: number = 10) {
  const results = await db
    .select({
      matching: matchings,
      appelOffre: appelsOffres,
    })
    .from(matchings)
    .leftJoin(appelsOffres, eq(matchings.appelOffreId, appelsOffres.id))
    .where(eq(matchings.entrepriseId, entrepriseId))
    .orderBy(desc(matchings.scoreTotal))
    .limit(limit);

  return results.map(r => ({
    ...r.matching,
    appelOffre: r.appelOffre,
  }));
}

/**
 * Récupère les matchings par AO
 */
export async function getMatchingsParAO(aoId: string, scoreMin: number = 60) {
  // Ici on aurait besoin de 'entreprises' mais il n'est pas importé. 
  // Je vais simplifier sans le with: entreprise pour l'instant ou l'importer.
  // Utilisons le findMany car l'erreur était sur soumissions et matchings/entreprise
  return await db.query.matchings.findMany({
    where: and(
      eq(matchings.appelOffreId, aoId),
      gte(matchings.scoreTotal, scoreMin)
    ),
  })
}

/**
 * Récupère un matching spécifique
 */
export async function getMatchingByAO(aoId: string, entrepriseId: string) {
  return await db.query.matchings.findFirst({
    where: and(
      eq(matchings.appelOffreId, aoId),
      eq(matchings.entrepriseId, entrepriseId)
    )
  })
}

/**
 * Crée ou met à jour un matching (upsert)
 */
export async function upsertMatching(data: any) {
  // On utilise l'ID composé si on l'avait défini, sinon on check manuellement
  const existing = await db.query.matchings.findFirst({
    where: and(
      eq(matchings.entrepriseId, data.entrepriseId),
      eq(matchings.appelOffreId, data.appelOffreId)
    )
  })

  if (existing) {
    const [updated] = await db
      .update(matchings)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(matchings.id, existing.id))
      .returning()
    return updated
  } else {
    const [inserted] = await db
      .insert(matchings)
      .values({
         ...data,
         id: crypto.randomUUID(),
         createdAt: new Date(),
         updatedAt: new Date(),
      })
      .returning()
    return inserted
  }
}

/**
 * Liste tous les AO actifs
 */
export async function getAOActifs() {
  return await db.query.appelsOffres.findMany({
    where: and(
      eq(appelsOffres.statut, 'actif'),
      or(
        gte(appelsOffres.dateLimiteSoumission, new Date()),
        isNull(appelsOffres.dateLimiteSoumission)
      )
    ),
  })
}
