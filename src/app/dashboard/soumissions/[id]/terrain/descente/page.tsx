export const dynamic = 'force-dynamic'

// ══════════════════════════════════════════
// SABI — Volume B : Visite de Site (Page)
// ══════════════════════════════════════════

import { notFound } from "next/navigation"
import { getVisiteTerrain } from "@/database/queries/terrain"
import { FormulaireVisite } from "@/components/terrain/formulaire-visite"
import { BoutonAnnexe16 } from "@/components/terrain/bouton-annexe-16"

interface DescentePageProps {
  params: Promise<{ id: string }>
}

export default async function DescentePage({ params }: DescentePageProps) {
  const { id } = await params
  const visite = await getVisiteTerrain(id)

  const estComplete = !!visite?.maitreOuvrageRelais && !!visite?.observations

  return (
    <div className="space-y-6 flex flex-col h-full animate-in slide-in-from-right-4 duration-500">
      
      {/* HEADER SOUS-MODULE */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-card/10 border-b border-border/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <h2 className="text-sm font-semibold text-foreground uppercase tracking-tight">Visite de Site</h2>
             <span className="text-[9px] px-1.5 py-0.5 rounded-[2px] bg-primary/10 text-primary font-semibold uppercase tracking-widest border border-primary/20">ANNEXE 16</span>
          </div>
          <p className="text-[10px] font-semibold text-muted-foreground/30 uppercase tracking-widest">
            Attestation de visite obligatoire (Art 15.1 du RPAO)
          </p>
        </div>
        
        <BoutonAnnexe16
          soumissionId={id}
          disabled={!estComplete}
          visiteData={visite}
        />
      </div>

      {/* FORMULAIRE DE SAISIE */}
      <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
         <div className="max-w-4xl mx-auto pb-20">
            <FormulaireVisite
              soumissionId={id}
              visiteExistante={visite}
            />
            
            {/* NOTE CONTEXTUELLE */}
            <div className="mt-8 p-4 rounded-[4px] border border-amber-500/10 bg-amber-500/5 flex gap-4">
              <p className="text-[10px] text-amber-600/60 leading-relaxed uppercase font-semibold italic">
                 Attention : Cette attestation doit être signée par le représentant du Maître d'Ouvrage 
                 directement sur le site des travaux. Assurez-vous d'imprimer ce modèle ou de faire 
                 signer la version fournie dans le DAO.
              </p>
            </div>
         </div>
      </div>
    </div>
  )
}
