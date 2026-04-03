// ══════════════════════════════════════════
// SABI — Pipeline des Opportunités (Server-Side)
// ══════════════════════════════════════════

import { getPipelineOpportunities } from "@/app/actions/matchings-pipeline"
import { OpportunitesBoard } from "./opportunites-board"

export const dynamic = "force-dynamic"

export default async function OpportunitesPage() {
  const initialItems = await getPipelineOpportunities()
  
  return <OpportunitesBoard initialItems={initialItems} />
}
