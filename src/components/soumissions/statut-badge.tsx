// ══════════════════════════════════════════
// SABI — Statut Badge (Sprint C.2)
// ══════════════════════════════════════════

import { cn } from "@/lib/utils"
import { StatutSoumission } from "@/lib/soumissions/pipeline"

const STATUT_CONFIG: Record<StatutSoumission, { label: string, className: string }> = {
  analyse: { label: 'Analyse', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  montage: { label: 'Montage', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  pret: { label: 'Prêt', className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  soumis: { label: 'Soumis', className: 'bg-slate-500/10 text-slate-500 border-slate-500/20' },
}

export function StatutBadge({ statut }: { statut: StatutSoumission }) {
  const config = STATUT_CONFIG[statut] || { label: statut, className: 'bg-muted text-muted-foreground' }
  
  return (
    <span className={cn(
      "px-2 py-0.5 rounded-[4px] border text-[9px] font-semibold uppercase tracking-widest",
      config.className
    )}>
      {config.label}
    </span>
  )
}
