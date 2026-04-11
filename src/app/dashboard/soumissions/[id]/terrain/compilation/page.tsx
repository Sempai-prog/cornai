export const dynamic = 'force-dynamic'

import { db } from "@/database/client"
import { notesAudio, equipeProjet, soumissionEngins, visites_terrain } from "@/database/schema"
import { eq, count } from "drizzle-orm"
import { CompilationClient } from "./compilation-client"

interface CompilationPageProps {
  params: Promise<{ id: string }>
}

export default async function CompilationPage({ params }: CompilationPageProps) {
  const { id } = await params
  
  // 1. Récupérer les stats de compilation
  const [notesRes, equipeRes, materielRes, visite] = await Promise.all([
    db.select({ count: count() }).from(notesAudio).where(eq(notesAudio.soumissionId, id)),
    db.select({ count: count() }).from(equipeProjet).where(eq(equipeProjet.soumissionId, id)),
    db.select({ count: count() }).from(soumissionEngins).where(eq(soumissionEngins.soumissionId, id)),
    db.query.visites_terrain.findFirst({ where: eq(visites_terrain.soumissionId, id) })
  ])

  const stats = {
    notesCount: notesRes[0]?.count || 0,
    equipeCount: equipeRes[0]?.count || 0,
    materielCount: materielRes[0]?.count || 0,
    visiteComplete: !!visite?.observations && !!visite?.maitreOuvrageRelais
  }

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">Compilation Technique</h1>
          <p className="text-xs text-muted-foreground/60 font-bold uppercase tracking-widest mt-1">
             Sprint E.5 — Synthèse Intelligence & Génération Volume B
          </p>
        </div>

        <CompilationClient 
          soumissionId={id}
          stats={stats}
        />
      </div>
    </div>
  )
}
