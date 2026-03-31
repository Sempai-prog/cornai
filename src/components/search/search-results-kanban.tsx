"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchResult } from "./search-types"
import { cn } from "@/lib/utils"
import { Lock, Building2, Calendar, Target, AlertTriangle, FileSearch, Calculator, ChevronRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateWhatsAppLink } from "./search-utils"

interface SearchResultsKanbanProps {
  results: SearchResult[]
  isFakeBlocked?: boolean
}

export function SearchResultsKanban({ results, isFakeBlocked }: SearchResultsKanbanProps) {
  // 4X4 perfectly responsive grid for desktop, adapting to 2 columns on mobile
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-4">
      {results.map((item) => (
        <KanbanCard 
           key={item.id} 
           item={item} 
           isBlocked={item.isBlocked || isFakeBlocked} 
        />
      ))}
      {results.length === 0 && (
         <div className="col-span-full flex h-32 flex-col items-center justify-center rounded border border-dashed border-border/50 text-xs font-bold text-foreground/20">
            Aucun marché pour ces filtres
         </div>
      )}
    </div>
  )
}

function KanbanCard({ item, isBlocked }: { item: SearchResult, isBlocked?: boolean }) {
  const isExcellent = item.matchLevel === "excellent"
  const isRecommended = item.matchLevel === "recommended"
  const isRisky = item.matchLevel === "risky"
  const isIncomplete = item.matchLevel === "incomplete"

  const getMatchConfig = () => {
    if (isExcellent) return { color: "text-emerald-500", text: "Excellent Match", bg: "bg-emerald-500/10", border: "border-emerald-500/30" }
    if (isRecommended) return { color: "text-cornai", text: "Recommandé", bg: "bg-cornai/10", border: "border-cornai/20" }
    if (isRisky) return { color: "text-orange-500", text: "Risqué", bg: "bg-orange-500/10", border: "border-orange-500/30" }
    if (isIncomplete) return { color: "text-muted-foreground", text: "Incomplet", bg: "bg-muted/30", border: "border-border" }
    return { color: "text-foreground/40", text: "", bg: "bg-secondary", border: "border-border" }
  }

  const config = getMatchConfig()

  return (
    <div className={cn(
      "group relative flex flex-col gap-3 rounded-[4px] border bg-card p-3 transition-all hover:shadow-lg",
      config.border,
      isBlocked && "overflow-hidden"
    )}>
      {/* Block/Paywall Overlay */}
      {isBlocked && (
         <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card/60 backdrop-blur-[3px] p-4 text-center">
            <Lock className="h-5 w-5 text-primary mb-2" />
            <p className="text-[10px] font-black leading-tight text-foreground/60 mb-2">
               ANALYSE IA BLOQUÉE
            </p>
            <Button 
               asChild
               className="h-7 w-auto rounded-[4px] bg-primary px-3 text-[10px] font-black text-white"
            >
               <a href={generateWhatsAppLink(item, "analyze")} target="_blank" rel="noopener noreferrer">
                  DÉBLOQUER
               </a>
            </Button>
         </div>
      )}

      {/* Header Badge Row */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className={cn("h-5 rounded-[2px] border-none px-1.5 text-[9px] font-black uppercase tracking-tight", config.bg, config.color)}>
           {config.text} {item.matchScore}%
        </Badge>
        <span className="text-[9px] font-black text-foreground/30 uppercase tracking-widest">{item.type}</span>
      </div>

      {/* Title */}
      <h4 className="line-clamp-3 min-h-[42px] text-[12px] font-black leading-tight text-foreground group-hover:text-primary transition-colors">
        {item.title}
      </h4>

      {/* Logic Signal */}
      <div className="flex items-center gap-1.5 opacity-80">
         <Zap className={cn("h-3 w-3", config.color)} />
         <span className={cn("text-[9px] font-bold italic", config.color)}>
            {item.signal}
         </span>
      </div>

      {/* Content Space */}
      <div className="space-y-2 pt-2 border-t border-border/50">
        <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 uppercase tracking-tight">
          <Building2 className="h-3 w-3 text-foreground/20" />
          <span className="truncate">{item.authority}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/40">
          <Calendar className="h-3 w-3 text-foreground/20" />
          <span>Expire le {item.deadline.split(' ')[0]} {item.deadline.split(' ')[1]}</span>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="mt-auto pt-3 flex items-center justify-between gap-2 overflow-hidden">
        <div className="flex flex-col min-w-0">
           <span className="text-[8px] font-bold text-foreground/20 uppercase tracking-widest leading-none truncate">Estimation</span>
           <span className="text-[12px] font-black text-foreground/80 truncate">{item.budget}</span>
        </div>
        <div className="flex gap-1.5 shrink-0">
           <Button asChild variant="ghost" className="h-7 w-7 p-0 hover:bg-secondary rounded-full">
              <a href={generateWhatsAppLink(item, "analyze")} target="_blank" rel="noopener noreferrer">
                 <FileSearch className="h-3.5 w-3.5 text-foreground/40" />
              </a>
           </Button>
           <Button asChild className="h-7 rounded-[4px] bg-secondary px-3 text-[10px] font-black text-foreground hover:bg-primary hover:text-white">
              <a href={generateWhatsAppLink(item, "info")} target="_blank" rel="noopener noreferrer">
                 DÉTAILS
              </a>
           </Button>
        </div>
      </div>
    </div>
  )
}
