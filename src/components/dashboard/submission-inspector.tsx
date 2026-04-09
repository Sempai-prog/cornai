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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 bg-card border border-border/10 rounded-[4px] shadow-none overflow-hidden mb-8">
      {/* KPI 1 : URGENCE FORCLUSION */}
      <div className={cn(
        "flex items-center gap-4 px-4 py-4 rounded-[4px] transition-all duration-300 relative group border",
        urgentTask ? "bg-red-500/5 text-foreground border-red-500/10" : "bg-muted/10 text-foreground border-transparent hover:bg-muted/30 hover:border-border/50"
      )}>
        {urgentTask && (
          <div className="absolute bottom-1.5 left-1.5 right-1.5 h-[1.5px] bg-red-500/80" />
        )}
        
        <div className="relative shrink-0">
          <Clock className={cn("w-5 h-5 transition-all duration-300", urgentTask ? "text-red-500 scale-110" : "text-muted-foreground/40 group-hover:text-primary group-hover:scale-110")} />
          <div className={cn("absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-card z-10", urgentTask ? "bg-red-500" : "bg-muted-foreground/20")} />
        </div>
        
        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] leading-none truncate w-full mb-1 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
            {SABI_COPY.DASHBOARD.STATS.ALERTS}
          </span>
          <div className="flex items-baseline gap-2.5 w-full">
            <span className="text-xl font-bold tracking-tight text-foreground leading-none">
              {urgentTask ? formatDateline(urgentTask.deadline).split(' ')[0] : "N/A"}
            </span>
            <span className={cn("text-[8px] font-bold uppercase tracking-tight transition-colors truncate", urgentTask ? "text-red-500/70" : "text-muted-foreground/50 group-hover:text-muted-foreground/80")}>
              {urgentTask?.title || "Aucun dossier urgent"}
            </span>
          </div>
        </div>
      </div>

      {/* KPI 2 : BLINDAGE ADMINISTRATIF */}
      <div className={cn(
        "flex items-center gap-4 px-4 py-4 rounded-[4px] transition-all duration-300 relative group border",
        "bg-muted/10 text-foreground border-transparent hover:bg-muted/30 hover:border-border/50"
      )}>
        {complianceScore >= 100 && (
          <div className="absolute bottom-1.5 left-1.5 right-1.5 h-[1.5px] bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
        
        <div className="relative shrink-0">
          <ShieldAlert className="w-5 h-5 transition-all duration-300 text-muted-foreground/40 group-hover:text-primary group-hover:scale-110" />
          <div className={cn("absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-card z-10", complianceScore >= 100 ? "bg-primary" : "bg-amber-500")} />
        </div>
        
        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] leading-none truncate w-full mb-1 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
            {SABI_COPY.DASHBOARD.STATS.COMPLIANCE}
          </span>
          <div className="flex items-baseline gap-2.5 w-full h-6 overflow-hidden">
            <span className="text-xl font-bold tracking-tight text-foreground leading-none tabular-nums">
              {complianceScore}%
            </span>
            <span className={cn("text-[8px] font-bold uppercase tracking-tight transition-colors truncate", complianceScore >= 100 ? "text-primary/70" : "text-amber-500/70")}>
              {complianceScore >= 100 ? "Dossier Sécurisé" : "Carence Détectée"}
            </span>
          </div>
        </div>
      </div>

      {/* KPI 3 : SURFACE FINANCIÈRE */}
      <div className={cn(
        "flex items-center gap-4 px-4 py-4 rounded-[4px] transition-all duration-300 relative group border",
        "bg-muted/10 text-foreground border-transparent hover:bg-muted/30 hover:border-border/50"
      )}>
        <div className="relative shrink-0">
          <Wallet className="w-5 h-5 transition-all duration-300 text-muted-foreground/40 group-hover:text-primary group-hover:scale-110" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-card z-10 bg-muted-foreground/20" />
        </div>
        
        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] leading-none truncate w-full mb-1 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
            {SABI_COPY.DASHBOARD.STATS.FINANCIAL_SURFACE}
          </span>
          <div className="flex items-baseline gap-2.5 w-full h-6 overflow-hidden">
            <span className="text-xl font-bold tracking-tight text-foreground leading-none tabular-nums">
              {financialSurface}
            </span>
            <span className="text-[8px] font-bold uppercase tracking-tight transition-colors truncate text-muted-foreground/50 group-hover:text-muted-foreground/80">
               Cautions Cumulées
            </span>
          </div>
        </div>
      </div>

      {/* KPI 4 : ACTION COLEPS (SIMULATEUR) */}
      <div 
        onClick={handleSimulateColeps}
        className={cn(
          "flex items-center gap-4 px-4 py-4 rounded-[4px] transition-all duration-300 relative group border cursor-pointer overflow-hidden",
          isSimulating ? "bg-muted/50 text-foreground border-transparent" : "bg-emerald-500/5 text-foreground border-emerald-500/20 hover:bg-emerald-500/10"
        )}
      >
        <div className="absolute bottom-1.5 left-1.5 right-1.5 h-[1.5px] bg-emerald-500/80 opacity-50 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative shrink-0">
          <Zap className={cn("w-5 h-5 transition-all duration-300", isSimulating ? "text-emerald-500 animate-pulse" : "text-emerald-500 scale-110")} />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-card z-10 bg-emerald-500" />
        </div>
        
        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] leading-none truncate w-full mb-1 text-emerald-500/60 group-hover:text-emerald-500/80 transition-colors">
            Dossier Prêt ? Scellage COLEPS
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
                  <Activity className="h-3 w-3 text-emerald-500 animate-spin" />
                  <span className="text-lg font-bold tracking-tight text-emerald-500 italic">Signature...</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-lg font-bold uppercase tracking-tight text-emerald-500">
                    SABILISER LE PLI
                  </span>
                  <ChevronRight className="h-4 w-4 text-emerald-500/40 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
