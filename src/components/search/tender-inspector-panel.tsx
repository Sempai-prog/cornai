// ══════════════════════════════════════════
// CORNAi — Inspecteur Latéral Expert (Phase 3 — Deep Dive)
// ══════════════════════════════════════════

"use client"

import * as React from "react"
import { 
  Building2, 
  Wallet,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  FileSearch,
  HardHat,
  ChevronRight,
  Zap,
  Info
} from "lucide-react"
import { SearchResult } from "./search-types"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TenderInspectorPanelProps {
  item: SearchResult
  onStartWorkflow: () => void
}

export function TenderInspectorPanel({ item, onStartWorkflow }: TenderInspectorPanelProps) {
  return (
    <div className="flex flex-col h-full bg-transparent select-none relative">
      
      {/* HEADER : RÉFÉRENCIEL & CONTEXTE */}
      <header className="p-8 border-b border-white/5 bg-white/[0.01]">
         <div className="flex flex-col gap-1.5 mb-6">
            <span className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em]">Dossier d'Appel d'Offres (DAO)</span>
            <h2 className="text-[16px] font-semibold text-foreground/90 leading-snug tracking-tight">
               {item.title}
            </h2>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
               <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/20">Autorité Contractante</span>
               <div className="flex items-center gap-2 text-foreground/60">
                  <Building2 className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-medium">{item.authority}</span>
               </div>
            </div>
            <div className="flex flex-col gap-1">
               <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/20">Financement</span>
               <div className="flex items-center gap-2 text-foreground/60">
                  <Wallet className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-medium">{item.financement || "BIP 2026"}</span>
               </div>
            </div>
         </div>
      </header>

      {/* BODY : LES 3 ENVELOPPES (DEEP DIVE) */}
      <ScrollArea className="flex-1 px-8 py-6">
         <div className="space-y-12 pb-32">
            
            {/* SECTION A : PIÈCES ADMINISTRATIVES */}
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <Badge className="h-5 rounded-[2px] bg-white/5 px-2 text-[9px] font-black text-foreground/40 uppercase tracking-widest">Enveloppe A</Badge>
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/30">Dossier Administratif</h3>
                  <div className="flex-1 h-px bg-white/5" />
               </div>

               <div className="grid grid-cols-1 gap-2.5">
                  {item.conformitePME.enveloppeA.pieces.map((piece, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 rounded-[4px] border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all group">
                       <div className="flex items-center gap-3">
                          {piece.status === 'valid' ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary opacity-60" />
                          ) : (
                            <AlertCircle className="h-3.5 w-3.5 text-red-500 opacity-60" />
                          )}
                          <span className="text-[11px] font-medium text-foreground/60 group-hover:text-foreground/90 transition-colors">{piece.name}</span>
                       </div>
                       <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter opacity-40">
                          {piece.status === 'valid' ? '🟢 OK' : piece.status === 'expiring' ? `🔴 Exp. ${piece.expiry}` : '❌ Manquant'}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* SECTION B : OFFRE TECHNIQUE */}
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <Badge className="h-5 rounded-[2px] bg-white/5 px-2 text-[9px] font-black text-foreground/40 uppercase tracking-widest">Enveloppe B</Badge>
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/30">Conformité Technique</h3>
                  <div className="flex-1 h-px bg-white/5" />
               </div>

               <div className="p-5 rounded-[4px] border border-primary/20 bg-primary/5 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-4">
                     <HardHat className="h-4 w-4 text-primary opacity-60" />
                     <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Exigences CCTP / Matériel</span>
                  </div>
                  <ul className="space-y-3">
                     {item.conformitePME.enveloppeB.exigences.map((req, idx) => (
                       <li key={idx} className="flex items-start gap-3">
                          <div className="h-1 w-1 rounded-full bg-primary mt-1.5 shrink-0" />
                          <p className="text-[11px] font-medium text-foreground/70 leading-snug">{req}</p>
                       </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* SECTION C : OFFRE FINANCIÈRE */}
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <Badge className="h-5 rounded-[2px] bg-white/5 px-2 text-[9px] font-black text-foreground/40 uppercase tracking-widest">Enveloppe C</Badge>
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/30">Dossier Financier</h3>
                  <div className="flex-1 h-px bg-white/5" />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-[4px] group">
                     <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-[0.2em] block mb-2">BPU — Statut</span>
                     <div className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-primary" />
                        <span className="text-[11px] font-black text-primary uppercase">{item.conformitePME.enveloppeC.bpuStatus}</span>
                     </div>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-[4px] group">
                     <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-[0.2em] block mb-2">DQE — Calcul</span>
                     <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-primary/40" />
                        <span className="text-[11px] font-black text-foreground/30 uppercase">Prêt</span>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </ScrollArea>

      {/* STICKY FOOTER : ACTION PRIMAIRE */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pt-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c] to-transparent">
         <Button 
            onClick={onStartWorkflow}
            className="w-full h-14 rounded-[4px] bg-primary text-black text-[12px] font-bold border-none hover:bg-primary/90 shadow-2xl shadow-primary/10 transition-all flex items-center justify-between px-6 group"
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
