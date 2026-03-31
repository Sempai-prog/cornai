import { getDerniersAO } from "@/database/queries/ao"
import { mapDBAOToUI } from "@/components/search/search-utils"
import LandingClient from "@/components/landing/landing-client"

export const dynamic = 'force-dynamic'

export default async function LandingPage() {
  // Fetch latest 10 tenders from the database
  const dbAos = await getDerniersAO(10)
  
  // Map database structures to the UI 'SearchResult' type
  const results = dbAos && dbAos.length > 0 
    ? dbAos.map(mapDBAOToUI)
    : undefined // Fallback to mocks handled in SearchShellCompact

  return <LandingClient initialResults={results} />
}
