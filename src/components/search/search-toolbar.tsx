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
}

export function SearchToolbar({
  query,
  onQueryChange,
  viewMode,
  onViewModeChange,
  isSidebarOpen,
  onToggleSidebar,
}: SearchToolbarProps) {
  const [activeSort, setActiveSort] = React.useState("Plus récent")

  return (
    <div className="shrink-0 border-b border-border bg-card px-3 pt-2 pb-3">
      {/* Summary Strip & Clean Quick Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
         <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-black tracking-[0.1em] text-foreground/30 uppercase">
           {/* Sidebar Toggle - Integrated into Summary Strip for minimal footprint */}
           <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 hover:bg-secondary rounded-[4px] -ml-1 text-primary"
              onClick={onToggleSidebar}
           >
              {isSidebarOpen ? <PanelLeftClose className="h-3 w-3" /> : <PanelLeftOpen className="h-3 w-3" />}
           </Button>
           <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-border" />
           
           <span className="text-foreground/50">24 Marchés trouvés</span>
           <span className="h-1 w-1 rounded-full bg-border" />
           <span className="text-primary/70 flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" /> 1 Match IA</span>
           <span className="h-1 w-1 rounded-full bg-border" />
           <span className="text-orange-500/70 flex items-center gap-1"><AlertTriangle className="h-2.5 w-2.5" /> 2 Risques</span>
           <span className="h-1 w-1 rounded-full bg-border" />
           <span className="text-green-600/70 flex items-center gap-1"><ShieldCheck className="h-2.5 w-2.5" /> 3 Conformes</span>
         </div>

         {/* Pure State Filter Buttons */}
         <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 font-black">
            <button className="h-6 whitespace-nowrap rounded-[4px] border border-primary/20 bg-primary/5 px-2 text-[9px] text-primary hover:bg-primary/10">
               ✨ RECOMMANDÉS
            </button>
            <button className="h-6 whitespace-nowrap rounded-[4px] border border-orange-500/20 bg-orange-500/5 px-2 text-[9px] text-orange-600 hover:bg-orange-500/10">
               ⚠️ RISQUÉS
            </button>
            <button className="h-6 whitespace-nowrap rounded-[4px] border border-border bg-background px-2 text-[9px] text-foreground/40 hover:bg-secondary">
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
               className="h-8 rounded-[4px] border-border bg-background/50 pl-9 text-[12px] font-bold placeholder:text-foreground/20 focus-visible:ring-primary/20 transition-all"
             />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                 variant="outline" 
                 className="h-8 rounded-[4px] border-border bg-background px-3 text-[10px] font-black text-foreground/60 hover:bg-secondary shadow-none transition-all"
              >
                <ArrowDownWideNarrow className="mr-2 h-3.5 w-3.5 opacity-40 text-primary" />
                TRIER : {activeSort.toUpperCase()}
                <ChevronDown className="ml-2 h-3.5 w-3.5 opacity-20" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px] bg-card border-border shadow-none">
               <DropdownMenuLabel className="text-[10px] font-black text-foreground/40 uppercase tracking-widest px-3 py-2">Critères de tri</DropdownMenuLabel>
               <DropdownMenuSeparator className="bg-border/60" />
               <DropdownMenuItem onClick={() => setActiveSort("Plus récent")} className="text-[11px] font-bold py-2 px-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                  <History className="mr-2 h-3.5 w-3.5 opacity-40" />
                  Plus récent
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => setActiveSort("Plus urgent")} className="text-[11px] font-bold py-2 px-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                  <CalendarDays className="mr-2 h-3.5 w-3.5 opacity-40" />
                  Plus urgent (échéance)
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => setActiveSort("Budget décroissant")} className="text-[11px] font-bold py-2 px-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                  <ArrowUpDown className="mr-2 h-3.5 w-3.5 opacity-40" />
                  Budget décroissant
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => setActiveSort("Match Score")} className="text-[11px] font-bold py-2 px-3 focus:bg-primary/5 focus:text-primary cursor-pointer">
                  <Target className="mr-2 h-3.5 w-3.5 opacity-40" />
                  Meilleur Match IA
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
                "flex h-6 items-center gap-1.5 rounded-[3px] px-2 text-[10px] font-black transition-all",
                viewMode === "list" 
                  ? "bg-secondary text-foreground shadow-none" 
                  : "text-foreground/30 hover:text-foreground/60"
              )}
            >
              <List className="h-3 w-3" />
              Liste
            </button>
            <button
              onClick={() => onViewModeChange("kanban")}
              className={cn(
                "flex h-6 items-center gap-1.5 rounded-[3px] px-2 text-[10px] font-black transition-all",
                viewMode === "kanban" 
                  ? "bg-secondary text-foreground shadow-none" 
                  : "text-foreground/30 hover:text-foreground/60"
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
