// ══════════════════════════════════════════
// CORNAi — Pilotage de Capacité Métier (Profil Expert)
// ══════════════════════════════════════════

"use client"

import { motion } from "framer-motion"
import { 
  ShieldCheck, 
  Building2, 
  TrendingUp, 
  HardHat, 
  Truck, 
  SyncIcon, // Note: using RefreshCcw if not available
  RefreshCcw,
  Plus,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function ProfilCapacitePage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700 pb-20 text-foreground antialiased selection:bg-primary/20">
      
      {/* 1. INDICATEUR DE COMPLÉTUDE IA (Top Bar) */}
      <div className="w-full bg-card/60 dark:bg-card/20 border border-black/5 dark:border-white/5 rounded-[4px] p-4 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group backdrop-blur-sm">
         <div className="absolute top-0 left-0 h-full w-[85%] bg-primary/[0.03] dark:bg-primary/5 transition-all duration-1000 ease-out z-0" />
         <div className="relative flex items-center gap-4 z-10">
            <div className="h-10 w-10 rounded-[4px] bg-primary/10 flex items-center justify-center border border-primary/20 transition-colors">
               <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-0.5">
               <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/80 transition-colors">Complétude du Profil IA</h3>
               <p className="text-[10px] text-foreground/50 dark:text-foreground/40 font-medium tracking-tight">Analyse DAO activée à <span className="text-primary">85%</span> — Données RCCM/NIU valides.</p>
            </div>
         </div>
         <div className="relative flex-1 max-w-md w-full z-10">
            <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-primary shadow-[0_0_10px_rgba(37,211,102,0.3)]" 
               />
            </div>
         </div>
         <div className="relative z-10">
            <Button variant="ghost" className="h-8 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/5 gap-2 rounded-[4px]">
               Améliorer le score <ArrowRight size={12} />
            </Button>
         </div>
      </div>

      {/* 2. HEADER & ACTIONS PRINCIPALES */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-black/5 dark:border-white/5 pb-8">
         <div className="space-y-2">
            <h1 className="text-4xl font-light tracking-tighter text-foreground">Capacité Métier <span className="text-foreground/20">/</span> <span className="font-semibold">BTP</span></h1>
            <p className="text-[11px] font-semibold text-foreground/40 dark:text-foreground/30 uppercase tracking-[0.2em] transition-colors">Pilotage des éligibilités aux marchés publics (ARMP / MINMAP)</p>
         </div>
         <div className="flex items-center gap-3">
            <Button variant="outline" className="h-11 px-6 rounded-[4px] border-black/10 dark:border-white/10 bg-transparent text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black/[0.03] dark:hover:bg-white/[0.03] hover:border-black/20 dark:hover:border-white/20 transition-all gap-2">
               <RefreshCcw size={14} className="text-slate-500" /> Synchroniser Coffre-fort
            </Button>
            <Button className="h-11 px-8 rounded-[4px] bg-[#25D366] text-black text-[10px] font-bold uppercase tracking-[0.25em] hover:opacity-90 transition-all shadow-[0_4px_20px_rgba(37,211,102,0.15)] border-none">
               Mettre à jour les Capacités
            </Button>
         </div>
      </div>

      {/* 3. BENTO GRID (Architecture Floating 1/3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
         {/* CARTE 1 : IDENTITÉ LÉGALE */}
         <motion.div 
            whileHover={{ y: -4 }}
            className="group bg-card/40 border border-black/5 dark:border-white/5 rounded-[4px] p-6 space-y-8 backdrop-blur-sm transition-all hover:bg-card/60 dark:hover:bg-card/30 hover:border-black/10 dark:hover:border-white/10"
         >
            <div className="flex items-center justify-between">
               <div className="h-10 w-10 bg-black/5 dark:bg-white/5 rounded-[4px] flex items-center justify-center border border-black/10 dark:border-white/10 transition-colors">
                  <Building2 className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
               </div>
               <span className="text-[9px] font-bold text-primary/50 uppercase tracking-widest border border-primary/20 px-2 py-0.5 rounded-[2px] transition-colors">Vérifié</span>
            </div>
            
            <div className="space-y-6">
               <div className="space-y-1">
                  <h4 className="text-[11px] font-bold text-foreground/30 uppercase tracking-[0.15em] transition-colors">Raison Sociale</h4>
                  <p className="text-lg font-semibold tracking-tight text-foreground/90 transition-colors">Antigravity BTP Sarl</p>
               </div>

               <div className="grid grid-cols-1 gap-4 pt-4 border-t border-black/5 dark:border-white/5">
                  {[
                     { label: "NIU", value: "M051812739430" },
                     { label: "RCCM", value: "RC/YAE/2018/B/452" },
                     { label: "Siège Social", value: "Yaoundé, Bastos" },
                     { label: "Catégorie BIP", value: "Catégorie B (Moyen)" }
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col space-y-1 group/row cursor-default transition-all hover:translate-x-1">
                        <span className="text-[9px] font-bold text-foreground/20 dark:text-foreground/20 uppercase tracking-[0.2em] transition-colors">{item.label}</span>
                        <span className="text-[13px] font-medium text-foreground/70 dark:text-foreground/60 group-hover/row:text-foreground transition-colors">{item.value}</span>
                     </div>
                  ))}
               </div>
            </div>
         </motion.div>

         {/* CARTE 2 : SURFACE FINANCIÈRE */}
         <motion.div 
            whileHover={{ y: -4 }}
            className="group bg-card/40 border border-black/5 dark:border-white/5 rounded-[4px] p-6 space-y-8 backdrop-blur-sm transition-all hover:bg-card/60 dark:hover:bg-card/30 hover:border-black/10 dark:hover:border-white/10"
         >
            <div className="flex items-center justify-between">
               <div className="h-10 w-10 bg-black/5 dark:bg-white/5 rounded-[4px] flex items-center justify-center border border-black/10 dark:border-white/10 transition-colors">
                  <TrendingUp className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
               </div>
               <div className="flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest transition-colors">Solvabilité AA</span>
               </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-[11px] font-bold text-foreground/30 uppercase tracking-[0.15em] transition-colors">Chiffre d&apos;Affaires (Matching IA)</h3>
               
               <div className="space-y-4">
                  {[
                     { year: "2024 (N)", value: "542 300 000", growth: "+12%" },
                     { year: "2023 (N-1)", value: "480 500 000", growth: "+8%" },
                     { year: "2022 (N-2)", value: "445 000 000", growth: "+5%" }
                  ].map((row, i) => (
                     <div key={i} className="flex items-center justify-between p-3 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-[4px] group/row transition-all hover:translate-x-1 hover:bg-black/[0.04] dark:hover:bg-white/[0.05]">
                        <div className="space-y-0.5">
                           <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider transition-colors">{row.year}</span>
                           <p className="text-[15px] font-bold text-foreground/80 dark:text-foreground/80 group-hover/row:text-primary transition-colors">{row.value} <span className="text-[10px] font-medium text-foreground/30 transition-colors">FCFA</span></p>
                        </div>
                        <span className="text-[10px] font-bold text-primary/80 transition-all">{row.growth}</span>
                     </div>
                  ))}
               </div>

               <div className="pt-4 border-t border-black/5 dark:border-white/5">
                  <div className="flex items-center justify-between text-[11px]">
                     <span className="font-bold text-foreground/30 uppercase tracking-widest transition-colors">Capacité d&apos;Autofinancement</span>
                     <span className="font-semibold text-foreground/70 dark:text-foreground/60 transition-colors">85 400 000 FCFA</span>
                  </div>
               </div>
            </div>
         </motion.div>

         {/* CARTE 3 : RESSOURCES & EXPERTISE */}
         <motion.div 
            whileHover={{ y: -4 }}
            className="group bg-card/40 border border-black/5 dark:border-white/5 rounded-[4px] p-6 space-y-8 backdrop-blur-sm transition-all hover:bg-card/60 dark:hover:bg-card/30 hover:border-black/10 dark:hover:border-white/10"
         >
            <div className="flex items-center justify-between">
               <div className="h-10 w-10 bg-black/5 dark:bg-white/5 rounded-[4px] flex items-center justify-center border border-black/10 dark:border-white/10 transition-colors">
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
                     <div className="p-3 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-[4px]">
                        <p className="text-xl font-light text-foreground/80 transition-colors">08</p>
                        <span className="text-[9px] font-bold text-foreground/40 dark:text-foreground/20 uppercase tracking-widest transition-colors">Ingénieurs</span>
                     </div>
                     <div className="p-3 bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-[4px]">
                        <p className="text-xl font-light text-foreground/80 transition-colors">14</p>
                        <span className="text-[9px] font-bold text-foreground/40 dark:text-foreground/20 uppercase tracking-widest transition-colors">Techniciens</span>
                     </div>
                  </div>
               </div>

               <div className="space-y-4 pt-4 border-t border-black/5 dark:border-white/5">
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
                              <span className="text-[12px] font-medium text-foreground/60 dark:text-foreground/50 group-hover/item:text-foreground/80 transition-colors">{item.label}</span>
                           </div>
                           <span className="text-[12px] font-bold font-mono text-foreground/30 transition-colors">{item.qty}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </motion.div>

      </div>

      {/* 4. FOOTER NOTE - LEVIER DE PUISSANCE */}
      <div className="flex items-center justify-center py-6">
         <p className="text-[10px] font-medium text-foreground/20 dark:text-foreground/10 uppercase tracking-[0.4em] text-center max-w-2xl leading-relaxed transition-colors">
            Ces données structurent votre éligibilité algorithmique aux Marchés Publics du Cameroun. CORNAi synchronise ces capacités avec le <span className="text-foreground/40">CCTP</span> et le <span className="text-foreground/40">RPAO</span> pour maximiser vos chances de succès.
         </p>
      </div>

    </div>
  )
}
