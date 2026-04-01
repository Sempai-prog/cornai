// ══════════════════════════════════════════
// CORNAi — Pipeline des Opportunités (Board Full-Screen)
// ══════════════════════════════════════════

"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  GripVertical, 
  ChevronRight,
  ShieldAlert,
  MoreHorizontal
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// --- TYPES ---
type OpportunityStatus = 'QUALIF' | 'DECISION' | 'MONTAGE' | 'DEPOT' | 'ATTRIBUTION'

interface Opportunity {
  id: string
  ac: string                     // Autorité Contractante (MINTP, MINSANTE...)
  type: string                   // AONO, ASMI...
  title: string                  // Titre de l'AO
  deadline: string               // J-X
  caution: string                // Caution de soumission
  envelopes: { a: boolean, b: boolean, c: boolean } 
  status: OpportunityStatus
  isUrgent?: boolean
  score: number                  // Matching IA (%)
}

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: "DA-101",
    ac: "MINTP",
    type: "AONO",
    title: "Travaux d'entretien routier du réseau Nord - Région de l'Extrême-Nord",
    deadline: "J-08",
    caution: "1.2M FCFA",
    envelopes: { a: true, b: false, c: false },
    status: 'QUALIF',
    isUrgent: true,
    score: 98
  },
  {
    id: "DA-102",
    ac: "MINSANTE",
    type: "ASMI",
    title: "Fourniture de kits d'hémodialyse pour le Centre National de Référence",
    deadline: "J-14",
    caution: "4.5M FCFA",
    envelopes: { a: false, b: false, c: false },
    status: 'QUALIF',
    score: 92
  },
  {
    id: "DA-103",
    ac: "PAD",
    type: "AOIO",
    title: "Aménagement des accès portuaires (Quais 10-12) - Port de Douala",
    deadline: "J-22",
    caution: "15M FCFA",
    envelopes: { a: true, b: false, c: false },
    status: 'DECISION',
    score: 88
  },
  {
    id: "DA-104",
    ac: "FEICOM",
    type: "AONO",
    title: "Construction d'un hôtel de ville à la commune de Kribi 2",
    deadline: "J-05",
    caution: "2.8M FCFA",
    envelopes: { a: true, b: true, c: false },
    status: 'MONTAGE',
    isUrgent: true,
    score: 85
  },
  {
    id: "DA-105",
    ac: "MINMAP",
    type: "AONO",
    title: "Développement d'un SIG pour le suivi des marchés publics régionaux",
    deadline: "En attente",
    caution: "0.8M FCFA",
    envelopes: { a: true, b: true, c: true },
    status: 'DEPOT',
    score: 95
  },
  {
    id: "DA-106",
    ac: "CAMTEL",
    type: "AONO",
    title: "Extension réseau fibre optique Backbone Sud",
    deadline: "Gagné",
    caution: "Inactif",
    envelopes: { a: true, b: true, c: true },
    status: 'ATTRIBUTION',
    score: 100
  }
]

const COLUMNS: { id: OpportunityStatus; label: string; description: string }[] = [
  { id: 'QUALIF', label: 'Veille & Qualification', description: 'Matches IA' },
  { id: 'DECISION', label: 'Go / No-Go', description: 'Critères RPAO' },
  { id: 'MONTAGE', label: 'Montage Dossier', description: 'Enveloppes A,B,C' },
  { id: 'DEPOT', label: 'Dépôt Plis', description: 'Dépôt COLEPS' },
  { id: 'ATTRIBUTION', label: 'Attribution', description: 'Résultats' },
]

export default function OpportunitesPage() {
  return (
    <div className="flex-1 flex flex-col min-h-0 space-y-6">
      
      {/* HEADER: Fixe en haut */}
      <div className="flex items-end justify-between shrink-0">
         <div className="space-y-1">
            <h1 className="text-3xl font-light tracking-tighter text-foreground">Pipeline <span className="font-semibold">Opportunités</span></h1>
            <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.3em]">Management de Workflow Industriel</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
               {[1,2,3].map(i => <div key={i} className="h-6 w-6 rounded-full border border-background bg-slate-800" />)}
            </div>
            <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">+12 Experts actifs</p>
         </div>
      </div>

      {/* KANBAN BOARD: Défilement horizontal unique */}
      <div className="flex-1 flex gap-5 overflow-x-auto min-h-0 pb-4">
         {COLUMNS.map((column) => (
           <KanbanColumn 
             key={column.id} 
             column={column} 
             items={MOCK_OPPORTUNITIES.filter(opt => opt.status === column.id)} 
           />
         ))}
      </div>
    </div>
  )
}

function KanbanColumn({ column, items }: { column: typeof COLUMNS[0], items: Opportunity[] }) {
  return (
    <div className="w-[320px] shrink-0 flex flex-col h-full bg-white/[0.015] border border-white/5 rounded-[4px] p-2">
       {/* Column Head */}
       <div className="flex items-center justify-between px-3 py-3 mb-2 shrink-0">
          <div className="space-y-0.5">
             <h3 className="text-[11px] font-bold text-foreground/70 uppercase tracking-[0.2em] flex items-center gap-2">
                {column.label}
                <span className="text-[9px] text-foreground/30 font-black">{items.length}</span>
             </h3>
             <p className="text-[9px] text-foreground/20 font-medium uppercase tracking-wider">{column.description}</p>
          </div>
          <MoreHorizontal className="h-4 w-4 text-foreground/10 hover:text-foreground/40 cursor-pointer" />
       </div>

       {/* Column Body: Seul cet élément scrolle verticalement */}
       <div className="flex-1 overflow-y-auto space-y-3 p-1 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
               <OpportunityCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
          
          {/* Nouveau: Bouton rapide d'ajout si utile */}
          <button className="w-full py-4 border border-dashed border-white/5 rounded-[4px] text-[10px] font-bold uppercase tracking-widest text-foreground/10 hover:text-primary/40 hover:border-primary/20 transition-all">
             + Ajouter une veuille
          </button>
       </div>
    </div>
  )
}

function OpportunityCard({ item }: { item: Opportunity }) {
  return (
    <motion.div 
      layout
      whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.12)" }}
      className={cn(
        "bg-[#0c0c0c]/90 border border-white/5 rounded-[4px] p-4 cursor-grab transition-all hover:bg-white/[0.04]",
        "active:cursor-grabbing active:scale-[0.98] active:shadow-2xl active:z-50 duration-200"
      )}
    >
       {/* Card Header (Sigle MO | Badge & Grip) */}
       <div className="flex justify-between items-start mb-2.5">
          <span className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-500">{item.ac} <span className="opacity-20 font-light lowercase">/ {item.type}</span></span>
          <div className="flex items-center gap-2">
              <Badge className={cn(
                "text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] border-none shadow-none uppercase tracking-wider",
                item.isUrgent ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"
              )}>
                {item.deadline}
              </Badge>
              <GripVertical size={14} className="text-slate-700 hover:text-white transition-colors" />
          </div>
       </div>

       {/* Card Body (Titre) */}
       <h4 className="text-[13px] font-medium text-slate-200 line-clamp-2 leading-relaxed mb-4 tracking-tight">
          {item.title}
       </h4>

       {/* Envelopes Checklist (Inline Dots) */}
       <div className="flex items-center gap-4 mb-4">
          <div className="flex gap-1.5">
             <div className={cn("w-1.5 h-1.5 rounded-full", item.envelopes.a ? "bg-[#25D366]" : "bg-white/10")} />
             <div className={cn("w-1.5 h-1.5 rounded-full", item.envelopes.b ? "bg-[#25D366]" : "bg-white/10")} />
             <div className={cn("w-1.5 h-1.5 rounded-full", item.envelopes.c ? "bg-[#25D366]" : "bg-white/10")} />
          </div>
          <span className="text-[9px] font-bold text-foreground/15 uppercase tracking-[0.2em]">Envelopes A • B • C</span>
       </div>

       {/* Card Footer (Caution | Score Match) */}
       <div className="flex justify-between items-end pt-3 border-t border-white/5">
          <div className="flex flex-col gap-0.5">
             <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest">Caution</span>
             <span className="text-[11px] text-slate-400 font-mono tracking-tighter flex items-center gap-1.5">
                <ShieldAlert size={10} className={item.caution !== "Inactif" ? "text-amber-500/40" : "text-white/5"} />
                {item.caution}
             </span>
          </div>
          
          <div className="flex flex-col items-end gap-0.5">
             <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest">Match IA</span>
             <Badge className="bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10 transition-colors text-[9px] font-black px-1.5 py-0.5 rounded-[2px] shadow-none">
                {item.score}% Match
             </Badge>
          </div>
       </div>
    </motion.div>
  )
}
