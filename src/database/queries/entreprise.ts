// ══════════════════════════════════════════
// SABI — Queries : Entreprises
// ══════════════════════════════════════════

import { db } from '../client'
import { entreprises, documentsEntreprise } from '../schema'
import { eq, and } from 'drizzle-orm'

/**
 * Récupère une entreprise par ID
 */
export async function getEntrepriseById(id: string) {
  return await db.query.entreprises.findFirst({
    where: eq(entreprises.id, id),
  })
}

/**
 * Récupère une entreprise par numéro de téléphone
 */
export async function getEntrepriseByTelephone(telephone: string) {
  return await db.query.entreprises.findFirst({
    where: eq(entreprises.telephone, telephone),
  })
}

/**
 * Liste toutes les entreprises actives
 */
export async function getEntreprisesActives() {
  return await db.query.entreprises.findMany({
    where: eq(entreprises.actif, true),
  })
}

/**
 * Récupère les documents d'une entreprise
 */
export async function getDocumentsEntreprise(entrepriseId: string) {
  return await db.query.documentsEntreprise.findMany({
    where: eq(documentsEntreprise.entrepriseId, entrepriseId),
  })
}

/**
 * Crée une nouvelle entreprise
 */
export async function createEntreprise(data: any) {
  const [inserted] = await db
    .insert(entreprises)
    .values({
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning()
  return inserted
}

/**
 * Met à jour une entreprise
 */
export async function updateEntreprise(id: string, data: any) {
  const [updated] = await db
    .update(entreprises)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(entreprises.id, id))
    .returning()
  return updated
}
