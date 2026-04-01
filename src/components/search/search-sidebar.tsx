"use client"

import * as React from "react"
import { 
  Filter, 
  Search, 
  MapPin,
  CheckCircle2,
  ChevronDown,
  Layers,
  Activity,
  Zap
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isCollapsed: boolean
  filters: any
  onFilterChange: (key: string, value: any) => void
}

export function SearchSidebar({ isCollapsed, filters, onFilterChange }: SidebarProps) {
  const toggleFilter = (key: string, value: string) => {
    const currentValues = filters[key] || []
    if (currentValues.includes(value)) {
      onFilterChange(key, currentValues.filter((v: string) => v !== value))
    } else {
      onFilterChange(key, [...currentValues, value])
    }
  }

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Search Navigation Context (Always Visible) */}
      <div className={cn(
        "flex h-14 items-center gap-3 px-6 border-b border-border/50",
        isCollapsed && "justify-center px-0"
      )}>
        <div className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-primary group-hover:scale-105 transition-transform shadow-sm">
           <Zap className="h-5 w-5 text-white fill-white" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-[12px] font-medium tracking-tight text-foreground">Veille Stratégique</span>
            <span className="text-[8px] font-medium tracking-[0.1em] text-primary -mt-0.5 uppercase">Filtres Actifs</span>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="px-3 py-4">
          {!isCollapsed ? (
            <div className="space-y-6">
              {/* Secteurs */}
              <div className="space-y-3 px-3">
                 <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-medium tracking-widest text-foreground/30 uppercase">Secteurs</h4>
                    <Layers className="h-3 w-3 text-foreground/20" />
                 </div>
                  <div className="space-y-1">
                    {[
                      { val: "Travaux", label: "BTP / Génie Civil" },
                      { val: "Fournitures", label: "Fournitures" },
                      { val: "Services", label: "Intellectuelles" }
                    ].map((s) => (
                       <FilterListItem 
                          key={s.val} 
                          label={s.label}
                          isActive={filters.secteurs.includes(s.val)}
                          onClick={() => toggleFilter("secteurs", s.val)}
                       />
                    ))}
                  </div>
              </div>

              <Separator className="mx-3 opacity-30" />

              {/* Procédures */}
              <div className="space-y-3 px-3">
                 <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-medium tracking-widest text-foreground/30 uppercase">Procédures</h4>
                    <Activity className="h-3 w-3 text-foreground/20" />
                 </div>
                 <div className="space-y-1">
                    {["AONO", "AONR", "DC", "AAMI"].map((p) => (
                       <FilterListItem 
                          key={p} 
                          label={p}
                          isActive={filters.procedures.includes(p)}
                          onClick={() => toggleFilter("procedures", p)}
                       />
                    ))}
                 </div>
              </div>

              <Separator className="mx-3 opacity-30" />

              {/* Régions */}
              <div className="space-y-3 px-3">
                 <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-medium tracking-widest text-foreground/30 uppercase">Régions</h4>
                    <MapPin className="h-3 w-3 text-foreground/20" />
                 </div>
                 <div className="grid grid-cols-2 gap-1.5">
                    {["Centre", "Littoral", "Ouest", "Nord", "Est", "Sud"].map((r) => (
                       <button
                          key={r}
                          onClick={() => toggleFilter("regions", r)}
                          className={cn(
                             "flex items-center justify-center rounded-[4px] border py-1.5 text-[9px] font-medium transition-all",
                             filters.regions.includes(r)
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border text-foreground/30 hover:border-foreground/20"
                          )}
                       >
                          {r}
                       </button>
                    ))}
                 </div>
              </div>

              {/* Reset Logic */}
              <div className="px-3">
                <Button 
                   variant="ghost" 
                   size="sm" 
                   onClick={() => {
                      onFilterChange("secteurs", [])
                      onFilterChange("procedures", [])
                      onFilterChange("regions", [])
                      onFilterChange("matchLevels", [])
                   }}
                   className="h-8 w-full justify-center text-[10px] font-normal text-foreground/30 hover:text-foreground/60 p-0 hover:bg-transparent"
                >
                   Réinitialiser les filtres
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6 py-4">
               <div className="relative">
                  <Layers className="h-4 w-4 text-foreground/20" />
                  {filters.secteurs.length > 0 && <div className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-primary" />}
               </div>
               <div className="relative">
                  <Activity className="h-4 w-4 text-foreground/20" />
                  {filters.procedures.length > 0 && <div className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-primary" />}
               </div>
               <div className="relative">
                  <MapPin className="h-4 w-4 text-foreground/20" />
                  {filters.regions.length > 0 && <div className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-primary" />}
               </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

function FilterListItem({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between group rounded-[4px] px-2.5 py-1.5 transition-all text-left",
        isActive ? "bg-secondary text-foreground" : "text-foreground/40 hover:bg-secondary/50 hover:text-foreground/60"
      )}
    >
      <span className={cn("text-[10px] tracking-tight", isActive ? "font-medium" : "font-normal")}>{label}</span>
      <div className={cn(
        "h-3.5 w-3.5 rounded-[2px] border transition-all flex items-center justify-center shrink-0",
        isActive ? "border-primary bg-primary text-white" : "border-border/60 bg-background group-hover:border-foreground/30"
      )}>
        {isActive && <CheckCircle2 className="h-2.5 w-2.5" />}
      </div>
    </button>
  )
}
