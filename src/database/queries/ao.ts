// ══════════════════════════════════════════
// SABI — Queries : Appels d'Offres (AO)
// ══════════════════════════════════════════

import { db } from '../client'
import { appelsOffres } from '../schema'
import { eq, and, desc } from 'drizzle-orm'

/**
 * Récupère un AO par son ID
 */
export async function getAOById(id: string) {
  return await db.query.appelsOffres.findFirst({
    where: eq(appelsOffres.id, id),
  })
}

/**
 * Récupère un AO par son numéro (si disponible)
 */
export async function getAOByNumero(numero: string) {
  return await db.query.appelsOffres.findFirst({
    where: eq(appelsOffres.numeroMarche, numero),
  })
}

/**
 * Liste les derniers AO scrappés
 */
export async function getDerniersAO(limit: number = 10) {
  return await db.query.appelsOffres.findMany({
    orderBy: [desc(appelsOffres.createdAt)],
    limit: limit,
  })
}
