"use client";

import React, { useState } from "react";
import { TerrainHeader } from "./components/terrain-header";
import { TerrainTabs, TerrainTabId } from "./components/terrain-tabs";
import { ModuleTranscripteur } from "./components/modules/module-transcripteur";
import { ModuleGarage } from "./components/modules/module-garage";
import { ModuleEquipe } from "./components/modules/module-equipe";
import { ModuleDescente } from "./components/modules/module-descente";
import { ModuleColeps } from "./components/modules/module-coleps";
import { MOCK_SCORE, MOCK_COLEPS } from "./lib/terrain-mock-data";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PAGE : LE TERRAIN (SABI v1.6)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Architecture : Tab-based navigation
 * Design System : Quiet Design (Clinical Light / Deep Night)
 */
export default function TerrainPage() {
  const [activeTab, setActiveTab] = useState<TerrainTabId>("transcripteur");

  const renderModule = () => {
    switch (activeTab) {
      case "transcripteur": return <ModuleTranscripteur />;
      case "garage": return <ModuleGarage />;
      case "equipe": return <ModuleEquipe />;
      case "descente": return <ModuleDescente />;
      case "coleps": return <ModuleColeps />;
      default: return <ModuleTranscripteur />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground">
      {/* Structural Header */}
      <TerrainHeader score={MOCK_SCORE} />

      {/* Navigation Tabs */}
      <TerrainTabs 
        currentTab={activeTab} 
        onTabChange={setActiveTab}
        moduleStatuses={MOCK_COLEPS.modulesStatus}
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
