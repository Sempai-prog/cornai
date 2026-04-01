// ══════════════════════════════════════════
// CORNAi — Station de Travail 2.8 (Moteur de Recherche — Tableau de Fréquences)
// ══════════════════════════════════════════

"use client"

import * as React from "react"
import { 
  Search, 
  ChevronDown,
  History,
  Table as TableIcon,
  FilterX,
  Target as TargetIcon,
  File as FileIcon,
  List as ListIcon,
  Clock,
  ShieldCheck,
  Zap,
  MoreHorizontal,
  ChevronRight,
  Plus
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchResultRow } from "@/components/search/search-result-row"
import { SearchResult } from "@/components/search/search-types"
import { cn } from "@/lib/utils"

// ───────────────────────────────────────────────────────────
// CONFIGURATION MÉTIEUR (ARMP / Cameroun)
// ───────────────────────────────────────────────────────────

const FILTER_CATEGORIES = [
  { id: "secteurs", title: "Secteurs d'Activité", items: ["Travaux", "Fournitures", "Services", "Intellectuelles"] },
  { id: "regions", title: "Régions Locales", items: ["Centre", "Littoral", "Ouest", "Nord", "Est", "Sud", "Nord-Ouest", "Sud-Ouest", "Adamaoua", "Extrême-Nord"] },
  { id: "procedures", title: "Modes de Passation", items: ["AONO", "AONR", "DC", "AAMI", "AOIO", "AOR"] }
]

interface SearchDashboardClientProps {
  initialResults: SearchResult[]
}

export function SearchDashboardClient({ initialResults }: SearchDashboardClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [query, setQuery] = React.useState("")
  const [viewMode, setViewMode] = React.useState<"list" | "table">("list")
  const [isLoading, setIsLoading] = React.useState(true)
  const [openAccordions, setOpenAccordions] = React.useState<Record<string, boolean>>({ secteurs: true })
  const [filters, setFilters] = React.useState({
    secteurs: [] as string[],
    regions: [] as string[],
    procedures: [] as string[],
  })

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) 
        ? prev[key].filter(v => v !== value) 
        : [...prev[key], value]
    }))
  }

  const filteredResults = React.useMemo(() => {
    let base = initialResults
    if (query) {
      const q = query.toLowerCase()
      base = base.filter(r => (r.title?.toLowerCase().includes(q)) || (r.authority?.toLowerCase().includes(q)) || (r.id?.toLowerCase().includes(q)))
    }
    if (filters.secteurs.length > 0) base = base.filter(r => filters.secteurs.includes(r.sector))
    if (filters.regions.length > 0) base = base.filter(r => filters.regions.includes(r.region))
    if (filters.procedures.length > 0) base = base.filter(r => filters.procedures.includes(r.type))
    return base
  }, [query, filters, initialResults])

  return (

  return (
    <div className="w-full flex-col lg:grid lg:grid-cols-12 gap-8 relative animate-in fade-in duration-700">
      
      {/* ───────────────────────────────────────────────────────────
          1. STATION DE TRI (FLUX PRINCIPAL - 8/12)
          ─────────────────────────────────────────────────────────── */}
      <div className={cn(
        "flex flex-col gap-6 transition-all duration-500 ease-in-out min-w-0",
        isSidebarOpen ? "lg:col-span-8" : "lg:col-span-12"
      )}>
         
         <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card/80 backdrop-blur-md border border-border/40 rounded-[4px] relative">
            <div className="flex-1 w-full max-w-2xl relative">
               <div className="relative flex items-center w-full group/input">
                  <div className="absolute left-4.5 z-10">
                     <Search className="h-4 w-4 text-foreground/30 group-focus-within/input:text-primary transition-colors" />
                  </div>
                  <Input 
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     placeholder="Rechercher par ID, Autorité contractante, Mots-clés..." 
                     className={cn(
                       "h-11 w-full pl-12 pr-4 bg-background/40 border-border/40 rounded-[4px] text-[13px] font-medium tracking-tight",
                       "placeholder:text-foreground/20 text-foreground outline-none",
                       "focus:border-primary/40 focus:ring-0 transition-all shadow-inner"
                     )}
                  />
                  {query && (
                    <button 
                      onClick={() => setQuery("")}
                      className="absolute right-3 p-1 rounded-full hover:bg-foreground/5 text-foreground/20 hover:text-foreground/60 transition-colors"
                    >
                      <FilterX className="h-3 w-3" />
                    </button>
                  )}
               </div>
            </div>
            
            <div className="flex items-center gap-2">
               <div className="flex items-center bg-background/40 rounded-[4px] p-0.5 border border-border/40">
                  <button 
                    onClick={() => setViewMode("list")} 
                    className={cn(
                      "h-8 px-4 flex items-center gap-2 rounded-[4px] transition-all",
                      viewMode === "list" ? "bg-card text-primary border border-border/40 shadow-sm" : "text-foreground/20 hover:text-foreground/40"
                    )}
                  >
                    <ListIcon className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Liste</span>
                  </button>
                  <button 
                    onClick={() => setViewMode("table")} 
                    className={cn(
                      "h-8 px-4 flex items-center gap-2 rounded-[4px] transition-all",
                      viewMode === "table" ? "bg-card text-primary border border-border/40 shadow-sm" : "text-foreground/20 hover:text-foreground/40"
                    )}
                  >
                    <TableIcon className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Analyse</span>
                  </button>
               </div>
            </div>

            {/* TOGGLE FILTERS BUTTON (Floating on the edge) */}
            <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className={cn(
                 "absolute -right-3 top-1/2 -translate-y-1/2 z-[60] h-6 w-6 rounded-full bg-background border border-border/40 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/40 transition-all shadow-xl group ring-4 ring-background",
                 "md:flex hidden"
               )}
            >
               <ChevronRight className={cn("h-3 w-3 transition-transform duration-500", isSidebarOpen ? "rotate-0" : "rotate-180")} />
               
               {/* Tooltip Indication */}
               <div className="absolute right-8 px-2 py-1 bg-black text-white text-[9px] font-bold uppercase tracking-widest rounded-[4px] border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap shadow-xl translate-x-2 group-hover:translate-x-0">
                  {isSidebarOpen ? "Masquer Filtres" : "Afficher Filtres"}
               </div>
            </button>
         </header>

         {/* ZONE DES RÉSULTATS */}
         <div className="flex-1 min-h-0">
            {viewMode === "list" ? (
               <div className="flex flex-col gap-3 pb-20">
                  {filteredResults.map((item) => (
                     <SearchResultRow key={item.id} item={item} />
                  ))}
               </div>
            ) : (
               <TableView results={filteredResults} />
            )}
            
            {!isLoading && filteredResults.length === 0 && (
               <div className="flex flex-col items-center justify-center py-40 opacity-10">
                  <Search size={40} className="mb-4" />
                  <h3 className="text-sm font-semibold uppercase tracking-[0.3em]">Néant</h3>
               </div>
            )}
         </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          2. FILTRES "QUIET" (INSPECTEUR - 4/12)
          ─────────────────────────────────────────────────────────── */}
      <aside className={cn(
        "lg:col-span-4 flex flex-col gap-4 select-none transition-all duration-500 ease-in-out sticky top-6 self-start",
        isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none hidden lg:flex"
      )}>
         {isLoading ? (
            <SidebarSkeleton />
         ) : (
            <div className="space-y-4">
               {/* TITLE BAR FOR INSPECTOR */}
               <div className="flex items-center gap-3 pb-4 border-b border-border/10 mb-2 h-6 px-1">
                  <Zap className="h-4 w-4 text-primary/60 outline-none" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">
                    Filtres de Triage
                  </span>
               </div>

               {FILTER_CATEGORIES.map((cat) => (
                 <div 
                   key={cat.id} 
                   className="bg-card/80 backdrop-blur-md border border-border/40 rounded-[4px] p-4 hover:border-border/60 hover:bg-card transition-all shadow-sm group"
                 >
                    <button 
                     onClick={() => toggleAccordion(cat.id)}
                     className="flex items-center justify-between w-full py-1 group/btn"
                    >
                       <span className="text-[10px] font-semibold text-foreground/40 group-hover/btn:text-primary uppercase tracking-[0.15em]">
                         {cat.title}
                       </span>
                       <ChevronDown className={cn(
                         "h-3 w-3 text-foreground/20 transition-transform duration-500",
                         openAccordions[cat.id] && "rotate-180"
                       )} />
                    </button>
                    
                    {openAccordions[cat.id] && (
                      <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-1 duration-300">
                         {cat.items.map((item) => (
                           <label key={item} className="flex items-center gap-3 cursor-pointer group/label">
                              <input 
                                 type="checkbox" 
                                 className="h-3 w-3 rounded-[2px] border border-border/40 bg-background/40 checked:bg-primary checked:border-primary appearance-none cursor-pointer transition-all"
                                 checked={(filters as any)[cat.id].includes(item)}
                                 onChange={() => toggleFilter(cat.id as any, item)}
                              />
                              <span className={cn(
                                 "text-[12px] font-bold transition-colors truncate tracking-tight uppercase",
                                 (filters as any)[cat.id].includes(item) ? "text-primary" : "text-foreground/30 group-hover/label:text-foreground/60"
                              )}>{item}</span>
                           </label>
                         ))}
                      </div>
                    )}
                 </div>
               ))}

               {/* Ribbon Side Info (Independent Card) */}
               <div className="p-4 bg-card/20 border border-border/20 rounded-[4px] flex items-center justify-between opacity-30 mt-4 group hover:opacity-60 transition-all">
                   <div className="flex items-center gap-3">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Security ARMP-V4</span>
                   </div>
                   <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
               </div>
            </div>
         )}
      </aside>
    </div>
  )
}

  )
}

// ───────────────────────────────────────────────────────────
// TABLEAU DE FRÉQUENCES (HIGH-DENSITY DATA TERMINAL)
// ───────────────────────────────────────────────────────────

function TableView({ results }: { results: SearchResult[] }) {
  return (
    <div className="bg-card/80 backdrop-blur-md border border-border/40 rounded-[4px] overflow-hidden">
       {/* TABLE HEADER */}
       <div className="flex items-center gap-4 px-4 py-3 bg-muted/30 border-b border-border/40 select-none">
          <div className="w-2.5 shrink-0" />
          <div className="w-[120px] shrink-0 text-[10px] font-semibold text-foreground/20 uppercase tracking-[0.2em]">Référence / AC</div>
          <div className="flex-1 text-[10px] font-semibold text-foreground/20 uppercase tracking-[0.2em]">Objet du Marché</div>
          <div className="w-[120px] shrink-0 text-[10px] font-semibold text-foreground/20 uppercase tracking-[0.2em] text-right">Caution</div>
          <div className="w-[100px] shrink-0 text-[10px] font-semibold text-foreground/20 uppercase tracking-[0.2em] text-center">Score Match</div>
          <div className="w-10 shrink-0" />
       </div>

       {/* TABLE ROWS */}
       <div className="max-h-[calc(100vh-320px)] overflow-y-auto custom-scrollbar pb-2">
          {results.map((item) => (
             <div 
               key={item.id} 
               className="group flex items-center gap-4 px-4 h-12 border-b border-border/10 hover:bg-muted/30 transition-all cursor-pointer relative"
             >
                {/* 1. URGENCY INDICATOR (2px Pulse) */}
                <div className={cn(
                  "absolute left-0 top-1/4 bottom-1/4 w-[2px] rounded-r-full",
                  parseInt(item.deadline) < 5 ? "bg-red-500" : parseInt(item.deadline) < 15 ? "bg-amber-500" : "bg-primary/50"
                )} />
                
                <div className="w-2.5 shrink-0" />

                {/* 2. IDENTITY (AC + Type) */}
                <div className="w-[120px] shrink-0 flex flex-col gap-0.5 overflow-hidden">
                   <span className="text-[10px] font-semibold text-foreground/40 uppercase tracking-tighter truncate">{item.id.split('-')[0]}</span>
                   <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest leading-none mt-0.5">{item.authority.split(' ')[0]}</span>
                </div>

                {/* 3. OBJECT (Title) */}
                <div className="flex-1 overflow-hidden">
                   <h4 className="text-[12px] font-medium text-foreground/80 truncate lowercase first-letter:uppercase group-hover:text-primary transition-colors tracking-tight">
                      {item.title}
                   </h4>
                </div>

                {/* 4. CAUTION (Budget/Metric) */}
                <div className="w-[120px] shrink-0 text-right">
                   <span className="text-[11px] font-mono font-medium text-foreground/40 tracking-tighter uppercase whitespace-nowrap">
                      {item.budget || "NC"}
                   </span>
                </div>

                {/* 5. IA SCORE */}
                <div className="w-[100px] shrink-0 flex items-center justify-center gap-2">
                   <div className="h-1 w-12 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden hidden sm:block">
                      <div 
                         className="h-full bg-primary shadow-[0_0_8px_rgba(37,211,102,0.4)]" 
                         style={{ width: `${item.matchScore}%` }} 
                      />
                   </div>
                   <span className="text-[10px] font-semibold text-primary/80">{item.matchScore}%</span>
                </div>

                {/* 6. ACTION (Quick Eye/Plus) */}
                <div className="w-10 shrink-0 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="h-7 w-7 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors">
                      <Plus size={14} />
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  )
}

function SidebarSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="space-y-4">
           <div className="h-4 w-24 bg-black/5 dark:bg-white/5 animate-pulse rounded" />
           <div className="space-y-3">
              {[1, 2, 3, 4].map(j => (
                <div key={j} className="flex gap-3 items-center">
                   <div className="h-3.5 w-3.5 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                   <div className="h-2.5 w-32 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                </div>
              ))}
           </div>
        </div>
      ))}
    </div>
  )
}
