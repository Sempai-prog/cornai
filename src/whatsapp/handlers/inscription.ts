// ══════════════════════════════════════════
// SABI — Handler : Inscription
// ══════════════════════════════════════════

import { getState, setState, clearState, ConversationState } from '../state'
import { formatInscriptionPrompt, formatBienvenue } from '../formatter'
import { createEntreprise } from '../../database/queries/entreprise'
import { matcherTousLesAO } from '../../matching/profile-matcher'
import { formatMatchNotification } from '../formatter'

/**
 * Gère le flow d'inscription étape par étape
 */
export async function handleInscription(telephone: string, message: string, state: ConversationState) {
  const msg = message.trim().toUpperCase()

  // 1. Initialisation
  if (state.etape === 'idle') {
    setState(telephone, { etape: 'inscription_nom' })
    return formatBienvenue() + '\n\n' + formatInscriptionPrompt('inscription_nom')
  }

  // 2. Étape : Nom
  if (state.etape === 'inscription_nom') {
    setState(telephone, { 
      etape: 'inscription_secteur', 
      data: { ...state.data, nom: message } 
    })
    return formatInscriptionPrompt('inscription_secteur')
  }

  // 3. Étape : Secteur
  if (state.etape === 'inscription_secteur') {
    const secteursMap: Record<string, string> = {
      '1': 'travaux',
      '2': 'fournitures',
      '3': 'services',
      '4': 'prestations_intellectuelles',
      '5': 'sante',
      '6': 'transport',
      '7': 'autre'
    }
    const secteur = secteursMap[message.trim()]
    if (!secteur) return "⚠️ Choisis un chiffre entre 1 et 7 pour le secteur."
    
    setState(telephone, { 
      etape: 'inscription_budget', 
      data: { ...state.data, secteurs: [secteur] } 
    })
    return formatInscriptionPrompt('inscription_budget')
  }

  // 4. Étape : Budget
  if (state.etape === 'inscription_budget') {
    const budgetMap: Record<string, number> = {
      '1': 5000000,
      '2': 15000000,
      '3': 50000000,
      '4': 200000000,
      '5': 1000000000
    }
    const budget = budgetMap[message.trim()]
    if (!budget) return "⚠️ Choisis un chiffre entre 1 et 5 pour ton budget max."

    setState(telephone, { 
      etape: 'inscription_region', 
      data: { ...state.data, budgetMaxMarche: budget } 
    })
    return formatInscriptionPrompt('inscription_region')
  }

  // 5. Étape : Région
  if (state.etape === 'inscription_region') {
    const regionMap: Record<string, string[]> = {
      '1': ['Centre'],
      '2': ['Littoral'],
      '3': ['Ouest'],
      '4': ['Nord-Ouest', 'Sud-Ouest'],
      '5': ['Nord', 'Extrême-Nord', 'Adamaoua'],
      '6': ['Sud', 'Est'],
      '7': ['Toutes']
    }
    const regions = regionMap[message.trim()]
    if (!regions) return "⚠️ Choisis un chiffre entre 1 et 7 pour la région."

    const data: any = { ...state.data, regionsCouvertes: regions }
    setState(telephone, { 
      etape: 'inscription_confirmation', 
      data 
    })

    return `🏢 *Récapitulatif de ton profil* :
- Nom : *${data.nom}*
- Secteur : *${data.secteurs[0]}*
- Budget max : *${data.budgetMaxMarche.toLocaleString()} FCFA*
- Zone : *${data.regionsCouvertes.join(', ')}*

Tape *OK* pour confirmer ou *NON* pour recommencer.`
  }

  // 6. Étape : Confirmation
  if (state.etape === 'inscription_confirmation') {
    if (msg === 'OK' || msg === 'OUI') {
      // Création en base
      const pme = await createEntreprise({
        ...state.data,
        telephone,
        actif: true
      })

      // Premier matching
      const matches = await matcherTousLesAO(pme.id)
      
      setState(telephone, { etape: 'idle', data: {} })
      
      let response = `✅ *Profil créé avec succès !* SABI est maintenant à ton service.

J'ai trouvé *${matches.length} opportunités* qui pourraient t'intéresser. Voici le top 3 :`

      // On limite au top 3 pour ne pas spammer
      for (const m of matches.slice(0, 3)) {
        response += '\n\n' + formatMatchNotification(m.appelOffre, m)
      }

      return response
    } else {
      setState(telephone, { etape: 'inscription_nom', data: {} })
      return "D'accord, on recommence.\n\n" + formatInscriptionPrompt('inscription_nom')
    }
  }

  return "Je n'ai pas compris. Reprenons l'inscription."
}
