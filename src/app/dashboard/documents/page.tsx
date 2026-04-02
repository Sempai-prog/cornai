// ══════════════════════════════════════════
// SABI — Centre de Conformité Administrative (ARMP)
// ══════════════════════════════════════════

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Upload, 
  Eye,
  ShieldCheck,
  Clock,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Download,
  FileUp
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 antialiased bg-transparent">
      
      {/* ───────────────────────────────────────────────────────────
          PLAN 1 — HEADER (Elite Precision)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/10 mt-0 lg:mt-[-4px]">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Coffre-fort Numérique <span className="text-muted-foreground/30 font-light">/</span> <span className="text-primary/70">ARMP</span>
          </h1>
          <p className="text-[11px] text-muted-foreground font-medium tracking-wider opacity-80 uppercase tracking-[0.2em]">
            Vérification anticipée de votre Enveloppe A (Cameroun)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-border/40 bg-muted/20 rounded-[4px]">
            <Download className="mr-2 h-3.5 w-3.5" /> Dossier Type
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-black font-semibold text-[10px] uppercase tracking-[0.2em] h-9 px-8 rounded-[4px]">
            Mettre à jour le dossier
          </Button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          PLAN 2 — WORKSPACE CANONICAL (8/4 Split)
          ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LE FLUX (8/12) — DOC RECORDS */}
        <div className="lg:col-span-8 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-6 h-6">
            <h2 className="text-[11px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
              Documents de Qualification (Enveloppe A)
            </h2>
          </div>

        {/* ZONE DROITE — COFFRE-FORT & DOCS */}
          {/* DRAG & DROP ZONE (Elite Cockpit) */}
          <div className="border border-dashed border-border/40 bg-card/20 rounded-[4px] p-8 text-center hover:bg-card/40 hover:border-primary/50 transition-all cursor-pointer group mb-6 relative overflow-hidden">
            <div className="flex flex-col items-center gap-3 relative z-10">
              <div className="h-10 w-10 rounded-full bg-muted/60 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <FileUp className="h-5 w-5 text-foreground/30 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-[13px] font-semibold text-foreground/60 group-hover:text-foreground transition-colors">
                Déposez vos documents ou <span className="text-primary font-bold">parcourez le système</span>
              </p>
              <p className="text-[10px] font-semibold text-foreground/20 uppercase tracking-widest leading-relaxed">
                Traitement IA automatisé (Validité & Exigences RPAO)
              </p>
            </div>
          </div>

          {/* LISTE DES PIÈCES (DOCUMENT ROWS) */}
          <div className="space-y-1.5 pb-20">
              {[
                { name: "Attestation de Non-Redevance (ANR)", date: "Expiré le 12 Mars 2026", status: "EXPIRE", urgent: true },
                { name: "Quitus CNPS", date: "Expire le 15 Avr 2026", status: "VALIDE", warning: true },
                { name: "Attestation de Domiciliation Bancaire", date: "Expire le 31 Déc 2026", status: "VALIDE" },
                { name: "Extrait du RCCM", date: "Validité permanente", status: "VALIDE" },
                { name: "Plan de Localisation visé", date: "Expire le 10 Nov 2026", status: "VALIDE" },
                { name: "Carte de Contribuable (NIU)", date: "Validité permanente", status: "VALIDE" },
                { name: "Certificat de Cession (si applicable)", date: "Non requis pour ce profil", status: "OPTIONNEL", optional: true },
              ].map((doc, idx) => (
                <div 
                    key={idx}
                    className={cn(
                      "group flex items-center justify-between p-4 bg-card border border-border/10 rounded-[4px] transition-all duration-300 hover:bg-card/60 hover:translate-x-1",
                      doc.urgent && "border-red-500/20"
                    )}
                >
                    {/* GAUCHE : ICONE + NOM */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={cn(
                          "h-9 w-9 rounded-[4px] flex items-center justify-center border transition-all shadow-sm",
                          doc.urgent 
                            ? "bg-red-500/5 border-red-500/10 text-red-500" 
                            : "bg-muted/10 border-border/20 text-foreground/40 group-hover:border-primary/20 group-hover:text-primary"
                      )}>
                          <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-foreground/90 truncate tracking-tight uppercase">{doc.name}</span>
                        <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-[0.2em] md:hidden">{doc.date}</span>
                      </div>
                    </div>

                    {/* CENTRE : DATE D'EXPIRATION */}
                    <div className="hidden md:flex flex-1 justify-center">
                       <span className={cn(
                           "text-[11px] font-bold tracking-[0.2em] uppercase",
                           doc.urgent ? "text-red-500" : "text-foreground/40"
                       )}>
                         {doc.date}
                       </span>
                    </div>

                    {/* DROITE : STATUS BADGE + ACTIONS */}
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "px-2.5 py-0.5 rounded-[2px] text-[9px] font-bold tracking-[0.15em] uppercase border transition-colors",
                         doc.status === 'EXPIRE' 
                           ? "bg-red-500/10 text-red-500 border-red-500/20" 
                           : doc.status === 'OPTIONNEL'
                           ? "bg-muted/5 text-foreground/40 border-border/20"
                           : "bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_8px_rgba(37,211,102,0.1)]"
                      )}>
                        {doc.status}
                      </div>

                      {/* ACTIONS AU SURVOL */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 rounded hover:bg-foreground/5 text-foreground/40 hover:text-foreground transition-colors" title="Voir le document">
                           <Eye className="h-4 w-4" />
                         </button>
                         <button className="p-2 rounded hover:bg-foreground/5 text-foreground/40 hover:text-foreground transition-colors" title="Uploader la nouvelle version">
                           <Upload className="h-4 w-4" />
                         </button>
                      </div>
                    </div>
                </div>
              ))}
          </div>

        </div>

        {/* L'INSPECTEUR (4/12) — ANALYTIQUE IA */}
        <div className="lg:col-span-4 flex flex-col gap-4 sticky top-6 self-start">
          <div className="flex items-center mb-6 h-6">
            <h2 className="text-[11px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
              Bilan Analytique CIPM
            </h2>
          </div>

          <div className="bg-card/80 backdrop-blur-md border border-border/40 rounded-[4px] p-8 shadow-sm group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            
            <div className="flex flex-col items-center text-center relative z-10">
                <div className="relative h-44 w-44 flex items-center justify-center mb-8">
                  <svg className="h-full w-full -rotate-90 drop-shadow-[0_0_15px_rgba(37,211,102,0.1)]" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="6" className="text-foreground/5" />
                      <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="6" strokeDasharray="440" strokeDashoffset="66" strokeLinecap="round" className="text-primary transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-semibold tracking-tighter text-foreground">85%</span>
                      <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em] mt-1">Conformité</span>
                  </div>
                </div>

                <div className="w-full space-y-4 text-left">
                  <div className="p-3 rounded-[4px] bg-red-500/5 border border-red-500/10 flex items-start gap-3">
                    <AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5" />
                    <p className="text-[11px] font-semibold text-red-500/90 leading-tight">ANR expirée : Risque de rejet systématique en commission (CIPM).</p>
                  </div>
                  <div className="p-3 rounded-[4px] bg-green-500/5 border border-green-500/10 flex items-start gap-3">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5" />
                    <p className="text-[11px] font-semibold text-green-500/90 leading-tight">RCCM & NIU valides pour l'exercice fiscal en cours.</p>
                  </div>
                  <div className="p-3 rounded-[4px] bg-amber-500/5 border border-amber-500/10 flex items-start gap-3">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mt-0.5" />
                    <p className="text-[11px] font-semibold text-amber-500/90 leading-tight">Quitus CNPS expire dans 15 jours. Renouvellement requis.</p>
                  </div>
                </div>
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-md border border-border/40 rounded-[4px] p-6 shadow-sm">
             <div className="flex items-center gap-3 pb-4 border-b border-border/10 mb-6">
               <ShieldCheck className="h-5 w-5 text-primary/60" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">
                 Status Archivage
               </span>
             </div>
             <p className="text-[11px] text-foreground/60 font-medium leading-relaxed tracking-tight">
               Tous les documents uploadés sont chiffrés et conformes au standard de conservation COLEPS pour les marchés publics dématérialisés.
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}
