export type SearchState = "initial" | "loading" | "no_results" | "results" | "blocked"

export interface SearchResult {
  id: string
  title: string
  authority: string
  budget: string
  region: string
  deadline: string
  type: string // e.g., "AONO", "DC", "AAMI"
  sector: string
  status: "new" | "urgent" | "recommended" | "excellent" | "risky" | "incomplete"
  source?: string
  cautionAmount?: string
  evaluationMode?: string
  matchScore?: number
  matchLevel?: "excellent" | "recommended" | "risky" | "incomplete"
  signal?: string // Texte court métier, ex: "Match BTP optimal", "Caution élevée"
  risks?: string[]
  isBlocked?: boolean
}
