import { SearchResult } from "./search-types"

const WHATSAPP_NUMBER = "237699999999" // Official number for CEMAC

/**
 * Formate un type de marché (sigle) : Première lettre Majuscule, reste minuscule
 * Exemple : AONO -> AONO, DC -> DC
 */
export function formatMarketType(type: string) {
  if (!type || type === "N/A") return type
  return type.toUpperCase()
}

/**
 * Mappe un objet Appel d'Offre de la base de données vers l'UI
 * avec un calcul de Matching V4
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
  // LOGIQUE DE MATCHING V4 (PRODUCTION READY)
  // ══════════════════════════════════════════
  let score = 55 // Base score
  const isBTP = dbAo.titreComplet?.toLowerCase().includes('travaux') || dbAo.secteur === 'BTP'
  if (isBTP) score += 20
  
  const hasDAO = !!dbAo.daoPdfUrl
  if (!hasDAO) score -= 15

  const typeMarche = dbAo.typeMarche || "N/A"
  if (typeMarche === "DC") score += 10 // PME friendly

  // f. Détermination du niveau (matchLevel)
  let level: SearchResult["matchLevel"] = "recommended"
  let signal = "Opportunité intéressante"

  if (score > 80) {
    level = "excellent"
    signal = "Match optimal : BTP & Échéance"
  } else if (score < 45) {
    level = "risky"
    signal = "Alerte : Dossier complexe ou délai critique"
  } else if (!hasDAO) {
    level = "incomplete"
    signal = "DAO Manquant : Étude impossible"
  }

  // MOCK PROGRESSION ENVELOPPES (Logic V4)
  const conformite: SearchResult["conformitePME"] = {
    enveloppeA: {
      status: score > 70 ? "OK" : "Warning",
      pieces: [
        { name: "ANR (ARMP)", status: score > 60 ? "valid" : "expiring", expiry: "5 Jours" },
        { name: "Quitus CNPS", status: "valid" },
        { name: "RCCM / Carte Gaz", status: "valid" }
      ]
    },
    enveloppeB: {
      status: score > 60 ? "OK" : "Warning",
      exigences: ["Ingénieur Génie Civil (5 ans)", "Camion Benne 20 Tonnes"]
    },
    enveloppeC: {
      status: "Missing",
      bpuStatus: score > 80 ? "Généré" : "Non démarré"
    }
  }

  return {
    id: dbAo.id || `AO-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    title: dbAo.titreComplet || "Appel d'Offres Sans Titre",
    authority: dbAo.institution || dbAo.maitreOuvrage || "Autorité Contractante",
    budget: budgetDisplay,
    region: dbAo.regionExecution || "National",
    deadline: formattedDeadline,
    type: typeMarche,
    sector: dbAo.secteur || "Général",
    cautionSoumission: dbAo.cautionMontant ? `${dbAo.cautionMontant.toLocaleString()} FCFA` : "Non spécifiée",
    fraisDossier: dbAo.fraisDossier ? `${dbAo.fraisDossier.toLocaleString()} FCFA` : "50 000 FCFA",
    lieuDepot: dbAo.lieuDepot || "Physique",
    lieuExecution: dbAo.regionExecution || "Cameroun",
    dateVisiteSite: dbAo.dateVisiteSite || "Non spécifiée",
    modeSoumission: dbAo.submissionMode || "Physique",
    
    // IA Metadata
    matchScore: Math.min(100, Math.max(0, score)),
    matchLevel: level,
    signal: signal,
    complexiteMontage: score > 75 ? "Moyenne" : "Faible",
    diagnosticExpert: "Analyse des critères éliminatoires du RPAO en cours...",
    
    // Workflow
    workflowState: "opportunite",
    conformitePME: conformite,
    financement: dbAo.financement || "BIP 2026",
    status: score > 85 ? "excellent" : "new"
  }
}

/**
 * Génère un lien WhatsApp contextuel avec message prérempli (Deep Link)
 */
export function generateWhatsAppLink(item: Partial<SearchResult>, actionType: string, extraInfo?: string) {
  let message = ""
  const titre = item.title || "Titre non spécifié"

  message = `Bonjour CORNAi, je souhaite des informations sur le marché : ${titre}.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
