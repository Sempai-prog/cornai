"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Clock, 
  ShieldAlert, 
  Zap, 
  ChevronRight,
  Activity,
  Wallet
} from "lucide-react"
import { cn, formatDateline } from "@/lib/utils"
import { SABI_COPY } from "@/lib/SabiCopy"

interface SubmissionInspectorProps {
  urgentTask?: {
    deadline: string | Date
    title: string
  }
  complianceScore?: number
  financialSurface?: string
}

export function SubmissionInspector({ 
  urgentTask, 
  complianceScore = 100, 
  financialSurface = "1.2B" 
}: SubmissionInspectorProps) {
  const [isSimulating, setIsSimulating] = React.useState(false)

  const handleSimulateColeps = () => {
    setIsSimulating(true)
    setTimeout(() => setIsSimulating(false), 3000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-1 bg-card border border-border/10 rounded-[4px] shadow-none overflow-hidden mb-6">
      {/* KPI 1 : URGENCE FORCLUSION */}
      <div className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-[4px] transition-all duration-300 relative group border",
        urgentTask ? "bg-red-500/5 text-foreground border-red-500/10" : "bg-muted/10 text-foreground border-transparent hover:bg-muted/30 hover:border-border/50"
      )}>
        {urgentTask && (
          <div className="absolute bottom-1 left-1.5 right-1.5 h-[1px] bg-red-500/60" />
        )}
        
        <div className="relative shrink-0">
          <Clock className={cn("w-4 h-4 transition-all duration-300", urgentTask ? "text-red-500 scale-105" : "text-muted-foreground/40 group-hover:text-primary group-hover:scale-105")} />
        </div>
        
        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className="text-[9px] font-semibold uppercase tracking-[0.1em] leading-none truncate w-full mb-1 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors">
            {SABI_COPY.DASHBOARD.STATS.ALERTS}
          </span>
          <div className="flex items-baseline gap-2 w-full">
            <span className="text-lg font-semibold tracking-tighter text-foreground/80 leading-none">
              {urgentTask ? formatDateline(urgentTask.deadline).split(' ')[0] : "N/A"}
            </span>
            <span className={cn("text-[8px] font-semibold uppercase tracking-tight transition-colors truncate opacity-60", urgentTask ? "text-red-500" : "text-muted-foreground")}>
              {urgentTask?.title || "Dossier urgent"}
            </span>
          </div>
        </div>
      </div>

      {/* KPI 2 : BLINDAGE ADMINISTRATIF */}
      <div className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-[4px] transition-all duration-300 relative group border",
        "bg-muted/10 text-foreground border-transparent hover:bg-muted/30 hover:border-border/50"
      )}>
        <div className="relative shrink-0">
          <ShieldAlert className="w-4 h-4 transition-all duration-300 text-muted-foreground/40 group-hover:text-primary group-hover:scale-105" />
        </div>
        
        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className="text-[9px] font-semibold uppercase tracking-[0.1em] leading-none truncate w-full mb-1 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors">
            {SABI_COPY.DASHBOARD.STATS.COMPLIANCE}
          </span>
          <div className="flex items-baseline gap-2 w-full h-5 overflow-hidden">
            <span className="text-lg font-semibold tracking-tighter text-foreground/80 leading-none tabular-nums">
              {complianceScore}%
            </span>
            <span className={cn("text-[8px] font-semibold uppercase tracking-tight transition-colors truncate opacity-60", complianceScore >= 100 ? "text-primary" : "text-amber-500")}>
              {complianceScore >= 100 ? "Sécurisé" : "Carence"}
            </span>
          </div>
        </div>
      </div>

      {/* KPI 3 : SURFACE FINANCIÈRE */}
      <div className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-[4px] transition-all duration-300 relative group border",
        "bg-muted/10 text-foreground border-transparent hover:bg-muted/30 hover:border-border/50"
      )}>
        <div className="relative shrink-0">
          <Wallet className="w-4 h-4 transition-all duration-300 text-muted-foreground/40 group-hover:text-primary group-hover:scale-105" />
        </div>
        
        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className="text-[9px] font-semibold uppercase tracking-[0.1em] leading-none truncate w-full mb-1 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors">
            {SABI_COPY.DASHBOARD.STATS.FINANCIAL_SURFACE}
          </span>
          <div className="flex items-baseline gap-2 w-full h-5 overflow-hidden">
            <span className="text-lg font-semibold tracking-tighter text-foreground/80 leading-none tabular-nums">
              {financialSurface}
            </span>
            <span className="text-[8px] font-semibold uppercase tracking-tight transition-colors truncate text-muted-foreground opacity-60">
               Cautions
            </span>
          </div>
        </div>
      </div>

      {/* KPI 4 : ACTION COLEPS (SIMULATEUR) */}
      <div 
        onClick={handleSimulateColeps}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-[4px] transition-all duration-300 relative group border cursor-pointer overflow-hidden",
          isSimulating ? "bg-muted/50 text-foreground border-transparent" : "bg-emerald-500/5 text-foreground border-emerald-500/20 hover:bg-emerald-500/10"
        )}
      >
        <div className="relative shrink-0">
          <Zap className={cn("w-4 h-4 transition-all duration-300", isSimulating ? "text-emerald-500 animate-pulse" : "text-emerald-500 scale-105")} />
        </div>
        
        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className="text-[9px] font-semibold uppercase tracking-[0.1em] leading-none truncate w-full mb-1 text-emerald-500/60 group-hover:text-emerald-500/80 transition-colors">
            SCELLAGE COLEPS
          </span>
          <div className="flex items-center gap-2 leading-none w-full">
             <AnimatePresence mode="wait">
              {isSimulating ? (
                <motion.div 
                  key="simulating"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  <Activity className="h-2.5 w-2.5 text-emerald-500 animate-spin" />
                  <span className="text-base font-semibold tracking-tighter text-emerald-500 italic">Signature...</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-base font-semibold uppercase tracking-tighter text-emerald-500">
                    SABILISER
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-emerald-500/40 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
