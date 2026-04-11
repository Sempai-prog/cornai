// src/components/blindage/blindage-header.tsx

import React from "react";
import { ShieldCheck, AlertTriangle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface BlindageHeaderProps {
  avancement: number;
  dateDepot: Date | null;
  referenceAO: string;
  nbBloquants: number;
}

export function BlindageHeader({ avancement, dateDepot, referenceAO, nbBloquants }: BlindageHeaderProps) {
  return (
    <div className="bg-card border-b border-border/10 p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-[0.2em]">Volume A — Conformité Administrative</span>
            {nbBloquants > 0 && (
              <span className="bg-red-500/10 text-red-500 text-[9px] font-semibold px-2 py-0.5 rounded-[2px] border border-red-500/20 uppercase tracking-widest animate-pulse">
                {nbBloquants} Bloquant{nbBloquants > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-semibold tracking-tighter text-foreground mb-2">
            Le Blindage Administratif
          </h1>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              AO: <span className="text-foreground">{referenceAO}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border/40" />
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Dépôt: <span className="text-foreground">
                {dateDepot ? format(dateDepot, "dd MMMM yyyy", { locale: fr }) : "Non définie"}
              </span>
            </div>
          </div>
        </div>

        {/* JAUGE DE CONFORMITÉ */}
        <div className="flex items-center gap-6 bg-muted/5 p-4 rounded-[4px] border border-border/5 min-w-[320px]">
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-semibold text-foreground/40 uppercase tracking-widest">Score de Blindage</span>
              <span className="text-2xl font-semibold text-foreground tabular-nums">{avancement}%</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-1000 ease-out",
                  avancement >= 100 ? "bg-emerald-500" : avancement > 50 ? "bg-primary" : "bg-amber-500"
                )}
                style={{ width: `${avancement}%` }}
              />
            </div>
          </div>
          <div className={cn(
            "size-12 rounded-[4px] flex items-center justify-center border transition-all",
            avancement >= 100 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-primary/5 border-primary/10 text-primary"
          )}>
            {avancement >= 100 ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
          </div>
        </div>
      </div>
    </div>
  );
}
