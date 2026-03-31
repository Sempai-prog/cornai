// ══════════════════════════════════════════
// CORNAi — Test Scraper & Parser
// ══════════════════════════════════════════

import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import { scrapeARMP } from '../src/scraper/armp'
import { extraireEtStocker } from '../src/parser/ao-extractor'
import { detecterCriteresEliminatoires } from '../src/parser/criteria-detector'

async function testPipeline() {
  console.log('\n' + '═'.repeat(50))
  console.log('🌽 CORNAi — Test Scraping & Parsing Pipeline')
  console.log('═'.repeat(50))

  try {
    // 1. Scraping (en mode mock par défaut pour le test rapide)
    // Mettre à false pour tenter le vrai site s'il est accessible
    const rawAOs = await scrapeARMP(false)
    
    if (rawAOs.length === 0) {
      console.warn('⚠️ Aucun AO trouvé.')
      return
    }

    // 2. Prendre les 3 premiers AO pour ne pas exploser les quotas Gemini
    const limit = 3
    console.log(`\n👨‍🔬 Traitement des ${limit} premiers AO trouvés...`)
    
    let nouveaux = 0
    let erreurs = 0

    for (let i = 0; i < Math.min(rawAOs.length, limit); i++) {
      const raw = rawAOs[i]!
      
      try {
        console.log(`\n--- AO #${i+1}: ${raw.titre.substring(0, 50)}... ---`)
        
        // Simulation du texte complet (parfois le scraper n'a que le titre + lien)
        // Dans une vraie app, on irait scraper la page de détail de l'AO
        const texteComplet = `
          APPEL D'OFFRES NATIONAL OUVERT
          MAÎTRE D'OUVRAGE : ${raw.maitreOuvrage}
          DATE PUBLICATION : ${raw.datePublication}
          DATE LIMITE : ${raw.dateLimite}
          
          OBJET : ${raw.titre}
          
          PIÈCES À FOURNIR :
          - Certificat de non Exclusion des Marchés Publics (ARMP)
          - Attestation de non-redevance fiscale
          - Cautionnement de soumission de 2 000 000 FCFA
          - Registre de commerce
          
          CRITÈRES ÉLIMINATOIRES :
          - Absence de cautionnement de soumission à l'ouverture des plis
          - Fausse déclaration ou pièce falsifiée
          - Note technique inférieure à 70%
          - Dossier administratif incomplet après 48h
        `

        // Extraction Structured IA + Stockage DB
        const ao = await extraireEtStocker(texteComplet, 'armp', raw.url)
        
        // Détection de critères supplémentaires
        const criteres = await detecterCriteresEliminatoires(texteComplet)
        
        console.log(`✅ Success for "${ao.titreComplet.substring(0, 30)}..."`)
        console.log(`   ID: ${ao.id}`)
        console.log(`   Type: ${ao.typeMarche}`)
        console.log(`   Lieu: ${ao.lieuExecution} (${ao.regionExecution})`)
        console.log(`   Budget: ${ao.budgetEstime} FCFA`)
        console.log(`   Critères détectés (Regex): ${criteres.length}`)
        
        nouveaux++
      } catch (err: any) {
        console.error(`❌ Erreur sur l'AO #${i+1}: ${err.message}`)
        erreurs++
      }
    }

    console.log('\n' + '═'.repeat(50))
    console.log('🏁 RÉSUMÉ DU TEST')
    console.log(`   Scrapés: ${rawAOs.length}`)
    console.log(`   Traités: ${nouveaux + erreurs}`)
    console.log(`   Succès: ${nouveaux} ✅`)
    console.log(`   Échecs: ${erreurs} ❌`)
    console.log('═'.repeat(50))

  } catch (error: any) {
    console.error(`\n❌ ERREUR FATALE : ${error.message}`)
  }
}

testPipeline().catch(console.error)
