// ══════════════════════════════════════════
// SABI — Volume A : Blindage (Client Component)
// ══════════════════════════════════════════

'use client'

import * as React from "react"
import { PieceAdministrative } from "@/components/blindage/piece-administrative"
import { uploadPieceAdminR2, setDatePiece, updateBlindageProgress } from "@/app/actions/blindage"
import { toast } from "sonner"
import { Info, AlertTriangle, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface BlindageClientProps {
  soumissionId: string
  dateDepotAO: Date
  initialPieces: any[]
  initialAvancement: number
}

export function BlindageClient({
  soumissionId,
  dateDepotAO,
  initialPieces,
  initialAvancement
}: BlindageClientProps) {
  const [pieces, setPieces] = React.useState(initialPieces)
  const [avancement, setAvancement] = React.useState(initialAvancement)

  // Recalculer l'avancement localement pour feedback immédiat
  const recalculerAvancement = (piecesActuelles: any[]) => {
    const obligatoires = piecesActuelles.filter(p => p.obligatoire)
    const valides = obligatoires.filter(p => p.statut === 'valide' || p.statut === 'attention').length
    return Math.round((valides / (obligatoires.length || 1)) * 100)
  }

  // Sync progress with DB if it changed
  React.useEffect(() => {
    if (avancement !== initialAvancement) {
      updateBlindageProgress(soumissionId, avancement)
    }
  }, [avancement, soumissionId, initialAvancement])

  const handleUpload = async (pieceId: string, file: File) => {
    const formData = new FormData()
    formData.append('fichier', file)

    const res = await uploadPieceAdminR2(soumissionId, pieceId, formData)
    
    if (res.success) {
      toast.success("Document uploader sur Cloudflare R2")
      
      // Update local state
      setPieces(prev => {
        const next = prev.map(p => {
          if (p.id === pieceId) {
            return {
              ...p,
              statut: 'valide', // Simple feedback, le serveur recalculera au refresh
              document: {
                ...p.document,
                fichierUrl: res.url,
                dateObtention: format(new Date(), 'yyyy-MM-dd')
              }
            }
          }
          return p
        })
        setAvancement(recalculerAvancement(next))
        return next
      })
    } else {
      toast.error(res.error || "Erreur lors de l'upload")
    }
  }

  const handleUpdateDate = async (pieceId: string, date: string) => {
    const res = await setDatePiece(soumissionId, pieceId, date)
    if (res.success) {
      toast.success("Date mise à jour")
      // On pourrait re-fetch ici ou updater le statut localement
    }
  }

  const piecesPerimees = pieces.filter(p => p.statut === 'perime' && p.obligatoire)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* ALERTES CRITIQUES */}
      {piecesPerimees.length > 0 && (
        <div className="p-4 rounded-[4px] border border-red-500/20 bg-red-500/5 flex gap-4 items-center">
          <div className="size-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-600 uppercase tracking-widest">Risque d'élimination détecté</p>
            <p className="text-xs text-red-600/70 max-w-2xl">
              {piecesPerimees.length} pièce{piecesPerimees.length > 1 ? 's sont' : ' est'} périmée{piecesPerimees.length > 1 ? 's' : ''} par rapport à la date de dépôt. 
              Uploadez une version à jour immédiatement.
            </p>
          </div>
        </div>
      )}

      {/* GRILLE DE CONFORMITÉ */}
      <div className="grid gap-6 lg:grid-cols-2">
        {pieces.map(item => (
          <PieceAdministrative
            key={item.id}
            piece={item}
            document={item.document ? {
              ...item.document,
              dateEmission: new Date(item.document.dateObtention),
              dateExpiration: item.document.dateExpiration ? new Date(item.document.dateExpiration) : null
            } : null}
            statut={item.statut}
            dateDepotAO={dateDepotAO}
            onUpload={handleUpload}
          />
        ))}
      </div>

      {/* FOOTER TIPS */}
      <div className="bg-muted/30 border border-border/5 p-6 rounded-[4px] flex flex-col md:flex-row gap-6 justify-between items-center text-center md:text-left">
        <div className="flex gap-4 items-start max-w-xl">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-[11px] font-medium text-muted-foreground leading-relaxed uppercase tracking-tight">
            Selon le Code des Marchés Publics du Cameroun (Loi 2018), l'absence d'une seule pièce administrative obligatoire est un motif d'élimination sans appel. 
            <span className="text-foreground font-semibold ml-1">Vérifiez scrupuleusement les dates de validité.</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
             <Calendar className="w-4 h-4 text-muted-foreground/40" />
             <span className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-widest">
                Dépôt prévu : {format(dateDepotAO, "dd/MM/yyyy")}
             </span>
        </div>
      </div>

    </div>
  )
}
