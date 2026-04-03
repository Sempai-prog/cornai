"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  GripVertical,
  Activity,
  ShieldAlert,
  MoreHorizontal
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { createOrGetSoumission } from "@/app/actions/soumissions"
import { Badge } from "@/components/ui/badge"
import type { Opportunity, OpportunityStatus } from "@/app/actions/matchings-pipeline"

const COLUMNS: { id: OpportunityStatus; label: string; description: string }[] = [
  { id: 'QUALIF', label: 'Veille & Qualification', description: 'Matches IA' },
  { id: 'DECISION', label: 'Go / No-Go', description: 'Critères RPAO' },
  { id: 'MONTAGE', label: 'Montage Dossier', description: 'Enveloppes A,B,C' },
  { id: 'DEPOT', label: 'Dépôt Plis', description: 'Dépôt COLEPS' },
  { id: 'ATTRIBUTION', label: 'Attribution', description: 'Résultats' },
]

export function OpportunitesBoard({ initialItems }: { initialItems: Opportunity[] }) {
  const [items, setItems] = React.useState(initialItems)

  // Recalculate global score for the sidebar
  const avgScore = items.length > 0 
    ? (items.reduce((acc, curr) => acc + curr.score, 0) / items.length).toFixed(1)
    : "0.0"

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 antialiased bg-transparent h-[calc(100vh-140px)]">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/10 mt-0 lg:mt-[-4px] shrink-0">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Pipeline Opportunités <span className="text-muted-foreground/30 font-light">/</span> <span className="text-primary/70">JDM</span>
          </h1>
          <p className="text-[11px] text-muted-foreground font-bold tracking-[0.2em] opacity-80 uppercase">
            Management de Workflow Industriel ARMP
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-7 w-7 rounded-full border-2 border-background bg-muted/60" />
            ))}
          </div>
          <p className="text-[10px] font-semibold text-foreground/40 uppercase tracking-widest">+{items.length} Opportunités</p>
        </div>
      </div>

      {/* WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        
        {/* KANBAN BOARD */}
        <div className="lg:col-span-8 flex flex-col min-w-0 h-full">
          <div className="flex items-center justify-between mb-6 h-6 shrink-0">
            <h2 className="text-[11px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
              Cycle de Vie des Soumissions
            </h2>
          </div>

          <div className="flex gap-4 overflow-x-auto min-h-0 h-full pb-6 custom-scrollbar scroll-smooth">
             {COLUMNS.map((column) => (
               <KanbanColumn 
                 key={column.id} 
                 column={column} 
                 items={items.filter(opt => opt.status === column.id)} 
               />
             ))}
          </div>
        </div>

        {/* SIDEBAR ANALYTICS */}
        <div className="lg:col-span-4 flex flex-col gap-4 sticky top-6 self-start shrink-0">
           <div className="flex items-center mb-6 h-6">
             <h2 className="text-[11px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
               Diagnostic Pipeline
             </h2>
           </div>

           <div className="bg-card border border-border/10 rounded-[4px] p-6 shadow-none">
             <div className="flex items-center gap-3 pb-4 border-b border-border/10 mb-6">
               <Activity className="h-5 w-5 text-primary/60" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">
                 Performance Matching
               </span>
             </div>
             
             <div className="space-y-4">
               <div className="p-4 rounded-[4px] bg-primary/5 border border-primary/10">
                 <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Score Global</p>
                 <p className="text-2xl font-semibold tracking-tighter text-foreground">{avgScore}%</p>
                 <p className="text-[11px] text-foreground/50 font-medium leading-relaxed mt-2 tracking-tight">
                   Ce score reflète l&apos;adéquation entre votre profil technique et les appels d&apos;offres détectés.
                 </p>
               </div>
             </div>
           </div>

           <div className="bg-card border border-border/10 rounded-[4px] p-6 shadow-none">
             <div className="flex items-center gap-3 pb-4 border-b border-border/10 mb-6">
               <ShieldAlert className="h-5 w-5 text-amber-500/60" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">
                 Alerte Capacité
               </span>
             </div>
             <p className="text-[11px] text-foreground/60 font-medium leading-relaxed tracking-tight">
                {items.filter(i => i.status === 'MONTAGE').length > 0 
                  ? `Vous avez ${items.filter(i => i.status === 'MONTAGE').length} dossiers en montage. Surveillez l'encours de vos cautions de soumission.`
                  : "Aucun dossier en montage pour le moment. Votre capacité financière est optimale."
                }
             </p>
           </div>
        </div>
      </div>
    </div>
  )
}

function KanbanColumn({ column, items }: { column: typeof COLUMNS[0], items: Opportunity[] }) {
  return (
    <div className="w-[280px] shrink-0 flex flex-col h-full bg-muted/10 border border-border/10 rounded-[4px] p-2 transition-colors">
       <div className="flex items-center justify-between px-3 py-3 mb-2 shrink-0">
          <div className="space-y-0.5">
             <h3 className="text-[11px] font-bold text-foreground/50 uppercase tracking-[0.2em] flex items-center gap-2 transition-colors">
                {column.label}
                <span className="text-[10px] text-muted-foreground/30 font-bold">{items.length}</span>
             </h3>
             <p className="text-[10px] text-muted-foreground/30 font-bold uppercase tracking-[0.2em] transition-colors">{column.description}</p>
          </div>
          <MoreHorizontal className="h-4 w-4 text-foreground/10 hover:text-foreground/40 cursor-pointer transition-colors" />
       </div>

       <div className="flex-1 overflow-y-auto space-y-3 p-1 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
               <OpportunityCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
          
          <button className="w-full py-4 border border-dashed border-border/40 rounded-[4px] text-[10px] font-bold uppercase tracking-widest text-muted-foreground/20 hover:text-primary hover:border-primary/20 transition-all">
             + Ajouter une veille
          </button>
       </div>
    </div>
  )
}

function OpportunityCard({ item }: { item: Opportunity }) {
    const router = useRouter()
    const [isStarting, setIsStarting] = React.useState(false)

    const handleAction = async () => {
        if (isStarting) return
        setIsStarting(true)
        try {
            const res = await createOrGetSoumission(item.id)
            if (res.success && res.id) {
                router.push(`/dashboard/terrain?soumissionId=${res.id}`)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsStarting(false)
        }
    }

    return (
    <motion.div 
      layout
      whileHover={{ y: -2, borderColor: "var(--border)" }}
      onClick={handleAction}
      className={cn(
        "bg-card border border-border/10 rounded-[4px] p-4 cursor-pointer transition-all hover:bg-card hover:border-border/60 shadow-none",
        isStarting && "opacity-50 grayscale",
        "active:scale-[0.98] active:z-50 duration-200"
      )}
    >
       <div className="flex justify-between items-start mb-2.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 transition-colors uppercase">{item.ac} <span className="opacity-40 font-bold lowercase">/ {item.type}</span></span>
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

       <h4 className="text-[12px] font-semibold text-foreground/90 line-clamp-2 leading-tight mb-4 tracking-tight transition-colors">
          {item.title}
       </h4>

       <div className="flex items-center gap-4 mb-4">
          <div className="flex gap-1.5">
             <div className={cn("w-1.5 h-1.5 rounded-full", item.envelopes.a ? "bg-primary" : "bg-muted/30")} />
             <div className={cn("w-1.5 h-1.5 rounded-full", item.envelopes.b ? "bg-primary" : "bg-muted/30")} />
             <div className={cn("w-1.5 h-1.5 rounded-full", item.envelopes.c ? "bg-primary" : "bg-muted/30")} />
          </div>
          <span className="text-[10px] font-bold text-foreground/15 uppercase tracking-[0.25em] transition-colors">Enveloppes A • B • C</span>
       </div>

       <div className="flex justify-between items-end pt-3 border-t border-border/10">
          <div className="flex flex-col gap-0.5">
             <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-widest transition-colors">Caution</span>
             <span className="text-[10px] text-muted-foreground/60 font-mono tracking-tighter flex items-center gap-1.5 transition-colors">
                <ShieldAlert size={10} className={item.caution !== "N/A" ? "text-amber-500/40" : "text-muted-foreground/10"} />
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
