"use server"

import { db } from "@/database/client"
import { soumissions } from "@/database/schema"
import { eq, and } from "drizzle-orm"
import { getEntrepriseContext } from "@/lib/demo-config"
import { revalidatePath } from "next/cache"

/**
 * TÂCHE A.3 — Engager la Soumission
 * Crée ou récupère une soumission existante pour un Appel d'Offres.
 * Règle : Une entreprise ne peut avoir qu'une seule soumission active par AO.
 */
export async function createOrGetSoumission(
  appelOffreId: string
): Promise<{ success: boolean; id?: string; error?: string }> {

  try {
    const { entrepriseId } = await getEntrepriseContext()

    // 1. Vérifier qu'une soumission n'existe pas déjà pour cet AO
    const existante = await db.query.soumissions.findFirst({
      where: and(
        eq(soumissions.appelOffreId, appelOffreId),
        eq(soumissions.entrepriseId, entrepriseId)
      )
    })

    if (existante) {
      // Déjà engagé — Retourner l'ID pour redirection
      return { success: true, id: existante.id }
    }

    // 2. Créer la nouvelle soumission
    const [nouvelle] = await db.insert(soumissions).values({
      appelOffreId,
      entrepriseId,
      statut: 'analyse',        // ← Première colonne du Kanban (Conformité/Analyse)
      createdAt: new Date(),
    }).returning({ id: soumissions.id })

    // 3. Revalidation des paths impactés
    revalidatePath('/dashboard/soumissions')
    revalidatePath('/dashboard/appels-offres')

    return { success: true, id: nouvelle.id }
  } catch (error) {
    console.error(`[ENGAGER_SOUMISSION_ERROR]:`, error)
    return { success: false, error: "Erreur lors de l'engagement de l'affaire." }
  }
}

/**
 * Alias — Démarrer le workflow de soumission depuis la fiche AO
 */
export const startWorkflowAction = createOrGetSoumission
