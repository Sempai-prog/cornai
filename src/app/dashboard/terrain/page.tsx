import { getTerrainFullData } from '@/database/queries/terrain'
import { TerrainClientPage } from './terrain-client'

const DEMO_ENTREPRISE_ID = 'cf83af70-d49b-4a72-8222-201f08a05a8a'

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PAGE : LE TERRAIN (SABI v1.6)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Architecture : Server Component → fetches data → passes to Client
 * Design System : Quiet Design (Clinical Light / Deep Night)
 */
export default async function TerrainPage({ searchParams }: { searchParams: Promise<{ soumissionId?: string }> }) {
  const { soumissionId } = await searchParams
  const data = await getTerrainFullData(DEMO_ENTREPRISE_ID, soumissionId)

  // Compute the terrain score from real data
  const garageComplete = data.garageData.filter(m => m.statut === 'complet').length
  const garageTotal = data.garageData.length
  const equipeComplete = data.equipeData.filter(e => e.statut === 'complet').length
  const equipeTotal = data.equipeData.length

  // Module statuses based on real data
  const moduleStatuses = {
    transcripteur: 'complete' as const,  // MVP: stays mock-complete
    garage: garageTotal === 0 ? 'empty' as const 
      : garageComplete === garageTotal ? 'complete' as const 
      : 'warning' as const,
    equipe: equipeTotal === 0 ? 'empty' as const
      : equipeComplete === equipeTotal ? 'complete' as const
      : 'warning' as const,
    descente: 'empty' as const,          // MVP: stays mock-empty
  }

  // Overall score
  const modulesValidated = Object.values(moduleStatuses).filter(s => s === 'complete').length
  const hasCompilation = data.compilationData.length > 0
  const totalModules = 5
  const percentage = Math.round(((modulesValidated + (hasCompilation ? 0.5 : 0)) / totalModules) * 100)

  const score = {
    percentage,
    modulesValidated,
    modulesTotal: totalModules as 5,
    color: percentage >= 60 ? 'hsl(142 72% 46%)' : percentage >= 30 ? 'hsl(38 92% 50%)' : 'hsl(0 84% 60%)',
  }

  // Serialize compilation data (numeric → number)
  const compilationSerialized = data.compilationData.map(p => ({
    ...p,
    tailleMb: Number(p.tailleMb) || 0,
  }))

  return (
    <TerrainClientPage
      score={score}
      moduleStatuses={moduleStatuses}
      aoNom={data.aoNom || undefined}
      aoInstitution={data.aoInstitution || undefined}
      garageData={data.garageData}
      equipeData={data.equipeData}
      compilationData={compilationSerialized}
    />
  )
}
