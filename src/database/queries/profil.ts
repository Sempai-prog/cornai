// ══════════════════════════════════════════
// SABI — Queries : Profil Expert
// ══════════════════════════════════════════

import { db } from '../client'
import { entreprises, referencesEntreprise } from '../schema'
import { eq, desc } from 'drizzle-orm'

/**
 * Récupère le profil complet d'une entreprise (Identité + Finances)
 */
export async function getProfilEntreprise(id: string) {
  return await db.query.entreprises.findFirst({
    where: eq(entreprises.id, id),
  })
}

/**
 * Récupère les références techniques d'une entreprise
 */
export async function getReferencesEntreprise(entrepriseId: string) {
  return await db.query.referencesEntreprise.findMany({
    where: eq(referencesEntreprise.entrepriseId, entrepriseId),
    orderBy: [desc(referencesEntreprise.annee)]
  })
}

/**
 * Calcule l'âge de l'entreprise
 */
export function calculateCompanyAge(dateCreation: string | Date | null) {
  if (!dateCreation) return 0;
  const birth = new Date(dateCreation);
  const now = new Date();
  return now.getFullYear() - birth.getFullYear();
}
