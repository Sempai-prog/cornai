import { 
  AudioSource, 
  RpaoRequirement, 
  EquipmentItem, 
  PersonnelProfile, 
  ColepsCompilation,
  TerrainScore
} from "./terrain-types";

// ── Module 1 : Transcripteur ──
export const MOCK_AUDIOS: AudioSource[] = [
  {
    id: "v1",
    sender: "N. Tchakounté",
    senderRole: "Chef de Chantier",
    timestamp: "09:41",
    duration: "0:45",
    type: "voice",
    transcription: "Pour le chapitre sur la méthodologie, il faut bien préciser qu'on utilisera une centrale à béton mobilisée sur site pour garantir le débit de 50m3/jour requis par le CCTP.",
    assignedToChapter: "plan_travail"
  },
  {
    id: "v2",
    sender: "G. Kamga",
    senderRole: "Directeur Technique",
    timestamp: "10:05",
    duration: "1:12",
    type: "voice",
    transcription: "N'oubliez pas d'inclure les schémas de phasage pour la traversée de la zone marécageuse au PK 12+400. C'est un point critique de notation.",
    assignedToChapter: "conception"
  }
];

// ── Module 2 : Le Garage ──
export const MOCK_RPAO_EQUIPMENT: RpaoRequirement[] = [
  { id: "req1", label: "Pelle hydraulique > 20T", quantity: 2, type: "Engin Lourd" },
  { id: "req2", label: "Bulldozer D6", quantity: 1, type: "Engin Lourd" },
  { id: "req3", label: "Camion Benne 15m3", quantity: 5, type: "Logistique" }
];

export const MOCK_GARAGE: EquipmentItem[] = [
  {
    id: "eq1",
    name: "Caterpillar 320D",
    type: "Pelle Hydraulique",
    matchedRequirement: "req1",
    documents: [
      { id: "d1", type: "carte_grise", label: "Carte Grise", status: "ready" },
      { id: "d2", type: "assurance", label: "Assurance 2024", status: "ready" },
      { id: "d3", type: "visite_technique", label: "Visite Tech", status: "warning", expiryDate: "05/2024" }
    ],
    complianceScore: 2,
    complianceTotal: 3,
    status: "conforme"
  },
  {
    id: "eq2",
    name: "Shantui SD16",
    type: "Bulldozer",
    matchedRequirement: "req2",
    documents: [
      { id: "d4", type: "carte_grise", label: "Carte Grise", status: "ready" },
      { id: "d5", type: "engagement_location", label: "Contrat de Location", status: "missing" }
    ],
    complianceScore: 1,
    complianceTotal: 2,
    status: "critique"
  }
];

// ── Module 3 : L'Équipe ──
export const MOCK_PERSONNEL: PersonnelProfile[] = [
  {
    id: "p1",
    fullName: "Marc Emmanuel NGONO",
    posteId: "chef_projet",
    qualification: "Ingénieur de Conception Génie Civil",
    institution: "Polytech Yaoundé",
    experienceYears: 12,
    isPublicAgent: false,
    documents: {
      cv: "ready",
      diploma: "ready",
      signature: "ready",
      certification: "pending"
    },
    alerts: [],
    overallStatus: "conforme"
  },
  {
    id: "p2",
    fullName: "Jean-Pierre MBARGA",
    posteId: "chef_chantier",
    qualification: "Technicien Supérieur",
    institution: "IUT Douala",
    experienceYears: 8,
    isPublicAgent: true,
    publicAgentLiberation: "missing",
    documents: {
      cv: "ready",
      diploma: "ready",
      signature: "missing",
      certification: "missing"
    },
    alerts: [
      {
        level: "rouge",
        message: "Agent Public détecté (MINEPAT). Lettre de mise en disponibilité obligatoire.",
        legalSource: "Statut Général de la Fonction Publique, Art. 45",
        actionLabel: "Uploader lettre"
      }
    ],
    overallStatus: "eliminatoire"
  }
];

// ── Module 5 : COLEPS ──
export const MOCK_COLEPS: ColepsCompilation = {
  documents: [
    { id: "c1", fileName: "01_MÉMOIRE_TECHNIQUE.pdf", sourceModule: "transcripteur", sizeMb: 4.2, status: "ready", canCompress: true },
    { id: "c2", fileName: "02_PIÈCES_MATÉRIEL.pdf", sourceModule: "garage", sizeMb: 8.5, status: "heavy", canCompress: true },
    { id: "c3", fileName: "03_DOSSIER_PERSONNEL.pdf", sourceModule: "equipe", sizeMb: 3.1, status: "ready", canCompress: false }
  ],
  totalSizeMb: 15.8,
  maxSizeMb: 15,
  isCompliant: false,
  modulesStatus: {
    transcripteur: "complete",
    garage: "warning",
    equipe: "warning",
    descente: "empty"
  },
  canCompile: false
};

// ── Score Global ──
export const MOCK_SCORE: TerrainScore = {
  percentage: 42,
  modulesValidated: 2,
  modulesTotal: 5,
  color: "hsl(38 92% 50%)" // Amber 500 (30-60%)
};
