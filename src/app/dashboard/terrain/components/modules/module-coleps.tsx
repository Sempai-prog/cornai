"use client";

import React from "react";
import { 
  CheckCircle2, 
  AlertCircle, 
  FileArchive, 
  Download, 
  Zap, 
  HardDrive, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  Globe,
  RefreshCw,
  Search
} from "lucide-react";
import { genererPiecesSoumission } from "@/app/actions/coleps";
import { toast } from "sonner";
import { ModuleStatus } from "../../lib/terrain-types";
import { cn } from "@/lib/utils";
import { ProgressBar } from "../shared/progress-bar";
import { EmptyState } from "@/components/ui/empty-state";

interface PieceSoumission {
  id: string;
  nomFichier: string;
  typePiece: string | null;
  tailleMb: number | string;
  moduleSource: string | null;
  statut: string | null;
}

interface ModuleColepsProps {
  pieces: PieceSoumission[];
  moduleStatuts: Record<string, ModuleStatus>;
  soumissionId: string;
}

/**
 * 🛂 MODULE : COLEPS PRE-FLIGHT — Bento Refactor (SABI V1.6)
 * Focus : Vérification finale du poids numérique et compilation du Volume 2.
 * Layout : Grid 12 (Col 1-8: Manifest & Optimization, Col 9-12: Integrity Audit & Compile).
 */
export function ModuleColeps({ pieces, moduleStatuts, soumissionId }: ModuleColepsProps) {
  const [isSyncing, setIsSyncing] = React.useState(false);
  const maxSizeMb = 25; // COLEPS platform limit
  const totalSizeMb = pieces.reduce((sum, p) => sum + (parseFloat(p.tailleMb as any) || 0), 0);
  const percentage = (totalSizeMb / maxSizeMb) * 100;
  const isOverSize = totalSizeMb > maxSizeMb;

  const allModulesComplete = Object.values(moduleStatuts).every(s => s === "complete");

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await genererPiecesSoumission(soumissionId);
      if (res.success) {
        toast.success("Index COLEPS synchronisé", {
          description: "Le Volume 2 a été mis à jour d'après les modules terrain."
        });
      } else {
        toast.error("Échec de synchronisation");
      }
    } finally {
      setIsSyncing(false);
    }
  };

  if (pieces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-card border border-border/10 border-dashed rounded-[4px] space-y-6">
        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center animate-pulse">
           <FileArchive className="w-10 h-10 text-primary/20" />
        </div>
        <div className="text-center">
           <h3 className="text-sm font-black text-foreground uppercase tracking-[0.2em] mb-2">Index COLEPS Vierge</h3>
           <p className="text-[10px] text-muted-foreground/40 font-bold uppercase max-w-xs mx-auto mb-8">
             Préparez le manifeste du Volume 2 en analysant les données des modules tactiques.
           </p>
           <button 
             onClick={handleSync}
             disabled={isSyncing}
             className="h-10 px-8 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] rounded-[2px] flex items-center gap-3 hover:opacity-90 transition-all disabled:opacity-50"
           >
             {isSyncing ? (
               <>
                 <RefreshCw className="w-4 h-4 animate-spin" />
                 Scan en cours...
               </>
             ) : (
               <>
                 <Search className="w-4 h-4" />
                 Générer l'Index
               </>
             )}
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6 pb-8 items-start">
      
      {/* 📄 COL 1-8 : MANIFESTE D'OFFRE & INDEXATION AUTOMATIQUE */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="bg-card border border-border/10 rounded-[4px] overflow-hidden">
          <div className="p-6 border-b border-border/5 bg-muted/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-primary" />
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-foreground">Manifeste d'Offre (Index)</h4>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-semibold text-muted-foreground/30 uppercase tracking-[0.2em]">{pieces.length} Fichiers Indexés</span>
              <button 
                onClick={handleSync}
                disabled={isSyncing}
                className="w-8 h-8 rounded-[4px] border border-border/10 flex items-center justify-center text-muted-foreground/30 hover:text-primary hover:border-primary/20 transition-all"
              >
                <RefreshCw className={cn("w-3.5 h-3.5", isSyncing && "animate-spin")} />
              </button>
            </div>
          </div>

          <div className="divide-y divide-border/5">
            {pieces.map((doc) => (
              <div key={doc.id} className="p-5 flex items-center justify-between hover:bg-muted/5 transition-all group">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-[4px] bg-muted/10 border border-border/10 flex items-center justify-center text-muted-foreground/30 group-hover:text-primary transition-all">
                    <FileText className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[11px] font-semibold text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{doc.nomFichier}</h4>
                    <div className="flex items-center gap-3 italic">
                      <span className="text-[9px] text-muted-foreground/40 font-semibold uppercase tracking-widest">{doc.moduleSource}</span>
                      <div className="w-1 h-1 rounded-full bg-border/20" />
                      <span className={cn(
                        "text-[9px] font-semibold uppercase tabular-nums tracking-[0.1em]",
                        parseFloat(doc.tailleMb as string) > 5 ? "text-amber-500" : "text-primary/60"
                      )}>
                        {parseFloat(doc.tailleMb as string).toFixed(1)} MB
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {parseFloat(doc.tailleMb as string) > 5 && (
                    <button className="h-8 px-3 bg-muted/20 border border-border/10 rounded-[4px] text-[8px] font-semibold uppercase tracking-widest text-muted-foreground hover:bg-muted transition-all">
                      Optimiser
                    </button>
                  )}
                  <button className="w-8 h-8 rounded-[4px] border border-border/10 flex items-center justify-center text-muted-foreground/20 hover:text-foreground hover:bg-muted transition-all">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ⚡ OPTIMIZATION PANEL (Bento Grid Style) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 bg-card border border-border/10 rounded-[4px] space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground">Fast Purge</span>
            </div>
            <p className="text-[9px] text-muted-foreground leading-tight uppercase font-semibold">Supprimer les métadonnées inutiles des PDF pour gagner ~15% de poids.</p>
            <button className="text-[9px] font-semibold text-primary underline uppercase tracking-widest">Lancer Purge</button>
          </div>
          <div className="p-5 bg-card border border-border/10 rounded-[4px] space-y-3">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground">Archive V2</span>
            </div>
            <p className="text-[9px] text-muted-foreground leading-tight uppercase font-semibold">Télécharger l'intégralité du Volume en un seul fichier .ZIP indexé.</p>
            <button className="text-[9px] font-semibold text-primary underline uppercase tracking-widest">Export All</button>
          </div>
        </div>

        {/* COLEPS Portal Bridge */}
        <div className="p-6 bg-primary/5 border border-primary/10 border-dashed rounded-[4px] flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-all">
          <div className="flex items-center gap-4">
            <Globe className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">Passerelle COLEPS Directe</span>
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-tight">Ouvrir le portail officiel de dépôt (ARMP)</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-primary opacity-40 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* 🧭 COL 9-12 : AUDIT PRE-FLIGHT & COMPILATION (STICKY) */}
      <aside className="col-span-12 lg:col-span-4 sticky top-6 space-y-6">
        
        {/* Digital Weight Gauge */}
        <div className="bg-card border border-border/10 rounded-[4px] p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-border/5 pb-4">
            <HardDrive className="w-4 h-4 text-primary" />
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-foreground">Poids Numérique</h4>
          </div>

          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div className="space-y-0.5">
                <span className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-[0.2em]">Volume 2</span>
                <p className={cn(
                  "text-4xl font-semibold tabular-nums tracking-tighter",
                  isOverSize ? "text-red-500" : "text-foreground"
                )}>
                  {totalSizeMb.toFixed(1)} <span className="text-lg opacity-20">MB</span>
                </p>
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-widest">Max</span>
                <p className="text-sm font-semibold text-foreground/40 tabular-nums leading-none">25.0 MB</p>
              </div>
            </div>

            <ProgressBar 
              progress={Math.min(percentage, 100)} 
              className={cn("h-1.5", isOverSize && "[&_div]:bg-red-500")}
            />

            {isOverSize && (
              <div className="flex gap-2 p-3 bg-red-500/5 border border-red-500/10 rounded-[2px]">
                <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <p className="text-[9px] font-semibold text-red-500 uppercase leading-relaxed">Capacité COLEPS Dépassée • Veuillez compresser les PDF pour éviter le rejet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Integrity Sidebar Status */}
        <div className="bg-card border border-border/10 rounded-[4px] p-6">
          <p className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-[0.2em] mb-4">Checklist Intégrité</p>
          <div className="space-y-3">
            {Object.entries(moduleStatuts).map(([name, status]) => (
              <div key={name} className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest">
                <span className={cn(status === "complete" ? "text-foreground" : "text-muted-foreground/30")}>{name}</span>
                {status === "complete" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-border/20" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final Launch Control */}
        <div className="space-y-4">
          <button 
            disabled={!allModulesComplete || isOverSize}
            onClick={() => {
              toast.success("Volume 2 Compilé avec succès", {
                description: "Le dossier technique est prêt pour le dépôt officiel."
              });
            }}
            className={cn(
              "w-full h-16 rounded-[4px] font-semibold text-[11px] uppercase tracking-[0.25em] flex flex-col items-center justify-center gap-1 transition-all shadow-xl shadow-primary/5",
              allModulesComplete && !isOverSize
                ? "bg-primary text-black hover:scale-[1.02] active:scale-[0.98]" 
                : "bg-muted text-muted-foreground/30 border border-border/10 cursor-not-allowed"
            )}
          >
            <div className="flex items-center gap-3">
              <Zap className={cn("w-4 h-4 transition-transform", allModulesComplete && !isOverSize ? "animate-pulse fill-current" : "")} />
              <span>Compiler l'Offre</span>
            </div>
            <span className="text-[8px] opacity-40">Volume 2 (Technique)</span>
          </button>
          
          <div className="flex items-center justify-center gap-2 py-2 border border-border/5 rounded-[4px] bg-muted/5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary/40" />
            <span className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-widest">Audit DTAO Certifié</span>
          </div>
        </div>
      </aside>

    </div>
  );
}
