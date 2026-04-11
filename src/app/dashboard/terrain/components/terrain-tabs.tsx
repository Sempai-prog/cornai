"use client";

import React from "react";
import { Mic, Warehouse, Users, MapPin, CheckCircle2, LucideIcon, Sparkles } from "lucide-react";
import { ModuleStatus } from "../lib/terrain-types";
import { cn } from "@/lib/utils";

/**
 * 🗺️ COMPONENT : TERRAIN TABS
 * Focus : Navigation entre les modules de transcription et de compilation.
 * État : Consistance design system SABI avec dots de statut actifs.
 */
export type TerrainTabId = "transcripteur" | "garage" | "equipe" | "descente" | "coleps";

interface TabConfig {
  id: TerrainTabId;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  status: ModuleStatus;
}

interface TerrainTabsProps {
  currentTab: TerrainTabId;
  onTabChange: (id: TerrainTabId) => void;
  moduleStatuses: Record<string, ModuleStatus>;
}

const TABS: TabConfig[] = [
  { id: "transcripteur", label: "Transcripteur IA", shortLabel: "Transcripteur", icon: Mic, status: "complete" },
  { id: "garage", label: "Parc Matériel", shortLabel: "Le Garage", icon: Warehouse, status: "warning" },
  { id: "equipe", label: "Organisation Équipe", shortLabel: "Personnel", icon: Users, status: "warning" },
  { id: "descente", label: "Visite des Lieux", shortLabel: "Descente", icon: MapPin, status: "empty" },
  { id: "coleps", label: "Pilotage COLEPS", shortLabel: "Compilation", icon: CheckCircle2, status: "pending" },
];

export function TerrainTabs({ currentTab, onTabChange, moduleStatuses }: TerrainTabsProps) {
  
  const getStatusColor = (status: ModuleStatus) => {
    switch (status) {
      case "complete": return "bg-primary";
      case "warning": return "bg-amber-500";
      case "pending": return "bg-blue-500";
      case "empty": return "bg-muted-foreground/20";
      default: return "bg-muted-foreground/10";
    }
  };

  return (
    <div className="flex items-center gap-2 p-1.5 bg-card border border-border/10 rounded-[4px] overflow-x-auto scrollbar-none mb-8 w-full">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        const status = moduleStatuses[tab.id] || tab.status;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-3 px-5 py-3 rounded-[4px] transition-all duration-300 relative group min-w-[140px] border",
              isActive 
                ? "bg-muted/50 text-foreground border-border" 
                : "text-muted-foreground hover:bg-muted/20 hover:text-foreground/80 border-transparent shadow-none"
            )}
          >
            {/* Active Indicator Bar */}
            {isActive && (
              <div className="absolute bottom-1.5 left-1.5 right-1.5 h-[1.5px] bg-primary" />
            )}

            <div className="relative shrink-0">
              <Icon className={cn(
                "w-4 h-4 transition-all duration-300", 
                isActive ? "text-primary scale-110" : "text-muted-foreground opacity-40 group-hover:opacity-100"
              )} />
              
              {/* Specialized AI Icon for Transcripteur */}
              {tab.id === "transcripteur" && (
                <Sparkles className={cn(
                  "absolute -top-1.5 -right-1.5 w-2.5 h-2.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity",
                  isActive && "opacity-100"
                )} />
              )}

              {/* Precise Status Dot */}
              <div 
                className={cn(
                  "absolute -bottom-1 -right-1 w-2 h-2 rounded-full border-2 border-card z-10",
                  getStatusColor(status)
                )}
              />
            </div>

            <div className="flex flex-col items-start gap-0.5">
              <span className={cn(
                "text-[10px] font-semibold uppercase tracking-[0.1em] leading-none",
                isActive ? "text-foreground" : "text-muted-foreground/60 transition-colors group-hover:text-muted-foreground"
              )}>
                {tab.shortLabel}
              </span>
              <span className="text-[8px] font-medium text-muted-foreground/40 uppercase tracking-tight group-hover:text-muted-foreground/60 transition-colors">
                Module {tab.id === "coleps" ? "Final" : "V2"}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
