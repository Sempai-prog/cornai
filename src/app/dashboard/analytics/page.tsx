// ══════════════════════════════════════════
// SABI — Analytics & Business Intelligence
// ══════════════════════════════════════════

import * as React from "react"
import { BarChart3, Lock, Zap } from "lucide-react"
import { StandardPageHeader } from "@/components/layout/standard-page-header"
import { Badge } from "@/components/ui/badge"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 antialiased bg-transparent p-0 lg:p-1">
      
      <StandardPageHeader
        title="Intelligence Marché"
        metadata="Analytics — Vue Décisionnelle"
        description={
          <p>
            Analyse prédictive des tendances de la commande publique. 
            <span className="block mt-1">
              Data-mining ARMP & COLEPS — Bêta Fermée.
            </span>
          </p>
        }
        cardA={{
          label: "VISIBILITÉ",
          value: "BÊTA",
          subtext: "Accès Restreint",
          color: "blue",
        }}
        cardB={{
          label: "PUISSANCE",
          value: "--",
          subtext: "Chargement...",
          color: "emerald",
        }}
      />

      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] bg-card border border-border/10 rounded-[4px] border-dashed">
         <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative h-16 w-16 bg-muted/20 border border-primary/20 rounded-[4px] flex items-center justify-center">
               <Lock className="h-8 w-8 text-primary/40" />
            </div>
         </div>
         
         <div className="text-center space-y-2 max-w-sm px-6">
            <Badge className="bg-primary/10 text-primary border-none shadow-none text-[10px] uppercase tracking-[0.2em] mb-4">
              Coming Soon
            </Badge>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Module en cours de déploiement</h2>
            <p className="text-[11px] text-foreground/40 font-medium leading-relaxed uppercase tracking-widest">
              L'IA prédictive SABI arrive prochainement pour automatiser votre veille stratégique.
            </p>
         </div>

         <div className="mt-8 flex items-center gap-4 text-[10px] font-bold text-foreground/20 uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2">
               <Zap size={12} className="text-primary/40" />
               Précision 98%
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            <div>Q3 2026</div>
         </div>
      </div>
    </div>
  )
}
