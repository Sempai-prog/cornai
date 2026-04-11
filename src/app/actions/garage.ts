// ══════════════════════════════════════════
// SABI — Volume B : Garage (Actions & Logic)
// ══════════════════════════════════════════

'use server'

import { db } from "@/database/client"
import { materielGlobal, soumissionEngins, materielProjet } from "@/database/schema"
import { eq, and } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { getEntrepriseContext } from "@/lib/demo-config"

/**
 * AJOUTER UN ENGIN AU GARAGE (Standard SABI V1.6)
 * Utilisé pour enrichir le parc global de l'entreprise.
 */
export async function ajouterEnginGarage(data: {
  designation: string,
  marque: string,
  modele?: string,
  annee?: number,
  numeroCarteGrise: string,
  etat: string,
  proprietaire: string
}, soumissionId?: string) {
  try {
    const { entrepriseId } = await getEntrepriseContext()
    
    const effectiveSoumissionId = soumissionId || (await db.query.materielProjet.findFirst({
      columns: { soumissionId: true },
    }))?.soumissionId || 'demo'

    const [engin] = await db.insert(materielProjet)
      .values({
        soumissionId: effectiveSoumissionId,
        entrepriseId,
        nom: data.designation,
        typeMateriel: "ENGIN LOURD",
        designation: `${data.marque} ${data.modele || ''}`.trim(),
        statut: "incomplet",
        docsRequis: 3,
        docsValides: 0
      })
      .returning()
    
    revalidatePath(`/dashboard/soumissions/${effectiveSoumissionId}/terrain/garage`)
    revalidatePath(`/dashboard/terrain`)
    
    return { succes: true, engin }
  } catch (error: any) {
    return { succes: false, erreur: error.message }
  }
}

/**
 * Ajoute un nouvel engin au parc global de l'entreprise
 */
export async function addEnginGlobal(data: {
  entrepriseId: string,
  nom: string,
  type: string,
  marque?: string,
  modele?: string,
  immatriculation?: string
}) {
  const [newEngin] = await db.insert(materielGlobal)
    .values(data)
    .returning()
  
  return { succes: true, engin: newEngin }
}

/**
 * Affecte un engin du parc à une soumission spécifique
 */
export async function affecterEnginASoumission(
  soumissionId: string,
  enginId: string,
  roleMarche?: string
) {
  // Vérifier si déjà affecté
  const existant = await db.query.soumissionEngins.findFirst({
    where: and(
      eq(soumissionEngins.soumissionId, soumissionId),
      eq(soumissionEngins.enginId, enginId)
    )
  })

  if (existant) return { succes: true }

  await db.insert(soumissionEngins)
    .values({
      soumissionId,
      enginId,
      roleMarche
    })

  revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain/garage`)
  return { succes: true }
}

/**
 * Retire un engin d'une soumission
 */
export async function retirerEnginSoumission(id: string, soumissionId: string) {
  await db.delete(soumissionEngins).where(eq(soumissionEngins.id, id))
  revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain/garage`)
  return { succes: true }
}
