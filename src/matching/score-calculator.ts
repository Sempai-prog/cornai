// ══════════════════════════════════════════
// CORNAi — Score Calculator
// ══════════════════════════════════════════

import { formatFCFA, joursRestants } from '../lib/utils'

/**
 * Calcule le score de matching entre une entreprise et un AO
 * Score Max: 100
 */
export function calculerScore(entreprise: any, appelOffre: any, documentsDisponibles: any[] = []) {
  let scoreSecteur = 0
  let scoreBudget = 0
  let scoreLocalisation = 0
  let scoreExperience = 0
  let scoreDocuments = 0
  let scoreDelai = 0

  // 1. RÈGLE BLOQUANTE : Budget
  // Si le budget AO > 2x budget max PME → Score = 0
  const budgetAO = Number(appelOffre.budgetEstime) || 0
  const budgetMaxPME = Number(entreprise.budgetMaxMarche) || 0
  
  if (budgetAO > 0 && budgetMaxPME > 0 && budgetAO > (budgetMaxPME * 2)) {
    return {
      scoreTotal: 0,
      scoreSecteur: 0,
      scoreBudget: 0,
      scoreLocalisation: 0,
      scoreExperience: 0,
      scoreDocuments: 0,
      scoreDelai: 0,
      details: {
        secteur_match: false,
        budget_compatible: false,
        zone_couverte: false,
        experience_suffisante: false,
        documents_prets: 0,
        jours_restants: joursRestants(appelOffre.dateLimiteSoumission),
        recommandation: "⚠️ Marché hors catégorie (trop volumineux)."
      }
    }
  }

  // 2. SECTEUR (30 pts max)
  // Type de marché correspond aux secteurs PME (array strings)
  const secteursPME = entreprise.secteurs || []
  const typeAO = appelOffre.typeMarche // 'travaux', 'fournitures', etc.
  
  if (secteursPME.includes(typeAO)) {
    scoreSecteur = 20
    // Bonus si le titre contient des mots clés spécifiques
    // Pour l'instant, on reste simple
    // scoreSecteur += 10
  }

  // 3. BUDGET (20 pts max)
  if (budgetAO <= budgetMaxPME && budgetAO > 0) {
    scoreBudget = 20
  } else if (budgetAO <= (budgetMaxPME * 1.5) && budgetAO > 0) {
    scoreBudget = 10
  } else if (budgetAO === 0) {
    scoreBudget = 10 // Neutre si inconnu
  }

  // 4. LOCALISATION (15 pts max)
  const regionsPME = entreprise.regionsCouvertes || []
  const regionAO = appelOffre.regionExecution
  
  if (regionsPME.includes(regionAO)) {
    scoreLocalisation = 15
  } else if (regionsPME.some((r: string) => r.toLowerCase() === 'toutes')) {
    scoreLocalisation = 15
  }

  // 5. EXPÉRIENCE (15 pts max)
  const exp = entreprise.nbMarchesExecutes || 0
  if (exp >= 3) scoreExperience = 15
  else if (exp >= 1) scoreExperience = 10
  else scoreExperience = 5

  // 6. DOCUMENTS (10 pts max)
  // Simulation simplifiée : on regarde le nombre de docs fournis (table documents_entreprise)
  // Une PME complète a généralement ~10-15 docs administratifs
  const nbDocsAttendus = 10 
  const nbDocsPME = documentsDisponibles.length
  const ratio = nbDocsPME / nbDocsAttendus
  if (ratio >= 1) scoreDocuments = 10
  else if (ratio >= 0.8) scoreDocuments = 7
  else if (ratio >= 0.5) scoreDocuments = 4
  else scoreDocuments = 1

  // 7. DÉLAI (10 pts max)
  const jours = joursRestants(appelOffre.dateLimiteSoumission)
  if (jours > 15) scoreDelai = 10
  else if (jours >= 10) scoreDelai = 7
  else if (jours >= 5) scoreDelai = 4
  else scoreDelai = 1

  const scoreTotal = scoreSecteur + scoreBudget + scoreLocalisation + scoreExperience + scoreDocuments + scoreDelai

  // Recommandation textuelle
  let recommandation = "Avis neutre."
  if (scoreTotal >= 80) recommandation = "Excellent match — Saisissez cette opportunité ! 🟢"
  else if (scoreTotal >= 60) recommandation = "Bonne opportunité — Vérifiez les détails. 🟡"
  else recommandation = "Match faible — À évaluer avec prudence. 🔴"

  return {
    scoreTotal,
    scoreSecteur,
    scoreBudget,
    scoreLocalisation,
    scoreExperience,
    scoreDocuments,
    scoreDelai,
    details: {
      secteur_match: scoreSecteur > 0,
      budget_compatible: scoreBudget > 0,
      zone_couverte: scoreLocalisation > 0,
      experience_suffisante: scoreExperience >= 10,
      documents_prets: Math.min(Math.round(ratio * 100), 100),
      jours_restants: jours,
      recommandation
    }
  }
}
