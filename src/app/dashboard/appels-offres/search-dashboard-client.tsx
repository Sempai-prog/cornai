// ══════════════════════════════════════════
// SABI — Station de Travail 2.8 (Moteur de Recherche — Tableau de Fréquences)
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
  Plus,
  Filter,
  Calendar,
  MapPin,
  Tag,
  Building2,
  AlertCircle,
  LayoutGrid,
  CheckCircle2,
  FileText,
  Globe,
  ArrowRight
} from "lucide-react"
import { SABI_COPY } from "@/lib/SabiCopy"

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

const SECTORS = SABI_COPY.SEARCH.FILTERS.SECTORS;
const TYPES = [
  SABI_COPY.SEARCH.FILTERS.TYPES.AONO,
  SABI_COPY.SEARCH.FILTERS.TYPES.AONR,
  SABI_COPY.SEARCH.FILTERS.TYPES.DC,
  SABI_COPY.SEARCH.FILTERS.TYPES.ASMI
];

const FILTER_CATEGORIES = [
  { id: "secteurs", title: "Secteurs d'Activité", items: SECTORS },
  { id: "regions", title: "Régions Locales", items: ["Centre", "Littoral", "Ouest", "Nord", "Est", "Sud", "Nord-Ouest", "Sud-Ouest", "Adamaoua", "Extrême-Nord"] },
  { id: "procedures", title: "Modes de Passation", items: TYPES }
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
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 relative min-h-[calc(100vh-210px)] animate-in fade-in duration-700 px-4 sm:px-6 lg:px-0">
      
      {/* ───────────────────────────────────────────────────────────
          1. FILTRES "QUIET" (SIDEBAR RÉTRACTABLE)
          ─────────────────────────────────────────────────────────── */}
      <aside className={cn(
        "flex-shrink-0 flex flex-col gap-4 select-none transition-all duration-500 ease-in-out overflow-hidden mt-0.5",
        isSidebarOpen ? "w-full lg:w-72 opacity-100" : "w-0 opacity-0 pointer-events-none hidden lg:flex"
      )}>
         {isLoading ? (
            <SidebarSkeleton />
         ) : (
            <>
               {FILTER_CATEGORIES.map((cat) => (
                 <div 
                   key={cat.id} 
                   className="bg-card/80 backdrop-blur-md border border-border/40 rounded-[4px] p-4 hover:border-border/60 hover:bg-card transition-all shadow-sm group whitespace-nowrap"
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
               <div className="p-4 bg-card/20 border border-border/20 rounded-[4px] flex items-center gap-3 opacity-30 mt-auto whitespace-nowrap">
                   <ShieldCheck className="h-4 w-4" />
                   <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Protection: ARMP-V4</span>
               </div>
            </>
         )}
      </aside>

      {/* ───────────────────────────────────────────────────────────
          2. STATION DE TRI DYNAMIQUE (CONTENU PRINCIPAL)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col gap-6 min-w-0 w-full">
         
         <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card/80 backdrop-blur-md border border-border/40 rounded-[4px] relative">
            
            {/* TOGGLE SIDEBAR BUTTON (Positionné entre Sidebar et Header) */}
            <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className={cn(
                 "absolute -left-3 top-1/2 -translate-y-1/2 z-50 h-6 w-6 rounded-full bg-card border border-border/40 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/40 transition-all shadow-xl group",
                 "md:flex hidden"
               )}
               title={isSidebarOpen ? "Fermer les filtres" : "Ouvrir les filtres"}
            >
               <ChevronRight className={cn("h-3 w-3 transition-transform duration-500", isSidebarOpen ? "rotate-180" : "rotate-0")} />
               
               {/* Tooltip Indication */}
               <div className="absolute left-8 px-2 py-1 bg-popover text-popover-foreground text-[10px] font-bold uppercase tracking-widest rounded-[4px] border border-border opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl">
                  {isSidebarOpen ? "FERMER FILTRES" : "OUVRIR FILTRES"}
               </div>
            </button>

            <div className="flex-1 w-full max-w-2xl relative">
               <div className="relative flex items-center w-full group/input">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input 
                      placeholder={SABI_COPY.SEARCH.PLACEHOLDER}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="pl-9 h-11 bg-card/40 border-border/40 focus-visible:ring-primary/20 rounded-[4px] font-medium"
                    />
                  </div>
                  <Button className="h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-[4px] shadow-sm flex items-center gap-2 ml-2">
                    <Zap className="size-4 fill-current" />
                    Scanner le Radar
                  </Button>
                  {query && (
                    <button 
                      onClick={() => setQuery("")}
                      className="absolute right-32 p-1 rounded-full hover:bg-muted text-foreground/20 hover:text-foreground/60 transition-colors"
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
    </div>
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
                   <div className="h-1 w-12 bg-muted rounded-full overflow-hidden hidden sm:block">
                      <div 
                         className="h-full bg-primary shadow-[0_0_8px_rgba(37,211,102,0.4)]" 
                         style={{ width: `${item.matchScore}%` }} 
                      />
                   </div>
                   <span className="text-[10px] font-semibold text-primary/80">{item.matchScore}%</span>
                </div>

                {/* 6. ACTION (Quick Eye/Plus) */}
                <div className="w-10 shrink-0 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="h-7 w-7 rounded bg-muted border border-border/40 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
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
           <div className="h-4 w-24 bg-muted animate-pulse rounded" />
           <div className="space-y-3">
              {[1, 2, 3, 4].map(j => (
                <div key={j} className="flex gap-3 items-center">
                   <div className="h-3.5 w-3.5 bg-muted rounded animate-pulse" />
                   <div className="h-2.5 w-32 bg-muted rounded animate-pulse" />
                </div>
              ))}
           </div>
        </div>
      ))}
    </div>
  )
}
