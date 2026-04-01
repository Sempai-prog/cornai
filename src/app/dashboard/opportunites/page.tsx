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
            <h1 className="text-3xl font-semibold tracking-tighter text-foreground">Pipeline <span className="text-muted-foreground/40 font-light">/</span> <span className="font-semibold text-primary/80">Opportunités</span></h1>
            <p className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-[0.3em] transition-colors">Management de Workflow Industriel</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
               {[1,2,3].map(i => <div key={i} className="h-6 w-6 rounded-full border border-background bg-muted/60 transition-colors" />)}
            </div>
            <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest transition-colors">+12 Experts actifs</p>
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
    <div className="w-[320px] shrink-0 flex flex-col h-full bg-muted/5 border border-border/10 rounded-[4px] p-2 transition-colors">
       {/* Column Head */}
       <div className="flex items-center justify-between px-3 py-3 mb-2 shrink-0">
          <div className="space-y-0.5">
             <h3 className="text-[11px] font-bold text-foreground/50 uppercase tracking-[0.2em] flex items-center gap-2 transition-colors">
                {column.label}
                <span className="text-[10px] text-muted-foreground/30 font-bold">{items.length}</span>
             </h3>
             <p className="text-[10px] text-muted-foreground/30 font-medium uppercase tracking-wider transition-colors">{column.description}</p>
          </div>
          <MoreHorizontal className="h-4 w-4 text-foreground/10 hover:text-foreground/40 cursor-pointer transition-colors" />
       </div>

       {/* Column Body: Seul cet élément scrolle verticalement */}
       <div className="flex-1 overflow-y-auto space-y-3 p-1 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
               <OpportunityCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
          
          {/* Nouveau: Bouton rapide d'ajout si utile */}
          <button className="w-full py-4 border border-dashed border-border/40 rounded-[4px] text-[10px] font-bold uppercase tracking-widest text-muted-foreground/20 hover:text-primary hover:border-primary/20 transition-all">
             + Ajouter une veille
          </button>
       </div>
    </div>
  )
}

function OpportunityCard({ item }: { item: Opportunity }) {
  return (
    <motion.div 
      layout
      whileHover={{ y: -2, borderColor: "var(--border)" }}
      className={cn(
        "bg-card backdrop-blur-md border border-border/40 rounded-[4px] p-4 cursor-grab transition-all hover:bg-card hover:border-border/60 shadow-sm",
        "active:cursor-grabbing active:scale-[0.98] active:shadow-lg active:z-50 duration-200"
      )}
    >
       {/* Card Header (Sigle MO | Badge & Grip) */}
       <div className="flex justify-between items-start mb-2.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 transition-colors uppercase">{item.ac} <span className="opacity-40 font-light lowercase">/ {item.type}</span></span>
          <div className="flex items-center gap-2">
              <Badge className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] border-none shadow-none uppercase tracking-wider",
                item.isUrgent ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"
              )}>
                {item.deadline}
              </Badge>
              <GripVertical size={14} className="text-muted-foreground/20 hover:text-foreground transition-colors" />
          </div>
       </div>

       {/* Card Body (Titre) */}
       <h4 className="text-[13px] font-semibold text-foreground/90 line-clamp-2 leading-relaxed mb-4 tracking-tight transition-colors">
          {item.title}
       </h4>

       {/* Envelopes Checklist (Inline Dots) */}
       <div className="flex items-center gap-4 mb-4">
          <div className="flex gap-1.5">
             <div className={cn("w-1.5 h-1.5 rounded-full", item.envelopes.a ? "bg-primary" : "bg-muted/30")} />
             <div className={cn("w-1.5 h-1.5 rounded-full", item.envelopes.b ? "bg-primary" : "bg-muted/30")} />
             <div className={cn("w-1.5 h-1.5 rounded-full", item.envelopes.c ? "bg-primary" : "bg-muted/30")} />
          </div>
          <span className="text-[10px] font-bold text-foreground/15 uppercase tracking-[0.2em] transition-colors">Envelopes A • B • C</span>
       </div>

       {/* Card Footer (Caution | Score Match) */}
       <div className="flex justify-between items-end pt-3 border-t border-border/10">
          <div className="flex flex-col gap-0.5">
             <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-widest transition-colors">Caution</span>
             <span className="text-[10px] text-muted-foreground/60 font-mono tracking-tighter flex items-center gap-1.5 transition-colors">
                <ShieldAlert size={10} className={item.caution !== "Inactif" ? "text-amber-500/40" : "text-muted-foreground/10"} />
                {item.caution}
             </span>
          </div>
          
          <div className="flex flex-col items-end gap-0.5">
             <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest transition-colors">Match IA</span>
             <Badge className="bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10 transition-colors text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] shadow-none">
                {item.score}% Match
             </Badge>
          </div>
       </div>
    </motion.div>
  )
}

