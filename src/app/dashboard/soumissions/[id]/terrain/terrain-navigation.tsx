// ══════════════════════════════════════════
// SABI — Navigation Volume B (Sprint E)
// ══════════════════════════════════════════

'use client'

import * as React from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SOUS_MODULES_TERRAIN } from "@/lib/soumissions/terrain"
import { cn } from "@/lib/utils"

interface TerrainNavigationProps {
  soumissionId: string
}

export function TerrainNavigation({ soumissionId }: TerrainNavigationProps) {
  const pathname = usePathname()

  return (
    <div className="flex bg-card/10 border-b border-border/10 overflow-hidden shrink-0">
      {SOUS_MODULES_TERRAIN.map((mod) => {
        const href = `/dashboard/soumissions/${soumissionId}/terrain/${mod.id}`
        const isActive = pathname.includes(mod.id) || (pathname.endsWith('terrain') && mod.id === 'descente')
        const Icon = mod.icon
        
        return (
          <Link
            key={mod.id}
            href={href}
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
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary" />
            )}
          </Link>
        )
      })}
    </div>
  )
}
