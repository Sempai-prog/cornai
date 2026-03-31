// ══════════════════════════════════════════
// CORNAi — Simulateur WhatsApp Interactif
// ══════════════════════════════════════════

import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import * as readline from 'readline'
import { routeMessage } from '../src/whatsapp/router'

async function simulate() {
  console.log('\n' + '═'.repeat(60))
  console.log('🌽 CORNAi — WhatsApp Simulation (CLI)')
  console.log('═'.repeat(60))

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  // 1. Demander le numéro de téléphone fictif
  const telephone = await new Promise<string>((resolve) => {
    rl.question('📱 Entrez un numéro (ex: 237690112233) : ', resolve)
  })

  console.log(`\n✅ Session démarrée pour ${telephone}.`)
  console.log(`👋 Tape 'quit' pour fermer, 'clear' pour reset la session.\n`)

  // 2. Boucle de messages
  const nextMessage = () => {
    rl.question('👤 Vous : ', async (text) => {
      if (text.toLowerCase() === 'quit') {
        rl.close()
        process.exit()
      }
      
      if (text.toLowerCase() === 'clear') {
        // Optionnel : implémenter clearState
        console.log('🔄 Session réinitialisée.')
        nextMessage()
        return
      }

      console.log('⏳ CORNAi réfléchit...')

      try {
        const response = await routeMessage(telephone, text)
        console.log(`\n🌽 CORNAi :\n----------\n${response}\n----------\n`)
      } catch (err: any) {
        console.error(`\n❌ ERREUR : ${err.message}\n`)
      }

      nextMessage()
    })
  }

  nextMessage()
}

simulate().catch(console.error)
