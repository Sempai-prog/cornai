'use server'

import { db } from '@/database/client'
import { equipeProjet } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { getEntrepriseContext } from '@/lib/demo-config'

/**
 * Ajouter un membre à l'équipe d'une soumission
 */
export async function addMembreEquipe(
  soumissionId: string,
  entrepriseId: string,
  data: {
    nom: string,
    role: string,
    qualification?: string,
    experienceAnnees?: number,
  }
) {
  try {
    const [membre] = await db.insert(equipeProjet)
      .values({
        soumissionId,
        entrepriseId,
        nom: data.nom,
        role: data.role,
        qualification: data.qualification,
        experienceAnnees: data.experienceAnnees || 0,
        statut: 'incomplet'
      })
      .returning()

    revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain/equipe`)
    return { success: true, membre }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

/**
 * Supprimer un membre
 */
export async function deleteMembreEquipe(id: string, soumissionId: string) {
  try {
    await db.delete(equipeProjet).where(eq(equipeProjet.id, id))
    revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain/equipe`)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Alias simplifié pour la compatibilité avec DialogAjoutMembre (prend un seul objet)
export async function ajouterMembreEquipe(data: {
  nom: string,
  prenom?: string,
  poste: string,
  diplome?: string,
  anneeExperience?: number,
  disponible?: boolean,
  cvUrl?: string,
}, soumissionId?: string) {
  try {
    const { entrepriseId } = await getEntrepriseContext()
    const effectiveSoumissionId = soumissionId || (await db.query.equipeProjet.findFirst({
      columns: { soumissionId: true },
    }))?.soumissionId || 'demo'
    
    const [membre] = await db.insert(equipeProjet)
      .values({
        soumissionId: effectiveSoumissionId,
        entrepriseId,
        nom: `${data.prenom || ''} ${data.nom}`.trim(),
        role: data.poste,
        qualification: data.diplome,
        experienceAnnees: data.anneeExperience || 0,
        statut: data.disponible ? 'complet' : 'incomplet'
      })
      .returning()

    revalidatePath(`/dashboard/soumissions/${effectiveSoumissionId}/terrain/equipe`)
    return { succes: true, membre }
  } catch (error: any) {
    return { succes: false, erreur: error.message }
  }
}
