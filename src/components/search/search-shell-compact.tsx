"use client"

import * as React from "react"
import { BellRing, ExternalLink, ShieldAlert, Sparkles, Loader2, SearchX, MousePointer2, Lock, PanelLeftClose, PanelLeftOpen, Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { SearchSidebar } from "./search-sidebar"
import { SearchToolbar, ViewMode } from "./search-toolbar"
import { SearchResultRow } from "./search-result-row"
import { searchResultsMock } from "./search-mocks"
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

  // Client-side filtering for the initial set of results
  const getResults = () => {
    const baseResults = initialResults || searchResultsMock
    if (state === "loading") return []
    if (!query) return baseResults
    
    const filtered = baseResults.filter(r => 
      r.title.toLowerCase().includes(query.toLowerCase()) || 
      r.authority.toLowerCase().includes(query.toLowerCase())
    )

    return filtered
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
        
        {/* Desktop Sidebar (Retractable) */}
        <motion.div 
            layout
            animate={{ width: isSidebarOpen ? 208 : 64 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} 
            className="hidden h-full shrink-0 border-r border-border bg-card md:flex md:flex-col overflow-hidden"
        >
          <SearchSidebar isCollapsed={!isSidebarOpen} />
        </motion.div>

        {/* Mobile Sidebar (Sheet) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-2 top-2 z-50 h-8 w-8 rounded md:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r w-64 bg-card">
            <SearchSidebar isCollapsed={false} />
          </SheetContent>
        </Sheet>

        {/* Content Area */}
        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
          <div className="sticky top-0 z-10 bg-background/90 backdrop-blur border-b">
            <SearchToolbar
              query={query}
              onQueryChange={(q) => {
                setQuery(q)
                if (q.length > 0 && state === "initial") setState("loading")
                if (q.length === 0) setState("initial")
              }}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isSidebarOpen={isSidebarOpen}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </div>

          {/* Results Area */}
          <div className="min-h-0 flex-1 overflow-hidden">
            {state === "loading" ? (
              <ScrollArea className="h-full">
                <div className="space-y-4 p-4 text-center">
                  <p className="text-[10px] font-black tracking-widest text-foreground/40 animate-pulse">
                     ⏳ INTERROGATION DE COLEPS ET DU JDM EN COURS...
                  </p>
                  <div className="space-y-1.5">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="flex h-[50px] items-center gap-3 rounded border border-border/40 px-3">
                        <Skeleton className="h-5 w-8 rounded opacity-50" />
                        <div className="flex flex-1 flex-col gap-1.5">
                           <Skeleton className="h-3 w-3/4 rounded opacity-40" />
                           <Skeleton className="h-2 w-1/2 rounded opacity-20" />
                        </div>
                        <Skeleton className="h-8 w-20 rounded opacity-10" />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            ) : state === "initial" ? (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <MousePointer2 className="h-8 w-8 text-foreground/10 mb-4" />
                <h3 className="text-sm font-black text-foreground/60 mb-1">Prêt pour la veille</h3>
                <p className="max-w-[200px] text-[11px] font-bold text-foreground/30">
                  Tapez un secteur ou une région (ex: BTP Douala, Fournitures MINSANTE).
                </p>
              </div>
            ) : state === "no_results" ? (
               <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <SearchX className="h-8 w-8 text-foreground/10 mb-4" />
                <h3 className="text-sm font-black text-foreground/60 mb-2">Aucun marché publié</h3>
                <p className="max-w-[240px] text-[11px] font-bold text-foreground/30 mb-6 leading-relaxed">
                  Aucun marché pour ces critères aujourd'hui. Activez l'alerte pour être notifié de la prochaine publication de l'ARMP.
                </p>
                <Button 
                  asChild
                  className="h-8 rounded-[4px] bg-primary text-[10px] font-black text-white hover:bg-primary/90"
                >
                  <a href={generateWhatsAppLink({} as any, "alert", query)} target="_blank" rel="noopener noreferrer">
                     <BellRing className="mr-2 h-3.5 w-3.5" />
                     ACTIVER L'ALERTE WHATSAPP
                  </a>
                </Button>
              </div>
            ) : (
              <div className="h-full">
                {viewMode === "list" ? (
                  <ScrollArea className="h-full">
                    <div className="space-y-2 p-3 pb-8">
                      {results.map((item) => (
                        <SearchResultRow 
                          key={item.id} 
                          item={item} 
                          isFakeBlocked={state === "blocked"}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <ScrollArea className="h-full">
                     <SearchResultsKanban results={results} isFakeBlocked={state === "blocked"} />
                  </ScrollArea>
                )}
              </div>
            )}
          </div>

          {/* Fixed Footer */}
          <div className="sticky bottom-0 z-10 shrink-0 border-t border-border bg-card/90 backdrop-blur px-3 py-2.5">
            <div className="flex items-center justify-between gap-3 overflow-hidden">
              <div className="flex items-center gap-3 min-w-0">
                <p className="hidden xs:block text-[10px] font-bold text-foreground/40 uppercase tracking-widest truncate">
                  Sources : COLEPS, JDM, CTD
                </p>
                <button className="flex items-center gap-1.5 text-[11px] font-black text-primary hover:underline transition-all whitespace-nowrap">
                  <span>Voir plus d'opportunités</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  asChild
                  className="h-7 rounded border-primary/20 px-3 text-[10px] font-black text-primary hover:bg-primary/5"
                >
                  <a href={generateWhatsAppLink({} as any, "alert", query)} target="_blank" rel="noopener noreferrer">
                    <BellRing className="mr-1.5 h-3 w-3" />
                    Alerte WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
