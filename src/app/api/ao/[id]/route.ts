// ══════════════════════════════════════════
// CORNAi — API : Détail d'un AO (/api/ao/[id])
// ══════════════════════════════════════════

import { db } from '@/database/client'
import { appelsOffres } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    const ao = await db.query.appelsOffres.findFirst({
      where: eq(appelsOffres.id, id),
    })

    if (!ao) {
      return NextResponse.json({ error: 'AO non trouvé' }, { status: 404 })
    }

    return NextResponse.json({ data: ao })
  } catch (error: any) {
    console.error(`❌ GET /api/ao Error: ${error.message}`)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
