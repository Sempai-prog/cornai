// ══════════════════════════════════════════
// SABI — Volume B : Garage (Client Component)
// ══════════════════════════════════════════

'use client'

import * as React from "react"
import { Truck, Plus, Check, Trash2, Settings, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { addEnginGlobal, affecterEnginASoumission, retirerEnginSoumission } from "@/app/actions/garage"

interface GarageClientProps {
  soumissionId: string
  entrepriseId: string
  parcGlobal: any[]
  enginsAffectes: any[]
}

export function GarageClient({
  soumissionId,
  entrepriseId,
  parcGlobal,
  enginsAffectes
}: GarageClientProps) {
  const [isAdding, setIsAdding] = React.useState(false)

  const handleAffecter = async (enginId: string) => {
    const res = await affecterEnginASoumission(soumissionId, enginId, "Mobilisation Chantier")
    if (res.succes) {
      toast.success("Engin affecté au marché")
    }
  }

  const handleRetirer = async (id: string) => {
    const res = await retirerEnginSoumission(id, soumissionId)
    if (res.succes) {
      toast.success("Engin retiré de la soumission")
    }
  }

  const idsAffectes = new Set(enginsAffectes.map(a => a.enginId))

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 p-6 md:p-8 overflow-y-auto h-full custom-scrollbar">
      
      {/* ───────────────────────────────────────────────────────────
          AFFECTÉS À CE MARCHÉ
          ─────────────────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground uppercase tracking-tight">Matériel Affecté au Dossier</h3>
            <p className="text-[10px] font-semibold text-muted-foreground/30 uppercase tracking-widest">
              Engins mobilisés pour l'exécution du marché
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-[4px] bg-emerald-500/5 border border-emerald-500/10">
            <span className="text-[10px] font-semibold text-emerald-600 uppercase tabular-nums">{enginsAffectes.length}</span>
            <span className="text-[9px] font-semibold text-emerald-600/40 uppercase tracking-widest">UNITÉS</span>
          </div>
        </div>

        {enginsAffectes.length === 0 ? (
          <div className="border border-dashed border-border/10 rounded-[4px] p-12 text-center bg-card/5">
            <Truck className="w-10 h-10 text-muted-foreground/10 mx-auto mb-4" />
            <p className="text-[10px] font-semibold text-muted-foreground/30 uppercase tracking-[0.2em]">Aucun engin mobilisé pour ce dossier</p>
            <p className="text-[9px] text-muted-foreground/20 uppercase font-semibold mt-1">Sélectionnez du matériel dans votre parc global ci-dessous</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {enginsAffectes.map((affectation) => (
              <div key={affectation.id} className="relative group bg-background border border-border/20 rounded-[4px] p-4 hover:border-primary/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-[4px] bg-primary/5 text-primary border border-primary/10">
                    <Truck className="w-4 h-4" />
                  </div>
                  <button 
                    onClick={() => handleRetirer(affectation.id)}
                    className="p-1 rounded-[4px] text-muted-foreground/20 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-foreground uppercase truncate">{affectation.engin.nom}</h4>
                  <p className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-tighter mb-2">{affectation.engin.type} · {affectation.engin.marque}</p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/5">
                    <Settings className="w-3 h-3 text-muted-foreground/20" />
                    <span className="text-[9px] font-semibold text-muted-foreground/30 uppercase tracking-widest">{affectation.roleMarche}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ───────────────────────────────────────────────────────────
          PARC GLOBAL (BIBLIOTHÈQUE)
          ─────────────────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-6 pt-10 border-t border-border/5">
          <div>
            <h3 className="text-lg font-semibold text-foreground uppercase tracking-tight">Parc d'Entrepôt Global</h3>
            <p className="text-[10px] font-semibold text-muted-foreground/30 uppercase tracking-widest">
              Gérez votre bibliothèque d'équipements PME
            </p>
          </div>
          <Button 
            size="sm" 
            className="rounded-[4px] text-[10px] font-semibold uppercase tracking-widest gap-2"
          >
            <Plus className="w-3 h-3" />
            Nouvel Engin PME
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 opacity-70 hover:opacity-100 transition-opacity">
          {parcGlobal.filter(e => !idsAffectes.has(e.id)).map((engin) => (
            <div key={engin.id} className="bg-card/30 border border-border/5 rounded-[4px] p-4 hover:bg-card/50 transition-all">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-[2px] bg-muted/50 text-muted-foreground/40 uppercase tracking-widest border border-border/10">
                    Stock
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2 text-[9px] font-semibold uppercase tracking-widest hover:text-primary transition-colors"
                    onClick={() => handleAffecter(engin.id)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Affecter
                  </Button>
               </div>
               <h4 className="text-[11px] font-semibold text-foreground/40 uppercase truncate">{engin.nom}</h4>
               <p className="text-[9px] font-semibold text-muted-foreground/20 uppercase tracking-tighter truncate">{engin.immatriculation || 'SANS IMMAT'}</p>
            </div>
          ))}

          {/* ADD CARD */}
          <button className="border border-dashed border-border/20 rounded-[4px] p-4 flex flex-col items-center justify-center text-muted-foreground/20 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all group">
             <Plus className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
             <span className="text-[9px] font-semibold uppercase tracking-widest">Ajouter au parc</span>
          </button>
        </div>
      </section>

      <div className="p-4 rounded-[4px] border border-blue-500/10 bg-blue-500/5 flex gap-4">
        <Info className="w-5 h-5 text-blue-500 shrink-0" />
        <p className="text-[10px] text-blue-600/60 leading-relaxed uppercase font-semibold">
           Note stratégique : Un parc matériel correctement géolocalisé et entretenu est un argument de poids 
           dans l'évaluation de la capacité technique de votre entreprise par la sous-commission.
        </p>
      </div>

    </div>
  )
}
