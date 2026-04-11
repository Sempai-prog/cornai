"use client";

import React, { useState } from "react";
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  ShieldAlert, 
  CheckCircle2,
  Import,
  UserPlus,
  ChevronDown,
  Clock,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";
import { DialogAjoutMembre } from "@/components/terrain/dialog-ajout-membre";

interface MembreEquipe {
  id: string;
  nom: string;
  role: string | null;
  qualification: string | null;
  experienceAnnees: number | null;
  cvSigne: boolean | null;
  diplomeCertifie: boolean | null;
  attestations: string | null;
  statut: string | null;
  alerte: string | null;
}

interface ModuleEquipeProps {
  membres: MembreEquipe[];
  soumissionId?: string;
}

/**
 * 👥 MODULE : L'ÉQUIPE — Bento Refactor (SABI V1.6)
 * Focus : Qualification du Personnel Clé & Conformité Formulaire 4F.
 * Layout : Asymétrique (Col 1-8: ID Cards Experts, Col 9-12: Évaluation Points).
 */
export function ModuleEquipe({ membres, soumissionId }: ModuleEquipeProps) {
  const totalExp = membres.reduce((acc, m) => acc + (m.experienceAnnees || 0), 0);
  const criticalAlerte = membres.find(m => m.alerte);

  if (membres.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card border border-border/50 border-dashed rounded-[4px]">
        <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-primary/50" />
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-widest">Équipe Vide</h3>
        <p className="text-xs text-muted-foreground text-center max-w-md mx-auto mb-6">
          Aucun expert technique engagé. Le Formulaire 4F exige la liste complète du personnel clé.
        </p>
        <DialogAjoutMembre soumissionId={soumissionId || ""} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6 pb-8 items-start">
      
      {/* 🚀 TOP BAR : AUDIT ORGANIGRAMME (12 COLS) */}
      <div className="col-span-12 p-4 bg-muted/10 border border-border/10 rounded-[4px] flex items-center justify-between mb-2">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-[0.2em]">Effectif</span>
            <span className="text-sm font-semibold text-foreground tabular-nums">{membres.length} Experts</span>
          </div>
          <div className="w-px h-8 bg-border/20" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-[0.2em]">Expérience Cumulée</span>
            <span className="text-sm font-semibold text-primary tabular-nums">{totalExp} Ans</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="h-8 px-4 border border-border/10 rounded-[4px] text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:bg-muted transition-all">
            Pool RH
          </button>
          <DialogAjoutMembre soumissionId={soumissionId || ""} />
        </div>
      </div>

      {/* 👤 COL 1-8 : EXPERT ID CARDS BENTO */}
      <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {membres.map((person) => (
          <ExpertIDCard key={person.id} person={person} />
        ))}
      </div>

      {/* 📋 COL 9-12 : ÉVALUATEUR DE POINTS (STICKY) */}
      <aside className="col-span-12 lg:col-span-4 sticky top-6 space-y-4">
        <div className="bg-card border border-border/10 rounded-[4px] p-5">
          <div className="flex items-center gap-2 mb-6 border-b border-border/5 pb-4">
            <GraduationCap className="w-4 h-4 text-primary" />
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground">
              Simulation de Score
            </h4>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-muted/5 border border-border/5 rounded-[4px] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase">Note Technique Est.</span>
                <span className="text-xs font-semibold text-primary">78/100</span>
              </div>
              <div className="h-1.5 bg-muted/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[78%]" />
              </div>
            </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground/40 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-semibold text-foreground/80 uppercase">Ancienneté Moyenne</p>
                      <p className="text-[10px] text-muted-foreground font-medium">12.4 ans par expert (Cible: &gt;10 ans)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-3.5 h-3.5 text-muted-foreground/40 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-semibold text-foreground/80 uppercase">Mix Public/Privé</p>
                      <p className="text-[10px] text-muted-foreground font-medium">
                        {membres.filter(m => m.alerte?.includes('Administration')).length} Profil(s) à risque ARMP
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 🛡️ QUALIFICATION AUDIT */}
                <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-[4px] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 opacity-10">
                    <GraduationCap className="w-full h-full text-primary" />
                  </div>
                  <span className="text-[9px] font-semibold text-primary uppercase tracking-widest block mb-2">Audit des Diplômes</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={cn("h-1 flex-1 rounded-full", i < 4 ? "bg-primary" : "bg-muted")} />
                    ))}
                  </div>
                  <p className="text-[8px] text-muted-foreground mt-2 uppercase font-semibold tracking-tighter">80% des diplômes sont certifiés conformes.</p>
                </div>
              </div>
            </div>

        {/* 🏛️ LEGAL ADVISORY (PIECE 4F) */}
        <div className="bg-blue-500/5 border-l-2 border-blue-500 p-4 rounded-[4px]">
          <h5 className="text-[10px] font-semibold text-blue-500 uppercase tracking-widest mb-1">Rappel DTAO</h5>
          <p className="text-[10px] text-foreground/70 leading-relaxed font-medium">
            Le rejet technique est systématique si un CV n'est pas <strong>daté de moins de 3 mois</strong> ou si la signature n'est pas authentique.
          </p>
        </div>

        {criticalAlerte && (
          <div className="bg-red-500/5 border-l-2 border-red-500 p-4 rounded-[4px]">
            <div className="flex items-start gap-2 text-red-500 mb-1">
              <ShieldAlert className="w-3.5 h-3.5 mt-0.5" />
              <h5 className="text-[10px] font-semibold uppercase tracking-widest">Risque Éliminatoire</h5>
            </div>
            <p className="text-[10px] text-foreground/70 leading-relaxed font-medium">
              L'expert <strong>{criticalAlerte.nom}</strong> présente une anomalie : {criticalAlerte.alerte}.
            </p>
          </div>
        )}
      </aside>

    </div>
  );
}

/**
 * 👤 SUB-COMPONENT : EXPERT ID CARD
 * Ultra-dense Bento Card for Personnel
 */
function ExpertIDCard({ person }: { person: MembreEquipe }) {
  const isComplete = person.statut === "complet";
  const isPublic = person.alerte?.includes('Administration');

  return (
    <div className={cn(
      "bg-card border transition-all duration-300 rounded-[4px] group overflow-hidden flex flex-col h-full",
      isComplete ? "border-border/10" : "border-red-500/20"
    )}>
      {/* Header : Identité */}
      <div className="p-4 border-b border-border/5 flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-muted/20 border border-border/10 flex items-center justify-center shrink-0">
          <span className="text-sm font-semibold text-foreground">{person.nom.charAt(0)}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {person.nom}
            </h4>
            <div className={cn(
              "w-2 h-2 rounded-full",
              isComplete ? "bg-primary" : "bg-red-500"
            )} />
          </div>
          <span className="text-[9px] font-semibold text-muted-foreground/30 uppercase tracking-[0.1em] mt-0.5 block">
            {person.role || "EXPERT"}
          </span>
        </div>
      </div>

      {/* Middle : Stats & Qualifs */}
      <div className="p-4 py-3 bg-muted/5 flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-widest">Expérience</span>
          <span className="text-[10px] font-semibold text-foreground tabular-nums">{person.experienceAnnees} Ans</span>
        </div>
        <div className="space-y-1">
          <span className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-widest">Qualification</span>
          <p className="text-[10px] font-semibold text-foreground/70 line-clamp-1">{person.qualification || 'N/A'}</p>
        </div>
      </div>

      {/* Footer : Compliance Lights */}
      <div className="p-4 border-t border-border/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <div className={cn("w-1 h-3 rounded-[1px]", person.cvSigne ? "bg-primary" : "bg-red-500")} />
            <span className="text-[8px] font-semibold text-muted-foreground/30 uppercase tracking-tighter">CV</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className={cn("w-1 h-3 rounded-[1px]", person.diplomeCertifie ? "bg-primary" : "bg-red-500")} />
            <span className="text-[8px] font-semibold text-muted-foreground/30 uppercase tracking-tighter">DIP</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className={cn("w-1 h-3 rounded-[1px]", isPublic ? "bg-amber-500" : "bg-primary")} />
            <span className="text-[8px] font-semibold text-muted-foreground/30 uppercase tracking-tighter">STAT</span>
          </div>
        </div>

        <div className={cn(
          "px-2 py-0.5 rounded-[2px] text-[8px] font-semibold uppercase tracking-widest border",
          isComplete ? "bg-primary/5 text-primary border-primary/10" : "bg-red-500/5 text-red-500 border-red-500/10"
        )}>
          {isComplete ? "CONFORME" : "BLOQUÉ"}
        </div>
      </div>
    </div>
  );
}

