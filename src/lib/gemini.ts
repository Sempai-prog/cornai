// ══════════════════════════════════════════
// SABI — Client Gemini 2.5 Flash (@google/genai)
// ══════════════════════════════════════════

import { GoogleGenAI } from '@google/genai'

function getResponseText(result: any): string {
  const text = typeof result?.text === 'string' 
    ? result.text 
    : typeof result?.response?.text === 'function' 
    ? result.response.text() 
    : ''
  
  if (!text) {
    throw new Error("Réponse Gemini vide ou invalide")
  }
  return text
}

// Client unifié
const genAI = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY!,
})

const FLASH = 'gemini-2.5-flash'

// ─── Extraction structurée d'un AO ───────
export async function extraireAO(texteDAO: string) {
  const result = await genAI.models.generateContent({
    model: FLASH,
    contents: `Tu es un expert en marchés publics camerounais.
Extrais les informations structurées de cet Appel d'Offres.
Si une information n'est pas trouvée, mets null.

TEXTE DU DAO :
${texteDAO}`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'object',
        properties: {
          numero_marche: { type: 'string' },
          titre_complet: { type: 'string' },
          resume: { type: 'string' },
          type_marche: {
            type: 'string',
            enum: ['travaux', 'fournitures', 'services', 'prestations_intellectuelles'],
          },
          institution: { type: 'string' },
          direction: { type: 'string' },
          budget_estime: { type: 'number' },
          source_financement: { type: 'string' },
          date_publication: { type: 'string' },
          date_limite_soumission: { type: 'string' },
          lieu_execution: { type: 'string' },
          region_execution: { type: 'string' },
          ville_execution: { type: 'string' },
          lieu_depot: { type: 'string' },
          caution_soumission_montant: { type: 'number' },
          visite_obligatoire: { type: 'boolean' },
          visite_date: { type: 'string' },
          visite_lieu: { type: 'string' },
          mode_passation: { type: 'string' },
          mode_evaluation: {
            type: 'string',
            enum: ['binaire', 'points', 'mixte'],
          },
          seuil_technique: { type: 'number' },
          delai_execution: { type: 'string' },
          est_alloti: { type: 'boolean' },
          finance_par_bailleur: { type: 'boolean' },
          bailleur: { type: 'string' },
          pieces_requises: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                piece: { type: 'string' },
                obligatoire: { type: 'boolean' },
                eliminatoire: { type: 'boolean' },
              },
            },
          },
          criteres_eliminatoires: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        required: ['titre_complet', 'type_marche', 'institution'],
      }
    }
  })

  return JSON.parse(getResponseText(result))
}

// ─── Chatbot conversationnel ─────────────
export async function chatResponse(
  message: string,
  historique: { role: 'user' | 'model'; content: string }[] = [],
  contexte?: string
) {
  const result = await genAI.models.generateContent({
    model: FLASH,
    config: {
      systemInstruction: `Tu es SABI, l'assistant IA des marchés publics camerounais.
Tu aides les PME à trouver et gagner des marchés publics.

RÈGLES :
- Réponds en français camerounais (naturel mais professionnel)
- Sois concis (c'est WhatsApp)
- Cite la source légale quand tu donnes une règle
- Si tu ne sais pas → dis-le honnêtement
- Propose toujours une action concrète
- Utilise des emojis avec modération
${contexte ? `\nCONTEXTE :\n${contexte}` : ''}`
    },
    contents: [
      ...historique.map(h => ({
        role: h.role,
        parts: [{ text: h.content }],
      })),
      { role: 'user', parts: [{ text: message }] }
    ]
  })

  return getResponseText(result)
}

// ─── OCR d'un PDF scanné ─────────────────
export async function ocrDocument(base64Data: string, mimeType: string = 'application/pdf') {
  const result = await genAI.models.generateContent({
    model: FLASH,
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType,
              data: base64Data,
            },
          },
          {
            text: `Extrais le texte complet de ce document.
C'est un Dossier d'Appel d'Offres camerounais.
Conserve fidèlement la structure (titres, articles, numéros, tableaux).
Retourne le texte brut complet sans rien omettre.`,
          },
        ]
      }
    ]
  })

  return getResponseText(result)
}
