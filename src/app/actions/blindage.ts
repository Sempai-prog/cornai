// ══════════════════════════════════════════
// SABI — Volume A : Blindage (Actions & Logic)
// ══════════════════════════════════════════

'use server'

import { db } from "@/database/client"
import { soumissions, documentsEntreprise } from "@/database/schema"
import { eq, and } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { uploadToR2 } from "@/lib/storage/r2"

/**
 * Mise à jour de l'avancement administratif
 */
export async function updateBlindageProgress(soumissionId: string, progress: number) {
  await db.update(soumissions)
    .set({ avancementAdmin: progress })
    .where(eq(soumissions.id, soumissionId))
  
  revalidatePath(`/dashboard/soumissions/${soumissionId}`)
}

/**
 * Upload d'un document administratif.
 * Signature compatible avec le client existant (blindage-client.tsx).
 * 
 * Mode 1 (actuel) : fichierUrl passé directement (mock)
 * Mode 2 (quand R2 configuré) : utiliser uploadPieceAdminR2
 */
export async function uploadPieceAdmin(
  soumissionId: string, 
  entrepriseId: string,
  pieceId: string, 
  fichierUrl: string
) {
  await db.insert(documentsEntreprise)
    .values({
      entrepriseId,
      pieceId,
      disponible: true,
      fichierUrl,
      dateObtention: new Date().toISOString().split('T')[0],
      statut: 'valide'
    })
    .onConflictDoUpdate({
      target: [documentsEntreprise.entrepriseId, documentsEntreprise.pieceId],
      set: {
        fichierUrl,
        disponible: true,
        dateObtention: new Date().toISOString().split('T')[0],
        statut: 'valide',
        updatedAt: new Date()
      }
    })

  revalidatePath(`/dashboard/soumissions/${soumissionId}/blindage`)
  return { succes: true }
}

/**
 * Upload réel vers Cloudflare R2.
 * Nécessite R2_ACCESS_KEY_ID + R2_SECRET_ACCESS_KEY dans .env.local
 */
export async function uploadPieceAdminR2(
  soumissionId: string,
  typePiece: string,
  formData: FormData
) {
  try {
    const file = formData.get('fichier') as File
    if (!file) throw new Error("Fichier manquant")

    // Validation
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: 'Fichier trop lourd (max 5 Mo)' }
    }
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      return { success: false, error: 'Format invalide (PDF, JPG, PNG uniquement)' }
    }

    // Récupérer l'entreprise via la soumission
    const soumission = await db.query.soumissions.findFirst({
      where: eq(soumissions.id, soumissionId)
    })
    if (!soumission) throw new Error("Soumission introuvable")

    // Upload vers Cloudflare R2
    const { url } = await uploadToR2(
      file,
      `pieces/${soumission.entrepriseId}/${typePiece}/${file.name}`
    )

    // Upsert dans documents_entreprise
    await db.insert(documentsEntreprise)
      .values({
        entrepriseId: soumission.entrepriseId,
        pieceId: typePiece,
        fichierUrl: url,
        disponible: true,
        dateObtention: new Date().toISOString().split('T')[0],
        statut: 'valide',
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [documentsEntreprise.entrepriseId, documentsEntreprise.pieceId],
        set: {
          fichierUrl: url,
          disponible: true,
          dateObtention: new Date().toISOString().split('T')[0],
          statut: 'valide',
          updatedAt: new Date(),
        }
      })

    revalidatePath(`/dashboard/soumissions/${soumissionId}/blindage`)
    return { success: true, url }

  } catch (error: any) {
    console.error("Erreur uploadPieceAdminR2:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Met à jour manuellement la date d'obtention/émission d'une pièce.
 */
export async function setDatePiece(
  soumissionId: string,
  typePiece: string,
  dateObtention: string
) {
  try {
    const soumission = await db.query.soumissions.findFirst({
      where: eq(soumissions.id, soumissionId)
    })
    if (!soumission) throw new Error("Soumission introuvable")

    await db.update(documentsEntreprise)
      .set({ 
        dateObtention, 
        updatedAt: new Date() 
      })
      .where(and(
        eq(documentsEntreprise.entrepriseId, soumission.entrepriseId),
        eq(documentsEntreprise.pieceId, typePiece)
      ))

    revalidatePath(`/dashboard/soumissions/${soumissionId}/blindage`)
    return { success: true }

  } catch (error: any) {
    console.error("Erreur setDatePiece:", error)
    return { success: false, error: error.message }
  }
}
