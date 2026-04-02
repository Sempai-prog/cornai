// ══════════════════════════════════════════
// SABI — API : Webhook WhatsApp (WATI)
// ══════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { processIncomingMessage } from '@/whatsapp/bot'

/**
 * Webhook GET : Vérification par WATI (Challenge)
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const challenge = searchParams.get('hub.challenge')
  const verifyToken = searchParams.get('hub.verify_token')

  // Normalement on vérifie le token secret de WATI
  if (challenge) {
    return new Response(challenge, { status: 200 })
  }

  return NextResponse.json({ ok: true })
}

/**
 * Webhook POST : Reception des messages entrants
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json()
    
    // On lance le traitement en arrière-plan pour répondre 200 vite
    processIncomingMessage(payload).catch(console.error)

    return NextResponse.json({ status: 'delivered' })
  } catch (error: any) {
    console.error(`❌ Webhook POST Error: ${error.message}`)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
