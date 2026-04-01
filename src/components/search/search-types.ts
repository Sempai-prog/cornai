// ══════════════════════════════════════════
// CORNAi — Système de Types (Marchés Publics Cameroun — Logic V4)
// ══════════════════════════════════════════

/**
 * Interface enrichie selon la nomenclature ARMP / MINMAP (Cameroun)
 * Orientée "Outil de Production" pour PME.
 */
export interface SearchResult {
  id: string
  title: string
  authority: string // ex: MINTP, MINDEVEL, Mairie de Yaoundé 1
  budget: string
  region: string
  deadline: string
  type: string // ex: "AONO", "DC", "AAMI", "AONR"
  sector: "Travaux" | "Fournitures" | "Services" | "Intellectuelles" | string
  
  // Métadonnées Critiques (Production / Go/No-Go)
  cautionSoumission?: string // ex: "1 500 000 FCFA"
  fraisDossier?: string      // ex: "50 000 FCFA" (Achat du DAO)
  lieuDepot?: "COLEPS" | "Physique" | "COLEPS/Physique"
  lieuExecution?: string
  dateVisiteSite?: string    // Date critique pour l'attestation de visite
  modeSoumission?: "COLEPS" | "Physique"
  
  // Règlement Particulier (RPAO)
  criteresEliminatoires?: string[] // Ex: "Absence de l'ANR", "Chiffre d'affaires < 100M"
  criteresEssentiels?: string[]     // Ex: "Expérience dans les travaux routiers", "Matériel lourd"
  capaciteFinanciereRequise?: string
  
  // Analyse IA (Diagnostic & Triage)
  matchScore: number
  matchLevel: "excellent" | "recommended" | "risky" | "incomplete"
  signal?: string // Alerte IA critique (ex: "🔴 Chiffre d'affaires insuffisant")
  complexiteMontage: "Faible" | "Moyenne" | "Élevée" | "Critique"
  diagnosticExpert?: string // Note de synthèse IA pour l'inspecteur
  
  // ÉVOLUTION : Conformité aux 3 Enveloppes
  conformitePME: {
    enveloppeA: {
      status: "OK" | "Warning" | "Missing"
      pieces: { name: string; status: "valid" | "expiring" | "missing"; expiry?: string }[]
    }
    enveloppeB: {
      status: "OK" | "Warning" | "Missing"
      exigences: string[]
    }
    enveloppeC: {
      status: "OK" | "Warning" | "Missing"
      bpuStatus: "Généré" | "En cours" | "Non démarré"
    }
  }

  // Workflow & Meta
  workflowState: "opportunite" | "eval" | "montage" | "soumis"
  status?: "new" | "urgent" | "recommended" | "excellent" | "risky" | "incomplete"
  financement?: string // ex: "BIP 2026", "Fond Routier"
}

export type SearchState = "initial" | "loading" | "results" | "no_results" | "error"
