// ══════════════════════════════════════════
// CORNAi — Inspecteur Latéral Expert (Phase 3 — Deep Dive / Inception Ready)
// ══════════════════════════════════════════

"use client"

import * as React from "react"
import { 
  Building2, 
  Wallet,
  CheckCircle2,
  AlertCircle,
  FileSearch,
  HardHat,
  ChevronRight,
  Zap,
} from "lucide-react"
import { SearchResult } from "./search-types"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TenderInspectorPanelProps {
  item: SearchResult
  onStartWorkflow: () => void
  isInceptionMode?: boolean
}

export function TenderInspectorPanel({ item, onStartWorkflow, isInceptionMode }: TenderInspectorPanelProps) {
  const Container = isInceptionMode ? 'div' : ScrollArea;
  const containerProps = isInceptionMode ? { className: "flex-1" } : { className: "flex-1 px-8 py-6" };

  return (
    <div className={cn(
        "flex flex-col h-auto bg-transparent select-none relative",
        isInceptionMode && "bg-muted/10 border-none"
    )}>
      
      {/* HEADER : RÉFÉRENCIEL & CONTEXTE */}
      <header className={cn(
        "border-b border-border/40 bg-card/10",
        isInceptionMode ? "p-6" : "p-8"
      )}>
         <div className="flex flex-col gap-1.5 mb-6">
            <span className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em]">Dossier d&apos;Appel d&apos;Offres (DAO)</span>
            <h2 className="text-[16px] font-semibold text-foreground/90 leading-snug tracking-tight">
               {item.title}
            </h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
               <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/20">Autorité Contractante</span>
               <div className="flex items-center gap-2 text-foreground/60">
                  <Building2 className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-tight">{item.authority}</span>
               </div>
            </div>
            <div className="flex flex-col gap-1">
               <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/20">Financement</span>
               <div className="flex items-center gap-2 text-foreground/60">
                  <Wallet className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-tight">{item.financement || "BIP 2026"}</span>
               </div>
            </div>
         </div>
      </header>

      {/* BODY : LES 3 ENVELOPPES (DEEP DIVE) */}
      <Container {...containerProps}>
         <div className={cn(
            "flex flex-col pb-12",
            isInceptionMode ? "p-6 space-y-6" : "gap-4"
         )}>
            
            {/* GRID DES ENVELOPPES - 3 COLONNES EN MODE INCEPTION */}
            <div className={cn(
                "grid gap-8",
                isInceptionMode ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1"
            )}>
                {/* SECTION A : PIÈCES ADMINISTRATIVES */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Badge className="h-5 rounded-[2px] bg-muted px-2 text-[9px] font-black text-foreground/40 uppercase tracking-widest shadow-none border-none">Enveloppe A</Badge>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/30">Dossier Administratif</h3>
                        {!isInceptionMode && <div className="flex-1 h-px bg-border/20" />}
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                        {item.conformitePME.enveloppeA.pieces.map((piece, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3.5 rounded-[4px] border border-border/40 bg-card/40 hover:border-border/60 transition-all group">
                            <div className="flex items-center gap-3">
                                {piece.status === 'valid' ? (
                                    <CheckCircle2 className="h-3.5 w-3.5 text-primary opacity-60" />
                                ) : (
                                    <AlertCircle className="h-3.5 w-3.5 text-red-500 opacity-60" />
                                )}
                                <span className="text-[11px] font-bold uppercase text-foreground/60 group-hover:text-foreground/90 transition-colors tracking-tight">{piece.name}</span>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION B : OFFRE TECHNIQUE */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Badge className="h-5 rounded-[2px] bg-muted px-2 text-[9px] font-black text-foreground/40 uppercase tracking-widest shadow-none border-none">Enveloppe B</Badge>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/30">Offre Technique</h3>
                        {!isInceptionMode && <div className="flex-1 h-px bg-border/20" />}
                    </div>

                    <div className="p-5 rounded-[4px] border border-primary/20 bg-primary/5 relative overflow-visible h-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <HardHat className="h-4 w-4 text-primary opacity-60" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Exigences CCTP</span>
                        </div>
                        <ul className="space-y-3">
                            {item.conformitePME.enveloppeB.exigences.map((req, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                                <div className="h-1 w-1 rounded-full bg-primary shrink-0" />
                                <p className="text-[11px] font-bold uppercase tracking-tight text-foreground/70 leading-none">{req}</p>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* SECTION C : OFFRE FINANCIÈRE */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Badge className="h-5 rounded-[2px] bg-muted px-2 text-[9px] font-black text-foreground/40 uppercase tracking-widest shadow-none border-none">Enveloppe C</Badge>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/30">Dossier Financier</h3>
                        {!isInceptionMode && <div className="flex-1 h-px bg-border/20" />}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-muted/20 border border-border/40 rounded-[4px] group">
                            <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-[0.2em] block mb-2">BPU — Statut</span>
                            <div className="flex items-center gap-2">
                                <Zap className="h-3 w-3 text-primary" />
                                <span className="text-[11px] font-black text-primary uppercase tracking-[0.1em]">{item.conformitePME.enveloppeC.bpuStatus}</span>
                            </div>
                        </div>
                        <div className="p-4 bg-muted/20 border border-border/40 rounded-[4px] group">
                            <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-[0.2em] block mb-2">DQE — Calcul</span>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-3.5 w-3.5 text-primary/40" />
                                <span className="text-[11px] font-black text-foreground/30 uppercase tracking-[0.1em]">Prêt</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

         </div>
      </Container>

      {/* STICKY FOOTER : ACTION PRIMAIRE */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent z-10",
        isInceptionMode && "bg-card"
      )}>
         <Button 
            onClick={onStartWorkflow}
            className="w-full h-12 rounded-[4px] bg-primary text-black text-[12px] font-bold border-none hover:bg-primary/90 shadow-2xl shadow-primary/10 transition-all flex items-center justify-between px-6 group"
         >
            <div className="flex items-center gap-3">
               <FileSearch className="h-5 w-5" />
               DÉMARRER LE DOSSIER (KANBAN)
            </div>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
         </Button>
      </div>

    </div>
  )
}
