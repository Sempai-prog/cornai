// ══════════════════════════════════════════
// CORNAi — Handler : Détail Appel d'Offre (AO)
// ══════════════════════════════════════════

import { getAOById } from '../../database/queries/ao'
import { getMatchingByAO } from '../../database/queries/matching'
import { formatAODetail, formatMatchNotification } from '../formatter'

/**
 * Affiche le détail complet d'un AO
 */
export async function handleAODetail(telephone: string, aoId: string, entrepriseId: string) {
  try {
    const ao = await getAOById(aoId)
    if (!ao) return "⚠️ Désolé, cet appel d'offre est introuvable."

    const matching = await getMatchingByAO(aoId, entrepriseId)
    
    let detail = formatAODetail(ao)
    
    if (matching) {
      detail += `\n\n🎯 *Ton score de matching : ${matching.scoreTotal}%*\n`
    }
    
    detail += `\n👉 Tape *CHECKLIST* pour voir les pièces à fournir.
👉 Tape *RETOUR* pour revenir aux résultats.`

    return detail

  } catch (error: any) {
    console.error(`❌ AO Detail Error: ${error.message}`)
    return "Erreur lors de la récupération des détails."
  }
}
