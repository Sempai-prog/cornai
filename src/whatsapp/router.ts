// ══════════════════════════════════════════
// CORNAi — Routeur de Messages WhatsApp
// ══════════════════════════════════════════

import { getState, setState, clearState, ConversationState } from './state'
import { getEntrepriseByTelephone } from '../database/queries/entreprise'
import { handleInscription } from './handlers/inscription'
import { handleFAQ } from './handlers/faq'
import { handleAODetail } from './handlers/ao-detail'
import { handleChecklist } from './handlers/checklist'
import { matcherTousLesAO } from '../matching/profile-matcher'
import { formatMatchNotification, formatBienvenue } from './formatter'

/**
 * Route le message entrant vers le bon handler
 */
export async function routeMessage(telephone: string, message: string, messageType: string = 'text') {
  const msgRaw = message.trim()
  const msg = msgRaw.toUpperCase()
  const state = getState(telephone)

  try {
    // 1. GESTION DE L'INSCRIPTION EN COURS
    if (state.etape !== 'idle') {
      return await handleInscription(telephone, msgRaw, state)
    }

    // 2. VÉRIFICATION : L'entreprise existe-t-elle ?
    const entreprise = await getEntrepriseByTelephone(telephone)
    if (!entreprise) {
      // Démarrer l'inscription
      return await handleInscription(telephone, msgRaw, state)
    }

    // 3. COMMANDES NUMÉRIQUES (Contexte AO précédent)
    if (msg === '1' && state.data.lastAOId) {
       return await handleAODetail(telephone, state.data.lastAOId, entreprise.id)
    }
    
    // 4. COMMANDES PAR MOTS-CLÉS
    if (msg === 'CHECKLIST' && state.data.lastAOId) {
       return await handleChecklist(telephone, entreprise.id, state.data.lastAOId)
    }

    if (msg === 'AIDE' || msg === 'HELP' || msg === 'FAQ' || msg === '?') {
       return await handleFAQ(telephone, msg)
    }

    if (msg.includes('OPPORTUNITES') || msg.includes('MATCHING') || msg === 'MATCH') {
       const matches = await matcherTousLesAO(entreprise.id)
       if (matches.length === 0) return "❕ Aucun nouvel appel d'offre ne correspond à ton profil pour le moment."
       
       let response = `🎯 Voici vos opportunités actuelles (${matches.length}) :`
       // On envoie le top 3
       for (const m of matches.slice(0, 3)) {
         response += '\n\n' + formatMatchNotification(m.appelOffre, m)
       }
       // On garde en mémoire le premier ID pour l'action rapide '1'
       setState(telephone, { data: { ...state.data, lastAOId: matches[0].appelOffre.id } })
       return response
    }

    if (msg === 'RETOUR') {
       return "👋 C'est noté. Que puis-je faire d'autre ? (Tape 'Aide' ou 'Mes opportunités')"
    }

    // 5. PAR DÉFAUT : CONVERSATION LIBRE AVEC IA (FAQ MODE)
    return await handleFAQ(telephone, msgRaw)

  } catch (error: any) {
    console.error(`❌ RouteMessage Error (${telephone}): ${error.message}`)
    return "Désolé, j'ai rencontré une erreur interne. Réessaie dans un instant."
  }
}
