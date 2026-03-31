"use client"

import * as React from "react"
import { BriefcaseBusiness, ShieldCheck, Sparkles, Filter, Settings, Search, Globe, Building2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface SearchSidebarProps {
  isCollapsed?: boolean
}

function FilterCheck({
  label,
  defaultChecked,
  isCollapsed
}: {
  label: string
  defaultChecked?: boolean
  isCollapsed?: boolean
}) {
  if (isCollapsed) return null
  return (
    <motion.label 
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -5 }}
      className="flex cursor-pointer items-center gap-2 py-1 text-[11px] font-bold text-foreground/50 transition-colors hover:text-foreground"
    >
      <Checkbox defaultChecked={defaultChecked} className="h-3.5 w-3.5 rounded-[4px] border-border" />
      <span className="truncate">{label}</span>
    </motion.label>
  )
}

function SidebarPill({ label, active, isCollapsed }: { label: string; active?: boolean; isCollapsed?: boolean }) {
  if (isCollapsed) return null
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex h-6 items-center rounded-[4px] border px-2 text-[10px] font-black transition-all",
        active
          ? "border-primary/20 bg-primary/10 text-primary"
          : "border-border bg-background text-foreground/50 hover:border-primary/30 hover:text-foreground"
      )}
    >
      {label}
    </motion.button>
  )
}

export function SearchSidebar({ isCollapsed }: SearchSidebarProps) {
  return (
    <div className="flex h-full flex-col bg-card/30 backdrop-blur-md">
      {/* Header Section */}
      <div className="shrink-0 px-4 py-4">
        <motion.div 
           layout
           className={cn(
             "flex items-center gap-2 text-[10px] font-black tracking-[0.1em]",
             isCollapsed ? "justify-center" : "text-foreground/40"
           )}
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-3 w-3" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                 initial={{ opacity: 0, width: 0 }}
                 animate={{ opacity: 1, width: "auto" }}
                 exit={{ opacity: 0, width: 0 }}
                 className="overflow-hidden whitespace-nowrap"
              >
                 Moteur de veille CORNAi
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="min-h-0 flex-1 px-4 overflow-y-auto no-scrollbar pb-6">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Accordion type="single" collapsible defaultValue="ia" className="w-full space-y-1">
                <AccordionItem value="ia" className="border-none">
                  <AccordionTrigger className="py-2 text-[10px] font-black tracking-wider text-foreground/40 hover:text-foreground hover:no-underline [&[data-state=open]]:text-primary transition-colors">
                    IA & Recommandations
                  </AccordionTrigger>
                  <AccordionContent className="space-y-1 pb-3 pt-1">
                    <FilterCheck label="Match excellent" defaultChecked isCollapsed={isCollapsed} />
                    <FilterCheck label="Urgents (J-15)" isCollapsed={isCollapsed} />
                    <FilterCheck label="Budgets BIP" isCollapsed={isCollapsed} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="procedure" className="border-none">
                  <AccordionTrigger className="py-2 text-[10px] font-black tracking-wider text-foreground/40 hover:text-foreground hover:no-underline [&[data-state=open]]:text-primary transition-colors">
                    Procédures
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-wrap gap-1.5 pb-3 pt-1">
                    <SidebarPill label="DC" active isCollapsed={isCollapsed} />
                    <SidebarPill label="AONO" isCollapsed={isCollapsed} />
                    <SidebarPill label="AONR" isCollapsed={isCollapsed} />
                    <SidebarPill label="AAMI" isCollapsed={isCollapsed} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="secteur" className="border-none">
                  <AccordionTrigger className="py-2 text-[10px] font-black tracking-wider text-foreground/40 hover:text-foreground hover:no-underline [&[data-state=open]]:text-primary transition-colors">
                    Secteurs clés
                  </AccordionTrigger>
                  <AccordionContent className="space-y-1 pb-3 pt-1">
                    <FilterCheck label="Travaux" isCollapsed={isCollapsed} />
                    <FilterCheck label="Fournitures" defaultChecked isCollapsed={isCollapsed} />
                    <FilterCheck label="Services" isCollapsed={isCollapsed} />
                    <FilterCheck label="Études" isCollapsed={isCollapsed} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="acheteurs" className="border-none">
                  <AccordionTrigger className="py-2 text-[10px] font-black tracking-wider text-foreground/40 hover:text-foreground hover:no-underline [&[data-state=open]]:text-primary transition-colors">
                    Maitres d'ouvrage
                  </AccordionTrigger>
                  <AccordionContent className="space-y-1 pb-3 pt-1">
                    <FilterCheck label="Ministères" defaultChecked isCollapsed={isCollapsed} />
                    <FilterCheck label="Mairies / Communes" isCollapsed={isCollapsed} />
                    <FilterCheck label="Parapublic" isCollapsed={isCollapsed} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="regions" className="border-none">
                  <AccordionTrigger className="py-2 text-[10px] font-black tracking-wider text-foreground/40 hover:text-foreground hover:no-underline [&[data-state=open]]:text-primary transition-colors">
                    Régions
                  </AccordionTrigger>
                  <AccordionContent className="space-y-1 pb-3 pt-1">
                    <FilterCheck label="Centre" defaultChecked isCollapsed={isCollapsed} />
                    <FilterCheck label="Littoral" isCollapsed={isCollapsed} />
                    <FilterCheck label="Ouest" isCollapsed={isCollapsed} />
                    <FilterCheck label="Adamaoua" isCollapsed={isCollapsed} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ) : (
            <motion.div 
               key="collapsed"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 10 }}
               className="flex flex-col items-center gap-6 pt-4"
            >
               <button title="Filtres IA" className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/50 text-primary transition-all hover:bg-primary/10">
                  <Filter className="h-4 w-4" />
               </button>
               <button title="Secteurs" className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/50 text-foreground/40 transition-all hover:bg-secondary hover:text-foreground">
                  <Settings className="h-4 w-4" />
               </button>
               <button title="Cartographie" className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/50 text-foreground/40 transition-all hover:bg-secondary hover:text-foreground">
                  <Globe className="h-4 w-4" />
               </button>
               <button title="Acheteurs" className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/50 text-foreground/40 transition-all hover:bg-secondary hover:text-foreground">
                  <Building2 className="h-4 w-4" />
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Profile Section */}
      <div className={cn(
        "shrink-0 border-t border-border/50 bg-card/80 p-4",
        isCollapsed ? "flex justify-center" : ""
      )}>
        <motion.div 
           layout
           className={cn(
             "group relative flex items-center gap-3 overflow-hidden rounded-[4px] border border-border bg-background/50 transition-all hover:border-primary/30",
             isCollapsed ? "p-1.5" : "p-2"
           )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-primary/10 text-primary transition-transform group-hover:scale-105">
            <BriefcaseBusiness className="h-4 w-4" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="min-w-0"
              >
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[11px] font-black tracking-tight">Ets. CORNAi</span>
                  <ShieldCheck className="h-3 w-3 text-primary" />
                </div>
                <div className="text-[10px] font-bold text-foreground/40 whitespace-nowrap">
                  Profil d'alerte actif
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
