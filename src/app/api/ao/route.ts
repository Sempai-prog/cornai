// ══════════════════════════════════════════
// SABI — API : Liste des AO (/api/ao)
// ══════════════════════════════════════════

import { db } from '@/database/client'
import { appelsOffres } from '@/database/schema'
import { eq, and, gte, lte, asc, sql } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const type = searchParams.get('type')
    const region = searchParams.get('region')
    const budgetMin = searchParams.get('budgetMin')
    const budgetMax = searchParams.get('budgetMax')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Construction des filtres
    const filters = [eq(appelsOffres.statut, 'actif')]
    
    if (type) filters.push(eq(appelsOffres.typeMarche, type as any))
    if (region) filters.push(eq(appelsOffres.regionExecution, region))
    if (budgetMin) {
      const min = Number(budgetMin)
      if (!isNaN(min)) filters.push(gte(appelsOffres.budgetEstime, min))
    }
    if (budgetMax) {
      const max = Number(budgetMax)
      if (!isNaN(max)) filters.push(lte(appelsOffres.budgetEstime, max))
    }

    // Récupération des données
    const list = await db.query.appelsOffres.findMany({
      where: and(...filters),
      orderBy: [asc(appelsOffres.dateLimiteSoumission)],
      limit: limit,
      offset: offset,
    })

    // Comptage total pour la pagination
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(appelsOffres)
      .where(and(...filters))
    
    const total = totalResult[0]?.count || 0

    return NextResponse.json({
      data: list,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error(`❌ GET /api/ao Error: ${error.message}`)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
