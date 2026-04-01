// ══════════════════════════════════════════
// CORNAi — Moteur de Recherche (Dashboard — SaaS Native)
// ══════════════════════════════════════════

import { Globe, Zap, Target, Compass, FileText, ShieldCheck } from "lucide-react"
import { getDerniersAO } from "@/database/queries/ao"
import { mapDBAOToUI } from "@/components/search/search-utils"
import { SearchDashboardClient } from "./search-dashboard-client"
import { cn } from "@/lib/utils"

export const dynamic = 'force-dynamic'

export default async function AppelsOffresPage() {
  const dbAos = await getDerniersAO(20)
  const results = dbAos.map(mapDBAOToUI)
  
  return (
    <div className="space-y-8 flex flex-col h-full animate-in fade-in duration-500 bg-transparent">
      
      {/* ───────────────────────────────────────────────────────────
          PLAN 1 — HEADER (Elite Precision)
          ─────────────────────────────────────────────────────────── */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/10 mt-0 lg:mt-[-4px]">
        <div className="space-y-1.5">
           <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground leading-none">
              Marchés publics en temps réel
           </h1>
           <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/20">
              <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 opacity-40 text-slate-500" /> SYNCHRONISÉ COLEPS / ARMP</span>
              <span className="opacity-10">/</span>
              <span className="">BTP — CAMEROUN — AFRIQUE CENTRALE</span>
           </div>
        </div>

        <div className="flex items-center gap-2">
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-primary/5 border border-primary/10 transition-all hover:bg-primary/10">
              <Zap className="h-3 w-3 text-primary opacity-60" />
              <span className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.2em]">Matching Actif</span>
           </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          PLAN 2 — METRIC RIBBON (FUSION ABSOLUE - divide-x)
          ─────────────────────────────────────────────────────────── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 border border-border/40 divide-y md:divide-y-0 md:divide-x divide-border/40 rounded-[4px] bg-card/40 backdrop-blur-md shadow-sm overflow-hidden shrink-0">
        {[
          { label: "Marchés JDM scannés", value: "1,284", icon: Target, trend: "LIVE", type: "pos" },
          { label: "Flux (24h)", value: "24", icon: Compass, trend: "+12%", type: "pos" },
          { label: "Matches IA", value: "156", icon: FileText, trend: "TOP", type: "neut" },
          { label: "Budget Total Est.", value: "2.4B", icon: ShieldCheck, trend: "AVG", type: "neut" },
        ].map((kpi, i) => (
          <div key={i} className="flex flex-col justify-center p-5 hover:bg-muted/10 transition-all group">
            <div className="flex items-center gap-2.5 mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
              <kpi.icon className={cn("h-4 w-4", kpi.type === 'pos' ? "text-primary" : "text-foreground/20")} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground truncate">
                {kpi.label}
              </span>
            </div>
            <div className="flex items-baseline gap-3 leading-none">
              <span className="text-2xl font-semibold tracking-tighter text-foreground">{kpi.value}</span>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                kpi.type === 'pos' ? "text-primary/60" : "text-foreground/20"
              )}>{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ───────────────────────────────────────────────────────────
          PLAN 3 — MOTEUR DE RECHERCHE (FULL-PAGE ENGINE)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 bg-transparent overflow-visible">
        <SearchDashboardClient initialResults={results} />
      </div>
    </div>
  )
}

