// ══════════════════════════════════════════
// SABI — Queries : Soumissions (Pipeline)
// ══════════════════════════════════════════

import { db } from '../client'
import { soumissions, appelsOffres } from '../schema'
import { eq, and, desc } from 'drizzle-orm'

/**
 * Récupère toutes les soumissions d'une entreprise avec les détails de l'AO
 */
export async function getSoumissionsByEntreprise(entrepriseId: string) {
  return await db.query.soumissions.findMany({
    where: eq(soumissions.entrepriseId, entrepriseId),
    orderBy: [desc(soumissions.updatedAt)],
    with: {
      appelOffre: true
    }
  })
}

/**
 * Récupère une soumission spécifique par son ID
 */
export async function getSoumissionById(id: string) {
  return await db.query.soumissions.findFirst({
    where: eq(soumissions.id, id),
    with: {
      appelOffre: true
    }
  })
}

/**
 * Compte le nombre de soumissions en cours
 */
export async function getSoumissionsEnCoursCount(entrepriseId: string) {
  const results = await db.query.soumissions.findMany({
    where: and(
      eq(soumissions.entrepriseId, entrepriseId),
      eq(soumissions.statut, 'depose') // Ou tout autre statut "en cours"
    )
  })
  return results.length
}
/**
 * Récupère une soumission complète avec toutes ses relations (AO, etc.)
 */
export async function getSoumissionComplete(id: string) {
  return await db.query.soumissions.findFirst({
    where: eq(soumissions.id, id),
    with: {
      appelOffre: true
    }
  })
}
