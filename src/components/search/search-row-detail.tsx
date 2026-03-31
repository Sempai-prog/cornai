"use client"

import { AlertTriangle, Calculator, ClipboardList, FileSearch, MessageCircle, Target, Zap } from "lucide-react"
import { SearchResult } from "./search-types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function DetailMiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[4px] border border-border bg-background p-2.5">
      <div className="text-[9px] font-black uppercase tracking-wider text-foreground/40">
        {label}
      </div>
      <div className="mt-0.5 text-[11px] font-bold text-foreground leading-tight">{value}</div>
    </div>
  )
}

export function SearchRowDetail({ item }: { item: SearchResult }) {
  const isExcellent = item.matchLevel === "excellent"
  const isRecommended = item.matchLevel === "recommended"
  const isRisky = item.matchLevel === "risky"
  const isIncomplete = item.matchLevel === "incomplete"

  const scoreColor = isExcellent ? "text-emerald-500" : isRecommended ? "text-cornai" : isRisky ? "text-orange-500" : "text-muted-foreground"

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-4">
           <h4 className="text-sm font-black flex-1">{item.title}</h4>
           <div className="flex flex-col items-end shrink-0">
              <div className={cn("text-2xl font-black leading-none", scoreColor)}>
                 {item.matchScore}%
              </div>
              <div className="text-[8px] font-black uppercase tracking-tighter text-foreground/30 mt-1 flex items-center gap-1">
                 <Zap className="h-2 w-2" />
                 Score CornAI
              </div>
           </div>
        </div>

        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <DetailMiniCard label="Maître d’ouvrage" value={item.authority} />
          <DetailMiniCard label="Source" value={item.source ?? "N/D"} />
          <DetailMiniCard label="Caution" value={item.cautionAmount ?? "N/D"} />
          <DetailMiniCard label="Évaluation" value={item.evaluationMode ?? "N/D"} />
        </div>

        <div className="mt-6 flex items-center gap-2 p-3 rounded-[4px] bg-secondary/30 border border-border/50 animate-in fade-in slide-in-from-top-2">
           <Target className={cn("h-4 w-4", scoreColor)} />
           <p className={cn("text-[11px] font-bold", scoreColor)}>
              <span className="opacity-60">ANALYSE :</span> {item.signal}
           </p>
        </div>

        <div className="mt-4">
          <div className="mb-2 text-[10px] font-black tracking-widest text-foreground/40 uppercase">
            Alertes IA & Risques
          </div>
          <div className="space-y-1.5">
            {item.risks && item.risks.length > 0 ? (
               item.risks.map((risk) => (
                <div
                  key={risk}
                  className="flex items-start gap-2 rounded-[4px] border border-orange-500/20 bg-orange-500/5 px-3 py-2 text-[11px] font-bold text-orange-600 dark:text-orange-400"
                >
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{risk}</span>
                </div>
              ))
            ) : (
               <p className="text-[10px] italic text-muted-foreground ml-1">Aucun risque critique détecté par l'IA à ce stade.</p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-[4px] border border-border bg-background p-3 flex flex-col justify-center">
        <div className="mb-3 text-[10px] font-black tracking-widest text-foreground/40 uppercase">
          Actions de soumission
        </div>
        <div className="flex flex-col gap-2">
          <Button className="h-9 rounded-[4px] bg-primary text-[11px] font-black text-white hover:bg-primary/90">
            <FileSearch className="mr-2 h-4 w-4" />
            ANALYSER LE RPAO
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="h-9 rounded-[4px] border-border text-[10px] font-black hover:bg-secondary">
               <ClipboardList className="mr-1.5 h-3.5 w-3.5 opacity-40 text-primary" />
               CHECKLIST
            </Button>
            <Button variant="outline" className="h-9 rounded-[4px] border-border text-[10px] font-black hover:bg-secondary">
               <Calculator className="mr-1.5 h-3.5 w-3.5 opacity-40 text-primary" />
               BPU / DQE
            </Button>
          </div>

          <Button variant="outline" className="h-9 rounded-[4px] border-primary/20 text-[11px] font-black text-primary hover:bg-primary/5">
            <MessageCircle className="mr-2 h-4 w-4" />
            VÉRIFIER SUR WHATSAPP
          </Button>
        </div>
      </div>
    </div>
  )
}
