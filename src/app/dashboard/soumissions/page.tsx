// ══════════════════════════════════════════
// SABI — Poste de Pilotage (Mes Soumissions)
// ══════════════════════════════════════════

"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MoreHorizontal,
  Briefcase,
  Zap,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SABI_COPY } from "@/lib/SabiCopy"
import { SoumissionCard } from "@/components/dashboard/soumission-card"
import { SubmissionInspector } from "@/components/dashboard/submission-inspector"
import { StandardPageHeader } from "@/components/layout/standard-page-header"

// --- TYPES MÉTIER (SABI v2.0) ---
type SubmissionStatus = 'MONTAGE' | 'BLINDAGE' | 'CHIFFRAGE' | 'SIGNATURE' | 'DEPOT'

interface Submission {
  id: string
  ac: string                     // Autorité Contractante
  type: string                   // AONO, ASMI, DC...
  title: string                  // Titre du Marché
  deadline: string               // J-X
  envelopeA: number              // % Blindage
  envelopeB: number              // % Technique
  envelopeC: number              // % Financière (Nkap)
  status: SubmissionStatus
  isUrgent?: boolean
  budget: string
}

const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: "SABI-104",
    ac: "FEICOM",
    type: "AONO",
    title: "Construction de l'Hôtel de Ville de Kribi - Lot 2",
    deadline: "J-05",
    envelopeA: 100,
    envelopeB: 85,
    envelopeC: 20,
    status: 'CHIFFRAGE',
    isUrgent: true,
    budget: "2.8M FCFA (Caution)"
  },
  {
    id: "SABI-101",
    ac: "MINTP",
    type: "AONO",
    title: "Travaux d'entretien routier du réseau Nord - Région de l'Extrême-Nord",
    deadline: "J-08",
    envelopeA: 100,
    envelopeB: 10,
    envelopeC: 0,
    status: 'MONTAGE',
    budget: "1.2M FCFA (Caution)"
  },
  {
    id: "SABI-102",
    ac: "MINSANTE",
    type: "ASMI",
    title: "Fourniture de kits d'hémodialyse pour le Centre National de Référence",
    deadline: "J-14",
    envelopeA: 45,
    envelopeB: 0,
    envelopeC: 0,
    status: 'MONTAGE',
    budget: "4.5M FCFA (Caution)"
  },
  {
    id: "SABI-105",
    ac: "MINMAP",
    type: "AONO",
    title: "Développement d'un SIG pour le suivi des marchés publics régionaux",
    deadline: "J-21",
    envelopeA: 100,
    envelopeB: 100,
    envelopeC: 100,
    status: 'SIGNATURE',
    budget: "0.8M FCFA (Caution)"
  },
  {
    id: "SABI-106",
    ac: "CAMTEL",
    type: "AONO",
    title: "Extension réseau fibre optique Backbone Sud",
    deadline: "Déposé",
    envelopeA: 100,
    envelopeB: 100,
    envelopeC: 100,
    status: 'DEPOT',
    budget: "Inactif"
  }
]

const COLUMNS: { id: SubmissionStatus; label: string; description: string }[] = [
  { id: 'MONTAGE', label: 'Montage', description: 'Collecte Pièces' },
  { id: 'BLINDAGE', label: 'Blindage', description: 'Enveloppe A' },
  { id: 'CHIFFRAGE', label: 'Chiffrage', description: 'Offre Nkap' },
  { id: 'SIGNATURE', label: 'Signature', description: 'Revue Finale' },
  { id: 'DEPOT', label: 'Dépôt', description: 'COLEPS / ARMP' },
]

export default function SoumissionsPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700 antialiased bg-transparent p-0 lg:p-1 overflow-hidden h-full">
      
      <StandardPageHeader
        title="Historique & Soumissions"
        metadata="Poste de Pilotage — Gestion des Offres"
        description={
          <p>
            Suivi en temps réel des dossiers d'appels d'offres en cours de montage. 
            <span className="block mt-1 italic opacity-60">
              Synchronisation automatique avec le Radar des Marchés.
            </span>
          </p>
        }
        cardA={{
          label: "SOUMISSIONS ACTIVES",
          value: "04",
          subtext: "Dossiers en Montage",
          color: "blue",
        }}
        cardB={{
          label: "EN ATTENTE",
          value: "01",
          subtext: "Signature Nécessaire",
          color: "amber",
        }}
      />

      {/* WORKSPACE - FULL WIDTH COCKPIT */}
      <div className="flex flex-col gap-6 flex-1 min-h-0 overflow-hidden">
        
        {/* PLAN 1: L'INSPECTEUR SABI (KPI RIBBON) */}
        <SubmissionInspector />

        {/* PLAN 2: LE FLUX (KANBAN FULL-WIDTH) */}
        <div className="flex flex-col min-w-0 h-full overflow-hidden">
          <div className="flex items-center justify-between mb-6 h-6 shrink-0">
            <h2 className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.3em] flex items-center gap-3">
              Cycle de Vie des Plis — Pipeline Industriel
            </h2>
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest">{MOCK_SUBMISSIONS.length} Dossiers en cours d&apos;exécution</span>
            </div>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-6 custom-scrollbar scroll-smooth flex-1 items-start min-h-0">
             {COLUMNS.map((column) => (
                 <div key={column.id} className="w-[320px] shrink-0 flex flex-col h-full bg-muted border border-border/10 rounded-[4px] p-2 hover:bg-muted/80 transition-colors group">
                   {/* Column Head */}
                    <div className="flex items-center justify-between px-3 py-3 mb-2 shrink-0 border-b border-border/10">
                      <div className="space-y-1">
                         <h3 className="text-[11px] font-bold text-foreground/40 group-hover:text-foreground/70 transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                            {column.label}
                             <div className="px-1.5 py-0.5 rounded-[4px] bg-muted/20 text-[9px] text-muted-foreground/50 group-hover:text-primary transition-colors">
                              {MOCK_SUBMISSIONS.filter(s => s.status === column.id).length}
                            </div>
                         </h3>
                         <p className="text-[9px] text-muted-foreground/20 font-bold uppercase tracking-[0.2em]">{column.description}</p>
                      </div>
                      <MoreHorizontal className="h-4 w-4 text-foreground/5 group-hover:text-foreground/20 cursor-pointer" />
                   </div>

                   {/* Column Body */}
                   <div className="space-y-3 p-1.5 overflow-y-auto custom-scrollbar min-h-0 h-full">
                      <AnimatePresence mode="popLayout">
                         {MOCK_SUBMISSIONS.filter(s => s.status === column.id).map((item) => (
                            <SoumissionCard key={item.id} item={item} />
                         ))}
                      </AnimatePresence>
                      
                      <button className="w-full py-4 border border-dashed border-border/10 rounded-[4px] text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/20 hover:text-primary/40 hover:border-primary/20 hover:bg-primary/[0.02] transition-all flex items-center justify-center gap-2 mt-2">
                         <Plus className="h-3 w-3" />
                         Injecter AO
                      </button>
                   </div>
                </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  )
}
