export const dynamic = 'force-dynamic'

import { db } from "@/database/client"
import { equipeProjet, soumissions } from "@/database/schema"
import { eq, desc } from "drizzle-orm"
import { notFound } from "next/navigation"
import { EquipeClient } from "./equipe-client"

interface EquipePageProps {
  params: Promise<{ id: string }>
}

export default async function EquipePage({ params }: EquipePageProps) {
  const { id } = await params
  
  // 1. Récupérer la soumission pour l'entrepriseId
  const soumission = await db.query.soumissions.findFirst({
    where: eq(soumissions.id, id)
  })
  if (!soumission) notFound()

  // 2. Récupérer les membres de l'équipe affectés
  const membres = await db.query.equipeProjet.findMany({
    where: eq(equipeProjet.soumissionId, id),
    orderBy: [desc(equipeProjet.createdAt)]
  })

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">Équipe Projet</h1>
          <p className="text-xs text-muted-foreground/60 font-bold uppercase tracking-widest mt-1">
             Sprint E.4 — Expertise Technique & Intégrité
          </p>
        </div>

        <EquipeClient 
          soumissionId={id}
          entrepriseId={soumission.entrepriseId}
          membres={membres}
        />
      </div>
    </div>
  )
}
