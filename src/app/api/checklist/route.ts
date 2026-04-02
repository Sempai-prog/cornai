// ══════════════════════════════════════════
// SABI — API : Checklist de conformité
// ══════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { verifierConformite } from '@/conformity/document-checker'

/**
 * Endpoint POST pour vérifier la conformité d'une PME pour un AO
 */
export async function POST(req: NextRequest) {
  try {
    const { entreprise_id, ao_id } = await req.json()

    if (!entreprise_id || !ao_id) {
      return NextResponse.json({ error: "IDs manquants" }, { status: 400 })
    }

    const report = await verifierConformite(entreprise_id, ao_id)

    return NextResponse.json(report)

  } catch (error: any) {
    console.error(`❌ API Checklist Error: ${error.message}`)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
