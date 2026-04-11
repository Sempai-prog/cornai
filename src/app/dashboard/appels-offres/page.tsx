// ══════════════════════════════════════════
// SABI — Moteur de Recherche (Dashboard — SaaS Native)
// ══════════════════════════════════════════

import { Globe, Zap } from "lucide-react"
import { StandardPageHeader } from "@/components/layout/standard-page-header"
import { getAppelsOffresPagines } from "@/app/actions/appels-offres"
import { mapDBAOToUI } from "@/components/search/search-utils"
import { SearchDashboardClient } from "./search-dashboard-client"

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{
    page?: string
    q?: string
    secteur?: string
    region?: string
    type?: string
  }>
}

export default async function AppelsOffresPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  
  const page = parseInt(resolvedParams.page || '1')
  const q = resolvedParams.q
  const secteur = resolvedParams.secteur
  const region = resolvedParams.region
  const type = resolvedParams.type

  const { donnees, pagination } = await getAppelsOffresPagines({
    page,
    recherche: q,
    secteur,
    region,
    type
  })

  const results = donnees.map(mapDBAOToUI)
  
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
              Synchronisé avec <span className="text-foreground/40 font-semibold">COLEPS • ARMP</span> — Secteur BTP & Infrastructures.
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
          label: "ITEMS RÉELS",
          value: pagination.total.toString().padStart(2, '0'),
          subtext: "Base de Données",
          color: "blue",
        }}
      />


      {/* ───────────────────────────────────────────────────────────
          PLAN 2 — MOTEUR DE RECHERCHE (FULL-PAGE ENGINE)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 bg-transparent">
        <SearchDashboardClient 
          initialResults={results} 
          pagination={pagination}
        />
      </div>
    </div>
  )
}
