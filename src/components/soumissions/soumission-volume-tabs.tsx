// ══════════════════════════════════════════
// SABI — Onglets des 3 Volumes (Sprint C.3)
// ══════════════════════════════════════════

'use client'

import * as React from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface VolumeTab {
  id: string
  label: string
  href: string
  avancement: number
  description: string
}

interface SoumissionVolumeTabsProps {
  soumissionId: string
  avancements: {
    admin: number
    tech: number
    financier: number
  }
}

export function SoumissionVolumeTabs({
  soumissionId,
  avancements
}: SoumissionVolumeTabsProps) {
  const pathname = usePathname()

  const TABS: VolumeTab[] = [
    {
      id: 'blindage',
      label: 'Vol. A — Administratif',
      href: `/dashboard/soumissions/${soumissionId}/blindage`,
      avancement: avancements.admin,
      description: 'Pièces administratives'
    },
    {
      id: 'terrain',
      label: 'Vol. B — Technique',
      href: `/dashboard/soumissions/${soumissionId}/terrain`,
      avancement: avancements.tech,
      description: 'Mémoire + Matériel + Équipe'
    },
    {
      id: 'nkap',
      label: 'Vol. C — Financier',
      href: `/dashboard/soumissions/${soumissionId}/nkap`,
      avancement: avancements.financier,
      description: 'BPU / DQE / Offre de prix'
    },
  ]

  return (
    <div className="border-b border-border/10 bg-card shrink-0">
      <div className="flex px-6 overflow-x-auto no-scrollbar">
        {TABS.map(tab => {
          // Check if current path includes tab id or if it's the root detail and this is 'blindage' (default)
          const isActive = pathname.includes(tab.id) || (pathname.endsWith(soumissionId) && tab.id === 'blindage')

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "flex items-center gap-4 px-6 py-4 border-b-2 transition-all duration-300 min-w-[240px] group",
                isActive
                  ? "border-primary text-foreground bg-primary/5"
                  : "border-transparent text-muted-foreground/40 hover:text-foreground hover:bg-muted/30"
              )}
            >
              {/* Jauge circulaire minimale */}
              <div className="relative w-6 h-6 shrink-0">
                <svg viewBox="0 0 20 20" className="w-6 h-6 -rotate-90">
                  <circle
                    cx="10" cy="10" r="8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-muted/20"
                  />
                  <circle
                    cx="10" cy="10" r="8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeDasharray={`${(tab.avancement / 100) * 50.27} 50.27`}
                    className={cn(
                      "transition-all duration-700 ease-in-out",
                      tab.avancement === 100 ? 'text-emerald-500'
                      : tab.avancement > 0 ? 'text-primary'
                      : 'text-muted-foreground/20'
                    )}
                  />
                </svg>
                {isActive && (
                   <div className="absolute inset-0 bg-primary/10 rounded-full blur-[4px] -z-10 group-hover:bg-primary/20 transition-colors" />
                )}
              </div>

              <div className="min-w-0">
                <p className={cn(
                  "text-[10px] font-semibold uppercase tracking-widest leading-none",
                  isActive ? "text-primary" : "text-muted-foreground/60"
                )}>
                  {tab.label}
                </p>
                <p className="text-[9px] font-semibold text-muted-foreground/30 mt-1 uppercase tracking-tighter truncate">
                  {tab.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
