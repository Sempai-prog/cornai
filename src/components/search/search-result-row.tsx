// ══════════════════════════════════════════
// SABI — Ligne de Résultat (Logic V4 — Triage & Inception Transition)
// ══════════════════════════════════════════

"use client"

import * as React from "react"
import { 
  Building2, 
  ChevronRight,
  MapPin,
  Clock,
  ArrowLeft
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SearchRowDetail } from "./search-row-detail"
import { TenderInspectorPanel } from "./tender-inspector-panel"
import { RpaoDecoderPanel } from "./rpao-decoder-panel"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { createOrGetSoumission } from "@/app/actions/soumissions"
import { SearchResult } from "./search-types"
import { formatMarketType } from "./search-utils"

interface SearchResultRowProps {
  item: SearchResult
  onOpenDecoder?: () => void
}

export function SearchResultRow({ item, onOpenDecoder: onOpenExternalDecoder }: SearchResultRowProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [activePanel, setActivePanel] = React.useState<'triage' | 'inspector' | 'decoder'>('triage')
  const [isStarting, setIsStarting] = React.useState(false)
  const router = useRouter()
  
  const handleToggleExpand = () => {
    if (isExpanded && activePanel !== 'triage') {
      setActivePanel('triage')
    } else {
      setIsExpanded(!isExpanded)
      if (!isExpanded) setActivePanel('triage')
    }
  }

  const handleStartWorkflow = async () => {
    if (isStarting) return;
    setIsStarting(true);
    try {
      const res = await createOrGetSoumission(item.id);
      if (res.success && res.id) {
        router.push(`/dashboard/terrain?soumissionId=${res.id}`);
      } else {
        alert(res.error || "Une erreur est survenue");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsStarting(false);
    }
  }

  const joursRestants = item.daysRemaining;
  const urlParams = typeof window !== 'undefined' ? new URL(window.location.href).searchParams : null;
  const currentSoumissionId = urlParams ? urlParams.get('soumissionId') : null;

  // Indice SABI — Config Style (Identique à l'exemple fourni)
  const indiceConfig = item.matchScore >= 80 
    ? { color: 'text-emerald-600', bg: 'bg-emerald-500/10', label: 'Fort' }
    : item.matchScore >= 60
    ? { color: 'text-amber-600', bg: 'bg-amber-500/10', label: 'Moyen' }
    : { color: 'text-red-600', bg: 'bg-red-500/10', label: 'Faible' };

  // Urgence temporelle
  const urgenceColor = joursRestants <= 7 
    ? 'text-red-500' 
    : joursRestants <= 14 
    ? 'text-amber-500' 
    : 'text-muted-foreground';

  return (
    <div 
      className={cn(
        // V1.6 strict : zéro shadow, border 1px, radius 4px
        "group/card relative flex flex-col overflow-hidden rounded-[4px] border border-border/10 bg-card transition-all duration-300",
        isExpanded ? "mb-4 border-border/20 bg-card shadow-none scale-[1.01] z-10" : "hover:bg-muted/5 hover:border-border/20"
      )}
    >
      {/* ───────────────────────────────────────────────────────────
          PLAN A.1 — AO LIST ITEM (DENSE ROW — VERSION PROPRE)
          ─────────────────────────────────────────────────────────── */}
      <div 
        className={cn(
          "flex items-center p-3 cursor-pointer gap-4 select-none transition-all duration-100 group/row",
        )}
        onClick={handleToggleExpand}
      >
        {/* 1. INDICE SABI — Chiffre seul, lisible d'un coup d'œil */}
        <div className={cn(
          "w-10 h-10 rounded-[4px] flex-shrink-0 flex flex-col items-center justify-center transition-transform group-hover/row:scale-105",
          indiceConfig.bg
        )}>
          <span className={cn(
            "text-sm font-semibold tabular-nums leading-none",
            indiceConfig.color
          )}>
            {item.matchScore}
          </span>
          <span className="text-[7px] font-semibold text-muted-foreground/40 mt-0.5 tracking-tighter uppercase">
            /100
          </span>
        </div>

        {/* 2. INFORMATIONS PRINCIPALES */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground truncate group-hover/row:text-primary transition-colors tracking-tight">
            {item.title}
          </p>
          <p className="text-[10px] font-medium text-muted-foreground/60 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
            {item.authority} <span className="text-muted-foreground/20 px-1">·</span> {item.region} <span className="text-muted-foreground/20 px-1">·</span> {item.sector}
          </p>
          <p className="text-[9px] text-muted-foreground/30 font-mono mt-1 tracking-tighter uppercase whitespace-nowrap">
            Réf: {item.id}
          </p>
        </div>

        {/* 3. DONNÉES FINANCIÈRES ET TEMPORELLES */}
        <div className="flex-shrink-0 text-right flex flex-col items-end gap-1 px-2">
          {item.budget && (
            <p className="text-xs font-semibold tabular-nums text-foreground">
              {item.budget}
            </p>
          )}
          <div className="flex items-center gap-1.5">
             <p className={cn("text-[10px] tabular-nums font-semibold tracking-tight", urgenceColor)}>
               ⏳ J-{joursRestants}
             </p>
             <div className={cn(
               "h-4 w-4 rounded-[4px] flex items-center justify-center transition-all bg-muted/20 text-muted-foreground/40 group-hover/row:text-primary border border-border/10",
               isExpanded && "bg-primary/5 text-primary rotate-90"
             )}>
               <ChevronRight size={12} className="transition-transform" />
             </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          PHASE 2 & 3 : INCEPTION (TRIAGE & DEEP DIVE INTEGRATED)
          ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/10 relative"
          >
             <AnimatePresence mode="wait">
                {activePanel === 'triage' ? (
                  <motion.div
                    key="triage"
                    initial={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SearchRowDetail 
                        item={item} 
                        onOpenInspector={() => setActivePanel('inspector')}
                        onOpenDecoder={() => setActivePanel('decoder')}
                    />
                  </motion.div>
                ) : activePanel === 'inspector' ? (
                  <motion.div
                    key="inspector"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    className="p-6 bg-card"
                  >
                    <button 
                       onClick={() => setActivePanel('triage')}
                       className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-primary transition-colors mb-6 group"
                    >
                       <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                       Retour à l&apos;analyse rapide
                    </button>
                    
                    <div className="border border-border/10 rounded-[4px] overflow-hidden bg-muted/10">
                        <TenderInspectorPanel 
                            item={item} 
                            onStartWorkflow={handleStartWorkflow} 
                            isInceptionMode={true}
                            isStarting={isStarting}
                        />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="decoder"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    className="p-6 bg-card"
                  >
                    <button 
                       onClick={() => setActivePanel('triage')}
                       className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-primary transition-colors mb-6 group"
                    >
                       <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                       Retour à l&apos;analyse rapide
                    </button>
                    
                    <div className="border border-border/10 rounded-[4px] overflow-hidden bg-muted/10">
                        <RpaoDecoderPanel 
                            item={item} 
                            onStartWorkflow={handleStartWorkflow} 
                            isInceptionMode={true}
                            isStarting={isStarting}
                        />
                    </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
