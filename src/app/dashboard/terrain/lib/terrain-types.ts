// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TYPES GLOBAUX — Page Le Terrain (SABI)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Statuts communs ──
export type DocumentStatus = "ready" | "missing" | "warning" | "pending";
export type ModuleStatus = "complete" | "warning" | "empty" | "pending";
export type AlertLevel = "rouge" | "orange" | "info";

// ── Module 1 : Transcripteur CCTP ──
export interface AudioSource {
  id: string;
  sender: string;          // "Chef de Chantier", "Chef de Projet"
  senderRole: string;
  timestamp: string;       // "09:41"
  duration: string | null; // "0:45"
  type: "voice" | "text";
  transcription?: string;
  assignedToChapter?: ChapterId | null;
}

export type ChapterId = "conception" | "plan_travail" | "organisation";

export interface MemoireChapter {
  id: ChapterId;
  title: string;           // "Chapitre 1 : Conception Technique"
  legalTag: string;        // "OBLIGATOIRE" | "CRITÈRE DE NOTATION" | "ANNEXE 8.2"
  legalTagType: "required" | "scoring" | "annexe";
  content: string;         // Texte généré ou vide
  status: "complete" | "draft" | "empty";
  sourceAudios: string[];  // IDs des audios utilisés
}

// ── Module 2 : Le Garage ──
export interface RpaoRequirement {
  id: string;
  label: string;           // "2× Pelle hydraulique"
  quantity: number;
  type: string;            // "Engin Lourd", "Logistique", "Énergie"
}

export interface EquipmentDocument {
  id: string;
  type: "propriete" | "carte_grise" | "assurance" | "visite_technique" | "engagement_location" | "facture" | "maintenance";
  label: string;
  status: DocumentStatus;
  fileUrl?: string;
  expiryDate?: string;
}

export interface EquipmentItem {
  id: string;
  name: string;            // "Pelle Hydraulique CAT 320"
  type: string;            // "Engin Lourd"
  matchedRequirement?: string; // ID du RpaoRequirement
  documents: EquipmentDocument[];
  complianceScore: number; // 0, 1, 2, 3 sur le nombre total de docs requis
  complianceTotal: number;
  status: "conforme" | "critique" | "eliminatoire";
}

// ── Module 3 : L'Équipe ──
export interface PosteRequis {
  id: string;
  title: string;           // "Chef de Projet"
  requiredBy: string;      // "RPAO Art. 15.2"
}

export interface PersonnelAlert {
  level: AlertLevel;
  message: string;
  legalSource: string;     // "DTAO, Critères d'évaluation détaillés"
  actionLabel: string;     // "Joindre le doc"
}

export interface PersonnelProfile {
  id: string;
  fullName: string;
  posteId: string;         // Lien vers PosteRequis
  qualification: string;   // "MSc Génie Civil"
  institution: string;     // "ENSP Yaoundé"
  experienceYears: number;
  isPublicAgent: boolean;
  publicAgentLiberation?: DocumentStatus;
  documents: {
    cv: DocumentStatus;
    diploma: DocumentStatus;
    signature: DocumentStatus;
    certification: DocumentStatus;
  };
  alerts: PersonnelAlert[];
  overallStatus: "conforme" | "critique" | "eliminatoire";
}

// ── Module 4 : Descente (Visite de Site) ──
export interface SitePhoto {
  id: string;
  url: string;
  timestamp: string;
}

export interface SiteVisitData {
  projectName: string;     // Auto-rempli depuis SabiSearch
  aaoReference: string;    // "2024/MINTP/0034"
  maitreOuvrage: string;
  visitDate?: string;
  visitTime?: string;
  gpsCoordinates?: { lat: number; lng: number };
  photos: SitePhoto[];
  observations?: string;   // Transcrit depuis audio ou tapé
  annexe16Generated: boolean;
  annexe16Url?: string;
}

// ── Module 5 : COLEPS ──
export interface ColepsDocument {
  id: string;
  fileName: string;        // "ANNEXE_13_METHODOLOGIE.pdf"
  sourceModule: "transcripteur" | "garage" | "equipe" | "descente" | "manual";
  sizeMb: number;
  status: "ready" | "heavy" | "missing";
  canCompress: boolean;
  compressedSizeMb?: number;
}

export interface ColepsCompilation {
  documents: ColepsDocument[];
  totalSizeMb: number;
  maxSizeMb: 15;
  isCompliant: boolean;
  modulesStatus: {
    transcripteur: ModuleStatus;
    garage: ModuleStatus;
    equipe: ModuleStatus;
    descente: ModuleStatus;
  };
  canCompile: boolean;     // true seulement si TOUS les modules sont "complete"
}

// ── Score global ──
export interface TerrainScore {
  percentage: number;      // 0-100
  modulesValidated: number; // 0-5
  modulesTotal: 5;
  color: string;           // Calculé: > 60% → #25D366, 30-60% → #f59e0b, < 30% → #ef4444
}
