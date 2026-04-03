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
}

/**
 * 👥 MODULE : L'ÉQUIPE — Wired to DB
 * Refactored for High Density (SABI V1.6)
 * Pattern: Compact Card + Accordion Details
 */
export function ModuleEquipe({ membres }: ModuleEquipeProps) {
  const validCount = membres.filter(m => m.statut === 'complet').length;

  if (membres.length === 0) {
    return (
      <div className="bg-card border border-border/10 rounded-[4px] p-12 flex flex-col items-center justify-center text-center">
        <Briefcase className="h-8 w-8 text-muted-foreground/30 mb-3" />
        <p className="text-sm text-muted-foreground">Aucun expert engagé</p>
        <p className="text-xs text-muted-foreground/50 mt-1">Utilisez "Ajouter Expert" pour constituer votre équipe</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 h-full pb-8">
      {/* 📋 HEADER SECTION (STAY STATIC) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-card border border-border/10 rounded-sabi relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-sabi bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">
              Équipe Technique Proposée
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] text-muted-foreground/60 uppercase font-black tracking-widest tabular-nums">
                {membres.length} Experts Engagés
              </span>
              <div className="w-1 h-1 rounded-full bg-border/20" />
              <span className="text-[10px] text-primary uppercase font-black tracking-widest tabular-nums">
                {validCount} Validés
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="h-8 px-3 bg-muted/40 hover:bg-muted border border-border/10 rounded-sabi text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-all flex items-center gap-2">
            <Import className="h-3.5 h-3.5" />
            Pool RH
          </button>
          <button className="h-8 px-3 bg-primary text-black rounded-sabi text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center gap-2">
            <UserPlus className="h-3.5 h-3.5" />
            Ajouter Expert
          </button>
        </div>
      </div>

      {/* 👤 PERSONNEL GRID : 3-COLUMN COMPACT + ACCORDION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {membres.map((person) => (
          <ExpertCard key={person.id} person={person} />
        ))}
      </div>

      {/* 📌 GLOBAL LEGAL ADVISORY */}
      <div className="bg-blue-500/5 border-l-2 border-l-blue-500 py-3 px-4 rounded-[4px]">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-1">Rappel Règlementaire DTAO (Art. 18.1)</h4>
        <p className="text-[11px] text-foreground/70 leading-relaxed">
          Les CV doivent être datés de moins de 3 mois et certifiés conformes par le soumissionnaire. SABI vérifie l'unicité des experts pour éviter les doubles affectations.
        </p>
      </div>
    </div>
  );
}

/**
 * COMPACT EXPERT CARD WITH ACCORDION
 */
function ExpertCard({ person }: { person: MembreEquipe }) {
  const [isOpen, setIsOpen] = useState(false);
  const isComplete = person.statut === "complet";

  const getRoleStyle = (role: string | null) => {
    const r = (role || "").toUpperCase();
    if (r.includes("CHEF PROJET")) return "text-primary bg-primary/5 border border-primary/10";
    if (r.includes("CHEF CHANTIER")) return "text-amber-500 bg-amber-500/5 border border-amber-500/10";
    return "text-muted-foreground bg-muted/10 border border-border/5";
  };

  const getDotColor = (type: 'cv' | 'diplome' | 'attestations') => {
    if (type === 'cv') return person.cvSigne ? "bg-primary" : "bg-red-500";
    if (type === 'diplome') return person.diplomeCertifie ? "bg-primary" : "bg-red-500";
    if (type === 'attestations') {
      if (person.attestations === 'ok') return "bg-primary";
      if (person.attestations === 'pending') return "bg-amber-500";
      return "bg-red-500";
    }
    return "bg-muted";
  };

  return (
    <div className={cn(
      "bg-card border transition-all rounded-[4px] overflow-hidden",
      isOpen ? "border-primary/20" : "border-border/10",
      person.alerte && "border-l-2 border-l-red-500"
    )}>
      {/* COMPACT HEADER (Always Visible as Toggle Button) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors"
      >
        {/* Avatar initiale */}
        <div className="h-9 w-9 rounded-full bg-muted/20 border border-border/10 flex items-center justify-center shrink-0">
          <span className="text-sm font-semibold text-foreground">
            {person.nom.charAt(0)}
          </span>
        </div>

        {/* Bloc infos */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-foreground truncate">
              {person.nom}
            </h4>
            <span className={cn(
              "text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-[4px] border shrink-0",
              isComplete ? "bg-primary/10 text-primary border-primary/20" : "bg-red-500/5 text-red-500 border-red-500/10"
            )}>
              {isComplete ? "COMPLET" : "INCOMPLET"}
            </span>
          </div>

          <span className={cn(
            "text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-[4px] mt-1.5 inline-block",
            getRoleStyle(person.role)
          )}>
            {(person.role || "EXPERT").replace(/_/g, " ")}
          </span>

          <div className="flex items-center justify-between mt-2.5">
            <span className="text-[11px] text-muted-foreground font-medium">
              {person.experienceAnnees || 0} ans d'expérience
            </span>
            <div className="flex items-center gap-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full", getDotColor('cv'))} title="CV Signé" />
              <span className={cn("h-1.5 w-1.5 rounded-full", getDotColor('diplome'))} title="Diplôme Certifié" />
              <span className={cn("h-1.5 w-1.5 rounded-full", getDotColor('attestations'))} title="Attestations" />
            </div>
          </div>
        </div>

        <ChevronDown className={cn(
          "h-4 w-4 text-muted-foreground/40 shrink-0 transition-transform duration-200 mt-1",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* ACCORDION CONTENT (CSS Transition) */}
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[500px] opacity-100 border-t border-border/5" : "max-h-0 opacity-0"
      )}>
        <div className="p-4 pt-4 space-y-5">
          {/* Qualification */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">Qualification</span>
            <div className="flex items-center gap-2 mt-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-muted-foreground/40" />
              <p className="text-[11px] text-foreground font-semibold leading-tight">
                {person.qualification || 'Non renseigné'}
              </p>
            </div>
          </div>

          {/* Checklist Compliance détaillée */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">Dossier Technique</span>
            <div className="mt-2.5 space-y-1">
              <div className="flex items-center justify-between py-1.5 border-b border-border/5">
                <span className="text-[11px] text-muted-foreground">CV Signé</span>
                {person.cvSigne ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-border/5">
                <span className="text-[11px] text-muted-foreground">Diplôme Certifié</span>
                {person.diplomeCertifie ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[11px] text-muted-foreground">Attestations</span>
                {person.attestations === 'ok' ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                ) : person.attestations === 'pending' ? (
                  <Clock className="h-3.5 w-3.5 text-amber-500" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                )}
              </div>
            </div>
          </div>

          {/* Alerte si présente */}
          {person.alerte && (
            <div className="bg-red-500/5 border border-red-500/10 rounded-[4px] p-3">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight">{person.alerte}</p>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-red-500/5">
                    <span className="text-[9px] text-red-500/40 italic">Source : RPAO Art. 36</span>
                    <button className="text-[9px] text-red-500 font-black uppercase tracking-widest hover:underline transition-colors">
                      CORRIGER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// @antigravity-end-of-file
