"use client"

import * as React from "react"
import { 
  Building2, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Lock,
  FileSearch,
  Calculator,
  MessageCircle,
  Coins,
  Clock,
  ChevronDown,
  Mail,
  MessageSquare,
  Phone,
  ScanSearch,
  ExternalLink,
  Target,
  AlertTriangle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { SearchRowDetail } from "./search-row-detail"
import { cn } from "@/lib/utils"
import { SearchResult } from "./search-types"
import { generateWhatsAppLink } from "./search-utils"
import { AnimatePresence, motion } from "framer-motion"

interface SearchResultRowProps {
  item: SearchResult
  isFakeBlocked?: boolean
}

export function SearchResultRow({ item, isFakeBlocked }: SearchResultRowProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [isMobileDetailOpen, setIsMobileDetailOpen] = React.useState(false)
  
  const isBlocked = item.isBlocked || isFakeBlocked
  
  // Nouveaux niveaux de matching V1
  const isExcellent = item.matchLevel === "excellent"
  const isRecommended = item.matchLevel === "recommended"
  const isRisky = item.matchLevel === "risky"
  const isIncomplete = item.matchLevel === "incomplete"

  const handleOpenDetail = () => {
    if (isBlocked) return
    if (window.innerWidth < 768) {
      setIsMobileDetailOpen(true)
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  // Couleurs et labels par niveau
  const getMatchConfig = () => {
    if (isExcellent) return { color: "bg-emerald-500", text: "Excellent Match", icon: Target, border: "border-emerald-500/30", bg: "bg-emerald-500/5" }
    if (isRecommended) return { color: "bg-cornai", text: "Recommandé", icon: Target, border: "border-cornai/20", bg: "bg-cornai/5" }
    if (isRisky) return { color: "bg-orange-500", text: "Risqué", icon: AlertTriangle, border: "border-orange-500/30", bg: "bg-orange-500/5" }
    if (isIncomplete) return { color: "bg-muted-foreground", text: "Incomplet", icon: AlertTriangle, border: "border-border", bg: "bg-muted/30" }
    return { color: "bg-transparent", text: "", icon: Target, border: "border-border", bg: "bg-card" }
  }

  const config = getMatchConfig()

  return (
    <div 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded border transition-all",
        config.border,
        config.bg,
        isExpanded && "mb-4 ring-1 ring-primary/40 shadow-xl"
      )}
    >
      {/* 50px Compact Row */}
      <div 
        className="flex h-[54px] items-center gap-3 px-3 relative cursor-pointer hover:bg-secondary/40 select-none"
        onClick={handleOpenDetail}
      >
        {/* Status indicator line */}
        <div className={cn("absolute left-0 top-0 bottom-0 w-1", config.color)} />

        {/* Match Info (Score & Status) */}
        <div className="hidden sm:flex flex-col items-center justify-center min-w-[70px] border-r border-border/50 pr-3">
           <span className={cn("text-[14px] font-black leading-none", config.color.replace('bg-', 'text-'))}>
              {item.matchScore}%
           </span>
           <span className="text-[7px] font-black uppercase tracking-tighter text-foreground/40 mt-1">Matching IA</span>
        </div>

        {/* Type Badge */}
        <div className="flex shrink-0 items-center justify-center">
          <Badge variant="outline" className="h-5 rounded-[2px] border-none bg-secondary px-1 text-[9px] font-black uppercase tracking-tight text-foreground/50">
            {item.type}
          </Badge>
        </div>

        {/* Title & Info Stack */}
        <div className="flex flex-1 flex-col justify-center min-w-0 pr-4">
          <h3 className="truncate text-[12px] font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
            {item.title}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-[9px] font-black uppercase tracking-widest text-foreground/40">
             <div className="flex items-center gap-1 min-w-0">
                <Building2 className="h-2.5 w-2.5 text-foreground/20 shrink-0" />
                <span className="truncate max-w-[280px] lg:max-w-none">{item.authority}</span>
             </div>
             <div className="flex shrink-0 items-center gap-1 text-primary">
                <Coins className="h-2.5 w-2.5" />
                {item.budget}
             </div>
             <div className="hidden md:flex shrink-0 items-center gap-1">
                <Calendar className="h-2.5 w-2.5 text-foreground/20" />
                {item.deadline}
             </div>
          </div>
        </div>

        {/* Signal (New V1) */}
        <div className="hidden lg:flex items-center gap-2 px-3 animate-in fade-in slide-in-from-right-4">
           <config.icon className={cn("h-3 w-3", config.color.replace('bg-', 'text-'))} />
           <span className={cn("text-[10px] font-bold italic", config.color.replace('bg-', 'text-'))}>
              {item.signal}
           </span>
        </div>

        {/* Actions Layer */}
        <div className="flex shrink-0 items-center gap-1.5 h-full pl-2" onClick={(e) => e.stopPropagation()}>
          {isBlocked ? (
            <div className="flex items-center gap-2">
               <Lock className="h-3 w-3 text-primary" />
               <Button 
                   asChild
                   className="h-8 rounded-[4px] bg-primary px-3 text-[10px] font-black text-white"
                >
                  <a href={generateWhatsAppLink(item, "analyze")} target="_blank" rel="noopener noreferrer">
                     DÉBLOQUER
                  </a>
                </Button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
               <div className="hidden xs:flex h-6 w-[1px] bg-border mx-1" />
               <Button 
                  onClick={handleOpenDetail}
                  className={cn(
                    "h-8 rounded-[4px] px-3 text-[10px] font-black transition-all",
                    isExpanded ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-primary hover:text-white"
                  )}
               >
                  {isExpanded ? "FERMER" : "DÉTAILS"}
               </Button>
            </div>
          )}
          <ChevronDown className={cn("h-4 w-4 text-foreground/20 transition-transform duration-300 hidden sm:block", isExpanded && "rotate-180 text-primary")} />
        </div>
      </div>

      {/* Accordion Expansion Area (Desktop) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "circOut" }}
            className="hidden md:block border-t border-border bg-secondary/5"
          >
            <div className="p-4 overflow-hidden">
               <SearchRowDetail item={item} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer (Bottom Sheet) */}
      <Sheet open={isMobileDetailOpen} onOpenChange={setIsMobileDetailOpen}>
        <SheetContent side="bottom" className="px-4 pb-12 pt-10 rounded-t-[20px] max-h-[85vh] overflow-y-auto border-t-4" style={{ borderColor: isExcellent ? '#10b981' : isRecommended ? '#EF8721' : isRisky ? '#f97316' : '#94a3b8' }}>
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6">
                <Badge variant="outline" className={cn("h-6 font-black uppercase text-[10px]", config.color.replace('bg-', 'text-'), config.border)}>
                   {config.text} ({item.matchScore}%)
                </Badge>
                <span className="text-[10px] font-bold text-muted-foreground">{item.type}</span>
            </div>
            <SearchRowDetail item={item} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
