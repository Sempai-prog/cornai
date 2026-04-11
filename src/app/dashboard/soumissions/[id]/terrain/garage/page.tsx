export const dynamic = 'force-dynamic'

// ══════════════════════════════════════════
// SABI — Volume B : Garage (Page)
// ══════════════════════════════════════════

import { notFound } from "next/navigation"
import { getSoumissionComplete } from "@/database/queries/soumissions"
import { getParcEntreprise, getEnginsSoumission } from "@/database/queries/garage"
import { GarageClient } from "./garage-client"

interface GaragePageProps {
  params: Promise<{ id: string }>
}

export default async function GaragePage({ params }: GaragePageProps) {
  const { id } = await params
  
  // 1. Récupérer la soumission
  const soumission = await getSoumissionComplete(id)
  if (!soumission) notFound()

  // 2. Récupérer le parc global et les affectations
  const [parcGlobal, enginsAffectes] = await Promise.all([
    getParcEntreprise(soumission.entrepriseId),
    getEnginsSoumission(id)
  ])

  return (
    <div className="h-full">
      <GarageClient 
        soumissionId={id}
        entrepriseId={soumission.entrepriseId}
        parcGlobal={parcGlobal}
        enginsAffectes={enginsAffectes}
      />
    </div>
  )
}
