export const dynamic = 'force-dynamic'

import { db } from "@/database/client"
import { notesAudio } from "@/database/schema"
import { eq, desc } from "drizzle-orm"
import { TranscripteurClient } from "./transcripteur-client"

interface TranscripteurPageProps {
  params: Promise<{ id: string }>
}

export default async function TranscripteurPage({ params }: TranscripteurPageProps) {
  const { id } = await params
  
  // Récupérer les notes audio existantes
  const initialNotes = await db.query.notesAudio.findMany({
    where: eq(notesAudio.soumissionId, id),
    orderBy: [desc(notesAudio.createdAt)]
  })

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight uppercase">Le Transcripteur</h1>
          <p className="text-xs text-muted-foreground/60 font-semibold uppercase tracking-widest mt-1">
             Sprint E.1 — Intelligence de terrain & Notes vocales
          </p>
        </div>

        <TranscripteurClient 
          soumissionId={id}
          initialNotes={initialNotes}
        />
      </div>
    </div>
  )
}
