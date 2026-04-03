import { StandardPageHeader } from "@/components/layout/standard-page-header";
import { 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Scale, 
  Info,
  Clock,
  CheckCircle2,
  Lock,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    category: "PIÈCES DE RÉGULARITÉ FISCALE & SOCIALE",
    items: [
      { id: "B1", title: "Attestation pour Soumission (CNPS)", type: "CNPS", importance: "OBLIGATOIRE", detail: "Preuve de mise à jour des cotisations sociales.", status: "ok" },
      { id: "B2", title: "Patente ou Quittance (Exercice en Cours)", type: "DGI", importance: "OBLIGATOIRE", detail: "Doit correspondre au chiffre d'affaires déclaré.", status: "ok" },
      { id: "B3", title: "Extrait de Registre du Commerce (RCCM)", type: "Greffe", importance: "OBLIGATOIRE", detail: "Copie certifiée conforme datant de moins de 3 mois.", status: "ok" },
      { id: "B4", title: "Plan de Localisation", type: "DGI", importance: "OBLIGATOIRE", detail: "Visé par les services fiscaux de rattachement.", status: "ok" },
    ]
  }
];

export default function Annexe16Page() {
  return (
    <div className="flex flex-col h-full bg-background animate-in fade-in duration-700">
      <div className="p-4 lg:p-10 max-w-7xl mx-auto w-full">
        <StandardPageHeader
          metadata="RÉFÉRENTIEL JURIDIQUE"
          title="Annexe 16"
          description={
            <>
              Consultez la liste officielle des <span className="text-primary font-bold">pièces administratives</span> exigibles selon le Code des Marchés Publics du Cameroun. 
              <span className="block mt-2 italic text-muted-foreground/40 text-[11px]">Source : Décret N°2018/366 du 20 juin 2018.</span>
            </>
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

        {/* Content Tabs/Sections */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main List */}
          <div className="lg:col-span-2 space-y-12">
            {LEGAL_DOCS.map((section, sIdx) => (
              <div key={sIdx} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-border/5" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground/20">
                    {section.category}
                  </h3>
                  <div className="h-px flex-1 bg-border/5" />
                </div>

                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div 
                      key={item.id}
                      className="group relative bg-card/10 border border-border/5 rounded-[4px] p-5 transition-all duration-300 hover:bg-white/[0.02] hover:border-border/20"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "size-10 rounded-[4px] flex items-center justify-center shrink-0 border transition-all duration-500",
                            item.status === 'ok' 
                              ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-500" 
                              : "bg-amber-500/5 border-amber-500/10 text-amber-500 shadow-[0_0_15px_-5px_rgba(245,158,11,0.3)]"
                          )}>
                            <FileText className="size-5" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h4 className="text-[15px] font-bold tracking-tight text-foreground/80 group-hover:text-primary transition-colors">
                                {item.title}
                              </h4>
                              <span className={cn(
                                "text-[9px] font-black px-1.5 py-0.5 rounded-[2px] tracking-widest",
                                item.importance === 'ÉLIMINATOIRE' 
                                  ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                  : "bg-muted/10 text-muted-foreground/30 border border-border/10"
                              )}>
                                {item.importance}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground/40 leading-relaxed font-medium max-w-xl">
                              {item.detail}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="text-[10px] font-black text-muted-foreground/20 italic tracking-tighter">
                            TYPE: {item.type}
                          </span>
                          {item.status === 'alert' && (
                            <div className="flex items-center gap-1.5 text-amber-500/60 animate-pulse">
                              <AlertTriangle className="size-3" />
                              <span className="text-[10px] font-bold">À VÉRIFIER</span>
                            </div>
                          )}
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
            <div className="bg-primary/5 border border-primary/10 rounded-[4px] p-6 space-y-6 relative overflow-hidden">
               <div className="absolute -right-4 -top-4 size-24 bg-primary/5 rounded-full blur-2xl" />
               <div className="flex items-center gap-3 relative">
                 <Scale className="size-5 text-primary" />
                 <h3 className="text-sm font-bold tracking-tight">Rappel du Code</h3>
               </div>
               <p className="text-[12px] leading-relaxed text-muted-foreground/60 relative italic">
                 "Toute pièce manquante ou non conforme au dossier administratif peut être rattrapée dans un délai de 48h, sauf si elle est expressément mentionnée comme éliminatoire dans le DAO."
               </p>
               <div className="pt-4 border-t border-primary/10 relative">
                 <button className="flex items-center gap-2 text-[11px] font-bold text-primary hover:gap-3 transition-all">
                   Lire le décret complet <ExternalLink className="size-3" />
                 </button>
               </div>
            </div>

            {/* Verification Checklist */}
            <div className="bg-card/30 border border-border/5 rounded-[4px] p-6 space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/20">Checklist Vigilance</h3>
              <div className="space-y-4">
                {[
                  "Dates de validité < 3 mois",
                  "Signatures originales & cachets",
                  "Certification conforme < 3 mois",
                  "Clarté des scans (sans reflets)"
                ].map((check, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="size-1.5 rounded-full bg-primary/20" />
                    <span className="text-[12px] font-medium text-muted-foreground/50">{check}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border border-dashed border-border/10 rounded-[4px] opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
              <Lock className="size-5 mb-3" />
              <h4 className="text-[12px] font-bold mb-1">Générateur Automatique</h4>
              <p className="text-[10px] leading-relaxed">Pré-remplissage des formulaires standards à partir de votre profil SI. (Alpha prochainement)</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
