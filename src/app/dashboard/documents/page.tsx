// ══════════════════════════════════════════
// CORNAi — Centre de Conformité Administrative (ARMP)
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
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 bg-transparent max-w-[1600px] mx-auto antialiased">
      
      {/* HEADER DE PAGE */}
      <div className="space-y-1 mb-2">
         <h1 className="text-2xl font-semibold tracking-tight text-foreground font-sans">Centre de Conformité Administrative</h1>
         <p className="text-[12px] text-foreground/40 font-semibold tracking-wide uppercase">Vérification anticipée de votre Enveloppe A (ARMP / Cameroun)</p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6">
        
        {/* COLONNE GAUCHE — LE BILAN ANALYTIQUE IA */}
        <aside className="w-full lg:w-[360px] shrink-0 space-y-6">
          <div className="bg-card/40 backdrop-blur-md border border-black/5 dark:border-white/5 rounded-[4px] p-8 shadow-sm group relative overflow-hidden">
            {/* Décoration subtile en fond */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            
            <div className="flex flex-col items-center text-center relative z-10">
                {/* JAUGE CIRCULAIRE ANALYTIQUE */}
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

                <h2 className="text-[14px] font-semibold text-foreground mb-6 tracking-tight uppercase">Analyse CIPM (Anticipée)</h2>
                
                {/* INDICATEURS DE DIAGNOSTIC */}
                <div className="w-full space-y-2.5 mb-8 text-left">
                  <div className="flex items-start gap-3 p-3 rounded-[4px] bg-red-500/5 border border-red-500/10">
                    <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-semibold text-red-500/90 leading-tight">Alerte : ANR expirée. Rejet systématique en commission.</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-[4px] bg-green-500/5 border border-green-500/10">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-semibold text-green-500/90 leading-tight">RCCM & NIU valides pour l'exercice en cours.</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-[4px] bg-yellow-500/5 border border-yellow-500/10">
                    <AlertTriangle className="h-3.5 w-3.5 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-semibold text-yellow-500/90 leading-tight">Quitus CNPS expire dans 15 jours. Renouvellement requis.</p>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-black font-semibold text-[11px] uppercase tracking-[0.15em] h-11 rounded-[4px] border-none transition-all shadow-lg shadow-primary/10">
                    Mettre à jour le dossier
                  </Button>
                  <Button variant="outline" className="w-full border-black/10 dark:border-white/10 bg-transparent text-foreground/60 font-semibold text-[11px] uppercase tracking-[0.15em] h-11 rounded-[4px] hover:bg-foreground/5 hover:text-foreground transition-all">
                    <Download className="mr-2 h-3.5 w-3.5" /> Dossier Type (Enveloppe A)
                  </Button>
                </div>
            </div>
          </div>
        </aside>

        {/* ZONE DROITE — COFFRE-FORT & DOCS */}
        <main className="flex-1 space-y-6">
          
          {/* DRAG & DROP ZONE (QUIET) */}
          <div className="border border-dashed border-black/20 dark:border-white/10 bg-card/20 rounded-[4px] p-10 text-center hover:border-primary/50 transition-all cursor-pointer group mb-6 relative overflow-hidden hover:bg-card/40">
            <div className="flex flex-col items-center gap-3 relative z-10">
              <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <FileUp className="h-5 w-5 text-foreground/30 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-[13px] font-semibold text-foreground/60 group-hover:text-foreground transition-colors">
                Glissez vos nouveaux documents ici ou <span className="text-primary italic">parcourez</span>.
              </p>
              <p className="text-[10px] font-semibold text-foreground/20 uppercase tracking-widest leading-relaxed">
                L'IA CORNAi mettra à jour les dates d'expiration automatiquement
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
                      "group flex items-center justify-between p-4 bg-card/40 border border-black/5 dark:border-white/5 rounded-[4px] transition-all duration-300 hover:bg-card/60 hover:translate-x-1",
                      doc.urgent && "border-red-500/20"
                    )}
                >
                    {/* GAUCHE : ICONE + NOM */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={cn(
                          "h-9 w-9 rounded-[4px] flex items-center justify-center border transition-all shadow-sm",
                          doc.urgent 
                            ? "bg-red-500/5 border-red-500/10 text-red-500" 
                            : "bg-foreground/5 border-black/5 dark:border-white/10 text-foreground/40 group-hover:border-primary/20 group-hover:text-primary"
                      )}>
                          <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-foreground/90 truncate tracking-tight">{doc.name}</span>
                        <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-[0.1em] md:hidden">{doc.date}</span>
                      </div>
                    </div>

                    {/* CENTRE : DATE D'EXPIRATION */}
                    <div className="hidden md:flex flex-1 justify-center">
                       <span className={cn(
                           "text-[11px] font-semibold tracking-wide uppercase",
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
                          ? "bg-foreground/5 text-foreground/40 border-black/10 dark:border-white/10"
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

          <div className="pt-12 flex flex-col items-center opacity-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.6em]">Coffre-fort Sécurisé CORNAi — Standard ARMP / COLEPS v2.0</p>
          </div>
        </main>
      </div>
    </div>
  )
}
