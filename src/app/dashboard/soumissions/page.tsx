// ══════════════════════════════════════════
// SABI — Poste de Pilotage (Mes Soumissions)
// ══════════════════════════════════════════

import * as React from "react"
import { getSoumissionsByEntreprise } from "@/database/queries/soumissions"
import { formatDateline, formatXAF } from "@/lib/utils"
import { StandardPageHeader } from "@/components/layout/standard-page-header"
import { SoumissionsClient } from "./soumissions-client"

const DEMO_ENTREPRISE_ID = "cf83af70-d49b-4a72-8222-201f08a05a8a"

export default async function SoumissionsPage() {
  const dbSoumissions = await getSoumissionsByEntreprise(DEMO_ENTREPRISE_ID)

  // Mapping DB -> UI
  const submissions = dbSoumissions.map((s) => ({
    id: s.id.slice(0, 8).toUpperCase(),
    ac: s.appelOffre?.institution || "N/A",
    type: s.appelOffre?.typeMarche || "AONO",
    title: s.appelOffre?.titreComplet || "Sans titre",
    deadline: formatDateline(s.appelOffre?.dateLimiteSoumission),
    envelopeA: s.scoreConformite || 0,
    envelopeB: 10, // Mocked technical progress
    envelopeC: 0,  // Mocked financial progress
    status: mapDBStatusToUI(s.statut),
    isUrgent: s.appelOffre?.dateLimiteSoumission 
      ? new Date(s.appelOffre.dateLimiteSoumission).getTime() - new Date().getTime() < 86400000 * 3 
      : false,
    budget: formatXAF(s.montantOffre || s.appelOffre?.budgetEstime || 0)
  }))

  const activeCount = submissions.filter(s => ['MONTAGE', 'BLINDAGE', 'CHIFFRAGE', 'SIGNATURE'].includes(s.status)).length
  const depositCount = submissions.filter(s => s.status === 'DEPOT').length

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 antialiased bg-transparent p-0 lg:p-1 overflow-hidden h-full">
      <StandardPageHeader
        title="Historique & Soumissions"
        metadata="Poste de Pilotage — Gestion des Offres"
        description={
          <p>
            Suivi en temps réel des dossiers d'appels d'offres en cours de montage. 
            <span className="block mt-1 italic opacity-60">
              Synchronisation automatique avec le Radar des Marchés.
            </span>
          </p>
        }
        cardA={{
          label: "SOUMISSIONS ACTIVES",
          value: activeCount.toString().padStart(2, '0'),
          subtext: "Dossiers en Montage",
          color: "blue",
        }}
        cardB={{
          label: "DÉPOSÉES",
          value: depositCount.toString().padStart(2, '0'),
          subtext: "Soumissions Terminées",
          color: "emerald",
        }}
      />

      <SoumissionsClient initialSubmissions={submissions} />
    </div>
  )
}

function mapDBStatusToUI(dbStatus: string | null): any {
  switch (dbStatus) {
    case 'en_preparation':
    case 'brouillon': 
      return 'MONTAGE';
    case 'pret': 
      return 'SIGNATURE';
    case 'depose': 
      return 'DEPOT';
    case 'adjuge':
    case 'perdu':
      return 'DEPOT'; // Keep in last column for history
    default: 
      return 'MONTAGE';
  }
}
