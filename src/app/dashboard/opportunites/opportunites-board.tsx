"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Activity,
  ShieldAlert,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { createOrGetSoumission } from "@/app/actions/soumissions"
import { Badge } from "@/components/ui/badge"
import { StandardPageHeader } from "@/components/layout/standard-page-header"
import { SABI_COPY } from "@/lib/SabiCopy"
import type { Opportunity, OpportunityStatus } from "@/app/actions/matchings-pipeline"

// ═══════════════════════════════════════════
// CONFIGURATION DES ÉTAPES DU PIPELINE
// ═══════════════════════════════════════════
const PIPELINE_STAGES = [
  {
    id: 'veille',
    label: 'VEILLE & QUALIFICATION',
    sublabel: 'Matches IA',
    dot: 'bg-primary',           // Vert = actif
  },
  {
    id: 'go_no_go',
    label: 'GO / NO-GO',
    sublabel: 'Critères RPAO',
    dot: 'bg-amber-500',         // Orange = décision
  },
  {
    id: 'montage',
    label: 'MONTAGE DOSSIER',
    sublabel: 'Enveloppes A, B, C',
    dot: 'bg-primary',           // Vert = actif
  },
  {
    id: 'soumis',
    label: 'SOUMIS / EN ATTENTE',
    sublabel: 'COLEPS · ARMP',
    dot: 'bg-muted-foreground/30', // Gris = en attente
  },
  {
    id: 'resultat',
    label: 'RÉSULTATS',
    sublabel: 'Attribution · Rejet',
    dot: 'bg-muted-foreground/30', // Gris = futur
  },
]

export function OpportunitesBoard({ initialItems }: { initialItems: Opportunity[] }) {
  const [items, setItems] = React.useState(initialItems)

  const avgScore = items.length > 0 
    ? (items.reduce((acc, curr) => acc + curr.score, 0) / items.length).toFixed(1)
    : "0.0"

  // Grouper les opportunités par statut mappé aux stages
  const byStage = {
    veille: items.filter(o => o.status === 'QUALIF'),
    go_no_go: items.filter(o => o.status === 'DECISION'),
    montage: items.filter(o => o.status === 'MONTAGE'),
    soumis: items.filter(o => o.status === 'DEPOT'),
    resultat: items.filter(o => o.status === 'ATTRIBUTION'),
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 antialiased bg-transparent min-h-screen">
      
      {/* HEADER — Standard SABI V1.6 */}
      <StandardPageHeader
        title={SABI_COPY.NAVIGATION.OPPORTUNITES}
        metadata="POSTE DE PILOTAGE — SÉLECTION IA"
        description={
          <p>
            Opportunités qualifiées spécifiquement pour le profil <span className="text-primary font-semibold">Antigravity BTP</span> par le moteur SABI Matcher.
            <span className="block mt-1">
              Visualisation chirurgicale du flux <span className="text-foreground/40 font-semibold uppercase tracking-widest">ARMP / COLEPS</span>.
            </span>
          </p>
        }
        cardA={{
          label: "OPPORTUNITÉS",
          value: items.length.toString().padStart(2, '0'),
          subtext: "Filtrées par IA",
          color: "primary",
        }}
        cardB={{
          label: "CONFIANCE IA",
          value: `${avgScore}%`,
          subtext: "Indice de Match",
          progress: parseFloat(avgScore),
          color: "emerald",
        }}
      />

      {/* WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        
        {/* TIMELINE COLUMN */}
        <div className="lg:col-span-8 flex flex-col min-w-0 h-full">
            <div className="relative">
              {/* Titre de section */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-semibold text-primary uppercase tracking-[0.2em]">
                  Cycle de Vie des Soumissions
                </span>
                <div className="flex-1 h-px bg-primary/20" />
                <span className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-widest">
                  {items.length} dossier{items.length !== 1 ? 's' : ''} actif{items.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Timeline */}
              <div className="relative pl-6">
                
                {/* Ligne verticale de connexion */}
                <div className="absolute left-[7px] top-4 bottom-4 w-px bg-border/5" />

                {PIPELINE_STAGES.map((stage) => {
                  const stageOpps = byStage[stage.id as keyof typeof byStage] || []
                  const isEmpty = stageOpps.length === 0

                  return (
                    <div key={stage.id} className="relative mb-6 last:mb-0">

                      {/* ─── EN-TÊTE DE L'ÉTAPE ─── */}
                      <div className="flex items-center gap-3 py-2 sticky top-0 bg-background z-10 mb-4">
                        {/* Dot de l'étape */}
                        <div className={cn(
                          "absolute -left-[23px] h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center z-20",
                          isEmpty ? "bg-muted/30" : stage.dot
                        )} />

                        {/* Label étape */}
                        <div className="flex items-center gap-3 flex-1">
                          <span className={cn(
                            "text-[11px] font-semibold uppercase tracking-[0.2em]",
                            isEmpty ? "text-muted-foreground/20" : "text-foreground/80"
                          )}>
                            {stage.label}
                          </span>
                          <span className="text-[10px] font-semibold text-muted-foreground/20 uppercase tracking-widest">
                            {stage.sublabel}
                          </span>
                        </div>

                        {/* Compteur */}
                        <span className={cn(
                          "text-[10px] font-semibold px-2 py-0.5 rounded-[2px] transition-colors",
                          stageOpps.length > 0
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-muted/10 text-muted-foreground/20 border border-border/5"
                        )}>
                          {stageOpps.length} AO
                        </span>

                        {/* Ligne horizontale */}
                        <div className="flex-none w-8 h-px bg-border/5" />
                      </div>

                      {/* ─── CARDS DE L'ÉTAPE ─── */}
                      <div className="space-y-3 pb-2">
                        {stageOpps.length > 0 ? (
                          <AnimatePresence mode="popLayout">
                            {stageOpps.map((opp) => (
                              <PipelineRow key={opp.id} opportunity={opp} />
                            ))}
                          </AnimatePresence>
                        ) : (
                          <EmptyStageRow stage={stage} />
                        )}
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>
        </div>

        {/* SIDEBAR ANALYTICS */}
        <div className="lg:col-span-4 flex flex-col gap-4 sticky top-6 self-start shrink-0">
           <div className="flex items-center mb-6 h-6">
             <h2 className="text-[11px] font-semibold text-foreground/40 uppercase tracking-[0.2em]">
               Diagnostic Pipeline
             </h2>
           </div>

           <div className="bg-card border border-border/5 rounded-[4px] p-6 shadow-none flex flex-col gap-6">
             <div className="flex items-center gap-3 pb-4 border-b border-border/5">
                <div className="h-10 w-10 rounded-[4px] bg-primary/5 flex items-center justify-center border border-primary/10">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/30">
                    Performance Match
                  </span>
                  <p className="text-2xl font-semibold tracking-tighter text-foreground tabular-nums">{avgScore}%</p>
                </div>
             </div>
             
             <p className="text-[11px] text-foreground/50 font-medium leading-relaxed tracking-tight">
               Ce score d'adéquation diagnostique votre éligibilité technique selon les critères critiques du <span className="font-semibold">RPAO</span>.
             </p>
           </div>

           <div className="bg-card border border-border/5 rounded-[4px] p-6 shadow-none">
             <div className="flex items-center gap-3 pb-4 border-b border-border/5 mb-6">
                <div className="h-10 w-10 rounded-[4px] bg-amber-500/5 flex items-center justify-center border border-amber-500/10 text-amber-500">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/30">
                  Alerte Capacité
                </span>
             </div>
             <p className="text-[11px] text-foreground/60 font-medium leading-relaxed tracking-tight">
                {items.filter(i => i.status === 'MONTAGE').length > 0 
                  ? `Analyse SABI : ${items.filter(i => i.status === 'MONTAGE').length} dossiers en cours. Risque de saturation de cautionnement identifié.`
                  : "Aucun dossier critique en montage. Capacité financière de soumission disponible."
                }
             </p>
           </div>
        </div>
      </div>
    </div>
  )
}

function PipelineRow({ opportunity }: { opportunity: Opportunity }) {
  const router = useRouter()
  const [isStarting, setIsStarting] = React.useState(false)

  const scoreColor = opportunity.score >= 60
    ? 'text-primary'
    : opportunity.score >= 30
      ? 'text-amber-500'
      : 'text-red-500'

  const statutLabel = opportunity.status === 'QUALIF' ? 'INDÉFINI' : 'EN COURS'
  const statutConfig = {
    'INDÉFINI': { bg: 'bg-muted/10', text: 'text-muted-foreground/40', border: 'border-border/5' },
    'EN COURS': { bg: 'bg-primary/5', text: 'text-primary', border: 'border-primary/10' },
    'URGENT': { bg: 'bg-red-500/5', text: 'text-red-500', border: 'border-red-500/10' },
  }[opportunity.isUrgent ? 'URGENT' : statutLabel] || { bg: 'bg-muted/10', text: 'text-muted-foreground', border: 'border-border/5' }

  const handleAction = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isStarting) return
    setIsStarting(true)
    try {
        const res = await createOrGetSoumission(opportunity.id)
        if (res.success && res.id) {
            router.push(`/dashboard/terrain?soumissionId=${res.id}`)
        }
    } catch (err) {
        console.error(err)
    } finally {
        setIsStarting(false)
    }
  }

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ x: 4 }}
      onClick={handleAction}
      className={cn(
        "group bg-card border border-border/5 rounded-[4px] p-4 cursor-pointer transition-all hover:border-primary/20 shadow-none relative overflow-hidden",
        isStarting && "opacity-50 grayscale"
      )}
    >
      {/* Ligne 1 : Autorité · Secteur + Score + Statut */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] font-semibold text-foreground/20 uppercase tracking-[0.2em] truncate group-hover:text-primary/60 transition-colors">
            {opportunity.ac} <span className="opacity-40 font-semibold ml-1">/ {opportunity.type}</span>
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className={cn("text-[10px] font-semibold tracking-widest tabular-nums", scoreColor)}>
            {Math.round(opportunity.score || 0)}% MATCH
          </span>
          <span className={cn(
            "text-[8px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] border",
            statutConfig.bg, statutConfig.text, statutConfig.border
          )}>
            {statutLabel}
          </span>
        </div>
      </div>

      {/* Ligne 2 : Titre de l'AO */}
      <p className="text-[13px] font-semibold text-foreground/80 mb-3 line-clamp-2 leading-tight tracking-tight group-hover:text-foreground transition-colors">
        {opportunity.title}
      </p>

      {/* Ligne 3 : Métadonnées */}
      <div className="flex items-center justify-between pt-3 border-t border-border/5">
        <div className="flex items-center gap-4 text-[10px] font-semibold text-muted-foreground/30 uppercase tracking-widest">
          {/* Caution */}
          <span className="flex items-center gap-1.5">
            CAUTION : <span className="text-foreground/40 font-semibold tabular-nums tracking-tighter">{opportunity.caution}</span>
          </span>
          {/* Enveloppes */}
          <span className="flex items-center gap-1.5">
            ENV. <div className="flex gap-1 items-center">
              <div className={cn("w-1.5 h-1.5 rounded-full", opportunity.envelopes.a ? "bg-primary/40" : "bg-muted/10")} />
              <div className={cn("w-1.5 h-1.5 rounded-full", opportunity.envelopes.b ? "bg-primary/40" : "bg-muted/10")} />
              <div className={cn("w-1.5 h-1.5 rounded-full", opportunity.envelopes.c ? "bg-primary/40" : "bg-muted/10")} />
            </div>
          </span>
          {/* Date limite */}
          <span className={cn("font-semibold tracking-widest", opportunity.isUrgent ? "text-red-500/50" : "text-amber-500/30")}>
            {opportunity.deadline}
          </span>
        </div>

        {/* Bouton action */}
        <div className="flex items-center gap-1 text-[10px] font-semibold text-primary hover:text-primary/80 uppercase tracking-[0.2em] transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
          TERRAIN
          <ChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.div>
  )
}

function EmptyStageRow({ stage }: { stage: typeof PIPELINE_STAGES[0] }) {
  return (
    <div className="bg-muted/5 border border-border/5 border-dashed rounded-[4px] p-6 flex items-center justify-center transition-colors hover:bg-muted/8">
      <span className="text-[10px] text-muted-foreground/20 font-semibold uppercase tracking-[0.25em]">
        Aucun dossier en phase {stage.label.toLowerCase()}
      </span>
    </div>
  )
}
