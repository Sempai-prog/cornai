// ══════════════════════════════════════════
// SABI — Mini-Bento Expansion (Phase 2 — Go/No-Go Triage)
// ══════════════════════════════════════════

"use client"

import * as React from "react"
import { 
  Zap, 
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
  onOpenInspector: () => void
}

export function SearchRowDetail({ 
  item, 
  onOpenInspector
}: SearchRowDetailProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/10 border-y border-border/10 animate-in fade-in slide-in-from-top-2 duration-300">
      
      {/* BLOC 1 : FINANCIER (Caution & Frais) */}
      <div className="flex flex-col gap-3 p-3.5 rounded-[4px] border border-border/10 bg-card h-full">
         <div className="flex items-center gap-2 opacity-30">
            <Scale className="h-3 w-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Exigences Financières</span>
         </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
               <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">Caution</span>
               <span className="text-[11px] font-bold text-foreground/80">{item.cautionSoumission || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">Achat DAO</span>
               <span className="text-[11px] font-bold text-foreground/80">{item.fraisDossier || "N/A"}</span>
            </div>
          </div>
      </div>

      {/* BLOC 2 : FILTRE IA (Alerte Risque) */}
      <div className="flex flex-col gap-3 p-3.5 rounded-[4px] border border-red-500/10 bg-red-500/5 relative overflow-hidden group h-full">
          <div className="flex items-center gap-2 text-red-600/40">
             <AlertOctagon className="h-3 w-3" />
             <span className="text-[9px] font-bold uppercase tracking-widest">Sécabilité / Risque IA</span>
          </div>
          <p className="text-[11px] font-semibold text-red-600/80 leading-tight tracking-tight">
             {item.signal || "Vérifiez votre certificat de non-exclusion (ARMP) pour ce lot."}
          </p>
         <div className="absolute -right-2 -bottom-2 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform">
            <Zap className="h-12 w-12 text-red-500" />
         </div>
      </div>

      {/* BLOC 3 : LOGISTIQUE (Dépôt & Visite) */}
      <div className="flex flex-col gap-3 p-3.5 rounded-[4px] border border-border/10 bg-card h-full">
         <div className="flex items-center gap-2 opacity-30">
            <MapPin className="h-3 w-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Logistique & Dépôt</span>
         </div>
         <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Badge className={cn(
                  "h-4 rounded-[2px] border-none px-1.5 text-[8px] font-black uppercase tracking-wider",
                  item.modeSoumission === "COLEPS" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/50"
                )}>
                  {item.modeSoumission || "Physique"}
               </Badge>
               <span className="text-[10px] font-medium text-foreground/40 uppercase">Mode de soumission</span>
            </div>
            <div className="flex items-center gap-2 opacity-60">
               <Clock className="h-3 w-3 text-primary/60" />
               <span className="text-[10px] font-bold text-foreground/80 tracking-tight">
                  Visite Site : {item.dateVisiteSite || "Non requise"}
               </span>
            </div>
         </div>
      </div>

      {/* BLOC 4 : ACTION FINALE (SCORE & BTN) — Harmonisé */}
      <div className="flex flex-col gap-3 p-3.5 rounded-[4px] border border-border/10 bg-card group/action h-full">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 opacity-30">
               <Compass className="h-3 w-3" />
               <span className="text-[9px] font-bold uppercase tracking-widest">Score Matching</span>
            </div>
            <span className="text-[14px] font-black text-primary leading-none uppercase">{item.matchScore}%</span>
         </div>
         
          <div className="mt-auto pt-4">
             {/* BOUTON UNIQUE — DAO COMPLET (neutre, outline, informatif) */}
             <Button 
                onClick={(e) => {
                   e.stopPropagation();
                   onOpenInspector();
                }}
                variant="outline" 
                className="w-full h-10 rounded-[4px] text-[10px] font-black uppercase tracking-wider text-primary border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all px-4 flex items-center justify-between group shadow-sm shadow-primary/5"
             >
                CONSULTER LE DAO
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
             </Button>
          </div>
      </div>

    </div>
  )
}
