'use server'

import { db } from '@/database/client'
import { notesAudio } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { uploadToR2 } from '@/lib/storage/r2'
import { transcrireAudioGemini } from '@/lib/ai/gemini'

/**
 * Action principale pour uploader et transcrire une note audio (Sprint E.1)
 */
export async function uploadAudioNoteR2(
  soumissionId: string,
  formData: FormData
) {
  try {
    const file = formData.get('audio') as File
    if (!file) throw new Error("Fichier audio manquant")

    // 1. Upload vers Cloudflare R2
    const fileName = `audios/${soumissionId}/${Date.now()}_${file.name}`
    const { url } = await uploadToR2(file, fileName)

    // 2. Transcription via Gemini (Helper centralisé)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const transcriptionResult = await transcrireAudioGemini(buffer)
    
    if (!transcriptionResult.success) {
      throw new Error(transcriptionResult.error || "Erreur de transcription")
    }

    // 3. Persistance en base de données
    const [note] = await db.insert(notesAudio)
      .values({
        soumissionId,
        nomFichier: file.name,
        audioUrl: url,
        tailleMb: (file.size / (1024 * 1024)).toFixed(2),
        transcription: transcriptionResult.transcription,
        statut: 'transcrit'
      })
      .returning()

    revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain/transcripteur`)
    
    return { 
      success: true, 
      noteId: note.id, 
      transcription: transcriptionResult.transcription 
    }

  } catch (error: any) {
    console.error('[Transcripteur] Erreur:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Version compatible avec l'ancienne UI (si nécessaire)
 */
export async function transcrireAudio(
  formData: FormData
): Promise<{ succes: boolean; transcription?: string; erreur?: string }> {
  const audioFile = formData.get('audio') as File
  const soumissionId = formData.get('soumissionId') as string
  
  if (!audioFile || !soumissionId) {
    return { succes: false, erreur: 'Données manquantes.' }
  }

  const res = await uploadAudioNoteR2(soumissionId, formData)
  
  return { 
    succes: res.success, 
    transcription: res.transcription, 
    erreur: res.error 
  }
}

/**
 * Supprimer une note audio
 */
export async function deleteAudioNote(noteId: string, soumissionId: string) {
  try {
    await db.delete(notesAudio).where(eq(notesAudio.id, noteId))
    revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain/transcripteur`)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
