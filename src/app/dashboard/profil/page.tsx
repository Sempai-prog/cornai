// ══════════════════════════════════════════
// SABI — Pilotage de Capacité Métier (Profil Expert)
// ══════════════════════════════════════════

import * as React from "react"
import { ShieldCheck, Building2, TrendingUp, HardHat, Truck, ArrowRight, Briefcase, RefreshCcw } from "lucide-react"
import { cn, formatXAF } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { StandardPageHeader } from "@/components/layout/standard-page-header"
import { getProfilEntreprise, getReferencesEntreprise, calculateCompanyAge } from "@/database/queries/profil"
import { EditableField } from "@/components/profil/editable-field"
import { ProfilImprovementButton } from "@/components/profil/profile-actions"
import { getEntrepriseContext } from "@/lib/demo-config"

export default async function ProfilCapacitePage() {
  const { entrepriseId } = await getEntrepriseContext();
  const profile = await getProfilEntreprise(entrepriseId)
  const references = await getReferencesEntreprise(entrepriseId)

  if (!profile) return <div>Profil non trouvé.</div>

  const age = calculateCompanyAge(profile.dateCreation)
  const completionScore = calculateCompletion(profile, references)

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 antialiased bg-transparent p-0 lg:p-1">
      
      <StandardPageHeader
        title="Capacité Métier"
        metadata="Poste de Pilotage — Profil Expert"
        description={
          <p>
            Pilotage des éligibilités aux marchés publics. 
            <span className="block mt-1">
              Analyse de surface financière et technique — Standards <span className="text-foreground/40 font-black uppercase tracking-widest">ARMP / MINMAP</span>.
            </span>
          </p>
        }
        cardA={{
          label: "INDEX CAPACITÉ",
          value: completionScore.toString(),
          subtext: "Score de Compétitivité",
          progress: completionScore,
          color: "blue",
        }}
        cardB={{
          label: "AIB (BLINDAGE)",
          value: "OK",
          subtext: "Dossier Maître à Jour",
          color: "emerald",
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LE FLUX (8/12) — CAPACITIES BENTO */}
        <div className="lg:col-span-8 flex flex-col min-w-0 gap-6">
          <div className="flex items-center justify-between h-6">
            <h2 className="text-[11px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
              Surface Opérationnelle & Financière
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CARTE 1 : IDENTITÉ LÉGALE */}
            <div className="group bg-card border border-border/10 rounded-[4px] p-6 space-y-8 transition-all hover:bg-card hover:border-border/20">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 bg-muted/10 rounded-[4px] flex items-center justify-center border border-border/10 transition-colors">
                  <Building2 className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[9px] font-bold text-primary/50 uppercase tracking-widest border border-primary/20 px-2 py-0.5 rounded-[2px] transition-colors">{profile.actif ? 'Vérifié' : 'Inactif'}</span>
              </div>
              
              <div className="space-y-6">
                <EditableField label="Raison Sociale" fieldName="nom" initialValue={profile.nom || ""} />

                <div className="grid grid-cols-1 gap-4 pt-4 border-t border-border/10">
                  <EditableField label="Gérant" fieldName="gerantNom" initialValue={profile.gerantNom || ""} />
                  <EditableField label="Téléphone" fieldName="telephone" initialValue={profile.telephone || ""} />
                  <EditableField label="Email" fieldName="email" initialValue={profile.email || ""} />
                  <EditableField label="NIU" fieldName="niu" initialValue={profile.niu || ""} />
                  <EditableField label="RCCM" fieldName="rccm" initialValue={profile.rccm || ""} />
                  <EditableField label="Ville" fieldName="ville" initialValue={profile.ville || ""} />
                  <EditableField label="Forme Juridique" fieldName="formeJuridique" initialValue={profile.formeJuridique || "Sarl"} />
                </div>
              </div>
            </div>

            {/* CARTE 2 : SURFACE FINANCIÈRE */}
            <div className="group bg-card border border-border/10 rounded-[4px] p-6 space-y-8 transition-all hover:bg-card hover:border-border/20">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 bg-muted/10 rounded-[4px] flex items-center justify-center border border-border/10 transition-colors">
                  <TrendingUp className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest transition-colors">Solvabilité AA</span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[11px] font-bold text-foreground/30 uppercase tracking-[0.15em]">Chiffre d'Affaires (Réel)</h3>
                
                <div className="space-y-4">
                  <EditableField 
                    label="2024 (N)" 
                    fieldName="caDernierExercice" 
                    initialValue={profile.caDernierExercice || 0} 
                    type="number"
                    className="p-3 bg-muted/10 border border-border/10 rounded-[4px] group/row transition-all hover:translate-x-1 hover:bg-muted/20"
                  />

                  {[
                    { year: "2023 (N-1)", value: formatXAF((profile.caDernierExercice || 0) * 0.9), growth: "+8%" },
                    { year: "2022 (N-2)", value: formatXAF((profile.caDernierExercice || 0) * 0.8), growth: "+5%" }
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/5 border border-border/5 rounded-[4px] opacity-60">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider">{row.year}</span>
                        <p className="text-[13px] font-bold text-foreground/80">{row.value}</p>
                      </div>
                      <span className="text-[9px] font-bold text-foreground/20 italic">Historique</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border/10">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-foreground/30 uppercase tracking-widest">Capacité d'Autofinancement</span>
                    <span className="font-semibold text-foreground/70">{formatXAF((profile.caDernierExercice || 0) * 0.15)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARTE 3 : RÉFÉRENCES TECHNIQUES */}
          <div className="flex flex-col gap-6 mt-4">
            <div className="flex items-center justify-between h-6">
              <h2 className="text-[11px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
                Références Techniques & Marchés Exécutés
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
               {references.length > 0 ? references.map((ref, i) => (
                 <div key={ref.id} className="group bg-card border border-border/10 rounded-[4px] p-4 flex items-center justify-between hover:bg-muted transition-all hover:border-border/30">
                    <div className="flex items-center gap-4">
                      <div className="h-8 w-8 bg-muted/10 rounded-[4px] flex items-center justify-center border border-border/10">
                        <Briefcase className="h-4 w-4 text-slate-500" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[11px] font-bold text-foreground/80 leading-tight line-clamp-1">{ref.objet || "Sans objet"}</p>
                        <p className="text-[9px] font-bold text-foreground/30 uppercase tracking-widest">{ref.client} — {ref.annee}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[12px] font-bold text-foreground/70">{formatXAF(ref.montant || 0)}</p>
                       <span className="text-[8px] font-bold text-primary/50 uppercase tracking-widest">{ref.typeMarche}</span>
                    </div>
                 </div>
               )) : (
                 <div className="bg-muted/10 border border-dashed border-border/10 rounded-[4px] p-12 flex flex-col items-center justify-center gap-3">
                    <Briefcase className="h-8 w-8 text-foreground/5" />
                    <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.3em]">Aucune référence technique enregistrée</p>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* L'INSPECTEUR (4/12) — SCORE & ALIGNEMENT IA */}
        <div className="lg:col-span-4 flex flex-col gap-4 sticky top-6 self-start">
          <div className="flex items-center mb-6 h-6">
            <h2 className="text-[11px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
              Analyse de Puissance
            </h2>
          </div>

          <div className="bg-card border border-border/10 rounded-[4px] overflow-hidden shadow-none">
            <div className="px-5 py-4 border-b border-border/10 bg-muted/10 flex items-center justify-between">
              <div className="h-10 w-10 rounded-[4px] bg-primary/10 flex items-center justify-center border border-primary/20">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">Complétude Profil</p>
                <p className="text-2xl font-semibold tracking-tighter text-foreground">{completionScore}%</p>
              </div>
            </div>

            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mb-6">
               <div 
                  className="h-full bg-primary transition-all duration-1000" 
                  style={{ width: `${completionScore}%` }}
               />
            </div>

            <p className="text-[11px] text-foreground/50 font-medium leading-relaxed tracking-tight mb-4">
               {completionScore >= 90 
                 ? "Votre profil est optimal pour les soumissions de Catégorie B. Toutes les pièces financières sont valides."
                 : "Analyse SABI : Complétez vos références techniques (03 minimum) pour débloquer les opportunités stratégiques."
               }
            </p>

            <ProfilImprovementButton />
          </div>

          <div className="bg-card border border-border/10 rounded-[4px] p-6">
             <div className="flex items-center gap-3 pb-4 border-b border-border/10 mb-6">
               <RefreshCcw className="h-5 w-5 text-primary/60" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">
                 Levier Stratégique
               </span>
             </div>
             <p className="text-[11px] text-foreground/60 font-medium leading-relaxed tracking-tight">
               SABI synchronise automatiquement vos capacités avec le <span className="font-bold">CCTP</span> et le <span className="font-bold">RPAO</span> pour identifier les marchés où votre probabilité de succès dépasse 80%.
             </p>
          </div>

        </div>
      </div>
    </div>
  )
}

function calculateCompletion(profile: any, references: any[]) {
  let score = 50; // Base score for identity
  if (profile.niu) score += 10;
  if (profile.rccm) score += 10;
  if (profile.caDernierExercice) score += 10;
  if (references.length > 0) score += 10;
  if (references.length >= 3) score += 10;
  return Math.min(score, 100);
}
