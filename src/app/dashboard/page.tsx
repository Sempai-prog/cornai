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
          PLAN 2 — KPI RIBBON (METRIC RIBBON FUSION)
          ─────────────────────────────────────────────────────────── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 border border-white/5 rounded bg-card/20 backdrop-blur-md divide-y md:divide-y-0 md:divide-x divide-white/5 overflow-hidden shadow-2xl shadow-black/5">
        {[
          { label: "MArchés JDM & COLEPS scannés", value: "342", trend: "+25%", icon: Target, trendType: "pos" },
          { label: "Score de Matching IA", value: "87", suffix: "%", trend: "OPTIMAL", icon: Compass, trendType: "neut" },
          { label: "Dossiers en préparation (BPU/DQE)", value: "03", trend: "ACTIF", icon: FileText, trendType: "neut" },
          { label: "Indice de Conformité Admin.", value: "92", suffix: "%", trend: "ALERTE", icon: ShieldCheck, trendType: "alert" },
        ].map((kpi, i) => (
          <div key={i} className="flex flex-col justify-center p-5 hover:bg-white/[0.02] transition-colors cursor-default group">
            <div className="flex items-center gap-2.5 mb-2.5 opacity-30 group-hover:opacity-100 transition-opacity">
              <kpi.icon className={cn("h-3.5 w-3.5", kpi.trendType === 'alert' ? "text-red-500" : "text-primary")} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground truncate">{kpi.label}</span>
            </div>
            
            <div className="flex items-baseline gap-2.5 leading-none">
              <span className="text-3xl font-semibold tracking-tighter text-foreground">
                 {kpi.value}{kpi.suffix && <span className="text-sm opacity-20 align-top">{kpi.suffix}</span>}
              </span>
              
              <span className={cn(
                "text-[10px] font-semibold uppercase tracking-wider",
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
            <div className="flex items-center justify-between mb-4 px-1">
               <div className="flex items-center gap-3">
                  <Activity className="h-4 w-4 text-primary/60" />
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/50">Flux d&apos;opportunités (DTAO)</h3>
               </div>
               <Link href="/dashboard/appels-offres" className="text-[10px] font-semibold uppercase tracking-[0.1em] text-primary hover:opacity-70 transition-all flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded border border-primary/10">
                  Accéder au JDM <ChevronRight className="h-3 w-3" />
               </Link>
            </div>
            
            <div className="bg-card/30 backdrop-blur-xl overflow-hidden rounded shadow-2xl shadow-black/5">
               {/* Header Table (Quiet with domain logic) */}
               <div className="flex items-center gap-4 px-6 py-3.5 border-b border-white/5 bg-white/[0.02] text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/30">
                  <div className="w-12 shrink-0">TYPE</div>
                  <div className="flex-1 min-w-0">DAO / MAÎTRE D&apos;OUVRAGE</div>
                  <div className="w-[140px] shrink-0 hidden md:block">CAUTION / BUDGET</div>
                  <div className="w-[110px] shrink-0 hidden md:block">MODALITÉ</div>
                  <div className="w-[80px] shrink-0 text-right pr-4">IA SCORE</div>
               </div>

               {/* Table Content */}
               <div className="divide-y divide-white/5">
                  {[
                    { id: 1, type: "AONO", label: "Construction pont sur le Mbam", mo: "MINTP - Direction des Investissements", budget: "450M", caution: "9M", mode: "COLEPS", score: 94 },
                    { id: 2, type: "DC", label: "Achat matériel informatique", mo: "Mairie de Douala 1er", budget: "12M", caution: "240k", mode: "Physique", score: 81 },
                    { id: 3, type: "AAMI", label: "Consultance Plan Urbain", mo: "CUY Yaoundé", budget: "35M", caution: "700k", mode: "Hybride", score: 89 },
                  ].map(ao => (
                    <Link 
                      key={ao.id} 
                      href={`/dashboard/appels-offres/${ao.id}`}
                      className="flex items-center gap-4 px-6 h-20 hover:bg-white/[0.03] transition-all group"
                    >
                      <div className="w-12 shrink-0">
                         <div className="h-9 w-9 rounded bg-background border border-white/5 flex items-center justify-center font-semibold text-[9px] text-foreground/40 group-hover:bg-primary group-hover:text-black transition-all">
                            {ao.type}
                         </div>
                      </div>
                      <div className="flex-1 min-w-0 pr-4">
                         <h4 className="text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors truncate tracking-tight">{ao.label}</h4>
                         <p className="text-[10px] text-foreground/30 font-light truncate uppercase tracking-widest mt-0.5">{ao.mo}</p>
                      </div>
                      <div className="w-[140px] shrink-0 hidden md:block">
                         <p className="text-[11px] font-semibold text-foreground/60 tracking-tight leading-none">{ao.budget} FCFA</p>
                         <p className="text-[9px] text-primary/60 font-semibold uppercase tracking-wider mt-1">Caution: {ao.caution}</p>
                      </div>
                      <div className="w-[110px] shrink-0 hidden md:block">
                         <span className="text-[10px] text-foreground/40 font-semibold uppercase tracking-tight flex items-center gap-1.5">
                            {ao.mode === "COLEPS" ? <CheckCircle2 className="h-3 w-3 text-primary/60" /> : <Lock className="h-3 w-3" />}
                            {ao.mode}
                         </span>
                      </div>
                      <div className="w-[80px] shrink-0 text-right">
                         <Badge className="h-5 px-3 bg-primary/10 text-primary border-none text-[10px] font-semibold tracking-wider uppercase rounded shadow-none">{ao.score}%</Badge>
                      </div>
                    </Link>
                  ))}
               </div>
            </div>
         </div>

         {/* INSPECTEUR DE CONFORMITÉ (4/12) */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-card/40 backdrop-blur-2xl rounded p-8 relative overflow-hidden group h-fit shadow-2xl shadow-black/5">
               <div className="absolute top-0 left-0 w-1 h-1 bg-primary/40 rounded-full m-4" />
               
               <div className="space-y-8">
                  <div className="flex items-center justify-between pb-5 border-b border-white/5">
                     <div className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-primary/60" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/50">Conformité DTAO</span>
                     </div>
                     <span className="text-[10px] font-semibold text-primary/80 uppercase tracking-[0.2em]">SÉCURISÉ</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded bg-red-500/[0.03] border border-red-500/10 hover:border-red-500/20 transition-all cursor-pointer group/alert">
                       <div className="flex items-center justify-between mb-2 leading-none">
                          <p className="text-[10px] font-semibold text-red-500 uppercase tracking-widest leading-none">ANR (Impôts)</p>
                          <AlertTriangle className="h-4 w-4 text-red-500 opacity-50 group-hover/alert:opacity-100 transition-all" />
                       </div>
                       <p className="text-[13px] font-semibold text-foreground tracking-tight leading-snug">
                          Attestation périmée dans 4 jours
                       </p>
                       <p className="text-[9px] text-red-500/60 font-semibold uppercase tracking-wider mt-2.5">Risque de rejet CIPM</p>
                    </div>
                  </div>

                  <div className="pt-2">
                     <p className="text-[10px] font-semibold text-foreground/20 uppercase tracking-[0.15em] mb-3">IA Diagnostic (Code Marchés v2024)</p>
                     <p className="text-[13px] text-foreground/60 font-light leading-relaxed tracking-tight italic border-l-2 border-primary/20 pl-4 py-1">
                        &quot;Attention, selon les directives de l&apos;ARMP, votre ANR date de plus de 3 mois, elle sera rejetée par la CIPM (Commission Interne de Passation des Marchés).&quot;
                     </p>
                  </div>

                  <Button className="w-full bg-primary text-black font-semibold text-[11px] uppercase tracking-[0.2em] h-12 rounded hover:bg-primary/90 transition-all border-none shadow-xl shadow-primary/5 active:scale-[0.98]">
                     Vérifier Conformité (ARMP)
                  </Button>
               </div>
            </div>
         </div>
      </div>

    </div>
  )
}
