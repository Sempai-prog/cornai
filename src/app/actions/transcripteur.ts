'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'
import { db } from '@/database/client'
import { visites_terrain } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || 'dummy_for_build')

export async function transcrireAudio(
  formData: FormData
): Promise<{ succes: boolean; transcription?: string; erreur?: string }> {
  const audioBase64 = formData.get('audio') as string;
  const mimeType = formData.get('mimeType') as string;
  const soumissionId = formData.get('soumissionId') as string;
  
  if (!audioBase64 || !soumissionId) {
    return { succes: false, erreur: 'Données manquantes pour la transcription.' };
  }
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const prompt = `
      Tu es un assistant expert en marchés publics camerounais.
      Transcris fidèlement cet audio de visite de site en terrain.
      Structure la transcription ainsi :
      
      1. **Observations Générales** : Description du site
      2. **Contraintes Identifiées** : Risques et difficultés terrain
      3. **Accès et Logistique** : Informations sur l'accès au site
      4. **Recommandations Techniques** : Conseils pour l'offre technique
      
      Langue : Transcris en français, même si l'audio est en pidgin ou en langue locale.
    `
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType,
          data: audioBase64,
        }
      }
    ])
    
    const transcription = result.response.text()
    
    // Sauvegarder en DB (seulement si l'ID est un UUID valide)
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(soumissionId);
    
    if (isUuid) {
      await db.update(visites_terrain)
        .set({ 
          transcription,
          transcriptionStatut: 'complete',
          transcriptionDate: new Date()
        })
        .where(eq(visites_terrain.soumissionId, soumissionId))
      
      revalidatePath('/dashboard/terrain')
    }
    
    return { succes: true, transcription }
    
  } catch (erreur) {
    console.error('[Transcripteur] Erreur:', erreur)
    
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(soumissionId);
    if (isUuid) {
      await db.update(visites_terrain)
        .set({ transcriptionStatut: 'error' })
        .where(eq(visites_terrain.soumissionId, soumissionId))
    }
    
    return { succes: false, erreur: 'La transcription a échoué. Vérifiez la qualité audio ou la clé API.' }
  }
}
