// ══════════════════════════════════════════
// SABI — Gemini AI Helper (Centralisé)
// Transcription Audio + Génération de Contenu
// ══════════════════════════════════════════

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY || ''
)

/**
 * Transcription audio via Gemini 1.5 Flash.
 * Option B centralisée — Une seule clé pour tout.
 * 
 * @param audioBuffer - Buffer du fichier audio
 * @param mimeType - Type MIME (audio/mp4, audio/webm, audio/wav, etc.)
 * @returns Le texte transcrit en français
 */
export async function transcrireAudioGemini(
  audioBuffer: Buffer,
  mimeType: string = 'audio/mp4'
): Promise<{ transcription: string; success: boolean; error?: string }> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const base64Audio = audioBuffer.toString('base64')

    const result = await model.generateContent([
      'Transcris fidèlement cet audio en français. ' +
      'Contexte: BTP, marchés publics camerounais, MINTP, COLEPS. ' +
      'Ne rajoute aucun commentaire, uniquement la transcription fidèle mot à mot.',
      { inlineData: { mimeType, data: base64Audio } }
    ])

    const transcription = result.response.text()

    return { transcription, success: true }

  } catch (error: any) {
    console.error('[Gemini Audio] Erreur transcription:', error)
    return { 
      transcription: '', 
      success: false, 
      error: error.message || 'Transcription échouée' 
    }
  }
}

/**
 * Génération de chapitre de mémoire technique via Gemini.
 * Utilise la transcription audio comme source.
 */
export async function genererChapitreMemoire(
  chapitre: 'methodologie' | 'organisation' | 'delais' | 'qse' | 'materiaux',
  transcription: string,
  contexteAO: string
): Promise<{ contenu: string; success: boolean; error?: string }> {

  const PROMPTS: Record<string, string> = {
    methodologie: `
      Tu es un expert en rédaction de mémoires techniques pour marchés publics camerounais.
      
      Contexte du marché : ${contexteAO}
      
      À partir de cette note de terrain dictée par le chef de projet :
      "${transcription}"
      
      Rédige le chapitre "MÉTHODOLOGIE D'EXÉCUTION" en français académique, 
      respectant le format DTAO MINTP. Structure :
      1. Approche générale des travaux
      2. Mode opératoire détaillé par phase
      3. Mesures de contrôle qualité
      
      Longueur : 300-500 mots. Ton : technique et professionnel.
    `,
    organisation: `
      Contexte : ${contexteAO}
      Note terrain : "${transcription}"
      
      Rédige le chapitre "ORGANISATION DU CHANTIER" :
      1. Organigramme du projet
      2. Répartition des responsabilités
      3. Moyens humains mobilisés
      4. Planning d'affectation du personnel
      
      Format DTAO MINTP. 300-500 mots.
    `,
    delais: `
      Contexte : ${contexteAO}
      Note terrain : "${transcription}"
      
      Rédige le chapitre "PLANNING D'EXÉCUTION" :
      1. Décomposition en phases
      2. Durée estimée par phase
      3. Chemin critique
      4. Jalons principaux
      
      Format DTAO MINTP. 300-500 mots.
    `,
    qse: `
      Contexte : ${contexteAO}
      Note terrain : "${transcription}"
      
      Rédige le chapitre "QUALITÉ SÉCURITÉ ENVIRONNEMENT" :
      1. Plan qualité projet
      2. Mesures de sécurité sur chantier
      3. Plan de gestion environnementale
      4. Dispositif de gestion des déchets
      
      Format DTAO MINTP. 300-500 mots.
    `,
    materiaux: `
      Contexte : ${contexteAO}
      Note terrain : "${transcription}"
      
      Rédige le chapitre "PROVENANCE ET QUALITÉ DES MATÉRIAUX" :
      1. Sources d'approvisionnement
      2. Contrôles de conformité
      3. Stockage et manutention
      4. Certifications requises
      
      Format DTAO MINTP. 300-500 mots.
    `,
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(PROMPTS[chapitre])
    const contenu = result.response.text()

    return { contenu, success: true }

  } catch (error: any) {
    console.error('[Gemini] Erreur génération chapitre:', error)
    return { 
      contenu: '', 
      success: false, 
      error: error.message || 'Génération échouée' 
    }
  }
}

/**
 * Extraction IA des données d'un CV (Gemini Vision).
 */
export async function extraireDonneesCVGemini(
  cvBuffer: Buffer,
  mimeType: string
): Promise<{
  anneesExperience: number
  specialite: string
  diplome: string
  success: boolean
}> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const base64 = cvBuffer.toString('base64')

    const result = await model.generateContent([
      `Extrait de ce CV : 
       1. Le nombre total d'années d'expérience professionnelle
       2. La spécialité principale (ex: Génie Civil, BTP, Électricité...)
       3. Le niveau de diplôme le plus élevé
       
       Réponds UNIQUEMENT en JSON : 
       { "anneesExperience": number, "specialite": string, "diplome": string }`,
      { inlineData: { mimeType, data: base64 } }
    ])

    const parsed = JSON.parse(result.response.text())
    return { ...parsed, success: true }

  } catch (error) {
    console.error('[Gemini Vision] Erreur extraction CV:', error)
    return { anneesExperience: 0, specialite: '', diplome: '', success: false }
  }
}
