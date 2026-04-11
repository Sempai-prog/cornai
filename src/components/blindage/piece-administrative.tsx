// ══════════════════════════════════════════
// SABI — Composant Pièce Administrative (Sprint D.2)
// ══════════════════════════════════════════

'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { StatutPiece } from "@/lib/blindage/logic"
import { FileUp, Eye, AlertCircle, CheckCircle2, Circle } from "lucide-react"

interface PieceAdministrativeProps {
  piece: {
    id: string
    label: string
    obligatoire: boolean
    articleReference: string
    source: string
  }
  document: {
    dateEmission: Date
    fichierUrl: string
    dateExpiration: Date | null
  } | null
  statut: StatutPiece
  dateDepotAO: Date
  onUpload: (pieceId: string, fichier: File) => Promise<void>
}

const STATUT_STYLES: Record<StatutPiece, { border: string, bg: string, badge: string, label: string, icon: React.ReactNode }> = {
  valide: {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/5',
    badge: 'bg-emerald-500/10 text-emerald-600',
    label: 'Valide',
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />
  },
  attention: {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/5',
    badge: 'bg-amber-500/10 text-amber-600',
    label: 'À renouveler',
    icon: <AlertCircle className="w-4 h-4 text-amber-500" />
  },
  perime: {
    border: 'border-red-500/30',
    bg: 'bg-red-500/5',
    badge: 'bg-red-500/10 text-red-600',
    label: 'Périmé au dépôt',
    icon: <AlertCircle className="w-4 h-4 text-red-500" />
  },
  manquant: {
    border: 'border-border/10',
    bg: 'bg-transparent',
    badge: 'bg-muted/50 text-muted-foreground/40',
    label: 'Manquant',
    icon: <Circle className="w-4 h-4 text-muted-foreground/20" />
  }
}

export function PieceAdministrative({
  piece, document, statut, dateDepotAO, onUpload
}: PieceAdministrativeProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const style = STATUT_STYLES[statut]

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setIsUploading(true)
      try {
        await onUpload(piece.id, e.target.files[0])
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <div className={cn(
      "rounded-[4px] border p-4 transition-all duration-300",
      "flex items-center gap-4 group",
      style.border, style.bg,
      "hover:scale-[1.01]"
    )}>
      {/* ICÔNE STATUT */}
      <div className="shrink-0">
        {style.icon}
      </div>

      {/* INFORMATIONS CENTRALES */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs font-semibold text-foreground uppercase tracking-tight">
            {piece.label}
          </p>
          {piece.obligatoire && (
            <span className="text-[8px] font-semibold bg-muted/50 px-1.5 py-0.5 rounded-[2px] text-muted-foreground/60 uppercase tracking-widest border border-border/10">
              ELIMINATOIRE
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <p className="text-[10px] font-semibold text-muted-foreground/30 font-mono tracking-tighter uppercase">
            {piece.articleReference} · Origin: {piece.source}
          </p>
          {document?.dateExpiration && (
            <div className="h-3 w-px bg-border/20" />
          )}
          {document?.dateExpiration && (
            <p className="text-[10px] font-semibold text-muted-foreground/40 tabular-nums uppercase tracking-tighter">
              Expire: {document.dateExpiration.toLocaleDateString('fr-CM')}
            </p>
          )}
        </div>
      </div>

      {/* ACTIONS ET BADGE */}
      <div className="flex items-center gap-4 shrink-0">
        <span className={cn(
          "text-[9px] px-2 py-1 rounded-[4px] font-semibold uppercase tracking-widest border",
          style.badge,
          style.border
        )}>
          {style.label}
        </span>

        {statut === 'manquant' || statut === 'perime' ? (
          <label className={cn(
            "flex items-center gap-2 h-8 px-4 rounded-[4px] text-[10px] font-semibold uppercase tracking-widest cursor-pointer transition-all",
            "border border-border/10 bg-card hover:bg-primary/5 hover:border-primary/20 hover:text-primary active:scale-95",
            isUploading && "opacity-50 pointer-events-none"
          )}>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <FileUp className="w-3 h-3" />
            {isUploading ? "Envoi..." : "Uploader"}
          </label>
        ) : (
          <a
            href={document?.fichierUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 h-8 px-4 rounded-[4px] text-[10px] font-semibold uppercase tracking-widest transition-all",
              "border border-border/10 bg-card hover:bg-muted hover:text-foreground active:scale-95"
            )}
          >
            <Eye className="w-3 h-3" />
            Voir
          </a>
        )}
      </div>
    </div>
  )
}
