// src/database/queries/blindage.ts

import { db } from '../client'
import { documentsEntreprise, soumissions, appelsOffres } from '../schema'
import { eq, and } from 'drizzle-orm'
import { PIECES_REFERENTIEL } from '@/lib/blindage/referentiel'
import { calculerStatutPiece } from '@/lib/blindage/logic'

/**
 * Récupère toutes les pièces du blindage pour une soumission donnée.
 * Fusionne le référentiel statique avec les documents réels de l'entreprise en DB.
 */
export async function getPiecesBlindage(soumissionId: string) {
  // 1. Récupérer la soumission et les infos de l'AO (notamment date limite)
  const soumission = await db.query.soumissions.findFirst({
    where: eq(soumissions.id, soumissionId),
    with: {
      appelOffre: true
    }
  });

  if (!soumission) throw new Error("Soumission introuvable");

  const entrepriseId = soumission.entrepriseId;
  const dateLimite = soumission.appelOffre.dateLimiteSoumission ? new Date(soumission.appelOffre.dateLimiteSoumission) : null;

  // 2. Récupérer les documents de l'entreprise en DB
  const docsDB = await db.query.documentsEntreprise.findMany({
    where: eq(documentsEntreprise.entrepriseId, entrepriseId)
  });

  // 3. Mapper le référentiel avec les données réelles
  const pieces = PIECES_REFERENTIEL.map(ref => {
    const docDB = docsDB.find(d => d.pieceId === ref.id);
    
    const statut = calculerStatutPiece(
      ref.delaiValiditeJours,
      docDB?.dateObtention || null,
      dateLimite
    );

    return {
      ...ref,
      document: docDB ? {
        id: docDB.id,
        dateObtention: docDB.dateObtention,
        dateExpiration: docDB.dateExpiration,
        fichierUrl: docDB.fichierUrl,
        statut: docDB.statut
      } : null,
      statut: statut as any
    };
  });

  // 4. Calculer l'avancement
  const obligatoires = pieces.filter(p => p.obligatoire);
  const valides = obligatoires.filter(p => p.statut === 'valide' || p.statut === 'attention');
  const avancement = Math.round((valides.length / obligatoires.length) * 100);

  return {
    pieces,
    avancement,
    dateDepotAO: dateLimite,
    referenceAO: soumission.appelOffre.id.substring(0, 8), // On utilise l'ID court comme ref par défaut
    titreAO: soumission.appelOffre.titreComplet
  };
}
