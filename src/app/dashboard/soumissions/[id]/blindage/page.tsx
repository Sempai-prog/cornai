export const dynamic = 'force-dynamic'

// ══════════════════════════════════════════
// SABI — Volume A : Blindage (Page)
// ══════════════════════════════════════════

import { notFound } from "next/navigation"
import { BlindageClient } from "./blindage-client"
import { getPiecesBlindage } from "@/database/queries/blindage"
import { BlindageHeader } from "@/components/blindage/blindage-header"

interface VolumeBlindagePageProps {
  params: Promise<{ id: string }>
}

export default async function VolumeBlindagePage({ params }: VolumeBlindagePageProps) {
  const { id } = await params
  
  // 1. Récupérer les données consolidées du blindage via la query dédiée
  const { 
    pieces, 
    avancement, 
    dateDepotAO, 
    referenceAO,
    titreAO 
  } = await getPiecesBlindage(id)

  if (!pieces) notFound()

  // Calculer le nombre de pièces bloquantes pour le header
  const nbBloquants = pieces.filter(p => p.obligatoire && (p.statut === 'manquant' || p.statut === 'perime')).length

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      
      {/* HEADER PREMIUM V1.6 */}
      <BlindageHeader 
        avancement={avancement}
        dateDepot={dateDepotAO}
        referenceAO={referenceAO}
        nbBloquants={nbBloquants}
      />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
        <div className="max-w-7xl mx-auto pb-20">
          
          <BlindageClient 
            soumissionId={id}
            dateDepotAO={dateDepotAO || new Date()}
            initialPieces={pieces}
            initialAvancement={avancement}
          />

        </div>
      </div>
    </div>
  )
}
