"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { GripVertical, Clock, Building2 } from "lucide-react"
import { cn, formatXAF } from "@/lib/utils"

interface SubmissionCardProps {
  item: {
    id: string
    ac: string
    type: string
    title: string
    deadline: Date
    envelopeA: number
    envelopeB: number
    envelopeC: number
    budget: number
  }
}

export function SoumissionCard({ item }: SubmissionCardProps) {
  const daysLeft = Math.ceil((new Date(item.deadline).getTime() - Date.now()) / 86400000)
  const isUrgent = daysLeft >= 0 && daysLeft <= 3

  return (
    <motion.div 
      layout
      whileHover={{ y: -1 }}
      className={cn(
        "bg-card border border-border/10 rounded-[4px] p-3 cursor-grab transition-all hover:border-primary/20 group shadow-none relative overflow-hidden",
        isUrgent && "border-l-2 border-l-red-500"
      )}
    >
       <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/20 group-hover:text-primary/60 transition-colors truncate max-w-[180px]">
            {item.ac}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
             <span className="text-[9px] font-mono text-muted-foreground/30 tabular-nums">
                #{item.id}
             </span>
          </div>
       </div>

       <h4 className="text-[12px] font-semibold text-foreground/80 line-clamp-2 leading-snug mb-3 tracking-tight group-hover:text-foreground transition-colors">
          {item.title}
       </h4>

       <div className="flex items-center gap-4 mb-3">
          <div className="flex gap-3">
              <EnvelopeIndicator label="A" progress={item.envelopeA} />
              <EnvelopeIndicator label="B" progress={item.envelopeB} />
              <EnvelopeIndicator label="C" progress={item.envelopeC} />
          </div>
       </div>

       <div className="pt-2 border-t border-border/10 flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-[10px] font-semibold text-foreground tabular-nums tracking-tighter">
                {formatXAF(item.budget)}
             </span>
             <span className="text-[8px] font-semibold text-muted-foreground/30 uppercase tracking-widest">
                BUDGET PRÉVISIONNEL
             </span>
          </div>
          
          <div className={cn(
            "flex items-center gap-1 text-[9px] font-semibold tracking-widest px-1.5 py-0.5 rounded-[2px] tabular-nums border",
            isUrgent ? "bg-red-500/5 text-red-500 border-red-500/10" : "bg-muted/10 text-muted-foreground/40 border-border/5"
          )}>
            <Clock className="size-2.5" />
            J-{daysLeft < 0 ? 0 : daysLeft}
          </div>
       </div>
    </motion.div>
  )
}

function EnvelopeIndicator({ label, progress }: { label: string, progress: number }) {
  const isDone = progress === 100
  const isPartial = progress > 0 && progress < 100

  return (
    <div className="flex items-center gap-1">
       <div className={cn(
         "w-1.5 h-1.5 rounded-full",
         isDone ? "bg-primary" : isPartial ? "bg-primary/40 animate-pulse" : "bg-muted/10"
       )} />
       <span className={cn(
         "text-[9px] font-semibold uppercase tracking-widest",
         isDone ? "text-foreground/60" : "text-muted-foreground/20"
       )}>{label}</span>
    </div>
  )
}
