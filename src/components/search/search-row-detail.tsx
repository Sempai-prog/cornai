// ══════════════════════════════════════════
// SABI — Mini-Bento Expansion (Phase 2 — Go/No-Go Triage)
// ══════════════════════════════════════════

"use client"

import * as React from "react"
import { 
  Zap, 
  Flame,
  ChevronRight, 
  Scale,
  Wallet,
  MapPin,
  AlertOctagon,
  Clock,
  Compass
} from "lucide-react"
import { SearchResult } from "./search-types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface SearchRowDetailProps {
  item: SearchResult
  onOpenInspector?: () => void
  onOpenDecoder?: () => void
}

export function SearchRowDetail({ 
  item, 
  onOpenInspector,
  onOpenDecoder
}: SearchRowDetailProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-muted/10 border-y border-border/10 animate-in fade-in slide-in-from-top-2 duration-300">
      
      {/* 🟢 COLONNE 1 : INFORMATIONS CLÉS (Financier & Logistique) */}
      <div className="flex flex-col gap-3 p-4 rounded-[4px] border border-border/10 bg-card/50">
         <div className="space-y-4">
            {/* Sec. 1 : Financier */}
            <div className="space-y-2">
               <div className="flex items-center gap-2 opacity-30">
                  <Scale className="h-3 w-3" />
                  <span className="text-[9px] font-semibold uppercase tracking-widest">Exigences Financières</span>
               </div>
               <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                     <span className="text-[9px] text-foreground/40 font-semibold uppercase tracking-widest">Caution</span>
                     <span className="text-[11px] font-semibold text-foreground/80">{item.cautionSoumission || "N/A"}</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] text-foreground/40 font-semibold uppercase tracking-widest">Achat DAO</span>
                     <span className="text-[11px] font-semibold text-foreground/80">{item.fraisDossier || "N/A"}</span>
                  </div>
               </div>
            </div>

            {/* Sec. 2 : Logistique */}
            <div className="space-y-2 pt-2 border-t border-border/5">
               <div className="flex items-center gap-2 opacity-30">
                  <MapPin className="h-3 w-3" />
                  <span className="text-[9px] font-semibold uppercase tracking-widest">Logistique & Dépôt</span>
               </div>
               <div className="flex items-center gap-3">
                  <Badge className={cn(
                    "h-4 rounded-[2px] border-none px-1.5 text-[8px] font-semibold uppercase tracking-wider",
                    item.modeSoumission === "COLEPS" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/50"
                  )}>
                    {item.modeSoumission || "Physique"}
                 </Badge>
                 <div className="flex items-center gap-2 opacity-60">
                    <Clock className="h-3 w-3 text-primary/60" />
                    <span className="text-[10px] font-semibold text-foreground/80 tracking-tight">
                       Visite : {item.dateVisiteSite || "Non requise"}
                    </span>
                 </div>
               </div>
            </div>
         </div>
      </div>

      {/* 🟠 COLONNE 2 : ANALYSE IA (Match Score & Risques) */}
      <div className="flex flex-col gap-3 p-4 rounded-[4px] border border-border/10 bg-card/50 relative overflow-hidden group">
         <div className="space-y-4">
            {/* Sec. 1 : Match IA */}
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 opacity-30">
                  <Compass className="h-3 w-3" />
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-primary">Matching IA</span>
               </div>
               <span className="text-lg font-semibold text-primary leading-none tracking-tighter">{item.matchScore}%</span>
            </div>

            {/* Sec. 2 : Signal de Risque */}
            <div className="bg-red-500/5 border border-red-500/10 p-3 rounded-[2px] relative overflow-hidden">
               <div className="flex items-center gap-2 text-red-600/60 mb-1">
                  <AlertOctagon className="h-3 w-3" />
                  <span className="text-[9px] font-semibold uppercase tracking-widest">Point de Vigilance</span>
               </div>
               <p className="text-[10px] font-semibold text-red-600/80 leading-tight tracking-tight relative z-10">
                  {item.signal || "Vérifiez votre certificat de non-exclusion (ARMP) pour ce lot."}
               </p>
               <Zap className="absolute -right-2 -bottom-2 h-10 w-10 text-red-500/5 rotate-12" />
            </div>
         </div>
      </div>

      {/* 🔴 COLONNE 3 : ACTIONS (Les deux boutons) */}
      <div className="flex flex-col justify-center gap-2 p-4 rounded-[4px] border border-border/10 bg-card/50">
         <div className="flex flex-col gap-2 w-full">
            {/* 1. DÉCODEUR RPAO (IA) */}
            <Button 
               onClick={(e) => {
                  e.stopPropagation();
                  onOpenDecoder?.();
               }}
               className="w-full h-10 rounded-[4px] text-[10px] font-semibold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-between group shadow-none"
            >
               <div className="flex items-center gap-2">
                  <Flame className="h-3.5 w-3.5 fill-current animate-pulse" />
                  DÉCODER LE RPAO
               </div>
               <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>

            {/* 2. CONSULTER LE DAO */}
            <Button 
               onClick={(e) => {
                  e.stopPropagation();
                  onOpenInspector?.();
               }}
               variant="outline" 
               className="w-full h-10 rounded-[4px] text-[10px] font-semibold uppercase tracking-widest text-muted-foreground border-border/20 hover:bg-muted/30 hover:text-primary transition-all flex items-center justify-between group"
            >
               <span className="flex items-center gap-2 uppercase">CONSULTER LE DAO</span>
               <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
         </div>
      </div>

    </div>
  )
}
