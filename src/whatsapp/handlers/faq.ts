// ══════════════════════════════════════════
// CORNAi — Handler : FAQ & Aide
// ══════════════════════════════════════════

import { db } from '../../database/client'
import { faqTable, glossaire } from '../../database/schema'
import { chatResponse } from '../../lib/gemini'
import { ilike, or, arrayContains } from 'drizzle-orm'

/**
 * Répond à une question de l'utilisateur en utilisant la base de connaissances
 */
export async function handleFAQ(telephone: string, question: string) {
  try {
    // 1. Recherche des mots-clés dans la question
    const words = question.toLowerCase().split(/\s+/).filter(w => w.length > 4)
    
    // 2. Recherche dans le glossaire et la FAQ (contexte local)
    const faqResults = await db.query.faqTable.findMany({
      where: or(
        ...words.map(w => ilike(faqTable.question, `%${w}%`)),
        ...words.map(w => arrayContains(faqTable.motsCles, [w]))
      ),
      limit: 5
    })

    const glossaireResults = await db.query.glossaire.findMany({
      where: or(
        ...words.map(w => ilike(glossaire.terme, `%${w}%`)),
        ...words.map(w => arrayContains(glossaire.motsCles, [w]))
      ),
      limit: 3
    })

    // 3. Construction du contexte pour Gemini
    let context = "Informations issues de la base de connaissances CORNAi (Réglementation des Marchés Publics au Cameroun) :\n\n"
    
    faqResults.forEach((f: any) => {
      context += `Question : ${f.question}\nRéponse : ${f.reponseComplete}\nRéférence : ${f.referenceLegale || 'ARMP'}\n---\n`
    })

    glossaireResults.forEach((g: any) => {
      context += `Terme : ${g.terme}\nDéfinition : ${g.definitionSimple}\n---\n`
    })

    if (faqResults.length === 0 && glossaireResults.length === 0) {
      context = "Désolé, je n'ai pas trouvé de correspondance exacte dans ma base de connaissances. Mais utilise tes connaissances générales sur les marchés publics au Cameroun pour répondre."
    }

    // 4. Appel Gemini
    const systemPrompt = `Tu es CORNAi, un assistant expert des marchés publics au Cameroun (ARMP). 
Réponds de manière concise et professionnelle à l'utilisateur sur WhatsApp. 
Utilise le contexte fourni ci-dessous si possible. 
Si la réponse est extraite de la base, cite toujours la source (ex: Art 12 du Code des Marchés).
N'utilise pas de HTML. Utilise *gras* pour les titres. Limite-toi à 800 caractères max.`

    const responseText = await chatResponse(question, [], context)

    return responseText + "\n\n💡 _Pose-moi d'autres questions sur les marchés publics._"

  } catch (error: any) {
    console.error(`❌ FAQ Error: ${error.message}`)
    return "Oups, j'ai eu un petit problème technique en cherchant la réponse. Peux-tu reformuler ?"
  }
}
