"use client"

import * as React from "react"
import { 
  ShieldCheck, 
  Users2, 
  Construction, 
  Wallet,
  ArrowLeft,
  ChevronRight,
  Zap,
  CheckCircle2,
  AlertCircle,
  Scale,
  CalendarDays,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SABI_COPY } from "@/lib/SabiCopy"

interface TenderInspectorPanelProps {
  item: any
  onStartWorkflow?: () => void
  isInceptionMode?: boolean
  isStarting?: boolean
}

export function TenderInspectorPanel({ 
  item, 
  onStartWorkflow,
  isInceptionMode = false,
  isStarting = false 
}: TenderInspectorPanelProps) {
  if (!item) return null

  // Dans InceptionMode (imbriqué dans un autre panel), on simplifie le layout
  const Container = isInceptionMode ? 'div' : ScrollArea;
  const containerProps = isInceptionMode ? { className: "flex-1" } : { className: "flex-1 px-8 py-6" };

  return (
    <div className={cn(
        "flex flex-col h-auto bg-transparent select-none relative",
        isInceptionMode && "bg-muted/10 border-none"
    )}>
      
      {/* HEADER & RUBAN DE PILOTAGE (Metric Ribbon) */}
      <header className={cn(
        "border-b border-border/10 bg-card",
        isInceptionMode ? "p-6" : "p-8"
      )}>
         {/* Haut : Contexte & Navigation */}
         <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-1">
               <div className="flex items-center gap-2 mb-1">
                  {!isInceptionMode && (
                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-muted text-muted-foreground/60">
                       <ArrowLeft className="h-3 w-3" />
                    </Button>
                  )}
                  <span className="text-[10px] font-semibold text-primary/60 uppercase tracking-[0.2em]">
                     Dossier d&apos;Appel d&apos;Offres
                  </span>
               </div>
               <h2 className="text-lg lg:text-xl font-semibold text-foreground/90 tracking-tight leading-tight max-w-2xl">
                  {item.title}
               </h2>
               <div className="flex items-center gap-3 mt-2 text-muted-foreground/60">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="size-4 text-emerald-500" />
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                      Diagnostic du Blindage (Volume 1)
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Analyse de conformité des pièces administratives par rapport au RPAO. 
                    Calcul de validité des attestations (CNPS, Impôts, Greffe).
                  </p>
               </div>
            </div>

            <div className="hidden lg:flex items-center gap-2">
               <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] px-3 py-1 font-semibold">
                  {item.type || "DAO — NATIONAL"}
               </Badge>
            </div>
         </div>

         {/* Le Ruban de Pilotage (Metric Ribbon) + CTA INCEPTION */}
         <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/10 border border-border/10 rounded-[4px]">
               <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">Budget Prévisionnel</span>
                  <div className="flex items-center gap-2">
                     <Wallet className="h-3.5 w-3.5 text-primary/60" />
                     <span className="text-[13px] font-semibold text-foreground/90">{item.budget || "450M FCFA"}</span>
                  </div>
               </div>
               <div className="flex flex-col gap-1 border-l border-border/10 pl-4">
                  <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">Caution de Soumission</span>
                  <div className="flex items-center gap-2">
                     <Scale className="h-3.5 w-3.5 text-primary/60" />
                     <span className="text-[13px] font-semibold text-foreground/90">{item.cautionSoumission || "9M FCFA"}</span>
                  </div>
               </div>
               <div className="flex flex-col gap-1 border-l border-border/10 pl-4">
                  <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">Délai de Validité</span>
                  <div className="flex items-center gap-2">
                     <CalendarDays className="h-3.5 w-3.5 text-primary/60" />
                     <span className="text-[13px] font-semibold text-foreground/90">90 jours</span>
                  </div>
               </div>
               <div className="flex flex-col gap-1 border-l border-border/10 pl-4 bg-primary/5 -m-4 p-4 rounded-r-[4px]">
                  <span className="text-[10px] font-semibold text-primary/60 uppercase tracking-wider">Verdict IA Expert</span>
                  <div className="flex items-center gap-2">
                     <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                     <span className="text-[13px] font-semibold text-primary tracking-tight">ÉLIGIBLE — SCORE 94%</span>
                  </div>
               </div>
            </div>

            {/* CTA PROPRIÉTAIRE (Visible partout) */}
            <Button
               onClick={(e) => {
                  e.stopPropagation();
                  onStartWorkflow?.();
               }}
               disabled={isStarting}
               className={cn(
                 "w-full h-12 flex items-center justify-between px-6 text-sm font-semibold uppercase tracking-[0.1em] rounded-[4px] border transition-all",
                 item.workflowState === 'montage' || item.workflowState === 'soumis'
                   ? "bg-primary/5 text-primary border-primary/20 hover:bg-primary/10"
                   : "bg-primary text-primary-foreground border-transparent hover:bg-primary/90 shadow-lg shadow-primary/10",
                 isStarting && "opacity-50 cursor-wait"
               )}
            >
               <div className="flex items-center gap-3">
                  {isStarting ? (
                     <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                     <Zap className="h-5 w-5 fill-current" />
                  )}
                  <span>
                     {isStarting ? "Initialisation..." : 
                        (item.workflowState === 'montage' || item.workflowState === 'soumis' 
                           ? "REPRENDRE DOSSIER" 
                           : "PRÉPARER SOUMISSION")}
                  </span>
               </div>
               {!isStarting && <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />}
            </Button>
         </div>
      </header>

      {/* BODY : LE BENTO ASYMÉTRIQUE (La Grille Principale) */}
      <Container {...containerProps}>
         <div className={cn(
            "grid grid-cols-1 lg:grid-cols-12 gap-6",
            isInceptionMode ? "p-6" : "px-8 py-6 pb-32"
         )}>
            
            {/* CARTE 1 : L'ENVELOPPE B (TECHNIQUE) -> LA PIÈCE MAITRESSE (col-span-8) */}
            <div className="lg:col-span-8 flex flex-col h-auto bg-card border border-border/10 rounded-[4px] p-6">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex flex-col gap-1">
                     <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest">Enveloppe B</span>
                     <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-tight">Analyse & Exigences Techniques</h3>
                  </div>
                  <Badge variant="outline" className="border-primary/20 text-primary text-[9px] h-5">Poids : 60%</Badge>
               </div>

               {/* Sous-Bento Interne (Technique) */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* Bloc Personnel */}
                  <div className="flex flex-col gap-4">
                     <div className="flex items-center gap-2 text-muted-foreground/40">
                        <Users2 className="h-3.5 w-3.5" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">Personnel Clé</span>
                     </div>
                     <ul className="space-y-3">
                        <li className="flex flex-col p-3 bg-muted/10 border border-border/10 rounded-[4px]">
                           <span className="text-[11px] font-semibold text-foreground/80 lowercase">Ingénieur du Marché (10 ans xp)</span>
                        </li>
                        <li className="flex flex-col p-3 bg-muted/10 border border-border/10 rounded-[4px]">
                           <span className="text-[11px] font-semibold text-foreground/80 lowercase">Conducteur de Travaux (05 ans xp)</span>
                        </li>
                     </ul>
                  </div>

                  {/* Bloc Matériel */}
                  <div className="flex flex-col gap-4">
                     <div className="flex items-center gap-2 text-muted-foreground/40">
                        <Construction className="h-3.5 w-3.5" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">Logistique & Matériel</span>
                     </div>
                      <ul className="space-y-3">
                         <li className="flex flex-col p-3 bg-muted/10 border border-border/10 rounded-[4px]">
                            <span className="text-[11px] font-semibold text-foreground/80 lowercase">Véhicule de liaison 4x4</span>
                         </li>
                         <li className="flex flex-col p-3 bg-muted/10 border border-border/10 rounded-[4px]">
                            <span className="text-[11px] font-semibold text-foreground/80 lowercase">Station de travail DAO/CAO</span>
                         </li>
                      </ul>
                   </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="size-4 text-blue-500" />
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                      {SABI_COPY.NAVIGATION.OFFRE_FINANCIERE} (Volume 3)
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Estimation du BPU/DQE. Vérification de la cohérence des prix unitaires 
                    par rapport aux moyennes de marché enregistrées par SABI.
                  </p>
                  <div className="p-4 rounded-[4px] bg-primary/5 border border-primary/10 mt-4">
                     <p className="text-[12px] text-muted-foreground/60 leading-relaxed italic">
                        "L&apos;offre technique exige une note de 75/100 pour l&apos;ouverture financière. Le planning doit impérativement être fourni sous MS Project ou format équivalent."
                     </p>
                  </div>
               </div>
            </div>

            {/* COLONNE DE DROITE (col-span-4) : STACK ADMINISTRATIF & FINANCIER */}
            <div className="lg:col-span-4 flex flex-col gap-6">
               
                {/* CARTE 2 : L'ENVELOPPE A (ADMINISTRATIVE) */}
                <div className="flex flex-col h-auto bg-card border border-border/10 rounded-[4px] p-6">
                   <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest mb-1">Enveloppe A</span>
                   <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-tight mb-6">Conformité Administrative</h3>
                  
                  <div className="flex flex-col gap-2">
                      {item.conformitePME.enveloppeA.pieces.map((piece: any, idx: number) => (
                         <div key={idx} className="flex items-center justify-between p-3 rounded-[4px] border border-border/10 bg-muted/10 hover:bg-muted/20 transition-all">
                            <span className="text-[11px] font-semibold text-muted-foreground/60 truncate pr-4">{piece.name}</span>
                            {piece.status === 'valid' ? (
                               <CheckCircle2 className="h-3 w-3 text-primary" />
                            ) : (
                               <AlertCircle className="h-3 w-3 text-red-500" />
                            )}
                         </div>
                      ))}
                  </div>
               </div>

                {/* CARTE 3 : L'ENVELOPPE C (FINANCIÈRE) */}
                <div className="flex flex-col h-auto bg-card border border-border/10 rounded-[4px] p-6">
                   <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest mb-1">Enveloppe C</span>
                   <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-tight mb-6">Dossier Financier</h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                     <div className="p-3 bg-primary/5 border border-primary/10 rounded-[4px]">
                        <span className="text-[9px] font-semibold text-primary/60 uppercase tracking-widest block mb-1">BPU / DQE</span>
                        <div className="flex items-center gap-2">
                           <ShieldCheck className="h-3 w-3 text-primary" />
                           <span className="text-[11px] font-semibold text-primary uppercase">Format Vérifié</span>
                        </div>
                     </div>
                      <div className="p-3 bg-muted/10 border border-border/10 rounded-[4px]">
                         <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest block mb-1">Analyse des prix</span>
                         <span className="text-[11px] font-semibold text-muted-foreground/60 capitalize whitespace-nowrap">Conforme aux prix de référence</span>
                      </div>
                  </div>
               </div>
            </div>

         </div>
      </Container>

      {/* STICKY FOOTER : ACTION PRIMAIRE — ONLY IN SIDEBAR PANEL TO AVOID INCEPTION COLLISIONS */}
      {/* FOOTER : ACTION PRIMAIRE (Sticky) */}
      {!isInceptionMode && (
         <div className="absolute bottom-0 left-0 right-0 p-8 bg-background z-20 pt-16">
            <Button 
               onClick={onStartWorkflow}
               disabled={isStarting}
               className={cn(
                 "w-full h-14 rounded-[4px] bg-primary text-primary-foreground text-[13px] font-semibold border-none hover:bg-primary/90 transition-all flex items-center justify-between px-8 group shadow-none",
                 isStarting && "opacity-50 cursor-wait"
               )}
            >
               <div className="flex items-center gap-3">
                  {isStarting ? (
                     <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                     <Zap className="h-5 w-5 fill-current" />
                  )}
                  {isStarting ? "CHARGEMENT..." : 
                     (item.workflowState === 'montage' || item.workflowState === 'soumis' 
                        ? "REPRENDRE LE DOSSIER EN COURS" 
                        : "CRÉER LE DOSSIER DE RÉPONSE")}
               </div>
               {!isStarting && <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
            </Button>
        </div>
      )}
    </div>
  );
}
