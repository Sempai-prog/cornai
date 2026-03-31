import { SearchResult } from "./search-types"

const WHATSAPP_NUMBER = "237699999999" // Official number for CEMAC

/**
 * Mappe un objet Appel d'Offre de la base de données vers l'UI
 * avec un calcul de Matching V1
 */
export function mapDBAOToUI(dbAo: any): SearchResult {
  // 1. Formatage des dates et budget
  const deadlineDate = dbAo.dateLimiteSoumission ? new Date(dbAo.dateLimiteSoumission) : null
  const formattedDeadline = deadlineDate 
    ? deadlineDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : "Date non précisée"

  const budgetDisplay = dbAo.budgetEstime 
    ? `${(dbAo.budgetEstime >= 1000000 ? (dbAo.budgetEstime / 1000000).toFixed(1) + 'M' : dbAo.budgetEstime.toLocaleString())} ${dbAo.monnaie || 'FCFA'}`
    : "Coût non estimé"

  // ══════════════════════════════════════════
  // LOGIQUE DE MATCHING V1
  // ══════════════════════════════════════════
  let score = 50 // Base score

  // a. Secteur (Simplifié)
  const isBTP = dbAo.titreComplet.toLowerCase().includes('travaux') || dbAo.titreComplet.toLowerCase().includes('construction') || dbAo.secteur === 'BTP'
  if (isBTP) score += 25

  // b. Région (Simplifié : on favorise les pôles économiques pour la V1)
  const isHeartRegion = dbAo.regionExecution === "Centre" || dbAo.regionExecution === "Littoral"
  if (isHeartRegion) score += 10

  // c. Type de procédure (Simplifié : DC est plus accessible pour les PME)
  if (dbAo.typeMarche === "DC") score += 15
  if (dbAo.typeMarche === "AAMS") score -= 10

  // d. Délai restant
  if (deadlineDate) {
     const today = new Date()
     const diffDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
     if (diffDays > 14) score += 10
     else if (diffDays < 7) score -= 15
  }

  // e. Disponibilité du DAO
  const hasDAO = !!dbAo.daoPdfUrl
  if (!hasDAO) score -= 20

  // f. Détermination du niveau (matchLevel)
  let level: SearchResult["matchLevel"] = "recommended"
  let signal = "Opportunité intéressante"
  let status: SearchResult["status"] = "new"

  if (score > 85) {
    level = "excellent"
    signal = "Match optimal : BTP & Délai confortable"
    status = "excellent"
  } else if (!hasDAO) {
    level = "incomplete"
    signal = "DAO Manquant : Étude impossible"
    status = "incomplete"
  } else if (score < 55) {
    level = "risky"
    signal = "Alerte : Délai court ou procédure complexe"
    status = "risky"
  } else {
    level = "recommended"
    signal = "Recommandé : Profil cohérent"
    status = "recommended"
  }

  return {
    id: dbAo.id,
    title: dbAo.titreComplet,
    authority: dbAo.institution || "Autorité Contractante",
    budget: budgetDisplay,
    region: dbAo.regionExecution || "National",
    deadline: formattedDeadline,
    type: dbAo.typeMarche || "N/A",
    sector: dbAo.secteur || "Général",
    status: status,
    matchLevel: level,
    matchScore: Math.min(100, Math.max(0, score)),
    signal: signal,
    source: dbAo.sourceScraping || "Journal des Marchés",
    cautionAmount: dbAo.cautionMontant ? `${dbAo.cautionMontant.toLocaleString()} FCFA` : "Non spécifiée",
    evaluationMode: dbAo.modeEvaluation || "Sur critères",
    risks: Array.isArray(dbAo.criteresEliminatoires) ? (dbAo.criteresEliminatoires as string[]) : []
  }
}

export function generateWhatsAppLink(item: SearchResult, actionType: "analyze" | "budget" | "alert" | "info", query?: string) {
  let message = ""
  
  switch (actionType) {
    case "analyze":
      message = `Bonjour CORNAi, je souhaite que l'IA analyse les critères éliminatoires de cet Appel d'Offres : ${item.type} - ${item.title} publié par ${item.authority}.`
      break
    case "budget":
      message = `Bonjour CORNAi, aide-moi à préparer le BPU et le DQE sans erreur pour cette Demande de Cotation : ${item.type} - ${item.title}.`
      break
    case "alert":
      message = `Bonjour CORNAi, crée une alerte pour ma PME. Préviens-moi dès qu'un marché dans le secteur ${query || "BTP"} est publié.`
      break
    case "info":
      message = `Bonjour CORNAi, je souhaite plus d'informations sur : ${item.title}.`
      break
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
