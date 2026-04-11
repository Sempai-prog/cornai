// ══════════════════════════════════════════
// SABI — Compilation Mémoire Technique (Sprint E.5)
// ══════════════════════════════════════════

'use client'

import * as React from "react"
import { Wand2, Download, CheckCircle2, AlertCircle, FileText, ArrowRight, Loader2, RefreshCcw } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface CompilationClientProps {
  soumissionId: string
  stats: {
    notesCount: number
    equipeCount: number
    materielCount: number
    visiteComplete: boolean
  }
}

export function CompilationClient({
  soumissionId,
  stats
}: CompilationClientProps) {
  const [isGenerating, setIsGenerating] = React.useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulation
    await new Promise(r => setTimeout(r, 2000))
    toast.success("Mémoire Technique généré avec succès !")
    setIsGenerating(false)
  }

  const steps = [
    { 
      label: "Visite de Site", 
      status: stats.visiteComplete ? 'complete' : 'missing',
      msg: stats.visiteComplete ? "Rapport validé" : "Rapport incomplet" 
    },
    { 
      label: "Notes de Terrain", 
      status: stats.notesCount > 0 ? 'complete' : 'warning',
      msg: stats.notesCount > 0 ? `${stats.notesCount} notes transcrites` : "Aucune note audio" 
    },
    { 
      label: "Moyens Humains", 
      status: stats.equipeCount >= 3 ? 'complete' : 'warning', 
      msg: `${stats.equipeCount} experts mobilisés` 
    },
    { 
      label: "Moyens Matériels", 
      status: stats.materielCount >= 3 ? 'complete' : 'warning',
      msg: `${stats.materielCount} engins affectés` 
    }
  ]

  const isReady = stats.visiteComplete && stats.equipeCount > 0 && stats.materielCount > 0

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* COCKPIT DE COMPILATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* STATUT DES COMPOSANTS (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="p-5 bg-card border border-border/10 rounded-[4px] flex items-start gap-4">
                <div className={cn(
                  "mt-1 size-5 rounded-full flex items-center justify-center",
                  step.status === 'complete' ? "bg-emerald-500/20 text-emerald-500" : 
                  step.status === 'warning' ? "bg-amber-500/20 text-amber-500" : "bg-red-500/20 text-red-500"
                )}>
                  {step.status === 'complete' ? <CheckCircle2 className="size-3.5" /> : <AlertCircle className="size-3.5" />}
                </div>
                <div>
                   <h4 className="text-[10px] font-black text-foreground uppercase tracking-widest leading-none mb-1">{step.label}</h4>
                   <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-tighter">{step.msg}</p>
                </div>
              </div>
            ))}
          </div>

          {/* APERÇU IA */}
          <div className="p-8 bg-primary/5 border border-primary/20 rounded-[4px] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <Wand2 className="size-32" />
             </div>
             <div className="relative space-y-4">
                <div className="flex items-center gap-2">
                   <div className="size-2 rounded-full bg-primary animate-pulse" />
                   <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em]">SABI Intelligence Engine</h3>
                </div>
                <p className="text-sm font-medium text-foreground/80 leading-relaxed max-w-xl">
                   Votre mémoire technique sera généré en intégrant les données réelles du terrain : 
                   les contraintes identifiées lors de la visite du site, les performances certifiées de vos engins 
                   et l'adéquation de vos experts avec le cahier des charges.
                </p>
                <div className="flex items-center gap-4 pt-4">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => <div key={i} className="size-6 rounded-full border-2 border-background bg-muted" />)}
                   </div>
                   <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">IA prête pour la rédaction</span>
                </div>
             </div>
          </div>
        </div>

        {/* ACTIONS DE GÉNÉRATION (1/3) */}
        <div className="lg:col-span-1">
          <div className="p-8 bg-card border border-border/10 rounded-[4px] flex flex-col items-center text-center space-y-6 sticky top-8">
             <div className="size-20 rounded-full bg-muted flex items-center justify-center border border-border/10">
                <FileText className="size-10 text-muted-foreground/20" />
             </div>
             
             <div>
                <h3 className="text-sm font-black text-foreground uppercase tracking-widest">Volume technique</h3>
                <p className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-tighter mt-1">
                   Prêt pour compilation COLEPS
                </p>
             </div>

             <div className="w-full space-y-3">
                <button 
                  disabled={!isReady || isGenerating}
                  onClick={handleGenerate}
                  className={cn(
                    "w-full h-12 rounded-[2px] flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                    isReady ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground/30 cursor-not-allowed"
                  )}
                >
                  {isGenerating ? <Loader2 className="size-4 animate-spin" /> : <RefreshCcw className="size-4" />}
                  {isGenerating ? "Compilation..." : "Compiler l'Offre"}
                </button>

                {!isReady && (
                   <div className="flex items-center justify-center gap-2 text-[8px] font-black text-red-500/50 uppercase tracking-widest">
                      <AlertCircle className="size-3" />
                      Données manquantes
                   </div>
                )}
             </div>

             <div className="pt-6 border-t border-border/5 w-full">
                <p className="text-[10px] text-muted-foreground/30 font-bold leading-tight uppercase">
                   Le document sera disponible au format PDF conforme aux exigences du MINMAP.
                </p>
             </div>
          </div>
        </div>

      </div>

    </div>
  )
}
