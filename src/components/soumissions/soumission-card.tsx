// ══════════════════════════════════════════
// SABI — Carte Kanban (Sprint B.2)
// ══════════════════════════════════════════

'use client'

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { StatutSoumission } from "@/lib/soumissions/pipeline"

interface SoumissionCardProps {
  soumission: {
    id: string
    appelOffre: {
      reference: string
      intitule: string
      maitreDOuvrage: string
      dateDepot: Date
      montantEstime: number | null
    }
    scoreConformite: number    // 0-100
    statut: StatutSoumission
  }
}

export function SoumissionCard({ soumission }: SoumissionCardProps) {
  const { appelOffre: ao } = soumission
  
  // Calcul de l'urgence temporelle
  const joursRestants = Math.ceil(
    (new Date(ao.dateDepot).getTime() - Date.now()) / 86400000
  )

  const urgenceColor = joursRestants <= 7
    ? 'text-red-500'
    : joursRestants <= 14
    ? 'text-amber-500'
    : 'text-muted-foreground'

  return (
    <Link href={`/dashboard/soumissions/${soumission.id}`}>
      <div className={cn(
        "group relative flex flex-col gap-3 p-3.5 rounded-[4px] border border-border/20 bg-card transition-all duration-300",
        "z-10 hover:z-20 hover:border-primary/40 hover:bg-muted/5 hover:scale-[1.01] cursor-pointer shadow-none hover:ring-1 hover:ring-primary/20"
      )}>
        {/* TOP: RÉFÉRENCE + TIMER */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-semibold text-muted-foreground/30 uppercase tracking-tighter">
            {ao.reference}
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-muted/20 border border-border/5">
            <span className={cn("text-[10px] font-semibold tabular-nums tracking-tighter", urgenceColor)}>
              {soumission.statut === 'soumis' ? '✓ DÉPOSÉ' : `J-${joursRestants}`}
            </span>
          </div>
        </div>

        {/* MIDDLE: INTITULÉ & MO */}
        <div className="space-y-1">
          <p className="text-[13px] font-semibold text-foreground leading-[1.3] line-clamp-2 tracking-tight group-hover:text-primary transition-colors">
            {ao.intitule}
          </p>
          <p className="text-[10px] font-medium text-muted-foreground/40 uppercase tracking-widest truncate">
            {ao.maitreDOuvrage}
          </p>
        </div>

        {/* BOT: PROGRESSION (Brutalist Bar) */}
        <div className="space-y-2 py-2 border-y border-border/5">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[8px] font-semibold tracking-widest text-muted-foreground/40 uppercase">
                 <span>BLINDAGE ADMINISTRATIF</span>
                 <span className="tabular-nums">{soumission.scoreConformite}%</span>
              </div>
              <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    soumission.scoreConformite === 100 ? 'bg-emerald-500' : 'bg-primary'
                  )}
                  style={{ width: `${soumission.scoreConformite}%` }}
                />
              </div>
            </div>
        </div>

        {/* FOOTER: MONTANT ESTIMÉ */}
        {ao.montantEstime && (
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-muted-foreground/20 uppercase tracking-widest">Estimation</span>
            <span className="text-[11px] font-semibold tabular-nums text-foreground/80 tracking-tighter">
              {new Intl.NumberFormat('fr-CM', {
                notation: 'compact',
                maximumFractionDigits: 1
              }).format(ao.montantEstime)} FCFA
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
