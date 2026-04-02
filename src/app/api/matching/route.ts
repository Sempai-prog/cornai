// ══════════════════════════════════════════
// SABI — API : Matching (/api/matching)
// ══════════════════════════════════════════

import { matcherTousLesAO } from '@/matching/profile-matcher'
import { getMatchingsParEntreprise } from '@/database/queries/matching'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Lance le matching pour une entreprise spécifique
 */
export async function POST(req: NextRequest) {
  try {
    const { entreprise_id } = await req.json()
    
    if (!entreprise_id) {
      return NextResponse.json({ error: 'entreprise_id requis' }, { status: 400 })
    }

    const matchings = await matcherTousLesAO(entreprise_id)
    
    // Top 10
    const topMatchings = matchings.slice(0, 10).map(m => ({
      ...m,
      appelOffre: m.appelOffre
    }))

    return NextResponse.json({ data: topMatchings })
  } catch (error: any) {
    console.error(`❌ POST /api/matching Error: ${error.message}`)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * Récupère les matchings existants pour une entreprise
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const entreprise_id = searchParams.get('entreprise_id')
    
    if (!entreprise_id) {
      return NextResponse.json({ error: 'entreprise_id requis' }, { status: 400 })
    }

    const list = await getMatchingsParEntreprise(entreprise_id, 20)
    
    return NextResponse.json({ data: list })
  } catch (error: any) {
    console.error(`❌ GET /api/matching Error: ${error.message}`)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
