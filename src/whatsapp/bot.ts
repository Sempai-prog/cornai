// ══════════════════════════════════════════
// CORNAi — Bot Orchestrator (BOT.TS)
// ══════════════════════════════════════════

import { routeMessage } from './router'
import { envoyerMessage } from '../lib/whatsapp'

/**
 * Traite un message entrant à partir du payload de Webhook
 */
export async function processIncomingMessage(payload: any) {
  try {
    // 1. Extraire les infos utiles selon le format WATI
    const telephone = payload.waId
    const text = payload.text || payload.caption || ''
    const type = payload.type || 'text'
    
    if (!telephone) {
      console.warn('⚠️ Webhook Payload sans waId ignored.', payload)
      return
    }

    console.log(`💬 MSG IN [${telephone}]: "${text}"`)

    // 2. Obtenir la réponse métier du routeur
    const responseText = await routeMessage(telephone, text, type)

    // 3. Envoyer la réponse via WhatsApp API
    if (responseText) {
      console.log(`💬 MSG OUT [${telephone}]: "${responseText.substring(0, 50)}..."`)
      await envoyerMessage(telephone, responseText)
    }

  } catch (error: any) {
    console.error(`❌ ProcessIncomingMessage Error: ${error.message}`)
  }
}
