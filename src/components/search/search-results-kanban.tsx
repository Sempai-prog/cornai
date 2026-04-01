"use client"

import * as React from "react"
import { 
  Building2, 
  Calendar, 
  MapPin, 
  Target, 
  Zap, 
  Plus, 
  MessageCircle, 
  ChevronRight,
  ShieldAlert,
  Lock,
  Sparkles
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SearchResult } from "./search-types"
import { generateWhatsAppLink, formatMarketType } from "./search-utils"

interface SearchResultsKanbanProps {
  results: SearchResult[]
}

export function SearchResultsKanban({ results }: SearchResultsKanbanProps) {
  // Simple grouping by score levels for board-like feel
  const highMatch = results.filter(r => (r.matchScore || 0) >= 80)
  const otherMatch = results.filter(r => (r.matchScore || 0) < 80)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((item) => (
        <SearchResultCard key={item.id} item={item} />
      ))}
    </div>
  )
}

function SearchResultCard({ item }: { item: SearchResult }) {
  const isExcellent = item.matchLevel === "excellent"
  const isRecommended = item.matchLevel === "recommended"
  const isRisky = item.matchLevel === "risky"
  const isIncomplete = item.matchLevel === "incomplete"
  const isBlocked = item.isBlocked

  const scoreColor = isExcellent ? "text-emerald-500" : isRecommended ? "text-cornai" : isRisky ? "text-red-500" : "text-muted-foreground"
  const scoreBg = isExcellent ? "bg-emerald-500/5" : isRecommended ? "bg-cornai/5" : isRisky ? "bg-red-500/5" : "bg-muted-foreground/5"
  const scoreOuterBg = isExcellent ? "bg-emerald-500/5" : isRecommended ? "bg-cornai/5" : isRisky ? "bg-red-500/5" : "bg-secondary/10"

  return (
    <div className={cn(
      "group relative flex flex-col rounded-[4px] border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md",
      isExcellent && "border-emerald-500/20 shadow-emerald-500/5",
      isBlocked && "opacity-80 grayscale-[0.5]"
    )}>
      {/* Card Header: Score & Badge */}
      <div className="flex items-start justify-between p-4 pb-2">
         <Badge variant="outline" className={cn(
           "h-5 rounded-[2px] border-none px-1.5 text-[8.5px] font-medium tracking-tight uppercase",
           isExcellent ? "bg-emerald-500/10 text-emerald-600" : "bg-secondary text-foreground/40"
         )}>
           {formatMarketType(item.type)}
         </Badge>
         
         <div className="flex flex-col items-end">
            <div className={cn("text-xs font-medium", scoreColor)}>
               {item.matchScore}%
            </div>
            <div className="text-[7.5px] font-medium text-foreground/20 uppercase tracking-tighter">Score IA</div>
         </div>
      </div>

      {/* Card Body: Info */}
      <div className="flex flex-1 flex-col p-4 pt-1">
        <div className="mb-3">
          <h3 className={cn(
            "line-clamp-2 text-[11px] font-medium leading-relaxed transition-colors group-hover:text-primary",
            isBlocked ? "text-foreground/30" : "text-foreground"
          )}>
            {item.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1.5 text-[9px] font-normal text-muted-foreground/40 tracking-tight">
            <Building2 className="h-2.5 w-2.5 opacity-50" />
            <span className="truncate">{item.authority}</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
           <div className="flex items-center gap-1.5 text-[9px] font-normal text-foreground/50">
              <MapPin className="h-2.5 w-2.5 opacity-30" />
              <span>{item.region}</span>
           </div>
           <div className="flex items-center gap-1.5 text-[9px] font-normal text-foreground/50">
              <Calendar className="h-2.5 w-2.5 opacity-30" />
              <span className="uppercase">J-{item.deadline.split(' ')[0]}</span>
           </div>
        </div>

        {/* IA Signal Bento Area */}
        <div className="mt-auto pt-3 border-t border-border/10">
           {isBlocked ? (
              <div className="flex flex-col items-center justify-center py-4 bg-secondary/5 rounded-[4px] border border-dashed border-border/40">
                 <Lock className="h-4 w-4 text-primary/40 mb-1" />
                 <span className="text-[8px] font-medium uppercase tracking-widest text-foreground/20">Accès restreint</span>
              </div>
           ) : (
             <div className="space-y-2">
                <div className={cn("flex flex-col gap-1 p-2.5 rounded-[4px] border border-border/10", scoreOuterBg)}>
                  <div className="flex items-center gap-1.5 opacity-40">
                    <Zap className={cn("h-2.5 w-2.5", scoreColor)} />
                    <span className="text-[8px] font-medium uppercase tracking-widest">Diagnostic IA</span>
                  </div>
                  <p className={cn("text-[9px] font-normal line-clamp-2 leading-tight", scoreColor)}>
                    {item.signal || "Analyse multicritère complète effectuée."}
                  </p>
                </div>

                <div className="flex gap-2">
                   <Button asChild size="sm" className="h-8 flex-1 rounded-[4px] bg-primary text-[8.5px] font-medium text-white hover:bg-primary/90 border-none px-0">
                      <a href={generateWhatsAppLink(item, "analyser-rpao")} target="_blank">
                         Analyser RPAO
                      </a>
                   </Button>
                   <Button asChild variant="outline" size="sm" className="h-8 w-8 rounded-[4px] border-border/40 hover:bg-secondary p-0">
                      <a href={generateWhatsAppLink(item, "continuer-whatsapp")} target="_blank">
                        <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                      </a>
                   </Button>
                </div>
             </div>
           )}
        </div>
      </div>

    </div>
  )
}
