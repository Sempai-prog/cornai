"use client";

import React from "react";
import { 
  Warehouse, 
  AlertTriangle, 
  CheckCircle2, 
  FileWarning, 
  Search, 
  PlusCircle, 
  Settings2,
  Package,
  Wrench
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "../shared/status-badge";
import { AlertPanel } from "../shared/alert-panel";

interface MaterielItem {
  id: string;
  nom: string;
  typeMateriel: string | null;
  designation: string | null;
  quantiteRequise: number | null;
  quantiteDisponible: number | null;
  statut: string | null;
  exigenceMatch: string | null;
  docsValides: number | null;
  docsRequis: number | null;
}

interface ModuleGarageProps {
  materiel: MaterielItem[];
  aoReference?: string;
}

/**
 * 🚜 MODULE : LE GARAGE — Wired to DB
 * Focus : Gestion du parc matériel et conformité des pièces administratives (Engins).
 */
export function ModuleGarage({ materiel, aoReference }: ModuleGarageProps) {
  // Group materiel by exigenceMatch to create RPAO status cards
  const exigenceGroups = materiel.reduce((acc, item) => {
    const key = item.exigenceMatch || 'Non assigné';
    if (!acc[key]) {
      acc[key] = { label: key, type: item.typeMateriel || 'MATÉRIEL', items: [], quantiteRequise: item.quantiteRequise || 1 };
    }
    acc[key].items.push(item);
    return acc;
  }, {} as Record<string, { label: string; type: string; items: MaterielItem[]; quantiteRequise: number }>);

  const exigenceList = Object.values(exigenceGroups);

  // Find the critical item for the alert
  const criticalItem = materiel.find(m => m.statut === 'attention' || m.statut === 'incomplet');

  // Empty state
  if (materiel.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-[4px] bg-muted/30 border border-border flex items-center justify-center">
          <Warehouse className="w-8 h-8 text-muted-foreground/30" />
        </div>
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Aucun Matériel Enregistré</h3>
        <p className="text-[11px] text-muted-foreground max-w-md">
          Ajoutez les engins et équipements requis par le RPAO pour activer ce module.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full pb-8">
      {/* 📊 RPAO STATUS BAR : TRACKING EXIGENCES MINIMALES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {exigenceList.map((req) => {
          const count = req.items.length;
          const isComplete = req.items.every(i => i.statut === 'complet');

          return (
            <div key={req.label} className="p-5 bg-card border border-border rounded-[4px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              
              <div className="relative z-10 space-y-3">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    {req.type}
                  </p>
                  <h4 className="text-sm font-bold text-foreground tracking-tight">
                    {req.label}
                  </h4>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "text-xl font-black tabular-nums",
                      isComplete ? "text-primary" : "text-amber-500"
                    )}>
                      {count}
                    </span>
                    <span className="text-xs text-muted-foreground/40 font-bold uppercase tracking-widest translate-y-1">
                      / {req.quantiteRequise}
                    </span>
                  </div>
                  {isComplete ? (
                    <div className="w-6 h-6 rounded-[4px] bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-[4px] bg-amber-500/10 flex items-center justify-center">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🛠️ MAIN INVENTORY TABLE */}
      <div className="bg-card border border-border rounded-[4px] overflow-hidden flex flex-col h-full">
        {/* Table Header / Action Bar */}
        <div className="p-5 border-b border-border bg-muted/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[4px] bg-primary/10 flex items-center justify-center">
              <Warehouse className="w-4 h-4 text-primary" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                Inventaire Dédié
              </h3>
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-tight">
                Dossier Technique • Conforme RPAO
              </p>
            </div>
          </div>
          
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-30" />
            <input 
              type="text" 
              placeholder="RECHERCHER UN ENGIN OU MATRICULE..."
              className="w-full bg-background/50 border border-border rounded-[4px] py-2 pl-10 pr-4 text-[10px] font-bold uppercase tracking-wider focus:outline-none focus:border-primary/40 transition-colors placeholder:text-muted-foreground/30"
            />
          </div>
        </div>

        {/* Dense Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/5 border-b border-border">
                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest w-[40%]">Matériel & Désignation</th>
                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Exigence Match</th>
                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">Docs</th>
                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Statut</th>
                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {materiel.map((item) => (
                <tr key={item.id} className="hover:bg-muted/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.nom}</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight mt-1">{item.typeMateriel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] px-2 py-1 bg-card border border-border/10 text-foreground font-bold rounded-[4px] uppercase tracking-tighter">
                      {item.exigenceMatch || "Aucun"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Doc status indicators from DB counts */}
                      {Array.from({ length: item.docsRequis || 3 }).map((_, i) => (
                        <CheckCircle2 
                          key={i} 
                          className={cn(
                            "w-4 h-4",
                            i < (item.docsValides || 0) ? "text-primary" : "text-muted-foreground/20"
                          )} 
                        />
                      ))}
                      <button className="w-4 h-4 rounded-[4px] border border-border border-dashed flex items-center justify-center text-muted-foreground/30 hover:text-primary hover:border-primary transition-all">
                        <PlusCircle className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge 
                      status={item.statut === "complet" ? "complete" : item.statut === "attention" ? "warning" : "warning"}
                      className={cn(
                        "text-[9px] w-24",
                        item.statut === "incomplet" && "text-red-500 bg-red-500/10"
                      )}
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-[4px] border border-border hover:bg-muted transition-all opacity-0 group-hover:opacity-100">
                      <Settings2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ⚠️ AUDIT ALERT : ANTI-NDEM LAYER */}
      {criticalItem && (
        <AlertPanel 
          type="warning"
          title="Avertissement Anti-Elimination"
          message={`${criticalItem.nom} est marqué comme '${criticalItem.statut}' — ${(criticalItem.docsRequis || 3) - (criticalItem.docsValides || 0)} document(s) manquant(s). Selon le RPAO, l'absence de ces documents est un motif d'élimination technique directe.`}
        />
      )}
    </div>
  );
}
