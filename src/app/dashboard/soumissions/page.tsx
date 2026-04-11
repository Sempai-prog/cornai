export const dynamic = 'force-dynamic'

// ══════════════════════════════════════════
// SABI — Poste de Pilotage (Sprint B.3 — Final Design)
// ══════════════════════════════════════════

import { db } from '@/database/client'
import { soumissions } from '@/database/schema'
import { eq, asc } from 'drizzle-orm'
import { getEntrepriseContext } from '@/lib/demo-config'
import { SoumissionsClient } from './soumissions-client'
import { StandardPageHeader } from '@/components/layout/standard-page-header'
import { SubmissionInspector } from '@/components/dashboard/submission-inspector'

export default async function SoumissionsPage() {
  const { entrepriseId } = await getEntrepriseContext()

  // Récupération des soumissions avec l'Appel d'Offre lié
  const toutesLesSoumissions = await db.query.soumissions.findMany({
    where: eq(soumissions.entrepriseId, entrepriseId),
    with: {
      appelOffre: true
    },
    orderBy: [asc(soumissions.createdAt)]
  })

  // Transformation des données pour le client (hydratation)
  const initialData = toutesLesSoumissions.map(s => ({
    id: s.id,
    appelOffre: {
      reference: s.appelOffre?.id.slice(0, 8).toUpperCase() || "AO-XXXX",
      intitule: s.appelOffre?.titreComplet || "Sans titre",
      maitreDOuvrage: s.appelOffre?.institution || "Maitre d'Ouvrage Inconnu",
      dateDepot: s.appelOffre?.dateLimiteSoumission ? new Date(s.appelOffre.dateLimiteSoumission) : new Date(),
      montantEstime: s.montantOffre || s.appelOffre?.budgetEstime || null,
    },
    // Utilisation de scoreConformite au lieu des champs avancement non-existants
    scoreConformite: s.scoreConformite || 0,
    statut: (s.statut || 'en_preparation') as any,
    isUrgent: s.appelOffre?.dateLimiteSoumission 
      ? (new Date(s.appelOffre.dateLimiteSoumission).getTime() - Date.now()) < (7 * 86400000)
      : false
  }))

  const dossiersActifs = initialData.filter(s => ['analyse', 'montage', 'pret', 'en_preparation'].includes(s.statut)).length
  const dossiersSoumis = initialData.filter(s => s.statut === 'soumis').length
  const urgentTask = initialData.find(s => s.isUrgent)
  const complianceMoyenne = Math.round(initialData.reduce((acc, s) => acc + s.scoreConformite, 0) / (initialData.length || 1))

  return (
    <div className="flex flex-col h-full bg-transparent p-0 lg:p-0 overflow-hidden">
      <StandardPageHeader
        title="Mes Soumissions"
        metadata="POSTE DE PILOTAGE — GESTION DES OFFRES"
        description={
          <p>
            Suivi en temps réel des dossiers d'appels d'offres en cours d'exécution. 
            Le pipeline reflète le cycle de vie officiel (Analyse ➔ Montage ➔ Dépôt).
          </p>
        }
        cardA={{
          label: "DOSSIERS ACTIFS",
          value: dossiersActifs.toString().padStart(2, '0'),
          subtext: "En cours de montage",
          color: "blue",
        }}
        cardB={{
          label: "DÉPOSÉES",
          value: dossiersSoumis.toString().padStart(2, '0'),
          subtext: "Soumissions Terminées",
          color: "emerald",
        }}
      />

      <div className="px-6 shrink-0 mt-2">
        <SubmissionInspector 
           urgentTask={urgentTask ? {
             deadline: urgentTask.appelOffre.dateDepot,
             title: urgentTask.appelOffre.intitule
           } : undefined}
           complianceScore={complianceMoyenne}
           financialSurface="3.8 Milliards"
        />
      </div>

      <SoumissionsClient initialSubmissions={initialData} />
    </div>
  )
}
