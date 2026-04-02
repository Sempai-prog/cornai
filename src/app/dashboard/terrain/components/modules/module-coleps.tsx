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
  Activity,
  Globe
} from "lucide-react";
import { MOCK_COLEPS } from "../../lib/terrain-mock-data";
import { ColepsDocument, ModuleStatus } from "../../lib/terrain-types";
import { cn } from "@/lib/utils";
import { ProgressBar } from "../shared/progress-bar";
import { StatusBadge } from "../shared/status-badge";
import { AlertPanel } from "../shared/alert-panel";

/**
 * 🛂 MODULE : COLEPS PRE-FLIGHT
 * Focus : Vérification finale du poids numérique et compilation du Volume 2.
 */
export function ModuleColeps() {
  const { totalSizeMb, maxSizeMb, isCompliant, documents, modulesStatus } = MOCK_COLEPS;
  const percentage = (totalSizeMb / maxSizeMb) * 100;
  const isOverSize = totalSizeMb > maxSizeMb;

  // Calcul auto de la conformité globale (TOUS les modules doivent être complete)
  const allModulesComplete = Object.values(modulesStatus).every(s => s === "complete");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 h-full pb-8 items-stretch">
      {/* 📦 LEFT : COMPILATION & SIZE GAUGE */}
      <div className="h-full">
        <aside className="p-6 bg-card border border-border rounded-[4px] relative overflow-hidden space-y-8 h-full flex flex-col">
          {/* Subtle Background Icon */}
          <HardDrive className="absolute -bottom-6 -right-6 w-32 h-32 text-foreground opacity-[0.02] pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-[4px] bg-primary/10 flex items-center justify-center">
              <FileArchive className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                Pre-flight COLEPS
              </h3>
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-tight">
                Analyse Compliance ARMP
              </p>
            </div>
          </div>

          {/* Precise Size Gauge */}
          <div className="space-y-4 relative z-10">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest block">Format Volume 2</span>
                <span className={cn(
                  "text-3xl font-black tabular-nums tracking-tighter leading-none",
                  isOverSize ? "text-red-500" : "text-primary"
                )}>
                  {totalSizeMb.toFixed(1)} <span className="text-lg opacity-40">MB</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-40">Limite Plateforme : {maxSizeMb} MB</span>
              </div>
            </div>
            
            <ProgressBar 
              progress={Math.min(percentage, 100)} 
              className={cn(
                "h-2",
                isOverSize && "[&_div]:bg-red-500"
              )}
            />
            
            {isOverSize && (
              <div className="flex items-center gap-2 p-3 bg-red-500/[0.03] border border-red-500/10 rounded-[4px]">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-tight">Capacité COLEPS Dépassée • Veuillez compresser les PDF</span>
              </div>
            )}
          </div>

          {/* Module Guard Status Grid */}
          <div className="grid grid-cols-1 gap-2 pt-4 border-t border-border relative z-10">
            <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] mb-2">Statut Intégrité Modules</p>
            {Object.entries(modulesStatus).map(([name, status]) => (
              <div key={name} className="flex items-center justify-between p-3 bg-muted/10 border border-border rounded-[4px] group">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-[4px] transition-all",
                    status === "complete" ? "bg-primary" : "bg-muted-foreground/20"
                  )} />
                  <span className="text-[10px] font-bold text-foreground/80 uppercase tracking-tight group-hover:text-foreground transition-colors">{name}</span>
                </div>
                <StatusBadge 
                  status={status as ModuleStatus} 
                  className={cn(
                    "text-[8px] h-5 px-1.5",
                    status === "complete" && "border-primary/20"
                  )} 
                />
              </div>
            ))}
          </div>

          {/* Compilation CTA */}
          <div className="pt-4 relative z-10">
            <button 
              disabled={!allModulesComplete || isOverSize}
              className={cn(
                "w-full h-14 rounded-[4px] font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300",
                allModulesComplete && !isOverSize
                  ? "bg-primary text-black hover:opacity-90 active:scale-[0.98]" 
                  : "bg-muted text-muted-foreground/30 border border-border cursor-not-allowed"
              )}
            >
              <Zap className={cn("w-4 h-4", allModulesComplete && !isOverSize ? "fill-current" : "fill-none")} />
              Compiler Offre Technique (V2)
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 opacity-40 text-muted-foreground">
               <ShieldCheck className="w-3 h-3" />
               <span className="text-[9px] font-bold uppercase tracking-tighter">Certified DTAO Compliant</span>
            </div>
          </div>
        </aside>
      </div>

      {/* 📄 RIGHT : MANIFEST & PDF OPTIMIZATION */}
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-[4px] flex flex-col h-full shadow-none overflow-hidden">
          {/* Header Action Bar */}
          <div className="p-6 border-b border-border bg-muted/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[4px] bg-muted flex items-center justify-center">
                <FileText className="w-4 h-4 text-muted-foreground/60" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                  Manifeste d'Offre
                </h3>
                <div className="flex items-center gap-2">
                   <Activity className="w-3 h-3 text-primary opacity-50" />
                   <span className="text-[10px] text-muted-foreground/60 uppercase font-medium">Auto-Indexation Active</span>
                </div>
              </div>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-[2px] hover:bg-primary/10 transition-all">
               Refresh Index
            </button>
          </div>

          <div className="divide-y divide-border overflow-y-auto flex-1">
            {documents.map((doc) => (
              <div key={doc.id} className="p-5 flex items-center justify-between hover:bg-muted/5 transition-colors group">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-[4px] bg-muted/30 border border-border flex items-center justify-center text-muted-foreground/40 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                      {doc.fileName}
                    </h4>
                    <div className="flex items-center gap-3">
                        <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight bg-muted px-1.5 py-0.5 rounded-[2px]">{doc.sourceModule}</span>
                        <div className="w-1 h-1 rounded-[4px] bg-border" />
                        <span className={cn(
                          "text-[9px] font-black uppercase tabular-nums tracking-tighter",
                          doc.status === "heavy" ? "text-amber-500" : "text-primary opacity-60"
                        )}>
                          {doc.sizeMb} MB
                        </span>
                      </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {doc.canCompress && (
                    <button className="h-8 px-3 bg-muted/40 hover:bg-muted border border-border border-dashed rounded-[4px] text-[9px] font-bold uppercase tracking-widest text-muted-foreground transition-all">
                      Compresser PDF
                    </button>
                  )}
                  <button className="w-8 h-8 rounded-[4px] border border-border flex items-center justify-center text-muted-foreground/30 hover:text-foreground hover:bg-muted transition-all">
                     <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 🌐 EXTERNAL COLEPS INTEGRATION PORTAL */}
          <div className="p-6 border-t border-border bg-card">
            <button className="w-full h-12 bg-primary/5 border border-primary/20 text-primary rounded-[4px] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-primary/10 transition-all active:scale-[0.99] group">
               <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
               Portail COLEPS (Direction Dépôt)
               <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </button>
            <p className="text-[9px] text-center text-muted-foreground/30 uppercase mt-4 tracking-widest font-bold">
               SABI Bridge v1.2 — Cameroon Procurement Integrated Service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
