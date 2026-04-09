"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoreHorizontal, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { SoumissionCard } from "@/components/dashboard/soumission-card"
import { SubmissionInspector } from "@/components/dashboard/submission-inspector"

type SubmissionStatus = 'preparation' | 'soumis' | 'evaluation' | 'attribue' | 'rejete'

interface Submission {
  id: string
  ac: string
  type: string
  title: string
  deadline: string | Date
  envelopeA: number
  envelopeB: number
  envelopeC: number
  status: SubmissionStatus
  isUrgent?: boolean
  budget: string | number
}

interface SoumissionsClientProps {
  initialSubmissions: Submission[]
}

const COLUMNS: { id: SubmissionStatus; label: string; description: string; color: string }[] = [
  { 
    id: 'preparation', 
    label: 'Préparation du Dossier',
    description: 'Dossiers en cours de montage',
    color: 'border-t-amber-500'
  },
  { 
    id: 'soumis', 
    label: 'Soumis à la SCAO',
    description: 'Dépôt effectué — En attente',
    color: 'border-t-blue-500'
  },
  { 
    id: 'evaluation', 
    label: 'Évaluation Technique',
    description: 'Commission technique en cours',
    color: 'border-t-purple-500'
  },
  { 
    id: 'attribue', 
    label: 'Marché Attribué',
    description: 'Notification reçue',
    color: 'border-t-emerald-500'
  },
  { 
    id: 'rejete', 
    label: 'Non Retenus',
    description: 'Archives post-mortem',
    color: 'border-t-red-500'
  },
]

export function SoumissionsClient({ initialSubmissions }: SoumissionsClientProps) {
  const [submissions, setSubmissions] = React.useState(initialSubmissions)
  const [draggedId, setDraggedId] = React.useState<string | null>(null)
  const [dropTarget, setDropTarget] = React.useState<string | null>(null)

  const urgentSubmission = submissions.find(s => s.isUrgent)

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id)
    e.dataTransfer.setData('submissionId', id)
    // Create a ghost image if needed, but framer-motion handles the fluid look
  }

  const handleDragOver = (e: React.DragEvent, status: SubmissionStatus) => {
    e.preventDefault()
    setDropTarget(status)
  }

  const handleDrop = (e: React.DragEvent, status: SubmissionStatus) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('submissionId')
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s))
    setDraggedId(null)
    setDropTarget(null)
  }

  return (
    <div className="flex flex-col gap-6 flex-1 min-h-0 overflow-hidden">
      
      {/* PLAN 1: L'INSPECTEUR SABI (KPI RIBBON) */}
      <SubmissionInspector 
        urgentTask={urgentSubmission ? {
          deadline: urgentSubmission.deadline,
          title: urgentSubmission.title
        } : undefined}
        complianceScore={Math.round(submissions.reduce((acc, s) => acc + s.envelopeA, 0) / (submissions.length || 1))}
        financialSurface="350M"
      />

      {/* PLAN 2: LE FLUX (KANBAN FULL-WIDTH) */}
      <div className="flex flex-col min-w-0 h-full overflow-hidden">
        <div className="flex items-center justify-between mb-6 h-6 shrink-0">
          <h2 className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.3em] flex items-center gap-3">
            Cycle de Vie des Plis — Pipeline Industriel
          </h2>
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest">
               {submissions.length} Dossiers en cours d&apos;exécution
             </span>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-6 custom-scrollbar scroll-smooth flex-1 items-start min-h-0">
           {COLUMNS.map((column) => (
               <div 
                key={column.id} 
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={() => setDropTarget(null)}
                onDrop={(e) => handleDrop(e, column.id)}
                className={cn(
                  "w-[300px] shrink-0 flex flex-col h-full bg-muted border border-border/10 rounded-[4px] p-0 transition-all duration-300 group border-t-2 relative",
                  column.color,
                  dropTarget === column.id ? "bg-muted/80 ring-1 ring-primary/20 scale-[1.01]" : ""
                )}
               >
                 {/* Drop Highlight Glow */}
                 {dropTarget === column.id && (
                   <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none rounded-[4px] animate-pulse" />
                 )}

                 {/* Column Head */}
                  <div className="flex items-center justify-between px-3 py-4 shrink-0 border-b border-border/5 bg-background/20">
                    <div className="space-y-1">
                       <h3 className="text-[11px] font-bold text-foreground/40 group-hover:text-foreground/70 transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                          {column.label}
                           <div className="px-1.5 py-0.5 rounded-[4px] bg-muted/20 text-[9px] text-muted-foreground/50 group-hover:text-primary transition-colors">
                            {submissions.filter(s => s.status === column.id).length}
                          </div>
                       </h3>
                       <p className="text-[9px] text-muted-foreground/20 font-bold uppercase tracking-[0.2em]">{column.description}</p>
                    </div>
                    <MoreHorizontal className="h-4 w-4 text-foreground/5 group-hover:text-foreground/20 cursor-pointer" />
                 </div>

                 {/* Column Body */}
                 <div className="space-y-3 p-1.5 overflow-y-auto custom-scrollbar min-h-0 h-full">
                    <AnimatePresence mode="popLayout">
                       {submissions.filter(s => s.status === column.id).map((item) => (
                          <div 
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                            onDragEnd={() => setDraggedId(null)}
                            className={cn(
                              "transition-opacity duration-200",
                              draggedId === item.id ? "opacity-30 scale-95" : "opacity-100"
                            )}
                          >
                           <SoumissionCard item={item as any} />
                          </div>
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
