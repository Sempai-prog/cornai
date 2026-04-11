"use client";

import React from "react";
import { 
  Warehouse, 
  Settings2, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench,
  FileWarning,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogAjoutEngin } from "@/components/terrain/dialog-ajout-engin";

/**
 * 🚜 INTERFACES & TYPES
 */
export interface MaterielItem {
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
  soumissionId?: string;
}

/**
 * 🚜 MODULE : LE GARAGE — Bento Refactor (SABI V1.6)
 * Focus : Gestion du parc matériel et conformité binaire RPAO (Section V).
 * Layout : Asymétrique (Col 1-9: Inventaire, Col 10-12: Audit Légal).
 */
export function ModuleGarage({ materiel, aoReference, soumissionId }: ModuleGarageProps) {
  // Calculs RPAO pour le Radar latéral
  const exigenceGroups = materiel.reduce((acc, item) => {
    const key = item.exigenceMatch || 'AUTRE';
    if (!acc[key]) {
      acc[key] = { 
        label: key, 
        count: 0, 
        required: item.quantiteRequise || 1,
        isComplete: false
      };
    }
    acc[key].count++;
    acc[key].isComplete = acc[key].count >= acc[key].required;
    return acc;
  }, {} as Record<string, { label: string; count: number; required: number; isComplete: boolean }>);

  // Alerte critique (NDEM)
  const criticalItem = materiel.find(m => m.statut === 'attention' || m.statut === 'incomplet');

  if (materiel.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card border border-border/50 border-dashed rounded-[4px]">
        <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-4">
          <Warehouse className="w-8 h-8 text-primary/50" />
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-widest">Garage Vide</h3>
        <p className="text-xs text-muted-foreground text-center max-w-md mx-auto mb-6">
          Aucun engin n'est actuellement assigné. La Section V du RPAO exige l'inventaire précis du matériel dédié.
        </p>
        <DialogAjoutEngin soumissionId={soumissionId} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6 pb-8 items-start">
      
      {/* 🛠️ COL 1-9 : INVENTAIRE BENTO (CARTES DE DONNÉES) */}
      <div className="col-span-12 lg:col-span-9 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-0.5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
              <Warehouse className="w-3.5 h-3.5 text-primary" />
              Inventaire Technique
            </h3>
            <p className="text-[10px] text-muted-foreground/50 uppercase font-medium tracking-tight">
              {materiel.length} Engins mobilisés pour la soumission
            </p>
          </div>
          <DialogAjoutEngin soumissionId={soumissionId} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {materiel.map((item) => (
            <EnginDataCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* 📊 COL 10-12 : RADAR RPAO (STICKY LEGAL AUDIT) */}
      <aside className="col-span-12 lg:col-span-3 sticky top-6 space-y-4">
        <div className="bg-card border border-border/10 rounded-[4px] p-5">
          <div className="flex items-center gap-2 mb-6 border-b border-border/5 pb-4">
            <Settings2 className="w-4 h-4 text-primary" />
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground">
              Audit Législatif
            </h4>
          </div>

          <div className="space-y-5">
            {Object.values(exigenceGroups).map((group) => (
              <div key={group.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-tight truncate max-w-[140px]">
                    {group.label}
                  </span>
                  <span className={cn(
                    "text-[10px] font-semibold tabular-nums px-1.5 py-0.5 rounded-[2px]",
                    group.isComplete ? "text-primary bg-primary/5" : "text-amber-500 bg-amber-500/5"
                  )}>
                    {group.count}/{group.required}
                  </span>
                </div>
                <div className="h-1 bg-muted/20 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full transition-all", group.isComplete ? "bg-primary" : "bg-amber-500")} 
                    style={{ width: `${Math.min(100, (group.count / group.required) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border/5">
            <div className="flex items-center gap-2 text-muted-foreground/30">
              <CheckCircle2 className="w-3 h-3" />
              <span className="text-[9px] font-semibold uppercase tracking-widest">Score de Conformité V5</span>
            </div>
            <div className="mt-2 text-2xl font-semibold text-foreground tabular-nums">
              {Math.round((Object.values(exigenceGroups).filter(g => g.isComplete).length / Object.values(exigenceGroups).length) * 100) || 0}%
            </div>
            
            {/* 🏛️ LEGAL FOOTNOTE */}
            <div className="mt-6 p-3 bg-muted/5 rounded-[2px] border border-border/5">
              <p className="text-[8px] text-muted-foreground/60 leading-relaxed uppercase font-medium">
                Conformément à l'Article 43.1 du Code des Marchés Publics, tout matériel déclaré doit être justifié par une preuve de propriété ou un engagement de location ferme.
              </p>
            </div>
          </div>
        </div>

        {/* ⚠️ AUDIT ALERT : SCÉNARIO ANTI-ELIMINATION */}
        {criticalItem && (
          <div className="bg-red-500/5 border-l-2 border-red-500 p-4 rounded-[4px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <FileWarning className="w-8 h-8 text-red-500" />
            </div>
            <h5 className="text-[10px] font-semibold text-red-500 uppercase tracking-widest mb-1.5">Alerte Élimination</h5>
            <p className="text-[10px] text-foreground/70 leading-relaxed font-medium">
              Manque {(criticalItem.docsRequis || 3) - (criticalItem.docsValides || 0)} pièce(s) pour <strong>{criticalItem.nom}</strong>. 
              Le RPAO exige une preuve certifiée (Carte Grise).
            </p>
            <button className="mt-3 text-[9px] font-semibold text-red-500 underline uppercase tracking-widest hover:text-red-600 transition-colors">
              Corriger le dossier
            </button>
          </div>
        )}
      </aside>

    </div>
  );
}

/**
 * 📦 SUB-COMPONENT : ENGIN DATA CARD
 * Compact and Rich (V1.6 Design)
 */
function EnginDataCard({ item }: { item: MaterielItem }) {
  const isComplete = item.statut === 'complet';
  const isOwnership = Math.random() > 0.3; // Demo simulation of ownership vs rental

  return (
    <div className={cn(
      "bg-card border transition-all duration-300 rounded-[4px] group overflow-hidden",
      isComplete ? "border-border/10" : "border-amber-500/20"
    )}>
      <div className="p-4 border-b border-border/5 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] font-semibold text-primary uppercase tracking-widest px-1.5 bg-primary/5 rounded-[2px] shrink-0">
              {item.typeMateriel || 'ENGIN'}
            </span>
            <span className="text-[9px] font-semibold text-muted-foreground/30 uppercase tracking-tight truncate">
              REF: {item.id.slice(0, 8).toUpperCase()}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {item.nom}
          </h4>
        </div>
        <div className={cn(
          "w-8 h-8 rounded-[4px] flex items-center justify-center shrink-0",
          isComplete ? "bg-primary/5" : "bg-amber-500/5"
        )}>
          {isComplete ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
        </div>
      </div>

      <div className="p-4 pt-3 flex items-center justify-between bg-muted/5">
        <div className="space-y-0.5">
          <span className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-widest">Désignation</span>
          <p className="text-[11px] font-semibold text-foreground/80 truncate">
            {item.designation || 'Non spécifiée'}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={cn(
            "h-1.5 w-1.5 rounded-full",
            isOwnership ? "bg-primary" : "bg-amber-500"
          )} />
          <span className="text-[10px] font-semibold uppercase tracking-tighter text-foreground/60">
            {isOwnership ? "PROPRIÉTÉ" : "LOCATION"}
          </span>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-semibold tabular-nums text-foreground">
              {item.docsValides || 0}
            </span>
            <span className="text-[10px] text-muted-foreground/30 font-semibold">/</span>
            <span className="text-[10px] text-muted-foreground/60 font-semibold tabular-nums">
              {item.docsRequis || 3}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: item.docsRequis || 3 }).map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-1 h-3 rounded-[1px]",
                  i < (item.docsValides || 0) ? "bg-primary" : "bg-muted-foreground/10"
                )} 
              />
            ))}
          </div>
        </div>

        <button className="p-1.5 rounded-[4px] border border-border/10 hover:bg-muted opacity-0 group-hover:opacity-100 transition-all">
          <Wrench className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
