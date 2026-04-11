// ══════════════════════════════════════════
// SABI — Layout Détail Soumission (Sprint C)
// ══════════════════════════════════════════

import { notFound } from "next/navigation"
import { getSoumissionComplete } from "@/database/queries/soumissions"
import { SoumissionContextBar } from "@/components/soumissions/soumission-context-bar"
import { SoumissionVolumeTabs } from "@/components/soumissions/soumission-volume-tabs"

interface SoumissionDetailLayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

export default async function SoumissionDetailLayout({ 
  children, 
  params 
}: SoumissionDetailLayoutProps) {
  const { id } = await params
  const soumission = await getSoumissionComplete(id)

  if (!soumission) {
    notFound()
  }

  const avancements = {
    admin: soumission.avancementAdmin || 0,
    tech: soumission.avancementTech || 0,
    financier: soumission.avancementFinancier || 0
  }

  return (
    <div className="flex flex-col h-full bg-muted/5">
      
      {/* BARRE DE CONTEXTE — Toujours visible */}
      <SoumissionContextBar soumission={soumission} />

      {/* NAVIGATION DES 3 VOLUMES */}
      <SoumissionVolumeTabs 
        soumissionId={soumission.id} 
        avancements={avancements}
      />

      {/* CONTENU DU VOLUME ACTIF */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>

    </div>
  )
}
