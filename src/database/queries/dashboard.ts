import { db } from "../client";
import { entreprises, soumissions, documentsEntreprise } from "../schema";
import { eq, and, count, sql } from "drizzle-orm";

/**
 * Calcule le score de conformité d'une entreprise (0-100)
 * Basé sur le nombre de documents valides par rapport au total
 */
export async function getConformiteScore(entrepriseId: string) {
  try {
    const docs = await db
      .select({
        statut: documentsEntreprise.statut,
      })
      .from(documentsEntreprise)
      .where(eq(documentsEntreprise.entrepriseId, entrepriseId));

    if (docs.length === 0) return { score: 0, valides: 0, total: 0 };

    const valides = docs.filter(d => d.statut === 'valide').length;
    const total = docs.length;
    const score = Math.round((valides / total) * 100);

    return { score, valides, total };
  } catch (error) {
    console.error("Error in getConformiteScore:", error);
    return { score: 0, valides: 0, total: 0 };
  }
}

/**
 * Compte le nombre de soumissions en cours
 */
export async function getSoumissionsEnCoursCount(entrepriseId: string) {
  try {
    const result = await db
      .select({ value: count() })
      .from(soumissions)
      .where(
        and(
          eq(soumissions.entrepriseId, entrepriseId),
          eq(soumissions.statut, 'envoyee')
        )
      );
    
    return result[0]?.value || 0;
  } catch (error) {
    console.error("Error in getSoumissionsEnCoursCount:", error);
    return 0;
  }
}

/**
 * Récupère la surface financière (Chiffre d'affaires annuel ou budget max)
 */
export async function getSurfaceFinanciere(entrepriseId: string) {
  try {
    const result = await db
      .select({
        ca: entreprises.caDernierExercice,
        budget: entreprises.budgetMaxMarche
      })
      .from(entreprises)
      .where(eq(entreprises.id, entrepriseId))
      .limit(1);

    // On retourne le CA ou le budget max comme indicateur de surface
    return Number(result[0]?.ca || result[0]?.budget || 0);
  } catch (error) {
    console.error("Error in getSurfaceFinanciere:", error);
    return 0;
  }
}
