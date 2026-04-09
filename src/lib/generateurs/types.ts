/**
 * TYPES PARTAGÉS POUR LA GÉNÉRATION DE DOCUMENTS
 */

export type DocumentFormat = 'PDF' | 'EXCEL';

export interface GenerateurOptions {
  filename: string;
  author?: string;
  title?: string;
}

export interface DocumentMetadata {
  soumissionId: string;
  entrepriseId: string;
  appelOffreId: string;
}

export interface GenerationResult {
  success: boolean;
  blob?: Blob;
  url?: string;
  error?: string;
}
