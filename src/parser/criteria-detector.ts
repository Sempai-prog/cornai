// ══════════════════════════════════════════
// SABI — Criteria Detector (Regex + JSON)
// ══════════════════════════════════════════

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

interface EliminationPattern {
  critere: string
  categorie: string
  regex_detection: string | string[]
  action_recommandee: string
  gravite: 'elevee' | 'moyenne' | 'faible'
}

const KB_PATH = join(process.cwd(), 'knowledge_base', 'elimination_patterns.json')

/**
 * Détecte les critères éliminatoires dans un texte
 */
export async function detecterCriteresEliminatoires(texte: string) {
  console.log(`\n🕵️‍♂️ Detector : Recherche de critères éliminatoires...`)

  if (!existsSync(KB_PATH)) {
    console.warn(`  ⚠️ Knowledge base pattern file not found at ${KB_PATH}`)
    return []
  }

  const results: {
    critere: string
    categorie: string
    formulation_trouvee: string
    action_recommandee: string
    gravite: string
  }[] = []

  try {
    const rawData = readFileSync(KB_PATH, 'utf-8')
    let patterns: EliminationPattern[] = []
    
    const parsed = JSON.parse(rawData)
    if (Array.isArray(parsed)) {
      patterns = parsed
    } else if (parsed.patterns && Array.isArray(parsed.patterns)) {
      patterns = parsed.patterns
    }

    for (const p of patterns) {
      const regexes = Array.isArray(p.regex_detection) 
        ? p.regex_detection 
        : [p.regex_detection]
      
      for (const patternStr of regexes) {
        try {
          const regex = new RegExp(patternStr, 'gi')
          const match = texte.match(regex)
          
          if (match) {
            results.push({
              critere: p.critere,
              categorie: p.categorie,
              formulation_trouvee: match[0],
              action_recommandee: p.action_recommandee,
              gravite: p.gravite
            })
            // S'arrête au premier match pour ce critère
            break
          }
        } catch (err: any) {
          // Ignorer les regex invalides dans le JSON
        }
      }
    }

    console.log(`✅ ${results.length} critères potentiellement éliminatoires détectés.`)
    return results
  } catch (error: any) {
    console.error(`❌ Erreur détection critères: ${error.message}`)
    return []
  }
}
