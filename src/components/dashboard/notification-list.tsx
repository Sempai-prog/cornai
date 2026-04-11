"use client";

import React, { useState, useTransition } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { fr } from "date-fns/locale";
import { 
  Bell, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  TrendingUp, 
  X, 
  Eye, 
  CheckCheck,
  ChevronRight,
  GripVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toggleRead, clearAll } from "@/app/actions/notifications";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: string;
  contenu: string | null;
  lu: boolean;
  createdAt: Date;
  referenceAo?: {
    id: string;
    titreComplet: string;
    numeroMarche: string | null;
  } | null;
}

interface NotificationListProps {
  initialNotifications: any[];
}

export function NotificationList({ initialNotifications }: NotificationListProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isPending, startTransition] = useTransition();

  const handleToggleRead = async (id: string) => {
    startTransition(async () => {
      await toggleRead(id);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, lu: true } : n)
      );
    });
  };

  const handleClearAll = async () => {
    startTransition(async () => {
      await clearAll();
      setNotifications(prev => prev.map(n => ({ ...n, lu: true })));
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "MATCHING": return <TrendingUp className="size-4 text-emerald-500" />;
      case "DEADLINE": return <AlertTriangle className="size-4 text-amber-500" />;
      case "SUBMISSION": return <FileText className="size-4 text-blue-500" />;
      case "DOCUMENT_EXPIRATION": return <AlertTriangle className="size-4 text-red-500" />;
      case "STATUS_CHANGE": return <CheckCircle2 className="size-4 text-emerald-500" />;
      default: return <Bell className="size-4 text-primary" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "MATCHING": return "Opportunité";
      case "DEADLINE": return "Échéance";
      case "SUBMISSION": return "Dossier";
      case "DOCUMENT_EXPIRATION": return "Conformité";
      case "STATUS_CHANGE": return "Mise à jour";
      default: return "Alerte";
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center bg-card/5 border-dashed border border-border/10 rounded-[4px]">
        <div className="size-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
          <Bell className="size-6 text-primary/20" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground/80 mb-2">Aucune nouvelle notification</h3>
        <p className="text-[13px] text-muted-foreground/40 max-w-[280px]">
          Votre flux est vide. Vous recevrez des alertes ici lors de nouveaux appels d'offres matchés.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="px-6 py-4 flex items-center justify-between border-b border-border/5 bg-background/40 backdrop-blur-sm sticky top-0 z-10 font-semibold uppercase tracking-[0.15em] text-[10px] text-muted-foreground/30">
        <div className="flex items-center gap-2">
          <span>{notifications.length} ÉLÉMENTS</span>
          {notifications.some(n => !n.lu) && (
            <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
          )}
        </div>
        <button 
          onClick={handleClearAll}
          disabled={isPending || !notifications.some(n => !n.lu)}
          className="flex items-center gap-1.5 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed group/btn"
        >
          <CheckCheck className="size-3 group-hover/btn:scale-110 transition-transform" />
          Tout marquer comme lu
        </button>
      </div>

      <div className="flex flex-col divide-y divide-border/5 bg-transparent">
        <AnimatePresence mode="popLayout" initial={false}>
          {notifications.map((notif, idx) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03, duration: 0.3 }}
              className={cn(
                "group relative flex items-start gap-4 p-5 transition-all duration-300 hover:bg-white/[0.02]",
                !notif.lu && "bg-primary/[0.01]"
              )}
            >
              {/* Left Accent Bar */}
              {!notif.lu && (
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary rounded-r-[2px]" />
              )}

              {/* Status Dot */}
              <div className="flex-shrink-0 pt-0.5 relative group-hover:translate-x-0.5 transition-transform">
                <div className={cn(
                  "size-8 rounded-[4px] border flex items-center justify-center transition-all duration-300",
                  notif.lu 
                    ? "bg-card/30 border-border/10 text-muted-foreground/30" 
                    : "bg-primary/10 border-primary/20 text-primary shadow-[0_0_15px_-5px_rgba(var(--primary),0.3)]"
                )}>
                  {getIcon(notif.type)}
                </div>
                {!notif.lu && (
                  <div className="absolute -top-1 -right-1 size-2.5 rounded-full bg-red-500 border-2 border-background z-10" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col gap-1 pr-6">
                <div className="flex items-center justify-between gap-4">
                  <span className={cn(
                    "font-semibold text-[10px] uppercase tracking-wider mb-0.5 px-2 py-0.5 rounded-[2px]",
                    notif.lu ? "text-muted-foreground/20 bg-muted/5" : "text-primary bg-primary/5"
                  )}>
                    {getTypeLabel(notif.type)}
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground/20 tracking-tight">
                    {isToday(notif.createdAt) 
                      ? format(notif.createdAt, "'Aujourd'hui à' HH:mm", { locale: fr })
                      : isYesterday(notif.createdAt)
                        ? format(notif.createdAt, "'Hier à' HH:mm", { locale: fr })
                        : format(notif.createdAt, "d MMM yyyy 'à' HH:mm", { locale: fr })}
                  </span>
                </div>

                <p className={cn(
                  "text-[13.5px] leading-relaxed line-clamp-2 transition-colors duration-300",
                  notif.lu ? "text-muted-foreground/30 font-normal" : "text-foreground font-semibold tracking-tight"
                )}>
                  {notif.contenu}
                </p>

                {notif.referenceAo && (
                  <div className="mt-2.5 flex items-center pt-2.5 border-t border-border/5 group/link">
                    <div className="size-1.5 rounded-full bg-muted-foreground/10 mr-2 group-hover/link:bg-primary transition-colors" />
                    <span className="text-[11px] font-semibold text-muted-foreground/20 italic truncate group-hover/link:text-muted-foreground/40 transition-colors">
                      {notif.referenceAo.numeroMarche || "Dossier"} : {notif.referenceAo.titreComplet}
                    </span>
                    <ChevronRight className="size-3 ml-2 text-muted-foreground/10 group-hover/link:translate-x-0.5 transition-all group-hover/link:text-primary" />
                  </div>
                )}
              </div>

              {/* Action */}
              {!notif.lu && (
                <button
                  onClick={() => handleToggleRead(notif.id)}
                  className="opacity-0 group-hover:opacity-100 absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-[4px] hover:bg-primary/10 text-primary transition-all duration-300 active:scale-95"
                  title="Marquer comme lu"
                >
                  <Eye className="size-4" />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
