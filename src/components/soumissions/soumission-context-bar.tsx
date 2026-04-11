// ══════════════════════════════════════════
// SABI — Barre de Contexte (Sprint C.2 — Final)
// ══════════════════════════════════════════

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { StatutBadge } from "./statut-badge"

interface SoumissionContextBarProps {
  soumission: any // SoumissionComplete
}

export function SoumissionContextBar({ soumission }: SoumissionContextBarProps) {
  const ao = soumission.appelOffre
  const joursRestants = Math.ceil(
    (new Date(ao.dateDepot || ao.dateLimiteSoumission).getTime() - Date.now()) / 86400000
  )

  const avancementGlobal = Math.round(
    ((soumission.avancementAdmin || 0) + 
     (soumission.avancementTech || 0) + 
     (soumission.avancementFinancier || 0)) / 3
  )

  return (
    <div className={cn(
      "border-b border-border/10 bg-card px-6 py-3 sticky top-0 z-50 backdrop-blur-md",
      "flex items-center justify-between gap-4 h-14"
    )}>
      {/* Breadcrumb + Titre */}
      <div className="flex items-center gap-3 min-w-0">
        <Link
          href="/dashboard/soumissions"
          className="text-[10px] font-semibold text-muted-foreground/40 hover:text-primary transition-colors uppercase tracking-widest whitespace-nowrap"
        >
          ← Soumissions
        </Link>
        <span className="text-muted-foreground/20">·</span>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-foreground truncate uppercase tracking-tight">
            {ao.titreComplet || ao.intitule}
          </p>
          <p className="text-[9px] font-semibold text-muted-foreground/30 font-mono uppercase tracking-tighter">
            {ao.id.slice(0, 8).toUpperCase()} · {ao.institution || ao.maitreDOuvrage}
          </p>
        </div>
      </div>

      {/* Métriques rapides */}
      <div className="flex items-center gap-6 flex-shrink-0">
        {/* Avancement global */}
        <div className="text-right">
          <p className="text-[9px] font-semibold text-muted-foreground/30 uppercase tracking-widest">Avancement</p>
          <p className="text-xs font-semibold tabular-nums text-foreground">
            {avancementGlobal}%
          </p>
        </div>

        {/* Séparateur */}
        <div className="w-px h-6 bg-border/10" />

        {/* Compte à rebours */}
        <div className="text-right">
          <p className="text-[9px] font-semibold text-muted-foreground/30 uppercase tracking-widest">Dépôt dans</p>
          <p className={cn(
            "text-xs font-semibold tabular-nums",
            joursRestants <= 7 ? 'text-red-500'
            : joursRestants <= 14 ? 'text-amber-500'
            : 'text-foreground'
          )}>
             {soumission.statut === 'soumis' ? 'TERMINE' : `J-${joursRestants}`}
          </p>
        </div>

        {/* Séparateur */}
        <div className="w-px h-6 bg-border/10" />

        {/* Statut */}
        <StatutBadge statut={soumission.statut} />
      </div>
    </div>
  )
}
