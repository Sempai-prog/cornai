// ══════════════════════════════════════════
// CORNAi — Client Gemini 2.5 Flash
// ══════════════════════════════════════════

import { GoogleGenAI, SchemaType } from '@google/generai'

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY!)

const FLASH = 'gemini-2.5-flash'

// ─── Extraction structurée d'un AO ───────
export async function extraireAO(texteDAO: string) {
  const model = genAI.getGenerativeModel({
    model: FLASH,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          numero_marche: { type: SchemaType.STRING },
          titre_complet: { type: SchemaType.STRING },
          resume: { type: SchemaType.STRING },
          type_marche: {
            type: SchemaType.STRING,
            enum: ['travaux', 'fournitures', 'services', 'prestations_intellectuelles'],
          },
          institution: { type: SchemaType.STRING },
          direction: { type: SchemaType.STRING },
          budget_estime: { type: SchemaType.NUMBER },
          source_financement: { type: SchemaType.STRING },
          date_publication: { type: SchemaType.STRING },
          date_limite_soumission: { type: SchemaType.STRING },
          lieu_execution: { type: SchemaType.STRING },
          region_execution: { type: SchemaType.STRING },
          ville_execution: { type: SchemaType.STRING },
          lieu_depot: { type: SchemaType.STRING },
          caution_soumission_montant: { type: SchemaType.NUMBER },
          visite_obligatoire: { type: SchemaType.BOOLEAN },
          visite_date: { type: SchemaType.STRING },
          visite_lieu: { type: SchemaType.STRING },
          mode_passation: { type: SchemaType.STRING },
          mode_evaluation: {
            type: SchemaType.STRING,
            enum: ['binaire', 'points', 'mixte'],
          },
          seuil_technique: { type: SchemaType.NUMBER },
          delai_execution: { type: SchemaType.STRING },
          est_alloti: { type: SchemaType.BOOLEAN },
          finance_par_bailleur: { type: SchemaType.BOOLEAN },
          bailleur: { type: SchemaType.STRING },
          pieces_requises: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                piece: { type: SchemaType.STRING },
                obligatoire: { type: SchemaType.BOOLEAN },
                eliminatoire: { type: SchemaType.BOOLEAN },
              },
            },
          },
          criteres_eliminatoires: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
          },
        },
        required: ['titre_complet', 'type_marche', 'institution'],
      },
    }
  })

  const result = await model.generateContent(`Tu es un expert en marchés publics camerounais.
Extrais les informations structurées de cet Appel d'Offres.
Si une information n'est pas trouvée, mets null.

TEXTE DU DAO :
${texteDAO}`)

  return JSON.parse(result.response.text())
}

// ─── OCR d'un PDF scanné ─────────────────
export async function ocrDocument(base64Data: string, mimeType: string = 'application/pdf') {
  const model = genAI.getGenerativeModel({ model: FLASH })
  
  const result = await model.generateContent([
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
  ])

  return result.response.text()
}

// ─── Chatbot conversationnel ─────────────
export async function chatResponse(
  message: string,
  historique: { role: 'user' | 'model'; content: string }[] = [],
  contexte?: string
) {
  const model = genAI.getGenerativeModel({
    model: FLASH,
    systemInstruction: `Tu es CORNAi, l'assistant IA des marchés publics camerounais.
Tu aides les PME à trouver et gagner des marchés publics.

RÈGLES :
- Réponds en français camerounais (naturel mais professionnel)
- Sois concis (c'est WhatsApp)
- Cite la source légale quand tu donnes une règle
- Si tu ne sais pas → dis-le honnêtement
- Propose toujours une action concrète
- Utilise des emojis avec modération
${contexte ? `\nCONTEXTE :\n${contexte}` : ''}`,
  })

  const chat = model.startChat({
    history: historique.map(h => ({
      role: h.role,
      parts: [{ text: h.content }],
    })),
  })

  const result = await chat.sendMessage(message)
  return result.response.text()
}

// ─── Rédaction offre technique ────────────
export async function redigerOffreTechnique(params: {
  daoResume: string
  profilEntreprise: string
  references: string
  instructionsVocales?: string
}) {
  const model = genAI.getGenerativeModel({ model: FLASH })
  
  const result = await model.generateContent(`Tu es un expert en rédaction d'offres techniques pour les marchés publics camerounais.

RÉSUMÉ DU DAO :
${params.daoResume}

PROFIL DE L'ENTREPRISE :
${params.profilEntreprise}

RÉFÉRENCES :
${params.references}

${params.instructionsVocales ? `INSTRUCTIONS DU GÉRANT :\n${params.instructionsVocales}` : ''}

Rédige une offre technique professionnelle et structurée :
I. Compréhension du projet
II. Méthodologie d'exécution (phase par phase)
III. Planning d'exécution (Gantt textuel)
IV. Personnel clé (avec qualifications requises)
V. Matériel mobilisé
VI. Mesures HSE (Hygiène, Sécurité, Environnement)

Sois précis, professionnel, et mets en avant les forces de l'entreprise.`)

  return result.response.text()
}
