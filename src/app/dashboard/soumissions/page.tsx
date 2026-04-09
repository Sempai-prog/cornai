// ══════════════════════════════════════════
// SABI — Poste de Pilotage (Mes Soumissions)
// ══════════════════════════════════════════

import * as React from "react"
import { getSoumissionsByEntreprise } from "@/database/queries/soumissions"
import { formatDateline, formatXAF } from "@/lib/utils"
import { StandardPageHeader } from "@/components/layout/standard-page-header"
import { SoumissionsClient } from "./soumissions-client"
import { getEntrepriseContext } from "@/lib/demo-config"

export default async function SoumissionsPage() {
  const { entrepriseId } = await getEntrepriseContext();
  const dbSoumissions = await getSoumissionsByEntreprise(entrepriseId)

  // Mapping DB -> UI
  const submissions = dbSoumissions.map((s) => ({
    id: s.id.slice(0, 8).toUpperCase(),
    ac: s.appelOffre?.institution || "N/A",
    type: s.appelOffre?.typeMarche || "AONO",
    title: s.appelOffre?.titreComplet || "Sans titre",
    deadline: s.appelOffre?.dateLimiteSoumission ? new Date(s.appelOffre.dateLimiteSoumission) : new Date(),
    envelopeA: s.scoreConformite || 0,
    envelopeB: 10,
    envelopeC: 0,
    status: mapDBStatusToUI(s.statut),
    budget: s.montantOffre || s.appelOffre?.budgetEstime || 0
  }))

  const activeCount = submissions.filter(s => ['preparation', 'evaluation'].includes(s.status)).length
  const depositCount = submissions.filter(s => s.status === 'soumis').length

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

function mapDBStatusToUI(dbStatus: string | null): SubmissionStatus {
  switch (dbStatus) {
    case 'en_preparation':
    case 'brouillon': 
      return 'preparation';
    case 'depose': 
      return 'soumis';
    case 'evaluation':
      return 'evaluation';
    case 'adjuge':
      return 'attribue';
    case 'perdu':
      return 'rejete';
    default: 
      return 'preparation';
  }
}

type SubmissionStatus = 'preparation' | 'soumis' | 'evaluation' | 'attribue' | 'rejete';
