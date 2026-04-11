'use server'

import { db } from "@/database/client"
import { lignesFinancieres, soumissions } from "@/database/schema"
import { eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

/**
 * RÉCUPÉRER TOUTES LES DONNÉES DU VOLUME C
 */
export async function getNkapData(soumissionId: string) {
  const soumission = await db.query.soumissions.findFirst({
    where: eq(soumissions.id, soumissionId),
    with: {
      appelOffre: true
    }
  })

  const lignes = await db.query.lignesFinancieres.findMany({
    where: eq(lignesFinancieres.soumissionId, soumissionId),
    orderBy: [lignesFinancieres.numero]
  })

  return {
    soumission: {
      reference: soumission?.id.slice(0, 8) || "REF-ERROR",
      intitule: soumission?.appelOffre?.titreComplet || "SABI PROCURE",
      maitreDOuvrage: soumission?.appelOffre?.institution || "AUTORITÉ CONTRACTANTE",
      entreprise: "MA PME SABI",
      montantOffre: soumission?.montantOffre || 0
    },
    lignesBPU: lignes.map(l => ({
      numero: parseInt(l.numero || "0"),
      designation: l.designation,
      unite: l.unite || "U",
      prixUnitaire: l.prixUnitaire || 0
    })),
    lignesDQE: lignes.map(l => ({
      numero: parseInt(l.numero || "0"),
      designation: l.designation,
      unite: l.unite || "U",
      quantite: parseFloat(l.quantite || "1"),
      prixUnitaire: l.prixUnitaire || 0
    })),
    lignesRaw: lignes
  }
}

/**
 * METTRE À JOUR UN PRIX UNITAIRE
 */
export async function updatePrixUnitaire(id: string, prix: number, soumissionId: string) {
  try {
    await db.update(lignesFinancieres)
      .set({ 
        prixUnitaire: prix,
        updatedAt: new Date()
      })
      .where(eq(lignesFinancieres.id, id))

    // Recalculer le total de la soumission
    const lignes = await db.query.lignesFinancieres.findMany({
      where: eq(lignesFinancieres.soumissionId, soumissionId)
    })

    const totalHt = lignes.reduce((acc, l) => {
      const q = parseFloat(l.quantite || "0")
      const p = l.prixUnitaire || 0
      return acc + (p * q)
    }, 0)

    await db.update(soumissions)
      .set({ 
        montantOffre: totalHt,
        avancementFinancier: 100 // Idéalement calculer l'avancement réel
      })
      .where(eq(soumissions.id, soumissionId))

    revalidatePath(`/dashboard/soumissions/${soumissionId}/nkap`)
    return { succes: true }
  } catch (error: any) {
    return { succes: false, erreur: error.message }
  }
}

/**
 * IMPORTATION INITIALE DU BPU (Simulation ou Import Excel)
 */
export async function importerBPU(soumissionId: string, lignes: any[]) {
  try {
    await db.insert(lignesFinancieres).values(
      lignes.map(l => ({ ...l, soumissionId }))
    )
    revalidatePath(`/dashboard/soumissions/${soumissionId}/nkap`)
    return { succes: true }
  } catch (error: any) {
    return { succes: false, erreur: error.message }
  }
}
