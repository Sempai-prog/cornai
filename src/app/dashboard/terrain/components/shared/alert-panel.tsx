"use client";

import React from "react";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertPanelProps {
  type: "info" | "warning" | "error";
  title: string;
  message: string;
  icon?: boolean;
}

export function AlertPanel({ type, title, message, icon = true }: AlertPanelProps) {
  const configs = {
    info: {
      color: "text-blue-500",
      bg: "bg-blue-500/5",
      border: "border-blue-500/10",
      icon: Info
    },
    warning: {
      color: "text-amber-500",
      bg: "bg-amber-500/5",
      border: "border-amber-500/10",
      icon: AlertTriangle
    },
    error: {
      color: "text-red-500",
      bg: "bg-red-500/5",
      border: "border-red-500/10",
      icon: AlertCircle
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={cn(
      "flex gap-4 p-4 rounded-[4px] border",
      config.bg,
      config.border
    )}>
      {icon && <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", config.color)} />}
      <div className="space-y-1">
        <h4 className={cn("text-sm font-bold uppercase tracking-wide", config.color)}>
          {title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}
