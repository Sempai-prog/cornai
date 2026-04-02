"use client";

import React from "react";
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  FileCheck, 
  ShieldAlert, 
  FileText, 
  CheckCircle2,
  Plus,
  Import,
  UserPlus
} from "lucide-react";
import { MOCK_PERSONNEL } from "../../lib/terrain-mock-data";
import { PersonnelProfile, DocumentStatus } from "../../lib/terrain-types";
import { cn } from "@/lib/utils";
import { StatusBadge } from "../shared/status-badge";
import { AlertPanel } from "../shared/alert-panel";

/**
 * 👥 MODULE : L'ÉQUIPE
 * Focus : Gestion des experts, conformité des CV et diplômes selon le RPAO.
 */
export function ModuleEquipe() {
  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case "ready": return <CheckCircle2 className="w-3.5 h-3.5 text-primary" />;
      case "warning": return <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />;
      case "missing": return <div className="w-1.5 h-1.5 rounded-full bg-red-500" />;
      case "pending": return <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />;
      default: return <div className="w-1.5 h-1.5 rounded-full bg-muted" />;
    }
  };

  return (
    <div className="space-y-6 h-full pb-8">
      {/* 📋 HEADER SECTION : TEAM OVERVIEW */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-card border border-border rounded-[4px] relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-[4px] bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground tracking-tight">
              Équipe Technique Proposée
            </h3>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                {MOCK_PERSONNEL.length} Experts Engagés
              </span>
              <div className="w-1 h-1 rounded-full bg-border" />
              <span className="text-[10px] text-primary uppercase font-bold tracking-widest">
                {MOCK_PERSONNEL.filter(p => p.overallStatus === "conforme").length} Validés
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="h-9 px-4 bg-muted/40 hover:bg-muted border border-border rounded-[4px] text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-all flex items-center gap-2">
            <Import className="w-3.5 h-3.5" />
            Pool RH
          </button>
          <button className="h-9 px-4 bg-primary text-black rounded-[4px] text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2">
            <UserPlus className="w-3.5 h-3.5" />
            Ajouter Expert
          </button>
        </div>
      </div>

      {/* 👤 PERSONNEL GRID : CLARITY & DENSITY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_PERSONNEL.map((person) => (
          <div 
            key={person.id} 
            className={cn(
              "p-6 bg-card border rounded-[4px] transition-all relative group",
              person.overallStatus === "conforme" ? "border-border" : "border-red-500/10"
            )}
          >
            {/* Status Indicator Bar */}
            <div className={cn(
              "absolute top-0 left-0 right-0 h-0.5",
              person.overallStatus === "conforme" ? "bg-primary/20" : "bg-red-500/20"
            )} />

            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[4px] bg-muted/30 flex items-center justify-center border border-border text-xl font-black text-muted-foreground group-hover:bg-primary/5 group-hover:border-primary/20 group-hover:text-primary transition-all">
                  {person.fullName.charAt(0)}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-foreground">
                    {person.fullName}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.1em] bg-blue-500/5 px-2 py-0.5 rounded-[2px] border border-blue-500/10">
                      {person.posteId.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>
              <StatusBadge 
                status={person.overallStatus === "conforme" ? "complete" : "warning"}
                className={cn(
                  "text-[9px]",
                  person.overallStatus === "eliminatoire" && "text-red-500 bg-red-500/10"
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-muted-foreground/40" />
                  <span className="text-[11px] font-medium text-foreground/80 line-clamp-1">{person.qualification}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-muted-foreground/40" />
                  <span className="text-[11px] font-medium text-foreground/80">{person.experienceYears} ans d'Expérience</span>
                </div>
              </div>
              
              <div className="bg-muted/10 p-3.5 rounded-[4px] border border-border space-y-2.5">
                <p className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] mb-1">Checklist Compliance</p>
                <div className="flex items-center justify-between border-b border-border/10 pb-1.5 last:border-0 last:pb-0">
                  <span className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-tighter">CV Signé</span>
                  {getStatusIcon(person.documents.cv)}
                </div>
                <div className="flex items-center justify-between border-b border-border/10 pb-1.5 last:border-0 last:pb-0">
                  <span className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-tighter">Diplôme Certifié</span>
                  {getStatusIcon(person.documents.diploma)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-tighter">Attestations</span>
                  {getStatusIcon(person.documents.certification)}
                </div>
              </div>
            </div>

            {/* Personnel Alerts (High Intensity) */}
            {person.alerts.length > 0 && (
              <div className="space-y-2 pt-2">
                {person.alerts.map((alert, i) => (
                  <div key={i} className="p-3 bg-red-500/[0.03] border border-red-500/10 rounded-[4px]">
                    <div className="flex items-start gap-3">
                      <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                      <div className="space-y-2">
                        <p className="text-[10px] text-red-500/90 leading-relaxed font-bold uppercase tracking-tight">
                          {alert.message}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-red-500/10">
                          <span className="text-[9px] text-red-500/40 italic font-medium">Source : {alert.legalSource}</span>
                          <button className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:underline">
                            {alert.actionLabel}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 📌 GLOBAL LEGAL ADVISORY */}
      <AlertPanel 
        type="info"
        title="Rappel Règlementaire DTAO (Art. 18.1)"
        message="Les CV doivent être datés de moins de 3 mois et certifiés conformes par le soumissionnaire. SABI vérifie automatiquement l'unicité des experts sur le territoire camerounais pour éviter les doubles affectations."
      />
    </div>
  );
}
