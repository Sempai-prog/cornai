// ══════════════════════════════════════════
// CORNAi — Station de Travail 2.0 (Lock-Design — Quiet Surface)
// ══════════════════════════════════════════

"use client"

import * as React from "react"
import { 
  Search, 
  ChevronDown,
  History,
  Kanban as KanbanIcon,
  ArrowRight,
  FilterX,
  Target as TargetIcon,
  File as FileIcon,
  List as ListIcon,
  Clock,
  ShieldCheck,
  Zap
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
  const [query, setQuery] = React.useState("")
  const [viewMode, setViewMode] = React.useState<"list" | "kanban">("list")
  const [isLoading, setIsLoading] = React.useState(true) // Simule chargement initial
  const [openAccordions, setOpenAccordions] = React.useState<Record<string, boolean>>({ secteurs: true })
  const [filters, setFilters] = React.useState({
    secteurs: [] as string[],
    regions: [] as string[],
    procedures: [] as string[],
  })

  // Effet de chargement simulé (Quiet Design)
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
    /* ───────────────────────────────────────────────────────────
       1. CONTENEUR MAÎTRE (FLUIDE & MODULAIRE — BENTO STYLE)
       ─────────────────────────────────────────────────────────── */
    <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row gap-6 relative min-h-[calc(100vh-210px)]">
      
      {/* ───────────────────────────────────────────────────────────
          2. LES FILTRES "EN VIE" (SIDEBAR MODULAIRE)
          ─────────────────────────────────────────────────────────── */}
      <aside className="w-72 flex-shrink-0 flex flex-col gap-4 select-none">
         {isLoading ? (
            <SidebarSkeleton />
         ) : (
            FILTER_CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                className="bg-[#0c0c0c]/80 backdrop-blur-sm border border-white/5 rounded-[4px] p-4 hover:border-white/10 hover:bg-[#0c0c0c] transition-all shadow-sm group"
              >
                 <button 
                  onClick={() => toggleAccordion(cat.id)}
                  className="flex items-center justify-between w-full py-1 group/btn"
                 >
                    <span className="text-[10px] font-black text-foreground/40 group-hover/btn:text-primary uppercase tracking-[0.15em]">
                      {cat.title}
                    </span>
                    <ChevronDown className={cn(
                      "h-3 w-3 text-foreground/20 transition-transform duration-500",
                      openAccordions[cat.id] && "rotate-180"
                    )} />
                 </button>
                 
                 {openAccordions[cat.id] && (
                   <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-1 duration-500">
                      {cat.items.map((item) => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer group/label">
                           <input 
                              type="checkbox" 
                              className="h-3 w-3 rounded-[2px] border border-white/10 bg-white/[0.03] checked:bg-primary checked:border-primary appearance-none cursor-pointer transition-all"
                              checked={(filters as any)[cat.id].includes(item)}
                              onChange={() => toggleFilter(cat.id as any, item)}
                           />
                           <span className={cn(
                              "text-[12px] font-medium transition-colors truncate tracking-tight",
                              (filters as any)[cat.id].includes(item) ? "text-primary" : "text-foreground/30 group-hover/label:text-foreground/60"
                           )}>{item}</span>
                        </label>
                      ))}
                   </div>
                 )}
              </div>
            ))
         )}

         {/* Ribbon Side Info (Independent Card) */}
         <div className="p-4 bg-[#0c0c0c]/40 border border-white/5 rounded-[4px] flex items-center gap-3 opacity-30">
             <ShieldCheck className="h-4 w-4" />
             <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Security: ARMP-V4</span>
         </div>
      </aside>

      {/* ───────────────────────────────────────────────────────────
          3. LA ZONE DES RÉSULTATS (FLUIDITÉ & LARGEUR)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
         
         {/* BARRE DE RECHERCHE (CARTE FLOTTANTE INDÉPENDANTE) */}
         <header className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-[#0c0c0c]/80 backdrop-blur-sm border border-white/5 rounded-[4px] shadow-sm">
            <div className="flex-1 flex items-center gap-4 bg-white/[0.03] border border-white/5 px-4 h-10 rounded-[4px] w-full max-w-2xl group transition-all focus-within:border-primary/30">
               <Search className="h-4 w-4 text-foreground/10 group-focus-within:text-primary transition-colors" />
               <Input 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ID ARMP, Autorité ou Objet du marché..." 
                  className="h-full w-full bg-transparent border-none p-0 text-[14px] font-normal focus-visible:ring-0 placeholder:text-foreground/5 text-foreground/80 outline-none"
               />
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
               <div className="flex items-center bg-white/[0.03] rounded-[4px] p-0.5 border border-white/5">
                  <button onClick={() => setViewMode("list")} className={cn("h-8 px-4 flex items-center gap-2 rounded-[3px] transition-all", viewMode === "list" ? "bg-card text-primary shadow-sm" : "text-foreground/20 hover:text-foreground/40")}>
                    <ListIcon className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Liste</span>
                  </button>
                  <button onClick={() => setViewMode("kanban")} className={cn("h-8 px-4 flex items-center gap-2 rounded-[3px] transition-all", viewMode === "kanban" ? "bg-card text-primary shadow-sm" : "text-foreground/20 hover:text-foreground/40")}>
                    <KanbanIcon className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Workflow</span>
                  </button>
               </div>
            </div>
         </header>

         {/* LISTE DES RÉSULTATS (ZONE FLUIDE) */}
         <div className="flex-1 min-h-0">
            {viewMode === "list" ? (
               <div className="flex flex-col gap-3 pb-20">
                  {filteredResults.map((item) => (
                     <SearchResultRow key={item.id} item={item} />
                  ))}
               </div>
            ) : (
               <ScrollArea className="h-[calc(100vh-320px)] scrollbar-hide">
                  <KanbanView2 results={filteredResults} />
               </ScrollArea>
            )}
            
            {!isLoading && filteredResults.length === 0 && (
               <div className="flex flex-col items-center justify-center py-40 opacity-15">
                  <History className="h-10 w-10 mb-4" />
                  <h3 className="text-sm font-bold uppercase tracking-widest">Aucun Dossier Trouvé</h3>
               </div>
            )}
         </div>

      </div>

    </div>
  )
}

// ───────────────────────────────────────────────────────────
// SKELETONS (SIDEBAR FILTERS)
// ───────────────────────────────────────────────────────────

function SidebarSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="space-y-4">
           {/* Section Title */}
           <div className="h-4 w-24 bg-white/5 animate-pulse rounded" />
           {/* Checkbox Rows */}
           <div className="space-y-3">
              {[1, 2, 3, 4].map(j => (
                <div key={j} className="flex gap-3 items-center">
                   <div className="h-3.5 w-3.5 bg-white/5 rounded animate-pulse" />
                   <div className="h-2.5 w-32 bg-white/5 rounded animate-pulse" />
                </div>
              ))}
           </div>
        </div>
      ))}
    </div>
  )
}

// ───────────────────────────────────────────────────────────
// KANBAN 2.0 (LINEAR-STYLE / QUIET DESIGN)
// ───────────────────────────────────────────────────────────

function KanbanView2({ results }: { results: SearchResult[] }) {
  const columns = [
    { id: "opportunite", title: "À Analyser", icon: TargetIcon, dot: "bg-slate-500" },
    { id: "eval", title: "Décision", icon: ArrowRight, dot: "bg-amber-500" },
    { id: "montage", title: "Montage", icon: FileIcon, dot: "bg-blue-500" },
    { id: "soumis", title: "Soumis", icon: ShieldCheck, dot: "bg-primary" },
  ]

  return (
    <div className="flex gap-4 h-full overflow-x-auto scrollbar-hide pb-10">
      {columns.map((col) => (
        <div key={col.id} className="w-80 flex-shrink-0 flex flex-col gap-3">
          
          {/* COLUMN HEADER (QUIET) */}
          <div className="flex items-center justify-between px-2 mb-2">
             <div className="flex items-center gap-2.5 opacity-40 group hover:opacity-100 transition-opacity">
                <div className={cn("h-1.5 w-1.5 rounded-full", col.dot)} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">{col.title}</span>
             </div>
             <span className="text-[10px] font-bold bg-white/5 px-2 py-0.5 rounded-full text-foreground/30">{results.filter(r => (r.workflowState || 'opportunite') === col.id).length}</span>
          </div>

          {/* COLUMN BODY */}
          <div className="flex flex-col gap-2.5">
             {results.filter(r => (r.workflowState || 'opportunite') === col.id).map(item => (
                <div key={item.id} className="bg-[#0c0c0c] border border-white/5 rounded-[4px] p-4 hover:border-white/10 transition-all cursor-grab active:cursor-grabbing group shadow-sm">
                   
                   {/* CARD TOP */}
                   <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-tighter text-foreground/20 group-hover:text-foreground/40 transition-colors">
                        {item.authority.split(' ').slice(0, 2).join(' ')}
                      </span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 rounded-[2px]">
                         <Clock className="h-2.5 w-2.5 opacity-30" />
                         <span className={cn(
                            "text-[10px] font-bold uppercase",
                            parseInt(item.deadline) < 5 ? "text-red-500" : "text-primary/60"
                         )}>J-{item.deadline.split(' ')[0]}</span>
                      </div>
                   </div>

                   {/* CARD BODY */}
                   <h4 className="text-[13px] font-medium leading-snug text-foreground/80 group-hover:text-primary transition-colors line-clamp-2 mb-4 tracking-tight">
                      {item.title}
                   </h4>

                   {/* CARD FOOTER */}
                   <div className="flex items-center justify-between pt-3 border-t border-white/[0.03]">
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-bold text-foreground/15 uppercase tracking-tighter">Budget Est.</span>
                         <span className="text-[10px] font-medium text-foreground/40">{item.budget || "N/A"}</span>
                      </div>
                      <Badge variant="outline" className="h-4.5 rounded-[2px] border-primary/20 bg-primary/5 px-2 text-[9px] font-black text-primary uppercase">
                        {item.matchScore}%
                      </Badge>
                   </div>
                </div>
             ))}

             {/* Placeholder Drop Zone (Visual) */}
             <div className="h-20 border border-dashed border-white/5 rounded-[4px] opacity-10" />
          </div>
        </div>
      ))}
    </div>
  )
}
