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
import { cn } from "@/lib/utils"
import { SearchResult } from "./search-types"
import { formatMarketType } from "./search-utils"
import { AnimatePresence, motion } from "framer-motion"

interface SearchResultRowProps {
  item: SearchResult
}

export function SearchResultRow({ item }: SearchResultRowProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [showFullDao, setShowFullDao] = React.useState(false)
  
  const handleToggleExpand = () => {
    if (isExpanded && showFullDao) {
      setShowFullDao(false)
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  const handleStartWorkflow = () => {
    console.log(`Starting workflow for: ${item.id}`);
  }

  return (
    <div 
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-[4px] border border-border/10 bg-card transition-all duration-300",
        isExpanded ? "mb-4 border-border/20 bg-card shadow-none" : "hover:bg-card hover:border-border/20"
      )}
    >
      {/* ───────────────────────────────────────────────────────────
          DENSE ROW (MODULAIRE & GRAPHIQUE)
          ─────────────────────────────────────────────────────────── */}
      <div 
        className={cn(
          "flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 cursor-pointer gap-4 lg:gap-0 select-none transition-all duration-300 ease-out group/row",
          "hover:translate-x-1"
        )}
        onClick={handleToggleExpand}
      >
        {/* COLONNE GAUCHE : IDENTIFICATION & TITRE */}
        <div className="flex-1 flex flex-col min-w-0 pr-0 sm:pr-8">
           {/* TAG TECHNIQUE RÉFÉRENCE */}
           <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-mono font-bold text-muted-foreground/40 bg-muted/20 px-2 py-0.5 rounded-[4px] tracking-tight">
                 {item.id}
              </span>
              <Badge variant="outline" className="h-4.5 rounded-[4px] border-none bg-primary/10 px-2 text-[10px] font-black text-primary uppercase tracking-[0.1em]">
                 {formatMarketType(item.type)}
              </Badge>
           </div>
           
           <h3 className="text-[15px] font-semibold text-foreground mb-2 leading-snug group-hover/row:text-primary transition-colors tracking-tight line-clamp-2">
             {item.title}
           </h3>

           <div className="flex items-center gap-4 text-[11px] font-bold text-foreground/30 uppercase tracking-tighter">
              <div className="flex items-center gap-1.5 grayscale group-hover/row:grayscale-0 transition-all">
                 <Building2 className="h-3 w-3" />
                 <span className="truncate max-w-[200px]">{item.authority}</span>
              </div>
              <div className="flex items-center gap-1.5">
                 <MapPin className="h-3 w-3" />
                 <span>{item.region}</span>
              </div>
           </div>
        </div>

        {/* COLONNE DROITE : BUSINESS & DATA */}
        <div className="flex items-center gap-4 sm:gap-8 shrink-0 w-full sm:w-auto">
           
           {/* IA SCORES */}
           <div className="flex flex-col items-end border-l border-border/10 pl-4 sm:pl-8">
              <div className="flex items-center gap-2">
                 <span className="text-[14px] font-black text-foreground/90 tracking-tighter">
                    {item.matchScore}%
                 </span>
                  <div className={cn(
                     "h-1.5 w-1.5 rounded-full ring-2 ring-primary/5 shadow-lg",
                     item.matchLevel === 'excellent' ? "bg-primary shadow-primary/20" : "bg-muted"
                  )} />
              </div>
              <span className="text-[10px] text-foreground/20 font-bold uppercase tracking-widest mt-1">Compatibilité</span>
           </div>

           {/* BUDGET / COÛT EXIGÉ */}
           <div className="flex flex-col items-end border-l border-border/10 pl-4 sm:pl-8 min-w-[100px] sm:min-w-[140px]">
              <span className="text-[13px] sm:text-[15px] font-semibold text-foreground/80 tracking-tight leading-none text-right">
                 {item.budget || "NC"}
              </span>
              <span className="text-[8px] sm:text-[10px] text-foreground/20 font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] mt-2">
                 {item.type === "Travaux" ? "BUDGET" : "CAUTION"}
              </span>
           </div>

           {/* DÉLAI RÉCHIDUÉ */}
           <div className="flex flex-col items-end border-l border-border/10 pl-4 sm:pl-8 pr-2">
              <div className="flex items-center gap-2">
                 <Clock className="h-3 w-3 text-foreground/20 hidden sm:block" />
                 <span className={cn(
                    "text-[13px] sm:text-[14px] font-black tracking-tighter",
                    parseInt(item.deadline) < 7 ? "text-red-500" : "text-primary/70"
                 )}>J-{item.deadline.split(' ')[0]}</span>
              </div>
              <span className="text-[8px] sm:text-[10px] text-foreground/20 font-black uppercase tracking-widest mt-1">Clôture</span>
           </div>

            <div className="flex items-center ml-4">
               <div className="h-8 w-8 rounded-[4px] flex items-center justify-center text-muted-foreground transition-all group-hover/row:text-primary group-hover/row:bg-primary/5 border border-transparent group-hover/row:border-border/10">
                  <button onClick={(e) => { e.stopPropagation(); handleToggleExpand(); }}>
                     <ChevronRight className={cn("h-4 w-4 transition-transform duration-500", isExpanded && "rotate-90")} />
                  </button>
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
                {!showFullDao ? (
                  <motion.div
                    key="triage"
                    initial={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SearchRowDetail 
                        item={item} 
                        onOpenInspector={() => setShowFullDao(true)}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="inspector"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    className="p-6 bg-card"
                  >
                    <button 
                       onClick={() => setShowFullDao(false)}
                       className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-primary transition-colors mb-6 group"
                    >
                       <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                       Retour à l&apos;analyse rapide
                    </button>
                    
                    <div className="border border-border/10 rounded-[4px] overflow-hidden bg-muted/5">
                        <TenderInspectorPanel 
                            item={item} 
                            onStartWorkflow={handleStartWorkflow} 
                            isInceptionMode={true}
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
