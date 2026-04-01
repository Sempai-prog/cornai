// ══════════════════════════════════════════
// CORNAi — Ligne de Résultat (Logic V4 — Triage & Deep Dive)
// ══════════════════════════════════════════

"use client"

import * as React from "react"
import { 
  Building2, 
  Calendar, 
  ChevronRight,
  Target,
  AlertTriangle,
  Zap,
  MapPin,
  ExternalLink,
  ChevronDown,
  Clock,
  X
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetDescription, SheetHeader } from "@/components/ui/sheet"
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
  const [isInspectorOpen, setIsInspectorOpen] = React.useState(false)
  
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleStartWorkflow = () => {
    setIsInspectorOpen(false)
    // Ici, on pourrait déclencher une navigation vers le tableau de bord projet ou mettre à jour le state global
    console.log(`Starting workflow for: ${item.id}`);
  }

  return (
    <div 
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-[4px] border border-white/5 bg-[#0c0c0c]/40 transition-all duration-300",
        isExpanded ? "mb-4 border-white/10 bg-white/[0.02] shadow-xl" : "hover:bg-white/[0.02] hover:border-white/10"
      )}
    >
      {/* ───────────────────────────────────────────────────────────
          DENSE ROW (MODULAIRE & GRAPHIQUE)
          ─────────────────────────────────────────────────────────── */}
      <div 
        className={cn(
          "flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-5 cursor-pointer select-none transition-all duration-300 ease-out group/row",
          "hover:translate-x-1"
        )}
        onClick={handleToggleExpand}
      >
        {/* COLONNE GAUCHE : IDENTIFICATION & TITRE */}
        <div className="flex-1 flex flex-col min-w-0 pr-8">
           {/* TAG TECHNIQUE RÉFÉRENCE */}
           <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-mono font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded tracking-tight">
                 {item.id}
              </span>
              <Badge variant="outline" className="h-4.5 rounded-[2px] border-none bg-primary/10 px-2 text-[8px] font-black text-primary uppercase tracking-[0.1em]">
                 {formatMarketType(item.type)}
              </Badge>
           </div>
           
           <h3 className="text-[15px] font-medium text-white mb-2 leading-snug group-hover/row:text-primary transition-colors tracking-tight line-clamp-2">
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
        <div className="flex items-center gap-8 shrink-0 mt-4 md:mt-0">
           
           {/* IA SCORES */}
           <div className="hidden lg:flex flex-col items-end border-l border-white/5 pl-8">
              <div className="flex items-center gap-2">
                 <span className="text-[14px] font-black text-white/90 tracking-tighter">
                    {item.matchScore}%
                 </span>
                 <div className={cn(
                    "h-1.5 w-1.5 rounded-full ring-2 ring-primary/5 shadow-lg",
                    item.matchLevel === 'excellent' ? "bg-primary shadow-primary/20" : "bg-foreground/10"
                 )} />
              </div>
              <span className="text-[8px] text-foreground/20 font-bold uppercase tracking-widest mt-1">Compatibilité</span>
           </div>

           {/* BUDGET / COÛT EXIGÉ */}
           <div className="flex flex-col items-end border-l border-white/5 pl-8 min-w-[140px]">
              <span className="text-[15px] font-semibold text-slate-200 tracking-tight leading-none">
                 {item.budget || "NC"}
              </span>
              <span className="text-[8px] text-foreground/20 font-black uppercase tracking-[0.15em] mt-2">
                 {item.type === "Travaux" ? "BUDGET ESTIMÉ" : "CAUTION EXIGÉE"}
              </span>
           </div>

           {/* DÉLAI RÉCHIDUÉ */}
           <div className="flex flex-col items-end border-l border-white/5 pl-8 pr-2">
              <div className="flex items-center gap-2">
                 <Clock className="h-3 w-3 text-foreground/20" />
                 <span className={cn(
                    "text-[14px] font-black tracking-tighter",
                    parseInt(item.deadline) < 7 ? "text-red-500" : "text-primary/70"
                 )}>J-{item.deadline.split(' ')[0]}</span>
              </div>
              <span className="text-[8px] text-foreground/20 font-black uppercase tracking-widest mt-1">Clôture</span>
           </div>

           <div className="flex items-center ml-4">
              <div className="h-8 w-8 rounded-full flex items-center justify-center text-foreground/10 group-hover/row:text-primary group-hover/row:bg-primary/5 transition-all">
                 <ChevronRight className={cn("h-4 w-4 transition-transform duration-500", isExpanded && "rotate-90")} />
              </div>
           </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          PHASE 2 : TRIAGE (EXPANSION MINI-BENTO)
          ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/5"
          >
             <SearchRowDetail 
                item={item} 
                onOpenInspector={() => setIsInspectorOpen(true)}
             />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────────────────────────────────────────────────────
          PHASE 3 : DEEP DIVE (INSPECTEUR LATÉRAL)
          ─────────────────────────────────────────────────────────── */}
      {/* ───────────────────────────────────────────────────────────
          PHASE 3 : DEEP DIVE (INSPECTEUR LATÉRAL — CUSTOM MOTION)
          ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isInspectorOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* OVERLAY CLICQUABLE */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsInspectorOpen(false)}
               className="absolute inset-0 bg-black/60 backdrop-blur-[2px] cursor-pointer"
            />
            
            {/* PANNEAU D'INSPECTION (STYLE APPLE — SLIDE FROM RIGHT) */}
            <motion.div 
               initial={{ x: "100%" }}
               animate={{ x: 0 }}
               exit={{ x: "100%" }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="fixed inset-y-0 right-0 h-screen w-full sm:w-[500px] z-[101] bg-[#0c0c0c] border-l border-white/10 rounded-l-[4px] shadow-2xl overflow-hidden flex flex-col"
            >
               {/* BOUTON FERMER À L'INTÉRIEUR DU PANNEAU */}
               <button 
                  onClick={() => setIsInspectorOpen(false)}
                  className="absolute top-8 right-8 z-[110] h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group"
               >
                  <X className="h-5 w-5 text-foreground/40 group-hover:text-white transition-colors" />
               </button>

               <TenderInspectorPanel 
                  item={item} 
                  onStartWorkflow={handleStartWorkflow} 
               />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
