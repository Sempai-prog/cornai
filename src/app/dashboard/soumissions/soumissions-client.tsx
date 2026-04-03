"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoreHorizontal, Plus } from "lucide-react"
import { SoumissionCard } from "@/components/dashboard/soumission-card"
import { SubmissionInspector } from "@/components/dashboard/submission-inspector"

type SubmissionStatus = 'MONTAGE' | 'BLINDAGE' | 'CHIFFRAGE' | 'SIGNATURE' | 'DEPOT'

interface Submission {
  id: string
  ac: string
  type: string
  title: string
  deadline: string
  envelopeA: number
  envelopeB: number
  envelopeC: number
  status: SubmissionStatus
  isUrgent?: boolean
  budget: string
}

interface SoumissionsClientProps {
  initialSubmissions: Submission[]
}

const COLUMNS: { id: SubmissionStatus; label: string; description: string }[] = [
  { id: 'MONTAGE', label: 'Montage', description: 'Collecte Pièces' },
  { id: 'BLINDAGE', label: 'Blindage', description: 'Enveloppe A' },
  { id: 'CHIFFRAGE', label: 'Chiffrage', description: 'Offre Nkap' },
  { id: 'SIGNATURE', label: 'Signature', description: 'Revue Finale' },
  { id: 'DEPOT', label: 'Dépôt', description: 'COLEPS / ARMP' },
]

export function SoumissionsClient({ initialSubmissions }: SoumissionsClientProps) {
  const urgentSubmission = initialSubmissions.find(s => s.isUrgent)

  return (
    <div className="flex flex-col gap-6 flex-1 min-h-0 overflow-hidden">
      
      {/* PLAN 1: L'INSPECTEUR SABI (KPI RIBBON) */}
      <SubmissionInspector 
        urgentTask={urgentSubmission ? {
          deadline: urgentSubmission.deadline,
          title: urgentSubmission.title
        } : undefined}
        complianceScore={Math.round(initialSubmissions.reduce((acc, s) => acc + s.envelopeA, 0) / (initialSubmissions.length || 1))}
        financialSurface="350M" // Simplified for now
      />

      {/* PLAN 2: LE FLUX (KANBAN FULL-WIDTH) */}
      <div className="flex flex-col min-w-0 h-full overflow-hidden">
        <div className="flex items-center justify-between mb-6 h-6 shrink-0">
          <h2 className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.3em] flex items-center gap-3">
            Cycle de Vie des Plis — Pipeline Industriel
          </h2>
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest">
               {initialSubmissions.length} Dossiers en cours d&apos;exécution
             </span>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-6 custom-scrollbar scroll-smooth flex-1 items-start min-h-0">
           {COLUMNS.map((column) => (
               <div key={column.id} className="w-[320px] shrink-0 flex flex-col h-full bg-muted border border-border/10 rounded-[4px] p-2 hover:bg-muted/80 transition-colors group">
                 {/* Column Head */}
                  <div className="flex items-center justify-between px-3 py-3 mb-2 shrink-0 border-b border-border/10">
                    <div className="space-y-1">
                       <h3 className="text-[11px] font-bold text-foreground/40 group-hover:text-foreground/70 transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                          {column.label}
                           <div className="px-1.5 py-0.5 rounded-[4px] bg-muted/20 text-[9px] text-muted-foreground/50 group-hover:text-primary transition-colors">
                            {initialSubmissions.filter(s => s.status === column.id).length}
                          </div>
                       </h3>
                       <p className="text-[9px] text-muted-foreground/20 font-bold uppercase tracking-[0.2em]">{column.description}</p>
                    </div>
                    <MoreHorizontal className="h-4 w-4 text-foreground/5 group-hover:text-foreground/20 cursor-pointer" />
                 </div>

                 {/* Column Body */}
                 <div className="space-y-3 p-1.5 overflow-y-auto custom-scrollbar min-h-0 h-full">
                    <AnimatePresence mode="popLayout">
                       {initialSubmissions.filter(s => s.status === column.id).map((item) => (
                          <SoumissionCard key={item.id} item={item} />
                       ))}
                    </AnimatePresence>
                    
                    <button className="w-full py-4 border border-dashed border-border/10 rounded-[4px] text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/20 hover:text-primary/40 hover:border-primary/20 hover:bg-primary/[0.02] transition-all flex items-center justify-center gap-2 mt-2">
                       <Plus className="h-3 w-3" />
                       Injecter AO
                    </button>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  )
}
