// ══════════════════════════════════════════════════════════
// CORNAi — Seed Knowledge Base (Version robuste)
// ══════════════════════════════════════════════════════════

import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '../src/database/schema'
import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'

const KB_DIR = join(__dirname, '..', 'knowledge_base')

// ── Chargeur JSON robuste ────────────────────────────
function loadJSON(filename: string): any | null {
  const filepath = join(KB_DIR, filename)
  
  // Vérifier que le fichier existe
  if (!existsSync(filepath)) {
    console.warn(`  ⚠️  Fichier ${filename} non trouvé dans ${KB_DIR}`)
    
    // Lister les fichiers disponibles pour aider au debug
    try {
      const files = readdirSync(KB_DIR)
      console.warn(`  📁 Fichiers disponibles :`)
      files.forEach(f => console.warn(`     - ${f}`))
    } catch {}
    
    return null
  }
  
  try {
    // Lire le fichier en gérant le BOM UTF-8
    let content = readFileSync(filepath, 'utf-8')
    
    // Supprimer le BOM si présent
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1)
    }
    
    // Supprimer les caractères invisibles et commentaires de texte si présents au début
    content = content.trim()
    
    // Tentative de trouver le début du JSON si le fichier contient du texte avant
    if (content[0] !== '{' && content[0] !== '[') {
      const startBrace = content.indexOf('{')
      const startBracket = content.indexOf('[')
      const start = (startBrace !== -1 && startBracket !== -1) 
        ? Math.min(startBrace, startBracket) 
        : (startBrace !== -1 ? startBrace : startBracket)
      
      if (start !== -1) {
        console.warn(`  ⚠️  Texte détecté avant le JSON dans ${filename}, extraction à partir de l'index ${start}`)
        content = content.substring(start)
      }
    }
    
    // Tentative de parsing simple
    try {
      const parsed = JSON.parse(content)
      console.log(`  ✅ Fichier ${filename} chargé (${typeof parsed === 'object' ? (Array.isArray(parsed) ? (parsed.length + ' éléments') : (Object.keys(parsed).length + ' clés')) : typeof parsed})`)
      return parsed
    } catch (e) {
      // Si parsing échoue, peut-être plusieurs objets JSON ou texte après
      console.warn(`  ⚠️  JSON standard échoué dans ${filename}, tentative de récupération multi-objets...`)
      
      // On cherche tous les objets {...} ou [...]
      // Note: C'est une approche simplifiée
      const matches = content.match(/\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}|\[(?:[^[\]]|\[(?:[^[\]]|\[[^[\]]*\])*\])*\]/g)
      
      if (matches && matches.length > 0) {
        if (matches.length === 1) {
          const parsed = JSON.parse(matches[0])
          console.log(`  ✅ JSON extrait de ${filename} (1 objet trouvé)`)
          return parsed
        } else {
          try {
            const wrapped = JSON.parse(`[${matches.join(',')}]`)
            console.log(`  ✅ Multi-objets extraits de ${filename} (${matches.length} objets trouvés)`)
            return wrapped
          } catch (err: any) {
            throw new Error(`Impossible de parser les objets extraits : ${err.message}`)
          }
        }
      }
      throw e
    }
  } catch (error: any) {
    console.error(`  ❌ Erreur parsing ${filename}: ${error.message}`)
    
    // Afficher les premiers caractères pour debug
    try {
      const raw = readFileSync(filepath, 'utf-8')
      console.error(`  📄 Premiers 200 caractères :`)
      console.error(`     ${raw.substring(0, 200)}`)
    } catch {}
    
    return null
  }
}

// ── Extraire un array depuis différentes structures ──
function extractArray(data: any, possibleKeys: string[]): any[] {
  if (!data) return []
  
  // Si c'est déjà un array
  if (Array.isArray(data)) return data
  
  // Si c'est un objet, chercher une clé qui contient un array
  if (typeof data === 'object') {
    // D'abord essayer les clés suggérées
    for (const key of possibleKeys) {
      if (data[key] && Array.isArray(data[key])) {
        console.log(`  📦 Données trouvées sous la clé "${key}"`)
        return data[key]
      }
    }
    
    // Ensuite chercher n'importe quelle clé qui contient un array
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value) && (value as any[]).length > 0) {
        console.log(`  📦 Données trouvées sous la clé "${key}" (auto-détecté)`)
        return value as any[]
      }
    }
    
    // Si l'objet lui-même a un "id", c'est peut-être un seul élément
    if (data.id) {
      console.log(`  📦 Objet unique détecté, wrappé en array`)
      return [data]
    }
  }
  
  console.warn(`  ⚠️  Structure JSON non reconnue. Type: ${typeof data}`)
  if (typeof data === 'object') {
    console.warn(`  📋 Clés disponibles: ${Object.keys(data).join(', ')}`)
  }
  return []
}

async function seed() {
  console.log('')
  console.log('🌽 CORNAi — Seed Knowledge Base')
  console.log('═'.repeat(50))
  
  // Vérifier que le dossier knowledge_base existe
  if (!existsSync(KB_DIR)) {
    console.error(`❌ Le dossier ${KB_DIR} n'existe pas !`)
    console.error(`   Créez-le et copiez-y vos fichiers JSON.`)
    process.exit(1)
  }
  
  // Lister tous les fichiers
  console.log(`\n📁 Dossier knowledge_base :`)
  const allFiles = readdirSync(KB_DIR)
  allFiles.forEach(f => console.log(`   ${f}`))
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL non définie')
    return
  }
  
  const sql = neon(process.env.DATABASE_URL!)
  const db = drizzle(sql, { schema })

  // ══════════════════════════════════════════
  // 1. PIÈCES ADMINISTRATIVES
  // ══════════════════════════════════════════
  console.log('\n' + '─'.repeat(50))
  console.log('📋 Pièces administratives')
  console.log('─'.repeat(50))
  
  const piecesData = loadJSON('pieces_administratives.json')
  const pieces = extractArray(piecesData, [
    'pieces', 
    'pieces_administratives', 
    'data', 
    'items',
    'base_pieces_administratives'
  ])
  
  if (pieces.length > 0) {
    console.log(`\n  Injection de ${pieces.length} pièces...`)
    let ok = 0, err = 0
    
    for (const piece of pieces) {
      try {
        // Adapter les noms de champs selon la structure
        const id = piece.id || piece.piece_id || `piece_${ok + 1}`
        const nom = piece.nom_canonique || piece.nom || piece.name || 'Sans nom'
        
        await db.insert(schema.piecesAdministratives).values({
          id: String(id),
          nomCanonique: nom,
          variantes: piece.variantes_nom || piece.variantes || [],
          categorie: piece.categorie || piece.category || null,
          obligatoireParDefaut: piece.obligatoire_par_defaut ?? piece.obligatoire ?? true,
          eliminatoireSiAbsent: piece.eliminatoire_si_absent ?? piece.eliminatoire ?? true,
          rattrapable48h: piece.rattrapable_48h ?? piece.rattrapable ?? false,
          emetteur: piece.emetteur || null,
          ouObtenir: piece.ou_obtenir || null,
          coutEstime: piece.cout_estime_fcfa || piece.cout_estime || null,
          delaiObtention: piece.delai_obtention_jours || piece.delai_obtention || null,
          dureeValidite: piece.duree_validite || null,
          formatRequis: piece.format_requis || null,
          referenceLegale: piece.reference_legale || null,
          applicableTypesMarches: piece.applicable_types_marches || [],
          conditionsSpecifiques: piece.conditions_specifiques || null,
          regexDetection: piece.regex_detection || null,
          messageAlerte: piece.message_alerte_whatsapp || piece.message_alerte || null,
          messageAction: piece.message_action_whatsapp || piece.message_action || null,
          piegesCourants: piece.pieges_courants || [],
        }).onConflictDoUpdate({
          target: schema.piecesAdministratives.id,
          set: { nomCanonique: nom },
        })
        
        console.log(`  ✅ ${id} — ${nom}`)
        ok++
      } catch (e: any) {
        console.log(`  ❌ Erreur: ${e.message.substring(0, 100)}`)
        err++
      }
    }
    console.log(`\n  Résultat: ${ok} ✅ | ${err} ❌`)
  } else {
    console.log('  ⏭️  Aucune pièce à injecter')
  }

  // ══════════════════════════════════════════
  // 2. FAQ
  // ══════════════════════════════════════════
  console.log('\n' + '─'.repeat(50))
  console.log('❓ FAQ')
  console.log('─'.repeat(50))
  
  const faqData = loadJSON('faq.json')
  const faqItems = extractArray(faqData, [
    'questions', 
    'faq', 
    'data', 
    'items',
    'base_faq',
    'questions_reponses'
  ])
  
  if (faqItems.length > 0) {
    console.log(`\n  Injection de ${faqItems.length} questions...`)
    let ok = 0, err = 0
    
    for (const q of faqItems) {
      try {
        const id = q.id || q.faq_id || `faq_${ok + 1}`
        const question = q.question || q.q || 'Question sans texte'
        
        await db.insert(schema.faqTable).values({
          id: String(id),
          question: question,
          reponseCourte: q.reponse_courte || q.short_answer || null,
          reponseComplete: q.reponse_complete || q.reponse || q.answer || null,
          referenceLegale: q.reference_legale || q.reference || null,
          categorie: q.categorie || q.category || null,
          motsCles: q.mots_cles || q.keywords || [],
          questionsLiees: q.questions_liees || q.related || [],
        }).onConflictDoUpdate({
          target: schema.faqTable.id,
          set: { question: question },
        })
        
        console.log(`  ✅ ${id}`)
        ok++
      } catch (e: any) {
        console.log(`  ❌ Erreur: ${e.message.substring(0, 100)}`)
        err++
      }
    }
    console.log(`\n  Résultat: ${ok} ✅ | ${err} ❌`)
  } else {
    console.log('  ⏭️  Aucune question à injecter')
  }

  // ══════════════════════════════════════════
  // 3. GLOSSAIRE
  // ══════════════════════════════════════════
  console.log('\n' + '─'.repeat(50))
  console.log('📖 Glossaire')
  console.log('─'.repeat(50))
  
  const glossaireData = loadJSON('dictionnaire_termes.json')
  const termes = extractArray(glossaireData, [
    'termes', 
    'glossaire', 
    'dictionnaire', 
    'data', 
    'items',
    'definitions'
  ])
  
  if (termes.length > 0) {
    console.log(`\n  Injection de ${termes.length} termes...`)
    let ok = 0, err = 0
    
    for (const terme of termes) {
      try {
        const id = terme.id || terme.terme_id || `terme_${ok + 1}`
        const nom = terme.terme || terme.name || terme.mot || 'Terme inconnu'
        
        await db.insert(schema.glossaire).values({
          id: String(id),
          terme: nom,
          abreviation: terme.abreviation || terme.abbreviation || null,
          definitionLegale: terme.definition_legale || terme.definition || null,
          definitionSimple: terme.definition_simple || terme.explication || null,
          synonymes: terme.synonymes || terme.variantes || [],
          referenceLegale: terme.reference_legale || terme.reference || null,
          motsCles: terme.mots_cles || terme.embedding_keywords || terme.keywords || [],
        }).onConflictDoUpdate({
          target: schema.glossaire.id,
          set: { terme: nom },
        })
        
        console.log(`  ✅ ${id} — ${nom}`)
        ok++
      } catch (e: any) {
        console.log(`  ❌ Erreur: ${e.message.substring(0, 100)}`)
        err++
      }
    }
    console.log(`\n  Résultat: ${ok} ✅ | ${err} ❌`)
  } else {
    console.log('  ⏭️  Aucun terme à injecter')
  }

  // ══════════════════════════════════════════
  // RÉSUMÉ FINAL
  // ══════════════════════════════════════════
  console.log('\n' + '═'.repeat(50))
  console.log('🌽 Seed terminé !')
  console.log('═'.repeat(50))
}

seed().catch((err) => {
  console.error('\n❌ Erreur fatale:', err.message)
  process.exit(1)
})
