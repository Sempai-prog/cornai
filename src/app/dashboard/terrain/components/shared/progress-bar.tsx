"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ progress, label, className }: ProgressBarProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight text-muted-foreground">
          <span>{label}</span>
          <span>{progress}%</span>
        </div>
      )}
      <div className="h-1.5 w-full bg-muted rounded-[4px] overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 rounded-[4px]" 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  );
}
