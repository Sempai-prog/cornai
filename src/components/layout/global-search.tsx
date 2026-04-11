// ══════════════════════════════════════════
// SABI — Global Search Omnibox (OMNIBOX)
// ══════════════════════════════════════════

"use client"

import * as React from "react"
import { 
  Search, 
  Command, 
  FileText, 
  ShieldQuestion, 
  Gavel,
  Target,
  FileCheck
} from "lucide-react"
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList,
  CommandShortcut 
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

import { searchGlobal } from "@/app/actions/search"
import { useDebounce } from "@/hooks/use-debounce"
import { useRouter } from "next/navigation"

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults(null)
      return
    }

    const fetchResults = async () => {
      setLoading(true)
      try {
        const data = await searchGlobal(debouncedQuery)
        setResults(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [debouncedQuery])

  return (
    <>
      <div 
        onClick={() => setOpen(true)}
        className="relative w-64 md:w-[480px] flex items-center group cursor-text outline-none"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors z-10" />
        
        <div className={cn(
          "h-9 w-full flex items-center pl-10 pr-4 rounded-[4px] border border-border/10 bg-card transition-all duration-300",
          "group-hover:border-border/20 group-hover:bg-muted/50 group-focus:border-primary/40 group-focus:ring-1 group-focus:ring-primary/20",
          "text-[12px] text-muted-foreground font-medium"
        )}>
          {query || "Rechercher un dossier, un document ARMP..."}
          
          <div className="ml-auto pointer-events-none hidden sm:flex items-center gap-1.5 px-1.5 py-0.5 rounded-[4px] border border-border/10 bg-muted text-[10px] font-semibold text-muted-foreground/60">
             <span className="text-[11px] opacity-40">⌘</span>K
          </div>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Tapez votre recherche (ex: MINTP, Article 43...)" 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[450px] scroll-smooth">
          {loading && <div className="p-4 text-center text-[11px] text-muted-foreground animate-pulse font-semibold tracking-widest uppercase">Analyse en cours...</div>}
          {!loading && !results && query.length < 2 && (
            <div className="p-10 text-center space-y-2">
              <Search className="size-8 mx-auto text-muted-foreground/20" />
              <p className="text-[12px] text-muted-foreground/40 font-medium">Commencez à taper pour rechercher...</p>
            </div>
          )}
          
          <CommandEmpty>Aucun résultat trouvé pour "{query}".</CommandEmpty>
          
          {results?.aos?.length > 0 && (
            <CommandGroup heading="Appels d'Offres (Radar)">
              {results.aos.map((ao: any) => (
                <CommandItem 
                  key={ao.id} 
                  className="hover:bg-primary/5 cursor-pointer"
                  onSelect={() => {
                    setOpen(false)
                    router.push(`/dashboard/radar?id=${ao.id}`)
                  }}
                >
                  <Target className="mr-2 h-4 w-4 text-primary/60" />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold line-clamp-1">{ao.titreComplet}</span>
                    <span className="text-[10px] text-foreground/30 uppercase font-semibold">
                      {ao.institution} • {ao.numeroMarche || "AONO"}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {results?.docs?.length > 0 && (
            <CommandGroup heading="Vos Documents (SI)">
              {results.docs.map((doc: any) => (
                <CommandItem 
                  key={doc.id} 
                  className="hover:bg-primary/5 cursor-pointer"
                  onSelect={() => {
                    setOpen(false)
                    router.push(`/dashboard/documents`)
                  }}
                >
                  <FileCheck className="mr-2 h-4 w-4 text-emerald-500/60" />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold">{doc.pieceId}</span>
                    <span className={cn(
                      "text-[10px] uppercase font-semibold italic",
                      doc.statut === 'valide' ? "text-emerald-500/60" : "text-amber-500/60"
                    )}>
                      {doc.statut}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandGroup heading="Raccourcis">
            <CommandItem 
              onSelect={() => {
                setOpen(false)
                router.push("/dashboard/annexe-16")
              }}
              className="hover:bg-primary/5 cursor-pointer"
            >
              <Gavel className="mr-2 h-4 w-4 text-primary/60" />
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold">Annexe 16 - Référentiel légal</span>
                <span className="text-[10px] text-foreground/30 uppercase font-semibold">Code des Marchés 2018</span>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
