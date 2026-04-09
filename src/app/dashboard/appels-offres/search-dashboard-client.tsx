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
import { cn } from "@/lib/utils"
import { useSearchAppelsOffres } from "@/hooks/use-search-appels-offres"
import { PaginationSabi } from "@/components/ui/pagination-sabi"
import { SABI_COPY } from "@/lib/SabiCopy"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchResultRow } from "@/components/search/search-result-row"
import { SearchResult } from "@/components/search/search-types"

// ───────────────────────────────────────────────────────────
// CONFIGURATION MÉTIEUR (ARMP / Cameroun)
// ───────────────────────────────────────────────────────────

const SECTORS = SABI_COPY.SEARCH.FILTERS.SECTORS;
const PROCEDURES = [
  { value: "AONO", label: SABI_COPY.SEARCH.FILTERS.TYPES.AONO },
  { value: "AONR", label: SABI_COPY.SEARCH.FILTERS.TYPES.AONR },
  { value: "DC", label: SABI_COPY.SEARCH.FILTERS.TYPES.DC },
  { value: "ASMI", label: SABI_COPY.SEARCH.FILTERS.TYPES.ASMI },
];

const REGIONS = [
  "Centre", "Littoral", "Ouest", "Nord", "Est", "Sud", "Nord-Ouest", "Sud-Ouest", "Adamaoua", "Extrême-Nord"
];

const FILTER_CATEGORIES = [
  { id: "secteurs", title: "Secteurs d'Activité", items: SECTORS.map(s => ({ value: s, label: s })) },
  { id: "regions", title: "Régions Locales", items: REGIONS.map(r => ({ value: r, label: r })) },
  { id: "procedures", title: "Modes de Passation", items: PROCEDURES }
]

interface SearchDashboardClientProps {
  initialResults: SearchResult[]
  pagination: {
    total: number
    page: number
    totalPages: number
    parPage: number
  }
}

export function SearchDashboardClient({ initialResults, pagination }: SearchDashboardClientProps) {
  const { page, setPage, recherche, handleRecherche, secteur, setSecteur, region, setRegion, type, setType } = useSearchAppelsOffres()
  const [localSearch, setLocalSearch] = React.useState(recherche)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [viewMode, setViewMode] = React.useState<"list" | "table">("list")
  const [openAccordions, setOpenAccordions] = React.useState<Record<string, boolean>>({ secteurs: true })
  const [isPending, startTransition] = React.useTransition()

  // Synchronisation de la recherche locale avec le paramètre d'URL (nuqs)
  const onSearchChange = (val: string) => {
    setLocalSearch(val)
    startTransition(() => {
      handleRecherche(val)
    })
  }

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleFilter = (key: string, value: string) => {
    startTransition(() => {
      if (key === 'secteurs') {
        setSecteur(secteur === value ? null : value)
      } else if (key === 'regions') {
        setRegion(region === value ? null : value)
      } else if (key === 'procedures') {
        setType(type === value ? null : value)
      }
      setPage(1)
    })
  }

  const filteredResults = initialResults

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative min-h-[calc(100vh-210px)] animate-in fade-in duration-500 px-4 sm:px-6 lg:px-0 bg-transparent">
      
      {/* ───────────────────────────────────────────────────────────
          1. FILTRES "QUIET" (SIDEBAR RÉTRACTABLE)
          ─────────────────────────────────────────────────────────── */}
      <aside className={cn(
        "flex-shrink-0 flex flex-col gap-4 select-none transition-all duration-500 ease-in-out overflow-hidden mt-0.5",
        isSidebarOpen ? "w-full lg:w-72 opacity-100" : "w-0 opacity-0 pointer-events-none hidden lg:flex"
      )}>
         {FILTER_CATEGORIES.map((cat) => (
                 <div 
                   key={cat.id} 
                   className="bg-card border border-border/10 rounded-[4px] p-4 hover:border-border/20 hover:bg-card transition-all shadow-none group whitespace-nowrap"
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
                           <label key={item.value} className="flex items-center gap-3 cursor-pointer group/label">
                              <input 
                                 type="checkbox" 
                                 className="h-3 w-3 rounded-[2px] border border-border/10 bg-background checked:bg-primary checked:border-primary appearance-none cursor-pointer transition-all"
                                 checked={
                                   cat.id === 'secteurs' ? secteur === item.value : 
                                   cat.id === 'regions' ? region === item.value : 
                                   type === item.value
                                 }
                                 onChange={() => toggleFilter(cat.id, item.value)}
                              />
                              <span className={cn(
                                 "text-[12px] font-bold transition-colors truncate tracking-tight uppercase max-w-[200px]",
                                 (
                                   cat.id === 'secteurs' ? secteur === item.value : 
                                   cat.id === 'regions' ? region === item.value : 
                                   type === item.value
                                 ) ? "text-primary" : "text-foreground/30 group-hover/label:text-foreground/60"
                              )} title={item.label}>{item.label}</span>
                           </label>
                         ))}
                      </div>
                    )}
                 </div>
               ))}

               {/* Ribbon Side Info (Independent Card) */}
               <div className="p-4 bg-muted/10 border border-border/10 rounded-[4px] flex items-center gap-3 opacity-30 mt-auto whitespace-nowrap">
                   <ShieldCheck className="h-4 w-4" />
                   <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Protection: ARMP-V4</span>
               </div>
      </aside>

      {/* ───────────────────────────────────────────────────────────
          2. STATION DE TRI DYNAMIQUE (CONTENU PRINCIPAL)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col gap-8 min-w-0 w-full">
         
         <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card border border-border/10 rounded-[4px] relative shadow-none">
            
            {/* TOGGLE SIDEBAR BUTTON (Positionné entre Sidebar et Header) */}
            <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className={cn(
                 "absolute -left-3 top-1/2 -translate-y-1/2 z-50 h-6 w-6 rounded-[4px] bg-card border border-border/10 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/40 transition-all shadow-none group",
                 "md:flex hidden"
               )}
               title={isSidebarOpen ? "Fermer les filtres" : "Ouvrir les filtres"}
            >
               <ChevronRight className={cn("h-3 w-3 transition-transform duration-500", isSidebarOpen ? "rotate-180" : "rotate-0")} />
               
               {/* Tooltip Indication */}
               <div className="absolute left-8 px-2 py-1 bg-popover text-popover-foreground text-[10px] font-bold uppercase tracking-widest rounded-[4px] border border-border opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-none">
                  {isSidebarOpen ? "FERMER FILTRES" : "OUVRIR FILTRES"}
               </div>
            </button>

            <div className="flex-1 w-full max-w-2xl relative">
               <div className="relative flex items-center w-full group/input">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input 
                      placeholder={SABI_COPY.SEARCH.PLACEHOLDER}
                      value={localSearch}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="pl-9 h-11 bg-background border-border/10 focus-visible:ring-primary/20 rounded-[4px] font-medium"
                    />
                  </div>
                  <Button 
                    onClick={() => {
                      startTransition(() => {
                        handleRecherche.flush()
                      })
                    }}
                    className="h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-[4px] shadow-none flex items-center gap-2 ml-2"
                  >
                    <Zap className="size-4 fill-current" />
                    Scanner le Radar
                  </Button>
                  {localSearch && (
                    <button 
                      onClick={() => onSearchChange("")}
                      className="absolute right-32 p-1 rounded-[4px] hover:bg-muted text-foreground/20 hover:text-foreground/60 transition-colors"
                    >
                      <FilterX className="h-3 w-3" />
                    </button>
                  )}
               </div>
            </div>
            
            <div className="flex items-center gap-2">
               <div className="flex items-center bg-background rounded-[4px] p-0.5 border border-border/10">
                  <button 
                    onClick={() => setViewMode("list")} 
                    className={cn(
                      "h-8 px-4 flex items-center gap-2 rounded-[4px] transition-all",
                      viewMode === "list" ? "bg-card text-primary border border-border/10 shadow-none" : "text-foreground/20 hover:text-foreground/40"
                    )}
                  >
                    <ListIcon className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Liste</span>
                  </button>
                  <button 
                    onClick={() => setViewMode("table")} 
                    className={cn(
                      "h-8 px-4 flex items-center gap-2 rounded-[4px] transition-all",
                      viewMode === "table" ? "bg-card text-primary border border-border/10 shadow-none" : "text-foreground/20 hover:text-foreground/40"
                    )}
                  >
                    <TableIcon className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Analyse</span>
                  </button>
               </div>
            </div>
         </header>

         {/* ZONE DES RÉSULTATS */}
         <div className={cn(
            "flex-1 min-h-0 transition-opacity duration-300",
            isPending ? "opacity-40 pointer-events-none" : "opacity-100"
         )}>
            {viewMode === "list" ? (
               <div className="flex flex-col gap-3 pb-20">
                  {filteredResults.map((item) => (
                     <SearchResultRow key={item.id} item={item} />
                  ))}
               </div>
            ) : (
               <TableView results={filteredResults} />
            )}
            
            <PaginationSabi 
              page={page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              onPageChange={(p) => {
                startTransition(() => {
                  setPage(p)
                })
              }}
            />
            
            {filteredResults.length === 0 && (
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
    <div className="bg-card border border-border/10 rounded-[4px] overflow-hidden shadow-none">
       {/* TABLE HEADER */}
       <div className="flex items-center gap-4 px-4 py-3 bg-muted border-b border-border/10 select-none">
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
               className="group flex items-center gap-4 px-4 h-12 border-b border-border/10 hover:bg-muted transition-all cursor-pointer relative"
             >
                {/* 1. URGENCY INDICATOR (2px Pulse) */}
                <div className={cn(
                  "absolute left-0 top-1/4 bottom-1/4 w-[1.5px] rounded-r-[4px]",
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
                   <div className="h-[2px] w-full bg-muted/20 rounded-[4px] overflow-hidden">
                      <div 
                         className="h-full bg-primary" 
                         style={{ width: `${item.matchScore}%` }} 
                      />
                   </div>
                   <span className="text-[10px] font-semibold text-primary/80">{item.matchScore}%</span>
                </div>

                {/* 6. ACTION (Quick Eye/Plus) */}
                <div className="w-10 shrink-0 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="h-7 w-7 rounded bg-muted border border-border/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
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
