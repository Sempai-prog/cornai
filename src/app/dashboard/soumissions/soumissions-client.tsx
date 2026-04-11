// ══════════════════════════════════════════
// SABI — Kanban Client (Sprint B.3)
// ══════════════════════════════════════════

"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { SoumissionCard } from "@/components/soumissions/soumission-card"
import { COLONNES_PIPELINE, StatutSoumission } from "@/lib/soumissions/pipeline"

interface Soumission {
  id: string
  appelOffre: {
    reference: string
    intitule: string
    maitreDOuvrage: string
    dateDepot: Date
    montantEstime: number | null
  }
  scoreConformite: number
  statut: StatutSoumission
  isUrgent?: boolean
}

interface SoumissionsClientProps {
  initialSubmissions: Soumission[]
}

export function SoumissionsClient({ initialSubmissions }: SoumissionsClientProps) {
  const [submissions, setSubmissions] = React.useState(initialSubmissions)
  const [draggedId, setDraggedId] = React.useState<string | null>(null)
  const [dropTarget, setDropTarget] = React.useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id)
    e.dataTransfer.setData('submissionId', id)
  }

  const handleDragOver = (e: React.DragEvent, status: StatutSoumission) => {
    e.preventDefault()
    setDropTarget(status)
  }

  const handleDrop = (e: React.DragEvent, status: StatutSoumission) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('submissionId')
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, statut: status } : s))
    setDraggedId(null)
    setDropTarget(null)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ───────────────────────────────────────────────────────────
          1. KANBAN (SCROLLABLE AREA — SPRINT B.3)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-x-auto custom-scrollbar bg-card/10 border-t border-border/5">
        <div className="flex gap-4 p-6 min-w-max h-full items-start">
          {COLONNES_PIPELINE.map(colonne => (
            <div 
              key={colonne.id} 
              onDragOver={(e) => handleDragOver(e, colonne.id)}
              onDragLeave={() => setDropTarget(null)}
              onDrop={(e) => handleDrop(e, colonne.id)}
              className={cn(
                "w-72 flex flex-col gap-4 p-0 transition-all duration-300 relative rounded-[4px]",
                dropTarget === colonne.id && "bg-primary/[0.02] ring-1 ring-primary/10"
              )}
            >
              {/* En-tête de colonne */}
              <div className="flex items-center justify-between bg-card p-3 rounded-[4px] border border-border/10 shadow-sm shadow-black/5 shrink-0">
                <div className="space-y-0.5">
                  <h3 className="text-[11px] font-semibold text-foreground uppercase tracking-wider">
                    {colonne.label}
                  </h3>
                  <p className="text-[8px] font-semibold text-muted-foreground/30 uppercase tracking-widest truncate max-w-[180px]">
                    {colonne.description}
                  </p>
                </div>
                <span className="text-[10px] font-semibold tabular-nums text-primary/60 bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-[4px]">
                  {submissions.filter(s => s.statut === colonne.id).length}
                </span>
              </div>

              {/* Cartes */}
              <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar px-1 pb-10 min-h-[300px]">
                <AnimatePresence mode="popLayout">
                    {submissions.filter(s => s.statut === colonne.id).map(soumission => (
                      <div
                        key={soumission.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, soumission.id)}
                        onDragEnd={() => setDraggedId(null)}
                        className={cn(
                          "transition-opacity cursor-grab active:cursor-grabbing",
                          draggedId === soumission.id ? "opacity-20 scale-95" : "opacity-100"
                        )}
                      >
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                        >
                          <SoumissionCard soumission={soumission} />
                        </motion.div>
                      </div>
                   ))}
                </AnimatePresence>

                {submissions.filter(s => s.statut === colonne.id).length === 0 && (
                  <div className="border border-dashed border-border/10 rounded-[4px] p-8 text-center flex flex-col items-center justify-center gap-2 opacity-5">
                    <Plus className="w-5 h-5" />
                    <p className="text-[10px] font-semibold uppercase tracking-widest">
                      Néant
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
