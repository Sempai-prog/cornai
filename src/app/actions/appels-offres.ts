// ══════════════════════════════════════════
// SABI — Server Action (Pagination Appels Offres)
// ══════════════════════════════════════════

import { db } from "@/database/client"
import { appelsOffres } from "@/database/schema"
import { ilike, or, eq, desc, sql, and } from "drizzle-orm"

const ITEMS_PAR_PAGE = 20

interface FiltresAppelsOffres {
  page: number
  recherche?: string
  secteur?: string
  region?: string
  type?: string
}

export async function getAppelsOffresPagines(filtres: FiltresAppelsOffres) {
  const { page, recherche, secteur, region, type } = filtres
  const offset = (page - 1) * ITEMS_PAR_PAGE
  
  // Construction des conditions de filtrage
  const conditions = []
  
  if (recherche && recherche.length > 2) {
    conditions.push(
      or(
        ilike(appelsOffres.titreComplet, `%${recherche}%`),
        ilike(appelsOffres.institution, `%${recherche}%`),
        ilike(appelsOffres.numeroMarche, `%${recherche}%`),
        ilike(appelsOffres.numeroAvis, `%${recherche}%`)
      )
    )
  }
  
  if (secteur) conditions.push(eq(appelsOffres.secteur, secteur))
  if (region) conditions.push(eq(appelsOffres.regionExecution, region))
  if (type) conditions.push(eq(appelsOffres.typeMarche, type))
  
  // Requête principale avec pagination
  const [donnees, countResult] = await Promise.all([
    db.query.appelsOffres.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      orderBy: [desc(appelsOffres.datePublication)],
      limit: ITEMS_PAR_PAGE,
      offset,
    }),
    
    // Requête de comptage (exécutée en parallèle)
    db.select({ total: sql<number>`count(*)` })
      .from(appelsOffres)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
  ])
  
  const total = Number(countResult[0]?.total || 0)
  
  return {
    donnees,
    pagination: {
      total,
      page,
      totalPages: Math.ceil(total / ITEMS_PAR_PAGE),
      parPage: ITEMS_PAR_PAGE,
    }
  }
}
