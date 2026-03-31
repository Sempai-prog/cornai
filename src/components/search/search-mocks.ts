import { SearchResult } from "./search-types"

export const searchResultsMock: SearchResult[] = [
  {
    id: "ao-2025-001",
    title: "Construction d'un bloc de 02 salles de classe R+1 à l'École Publique de Deido",
    authority: "Mairie de Douala 1er",
    budget: "45M FCFA",
    region: "Littoral",
    deadline: "12 Avril 2025",
    type: "AONO",
    sector: "Travaux",
    status: "recommended",
    matchScore: 94,
    source: "JDM - Journal des Marchés No. 432",
    cautionAmount: "900,000 FCFA",
    evaluationMode: "Dossier Technique (70%) + Financier (30%)"
  },
  {
    id: "ao-2025-002",
    title: "Fourniture de matériel informatique et consommables de bureau (Lot Unique)",
    authority: "MINSANTE - Direction des Ressources Humaines",
    budget: "18M FCFA",
    region: "Centre",
    deadline: "05 Avril 2025",
    type: "DC",
    sector: "Fournitures",
    status: "urgent",
    risks: ["Agrément exigé", "Quitus fiscal récent required"]
  },
  {
    id: "ao-2025-003",
    title: "Étude de faisabilité pour le bitumage de la route communale Nkongsamba - Melong",
    authority: "Mairie de Nkongsamba",
    budget: "12M FCFA",
    region: "Littoral",
    deadline: "22 Avril 2025",
    type: "AAMI",
    sector: "Services",
    status: "new",
    isBlocked: true
  },
  {
    id: "ao-2025-004",
    title: "Maintenance préventive des groupes électrogènes de l'Hôpital Général de Yaoundé",
    authority: "Hôpital Général de Yaoundé",
    budget: "25M FCFA",
    region: "Centre",
    deadline: "10 Avril 2025",
    type: "AONO",
    sector: "Services",
    status: "risky",
    risks: ["Délai de réponse très court (J-3)", "Expérience de 10 ans requise"]
  },
  {
    id: "ao-2025-005",
    title: "Aménagement d'espaces verts et jardins publics dans le centre-ville",
    authority: "CUY - Communauté Urbaine de Yaoundé",
    budget: "30M FCFA",
    region: "Centre",
    deadline: "28 Avril 2025",
    type: "AONO",
    sector: "Travaux",
    status: "new"
  }
]
