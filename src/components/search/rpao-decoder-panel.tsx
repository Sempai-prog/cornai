"use client"

import * as React from "react"
import { 
  ShieldCheck, 
  Flame,
  AlertOctagon,
  Scale,
  CalendarDays,
  FileText,
  CheckCircle2,
  Users2,
  Construction,
  Briefcase,
  ChevronRight,
  Zap,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface RpaoDecoderPanelProps {
  item: any
  onStartWorkflow?: () => void
  isInceptionMode?: boolean
  isStarting?: boolean
}

export function RpaoDecoderPanel({ 
  item, 
  onStartWorkflow,
  isInceptionMode = false,
  isStarting = false 
}: RpaoDecoderPanelProps) {
  if (!item) return null

  const Container = isInceptionMode ? 'div' : ScrollArea;
  const containerProps = isInceptionMode ? { className: "flex-1" } : { className: "flex-1 px-8 py-6" };

  return (
    <div className={cn(
        "flex flex-col h-auto bg-transparent select-none relative",
        isInceptionMode && "bg-muted/5 border-none"
    )}>
      
      {/* ───────────────────────────────────────────────────────────
          HEADER : CONTEXTE RPAO
          ─────────────────────────────────────────────────────────── */}
      <header className={cn(
        "border-b border-border/10 bg-card",
        isInceptionMode ? "p-6" : "p-8"
      )}>
         <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-1">
               <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-[0.2em] px-2 py-0.5 bg-primary/5 rounded-[2px]">
                     Pièce n°3 — RPAO
                  </span>
                  <span className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-[0.1em]">
                     Décodage Intelligence Artificielle
                  </span>
               </div>
               <h2 className="text-lg lg:text-xl font-semibold text-foreground tracking-tight leading-tight max-w-2xl">
                  Règlement Particulier de l&apos;Appel d&apos;Offres
               </h2>
               <div className="flex items-center gap-3 mt-3">
                  <Flame className="size-4 text-primary animate-pulse" />
                  <p className="text-xs text-muted-foreground font-medium">
                     Extraction dynamique des critères d&apos;évaluation et conditions de rejet.
                  </p>
               </div>
            </div>
            
            <div className="hidden lg:flex flex-col items-end gap-1">
               <Badge variant="outline" className="border-primary/20 text-primary font-semibold text-[9px] px-3">
                  STANDARD ARMP V1.6
               </Badge>
               <span className="text-[9px] font-semibold text-muted-foreground/30 uppercase tracking-tighter">Révision : Avril 2026</span>
            </div>
         </div>

         {/* METRIC RIBBON */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/20 border border-border/10 rounded-[4px]">
            <div className="flex flex-col gap-1">
               <span className="text-[9px] font-semibold text-muted-foreground/60 uppercase tracking-widest">Type de Marché</span>
               <div className="flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5 text-primary/60" />
                  <span className="text-[12px] font-semibold text-foreground uppercase">{item.sector || "Travaux"}</span>
               </div>
            </div>
            <div className="flex flex-col gap-1 border-l border-border/10 pl-4">
               <span className="text-[9px] font-semibold text-muted-foreground/60 uppercase tracking-widest">Seuil Technique</span>
               <div className="flex items-center gap-2">
                  <Scale className="h-3.5 w-3.5 text-primary/60" />
                  <span className="text-[12px] font-semibold text-foreground">70 / 100 Points</span>
               </div>
            </div>
            <div className="flex flex-col gap-1 border-l border-border/10 pl-4">
               <span className="text-[9px] font-semibold text-muted-foreground/60 uppercase tracking-widest">Mode Dépôt</span>
               <div className="flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5 text-primary/60" />
                  <span className="text-[12px] font-semibold text-foreground uppercase">{item.modeSoumission || "Physique + COLEPS"}</span>
               </div>
            </div>
            <div className="flex flex-col gap-1 border-l border-border/10 pl-4 bg-primary/5 -m-4 p-4 rounded-r-[4px]">
               <span className="text-[9px] font-semibold text-primary/60 uppercase tracking-widest">Confiance Extraction</span>
               <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[12px] font-semibold text-primary tracking-tight">98.5% — CERTIFIÉ</span>
               </div>
            </div>
         </div>
      </header>

      {/* ───────────────────────────────────────────────────────────
          BODY : BENTO RPAO
          ─────────────────────────────────────────────────────────── */}
      <Container {...containerProps}>
         <div className={cn(
            "grid grid-cols-1 lg:grid-cols-12 gap-6",
            isInceptionMode ? "p-6" : "px-8 py-6 pb-32"
         )}>
            
            {/* L'ESSENTIEL (LOGIQUE DE NOTATION) — COL-SPAN-8 */}
            <div className="lg:col-span-8 space-y-6">
               <div className="bg-card border border-border/10 rounded-[4px] p-6">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/5">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center">
                           <FileText className="size-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-widest">Section 3.2</span>
                           <h3 className="text-sm font-semibold text-foreground uppercase tracking-tight">Critères Essentiels (Notation)</h3>
                        </div>
                     </div>
                     <Badge className="bg-primary/5 text-primary border-none font-semibold text-[10px]">TOTAL : 100 PTS</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* Équipe & Experts */}
                     <div className="space-y-4">
                        <div className="flex items-center gap-2 text-muted-foreground/30">
                           <Users2 className="size-4" />
                           <span className="text-[10px] font-semibold uppercase tracking-wider">Personnel Exigé</span>
                        </div>
                        <div className="space-y-2">
                           {[
                              { label: "Directeur de Projet", sub: "Ingénieur de Génie Civil, 10 ans d'ancienneté", pts: "15 pts" },
                              { label: "Conducteur des Travaux", sub: "Technicien Supérieur, 05 ans minimum", pts: "10 pts" },
                              { label: "Chef Chantier", sub: "05 ans d'expérience en travaux routiers", pts: "05 pts" }
                           ].map((p, i) => (
                              <div key={i} className="flex items-center justify-between p-3 rounded-[2px] bg-muted/5 border border-border/5 group hover:border-primary/20 transition-all">
                                 <div className="flex flex-col">
                                    <span className="text-[11px] font-semibold text-foreground/80">{p.label}</span>
                                    <span className="text-[9px] text-muted-foreground/60">{p.sub}</span>
                                 </div>
                                 <span className="text-[10px] font-semibold text-primary/40 group-hover:text-primary transition-colors">{p.pts}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Matériel & Références */}
                     <div className="space-y-4">
                        <div className="flex items-center gap-2 text-muted-foreground/30">
                           <Construction className="size-4" />
                           <span className="text-[10px] font-semibold uppercase tracking-wider">Moyens Techniques</span>
                        </div>
                        <div className="space-y-2">
                           {[
                              { label: "Engins de Terrassement", sub: "Pelle hydraulique, Compacteur", pts: "10 pts" },
                              { label: "Matériel Topographique", sub: "Station totale, GPS", pts: "05 pts" },
                              { label: "Références Similaires", sub: "03 marchés au cours des 05 dernières années", pts: "20 pts" }
                           ].map((m, i) => (
                              <div key={i} className="flex items-center justify-between p-3 rounded-[2px] bg-muted/5 border border-border/5 group hover:border-primary/20 transition-all">
                                 <div className="flex flex-col">
                                    <span className="text-[11px] font-semibold text-foreground/80">{m.label}</span>
                                    <span className="text-[9px] text-muted-foreground/60">{m.sub}</span>
                                 </div>
                                 <span className="text-[10px] font-semibold text-primary/40 group-hover:text-primary transition-colors">{m.pts}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               {/* MODALITÉS DE DÉPÔT */}
               <div className="bg-card border border-border/10 rounded-[4px] p-6">
                  <h4 className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-[0.2em] mb-4">Instructions de Remise (Section 3.3)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="p-4 rounded-[2px] bg-muted/10 border border-border/5">
                        <span className="text-[9px] font-semibold text-muted-foreground uppercase block mb-2">Nombre de plis</span>
                        <p className="text-xs font-semibold text-foreground">01 Original + 06 Copies</p>
                     </div>
                     <div className="p-4 rounded-[2px] bg-muted/10 border border-border/5">
                        <span className="text-[9px] font-semibold text-muted-foreground uppercase block mb-2">Support Numérique</span>
                        <p className="text-xs font-semibold text-foreground truncate">Clé USB (PDF + Excel)</p>
                     </div>
                     <div className="p-4 rounded-[2px] bg-muted/10 border border-border/5">
                        <span className="text-[9px] font-semibold text-muted-foreground uppercase block mb-2">Date Limite</span>
                        <p className="text-xs font-semibold text-primary font-mono">{item.dateVisiteSite || "15 Mai 2026 à 13h00"}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* LES ÉLIMINATOIRES (BARRIÈRE À L'ENTRÉE) — COL-SPAN-4 */}
            <div className="lg:col-span-4 space-y-6">
               <div className="bg-red-500/5 border border-red-500/10 rounded-[4px] p-6 relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-8">
                     <AlertOctagon className="size-5 text-red-500" />
                     <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-red-500/60 uppercase tracking-widest">Section 3.1</span>
                        <h3 className="text-sm font-semibold text-red-600 uppercase tracking-tight">Critères Éliminatoires</h3>
                     </div>
                  </div>

                  <div className="space-y-3 relative z-10">
                     {[
                        "Absence de la Caution de Soumission",
                        "Note technique inférieure à 70/100",
                        "Présence de informations fausses",
                        "Non satisfaction de 75% des critères essentiels",
                        "Absence de certificat de non-exclusion"
                     ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-[2px] bg-white/40 border border-red-500/5 group-hover:bg-white/60 transition-all">
                           <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                           <p className="text-[11px] font-semibold text-red-700/80 leading-snug">{item}</p>
                        </div>
                     ))}
                  </div>
                  <Zap className="absolute -right-4 -bottom-4 size-24 text-red-600/5 -rotate-12 transition-transform group-hover:rotate-0" />
               </div>

               {/* PIÈCES ADMINISTRATIVES OBLIGATOIRES */}
               <div className="bg-card border border-border/10 rounded-[4px] p-6">
                  <h4 className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-[0.2em] mb-4 text-center">Checklist Dossier Administratif</h4>
                  <div className="space-y-2">
                     {[
                        "Copie Certifiée du Registre du Commerce",
                        "Attestation de Domiciliation Bancaire",
                        "Plan de Localisation signé par les Impôts",
                        "Attestation CNPS (valide 90 jours)",
                        "Certificat de Non-Exclusion (ARMP)"
                     ].map((piece, i) => (
                        <div key={i} className="flex items-center justify-between p-2.5 rounded-[2px] bg-muted/5 border border-border/5">
                           <span className="text-[10px] font-semibold text-muted-foreground/70 truncate pr-4">{piece}</span>
                           <CheckCircle2 className="size-3 text-emerald-500" />
                        </div>
                     ))}
                  </div>
               </div>
            </div>

         </div>
      </Container>

      {/* FOOTER ACTION */}
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
                  {isStarting ? "ANALYSE EN COURS..." : "INITIALISER LE MONTAGE DOSSIER"}
               </div>
               {!isStarting && <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
            </Button>
         </div>
      )}
    </div>
  );
}
