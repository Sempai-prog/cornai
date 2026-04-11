export const dynamic = 'force-dynamic'

// ══════════════════════════════════════════
// SABI — Redirection Module Terrain Défaut
// ══════════════════════════════════════════

import { redirect } from "next/navigation"

export default async function VolumeTerrainPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  redirect(`/dashboard/soumissions/${id}/terrain/descente`)
}
