// ══════════════════════════════════════════
// SABI — Queries : Terrain (Volume B)
// ══════════════════════════════════════════

import { db } from '../client'
import { visites_terrain, materielProjet, equipeProjet, piecesSoumission } from '../schema'
import { eq, desc } from 'drizzle-orm'

/**
 * Récupère les données de visite de terrain pour une soumission
 */
export async function getVisiteTerrain(soumissionId: string) {
  return await db.query.visites_terrain.findFirst({
    where: eq(visites_terrain.soumissionId, soumissionId),
    with: {
      photos: true
    }
  })
}

/**
 * Récupère les données complètes du terrain pour une entreprise
 */
export async function getTerrainFullData(entrepriseId: string, soumissionId?: string) {
  // 1. Résolution de la soumission cible
  let soumission;
  if (soumissionId && soumissionId !== 'demo_soumission') {
    soumission = await db.query.soumissions.findFirst({
      where: (s, { eq }) => eq(s.id, soumissionId),
      with: {
        appelOffre: true
      },
    })
  } else {
    // Sinon, récupérer la soumission la plus récente pour cette entreprise
    soumission = await db.query.soumissions.findFirst({
      where: (s, { eq }) => eq(s.entrepriseId, entrepriseId),
      with: {
        appelOffre: true
      },
      orderBy: (s, { desc }) => [desc(s.updatedAt)]
    })
  }

  // 2. Si aucune soumission n'est trouvée, renvoyer des structures vides
  if (!soumission) {
    return { 
      descenteData: null, 
      garageData: [], 
      equipeData: [], 
      compilationData: [], 
      aoNom: "N/A", 
      aoInstitution: "N/A", 
      soumission: null 
    }
  }

  // 3. Récupération parallèle des données de sous-modules
  const [descente, garage, equipe, compilation] = await Promise.all([
    db.query.visites_terrain.findFirst({
      where: eq(visites_terrain.soumissionId, soumission.id)
    }),
    db.query.materielProjet.findMany({
      where: eq(materielProjet.soumissionId, soumission.id)
    }),
    db.query.equipeProjet.findMany({
      where: eq(equipeProjet.soumissionId, soumission.id)
    }),
    db.query.piecesSoumission.findMany({
      where: eq(piecesSoumission.soumissionId, soumission.id),
      orderBy: [desc(piecesSoumission.createdAt)]
    })
  ])

  return {
    descenteData: descente || null,
    garageData: garage || [],
    equipeData: equipe || [],
    compilationData: compilation || [],
    aoNom: soumission.appelOffre.titreComplet || soumission.appelOffre.id,
    aoInstitution: soumission.appelOffre.institution || "Institution",
    soumission
  }
}
