// ══════════════════════════════════════════
// SABI — Centre de Conformité Administrative (ARMP)
// ══════════════════════════════════════════

import { StandardPageHeader } from "@/components/layout/standard-page-header";
import { 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  TrendingDown,
  Info,
  Eye,
  Upload,
  FileUp,
  Download as LucideDownload
} from "lucide-react";
import { getConformiteComplete } from "@/database/queries/documents";
import { formatDateline, cn } from "@/lib/utils";

// ID démo (Phase de test)
const DEMO_ENTREPRISE_ID = "cf83af70-d49b-4a72-8222-201f08a05a8a";

export default async function DocumentsPage() {
  const { documents, manquantes, stats } = await getConformiteComplete(DEMO_ENTREPRISE_ID);

  // Mapping des documents existants
  const docRows = documents.map(d => {
    const isExpired = d.statut === 'expire';
    const isValide = d.statut === 'valide';
    const isEnCours = d.statut === 'en_cours';
    
    let dateText = "Validité permanente";
    if (d.dateExpiration) {
      const formattedDate = formatDateline(d.dateExpiration);
      dateText = isExpired ? `Expiré le ${formattedDate}` : `Expire le ${formattedDate}`;
    }

    return {
      name: d.pieceId.toUpperCase(),
      fullName: d.nomCanonique,
      date: dateText,
      status: (d.statut || 'manquant').toUpperCase().replace('_', ' '),
      urgent: isExpired && d.eliminatoire,
      warning: !isExpired && !isValide && !isEnCours,
      isExpired,
      isValide,
      isEnCours,
      eliminatoire: d.eliminatoire
    };
  });

  // Mapping des pièces manquantes
  const missedRows = manquantes.map(p => ({
    name: p.id.toUpperCase(),
    fullName: p.nomCanonique,
    date: "Pièce manquante",
    status: "MANQUANT",
    urgent: p.eliminatoireSiAbsent,
    warning: false,
    isMissed: true,
    isExpired: false,
    isValide: false,
    isEnCours: false,
    eliminatoire: p.eliminatoireSiAbsent
  }));

  const allRows = [...docRows, ...missedRows].sort((a, b) => {
    if (a.urgent && !b.urgent) return -1;
    if (!a.urgent && b.urgent) return 1;
    return 0;
  });

  return (
    <div className="flex flex-col gap-6 p-6 animate-in fade-in duration-500">
      <StandardPageHeader 
        title="Blindage Administratif"
        metadata="CENTRE DE CONFORMITÉ ARMP / DTAO"
        description={
          <div className="flex items-center gap-2 text-muted-foreground/60">
            <ShieldCheck className="w-4 h-4 text-emerald-500/50" />
            <span>Diagnostic temps réel de votre éligibilité légale aux marchés publics.</span>
          </div>
        }
        cardA={{
          label: "CONFORMITÉ",
          value: `${stats.score}%`,
          subtext: `${stats.valides}/${stats.total} pièces valides`,
          progress: stats.score,
          color: stats.score > 80 ? "emerald" : stats.score > 50 ? "amber" : "red"
        }}
        cardB={{
          label: "POINTS CRITIQUES",
          value: stats.expires + stats.eliminatoiresManquants > 0 ? 
                 `0${stats.expires + stats.eliminatoiresManquants}`.slice(-2) : "00",
          subtext: stats.eliminatoiresManquants > 0 ? "Élimination directe possible" : "Situation stable",
          color: stats.expires + stats.eliminatoiresManquants > 0 ? "red" : "emerald"
        }}
      />

      {/* Upload Zone (Prominent & Immediate) */}
      <div className="border border-dashed border-border/10 rounded-[4px] p-8 flex flex-col items-center justify-center gap-4 bg-card hover:bg-card/80 hover:border-primary/40 transition-all cursor-pointer group relative overflow-hidden">
        <div className="w-12 h-12 rounded-[4px] bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <FileUp className="w-6 h-6 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-foreground/80 tracking-tight uppercase">Déposez une nouvelle pièce administrative</p>
          <p className="text-[11px] text-muted-foreground/40 mt-1 font-medium italic">SABI scanne et extrait automatiquement les dates d'expiration via Scan AI</p>
        </div>
        <div className="flex gap-2">
          <span className="text-[9px] font-black px-2 py-0.5 bg-muted/10 rounded-[2px] text-muted-foreground/30 border border-border/10 tracking-widest">PDF</span>
          <span className="text-[9px] font-black px-2 py-0.5 bg-muted/10 rounded-[2px] text-muted-foreground/30 border border-border/10 tracking-widest">MAX 10MB</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste (2/3) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Liste des Documents */}
          <div className="bg-card border border-border/10 rounded-[4px] overflow-hidden shadow-none">
            <div className="px-5 py-4 border-b border-border/10 bg-white/[0.02] flex items-center justify-between">
              <h3 className="text-[11px] font-bold tracking-widest text-muted-foreground/40 uppercase items-center flex gap-2">
                <FileText className="w-3.5 h-3.5 opacity-30" />
                Dossier de Qualification (Enveloppe A)
              </h3>
              <span className="text-[10px] text-muted-foreground/30 uppercase font-bold tracking-tighter">{allRows.length} pièces identifiées</span>
            </div>
            
            <div className="divide-y divide-border/10">
              {allRows.map((item, i) => (
                <div key={i} className="group hover:bg-white/[0.01] transition-all p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-2 rounded-[4px] border transition-all",
                      item.urgent 
                        ? "bg-red-500/5 border-red-500/10 text-red-500" 
                        : "bg-muted/10 border-border/10 text-muted-foreground/20 group-hover:border-primary/20 group-hover:text-primary"
                    )}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-foreground/80 tracking-tight uppercase">{item.name}</h4>
                        {item.eliminatoire && (
                          <span className="text-[8px] px-1.5 py-0.5 border border-red-500/20 text-red-500/60 font-black tracking-tighter uppercase rounded-[2px] bg-red-500/5">
                            Éliminatoire
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground/40 font-medium">{item.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-10">
                    <div className="text-right hidden sm:block">
                      <p className={cn(
                        "text-[10px] font-bold tracking-wider uppercase",
                        item.urgent ? "text-red-500" : item.warning ? "text-amber-500" : "text-muted-foreground/40"
                      )}>
                        {item.date}
                      </p>
                      <p className="text-[9px] text-muted-foreground/20 font-bold uppercase tracking-tighter">Diagnostic SABI Scan</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded-[2px] text-[9px] font-black tracking-widest border transition-all",
                        item.isValide ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20" :
                        item.isExpired ? "bg-red-500/5 text-red-500 border-red-500/20" :
                        item.isEnCours ? "bg-indigo-500/5 text-indigo-500 border-indigo-500/20" :
                        "bg-muted/5 text-muted-foreground/40 border-border/10"
                      )}>
                        {item.status}
                      </span>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-[4px] hover:bg-foreground/5 text-muted-foreground/40 hover:text-foreground transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-[4px] hover:bg-foreground/5 text-muted-foreground/40 hover:text-foreground transition-colors">
                          <Upload className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-muted/5 border-t border-border/10 flex items-center justify-center">
              <button className="text-[10px] font-bold text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Historique d'Archivage (COLEPS)
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Diagnostic (1/3) */}
        <div className="space-y-6 sticky top-6">
          <div className="bg-card border border-border/10 rounded-[4px] p-6 space-y-8 shadow-none">
            <div>
              <h3 className="text-[11px] font-black text-muted-foreground/30 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 opacity-30" />
                Bilan Analytique
              </h3>
              
              <div className="relative h-[180px] flex items-center justify-center">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-white/[0.02]"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={452.4}
                    strokeDashoffset={452.4 - (452.4 * stats.score) / 100}
                    className={cn(
                      "transition-all duration-1000 ease-in-out",
                      stats.score > 80 ? "text-emerald-500" : stats.score > 50 ? "text-amber-500" : "text-red-500"
                    )}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-foreground tracking-tighter">{stats.score}%</span>
                  <span className="text-[10px] text-muted-foreground/30 font-bold uppercase tracking-widest mt-1">Santé Légale</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {stats.eliminatoiresManquants > 0 && (
                <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-[4px] flex gap-3 group/alert">
                  <TrendingDown className="w-5 h-5 text-red-500 shrink-0 mt-0.5 group-hover/alert:scale-110 transition-transform" />
                  <div>
                    <p className="text-[11px] font-black text-red-500 leading-tight uppercase tracking-wider">Alerte : Dossier Critique</p>
                    <p className="text-[11px] text-red-500/60 mt-1 font-medium leading-relaxed italic">
                      {stats.eliminatoiresManquants} pièce(s) éliminatoire(s) sont absentes ou expirées. Votre entreprise ne peut pas soumissionner légalement.
                    </p>
                  </div>
                </div>
              )}
              
              {stats.expirant > 0 && (
                <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-[4px] flex gap-3">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-black text-amber-500 leading-tight uppercase tracking-wider">Anticipation</p>
                    <p className="text-[11px] text-amber-500/60 mt-1 font-medium leading-relaxed italic">
                      {stats.expirant} pièce(s) arrivent à échéance sous 30 jours. Prévoyez le renouvellement pour éviter tout blocage.
                    </p>
                  </div>
                </div>
              )}

              {stats.score === 100 && (
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-[4px] flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-black text-emerald-500 leading-tight uppercase tracking-wider">Éligibilité Totale</p>
                    <p className="text-[11px] text-emerald-200/40 mt-1 font-medium leading-relaxed italic">
                      Votre blindage administratif est optimal. Toutes les pièces requises par le référentiel DTAO sont à jour.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button className="w-full py-4 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.2em] rounded-[4px] hover:opacity-90 transition-all flex items-center justify-center gap-2 group">
              Générer Bilan PDF
              <LucideDownload className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Expert Info - Integrated in the same sticky card */}
            <div className="pt-8 mt-8 border-t border-border/10 flex gap-4 relative overflow-hidden">
              <div className="w-8 h-8 rounded-[4px] bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <Info className="w-4 h-4 text-primary opacity-60" />
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Conseil Expert</p>
                <p className="text-[11px] text-muted-foreground/60 leading-relaxed font-bold italic">
                  Rappel ARMP : Le <span className="text-primary">Certificat de Non-Faillite</span> est obsolète dans la plupart des DAO récents, remplacé par l'Attestation du Greffe du Tribunal (RCCM).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
