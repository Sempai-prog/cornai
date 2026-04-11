'use server'

import { db } from "@/database/client"
import { piecesSoumission, equipeProjet, materielProjet, visites_terrain } from "@/database/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { getEntrepriseContext } from "@/lib/demo-config"

/**
 * 🛂 ACTION : GÉNÉRER LES PIÈCES COLEPS
 * Analyse les modules terrain et compile l'index du Volume 2.
 */
export async function genererPiecesSoumission(soumissionId: string) {
  try {
    const { entrepriseId } = await getEntrepriseContext()

    // 1. Nettoyage de l'index existant pour cette soumission (Recalcul frais)
    await db.delete(piecesSoumission).where(eq(piecesSoumission.soumissionId, soumissionId))

    // 2. Analyse du module ÉQUIPE
    const membres = await db.query.equipeProjet.findMany({
      where: eq(equipeProjet.soumissionId, soumissionId)
    })
    
    if (membres.length > 0) {
      await db.insert(piecesSoumission).values({
        soumissionId,
        nomFichier: `DOSSIER_PERSONNEL_CLÉ_${membres.length}_EXPERTS.pdf`,
        typePiece: "dossier_personnel",
        moduleSource: "equipe",
        tailleMb: (2.4 + membres.length * 0.8).toString(),
        statut: "final"
      })
    }

    // 3. Analyse du module GARAGE
    const materiel = await db.query.materielProjet.findMany({
      where: eq(materielProjet.soumissionId, soumissionId)
    })

    if (materiel.length > 0) {
      await db.insert(piecesSoumission).values({
        soumissionId,
        nomFichier: `PIÈCES_JUSTIFICATIVES_MATÉRIEL_${materiel.length}_UNITÉS.pdf`,
        typePiece: "pieces_materiel",
        moduleSource: "garage",
        tailleMb: (1.5 + materiel.length * 0.5).toString(),
        statut: "final"
      })
    }

    // 4. Analyse du module DESCENTE / TRANSCRIPTEUR
    const visite = await db.query.visites_terrain.findFirst({
      where: eq(visites_terrain.soumissionId, soumissionId)
    })

    if (visite) {
      await db.insert(piecesSoumission).values({
        soumissionId,
        nomFichier: `RAPPORT_DESCENTE_LOCALISATION_SITE.pdf`,
        typePiece: "memoire_technique",
        moduleSource: "descente",
        tailleMb: "4.2",
        statut: "final"
      })
    }

    // 5. Note Mémoire Technique Globale (Toujours présent si début de terrain)
    await db.insert(piecesSoumission).values({
      soumissionId,
      nomFichier: "MÉMOIRE_TECHNIQUE_STRUCTURÉ_V1.pdf",
      typePiece: "memoire_technique",
      moduleSource: "transcripteur",
      tailleMb: "8.5",
      statut: "draft"
    })

    revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain`)
    revalidatePath(`/dashboard/terrain`)

    return { success: true }
  } catch (error: any) {
    console.error("Erreur COLEPS:", error)
    return { success: false, error: error.message }
  }
}
