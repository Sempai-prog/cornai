// src/lib/blindage/referentiel.ts

export interface PieceReferentiel {
  id: string;
  label: string;
  description: string;
  obligatoire: boolean;
  delaiValiditeJours: number; // 0 si illimité
  categorie: 'fiscal' | 'social' | 'judiciaire' | 'technique' | 'autre';
  articleReference: string;
  source: string;
}

export const PIECES_REFERENTIEL: PieceReferentiel[] = [
  {
    id: 'rccm',
    label: 'RCCM',
    description: 'Registre du Commerce et du Crédit Mobilier',
    obligatoire: true,
    delaiValiditeJours: 0, // Permanent
    categorie: 'fiscal',
    articleReference: 'L.2018/001',
    source: 'Tribunal de Commerce'
  },
  {
    id: 'anr',
    label: 'Attestation de Non-Redevance (ANR)',
    description: 'Prouve que l\'entreprise est à jour de ses impôts',
    obligatoire: true,
    delaiValiditeJours: 90,
    categorie: 'fiscal',
    articleReference: 'Art. 543 CGI',
    source: 'DGI'
  },
  {
    id: 'quitus_cnps',
    label: 'Quitus CNPS',
    description: 'Certificat de mise à jour des cotisations sociales',
    obligatoire: true,
    delaiValiditeJours: 90,
    categorie: 'social',
    articleReference: 'L.1992/007',
    source: 'CNPS'
  },
  {
    id: 'non_faillite',
    label: 'Attestation de Non-Faillite',
    description: 'Délivré par le greffe du tribunal',
    obligatoire: true,
    delaiValiditeJours: 90,
    categorie: 'judiciaire',
    articleReference: 'L.2018/001',
    source: 'Tribunal de Grande Instance'
  },
  {
    id: 'patente',
    label: 'Patente / Attestation de Patente',
    description: 'Pour l\'exercice budgétaire en cours',
    obligatoire: true,
    delaiValiditeJours: 365,
    categorie: 'fiscal',
    articleReference: 'Code des Impôts',
    source: 'Recette des Finances'
  },
  {
    id: 'agrement_mintp',
    label: 'Agrément MINTP',
    description: 'Agrément du Ministère des Travaux Publics',
    obligatoire: false,
    delaiValiditeJours: 365,
    categorie: 'technique',
    articleReference: 'Décret 2018/366',
    source: 'MINTP'
  },
  {
    id: 'caution_soumission',
    label: 'Caution de Soumission',
    description: 'Garantie bancaire pour l\'Appel d\'Offre spécifique',
    obligatoire: true,
    delaiValiditeJours: 120,
    categorie: 'autre',
    articleReference: 'Art. 75 Code Marchés',
    source: 'Banque Agrée'
  }
];
