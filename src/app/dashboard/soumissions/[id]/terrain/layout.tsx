// ══════════════════════════════════════════
// SABI — Layout Volume B : Technique (Terrain)
// ══════════════════════════════════════════

import { notFound } from "next/navigation"
import { getSoumissionComplete } from "@/database/queries/soumissions"
import { TerrainNavigation } from "./terrain-navigation"

interface VolumeTerrainLayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

export default async function VolumeTerrainLayout({ 
  children, 
  params 
}: VolumeTerrainLayoutProps) {
  const { id } = await params
  const soumission = await getSoumissionComplete(id)

  if (!soumission) {
    notFound()
  }

  return (
    <div className="flex flex-col h-full bg-card/5">
      
      {/* SOUS-NAVIGATION TECHNIQUE (VISITE / MÉMOIRE / GARAGE / ÉQUIPE) */}
      <TerrainNavigation soumissionId={soumission.id} />

      {/* CONTENU DU SOUS-MODULE ACTIF */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>

    </div>
  )
}
