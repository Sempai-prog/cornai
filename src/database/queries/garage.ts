// ══════════════════════════════════════════
// SABI — Queries : Garage (Volume B)
// ══════════════════════════════════════════

import { db } from '../client'
import { materielGlobal, soumissionEngins } from '../schema'
import { eq, and } from 'drizzle-orm'

/**
 * Récupère le parc global d'une entreprise
 */
export async function getParcEntreprise(entrepriseId: string) {
  return await db.query.materielGlobal.findMany({
    where: eq(materielGlobal.entrepriseId, entrepriseId)
  })
}

/**
 * Récupère les engins affectés à une soumission
 */
export async function getEnginsSoumission(soumissionId: string) {
  const affectations = await db.query.soumissionEngins.findMany({
    where: eq(soumissionEngins.soumissionId, soumissionId),
    with: {
        // @ts-ignore - Drizzle with relationships
      engin: true 
    }
  })
  return affectations
}
