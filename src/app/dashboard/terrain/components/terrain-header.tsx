"use client";

import React from "react";
import { TerrainScore } from "../lib/terrain-types";
import { StandardPageHeader } from "@/components/layout/standard-page-header";

interface TerrainHeaderProps {
  score: TerrainScore;
}

/**
 * 🏔️ COMPONENT : TERRAIN HEADER
 * Focus : Branding, contextual status and aggregate technical score.
 * Enforced: Sabi V1.6 Silent Cockpit Model.
 */
export function TerrainHeader({ score }: TerrainHeaderProps) {
  return (
    <StandardPageHeader
      title="Le Terrain"
      metadata="Poste de Pilotage — Moteur d'Audit"
      description={
        <p>
          Moteur d'intelligence documentaire pour l'offre technique.
          <span className="block mt-1">
            Transcription terrain et mise en conformité{" "}
            <span className="text-foreground/40 uppercase font-semibold">
              DTAO v2024.1
            </span>
            .
          </span>
        </p>
      }
      cardA={{
        label: "Audit Engine",
        value: `${score.percentage}`,
        subtext: `Audit Engine ${score.percentage}`,
        progress: score.percentage,
        color: score.percentage >= 80 ? "primary" : "amber",
        valueClassName: "text-2xl",
      }}
      cardB={{
        label: "Knowledge Base",
        value: "ARMP  MINMAP",
        subtext: "Knowledge Base",
        color: "amber",
        valueClassName: "text-lg",
      }}
    />
  );
}
