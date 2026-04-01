"use client"

import * as React from "react"
import { BellRing, ExternalLink, ShieldAlert, Sparkles, Loader2, SearchX, MousePointer2, Lock, PanelLeftClose, PanelLeftOpen, Menu, Calendar, MapPin, Target, Zap, FileText, Info, Building2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from "@/components/ui/sheet"

import { SearchSidebar } from "./search-sidebar"
import { SearchToolbar, ViewMode } from "./search-toolbar"
import { SearchResultRow } from "./search-result-row"
import { MOCK_SEARCH_RESULTS } from "./search-mocks"
import { SearchResultsKanban } from "./search-results-kanban"
import { SearchState, SearchResult } from "./search-types"
import { generateWhatsAppLink } from "./search-utils"
import { cn } from "@/lib/utils"

interface SearchShellCompactProps {
  initialResults?: SearchResult[]
  isLoading?: boolean
}

export function SearchShellCompact({ initialResults, isLoading: externalLoading }: SearchShellCompactProps) {
  const [query, setQuery] = React.useState("")
  const [viewMode, setViewMode] = React.useState<ViewMode>("list")
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [state, setState] = React.useState<SearchState>(externalLoading ? "loading" : (initialResults?.length ? "results" : "initial"))
  
  // Advanced Filter State
  const [filters, setFilters] = React.useState({
    matchLevels: ["excellent"],
    urgents: false,
    budgetsBip: false,
    procedures: [] as string[],
    secteurs: ["Fournitures"], // Default matches mock state
    regions: ["Centre"], // Default matches mock state
  })
  const [sort, setSort] = React.useState("recent")
  const [activeQuickFilter, setActiveQuickFilter] = React.useState<string | null>(null)

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setState("loading")
    setTimeout(() => setState("results"), 300)
  }

  const getResults = () => {
    let baseResults = initialResults || MOCK_SEARCH_RESULTS
    
    if (state === "loading") return []
    
    // 1. Text Search (title, authority, region)
    if (query) {
      const q = query.toLowerCase()
      baseResults = baseResults.filter(r => 
        (r.title?.toLowerCase().includes(q) || false) || 
        (r.authority?.toLowerCase().includes(q) || false) ||
        (r.region?.toLowerCase().includes(q) || false)
      )
    }

    // 2. IA Match Levels
    if (filters.matchLevels.length > 0) {
      baseResults = baseResults.filter(r => r.matchLevel && filters.matchLevels.includes(r.matchLevel))
    }

    // 3. Quick Filters (Recommended/Risky/Urgent)
    if (activeQuickFilter === 'RECOMMANDÉS') {
      baseResults = baseResults.filter(r => r.matchLevel === 'excellent' || r.matchLevel === 'recommended')
    } else if (activeQuickFilter === 'RISQUÉS') {
      baseResults = baseResults.filter(r => r.matchLevel === 'risky')
    } else if (activeQuickFilter === 'URGENTS') {
      baseResults = baseResults.filter(r => parseInt(r.deadline) <= 15)
    }

    // 4. Procedures
    if (filters.procedures.length > 0) {
      baseResults = baseResults.filter(r => filters.procedures.includes(r.type))
    }

    // 5. Sectors
    if (filters.secteurs.length > 0) {
      baseResults = baseResults.filter(r => filters.secteurs.includes(r.sector))
    }

    // 6. Regions
    if (filters.regions.length > 0) {
      baseResults = baseResults.filter(r => filters.regions.includes(r.region))
    }

    // 7. Urgents J-15
    if (filters.urgents) {
      baseResults = baseResults.filter(r => parseInt(r.deadline) <= 15)
    }

    // 8. Sorting
    baseResults = [...baseResults].sort((a, b) => {
       if (sort === "recent") return 0 // Mock doesn't have dates yet
       if (sort === "urgent") return parseInt(a.deadline) - parseInt(b.deadline)
        if (sort === "score") return (b.matchScore || 0) - (a.matchScore || 0)
       if (sort === "budget_desc") return b.budget.length - a.budget.length // Mock budget is string, using length as proxy
       return 0
    })

    return baseResults
  }

  const results = getResults()

  React.useEffect(() => {
    if (externalLoading) {
      setState("loading")
    } else if (initialResults) {
      setState(initialResults.length > 0 ? "results" : "no_results")
    }
  }, [externalLoading, initialResults])

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded border border-border bg-card text-card-foreground shadow-none">
      <div className="flex h-full min-h-0 overflow-hidden">
        
        {/* Desktop Sidebar */}
        <motion.div 
            layout
            animate={{ width: isSidebarOpen ? 208 : 64 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} 
            className="hidden h-full shrink-0 border-r border-border bg-card md:flex md:flex-col overflow-hidden"
        >
          <SearchSidebar 
             isCollapsed={!isSidebarOpen} 
             filters={filters}
             onFilterChange={handleFilterChange}
          />
        </motion.div>

        {/* Mobile Sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute left-2 top-2 z-50 h-8 w-8 rounded md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r w-64 bg-card">
            <SheetHeader className="sr-only">
               <SheetTitle>Menu de Navigation Latérale</SheetTitle>
               <SheetDescription>Filtres avancés pour la veille stratégique sur les marchés publics.</SheetDescription>
            </SheetHeader>
            <SearchSidebar 
               isCollapsed={false} 
               filters={filters}
               onFilterChange={handleFilterChange}
            />
          </SheetContent>
        </Sheet>

        {/* Content Area */}
        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
          <div className="sticky top-0 z-10 bg-background/90 backdrop-blur border-b">
            <SearchToolbar
              query={query}
              onQueryChange={setQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isSidebarOpen={isSidebarOpen}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              sort={sort}
              onSortChange={setSort}
              activeQuickFilter={activeQuickFilter}
              onQuickFilterChange={setActiveQuickFilter}
              resultsCount={results.length}
            />
          </div>

          <div className="min-h-0 flex-1 overflow-hidden">
            {state === "loading" && (
               <div className="flex h-full flex-col items-center justify-center p-8 text-muted-foreground/30">
                  <Loader2 className="h-6 w-6 animate-spin opacity-40 mb-3" />
                  <p className="text-[10px] font-medium tracking-widest leading-none">Analyse des critères IA...</p>
               </div>
            )}

            <AnimatePresence mode="wait">
              {state === "results" && (
                <motion.div 
                   key="results"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="h-full"
                >
                  <ScrollArea className="h-full">
                    <div className={cn("p-4 pb-24", viewMode === "list" ? "space-y-1.5" : "")}>
                      {results.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground/30">
                           <SearchX className="h-8 w-8 opacity-20 mb-4" />
                           <p className="text-[10px] font-medium tracking-widest">Aucun résultat trouvé</p>
                        </div>
                      ) : (
                        viewMode === "list" ? (
                           results.map((item) => (
                              <SearchResultRow key={item.id} item={item} />
                           ))
                        ) : (
                           <SearchResultsKanban results={results} />
                        )
                      )}
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>

            {(state === "initial" || (state === "results" && results.length === 0 && !query)) && (
               <div className="flex h-full flex-col items-center justify-center p-8 text-muted-foreground/30">
                  <MousePointer2 className="h-10 w-10 opacity-20 mb-4" />
                  <h3 className="text-sm font-medium text-foreground/60 mb-1 tracking-tight">Utilisez les filtres à gauche</h3>
                  <p className="text-[10px] font-normal opacity-40 tracking-tighter">Pour affiner la veille stratégique selon vos secteurs.</p>
               </div>
            )}
          </div>

          <div className="sticky bottom-0 z-10 shrink-0 border-t bg-card/90 backdrop-blur px-4 py-2">
            <div className="flex items-center justify-end">
               <Button variant="outline" asChild className="h-7 border-primary/20 px-3 text-[9px] font-medium text-primary hover:bg-primary/5 rounded-[4px]">
                  <a href={generateWhatsAppLink({}, "alerte-sectorielle", query)} target="_blank">Alerte WhatsApp</a>
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
