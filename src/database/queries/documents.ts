// ══════════════════════════════════════════
// SABI — Queries : Documents & Conformité
// ══════════════════════════════════════════

import { db } from "../client";
import { documentsEntreprise, piecesAdministratives } from "../schema";
import { eq, and } from "drizzle-orm";

/**
 * Récupère tous les documents d'une entreprise avec les métadonnées du référentiel
 */
export async function getDocumentsAvecPieces(entrepriseId: string) {
  try {
    const docs = await db
      .select({
        id: documentsEntreprise.id,
        pieceId: documentsEntreprise.pieceId,
        statut: documentsEntreprise.statut,
        dateExpiration: documentsEntreprise.dateExpiration,
        dateUpload: documentsEntreprise.createdAt,
        fichierUrl: documentsEntreprise.fichierUrl,
        nomCanonique: piecesAdministratives.nomCanonique,
        eliminatoire: piecesAdministratives.eliminatoireSiAbsent,
        categorie: piecesAdministratives.categorie,
      })
      .from(documentsEntreprise)
      .leftJoin(
        piecesAdministratives,
        eq(documentsEntreprise.pieceId, piecesAdministratives.id)
      )
      .where(eq(documentsEntreprise.entrepriseId, entrepriseId));

    return docs;
  } catch (error) {
    console.error("Error in getDocumentsAvecPieces:", error);
    return [];
  }
}

/**
 * Récupère les pièces manquantes (référentiel - existant)
 */
export async function getPiecesManquantes(entrepriseId: string) {
  try {
    // 1. Toutes les pièces obligatoires du référentiel
    const referentiel = await db.select().from(piecesAdministratives);
    
    // 2. Pièces déjà présentes pour l'entreprise
    const existantes = await db
      .select({ pieceId: documentsEntreprise.pieceId })
      .from(documentsEntreprise)
      .where(eq(documentsEntreprise.entrepriseId, entrepriseId));
    
    const idsExistants = new Set(existantes.map(d => d.pieceId));
    
    // 3. Filtrer
    return referentiel.filter(p => !idsExistants.has(p.id));
  } catch (error) {
    console.error("Error in getPiecesManquantes:", error);
    return [];
  }
}

/**
 * Calcul complet de la conformité pour la page Documents
 */
export async function getConformiteComplete(entrepriseId: string) {
  const [docs, manquantes] = await Promise.all([
    getDocumentsAvecPieces(entrepriseId),
    getPiecesManquantes(entrepriseId),
  ]);

  const now = new Date();
  const dans30Jours = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const stats = {
    total: docs.length + manquantes.length,
    valides: docs.filter(d => d.statut === 'valide').length,
    expires: docs.filter(d => d.statut === 'expire').length,
    expirant: docs.filter(d => {
      if (!d.dateExpiration) return false;
      const exp = new Date(d.dateExpiration);
      return exp > now && exp <= dans30Jours;
    }).length,
    eliminatoiresManquants: [
      ...docs.filter(d => d.statut === 'expire' && d.eliminatoire),
      ...manquantes.filter(p => p.eliminatoireSiAbsent)
    ].length
  };

  const score = stats.total > 0 ? Math.round((stats.valides / stats.total) * 100) : 0;

  return {
    documents: docs,
    manquantes: manquantes,
    stats: {
      ...stats,
      score
    }
  };
}
