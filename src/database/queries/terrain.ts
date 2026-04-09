// ══════════════════════════════════════════
// SABI — Queries : Le Terrain (5 Modules)
// ══════════════════════════════════════════

import { db } from '../client'
import {
  soumissions,
  appelsOffres,
  entreprises,
  materielProjet,
  equipeProjet,
  piecesSoumission,
  visites_terrain,
  photos_terrain,
} from '../schema'
import { eq, and, desc } from 'drizzle-orm'

// ═══════════════════════════════════════════
// QUERY — Récupérer la première soumission active
// ═══════════════════════════════════════════
export async function getActiveSoumission(entrepriseId: string) {
  try {
    const results = await db
      .select({
        soumission: soumissions,
        appelOffre: appelsOffres,
        entreprise: entreprises,
      })
      .from(soumissions)
      .leftJoin(appelsOffres, eq(soumissions.appelOffreId, appelsOffres.id))
      .leftJoin(entreprises, eq(soumissions.entrepriseId, entreprises.id))
      .where(eq(soumissions.entrepriseId, entrepriseId))
      .orderBy(desc(soumissions.createdAt));
    
    if (results.length > 0) {
      // Reformat to match original structure
      const formattedResults = results.map(r => ({
        ...r.soumission,
        appelOffre: r.appelOffre,
        entreprise: r.entreprise,
      }));

      // Prioritize the demo AO that has all terrain/garage data populated
      const seededForTerrain = formattedResults.find(s => s.appelOffre?.titreComplet.includes("Yaoundé-Bafoussam"))
      if (seededForTerrain) return seededForTerrain
      
      return formattedResults[0]
    }
    return null
  } catch (error) {
    console.error('Error in getActiveSoumission:', error)
    return null
  }
}

// ═══════════════════════════════════════════
// QUERY — Contexte complet d'une soumission
// ═══════════════════════════════════════════
export async function getSoumissionContext(soumissionId: string) {
  try {
    const result = await db.query.soumissions.findFirst({
      where: eq(soumissions.id, soumissionId),
      with: {
        appelOffre: true,
        entreprise: true,
      },
    })
    return result || null
  } catch (error) {
    console.error('Error in getSoumissionContext:', error)
    return null
  }
}

// ═══════════════════════════════════════════
// MODULE 2 — LE GARAGE (Matériel)
// ═══════════════════════════════════════════
export async function getGarageData(soumissionId: string) {
  try {
    return await db
      .select()
      .from(materielProjet)
      .where(eq(materielProjet.soumissionId, soumissionId))
  } catch (error) {
    console.error('Error in getGarageData:', error)
    return []
  }
}

// ═══════════════════════════════════════════
// MODULE 3 — PERSONNEL (Équipe)
// ═══════════════════════════════════════════
export async function getEquipeData(soumissionId: string) {
  try {
    return await db
      .select()
      .from(equipeProjet)
      .where(eq(equipeProjet.soumissionId, soumissionId))
  } catch (error) {
    console.error('Error in getEquipeData:', error)
    return []
  }
}

// ═══════════════════════════════════════════
// MODULE 5 — COMPILATION (Pièces soumission)
// ═══════════════════════════════════════════
export async function getCompilationData(soumissionId: string) {
  try {
    return await db
      .select()
      .from(piecesSoumission)
      .where(eq(piecesSoumission.soumissionId, soumissionId))
  } catch (error) {
    console.error('Error in getCompilationData:', error)
    return []
  }
}

// ═══════════════════════════════════════════
// MODULE 1 — DESCENTE (Visite Terrain)
// ═══════════════════════════════════════════
export async function getDescenteData(soumissionId: string) {
  try {
    const visite = await db.query.visites_terrain.findFirst({
      where: eq(visites_terrain.soumissionId, soumissionId),
      with: {
        photos: true,
      },
    })
    return visite || null
  } catch (error) {
    console.error('Error in getDescenteData:', error)
    return null
  }
}

// ═══════════════════════════════════════════
// AGGREGATION — Données complètes du Terrain
// ═══════════════════════════════════════════
export async function getTerrainFullData(entrepriseId: string, soumissionId?: string) {
  // 1. Trouver la soumission (soit l'ID passé, soit la dernière active)
  let soumission = null;

  if (soumissionId) {
    soumission = await getSoumissionContext(soumissionId);
  } else {
    soumission = await getActiveSoumission(entrepriseId);
  }

  if (!soumission) {
    return {
      soumission: null,
      aoNom: null,
      aoInstitution: null,
      garageData: [],
      equipeData: [],
      descenteData: null,
      compilationData: [],
    };
  }

  // 2. Charger les données des 4 modules câblés en parallèle
  const [garageData, equipeData, descenteData, compilationData] = await Promise.all([
    getGarageData(soumission.id),
    getEquipeData(soumission.id),
    getDescenteData(soumission.id),
    getCompilationData(soumission.id),
  ]);

  return {
    soumission,
    aoNom: soumission.appelOffre?.titreComplet || null,
    aoInstitution: soumission.appelOffre?.institution || null,
    garageData,
    equipeData,
    descenteData,
    compilationData,
  };
}
