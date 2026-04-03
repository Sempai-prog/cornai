// ══════════════════════════════════════════
// SABI — Mocks de Production (Logic V4 — Cameroun ARMP / MINMAP)
// ══════════════════════════════════════════

import { SearchResult } from "./search-types"

export const MOCK_SEARCH_RESULTS: SearchResult[] = [
  {
    id: "AO-2026-045-MINTP",
    title: "Entretien routier périodique de la route nationale N°3 (Axe Yaoundé-Douala)",
    authority: "MINTP - Ministère des Travaux Publics",
    budget: "450 000 000 FCFA",
    region: "Centre / Littoral",
    deadline: "12 Avril 2026",
    type: "AONO",
    sector: "Travaux",
    cautionSoumission: "9 000 000 FCFA",
    fraisDossier: "150 000 FCFA",
    lieuDepot: "Physique",
    lieuExecution: "Axe Yaoundé-Douala",
    dateVisiteSite: "05 Avril 2026",
    modeSoumission: "Physique",
    financement: "BIP 2026",
    
    // RPAO Metadata
    criteresEliminatoires: [
      "Absence d'une pièce administrative à l'ouverture",
      "Fausse déclaration ou pièce falsifiée",
      "Note technique < 70/100"
    ],
    criteresEssentiels: [
      "Personnel clé (Ingénieur des travaux publics)",
      "Matériel lourd (Niveleuse, Compacteur)",
      "Capacité financière (150 millions FCFA)"
    ],
    
    // IA & Go/No-Go Triage
    matchScore: 92,
    matchLevel: "excellent",
    signal: "🟢 Votre profil matériel correspond à 95% des exigences techniques.",
    complexiteMontage: "Moyenne",
    
    // Conformité Enveloppes
    conformitePME: {
      enveloppeA: {
        status: "OK",
        pieces: [
          { name: "Attestation de Non Redevance (ANR)", status: "valid" },
          { name: "Quitus CNPS", status: "valid" },
          { name: "RCCM", status: "valid" }
        ]
      },
      enveloppeB: {
        status: "OK",
        exigences: ["Ingénieur Génie Civil (10 ans)", "Compacteur vibrant"]
      },
      enveloppeC: {
        status: "OK",
        bpuStatus: "Généré"
      }
    },
    workflowState: "opportunite"
  },
  {
    id: "AO-2026-012-MINSANTE",
    title: "Fourniture de dispositifs médicaux pour l'Hôpital Central de Yaoundé",
    authority: "MINSANTE - Ministère de la Santé Publique",
    budget: "120 000 000 FCFA",
    region: "Centre",
    deadline: "08 Avril 2026",
    type: "DC",
    sector: "Fournitures",
    cautionSoumission: "2 400 000 FCFA",
    fraisDossier: "50 000 FCFA",
    lieuDepot: "COLEPS",
    lieuExecution: "Yaoundé",
    modeSoumission: "COLEPS",
    financement: "Fonds COVID-19",
    
    matchScore: 45,
    matchLevel: "risky",
    signal: "🔴 Alerte : Votre ligne de crédit bancaire est inférieure au montant de la caution.",
    complexiteMontage: "Faible",
    
    conformitePME: {
      enveloppeA: {
        status: "Warning",
        pieces: [
          { name: "Plan de localisation", status: "missing" },
          { name: "Attestation de Non Redevance", status: "expiring", expiry: "2 Jours" }
        ]
      },
      enveloppeB: { status: "Warning", exigences: ["Échantillons obligatoires"] },
      enveloppeC: { status: "OK", bpuStatus: "Non démarré" }
    },
    workflowState: "eval"
  }
]
