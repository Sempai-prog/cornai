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
import { MOCK_GARAGE, MOCK_RPAO_EQUIPMENT } from "../../lib/terrain-mock-data";
import { EquipmentItem, DocumentStatus } from "../../lib/terrain-types";
import { cn } from "@/lib/utils";
import { StatusBadge } from "../shared/status-badge";
import { AlertPanel } from "../shared/alert-panel";

/**
 * 🚜 MODULE : LE GARAGE
 * Focus : Gestion du parc matériel et conformité des pièces administratives (Engins).
 */
export function ModuleGarage() {
  const getDocStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case "ready": return "text-primary";
      case "warning": return "text-amber-500";
      case "missing": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 h-full pb-8">
      {/* 📊 RPAO STATUS BAR : TRACKING EXIGENCES MINIMALES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_RPAO_EQUIPMENT.map((req) => {
          const matched = MOCK_GARAGE.filter(g => g.matchedRequirement === req.id);
          const count = matched.length;
          const isComplete = count >= req.quantity;

          return (
            <div key={req.id} className="p-5 bg-card border border-border rounded-[4px] relative overflow-hidden group">
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
                      / {req.quantity}
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
              {MOCK_GARAGE.map((item) => (
                <tr key={item.id} className="hover:bg-muted/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight mt-1">{item.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] px-2 py-1 bg-muted border border-border text-foreground font-bold rounded-[4px]-sm uppercase tracking-tighter">
                      {MOCK_RPAO_EQUIPMENT.find(r => r.id === item.matchedRequirement)?.label || "Aucun"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {item.documents.map((doc) => (
                        <div key={doc.id} className="relative group/doc cursor-help">
                          <CheckCircle2 className={cn("w-4 h-4", getDocStatusColor(doc.status))} />
                          {/* Tooltip Simulation */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/doc:block bg-popover border border-border px-3 py-1.5 rounded-[4px]-sm whitespace-nowrap z-30 shadow-2xl">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[10px] text-foreground font-bold uppercase tracking-tight">{doc.label}</span>
                              <span className={cn("text-[8px] font-bold uppercase", getDocStatusColor(doc.status))}>{doc.status}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button className="w-4 h-4 rounded-[4px] border border-border border-dashed flex items-center justify-center text-muted-foreground/30 hover:text-primary hover:border-primary transition-all">
                        <PlusCircle className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge 
                      status={item.status === "conforme" ? "complete" : item.status === "critique" ? "warning" : "warning"}
                      className={cn(
                        "text-[9px] w-24",
                        item.status === "eliminatoire" && "text-red-500 bg-red-500/10"
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
      <AlertPanel 
        type="warning"
        title="Avertissement Anti-Elimination"
        message="Le Bulldozer SD16 est marqué comme 'Critique' car il manque l'engagement de location. Selon le RPAO (Art 12.b), l'absence de ce document est un motif d'élimination technique directe au Cameroun."
      />
    </div>
  );
}
