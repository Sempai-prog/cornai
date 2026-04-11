// ══════════════════════════════════════════
// SABI — Volume B : Terrain (Client Component)
// ══════════════════════════════════════════

'use client'

import * as React from "react"
import { useQueryState } from 'nuqs'
import { SOUS_MODULES_TERRAIN, SousModuleTerrainId } from "@/lib/soumissions/terrain"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface TerrainClientProps {
  soumissionId: string
}

export function TerrainClient({ soumissionId }: TerrainClientProps) {
  const [activeTab, setActiveTab] = useQueryState('tab', {
    defaultValue: 'descente',
    clearOnDefault: false
  })

  const activeModule = SOUS_MODULES_TERRAIN.find(m => m.id === activeTab) || SOUS_MODULES_TERRAIN[0]

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      
      {/* ───────────────────────────────────────────────────────────
          SUB-NAVIGATION (SIDEBAR OR TOP TABS)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex bg-card/10 border-b border-border/10 overflow-hidden">
        {SOUS_MODULES_TERRAIN.map((mod) => {
          const isActive = activeTab === mod.id
          const Icon = mod.icon
          
          return (
            <button
              key={mod.id}
              onClick={() => setActiveTab(mod.id)}
              className={cn(
                "group relative flex items-center gap-3 px-6 py-3 transition-all duration-300 min-w-[200px] border-r border-border/10 text-left",
                isActive ? "bg-background shadow-sm" : "hover:bg-muted/30"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-[4px] border transition-all",
                isActive ? "bg-primary/10 border-primary/20 text-primary" : "bg-muted/50 border-border/10 text-muted-foreground/30"
              )}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              
              <div className="min-w-0">
                <p className={cn(
                  "text-[10px] font-semibold uppercase tracking-widest leading-none mb-0.5",
                  isActive ? "text-foreground" : "text-muted-foreground/40"
                )}>
                  {mod.label}
                </p>
                <p className="text-[9px] font-semibold text-muted-foreground/20 truncate uppercase tracking-tighter">
                  {mod.description}
                </p>
              </div>

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
          )
        })}
      </div>

      {/* ───────────────────────────────────────────────────────────
          CONTENT AREA
          ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
           {/* HEADER MODULE ACTIF */}
           <div className="flex items-center gap-4 mb-8">
              <h3 className="text-xl font-semibold text-foreground uppercase tracking-tighter">
                {activeModule.label}
              </h3>
              <div className="flex items-center gap-2 px-2 py-0.5 rounded-[4px] bg-primary/5 border border-primary/10">
                 <span className="text-[9px] font-semibold text-primary/40 uppercase tracking-widest">POIDS</span>
                 <span className="text-[10px] font-semibold text-primary uppercase tabular-nums">{activeModule.poids}%</span>
              </div>
           </div>

           {/* PLACEHOLDER POUR LES MODULES SPÉCIFIQUES */}
           <div className="border border-dashed border-border/20 rounded-[4px] p-32 flex flex-col items-center justify-center text-center bg-card/5">
               <activeModule.icon className="w-12 h-12 text-muted-foreground/10 mb-6 animate-pulse" />
               <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/30 mb-2">
                  Module technique en cours de déploiement
               </p>
               <h4 className="text-sm font-semibold text-muted-foreground/40 uppercase tracking-tight">
                  {activeModule.label}
               </h4>
           </div>
        </div>
      </div>

    </div>
  )
}
