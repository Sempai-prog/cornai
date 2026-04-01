import re

with open('src/app/page.tsx', 'r') as f:
    content = f.read()

new_content = """import { getDerniersAO } from "@/database/queries/ao"
import { mapDBAOToUI } from "@/components/search/search-utils"
import LandingClient from "@/components/landing/landing-client"

export const dynamic = 'force-dynamic'

export default async function LandingPage() {
  let dbAos = []
  try {
     dbAos = await getDerniersAO(10)
  } catch (e) {
     console.error('Failed to get AOs, using fallback', e)
  }

  // Map database structures to the UI 'SearchResult' type
  const results = dbAos && dbAos.length > 0
    ? dbAos.map(mapDBAOToUI)
    : undefined // Fallback to mocks handled in SearchShellCompact

  return <LandingClient initialResults={results} />
}
"""

with open('src/app/page.tsx', 'w') as f:
    f.write(new_content)
