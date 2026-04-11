"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Menu,
  Moon,
  Sun,
  MessageCircle,
  Search,
  ShieldCheck,
  FileCheck,
  Calculator,
  BellRing,
  Smartphone,
  Star,
  Globe,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldAlert,
  ArrowDown,
  X,
  Building2,
  Calendar,
  MapPin,
  BarChart3,
  Layers,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchShellCompact } from "@/components/search/search-shell-compact";
import { StackingBenefits } from "@/components/sections/stacking-benefits";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SearchResult } from "@/components/search/search-types";
import { GlobalGridBackground } from "@/components/layout/global-grid-background";

interface LandingClientProps {
  initialResults?: SearchResult[];
}

export default function LandingClient({ initialResults }: LandingClientProps) {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [annualBilling, setAnnualBilling] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans relative overflow-x-clip selection:bg-primary selection:text-white transition-colors duration-300">
      <GlobalGridBackground />
      {/* PREMIUM STYLE SYSTEM */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        :root {
          --background: 0 0% 100%;
          --foreground: 222 47% 11%;
          --card: 210 40% 98%;
          --border: 214 32% 91%;
          --primary: 142 70% 49%;
          --accent: 221 83% 53%;
          --radius: 0.25rem;
        }
        .dark {
          --background: 240 10% 4%;
          --foreground: 0 0% 98%;
          --card: 240 10% 6%;
          --border: 240 5% 15%;
          --primary: 142 70% 49%;
          --accent: 217 91% 60%;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content {
          animation: marquee 40s linear infinite;
        }
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
      `,
        }}
      />

      {/* 1. STICKY HEADER */}
      <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <header
          className={cn(
            "pointer-events-auto w-full max-w-[1100px] h-14 rounded border flex items-center justify-between px-6 transition-all duration-300 relative",
            scrolled
              ? "bg-background/80 border-border shadow-lg backdrop-blur-xl"
              : "bg-card/30 border-border/50 backdrop-blur-md",
          )}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(37,211,102,0.3)]">
              <ShieldCheck className="text-white w-4 h-4" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-lg tracking-tighter hidden sm:block">
              SABI
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40 absolute left-1/2 -translate-x-1/2">
            <a href="#radar" className="hover:text-primary transition-colors">
              Radar
            </a>
            <a
              href="#blindage"
              className="hover:text-primary transition-colors"
            >
              Blindage
            </a>
            <a href="#tarifs" className="hover:text-primary transition-colors">
              Tarifs
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 rounded hover:bg-secondary transition-colors text-foreground/50 border border-transparent hover:border-border/40"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/login"
                className="text-[10px] font-semibold hover:text-primary transition-colors text-foreground/40 uppercase tracking-[0.2em]"
              >
                Accès Cockpit
              </Link>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-black px-6 py-1.5 h-9 rounded-[4px] text-[10px] font-semibold uppercase tracking-[0.2em] shadow-none border-none transition-all active:scale-95"
              >
                <Link href="/register">S'inscrire</Link>
              </Button>
            </div>
            <button className="md:hidden p-1 text-foreground/50">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>
      </div>

      {/* 2. HERO SECTION */}
      <section className="pt-40 pb-16 px-4 text-center relative z-10">
        <div className="container mx-auto max-w-[900px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-border bg-secondary/50 backdrop-blur-sm text-[10px] font-medium uppercase tracking-widest mb-8"
          >
            <span className="text-accent">NOUVEAU</span>
            <span className="w-px h-3 bg-border"></span>
            <span className="text-foreground/40 text-center flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" /> Veille et analyse automatisées
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 leading-[0.95] text-foreground"
          >
            L'assistant qui Gagne vos <br className="hidden md:block" /> Marchés
            au Cameroun
          </motion.h1>

          <p className="text-lg md:text-xl text-foreground/45 mb-10 max-w-[650px] mx-auto font-medium leading-relaxed tracking-tight">
            Détectez les opportunités, analysez les critères bloquants et
            générez vos offres financières.{" "}
            <span className="text-foreground">SABI</span> : le standard ARMP
            pour les PME.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <div className="flex flex-col sm:flex-row items-center border border-border bg-card/50 backdrop-blur-xl rounded p-1 w-full sm:w-auto shadow-xl">
              <select className="bg-transparent text-xs p-3 outline-none cursor-pointer w-full sm:w-auto text-foreground font-medium uppercase tracking-widest rounded transition-colors hover:bg-secondary/30">
                <option value="travaux">Secteur: Travaux</option>
                <option value="fournitures">Secteur: Fournitures</option>
                <option value="services">Secteur: Services</option>
              </select>
              <div className="hidden sm:block w-px h-6 bg-border mx-2"></div>
              <select className="bg-transparent text-xs p-3 outline-none cursor-pointer w-full sm:w-auto border-t border-border sm:border-none text-foreground font-medium uppercase tracking-widest rounded transition-colors hover:bg-secondary/30">
                <option value="centre">Région: Centre</option>
                <option value="littoral">Région: Littoral</option>
                <option value="ouest">Région: Ouest</option>
              </select>
            </div>

            <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-black px-10 py-4 rounded-[4px] text-[10px] font-semibold uppercase tracking-[0.2em] flex items-center justify-center shadow-xl shadow-primary/10 transition-all active:scale-95 group border-none">
              <MessageCircle className="w-4 h-4 mr-3" />
              Parler à SABI sur WhatsApp
              <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-[10px] font-semibold uppercase tracking-widest text-foreground/30">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Conforme ARMP</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Analyse RPAO + JDM</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Zéro Carte de Crédit</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SEARCH MODULE */}
      <section className="px-4 pb-20 -mt-10 relative z-20">
        <div className="container mx-auto max-w-[1100px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-[520px] md:h-[580px] rounded-[4px] border border-border bg-background shadow-2xl overflow-hidden"
          >
            <SearchShellCompact initialResults={initialResults} />
          </motion.div>
        </div>
      </section>

      {/* 4. LOGO CLOUD */}
      <section className="py-6 border-y border-border bg-card/20 z-10 relative overflow-hidden">
        <div className="container mx-auto max-w-[880px] px-4">
          <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex w-max animate-infinite-scroll items-center gap-16 lg:gap-32 py-2">
              <div className="flex items-center gap-16 md:gap-32">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  ARMP
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  MINMAP
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  COLEPS
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  MTN MOMO
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  Orange Money
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  CNPS
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  DGSN
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  BGFI Bank
                </div>
              </div>
              <div className="flex items-center gap-16 md:gap-32">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  ARMP
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  MINMAP
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  COLEPS
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  MTN MOMO
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  Orange Money
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  CNPS
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  DGSN
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                  BGFI Bank
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STACKING BENEFITS SECTION */}
      <StackingBenefits />

      {/* 6. FEATURES GRID */}
      <section
        id="fonctionnalites"
        className="py-14 px-4 border-y border-border bg-transparent relative z-10"
      >
        <div className="container mx-auto max-w-[1100px]">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-[10px] font-semibold tracking-[0.3em] text-primary uppercase">
              IA Spécialisée
            </h2>
            <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground">
              Intelligence Locale
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 h-auto md:h-[650px]">
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-3 md:row-span-2 p-10 rounded border border-border bg-background relative overflow-hidden group shadow-none flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-all group-hover:bg-primary/10" />
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-10 ring-1 ring-primary/20 shadow-[0_0_20px_rgba(37,211,102,0.1)]">
                <Target className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 border-none px-3 py-1 text-[8px] font-semibold tracking-widest uppercase">
                  Propulsé par SABI Core v2
                </Badge>
                <h4 className="text-4xl font-semibold mb-5 text-foreground tracking-tighter leading-[0.9] uppercase">
                  Diagnostic des <br />
                  Critères Bloquants
                </h4>
                <p className="text-lg font-medium text-foreground/45 leading-relaxed max-w-sm tracking-tight">
                  SABI scanne instantanément les RPAO pour isoler les causes de
                  rejet. Ne perdez des jours sur un dossier perdu d'avance.
                </p>
              </div>
              <div className="mt-auto pt-10 flex items-center gap-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-foreground/20">
                <div className="flex items-center gap-2 text-primary/60">
                  <Check className="w-3 h-3" />
                  <span>Zéro Omission</span>
                </div>
                <div className="h-px flex-1 bg-border/40" />
                <span>ARMP Standard</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-3 md:row-span-1 p-8 rounded border border-border bg-card/40 backdrop-blur-sm flex items-center gap-8 group hover:border-primary/20 transition-all shadow-none"
            >
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-background border border-border flex items-center justify-center shadow-none group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    Conformité ARMP
                  </h4>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] uppercase">
                    100% Légal
                  </Badge>
                </div>
                <p className="text-sm font-normal text-foreground/45 leading-relaxed">
                  Processus 100% alignés sur la réglementation camerounaise en
                  vigueur.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-1 md:row-span-1 p-6 rounded border border-border bg-background flex flex-col items-center text-center justify-center group transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 ring-1 ring-primary/20">
                <Calculator className="w-5 h-5" />
              </div>
              <h4 className="text-[12px] font-medium mb-1 text-foreground">
                Génération BPU
              </h4>
              <p className="text-[9px] font-normal text-foreground/40 leading-tight">
                Élimine les reports erronés.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-1 md:row-span-1 p-6 rounded border border-border bg-background flex flex-col items-center text-center justify-center group transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 ring-1 ring-primary/20">
                <BellRing className="w-5 h-5" />
              </div>
              <h4 className="text-[12px] font-medium mb-1 text-foreground">
                Alerte WhatsApp
              </h4>
              <p className="text-[9px] font-normal text-foreground/40">
                Push direct aux gérants.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-1 md:row-span-1 p-6 rounded border border-border bg-background flex flex-col items-center text-center justify-center group transition-all overflow-hidden relative"
            >
              <div className="w-10 h-10 rounded-lg bg-foreground/5 text-foreground/40 flex items-center justify-center mb-4 border border-border">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-[12px] font-medium mb-1 text-foreground tracking-tight">
                Dashboard Veille
              </h4>
              <p className="text-[9px] font-normal text-foreground/30">
                Suivi CEMAC 24/7.
              </p>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary/5 rounded-full group-hover:bg-primary/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. PRICING SECTION */}
      <section id="tarifs" className="py-32 px-4 bg-transparent relative z-10">
        <div className="container mx-auto max-w-[1100px]">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">
              Tarifs
            </h2>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight text-foreground">
              Pourquoi choisir <br /> la solution SABI ?
            </h2>

            <div className="flex items-center justify-center gap-4 mt-12 bg-secondary/30 w-fit mx-auto p-1 rounded-full border border-border">
              <button
                onClick={() => setAnnualBilling(false)}
                className={cn(
                  "px-6 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-widest transition-all",
                  !annualBilling
                    ? "bg-background text-foreground shadow-sm"
                    : "text-foreground/30 hover:text-foreground/50",
                )}
              >
                Mensuel
              </button>
              <button
                onClick={() => setAnnualBilling(true)}
                className={cn(
                  "px-6 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-widest transition-all flex items-center gap-2",
                  annualBilling
                    ? "bg-background text-foreground shadow-sm"
                    : "text-foreground/30 hover:text-foreground/50",
                )}
              >
                Annuel <span className="text-primary">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[900px] mx-auto items-center">
            {/* Starter */}
            <div className="p-8 rounded border border-border bg-card/30 backdrop-blur-xl">
              <h4 className="text-lg font-semibold mb-2 text-foreground">
                Starter
              </h4>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-3xl font-medium text-foreground">
                  {annualBilling ? "19 900" : "24 900"}
                </span>
                <span className="text-foreground/30 text-[10px] font-medium">
                  F/MOIS
                </span>
              </div>
              <ul className="space-y-4 mb-8 text-xs font-semibold text-foreground/70">
                <li className="flex gap-3 items-center">
                  <Check className="h-3 w-3 text-primary" /> 3 Analyses IA /
                  mois
                </li>
                <li className="flex gap-3 items-center">
                  <Check className="h-3 w-3 text-primary" /> Veille
                  Départementale
                </li>
                <li className="flex gap-3 items-center text-foreground/20">
                  <X className="h-3 w-3" /> Génération BPU/DQE
                </li>
              </ul>
              <button className="w-full py-2.5 rounded border border-border hover:bg-secondary font-medium text-[10px] uppercase tracking-widest transition-all">
                Démarrer
              </button>
            </div>

            {/* Business - Populaire */}
            <div className="p-10 rounded border-[2px] border-primary bg-background shadow-none relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-full text-[9px] font-medium uppercase tracking-[0.2em] shadow-none">
                Populaire
              </div>
              <h4 className="text-lg font-medium mb-2 text-foreground text-primary">
                Business IA
              </h4>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-semibold text-foreground">
                  {annualBilling ? "49 900" : "59 900"}
                </span>
                <span className="text-foreground/30 text-[10px] font-semibold">
                  F/MOIS
                </span>
              </div>
              <ul className="space-y-4 mb-10 text-xs font-normal text-foreground">
                <li className="flex gap-3 items-center">
                  <Check className="h-4 w-4 text-primary" /> Analyses illimitées
                </li>
                <li className="flex gap-3 items-center">
                  <Check className="h-4 w-4 text-primary" /> Génération BPU
                  complète
                </li>
                <li className="flex gap-3 items-center">
                  <Check className="h-4 w-4 text-primary" /> Checklist
                  Conformité
                </li>
                <li className="flex gap-3 items-center">
                  <Check className="h-4 w-4 text-primary" /> Veille Nationale
                  WhatsApp
                </li>
              </ul>
              <button className="w-full py-3 rounded bg-primary hover:bg-primary/90 text-white font-medium text-[10px] uppercase tracking-widest shadow-none transition-all active:scale-95">
                Prendre l'avantage
              </button>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded border border-border bg-card/30 backdrop-blur-xl">
              <h4 className="text-lg font-medium mb-2 text-foreground">
                Entreprise
              </h4>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-3xl font-medium text-foreground">
                  De Luxe
                </span>
              </div>
              <ul className="space-y-4 mb-8 text-xs font-normal text-foreground/70">
                <li className="flex gap-3 items-center">
                  <Check className="h-3 w-3 text-primary" /> Accès API Direct
                </li>
                <li className="flex gap-3 items-center">
                  <Check className="h-3 w-3 text-primary" /> Expert Conformité
                  Dédié
                </li>
                <li className="flex gap-3 items-center">
                  <Check className="h-3 w-3 text-primary" /> Veille Zone CEMAC
                </li>
              </ul>
              <button className="w-full py-2.5 rounded border border-border hover:bg-secondary font-medium text-[10px] uppercase tracking-widest transition-all">
                Contact Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-24 px-4 bg-transparent relative z-10">
        <div className="container mx-auto max-w-[1100px]">
          <div className="bg-primary/5 border border-primary/20 rounded-[4px] p-12 md:p-24 text-center backdrop-blur-xl shadow-none relative overflow-hidden group">
            <h3 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8 text-foreground group-hover:scale-[1.01] transition-transform duration-700">
              Transformez votre{" "}
              <span className="text-primary">destinée commerciale</span>
            </h3>
            <p className="text-lg text-foreground/40 mb-12 max-w-2xl mx-auto font-semibold leading-relaxed">
              Rejoignez les leaders de la nouvelle économie camerounaise. L'IA
              n'est plus une option, c'est votre bouclier contre les rejets.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-black px-12 py-5 rounded-[4px] text-[10px] font-semibold uppercase tracking-[0.3em] inline-flex items-center shadow-2xl shadow-primary/20 transition-all active:scale-95 border-none">
              <MessageCircle className="w-5 h-5 mr-4" />
              Lancer le Radar SABI sur WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="border-t border-border bg-card/40 pt-20 pb-10 px-4 relative z-10 backdrop-blur-lg">
        <div className="container mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-1 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-white font-semibold text-xs">C</span>
                </div>
                <span className="font-semibold text-xl tracking-tighter text-foreground">
                  SABI
                </span>
              </div>
              <p className="text-xs font-semibold text-foreground/30 leading-relaxed uppercase tracking-widest">
                L'Intelligence Artificielle de pointe pour la commande publique
                CAMEROUN.
              </p>
            </div>

            <div>
              <h5 className="text-[10px] font-semibold mb-6 text-foreground uppercase tracking-[0.2em] opacity-30">
                Plateforme
              </h5>
              <ul className="space-y-4 text-xs font-semibold text-foreground/50">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Veille Stratégique
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Analyse DAO
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Chiffrage BPU
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] font-semibold mb-6 text-foreground uppercase tracking-[0.2em] opacity-30">
                Légal
              </h5>
              <ul className="space-y-4 text-xs font-semibold text-foreground/50">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Mentions Légales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    CGV / CGU
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] font-semibold mb-6 text-foreground uppercase tracking-[0.2em] opacity-30">
                Newsletter
              </h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="bg-background border border-border rounded px-4 py-2 text-xs w-full outline-none focus:border-primary/50 font-semibold transition-all"
                />
                <button className="bg-secondary hover:bg-border text-foreground px-4 py-2 rounded transition-all active:scale-95">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-border/40 text-[10px] font-semibold tracking-widest text-foreground/20 uppercase">
            <p>© 2026 SABI Intelligence. Marque déposée.</p>
            <div className="flex gap-6 mt-6 md:mt-0">
              <X className="w-4 h-4 cursor-pointer hover:text-primary" />
              <Globe className="h-4 w-4 cursor-pointer hover:text-primary" />
              <ExternalLink className="h-4 w-4 cursor-pointer hover:text-primary" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
