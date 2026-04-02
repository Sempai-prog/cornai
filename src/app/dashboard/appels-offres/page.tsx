// ══════════════════════════════════════════
// SABI — Moteur de Recherche (Dashboard — SaaS Native)
// ══════════════════════════════════════════

import { Globe, Zap } from "lucide-react"
import { StandardPageHeader } from "@/components/layout/standard-page-header"
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
          PLAN 1 — HEADER (Elite Precision)
          ─────────────────────────────────────────────────────────── */}
      <StandardPageHeader
        title="Radar Marchés Publics"
        metadata="Poste de Pilotage — Veille Stratégique"
        description={
          <p>
            Surveillance et détection en temps réel des avis d'appel d'offres. 
            <span className="block mt-1">
              Synchronisé avec <span className="text-foreground/40 font-black">COLEPS • ARMP</span> — Secteur BTP & Infrastructures.
            </span>
          </p>
        }
        cardA={{
          label: "SYNC STATUS",
          value: "LIVE",
          subtext: "Dernière MAJ: 2min",
          color: "primary",
        }}
        cardB={{
          label: "FILTRES ACTIFS",
          value: "08",
          subtext: "Matching Intelligent",
          color: "amber",
        }}
      />


      {/* ───────────────────────────────────────────────────────────
          PLAN 2 — MOTEUR DE RECHERCHE (FULL-PAGE ENGINE)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 bg-transparent">
        <SearchDashboardClient initialResults={results} />
      </div>
    </div>
  )
}
