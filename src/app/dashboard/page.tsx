// ══════════════════════════════════════════
// SABI — Dashboard Home (Phase D1.7 — Elite Cockpit)
// ══════════════════════════════════════════

import { StandardPageHeader } from "@/components/layout/standard-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  History, 
  Search, 
  ShieldCheck, 
  LayoutDashboard, 
  FileText, 
  Target, 
  Map, 
  FolderLock, 
  Zap,
  Building2,
  Wallet,
  TrendingDown,
  Trophy,
  AlertCircle,
  FileSearch,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Monitor,
  Lock,
  AlertTriangle,
  Compass
} from "lucide-react";
import { SABI_COPY } from "@/lib/SabiCopy";
import Link from "next/link";
import { getDerniersAO } from "@/database/queries/ao";
import { cn } from "@/lib/utils";
import { SearchResultRow } from "@/components/search/search-result-row";
import { SearchResult } from "@/components/search/search-types";

export const dynamic = "force-dynamic";

export default async function DashboardHome() {
  const recommendedAOs = await getDerniersAO(3);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 antialiased bg-transparent">
      {/* ───────────────────────────────────────────────────────────
          PLAN 1 — HEADER (SOPHISTIQUÉ & APAISÉ)
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
          label: "CONFORMITÉ",
          value: "85",
          subtext: "+5% mensuel",
          progress: 85,
          color: "primary",
        }}
        cardB={{
          label: "RADAR MATCH",
          value: "12",
          subtext: "Opportunités Libres",
          color: "amber",
        }}
      />


      {/* ───────────────────────────────────────────────────────────
          PLAN 2 — METRIC RIBBON (FUSION ABSOLUE - divide-x)
          ─────────────────────────────────────────────────────────── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 border border-border/10 divide-y md:divide-y-0 md:divide-x divide-border/10 rounded-[4px] bg-card shadow-none overflow-hidden">
        {[
          {
            label: SABI_COPY.DASHBOARD.STATS.COMPLIANCE,
            value: "85%",
            trend: "+5% vs mois dernier",
            icon: ShieldCheck,
            trendType: "pos",
          },
          {
            label: SABI_COPY.DASHBOARD.STATS.RADAR_MATCH,
            value: "12",
            trend: "2 nouvelles ce matin",
            icon: Target,
            trendType: "neut",
          },
          {
            label: SABI_COPY.DASHBOARD.STATS.FINANCIAL_SURFACE,
            value: "450M",
            trend: "Sous-total : 1.2B CFA",
            icon: Wallet,
            trendType: "neut",
          },
          {
            label: SABI_COPY.DASHBOARD.STATS.ALERTS,
            value: "02",
            trend: "Urgence signalée",
            icon: AlertCircle,
            trendType: "alert",
          },
        ].map((kpi, i) => (
          <div
            key={i}
            className="flex flex-col justify-center p-5 hover:bg-muted transition-all group"
          >
            <div className="flex items-center gap-2.5 mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
              <kpi.icon
                className={cn(
                  "h-4 w-4",
                  kpi.trendType === "alert" ? "text-red-500" : "text-primary",
                )}
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground truncate">
                {kpi.label}
              </span>
            </div>

            <div className="flex items-baseline gap-3 leading-none">
              <span className="text-3xl font-semibold tracking-tighter text-foreground">
                {kpi.value}
              </span>

              <span
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.1em]",
                  kpi.trendType === "pos"
                    ? "text-primary/80"
                    : kpi.trendType === "alert"
                      ? "text-red-500/80"
                      : "text-foreground/30",
                )}
              >
                {kpi.trend}
              </span>
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
            <h2 className="text-[11px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
              Opportunités Récentes (Matches IA)
            </h2>
            <Link
              href="/dashboard/appels-offres"
              className="text-[10px] font-bold uppercase tracking-[0.1em] text-primary hover:opacity-70 transition-all flex items-center gap-2"
            >
              Tout voir <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {[
              {
                id: "AO-2024-MINTP",
                title: "Construction du pont sur le Mbam (AONO)",
                authority: "MINTP - Direction des Investissements",
                budget: "450M FCFA",
                region: "Centre",
                deadline: "14 jours",
                type: "AONO",
                sector: "Travaux",
                matchScore: 94,
                matchLevel: "excellent" as const,
                complexiteMontage: "Moyenne" as const,
                conformitePME: {
                  enveloppeA: {
                    status: "OK" as const,
                    pieces: [{ name: "ANR", status: "valid" as const }],
                  },
                  enveloppeB: {
                    status: "OK" as const,
                    exigences: ["Expérience 5 ans", "Matériel"],
                  },
                  enveloppeC: {
                    status: "OK" as const,
                    bpuStatus: "Généré" as const,
                  },
                },
                workflowState: "opportunite" as const,
              },
              {
                id: "DC-DLA-002",
                title: "Achat de matériel informatique et réseaux",
                authority: "Mairie de Douala 1er",
                budget: "12M FCFA",
                region: "Littoral",
                deadline: "4 jours",
                type: "DC",
                sector: "Fournitures",
                matchScore: 81,
                matchLevel: "recommended" as const,
                complexiteMontage: "Faible" as const,
                conformitePME: {
                  enveloppeA: {
                    status: "OK" as const,
                    pieces: [{ name: "Quitus", status: "valid" as const }],
                  },
                  enveloppeB: {
                    status: "OK" as const,
                    exigences: ["Échantillons", "Garantie 1 an"],
                  },
                  enveloppeC: {
                    status: "OK" as const,
                    bpuStatus: "En cours" as const,
                  },
                },
                workflowState: "opportunite" as const,
              },
            ].map((item) => (
              <SearchResultRow key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* INSPECTEUR DE CONFORMITÉ (4/12) — FIXED ON SCROLL */}
        <div className="lg:col-span-4 flex flex-col gap-4 sticky top-6 self-start">
          {/* CARTE 1 : ALERTES DE CONFORMITÉ */}
          <div className="bg-card border border-border/10 rounded-[4px] p-6 shadow-none">
            <div className="flex items-center gap-3 pb-4 border-b border-border/10 mb-6 h-6">
              <ShieldCheck className="h-5 w-5 text-red-500/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">
                Alertes Conformité
              </span>
            </div>

            <div className="p-4 rounded-[4px] bg-red-500/5 border border-red-500/10 hover:border-red-500/20 transition-all cursor-pointer group/alert">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest leading-none">
                  ANR (Impôts)
                </p>
                <AlertTriangle className="h-4 w-4 text-red-500 opacity-50 group-hover/alert:opacity-100 transition-all" />
              </div>
              <p className="text-[13px] font-semibold text-foreground tracking-tight leading-snug">
                Attestation périmée dans 4 jours
              </p>
              <p className="text-[9px] text-red-500/60 font-bold uppercase tracking-wider mt-2.5">
                Risque de rejet CIPM
              </p>
            </div>

            <Button className="w-full mt-6 bg-muted border border-border/10 text-foreground/50 font-bold text-[10px] uppercase tracking-[0.2em] h-11 rounded-[4px] hover:bg-muted/80 transition-all">
              Mettre à jour le dossier
            </Button>
          </div>

          {/* CARTE 2 : RECOMMANDATIONS IA */}
          <div className="bg-card border border-border/10 rounded-[4px] p-6 shadow-none">
            <div className="flex items-center gap-3 pb-4 border-b border-border/10 mb-6 h-6">
              <Compass className="h-5 w-5 text-primary/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">
                Diagnostic ARMP
              </span>
            </div>
          
            <div className="rounded-[4px] border-l border-primary/20 pl-4 py-1">
              <p className="text-[12px] text-foreground/70 font-medium leading-relaxed tracking-tight">
                &quot;Attention, selon les directives de l&apos;ARMP, votre ANR
                date de plus de 3 mois, elle sera rejetée par la CIPM.&quot;
              </p>
            </div>

            <Link
              href="/dashboard/documents"
              className="block text-center mt-6 text-[10px] font-bold text-primary uppercase tracking-[0.1em] hover:underline transition-all"
            >
              Accéder au coffre-fort
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
