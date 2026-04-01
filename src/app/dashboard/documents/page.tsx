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
         <h1 className="text-2xl font-medium tracking-tight text-white font-display">Centre de Conformité Administrative</h1>
         <p className="text-[12px] text-foreground/40 font-medium tracking-wide">Vérification anticipée de votre Enveloppe A (Marchés Publics Cameroun)</p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6">
        
        {/* COLONNE GAUCHE — LE BILAN ANALYTIQUE IA */}
        <aside className="w-full lg:w-[380px] shrink-0 space-y-6">
          <div className="bg-[#0c0c0c]/80 backdrop-blur-md border border-white/5 rounded-[4px] p-8 shadow-sm group">
            <div className="flex flex-col items-center text-center">
                {/* JAUGE CIRCULAIRE ANALYTIQUE */}
                <div className="relative h-40 w-40 flex items-center justify-center mb-6">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-white/5" />
                      <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="440" strokeDashoffset="66" className="text-primary transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black tracking-tighter text-white">85%</span>
                      <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mt-1">Conformité</span>
                  </div>
                </div>

                <h2 className="text-[15px] font-semibold text-white mb-6 tracking-tight">Analyse CIPM (Anticipée)</h2>
                
                {/* INDICATEURS DE DIAGNOSTIC */}
                <div className="w-full space-y-3 mb-8 text-left">
                  <div className="flex items-start gap-3 p-3 rounded-[2px] bg-red-500/5 border border-red-500/10">
                    <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-medium text-red-500/90 leading-tight">Alerte : ANR expirée. Rejet systématique en commission.</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-[2px] bg-green-500/5 border border-green-500/10">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-medium text-green-500/90 leading-tight">RCCM & NIU valides pour l'exercice en cours.</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-[2px] bg-yellow-500/5 border border-yellow-500/10">
                    <AlertTriangle className="h-3.5 w-3.5 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-medium text-yellow-500/90 leading-tight">Quitus CNPS expire dans 15 jours. Renouvellement à prévoir.</p>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-black font-black text-[10px] uppercase tracking-[0.2em] h-11 rounded-[2px] border-none transition-all">
                    Mettre à jour le dossier
                  </Button>
                  <Button variant="outline" className="w-full border-white/10 bg-transparent text-white/60 font-bold text-[10px] uppercase tracking-[0.2em] h-11 rounded-[2px] hover:bg-white/5 hover:text-white transition-all">
                    <Download className="mr-2 h-3.5 w-3.5" /> Dossier Type (Enveloppe A)
                  </Button>
                </div>
            </div>
          </div>
        </aside>

        {/* ZONE DROITE — COFFRE-FORT & DOCS */}
        <main className="flex-1 space-y-6">
          
          {/* DRAG & DROP ZONE (QUIET) */}
          <div className="border-2 border-dashed border-white/10 bg-white/[0.02] rounded-[4px] p-8 text-center hover:border-primary/50 transition-all cursor-pointer group mb-6">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <FileUp className="h-5 w-5 text-foreground/40 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-[13px] font-medium text-foreground/60 group-hover:text-white transition-colors">
                Glissez vos nouveaux documents ici ou <span className="text-primary italic">parcourez</span>.
              </p>
              <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest leading-relaxed">
                L'IA CORNAi mettra à jour les dates d'expiration automatiquement
              </p>
            </div>
          </div>

          {/* LISTE DES PIÈCES (DOCUMENT ROWS) */}
          <div className="space-y-1.5">
              {[
                { name: "Attestation de Non-Redevance (ANR)", date: "Expiré le 12 Mars 2026", status: "EXPIRE", urgent: true },
                { name: "Quitus CNPS", date: "Expire le 15 Avr 2026", status: "VALIDE", warning: true },
                { name: "Attestation de Domiciliation Bancaire", date: "Expire le 31 Déc 2026", status: "VALIDE" },
                { name: "Extrait du RCCM", date: "Validité permanente", status: "VALIDE" },
                { name: "Plan de Localisation visé", date: "Expire le 10 Nov 2026", status: "VALIDE" },
                { name: "Carte de Contribuable (NIU)", date: "Validité permanente", status: "VALIDE" },
              ].map((doc, idx) => (
                <div 
                    key={idx}
                    className="group flex items-center justify-between p-4 bg-[#0c0c0c]/40 border border-white/5 rounded-[4px] transition-all duration-300 hover:bg-white/[0.02] hover:translate-x-1"
                >
                    {/* GAUCHE : ICONE + NOM */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={cn(
                          "h-9 w-9 rounded-[2px] flex items-center justify-center border transition-all",
                          doc.urgent ? "bg-red-500/5 border-red-500/10 text-red-500" : "bg-white/5 border-white/10 text-foreground/40 group-hover:border-primary/20 group-hover:text-primary"
                      )}>
                          <FileText className="h-4 w-4" />
                      </div>
                      <span className="text-[13.5px] font-medium text-white/90 truncate tracking-tight">{doc.name}</span>
                    </div>

                    {/* CENTRE : DATE D'EXPIRATION */}
                    <div className="hidden md:flex flex-1 justify-center">
                       <span className={cn(
                           "text-[11px] font-medium tracking-wide",
                           doc.urgent ? "text-red-500" : "text-foreground/40"
                       )}>
                         {doc.date}
                       </span>
                    </div>

                    {/* DROITE : STATUS BADGE + ACTIONS */}
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "px-2.5 py-0.5 rounded-[2px] text-[9px] font-black tracking-[0.15em] uppercase border transition-colors",
                        doc.status === 'EXPIRE' 
                          ? "bg-red-500/10 text-red-500 border-red-500/20" 
                          : "bg-green-500/10 text-green-500 border-green-500/20"
                      )}>
                        {doc.status}
                      </div>

                      {/* ACTIONS AU SURVOL */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 rounded hover:bg-white/5 text-foreground/40 hover:text-white transition-colors" title="Voir le document">
                           <Eye className="h-4 w-4" />
                         </button>
                         <button className="p-2 rounded hover:bg-white/5 text-foreground/40 hover:text-white transition-colors" title="Uploader la nouvelle version">
                           <Upload className="h-4 w-4" />
                         </button>
                      </div>
                    </div>
                </div>
              ))}
          </div>

          <div className="pt-12 flex flex-col items-center opacity-10">
              <p className="text-[10px] font-black uppercase tracking-[0.8em]">Coffre-fort Sécurisé CORNAi — Standard ARMP v2.0</p>
          </div>
        </main>
      </div>
    </div>
  )
}
