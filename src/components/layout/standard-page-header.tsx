"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HeaderCardProps {
  label: string;
  value: string;
  subtext: string;
  color?: "primary" | "amber" | "red" | "blue" | "emerald";
  progress?: number;
  valueClassName?: string;
  labelClassName?: string;
}

function HeaderCard({ label, value, subtext, color = "primary", progress, valueClassName, labelClassName }: HeaderCardProps) {
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
    <div className="size-36 bg-card border border-border/10 rounded-[4px] p-4 flex flex-col justify-between overflow-hidden relative group/card shadow-none">
      {/* 1. TOP : INDICATOR + LABEL */}
      <div className="flex flex-col gap-1.5 shrink-0 overflow-hidden">
        <div className={cn("w-6 h-[1.5px] transition-all duration-300", colorMap[color])} />
        <span className={cn(
          "text-[9px] font-bold text-muted-foreground/30 leading-none uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis", 
          labelClassName
        )}>
          {label}
        </span>
      </div>

      {/* 2. CENTER : MAIN VALUE (PERFECT VERTICAL CENTERING) */}
      <div className="flex-1 flex items-center justify-center py-2 overflow-hidden px-1">
        <span className={cn(
          "text-2xl font-black tracking-tighter leading-[1.1] tabular-nums text-foreground/90 text-center line-clamp-2", 
          valueClassName
        )}>
          {value}
        </span>
      </div>
      
      {/* 3. BOTTOM : INDICATOR + SUBTEXT */}
      <div className="flex flex-col gap-2 shrink-0 overflow-hidden">
        {/* Dynamic or Static Balance Bar */}
        <div className="h-[1.5px] w-full bg-muted/10 rounded-full overflow-hidden relative">
          <div 
            className={cn("h-full transition-all duration-500 ease-out", colorMap[color])} 
            style={{ width: progress !== undefined ? `${progress}%` : '24px' }}
          />
        </div>
        
        <span className={cn(
          "text-[8px] font-bold uppercase tracking-widest leading-none whitespace-nowrap overflow-hidden text-ellipsis", 
          progress !== undefined ? "text-muted-foreground/40" : textMap[color]
        )}>
          {subtext}
        </span>
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
