// ══════════════════════════════════════════
// SABI — Dashboard Home (Phase D1.7 — Elite Cockpit)
// ══════════════════════════════════════════

import { StandardPageHeader } from "@/components/layout/standard-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Target, 
  Building2,
  Wallet,
  AlertCircle,
  FileSearch,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Compass
} from "lucide-react";
import { SABI_COPY } from "@/lib/SabiCopy";
import Link from "next/link";
import { getDerniersAO } from "@/database/queries/ao";
import { 
  getConformiteScore, 
  getSoumissionsEnCoursCount, 
  getSurfaceFinanciere 
} from "@/database/queries/dashboard";
import { getDocumentsEntreprise } from "@/database/queries/entreprise";
import { cn, formatXAF, joursRestants } from "@/lib/utils";
import { getEntrepriseContext } from "@/lib/demo-config";
import { SearchResultRow } from "@/components/search/search-result-row";
import { mapDBAOToUI } from "@/components/search/search-utils";

export const dynamic = "force-dynamic";

export default async function DashboardHome() {
  const { entrepriseId } = await getEntrepriseContext();

  // Fetch initial des données en parallèle
  const [
    dbAOs,
    conformite,
    soumissionsEnCours,
    surfaceFinanciere,
    documents
  ] = await Promise.all([
    getDerniersAO(3),
    getConformiteScore(entrepriseId),
    getSoumissionsEnCoursCount(entrepriseId),
    getSurfaceFinanciere(entrepriseId),
    getDocumentsEntreprise(entrepriseId)
  ]);

  // Mapping des opportunités DB -> UI
  const opportunities = dbAOs.map(mapDBAOToUI);

  // Analyse des documents pour le diagnostic
  const documentsExpirants = (documents || []).filter(doc => {
    const jours = joursRestants(doc.dateExpiration);
    return doc.statut === 'valide' && jours > 0 && jours <= 7;
  });

  const documentsPerimes = (documents || []).filter(doc => {
    const jours = joursRestants(doc.dateExpiration);
    return doc.statut === 'expire' || (doc.statut === 'valide' && jours <= 0);
  });

  const alertCount = documentsExpirants.length + documentsPerimes.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 antialiased bg-transparent">
      {/* ───────────────────────────────────────────────────────────
          PLAN 1 — HEADER (SOPHISTIQUE & APAISE)
          ─────────────────────────────────────────────────────────── */}
      <StandardPageHeader
        title={SABI_COPY.DASHBOARD.WELCOME}
        metadata="Poste de Pilotage — Surveillance Centrale"
        description={
          <p className="flex items-center gap-2">
            <Building2 className="size-4" />
            Standard ARMP — Secteur : BTP / Infrastructures
          </p>
        }
        cardA={{
          label: "CONFORMITE",
          value: String(conformite.score),
          subtext: `${conformite.valides}/${conformite.total} pièces`,
          progress: conformite.score,
          color: conformite.score > 80 ? "primary" : conformite.score > 50 ? "amber" : "red",
        }}
        cardB={{
          label: "RADAR MATCH",
          value: String(opportunities.length),
          subtext: "Opportunités Libres",
          color: "amber",
        }}
      />


      {/* ───────────────────────────────────────────────────────────
          PLAN 2 — METRICS (TAB BAR STRUCTURE - BRUTALISM)
          ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 bg-card border border-border/10 rounded-[4px] shadow-none overflow-hidden">
        {[
          {
            label: SABI_COPY.DASHBOARD.STATS.COMPLIANCE,
            value: `${conformite.score}%`,
            trend: conformite.valides === conformite.total ? "Dossier Complet" : `${conformite.total - conformite.valides} manquantes`,
            icon: ShieldCheck,
            trendType: conformite.score > 80 ? "pos" : "neut",
          },
          {
            label: SABI_COPY.DASHBOARD.STATS.RADAR_MATCH,
            value: String(opportunities.length),
            trend: "Opportunités détectées",
            icon: Target,
            trendType: "neut",
          },
          {
            label: SABI_COPY.DASHBOARD.STATS.FINANCIAL_SURFACE,
            value: formatXAF(surfaceFinanciere),
            trend: "CA Dernier Exercice",
            icon: Wallet,
            trendType: "neut",
          },
          {
            label: SABI_COPY.DASHBOARD.STATS.ALERTS,
            value: alertCount.toString().padStart(2, '0'),
            trend: alertCount > 0 ? "Urgence signalée" : "Aucune urgence",
            icon: AlertCircle,
            trendType: alertCount > 0 ? "alert" : "neut",
          },
        ].map((kpi, i) => (
          <div
            key={i}
             className={cn(
              "flex items-center gap-4 px-4 py-4 rounded-[4px] transition-all duration-300 relative group border",
              kpi.trendType === "alert" 
                ? "bg-red-500/5 text-foreground border-red-500/10" 
                : "bg-muted/10 text-foreground border-transparent hover:bg-muted/30 hover:border-border/50"
            )}
          >
             {/* Indicator Bar */}
             {(kpi.trendType === "alert" || kpi.trendType === "pos") && (
               <div className={cn(
                 "absolute bottom-1.5 left-1.5 right-1.5 h-[1.5px]",
                 kpi.trendType === "alert" ? "bg-red-500/80" : "bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity"
               )} />
             )}

             <div className="relative shrink-0">
               <kpi.icon className={cn(
                  "w-5 h-5 transition-all duration-300", 
                  kpi.trendType === "alert" ? "text-red-500 scale-110" : "text-muted-foreground/40 group-hover:text-primary group-hover:scale-110"
                )} />
                <div 
                  className={cn(
                    "absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-card z-10",
                    kpi.trendType === "pos" ? "bg-primary" : kpi.trendType === "alert" ? "bg-red-500" : "bg-muted-foreground/20"
                  )}
                />
             </div>

              <div className="flex flex-col items-start min-w-0 flex-1">
                 <span className={cn(
                   "text-[10px] font-semibold uppercase tracking-[0.1em] leading-none truncate w-full mb-1",
                   "text-muted-foreground/60 group-hover:text-muted-foreground transition-colors"
                 )}>
                   {kpi.label}
                 </span>
                 <div className="flex items-baseline gap-2.5 w-full h-6 overflow-hidden">
                   <span className="text-xl font-semibold tracking-tight text-foreground leading-none tabular-nums">
                     {kpi.value}
                   </span>
                  <span className={cn(
                    "text-[8px] font-semibold uppercase tracking-tight transition-colors truncate",
                    kpi.trendType === "pos" ? "text-primary/70" : kpi.trendType === "alert" ? "text-red-500/70" : "text-muted-foreground/50 group-hover:text-muted-foreground/80"
                  )}>
                    {kpi.trend}
                  </span>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* ───────────────────────────────────────────────────────────
          PLAN 3 — WORKSPACE (CANONICAL 8/4 SPLIT)
          ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {/* FLUX D'OPPORTUNITÉS (8/12) */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex items-center justify-between mb-6 h-6">
            <h2 className="text-[11px] font-semibold text-foreground/40 uppercase tracking-[0.2em]">
              Opportunités Récentes (Matches IA)
            </h2>
            <Link
              href="/dashboard/appels-offres"
              className="text-[10px] font-semibold uppercase tracking-[0.1em] text-primary hover:opacity-70 transition-all flex items-center gap-2"
            >
              Tout voir <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {opportunities.length > 0 ? (
              opportunities.map((item) => (
                <SearchResultRow key={item.id} item={item} />
              ))
            ) : (
              <div className="py-12 border border-dashed border-border/20 rounded-[4px] text-center">
                <FileSearch className="size-8 text-foreground/10 mx-auto mb-3" />
                <p className="text-[13px] text-muted-foreground/60 italic">
                  Aucune opportunité récente détectée.
                </p>
                <p className="text-[11px] text-muted-foreground/30 mt-1 uppercase tracking-widest font-semibold">
                  Radar en surveillance...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* INSPECTEUR DE CONFORMITE (4/12) — FIXED ON SCROLL */}
        <div className="lg:col-span-4 flex flex-col gap-4 sticky top-6 self-start">
          {/* CARTE 1 : ALERTES DE CONFORMITE */}
          <div className="bg-card border border-border/10 rounded-[4px] p-6 shadow-none">
            <div className="flex items-center gap-3 pb-4 border-b border-border/10 mb-6 h-6">
              <ShieldCheck className={cn("h-5 w-5", alertCount > 0 ? "text-red-500/60" : "text-primary/60")} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/30">
                Alertes Conformité
              </span>
            </div>

            {alertCount > 0 ? (
              <div className="space-y-4">
                {[...documentsPerimes, ...documentsExpirants].slice(0, 2).map((doc, idx) => (
                  <div 
                    key={doc.id}
                    className={cn(
                      "p-4 rounded-[4px] border transition-all cursor-pointer group/alert",
                      doc.statut === 'expire' || joursRestants(doc.dateExpiration) <= 0 
                        ? "bg-red-500/5 border-red-500/10 hover:border-red-500/20" 
                        : "bg-amber-500/5 border-amber-500/10 hover:border-amber-500/20"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className={cn(
                        "text-[10px] font-semibold uppercase tracking-widest leading-none",
                        doc.statut === 'expire' || joursRestants(doc.dateExpiration) <= 0 ? "text-red-500" : "text-amber-500"
                      )}>
                        {doc.pieceId}
                      </p>
                      <AlertTriangle className={cn(
                        "h-4 w-4 opacity-50 group-hover/alert:opacity-100 transition-all",
                        doc.statut === 'expire' || joursRestants(doc.dateExpiration) <= 0 ? "text-red-500" : "text-amber-500"
                      )} />
                    </div>
                    <p className="text-[13px] font-semibold text-foreground tracking-tight leading-snug">
                      {doc.statut === 'expire' || joursRestants(doc.dateExpiration) <= 0 
                        ? "Document déjà périmé" 
                        : `Expire dans ${joursRestants(doc.dateExpiration)} jours`
                      }
                    </p>
                    <p className={cn(
                      "text-[9px] font-semibold uppercase tracking-wider mt-2.5",
                      doc.statut === 'expire' || joursRestants(doc.dateExpiration) <= 0 ? "text-red-500/60" : "text-amber-500/60"
                    )}>
                      Risque de rejet ARMP
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center">
                <CheckCircle2 className="size-8 text-primary/20 mx-auto mb-3" />
                <p className="text-[12px] text-foreground/50 font-medium">Votre dossier est à jour.</p>
              </div>
            )}

            <Button className="w-full mt-6 bg-muted border border-border/10 text-foreground/50 font-semibold text-[10px] uppercase tracking-[0.2em] h-11 rounded-[4px] hover:bg-muted/80 transition-all">
              Mettre à jour le dossier
            </Button>
          </div>

          {/* CARTE 2 : RECOMMANDATIONS IA */}
          <div className="bg-card border border-border/10 rounded-[4px] p-6 shadow-none">
            <div className="flex items-center gap-3 pb-4 border-b border-border/10 mb-6 h-6">
              <Compass className="h-5 w-5 text-primary/60" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/30">
                Diagnostic ARMP
              </span>
            </div>
          
            <div className="rounded-[4px] border-l border-primary/20 pl-4 py-1">
              <p className="text-[12px] text-foreground/70 font-medium leading-relaxed tracking-tight">
                {alertCount > 0 
                  ? `Attention, vous avez ${alertCount} document(s) critiques qui nécessitent une mise à jour immédiate pour rester éligible.`
                  : "Excellent. Votre structure juridique et fiscale est parfaitement alignée avec les exigences du code des marchés publics."
                }
              </p>
            </div>

            <Link
              href="/dashboard/documents"
              className="block text-center mt-6 text-[10px] font-semibold text-primary uppercase tracking-[0.1em] hover:underline transition-all"
            >
              Accéder au coffre-fort
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
