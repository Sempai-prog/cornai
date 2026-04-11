export const dynamic = 'force-dynamic'

import { getTerrainFullData } from '@/database/queries/terrain'
import { TerrainClientPage } from './terrain-client'
import { getEntrepriseContext } from '@/lib/demo-config'
import { MOCK_AUDIOS, MOCK_GARAGE, MOCK_PERSONNEL, MOCK_COLEPS, MOCK_SCORE } from './lib/terrain-mock-data'

export default async function TerrainPage({ searchParams }: { searchParams: Promise<{ soumissionId?: string }> }) {
  const { soumissionId } = await searchParams
  const { entrepriseId } = await getEntrepriseContext();
  const data = await getTerrainFullData(entrepriseId, soumissionId)

  // 🧪 INJECTION DE MOCK SI DATA VIDE (Pour développement & démo)
  const finalGarageData = data.garageData.length > 0 ? data.garageData : MOCK_GARAGE.map(m => ({
    id: m.id,
    nom: m.name,
    typeMateriel: m.type,
    designation: "Modèle Standard V1",
    quantiteRequise: 1,
    quantiteDisponible: 1,
    statut: m.status === 'conforme' ? 'complet' : 'incomplet',
    exigenceMatch: m.matchedRequirement,
    docsValides: m.complianceScore,
    docsRequis: m.complianceTotal
  }));

  const finalEquipeData = data.equipeData.length > 0 ? data.equipeData : MOCK_PERSONNEL.map(p => ({
    id: p.id,
    nom: p.fullName,
    role: "Expert Principal",
    qualification: p.qualification,
    experienceAnnees: p.experienceYears,
    cvSigne: p.documents.cv === 'ready',
    diplomeCertifie: p.documents.diploma === 'ready',
    attestations: "Certificat Polytech",
    statut: p.overallStatus === 'conforme' ? 'complet' : 'attention',
    alerte: p.alerts[0]?.message || null
  }));

  const finalCompilationData = data.compilationData.length > 0 ? data.compilationData : MOCK_COLEPS.documents.map(d => ({
    id: d.id,
    nomFichier: d.fileName,
    typePiece: "Technique",
    tailleMb: d.sizeMb,
    moduleSource: d.sourceModule,
    statut: d.status === 'ready' ? 'complet' : 'attention'
  }));

  // Compute the terrain score from final data
  const garageComplete = finalGarageData.filter(m => m.statut === 'complet').length
  const garageTotal = finalGarageData.length
  const equipeComplete = finalEquipeData.filter(e => e.statut === 'complet').length
  const equipeTotal = finalEquipeData.length

  // Module statuses based on final data
  const moduleStatuses = {
    transcripteur: 'complete' as const,
    garage: garageTotal === 0 ? 'empty' as const : garageComplete === garageTotal ? 'complete' as const : 'warning' as const,
    equipe: equipeTotal === 0 ? 'empty' as const : equipeComplete === equipeTotal ? 'complete' as const : 'warning' as const,
    descente: data.descenteData ? (data.descenteData.statutVisite === 'terminee' ? 'complete' as const : 'warning' as const) : 'empty' as const,
  }

  // Overall score
  const modulesValidated = Object.values(moduleStatuses).filter(s => s === 'complete').length
  const hasCompilation = finalCompilationData.length > 0
  const totalModules = 5
  const percentage = Math.round(((modulesValidated + (hasCompilation ? 0.5 : 0)) / totalModules) * 100)

  const score = {
    percentage: percentage || MOCK_SCORE.percentage,
    modulesValidated,
    modulesTotal: totalModules as 5,
    color: percentage >= 60 ? 'hsl(142 72% 46%)' : percentage >= 30 ? 'hsl(38 92% 50%)' : 'hsl(0 84% 60%)',
  }

  return (
    <TerrainClientPage
      score={score}
      moduleStatuses={moduleStatuses}
      aoNom={data.aoNom || "PROJET D'AMÉNAGEMENT ROUTIER (NORD)"}
      aoInstitution={data.aoInstitution || "MINTP Cameroon"}
      garageData={finalGarageData as any}
      equipeData={finalEquipeData as any}
      descenteData={data.descenteData as any}
      compilationData={finalCompilationData as any}
      audios={MOCK_AUDIOS}
      soumissionId={soumissionId || 'demo_soumission'}
    />
  )
}

