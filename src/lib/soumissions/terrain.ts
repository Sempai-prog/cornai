// ══════════════════════════════════════════
// SABI — Référentiel Volume B (Technique)
// ══════════════════════════════════════════

import { MapPin, Mic, Truck, Users, Wand2 } from "lucide-react"

export const SOUS_MODULES_TERRAIN = [
  {
    id: 'descente',
    label: 'Visite de Site',
    icon: MapPin,
    description: 'Observations terrain + Annexe 16',
    poids: 25 // 25% de l'avancement technique
  },
  {
    id: 'transcripteur',
    label: 'Mémoire Technique',
    icon: Mic,
    description: 'Dictée vocale → Texte académique',
    poids: 35 // 35% de l'avancement technique
  },
  {
    id: 'garage',
    label: 'Parc Matériel',
    icon: Truck,
    description: 'Engins mobilisés pour ce marché',
    poids: 25 // 25% de l'avancement technique
  },
  {
    id: 'equipe',
    label: 'Équipe Technique',
    icon: Users,
    description: 'Personnel clé + CVs Annexe 8',
    poids: 15 // 15% de l'avancement technique
  },
  {
    id: 'compilation',
    label: 'Compilation',
    icon: Wand2,
    description: 'Aperçu & Génération Mémoire Technique',
    poids: 0 // Statut final
  },
] as const

export type SousModuleTerrainId = typeof SOUS_MODULES_TERRAIN[number]['id']
