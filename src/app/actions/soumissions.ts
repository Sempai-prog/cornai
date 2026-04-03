"use server"

import { db } from "@/database/client"
import { soumissions } from "@/database/schema"
import { eq, and } from "drizzle-orm"
import { redirect } from "next/navigation"

/**
 * Crée ou récupère une soumission existante pour un Appel d'Offres.
 * Règle : Une entreprise ne peut avoir qu'une seule soumission active par AO.
 */
export async function createOrGetSoumission(aoId: string) {
  // TODO: Remplacer par l'ID de l'entreprise connectée (Auth context)
  const entrepriseId = "cf83af70-d49b-4a72-8222-201f08a05a8a"

  try {
    // 1. Vérifier si une soumission existe déjà pour cet AO et cette entreprise
    const existing = await db.query.soumissions.findFirst({
      where: and(
        eq(soumissions.entrepriseId, entrepriseId),
        eq(soumissions.appelOffreId, aoId)
      )
    })

    if (existing) {
      return { success: true, id: existing.id }
    }

    // 2. Créer une nouvelle soumission si elle n'existe pas
    const [newSoumission] = await db.insert(soumissions).values({
      entrepriseId,
      appelOffreId: aoId,
      statut: 'en_preparation'
    }).returning({ id: soumissions.id })

    return { success: true, id: newSoumission.id }
  } catch (error) {
    console.error(`[SOUMISSION ERROR] Impossible de créer/récupérer la soumission:`, error)
    return { success: false, error: "Erreur lors de la préparation du dossier" }
  }
}

/**
 * Action de redirection vers Le Terrain après création/récupération
 */
export async function startWorkflowAction(aoId: string) {
    const res = await createOrGetSoumission(aoId);
    if (res.success && res.id) {
        redirect(`/dashboard/terrain?soumissionId=${res.id}`);
    }
    return res;
}
