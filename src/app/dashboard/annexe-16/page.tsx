// ══════════════════════════════════════════
// SABI — Annexe 16 (Elite Standard V1.6)
// ══════════════════════════════════════════

import { StandardPageHeader } from "@/components/layout/standard-page-header"
import { 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Scale, 
  Lock,
  ExternalLink,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronDown
} from "lucide-react"
import { cn, formatDateline } from "@/lib/utils"
import { getTerrainFullData } from "@/database/queries/terrain"
import { SABI_COPY } from "@/lib/SabiCopy"
import { getEntrepriseContext } from "@/lib/demo-config"
import { BoutonAnnexe16 } from "@/components/terrain/bouton-annexe-16"

const LEGAL_DOCS = [
  {
    category: "PIÈCES OBLIGATOIRES (CODE MARCHE 2018)",
    items: [
      { id: "A1", title: "Déclaration d'Intention de Soumissionner", type: "Standardisé", importance: "CRITIQUE", detail: "Datée, signée et cachetée par le représentant légal.", status: "ok" },
      { id: "A2", title: "Attestation de Non-Redevance (ANR)", type: "DGI", importance: "ÉLIMINATOIRE", detail: "Validité < 3 mois. Doit être originale.", status: "ok" },
      { id: "A3", title: "Attestation de Non-Exclusion (ARMP)", type: "ARMP", importance: "ÉLIMINATOIRE", detail: "Certifie que l'entreprise n'est pas suspendue.", status: "alert" },
      { id: "A4", title: "Certificat de Domiciliation Bancaire", type: "Banque", importance: "OBLIGATOIRE", detail: "Banque agréée par le MINFI uniquement.", status: "ok" },
      { id: "A5", title: "Cautionnement de Soumission", type: "Bancaire", importance: "ÉLIMINATOIRE", detail: "Doit correspondre exactement au montant du DAO.", status: "alert" },
    ]
  },
  {
    category: "PIÈCES DE RÉGULARITÉ FISCITALE & SOCIALE",
    items: [
      { id: "B1", title: "Attestation pour Soumission (CNPS)", type: "CNPS", importance: "OBLIGATOIRE", detail: "Preuve de mise à jour des cotisations sociales.", status: "ok" },
      { id: "B2", title: "Patente ou Quittance (Exercice en Cours)", type: "DGI", importance: "OBLIGATOIRE", detail: "Doit correspondre au chiffre d'affaires déclaré.", status: "ok" },
      { id: "B3", title: "Extrait de Registre du Commerce (RCCM)", type: "Greffe", importance: "OBLIGATOIRE", detail: "Copie certifiée conforme datant de moins de 3 mois.", status: "ok" },
      { id: "B4", title: "Plan de Localisation", type: "DGI", importance: "OBLIGATOIRE", detail: "Visé par les services fiscaux de rattachement.", status: "ok" },
    ]
  }
];

export default async function Annexe16Page() {
  const { entrepriseId } = await getEntrepriseContext();
  const terrainData = await getTerrainFullData(entrepriseId)
  const hasVisite = !!terrainData.descenteData

  return (
    <div className="flex flex-col h-full bg-transparent animate-in fade-in duration-700 antialiased">
      <div className="p-0 lg:p-1 max-w-7xl w-full">
        <StandardPageHeader
          metadata="RÉFÉRENTIEL JURIDIQUE — ANNEXE 16"
          title={SABI_COPY.NAVIGATION.ANNEXE_16}
          description={
            <p>
              Consultez la liste officielle des <span className="text-primary font-bold">pièces administratives</span> exigibles selon le Code des Marchés Publics du Cameroun. 
              <span className="block mt-1 italic text-muted-foreground/40 text-[11px] uppercase tracking-widest font-bold">Source : Décret N°2018/366 du 20 juin 2018.</span>
            </p>
          }
          cardA={{
            label: "CONFORMITÉ",
            value: "82%",
            subtext: "Score moyen DTAO",
            color: "emerald",
            progress: 82
          }}
          cardB={{
            label: "ALERTES",
            value: "02",
            subtext: "Pièces à renouveler",
            color: "amber"
          }}
        />

        {/* ─── LIVE DATA SECTION (Terrain Connection) ─── */}
        <div className="mt-8 mb-12">
           <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                Connexion Terrain — Visite de Site
              </span>
              <div className="flex-1 h-px bg-primary/20" />
           </div>

           {hasVisite ? (
              <div className="bg-card border border-border/5 rounded-[4px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative group">
                 <div className="absolute inset-0 bg-primary/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
                 
                 <div className="flex gap-6 items-start relative z-10">
                    <div className="size-12 rounded-[4px] bg-primary/5 flex items-center justify-center border border-primary/10">
                       <MapPin className="size-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-[14px] font-bold text-foreground/80 tracking-tight">
                          {terrainData.aoNom}
                       </h4>
                       <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDateline(terrainData.descenteData?.dateVisite || null)}</span>
                          <span className="flex items-center gap-1.5"><Clock size={12} /> {terrainData.descenteData?.heureVisite || "--:--"}</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-3 relative z-10">
                    <div className="text-right">
                       <span className="block text-[9px] font-black text-primary/60 uppercase tracking-widest">Certificat Localisation</span>
                       <span className="text-[12px] font-bold tabular-nums text-foreground/60 tracking-tight">Généré via GPS Terrain</span>
                    </div>
                    <CheckCircle2 className="size-5 text-emerald-500/60" />
                 </div>
              </div>
           ) : (
              <div className="border border-dashed border-border/10 rounded-[4px] p-8 text-center bg-muted/5 group hover:bg-muted/10 transition-colors">
                 <AlertTriangle size={24} className="mx-auto text-amber-500/20 mb-3 group-hover:scale-110 transition-transform" />
                 <p className="text-[11px] font-black text-foreground/20 uppercase tracking-[0.2em]">Aucune visite de terrain détectée pour la soumission active</p>
                 <p className="text-[10px] text-muted-foreground/30 mt-1">Le Certificat de Localisation (Annexe 16) nécessite une validation par GPS.</p>
              </div>
           )}
        </div>

        {/* ─── LEGAL LISTS ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main List */}
          <div className="lg:col-span-2 space-y-12">
            {LEGAL_DOCS.map((section, sIdx) => (
              <div key={sIdx} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-border/5" />
                  <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/20">
                    {section.category}
                  </h3>
                  <div className="h-px flex-1 bg-border/5" />
                </div>

                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div 
                      key={item.id}
                      className="group relative bg-card/10 border border-border/5 rounded-[4px] p-4 transition-all duration-300 hover:bg-white/[0.01] hover:border-primary/20"
                    >
                      <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={cn(
                            "size-10 rounded-[4px] flex items-center justify-center shrink-0 border transition-all duration-500",
                            item.status === 'ok' 
                              ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-500" 
                              : "bg-amber-500/5 border-amber-500/10 text-amber-500"
                          )}>
                            <FileText className="size-5" />
                          </div>
                          
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-3">
                              <h4 className="text-[13px] font-bold tracking-tight text-foreground/80 group-hover:text-foreground transition-colors truncate">
                                {item.title}
                              </h4>
                              <span className={cn(
                                "text-[8px] font-black px-1.5 py-0.5 rounded-[2px] tracking-widest tabular-nums",
                                item.importance === 'ÉLIMINATOIRE' 
                                  ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                  : "bg-muted/10 text-muted-foreground/30 border border-border/10"
                              )}>
                                {item.importance}
                              </span>
                            </div>
                            <p className="text-[10px] text-muted-foreground/30 leading-relaxed font-medium truncate max-w-sm">
                              {item.detail}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                           <div className="text-right hidden sm:block">
                              <span className="block text-[8px] font-black text-muted-foreground/20 tracking-widest uppercase">Référence</span>
                              <span className="text-[10px] font-mono tabular-nums text-muted-foreground/40">{item.id}-2024</span>
                           </div>
                           <ShieldCheck className={cn(
                             "size-4 transition-all",
                             item.status === 'ok' ? "text-emerald-500/40" : "text-amber-500/40"
                           )} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Legal Context Card */}
            <div className="bg-primary/[0.03] border border-primary/10 rounded-[4px] p-6 space-y-6 relative overflow-hidden group">
               <div className="absolute -right-4 -top-4 size-24 bg-primary/5 rounded-full blur-3xl transition-all group-hover:scale-150 duration-700" />
               <div className="flex items-center gap-3 relative">
                 <Scale className="size-4 text-primary" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/60">Flash Droit Public</h3>
               </div>
               <p className="text-[12px] leading-relaxed text-foreground/50 relative font-medium">
                 "Toute pièce manquante ou non conforme au dossier administratif peut être rattrapée dans un délai de <span className="text-primary font-bold">48h</span>, sauf mention contraire."
               </p>
               <div className="pt-4 border-t border-primary/10 relative">
                 <button className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:gap-3 transition-all">
                    DÉCRET 2018/366 <ExternalLink className="size-3" />
                 </button>
               </div>
            </div>

            {/* Verification Checklist */}
            <div className="bg-card/30 border border-border/5 rounded-[4px] p-6 space-y-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20">Vigilance Enveloppe A</h3>
              <div className="space-y-4">
                {[
                  "Validité < 3 mois",
                  "Originaux ou Certifiés",
                  "Signatures & Cachets",
                  "Scans Haute Résolution"
                ].map((check, i) => (
                  <div key={i} className="flex items-center gap-3 group/check">
                    <div className="size-1 bg-primary/40 rounded-full group-hover/check:scale-150 transition-transform" />
                    <span className="text-[11px] font-semibold text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors uppercase tracking-tight">{check}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border border-border/10 bg-primary/[0.02] rounded-[4px] transition-all hover:bg-primary/[0.05]">
              <FileText className="size-4 mb-3 text-primary" />
              <h4 className="text-[11px] font-black uppercase tracking-widest mb-1 text-foreground/60">Génération Automatique</h4>
              <p className="text-[10px] leading-relaxed text-muted-foreground uppercase font-bold tracking-tighter mb-4">Certificat de Visite de Site conforme ARMP</p>
              <BoutonAnnexe16 
                soumissionId={terrainData.soumission?.id || ""} 
                disabled={!hasVisite}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
