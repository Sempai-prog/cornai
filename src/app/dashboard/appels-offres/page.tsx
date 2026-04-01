// ══════════════════════════════════════════
// CORNAi — Moteur de Recherche (Dashboard — SaaS Native)
// ══════════════════════════════════════════

import { Globe, Zap } from "lucide-react"
import { getDerniersAO } from "@/database/queries/ao"
import { mapDBAOToUI } from "@/components/search/search-utils"
import { SearchDashboardClient } from "./search-dashboard-client"

export const dynamic = 'force-dynamic'

export default async function AppelsOffresPage() {
  const dbAos = await getDerniersAO(20)
  const results = dbAos.map(mapDBAOToUI)
  
  return (
    <div className="space-y-6 flex flex-col h-full animate-in fade-in duration-500 bg-transparent">
      
      {/* ───────────────────────────────────────────────────────────
          PLAN 1 — HEADER (LÉGÈRETÉ & TIGHT UX)
          ─────────────────────────────────────────────────────────── */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6">
        <div className="space-y-2.5">
           <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground leading-none">
              Marchés publics en temps réel
           </h1>
           <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/20">
              <span className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 opacity-40" /> SYNCHRONISÉ COLEPS / ARMP</span>
              <span className="opacity-10">/</span>
              <span className="">BTP — CAMEROUN — AFRIQUE CENTRALE</span>
           </div>
        </div>

        <div className="flex items-center gap-2 hidden md:flex">
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-primary/5 border border-primary/10 transition-all hover:bg-primary/10">
              <Zap className="h-3 w-3 text-primary opacity-60" />
              <span className="text-[9px] font-bold text-primary/60 uppercase tracking-widest">Matching Actif</span>
           </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          PLAN 2 — MOTEUR DE RECHERCHE (FULL-PAGE ENGINE)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 bg-transparent">
        <SearchDashboardClient initialResults={results} />
      </div>
    </div>
  )
}
