"use client";

import React, { useState } from "react";
import { TerrainHeader } from "./components/terrain-header";
import { TerrainTabs, TerrainTabId } from "./components/terrain-tabs";
import { ModuleTranscripteur } from "./components/modules/module-transcripteur";
import { ModuleGarage } from "./components/modules/module-garage";
import { ModuleEquipe } from "./components/modules/module-equipe";
import { ModuleDescente } from "./components/modules/module-descente";
import { ModuleColeps } from "./components/modules/module-coleps";
import { TerrainScore, ModuleStatus } from "./lib/terrain-types";

interface TerrainClientPageProps {
  score: TerrainScore;
  moduleStatuses: Record<string, ModuleStatus>;
  aoNom?: string;
  aoInstitution?: string;
  garageData: {
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
  }[];
  equipeData: {
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
  }[];
  descenteData?: any;
  compilationData: {
    id: string;
    nomFichier: string;
    typePiece: string | null;
    tailleMb: number;
    moduleSource: string | null;
    statut: string | null;
  }[];
}

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * CLIENT WRAPPER : LE TERRAIN (SABI v1.6)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Handles tab navigation and passes DB data to each module
 */
export function TerrainClientPage({
  score,
  moduleStatuses,
  aoNom,
  aoInstitution,
  garageData,
  equipeData,
  descenteData,
  compilationData,
}: TerrainClientPageProps) {
  const [activeTab, setActiveTab] = useState<TerrainTabId>("transcripteur");


  // Compute compilation module statuses from real data
  const compilationModuleStatuses = {
    transcripteur: moduleStatuses.transcripteur || 'complete',
    garage: moduleStatuses.garage || 'empty',
    equipe: moduleStatuses.equipe || 'empty',
    descente: moduleStatuses.descente || 'empty',
  } as Record<string, ModuleStatus>;

  const renderModule = () => {
    switch (activeTab) {
      case "transcripteur":
        return <ModuleTranscripteur aoNom={aoNom} dtaoReference="DTAO v2024.1" />;
      case "garage":
        return <ModuleGarage materiel={garageData} aoReference={aoNom} />;
      case "equipe":
        return <ModuleEquipe membres={equipeData} />;
      case "descente":
        return <ModuleDescente maitreOuvrage={aoInstitution} data={descenteData} />;
      case "coleps":
        return (
          <ModuleColeps
            pieces={compilationData}
            moduleStatuts={compilationModuleStatuses}
          />
        );
      default:
        return <ModuleTranscripteur aoNom={aoNom} dtaoReference="DTAO v2024.1" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground">
      {/* Structural Header */}
      <TerrainHeader score={score} />

      {/* Navigation Tabs */}
      <TerrainTabs
        currentTab={activeTab}
        onTabChange={setActiveTab}
        moduleStatuses={moduleStatuses}
      />

      {/* Active Module Content */}
      <main className="flex-1 animate-in fade-in duration-500 delay-150">
        <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {renderModule()}
        </div>
      </main>

      {/* Footer Meta (SABI Quiet Style) */}
      <footer className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border pt-6 pb-2 opacity-40">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
            SABI Intelligence Locale • DTAO v2024.1
          </span>
          <span className="text-[9px] uppercase font-medium tracking-tight text-muted-foreground italic">
            Module Pilotage Tactique — Phase D1.6 Master Compliance
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              COLEPS Readiness : High
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 border-l border-border pl-6">
            Ref: SABI-TR-2024
          </span>
        </div>
      </footer>
    </div>
  );
}
