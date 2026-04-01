"use client"

import * as React from "react"
import { 
  ChevronDown, 
  LayoutGrid, 
  List, 
  Search, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck,
  ArrowUpDown,
  History,
  CalendarDays,
  Target,
  ArrowDownWideNarrow,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export type ViewMode = "list" | "kanban"

interface SearchToolbarProps {
  query: string
  onQueryChange: (value: string) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  isSidebarOpen?: boolean
  onToggleSidebar?: () => void
  sort: string
  onSortChange: (sort: string) => void
  activeQuickFilter: string | null
  onQuickFilterChange: (filter: string | null) => void
  resultsCount: number
}

const SORT_LABELS: Record<string, string> = {
  recent: "Plus récent",
  urgent: "Plus urgent",
  budget_desc: "Budget décroissant",
  score: "Match Score IA"
}

export function SearchToolbar({
  query,
  onQueryChange,
  viewMode,
  onViewModeChange,
  isSidebarOpen,
  onToggleSidebar,
  sort,
  onSortChange,
  activeQuickFilter,
  onQuickFilterChange,
  resultsCount
}: SearchToolbarProps) {

  return (
    <div className="shrink-0 border-b border-border bg-card px-3 pt-2 pb-3">
      {/* Summary Strip & Clean Quick Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
         <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-medium tracking-[0.1em] text-foreground/30">
           <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 hover:bg-secondary rounded-[4px] -ml-1 text-primary"
              onClick={onToggleSidebar}
           >
              {isSidebarOpen ? <PanelLeftClose className="h-3 w-3" /> : <PanelLeftOpen className="h-3 w-3" />}
           </Button>
           <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-border" />
           
           <span className="text-foreground/50">{resultsCount} Marchés trouvés</span>
           <span className="h-1 w-1 rounded-full bg-border" />
           <span className="text-primary/70 flex items-center gap-1 font-medium"><Sparkles className="h-2.5 w-2.5" /> IA Active</span>
           <span className="h-1 w-1 rounded-full bg-border" />
           <span className="text-orange-500/70 flex items-center gap-1 font-medium"><AlertTriangle className="h-2.5 w-2.5" /> Diagnostic V1</span>
         </div>

         {/* Pure State Filter Buttons */}
         <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 font-medium">
            <button 
               onClick={() => onQuickFilterChange(activeQuickFilter === 'RECOMMANDÉS' ? null : 'RECOMMANDÉS')}
               className={cn(
                 "h-6 whitespace-nowrap rounded-[4px] border px-3 text-[9px] transition-all",
                 activeQuickFilter === 'RECOMMANDÉS' 
                  ? "border-primary bg-primary text-white shadow-sm font-medium" 
                  : "border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 font-normal"
               )}
            >
               ✨ Recommandés
            </button>
            <button 
               onClick={() => onQuickFilterChange(activeQuickFilter === 'RISQUÉS' ? null : 'RISQUÉS')}
               className={cn(
                  "h-6 whitespace-nowrap rounded-[4px] border px-3 text-[9px] transition-all",
                  activeQuickFilter === 'RISQUÉS' 
                   ? "border-red-500 bg-red-500 text-white shadow-sm font-medium" 
                   : "border-red-500/20 bg-red-500/5 text-red-600 hover:bg-red-500/10 font-normal"
               )}
            >
               ⚠️ Risqués
            </button>
            <button 
               onClick={() => onQuickFilterChange(activeQuickFilter === 'URGENTS' ? null : 'URGENTS')}
               className={cn(
                  "h-6 whitespace-nowrap rounded-[4px] border px-3 text-[9px] transition-all",
                  activeQuickFilter === 'URGENTS' 
                   ? "border-foreground bg-foreground text-background shadow-sm font-medium" 
                   : "border-border bg-background text-foreground/40 hover:bg-secondary font-normal"
               )}
            >
               Urgents
            </button>
         </div>
      </div>

      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        {/* Search Bar with integrated sorting */}
        <div className="relative min-w-0 flex-1 flex gap-2">
          <div className="relative flex-1">
             <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/30" />
             <Input
               value={query}
               onChange={(e) => onQueryChange(e.target.value)}
               placeholder="Rechercher par mot-clé, région ou acheteur..."
               className="h-8 rounded-[4px] border-border bg-background/50 pl-9 text-[12px] font-normal placeholder:text-foreground/20 focus-visible:ring-primary/20 transition-all shadow-none"
             />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                 variant="outline" 
                 className="h-8 rounded-[4px] border-border bg-background px-3 text-[10px] text-foreground/60 hover:bg-secondary shadow-none transition-all font-medium"
              >
                <ArrowDownWideNarrow className="mr-2 h-3.5 w-3.5 opacity-40 text-primary" />
                Trier : {SORT_LABELS[sort]}
                <ChevronDown className="ml-2 h-3.5 w-3.5 opacity-20" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px] bg-card border-border shadow-none">
               <DropdownMenuLabel className="text-[10px] font-medium text-foreground/40 tracking-widest px-3 py-2">Critères de tri</DropdownMenuLabel>
               <DropdownMenuSeparator className="bg-border/60" />
               <DropdownMenuItem onClick={() => onSortChange("recent")} className="text-[11px] font-normal py-2 px-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                  <History className="mr-2 h-3.5 w-3.5 opacity-40" />
                  Plus récent
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => onSortChange("urgent")} className="text-[11px] font-normal py-2 px-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                  <CalendarDays className="mr-2 h-3.5 w-3.5 opacity-40" />
                  Plus urgent
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => onSortChange("budget_desc")} className="text-[11px] font-normal py-2 px-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                  <ArrowUpDown className="mr-2 h-3.5 w-3.5 opacity-40" />
                  Budget décroissant
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => onSortChange("score")} className="text-[11px] font-medium py-2 px-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                  <Target className="mr-2 h-3.5 w-3.5 opacity-40" />
                  Match Score IA
               </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          {/* Segmented Control for View Toggle */}
          <div className="flex items-center rounded-[4px] border border-border bg-background p-0.5 shadow-none">
            <button
              onClick={() => onViewModeChange("list")}
              className={cn(
                "flex h-6 items-center gap-1.5 rounded-[3px] px-2 text-[10px] font-medium transition-all",
                viewMode === "list" 
                   ? "bg-secondary text-foreground shadow-none font-medium" 
                   : "text-foreground/30 hover:text-foreground/60 font-normal"
              )}
            >
              <List className="h-3 w-3" />
              Liste
            </button>
            <button
              onClick={() => onViewModeChange("kanban")}
              className={cn(
                "flex h-6 items-center gap-1.5 rounded-[3px] px-2 text-[10px] transition-all",
                viewMode === "kanban" 
                   ? "bg-secondary text-foreground shadow-none font-medium" 
                   : "text-foreground/30 hover:text-foreground/60 font-normal"
              )}
            >
              <LayoutGrid className="h-3 w-3" />
              Mosaïque
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
