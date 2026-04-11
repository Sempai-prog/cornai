// src/lib/blindage/logic.ts

import { addDays, isAfter } from 'date-fns'

export type StatutPiece = 'manquant' | 'valide' | 'attention' | 'perime'

/**
 * Calcul du statut d'une pièce par rapport à sa date d'émission et la date du dépôt
 */
export function calculerStatutPiece(
  delaiValiditeJours: number,
  dateObtention: string | Date | null,
  dateLimiteSoumission: Date | null
): StatutPiece {
  if (!dateObtention || !dateLimiteSoumission) return 'manquant';

  const obtention = new Date(dateObtention);
  
  // Si le délai est 0, la pièce est permanente (ex: RCCM)
  if (delaiValiditeJours === 0) return 'valide';

  const dateExpiration = addDays(obtention, delaiValiditeJours);
  
  // Si la date d'expiration est AVANT la date limite de soumission, c'est périmé
  if (isAfter(dateLimiteSoumission, dateExpiration)) {
    return 'perime';
  }

  // Si l'expiration est proche (moins de 15 jours après le dépôt), on met en attention
  const dateAlerte = addDays(dateLimiteSoumission, 15);
  if (isAfter(dateAlerte, dateExpiration)) {
    return 'attention';
  }

  return 'valide';
}
