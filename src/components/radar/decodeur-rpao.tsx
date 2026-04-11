'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Flame, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CritereRPAO {
  libelle: string           // "Chiffre d'affaires minimum"
  exigence: string          // "500 M FCFA"
  valeurPME: string         // "1.8 MD FCFA"
  statut: 'ok' | 'attention' | 'bloquant'
}

interface DecodeurRPAOProps {
  ouvert: boolean
  onClose: () => void
  ao: {
    id: string
    reference: string
    intitule: string
    maitreDOuvrage: string
    indiceSabi: number
    criteres: CritereRPAO[]
  } | null
  onEngager: (aoId: string) => void
}

// Icône et style par statut
const STATUT_CONFIG = {
  ok: {
    icon: CheckCircle,
    className: 'text-emerald-500',
    bgClassName: 'bg-emerald-500/8',
    label: 'Conforme'
  },
  attention: {
    icon: AlertTriangle,
    className: 'text-amber-500',
    bgClassName: 'bg-amber-500/8',
    label: 'À surveiller'
  },
  bloquant: {
    icon: XCircle,
    className: 'text-red-500',
    bgClassName: 'bg-red-500/8',
    label: 'Éliminatoire'
  }
}

export function DecodeurRPAO({ ouvert, onClose, ao, onEngager }: DecodeurRPAOProps) {
  if (!ao) return null

  const aDesBloquants = ao.criteres.some(c => c.statut === 'bloquant')
  const aDesAttentions = ao.criteres.some(c => c.statut === 'attention')

  const verdict = aDesBloquants
    ? { label: 'DOSSIER RISQUÉ', color: 'text-red-600', bg: 'bg-red-500/10' }
    : aDesAttentions
    ? { label: 'OPPORTUNITÉ SOUS CONDITIONS', color: 'text-amber-600', bg: 'bg-amber-500/10' }
    : { label: 'OPPORTUNITÉ FORTE', color: 'text-emerald-600', bg: 'bg-emerald-500/10' }

  return (
    <Sheet open={ouvert} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[420px] sm:w-[500px] border-l border-border/10 p-0 flex flex-col bg-card"
      >
        {/* Header */}
        <header className="px-6 py-5 border-b border-border/10 bg-muted/5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono font-semibold text-muted-foreground/40 uppercase tracking-widest leading-none">
                Décodeur RPAO · {ao.reference}
              </p>
              <SheetTitle className="text-lg font-semibold mt-2 leading-tight tracking-tighter uppercase line-clamp-2">
                {ao.intitule}
              </SheetTitle>
              <p className="text-[10px] font-semibold text-muted-foreground/40 mt-1 uppercase tracking-widest">
                {ao.maitreDOuvrage}
              </p>
            </div>
            {/* Indice SABI dans le header */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-[4px] bg-primary/5 border border-primary/10 flex flex-col items-center justify-center">
                <span className="text-xl font-semibold tabular-nums text-primary leading-none">
                  {ao.indiceSabi}
                </span>
                <span className="text-[8px] font-semibold text-primary/40 mt-1 uppercase tracking-tighter">SABI</span>
              </div>
            </div>
          </div>
        </header>

        {/* Corps — Critères */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 custom-scrollbar">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-semibold text-muted-foreground/30 uppercase tracking-[0.2em]">
              Critères éliminatoires · Art. 15.1 RPAO
            </p>
            <div className="h-[1px] flex-1 bg-border/5 ml-4" />
          </div>

          <div className="space-y-3">
            {ao.criteres.map((critere, index) => {
              const config = STATUT_CONFIG[critere.statut]
              const Icon = config.icon

              return (
                <div
                  key={index}
                  className={cn(
                    "rounded-[4px] border p-4 transition-all duration-300",
                    critere.statut === 'ok' && "border-emerald-500/10 bg-emerald-500/[0.02]",
                    critere.statut === 'attention' && "border-amber-500/10 bg-amber-500/[0.02]",
                    critere.statut === 'bloquant' && "border-red-500/10 bg-red-500/[0.02]",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("p-1 rounded-[4px]", config.bgClassName)}>
                       <Icon className={cn("w-3.5 h-3.5", config.className)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-foreground leading-tight tracking-tight uppercase">
                        {critere.libelle}
                      </p>
                      <div className="flex items-center justify-between mt-3 text-[10px]">
                        <span className="font-medium text-muted-foreground/40 uppercase tracking-wider">
                          Exigé : <span className="text-foreground/60">{critere.exigence}</span>
                        </span>
                        <span className={cn("font-semibold uppercase tracking-widest", config.className)}>
                          Vous : {critere.valeurPME}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer — Verdict + Action */}
        <div className="border-t border-border/10 px-6 py-5 bg-muted/5 space-y-4">
          {/* Verdict */}
          <div className={cn(
            "rounded-[4px] px-4 py-3 flex items-center justify-between border border-border/5",
            verdict.bg
          )}>
            <div className="flex flex-col">
              <span className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-[0.2em] leading-none mb-1">Verdict de Qualification</span>
              <span className={cn("text-sm font-semibold tracking-tighter uppercase", verdict.color)}>
                {verdict.label}
              </span>
            </div>
            {aDesBloquants ? (
              <XCircle className="h-5 w-5 text-red-500/40" />
            ) : (
              <CheckCircle className="h-5 w-5 text-emerald-500/40" />
            )}
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 rounded-[4px] h-10 text-[10px] font-semibold uppercase tracking-widest border-border/10 hover:bg-muted/30"
              onClick={onClose}
            >
              Ignorer l&apos;offre
            </Button>
            <Button
              size="sm"
              className={cn(
                "flex-1 rounded-[4px] h-10 text-[10px] font-semibold uppercase tracking-widest gap-2 shadow-none",
                !aDesBloquants ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
              onClick={() => onEngager(ao.id)}
              disabled={aDesBloquants}
            >
              <Flame className={cn("w-3.5 h-3.5", !aDesBloquants && "animate-pulse")} />
              {aDesBloquants ? 'Dossier risqué' : 'Engager Soumission'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
