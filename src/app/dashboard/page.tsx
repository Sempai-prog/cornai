// ══════════════════════════════════════════
// CORNAi — Dashboard Home (Phase D1.6 — Marchés Publics Domain Knowledge)
// ══════════════════════════════════════════

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Target, 
  FileText,
  AlertTriangle, 
  Plus,
  Compass,
  ShieldCheck,
  Activity,
  ChevronRight,
  Monitor,
  CheckCircle2,
  Lock
} from "lucide-react"
import Link from "next/link"
import { getDerniersAO } from "@/database/queries/ao"
import { cn } from "@/lib/utils"
import { SearchResultRow } from "@/components/search/search-result-row"
import { SearchResult } from "@/components/search/search-types"

export const dynamic = 'force-dynamic'

export default async function DashboardHome() {
  const recommendedAOs = await getDerniersAO(3)

  return (
    <div className="space-y-10 animate-in fade-in duration-500 antialiased bg-background">
      
      {/* ───────────────────────────────────────────────────────────
          PLAN 1 — HEADER (SOPHISTIQUÉ & APAISÉ)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5 mt-0 lg:mt-[-4px]">
        <div className="space-y-2.5">
           <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground leading-none">
              Antigravity BTP Sarl
           </h1>

           <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/30">
              <span className="flex items-center gap-1.5"><Monitor className="h-3.5 w-3.5 opacity-50" /> PILOTAGE</span>
              <span className="opacity-10">/</span>
              <span>BTP CAMEROUN (MINMAP)</span>
              <span className="opacity-10">/</span>
              <span className="flex items-center gap-1.5 text-primary opacity-80"><ShieldCheck className="h-3.5 w-3.5" /> VEILLE COLEPS ACTIVE</span>
           </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 text-[10px] font-semibold uppercase tracking-widest text-foreground/40 hover:text-foreground border-white/10 bg-white/5 rounded transition-all">
             Profil IA
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-black font-semibold text-[10px] uppercase tracking-[0.2em] h-10 px-8 rounded shadow-xl shadow-primary/10 border-none transition-all active:scale-95">
             Générer BPU / DQE
          </Button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          PLAN 2 — KPI GRID (BOUTONS DE PILOTAGE FLOATING)
          ─────────────────────────────────────────────────────────── */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "MArchés JDM & COLEPS scannés", value: "342", trend: "+25%", icon: Target, trendType: "pos" },
          { label: "Score de Matching IA", value: "87", suffix: "%", trend: "OPTIMAL", icon: Compass, trendType: "neut" },
          { label: "Dossiers en préparation", value: "03", trend: "ACTIF", icon: FileText, trendType: "neut" },
          { label: "Indice de Conformité Admin.", value: "92", suffix: "%", trend: "ALERTE", icon: ShieldCheck, trendType: "alert" },
        ].map((kpi, i) => (
          <div 
            key={i} 
            className="flex flex-col justify-center p-4 bg-[#0c0c0c]/80 backdrop-blur-sm border border-white/5 rounded-[4px] hover:bg-white/[0.02] hover:border-white/10 transition-all shadow-sm group"
          >
            <div className="flex items-center gap-2.5 mb-4 opacity-30 group-hover:opacity-100 transition-opacity">
              <kpi.icon className={cn("h-4 w-4", kpi.trendType === 'alert' ? "text-red-500" : "text-primary")} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground truncate">{kpi.label}</span>
            </div>
            
            <div className="flex items-baseline gap-3 leading-none">
              <span className="text-3xl font-semibold tracking-tighter text-white">
                 {kpi.value}{kpi.suffix && <span className="text-sm opacity-20 align-top">{kpi.suffix}</span>}
              </span>
              
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-[0.1em]",
                kpi.trendType === 'pos' ? "text-primary/80" : 
                kpi.trendType === 'alert' ? "text-red-500/80" : "text-foreground/20"
              )}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ───────────────────────────────────────────────────────────
          PLAN 3 — WORKSPACE (CONTENT CLEANUP & DOMAIN KNOWLEDGE)
          ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* FLUX D'OPPORTUNITÉS (8/12) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Opportunités Récentes (Matches IA)</h2>
               <Link href="/dashboard/appels-offres" className="text-[10px] font-semibold uppercase tracking-[0.1em] text-primary hover:opacity-70 transition-all flex items-center gap-2">
                  Tout voir <ChevronRight className="h-3 w-3" />
               </Link>
            </div>

            <div className="flex flex-col gap-2">
               {/* 
                  Utilisation du SearchResultRow pour garantir l'uniformité visuelle.
                  On passe des données "dummies" formatées selon l'interface SearchResult.
               */}
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
                     enveloppeA: { status: "OK" as const, pieces: [{ name: "ANR", status: "valid" as const }] },
                     enveloppeB: { status: "OK" as const, exigences: ["Expérience 5 ans", "Matériel"] },
                     enveloppeC: { status: "OK" as const, bpuStatus: "Généré" as const }
                   },
                   workflowState: "opportunite" as const
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
                     enveloppeA: { status: "OK" as const, pieces: [{ name: "Quitus", status: "valid" as const }] },
                     enveloppeB: { status: "OK" as const, exigences: ["Échantillons", "Garantie 1 an"] },
                     enveloppeC: { status: "OK" as const, bpuStatus: "En cours" as const }
                   },
                   workflowState: "opportunite" as const
                 },
               ].map((item) => (
                  <SearchResultRow key={item.id} item={item} />
               ))}
            </div>
         </div>

         {/* INSPECTEUR DE CONFORMITÉ (4/12) */}
         <div className="lg:col-span-4 space-y-4">
            {/* CARTE 1 : ALERTES DE CONFORMITÉ */}
            <div className="bg-[#0c0c0c]/80 backdrop-blur-md border border-white/5 rounded-[4px] p-6 shadow-sm">
               <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-6">
                  <ShieldCheck className="h-5 w-5 text-red-500/60" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50">Alertes Conformité</span>
               </div>
               
               <div className="p-4 rounded bg-red-500/[0.03] border border-red-500/10 hover:border-red-500/20 transition-all cursor-pointer group/alert">
                  <div className="flex items-center justify-between mb-2">
                     <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest leading-none">ANR (Impôts)</p>
                     <AlertTriangle className="h-4 w-4 text-red-500 opacity-50 group-hover/alert:opacity-100 transition-all" />
                  </div>
                  <p className="text-[13px] font-semibold text-white tracking-tight leading-snug">
                     Attestation périmée dans 4 jours
                  </p>
                  <p className="text-[9px] text-red-500/60 font-bold uppercase tracking-wider mt-2.5">Risque de rejet CIPM</p>
               </div>

               <Button className="w-full mt-6 bg-white/5 border border-white/5 text-foreground/40 font-bold text-[10px] uppercase tracking-[0.2em] h-11 rounded hover:bg-white/10 transition-all">
                  Mettre à jour le dossier
               </Button>
            </div>

            {/* CARTE 2 : RECOMMANDATIONS IA */}
            <div className="bg-[#0c0c0c]/80 backdrop-blur-md border border-white/5 rounded-[4px] p-6 shadow-sm">
               <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-6">
                  <Compass className="h-5 w-5 text-primary/60" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50">Diagnostic ARMP</span>
               </div>
               
               <div className="rounded border-l-2 border-primary/20 pl-4 py-1">
                  <p className="text-[12px] text-foreground/60 font-medium leading-relaxed tracking-tight italic">
                     &quot;Attention, selon les directives de l&apos;ARMP, votre ANR date de plus de 3 mois, elle sera rejetée par la CIPM.&quot;
                  </p>
               </div>

               <Link href="/dashboard/documents" className="block text-center mt-6 text-[10px] font-bold text-primary uppercase tracking-[0.1em] hover:underline transition-all">
                  Accéder au coffre-fort
               </Link>
            </div>
         </div>
      </div>

    </div>
  )
}
