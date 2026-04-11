export const dynamic = 'force-dynamic'

// ══════════════════════════════════════════
// SABI — Redirection Volume Défaut
// ══════════════════════════════════════════

import { redirect } from "next/navigation"

export default async function SoumissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  redirect(`/dashboard/soumissions/${id}/blindage`)
}
