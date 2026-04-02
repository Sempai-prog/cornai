"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Clock, 
  ShieldAlert, 
  Zap, 
  ChevronRight,
  Info,
  Activity,
  Wallet
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SABI_COPY } from "@/lib/SabiCopy"

export function SubmissionInspector() {
  const [isSimulating, setIsSimulating] = React.useState(false)

  const handleSimulateColeps = () => {
    setIsSimulating(true)
    setTimeout(() => setIsSimulating(false), 3000)
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 border border-border/10 divide-y md:divide-y-0 md:divide-x divide-border/10 rounded-[4px] bg-card shadow-none overflow-hidden mb-8">
      {/* KPI 1 : URGENCE FORCLUSION */}
      <div className="flex flex-col justify-center p-5 hover:bg-muted transition-all group relative overflow-hidden">
        <div className="flex items-center gap-2.5 mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
          <Clock className="h-4 w-4 text-red-500" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground truncate">
            {SABI_COPY.DASHBOARD.STATS.ALERTS}
          </span>
        </div>

        <div className="flex items-baseline gap-3 leading-none relative z-10">
          <span className="text-3xl font-semibold tracking-tighter text-red-500">
            J-04
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-foreground/30 truncate">
            MINTP Tronçon Mbalmayo
          </span>
        </div>
        
        {/* Progress overlay hint */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-red-500/20 w-full overflow-hidden">
           <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: "80%" }} 
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-red-500" 
           />
        </div>
      </div>

      {/* KPI 2 : BLINDAGE ADMINISTRATIF */}
      <div className="flex flex-col justify-center p-5 hover:bg-muted transition-all group">
        <div className="flex items-center gap-2.5 mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
          <ShieldAlert className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground truncate">
            {SABI_COPY.DASHBOARD.STATS.COMPLIANCE}
          </span>
        </div>

        <div className="flex items-baseline gap-3 leading-none">
          <span className="text-3xl font-semibold tracking-tighter text-foreground">
            100%
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-500">
            Dossier FEICOM Sécurisé
          </span>
        </div>
      </div>

      {/* KPI 3 : SURFACE FINANCIÈRE */}
      <div className="flex flex-col justify-center p-5 hover:bg-muted transition-all group">
        <div className="flex items-center gap-2.5 mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
          <Wallet className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground truncate">
            {SABI_COPY.DASHBOARD.STATS.FINANCIAL_SURFACE}
          </span>
        </div>

        <div className="flex items-baseline gap-3 leading-none">
          <span className="text-3xl font-semibold tracking-tighter text-foreground">
            1.2B
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-foreground/30">
            Cautions Cumulées (FCFA)
          </span>
        </div>
      </div>

      {/* KPI 4 : ACTION COLEPS (SIMULATEUR) */}
      <div 
        onClick={handleSimulateColeps}
        className={cn(
          "flex flex-col justify-center p-5 transition-all group relative cursor-pointer overflow-hidden",
           isSimulating ? "bg-muted" : "hover:bg-emerald-500/[0.03]"
        )}
      >
        <div className="flex items-center gap-2.5 mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
          <Zap className={cn("h-4 w-4", isSimulating ? "text-muted-foreground animate-pulse" : "text-emerald-500")} />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground truncate">
            Simulation Dépôt COLEPS
          </span>
        </div>

        <div className="flex items-center gap-2 leading-none">
          <AnimatePresence mode="wait">
            {isSimulating ? (
              <motion.div 
                key="simulating"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <Activity className="h-5 w-5 text-emerald-500 animate-spin" />
                <span className="text-xl font-semibold tracking-tight text-emerald-500 italic">Scellage...</span>
              </motion.div>
            ) : (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <span className="text-xl font-bold uppercase tracking-widest text-emerald-500 group-hover:scale-105 transition-transform origin-left">
                  SABILISER LE PLI
                </span>
                <ChevronRight className="h-4 w-4 text-emerald-500/40 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Background glow for simulation */}
        <div className={cn(
          "absolute inset-0 bg-emerald-500/10 pointer-events-none transition-opacity duration-1000",
          isSimulating ? "opacity-100" : "opacity-0"
        )} />
      </div>
    </div>
  )
}
