// ══════════════════════════════════════════
// SABI — Pipeline de Soumission (Workflow ARMP)
// ══════════════════════════════════════════

// Les 4 colonnes = les 4 vrais états d'un dossier marché public au Cameroun
export const COLONNES_PIPELINE = [
  {
    id: 'analyse',
    label: 'Analyse',
    description: 'Qualification IA & Critères RPAO en cours',
    color: 'border-blue-500/20',
    // Quelle action amène ici : clic "Engager" depuis Le Radar
  },
  {
    id: 'montage',
    label: 'Montage',
    description: 'Blindage Admin + Terrain + Chiffrage financiers',
    color: 'border-amber-500/20',
    // Quelle action amène ici : Manuel ou auto quand analyse terminée
  },
  {
    id: 'pret',
    label: 'Prêt pour dépôt',
    description: 'Les 3 volumes (A, B, C) sont validés à 100%',
    color: 'border-emerald-500/20',
    // Quelle action amène ici : Auto quand 3 volumes à 100%
  },
  {
    id: 'soumis',
    label: 'Soumis',
    description: 'Dossier déposé physiquement ou COLEPS',
    color: 'border-purple-500/20',
    // Quelle action amène ici : Clic "Marquer comme soumis"
  },
] as const

export type StatutSoumission = typeof COLONNES_PIPELINE[number]['id']
