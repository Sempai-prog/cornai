"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HeaderCardProps {
  label: string;
  value: string;
  subtext: string;
  color?: "primary" | "amber" | "red" | "blue" | "emerald";
  progress?: number;
}

function HeaderCard({ label, value, subtext, color = "primary", progress }: HeaderCardProps) {
  const colorMap = {
    primary: "bg-primary",
    amber: "bg-amber-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
  };

  const textMap = {
    primary: "text-primary",
    amber: "text-amber-500",
    red: "text-red-500",
    blue: "text-blue-500",
    emerald: "text-emerald-500",
  };

  return (
    <div className="size-36 aspect-square bg-card border border-border/10 rounded-[4px] p-5 flex flex-col justify-between overflow-hidden relative group/card shadow-none">
      <div className="flex flex-col gap-1">
        <div className={cn("w-6 h-[1.5px] mb-1.5", colorMap[color])} />
        <span className="text-[11px] font-bold text-muted-foreground/30 leading-tight">
          {label}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold tracking-tighter leading-none tabular-nums text-foreground/90">
            {value}
          </span>
        </div>
        
        <div className="flex flex-col gap-1.5">
          {progress !== undefined && (
            <div className="h-[2px] w-full bg-muted/20 rounded-[4px] overflow-hidden">
              <div 
                className={cn("h-full", colorMap[color])} 
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          <span className={cn("text-[10px] font-medium leading-tight", progress !== undefined ? "text-muted-foreground/30" : textMap[color])}>
            {subtext}
          </span>
        </div>
      </div>
    </div>
  );
}

interface StandardPageHeaderProps {
  title: string;
  metadata: string;
  description: React.ReactNode;
  cardA?: HeaderCardProps;
  cardB?: HeaderCardProps;
}

export function StandardPageHeader({ title, metadata, description, cardA, cardB }: StandardPageHeaderProps) {
  return (
    <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-6 px-0 pt-0 pb-6 border-b border-border/10 relative bg-transparent">
      {/* Left: Metadata & Title */}
      <div className="space-y-4 flex-1">
        <div className="flex flex-col">
          <span className="text-[12px] font-bold text-muted-foreground/40 mb-2">
            {metadata}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tighter text-foreground leading-none">
            {title}
          </h1>
        </div>
        <div className="text-[13px] text-muted-foreground/60 max-w-xl leading-relaxed font-medium">
          {description}
        </div>
      </div>

      {/* Right: Dual Dynamic Squares (High Density Architecture) */}
      {(cardA || cardB) && (
        <div className="flex gap-4 items-center shrink-0">
          {cardA && <HeaderCard {...cardA} />}
          {cardB && <HeaderCard {...cardB} />}
        </div>
      )}
    </header>
  );
}
