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
} from '../schema'
import { eq, and, desc } from 'drizzle-orm'

// ═══════════════════════════════════════════
// QUERY — Récupérer la première soumission active
// ═══════════════════════════════════════════
export async function getActiveSoumission(entrepriseId: string) {
  try {
    const result = await db.query.soumissions.findFirst({
      where: eq(soumissions.entrepriseId, entrepriseId),
      orderBy: [desc(soumissions.createdAt)],
      with: {
        appelOffre: true,
        entreprise: true,
      },
    })
    return result || null
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
      compilationData: [],
    };
  }

  // 2. Charger les données des 3 modules câblés en parallèle
  const [garageData, equipeData, compilationData] = await Promise.all([
    getGarageData(soumission.id),
    getEquipeData(soumission.id),
    getCompilationData(soumission.id),
  ]);

  return {
    soumission,
    aoNom: soumission.appelOffre?.titreComplet || null,
    aoInstitution: soumission.appelOffre?.institution || null,
    garageData,
    equipeData,
    compilationData,
  };
}
