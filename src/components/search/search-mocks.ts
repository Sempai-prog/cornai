// ══════════════════════════════════════════
// SABI — Mocks de Production (Logic V4 — Cameroun ARMP / MINMAP)
// ══════════════════════════════════════════

import { SearchResult } from "./search-types"

export const MOCK_SEARCH_RESULTS: SearchResult[] = [
  {
    id: "81d2748f-8204-491d-99ea-b142ee124439",
    title: "AO N°01/BTP/MINTP/2026 : Travaux de construction d'un pont sur la rivière Nyong",
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
    id: "1681e8ec-0e37-42fc-9a2c-7f72fa431d64",
    title: "AO N°02/Informatique/MINMAP/2026 : Fourniture de matériel informatique et serveurs",
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
