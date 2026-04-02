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

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)

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
          Rechercher un dossier, un document ARMP...
          
          <div className="ml-auto pointer-events-none hidden sm:flex items-center gap-1.5 px-1.5 py-0.5 rounded-[4px] border border-border/10 bg-muted text-[10px] font-semibold text-muted-foreground/60">
             <span className="text-[11px] opacity-40">⌘</span>K
          </div>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Tapez votre recherche (ex: MINTP, Article 43...)" />
        <CommandList className="max-h-[450px] scroll-smooth">
          <CommandEmpty>Aucun résultat trouvé pour cette requête.</CommandEmpty>
          
          <CommandGroup heading="Appels d'Offres (JDM)">
            <CommandItem className="hover:bg-primary/5 cursor-pointer">
              <Target className="mr-2 h-4 w-4 text-primary/60" />
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold">Travaux Routiers - MINTP (AONO)</span>
                <span className="text-[10px] text-foreground/30 uppercase font-black">Marché Local • Centre</span>
              </div>
            </CommandItem>
            <CommandItem className="hover:bg-primary/5 cursor-pointer">
              <Target className="mr-2 h-4 w-4 text-primary/60" />
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold">Construction du pont sur le Mbam</span>
                <span className="text-[10px] text-foreground/30 uppercase font-black">Infrastructure • 450M FCFA</span>
              </div>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Documents Administratifs">
            <CommandItem className="hover:bg-primary/5 cursor-pointer">
              <FileCheck className="mr-2 h-4 w-4 text-primary/60" />
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold">Attestation de Non Redevance (ANR)</span>
                <span className="text-[10px] text-red-500/60 uppercase font-black italic">Expire bientôt</span>
              </div>
            </CommandItem>
            <CommandItem className="hover:bg-primary/5 cursor-pointer">
              <FileText className="mr-2 h-4 w-4 text-primary/60" />
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold">Registre de Commerce (RCCM)</span>
                <span className="text-[10px] text-foreground/30 uppercase font-black">Coffre-fort • Valide</span>
              </div>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Réglementation (ARMP)">
            <CommandItem className="hover:bg-primary/5 cursor-pointer">
              <Gavel className="mr-2 h-4 w-4 text-primary/60" />
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold">Article 43 - Code des Marchés Publics</span>
                <span className="text-[10px] text-foreground/30 uppercase font-black">Conditions d'éligibilité</span>
              </div>
            </CommandItem>
            <CommandItem className="hover:bg-primary/5 cursor-pointer">
              <ShieldQuestion className="mr-2 h-4 w-4 text-primary/60" />
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold">Délais de procédure de passation</span>
                <span className="text-[10px] text-foreground/30 uppercase font-black">Décret 2024</span>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
