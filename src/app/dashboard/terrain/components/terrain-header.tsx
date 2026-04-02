"use client";

import React from "react";
import { Zap, Target, ShieldCheck } from "lucide-react";
import { TerrainScore } from "../lib/terrain-types";
import { ProgressBar } from "./shared/progress-bar";

interface TerrainHeaderProps {
  score: TerrainScore;
}

/**
 * 🏔️ COMPONENT : TERRAIN HEADER
 * Focus : Branding, contextual status and aggregate technical score.
 */
export function TerrainHeader({ score }: TerrainHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 p-6 bg-card border border-border rounded-[4px] relative overflow-hidden group">
      {/* Dynamic Background Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Left: Branding & Titles */}
      <div className="space-y-1 relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-primary/10 border border-primary/20">
            <Zap className="w-3.5 h-3.5 text-primary fill-primary/20" />
            <span className="text-[10px] font-bold tracking-wider text-primary uppercase">
              Génération Volume 2
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-muted/50 border border-border">
            <ShieldCheck className="w-3 h-3 text-muted-foreground/60" />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest opacity-80">
              SABI D1.6
            </span>
          </div>
        </div>
        <h1 className="text-3xl font-black tracking-tighter text-foreground">
          Le Terrain
        </h1>
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
          Moteur d'intelligence documentaire pour l'offre technique. Transcription terrain et mise en conformité DTAO.
        </p>
      </div>

      {/* Right: Technical Score Card */}
      <div className="flex items-center gap-6 p-5 rounded-[4px] bg-muted/10 border border-border min-w-[320px] relative z-10 backdrop-blur-sm">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-[4px] bg-primary/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.1em]">
                  Score Technique
                </span>
                <span className="text-[9px] font-medium text-primary uppercase tracking-tighter">
                  Objectif de validation
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-foreground tracking-tighter leading-none">
                {score.percentage}
              </span>
              <span className="text-xs font-bold text-primary opacity-60">%</span>
            </div>
          </div>
          
          {/* Use Shared ProgressBar for consistency */}
          <ProgressBar 
            progress={score.percentage} 
            className="h-2"
          />

          <div className="flex items-center justify-between mt-3 text-[10px] font-bold uppercase tracking-tight">
            <span className="text-muted-foreground/40">
              {score.modulesValidated} / {score.modulesTotal} Modules Validés
            </span>
            <span className={score.percentage >= 80 ? "text-primary" : "text-amber-500"}>
              {score.percentage >= 80 ? "Prêt pour Dépôt" : "Action Requise"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
