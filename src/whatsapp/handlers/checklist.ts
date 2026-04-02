// ══════════════════════════════════════════
// SABI — Handler : Checklist de soumission
// ══════════════════════════════════════════

import { verifierConformite } from '../../conformity/document-checker'

/**
 * Gère l'affichage de la checklist de conformité via WhatsApp
 */
export async function handleChecklist(telephone: string, entrepriseId: string, aoId: string) {
  try {
    const report = await verifierConformite(entrepriseId, aoId)
    
    let message = `📋 *Rapport de Conformité — Score ${report.score}%*\n`
    message += `Statut : ${report.statut === 'conforme' ? '🟢 Conforme' : report.statut === 'bloquant' ? '🔴 Bloquant' : '🟡 Partiellement prêt'}\n\n`
    
    if (report.piecesOk.length > 0) {
      message += `✅ *Pièces Prêtes (${report.piecesOk.length})* :\n• ` + report.piecesOk.join('\n• ') + '\n\n'
    }

    if (report.piecesManquantes.length > 0) {
      message += `⚠️ *Pièces Manquantes (${report.piecesManquantes.length})* :\n• ` + report.piecesManquantes.join('\n• ') + '\n\n'
    }

    if (report.piecesExpirees.length > 0) {
      message += `❌ *Pièces Expirées (${report.piecesExpirees.length})* :\n• ` + report.piecesExpirees.join('\n• ') + '\n\n'
    }

    if (report.actions.length > 0) {
      message += `👉 *Actions recommandées* :\n`
      for (const act of report.actions) {
        message += `• ${act.action} (${act.piece}) — délai estimé : ${act.delai}j\n`
      }
    }

    message += `\n📅 *Délai de soumission* : ${report.joursRestants} jours restants.`

    return message

  } catch (error: any) {
    console.error(`❌ Checklist Handler Error: ${error.message}`)
    return "Oups, j'ai eu un problème technique en préparant ta checklist."
  }
}
