// ══════════════════════════════════════════
// SABI — Équipe Projet (Sprint E.4)
// ══════════════════════════════════════════

'use client'

import * as React from "react"
import { Users, UserPlus, FileCheck, ShieldAlert, Trash2, Award, Briefcase } from "lucide-react"
import { addMembreEquipe, deleteMembreEquipe } from "@/app/actions/equipe"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { DialogAjoutMembre } from "@/components/terrain/dialog-ajout-membre"

interface EquipeClientProps {
  soumissionId: string
  entrepriseId: string
  membres: any[]
}

export function EquipeClient({
  soumissionId,
  entrepriseId,
  membres
}: EquipeClientProps) {
  const handleDelete = async (id: string) => {
    const res = await deleteMembreEquipe(id, soumissionId)
    if (res.success) {
      toast.success("Membre retiré")
    }
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER ACTIONS */}
      <div className="flex items-center justify-between border-b border-border/10 pb-6">
        <div>
          <h2 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">Personnel Technique Mobilisé</h2>
          <p className="text-[10px] font-bold text-muted-foreground/30 uppercase mt-1">CVs, Qualifications et Expériences</p>
        </div>
        <DialogAjoutMembre soumissionId={soumissionId} />
      </div>

      {/* LISTE DES MEMBRES */}
      <div className="grid gap-4 md:grid-cols-2">
        {membres.length === 0 ? (
          <div className="col-span-2 py-20 text-center border border-dashed border-border/10 rounded-[4px]">
             <Users className="size-10 text-muted-foreground/10 mx-auto mb-4" />
             <p className="text-[10px] font-bold text-muted-foreground/20 uppercase tracking-[0.2em]">Aucun expert configuré pour ce marché</p>
          </div>
        ) : (
          membres.map((membre) => (
            <div key={membre.id} className="group relative bg-card border border-border/10 rounded-[4px] p-5 hover:border-primary/20 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                   <div className="size-10 rounded-[2px] bg-muted flex items-center justify-center">
                      <Briefcase className="size-5 text-muted-foreground/30" />
                   </div>
                   <div>
                      <h4 className="text-sm font-black text-foreground uppercase tracking-tight">{membre.nom}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-primary uppercase">{membre.role}</span>
                        <span className="text-[9px] text-muted-foreground/30">•</span>
                        <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">{membre.experienceAnnees} Ans d'Exp.</span>
                      </div>
                   </div>
                </div>
                <button 
                  onClick={() => handleDelete(membre.id)}
                  className="p-2 text-muted-foreground/20 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* GRID DES PIÈCES */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border/5">
                 <div className={cn(
                   "flex items-center gap-2 px-2 py-1.5 rounded-[2px] border text-[9px] font-black uppercase tracking-tighter",
                   membre.cvSigne ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-600" : "bg-muted/30 border-border/5 text-muted-foreground/40"
                 )}>
                   <FileCheck className="size-3" />
                   CV Signé
                 </div>
                 <div className={cn(
                   "flex items-center gap-2 px-2 py-1.5 rounded-[2px] border text-[9px] font-black uppercase tracking-tighter",
                   membre.diplomeCertifie ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-600" : "bg-muted/30 border-border/5 text-muted-foreground/40"
                 )}>
                   <Award className="size-3" />
                   Diplôme cert.
                 </div>
              </div>

              {membre.alerte && (
                <div className="mt-3 p-2 bg-red-500/5 border border-red-500/10 rounded-[2px] flex items-center gap-2">
                  <ShieldAlert className="size-3 text-red-500" />
                  <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">{membre.alerte}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* FOOTER NOTE */}
      <div className="p-4 bg-muted/20 border border-border/5 rounded-[4px]">
         <p className="text-[9px] text-muted-foreground/40 leading-relaxed uppercase font-bold text-center">
           Note : Les experts identifiés comme agents publics (fonctionnaires en activité) bloquent la conformité du dossier.
         </p>
      </div>

    </div>
  )
}
