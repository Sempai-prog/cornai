"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface SubmissionCardProps {
  item: {
    id: string
    ac: string
    type: string
    title: string
    deadline: string
    envelopeA: number
    envelopeB: number
    envelopeC: number
    isUrgent?: boolean
    budget: string
  }
}

export function SoumissionCard({ item }: SubmissionCardProps) {
  return (
    <motion.div 
      layout
      whileHover={{ y: -1, borderColor: "rgba(var(--primary-rgb), 0.2)" }}
      className={cn(
        "bg-card/60 backdrop-blur-md border border-border/30 rounded-[4px] p-4 cursor-grab transition-all hover:bg-card hover:border-border/50 group",
        item.isUrgent && "border-l-2 border-l-red-500/50"
      )}
    >
       <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 group-hover:text-muted-foreground transition-colors uppercase">
            {item.ac} <span className="opacity-30">/ {item.id}</span>
          </span>
          <Badge className={cn(
            "text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] border-none shadow-none uppercase tracking-widest",
            item.isUrgent ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"
          )}>
            {item.deadline}
          </Badge>
       </div>

       <h4 className="text-[12px] font-semibold text-foreground/80 line-clamp-2 leading-relaxed mb-4 tracking-tight group-hover:text-foreground transition-colors">
          {item.title}
       </h4>

       <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4">
              <EnvelopeIndicator label="A" progress={item.envelopeA} />
              <EnvelopeIndicator label="B" progress={item.envelopeB} />
              <EnvelopeIndicator label="C" progress={item.envelopeC} />
          </div>
          <GripVertical size={12} className="text-muted-foreground/10 group-hover:text-muted-foreground/30 transition-colors" />
       </div>

       <div className="pt-3 border-t border-border/10">
          <div className="flex items-center justify-between">
             <span className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-widest group-hover:text-muted-foreground/50 transition-colors">
                {item.budget}
             </span>
             <Badge className="bg-primary/[0.03] text-primary/40 border border-primary/10 text-[9px] font-bold px-1 py-0.5 rounded-[2px] group-hover:text-primary transition-colors">
                {item.type}
             </Badge>
          </div>
       </div>
    </motion.div>
  )
}

function EnvelopeIndicator({ label, progress }: { label: string, progress: number }) {
  const isDone = progress === 100
  const isPartial = progress > 0 && progress < 100

  return (
    <div className="flex items-center gap-1.5">
       <div className={cn(
         "w-2 h-2 rounded-full",
         isDone ? "bg-primary" : isPartial ? "bg-primary/40 animate-pulse" : "bg-muted/20"
       )} />
       <span className={cn(
         "text-[9px] font-bold uppercase tracking-widest",
         isDone ? "text-foreground" : "text-muted-foreground/30"
       )}>{label}</span>
    </div>
  )
}
