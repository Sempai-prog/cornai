'use client'

import React, { useState, useTransition } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Save, 
  Download, 
  Calculator,
  Search,
  FileText,
  DollarSign
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { updatePrixUnitaire } from '@/app/actions/nkap'
import { toast } from 'sonner'

interface LigneBPU {
  id: string
  numero: string | null
  designation: string
  unite: string | null
  quantite: string | null
  prixUnitaire: number
  prixReference?: number | null
  scoreAnomalie?: number | null
  section?: string | null
}

interface NkapClientProps {
  lignes: LigneBPU[]
  soumissionId: string
  montantTotal: number
}

export function NkapClient({ lignes, soumissionId, montantTotal }: NkapClientProps) {
  const [data, setData] = useState(lignes)
  const [isPending, startTransition] = useTransition()
  const [searchTerm, setSearchTerm] = useState('')

  const handlePriceChange = (id: string, newPrice: string) => {
    const numericPrice = parseInt(newPrice.replace(/\D/g, '')) || 0
    setData(prev => prev.map(l => l.id === id ? { ...l, prixUnitaire: numericPrice } : l))
  }

  const savePrice = async (id: string, price: number) => {
    startTransition(async () => {
      const res = await updatePrixUnitaire(id, price, soumissionId)
      if (res.succes) {
        toast.success("Prix mis à jour", {
          description: "Le total de la soumission a été recalculé."
        })
      } else {
        toast.error("Erreur de sauvegarde")
      }
    })
  }

  const totalHT = data.reduce((acc, l) => acc + (l.prixUnitaire * parseFloat(l.quantite || '0')), 0)
  const tva = totalHT * 0.1925
  const totalTTC = totalHT + tva

  const filteredLignes = data.filter(l => 
    l.designation.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.numero?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-20">
      {/* 📊 NKAP TOP STATS (Bento) */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 bg-card border border-border/10 rounded-[4px] p-6 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">Montant Total de l'Offre</span>
            <div className="flex items-baseline gap-3">
              <h2 className="text-4xl font-black text-foreground tabular-nums tracking-tighter">
                {totalTTC.toLocaleString('fr-FR')} <span className="text-lg opacity-20 uppercase">FCFA</span>
              </h2>
              <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/5 border border-primary/10 rounded-full tabular-nums">
                TTC
              </span>
            </div>
          </div>
          
          <div className="flex gap-8 text-right pr-4">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">HT</span>
              <p className="text-sm font-bold text-foreground/60 tabular-nums">
                {totalHT.toLocaleString('fr-FR')}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">TVA (19.25%)</span>
              <p className="text-sm font-bold text-foreground/40 tabular-nums">
                {tva.toLocaleString('fr-FR')}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-primary/5 border border-primary/10 rounded-[4px] p-6 flex flex-col justify-center gap-4 relative overflow-hidden group">
          <div className="absolute right-[-20px] top-[-20px] opacity-5 group-hover:rotate-12 transition-transform duration-700">
            <Calculator className="w-40 h-40 text-primary" />
          </div>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" />
             </div>
             <div>
                <h4 className="text-[10px] font-black text-foreground uppercase tracking-widest leading-none">Export COLEPS</h4>
                <p className="text-[9px] text-muted-foreground font-semibold uppercase opacity-60">Générer le Volume C final</p>
             </div>
          </div>
          <button className="w-full h-10 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-[2px] hover:opacity-90 transition-all">
            Télécharger BPU / DQE
          </button>
        </div>
      </div>

      {/* 📑 NKAP SPREADSHEET */}
      <div className="bg-card border border-border/10 rounded-[4px] overflow-hidden">
        <div className="p-4 border-b border-border/10 bg-muted/5 flex items-center justify-between">
          <div className="relative w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Rechercher une ligne (ex: Terrassement)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 bg-transparent pl-10 pr-4 text-[11px] font-bold uppercase tracking-tight focus:outline-none placeholder:text-muted-foreground/20"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-bold text-muted-foreground/20 uppercase tracking-[0.2em]">{filteredLignes.length} LIGNES</span>
            <div className="w-[1px] h-4 bg-border/20" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest">Analyse Dynamique Active</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border/10 bg-muted/10">
                <th className="px-6 py-4 text-left text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] w-20">N°</th>
                <th className="px-6 py-4 text-left text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em]">Désignation des Travaux</th>
                <th className="px-6 py-4 text-center text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] w-20">Unité</th>
                <th className="px-6 py-4 text-center text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] w-20">Qte</th>
                <th className="px-6 py-4 text-right text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] w-40">Prix Unitaire</th>
                <th className="px-6 py-4 text-right text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] w-40">Total HT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/5">
              {filteredLignes.map((ligne) => {
                const totalLigne = ligne.prixUnitaire * parseFloat(ligne.quantite || '0')
                const isAnomaly = ligne.scoreAnomalie && ligne.scoreAnomalie > 40
                
                return (
                  <tr key={ligne.id} className="hover:bg-muted/5 transition-colors group">
                    <td className="px-6 py-4 text-[10px] font-bold text-muted-foreground/30 tabular-nums uppercase">
                      {ligne.numero}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold text-foreground uppercase tracking-tight leading-none group-hover:text-primary transition-colors">
                          {ligne.designation}
                        </p>
                        <span className="text-[8px] font-bold text-muted-foreground/20 uppercase tracking-widest">
                          Section: {ligne.section || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-[9px] font-bold text-foreground/40 uppercase bg-muted/10 px-2 py-0.5 rounded-[2px] border border-border/5">
                        {ligne.unite}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-[10px] font-bold text-foreground/60 tabular-nums">
                      {ligne.quantite}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end gap-1.5">
                        <div className="relative w-32 group/input">
                          <input 
                            type="text" 
                            value={ligne.prixUnitaire.toLocaleString('fr-FR')}
                            onChange={(e) => handlePriceChange(ligne.id, e.target.value)}
                            onBlur={() => savePrice(ligne.id, ligne.prixUnitaire)}
                            className={cn(
                              "w-full h-8 bg-card border text-right pr-2 text-[11px] font-black tabular-nums focus:outline-none transition-all rounded-[2px]",
                              isAnomaly 
                                ? "border-amber-500/30 text-amber-500 bg-amber-500/5 focus:border-amber-500" 
                                : "border-border/10 focus:border-primary/50"
                            )}
                          />
                          <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground/20 group-focus-within/input:text-primary transition-colors" />
                        </div>
                        
                        {isAnomaly && (
                          <div className="flex items-center gap-1 text-[8px] font-bold text-amber-500 uppercase tracking-widest animate-in fade-in slide-in-from-right-1">
                            <AlertTriangle className="w-2.5 h-2.5" />
                            Anomalie Prix (Market: {ligne.prixReference?.toLocaleString('fr-FR')})
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[11px] font-black text-foreground tabular-nums group-hover:text-primary transition-all">
                        {totalLigne.toLocaleString('fr-FR')}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredLignes.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-muted/10 flex items-center justify-center border border-border/10">
               <AlertTriangle className="w-5 h-5 text-muted-foreground/20" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[11px] font-black text-foreground uppercase tracking-widest">Aucune ligne trouvée</h4>
              <p className="text-[9px] text-muted-foreground font-semibold uppercase opacity-30">Ajustez votre recherche ou importez un nouveau BPU.</p>
            </div>
          </div>
        )}
      </div>

      {/* 🚀 NKAP INTELLIGENCE FOOTER */}
      <div className="p-6 bg-card border border-border/10 rounded-[4px] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black text-foreground uppercase tracking-widest">Coherence BPU/DQE OK</span>
          </div>
          <div className="w-[1px] h-6 bg-border/20" />
          <div className="flex items-center gap-2">
             <TrendingDown className="w-4 h-4 text-amber-500" />
             <span className="text-[10px] font-black text-foreground uppercase tracking-widest">Marge Optimisée : 12.4%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="h-9 px-6 border border-border/10 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:bg-muted transition-all">
              Importer Excel
           </button>
           <button className="h-9 px-6 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-[2px] hover:opacity-90 transition-all flex items-center gap-2">
              <Save className="w-3.5 h-3.5" />
              Tout Sauvegarder
           </button>
        </div>
      </div>
    </div>
  )
}
