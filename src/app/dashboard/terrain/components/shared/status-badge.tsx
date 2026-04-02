"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ModuleStatus } from "../../lib/terrain-types";

interface StatusBadgeProps {
  status: ModuleStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const configs: Record<ModuleStatus, { label: string; color: string; bg: string }> = {
    complete: { 
      label: "Complet", 
      color: "text-primary", 
      bg: "bg-primary/10" 
    },
    warning: { 
      label: "Attention", 
      color: "text-amber-500", 
      bg: "bg-amber-500/10" 
    },
    pending: { 
      label: "En cours", 
      color: "text-blue-500", 
      bg: "bg-blue-500/10" 
    },
    empty: { 
      label: "Vide", 
      color: "text-muted-foreground", 
      bg: "bg-muted" 
    },
  };

  const config = configs[status] || configs.empty;

  return (
    <div className={cn(
      "px-2 py-0.5 rounded-sabi text-[10px] font-bold uppercase tracking-tight inline-flex items-center justify-center",
      config.bg,
      config.color,
      className
    )}>
      {config.label}
    </div>
  );
}
