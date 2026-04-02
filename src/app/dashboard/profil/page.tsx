// ══════════════════════════════════════════
// SABI — Pilotage de Capacité Métier (Profil Expert)
// ══════════════════════════════════════════

"use client"

import { motion } from "framer-motion"
import { 
  ShieldCheck, 
  Building2, 
  TrendingUp, 
  HardHat, 
  Truck, 
  RefreshCcw,
  Plus,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { StandardPageHeader } from "@/components/layout/standard-page-header"

export default function ProfilCapacitePage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 antialiased bg-transparent">
      
      {/* ───────────────────────────────────────────────────────────
          PLAN 1 — HEADER (Elite Precision)
          ─────────────────────────────────────────────────────────── */}
      <StandardPageHeader
        title="Capacité Métier"
        metadata="Poste de Pilotage — Profil Expert"
        description={
          <p>
            Pilotage des éligibilités aux marchés publics. 
            <span className="block mt-1">
              Analyse de surface financière et technique — Standards <span className="text-foreground/40 font-black uppercase tracking-widest">ARMP / MINMAP</span>.
            </span>
          </p>
        }
        cardA={{
          label: "INDEX CAPACITÉ",
          value: "88",
          subtext: "Score de Compétitivité",
          progress: 88,
          color: "blue",
        }}
        cardB={{
          label: "DOSSIER MAÎTRE",
          value: "OK",
          subtext: "00 Alerts Pending",
          color: "emerald",
        }}
      />


      {/* ───────────────────────────────────────────────────────────
          PLAN 2 — WORKSPACE CANONICAL (8/4 Split)
          ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LE FLUX (8/12) — CAPACITIES BENTO */}
        <div className="lg:col-span-8 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-6 h-6">
            <h2 className="text-[11px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
              Surface Opérationnelle & Financière
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
         {/* CARTE 1 : IDENTITÉ LÉGALE */}
         <motion.div 
            whileHover={{ y: -4 }}
            className="group bg-card/40 border border-border/10 rounded-[4px] p-6 space-y-8 backdrop-blur-sm transition-all hover:bg-card/60 dark:hover:bg-card/30 hover:border-border/20"
         >
            <div className="flex items-center justify-between">
               <div className="h-10 w-10 bg-muted/10 rounded-[4px] flex items-center justify-center border border-border/20 transition-colors">
                  <Building2 className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
               </div>
               <span className="text-[9px] font-bold text-primary/50 uppercase tracking-widest border border-primary/20 px-2 py-0.5 rounded-[2px] transition-colors">Vérifié</span>
            </div>
            
            <div className="space-y-6">
               <div className="space-y-1">
                  <h4 className="text-[11px] font-bold text-foreground/30 uppercase tracking-[0.15em] transition-colors">Raison Sociale</h4>
                  <p className="text-lg font-semibold tracking-tight text-foreground/90 transition-colors">Antigravity BTP Sarl</p>
               </div>

               <div className="grid grid-cols-1 gap-4 pt-4 border-t border-border/10">
                  {[
                     { label: "NIU", value: "M051812739430" },
                     { label: "RCCM", value: "RC/YAE/2018/B/452" },
                     { label: "Siège Social", value: "Yaoundé, Bastos" },
                     { label: "Catégorie BIP", value: "Catégorie B (Moyen)" }
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col space-y-1 group/row cursor-default transition-all hover:translate-x-1">
                        <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-[0.2em] transition-colors">{item.label}</span>
                        <span className="text-[13px] font-medium text-foreground/70 group-hover/row:text-foreground transition-colors">{item.value}</span>
                     </div>
                  ))}
               </div>
            </div>
         </motion.div>

         {/* CARTE 2 : SURFACE FINANCIÈRE */}
         <motion.div 
            whileHover={{ y: -4 }}
            className="group bg-card/40 border border-border/10 rounded-[4px] p-6 space-y-8 backdrop-blur-sm transition-all hover:bg-card/60 dark:hover:bg-card/30 hover:border-border/20"
         >
            <div className="flex items-center justify-between">
               <div className="h-10 w-10 bg-muted/10 rounded-[4px] flex items-center justify-center border border-border/20 transition-colors">
                  <TrendingUp className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
               </div>
               <div className="flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest transition-colors">Solvabilité AA</span>
               </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-[11px] font-bold text-foreground/30 uppercase tracking-[0.15em] transition-colors">Chiffre d'Affaires (Matching IA)</h3>
               
               <div className="space-y-4">
                  {[
                     { year: "2024 (N)", value: "542 300 000", growth: "+12%" },
                     { year: "2023 (N-1)", value: "480 500 000", growth: "+8%" },
                     { year: "2022 (N-2)", value: "445 000 000", growth: "+5%" }
                  ].map((row, i) => (
                     <div key={i} className="flex items-center justify-between p-3 bg-muted/5 border border-border/10 rounded-[4px] group/row transition-all hover:translate-x-1 hover:bg-muted/10">
                        <div className="space-y-0.5">
                           <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider transition-colors">{row.year}</span>
                           <p className="text-[15px] font-bold text-foreground/80 group-hover/row:text-primary transition-colors">{row.value} <span className="text-[10px] font-medium text-foreground/30 transition-colors">FCFA</span></p>
                        </div>
                        <span className="text-[10px] font-bold text-primary/80 transition-all">{row.growth}</span>
                     </div>
                  ))}
               </div>

               <div className="pt-4 border-t border-border/10">
                  <div className="flex items-center justify-between text-[11px]">
                     <span className="font-bold text-foreground/30 uppercase tracking-widest transition-colors">Capacité d'Autofinancement</span>
                     <span className="font-semibold text-foreground/70 transition-colors">85 400 000 FCFA</span>
                  </div>
               </div>
            </div>
         </motion.div>

         {/* CARTE 3 : RESSOURCES & EXPERTISE */}
         <motion.div 
            whileHover={{ y: -4 }}
            className="group bg-card/40 border border-border/10 rounded-[4px] p-6 space-y-8 backdrop-blur-sm transition-all hover:bg-card/60 dark:hover:bg-card/30 hover:border-border/20"
         >
            <div className="flex items-center justify-between">
               <div className="h-10 w-10 bg-muted/10 rounded-[4px] flex items-center justify-center border border-border/20 transition-colors">
                  <HardHat className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
               </div>
               <Button size="icon" variant="ghost" className="h-8 w-8 text-foreground/20 hover:text-foreground rounded-[4px] transition-colors">
                  <Plus size={16} />
               </Button>
            </div>

            <div className="space-y-6">
               <div className="space-y-4">
                  <h3 className="text-[11px] font-bold text-foreground/30 uppercase tracking-[0.15em] transition-colors">Ressources Humaines</h3>
                  <div className="grid grid-cols-2 gap-3">
                     <div className="p-3 bg-muted/5 border border-border/10 rounded-[4px]">
                        <p className="text-xl font-light text-foreground/80 transition-colors">08</p>
                        <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest transition-colors">Ingénieurs</span>
                     </div>
                     <div className="p-3 bg-muted/5 border border-border/10 rounded-[4px]">
                        <p className="text-xl font-light text-foreground/80 transition-colors">14</p>
                        <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest transition-colors">Techniciens</span>
                     </div>
                  </div>
               </div>

               <div className="space-y-4 pt-4 border-t border-border/10">
                  <h3 className="text-[11px] font-bold text-foreground/30 uppercase tracking-[0.15em] transition-colors">Logistique Lourde (DQE/BPU)</h3>
                  <div className="space-y-2">
                     {[
                        { icon: Truck, label: "Porte-Engins 40T", qty: "02" },
                        { icon: Truck, label: "Bennes 15-20m3", qty: "05" },
                        { icon: Truck, label: "Niveleuses (Grader)", qty: "03" }
                     ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 hover:translate-x-1 transition-all group/item">
                           <div className="flex items-center gap-3">
                              <item.icon size={14} className="text-slate-500 group-hover/item:text-primary transition-colors" />
                              <span className="text-[12px] font-medium text-foreground/60 group-hover/item:text-foreground/80 transition-colors">{item.label}</span>
                           </div>
                           <span className="text-[12px] font-bold font-mono text-foreground/30 transition-colors">{item.qty}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </motion.div>

       </div>
        </div>

        {/* L'INSPECTEUR (4/12) — SCORE & ALIGNEMENT IA */}
        <div className="lg:col-span-4 flex flex-col gap-4 sticky top-6 self-start">
          <div className="flex items-center mb-6 h-6">
            <h2 className="text-[11px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
              Analyse de Puissance
            </h2>
          </div>

          <div className="bg-card/80 backdrop-blur-md border border-border/40 rounded-[4px] p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-10 rounded-[4px] bg-primary/10 flex items-center justify-center border border-primary/20">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">Complétude Profil</p>
                <p className="text-2xl font-semibold tracking-tighter text-foreground">85%</p>
              </div>
            </div>

            <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden mb-6">
               <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-primary" 
               />
            </div>

            <p className="text-[11px] text-foreground/50 font-medium leading-relaxed tracking-tight mb-4">
              Analyse DAO activée : Vos données RCCM/NIU sont valides. Complétez vos références techniques pour atteindre 95%.
            </p>

            <Button variant="ghost" className="w-full h-9 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/5 gap-2 rounded-[4px] border border-primary/10">
               Améliorer le score <ArrowRight size={12} />
            </Button>
          </div>

          <div className="bg-card/80 backdrop-blur-md border border-border/40 rounded-[4px] p-6 shadow-sm">
             <div className="flex items-center gap-3 pb-4 border-b border-border/10 mb-6">
               <Building2 className="h-5 w-5 text-primary/60" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">
                 Levier Stratégique
               </span>
             </div>
             <p className="text-[11px] text-foreground/60 font-medium leading-relaxed tracking-tight">
               Ces données structurent votre éligibilité algorithmique aux Marchés Publics. SABI synchronise ces capacités avec le CCTP et le RPAO pour maximiser vos chances de succès.
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}
