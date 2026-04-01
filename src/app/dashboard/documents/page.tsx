// ══════════════════════════════════════════
// CORNAi — Coffre-fort Documents (Phase D1.6 — Marchés Publics Domain Knowledge)
// ══════════════════════════════════════════

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Plus, 
  Trash, 
  Download,
  ShieldCheck,
  Clock,
  ExternalLink
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 bg-transparent max-w-[1600px] mx-auto antialiased">
      
      {/* ───────────────────────────────────────────────────────────
          PLAN 0 — HEADER DE PAGE (RÉTABLI)
          ─────────────────────────────────────────────────────────── */}
      <div className="space-y-1 mb-2">
         <h1 className="text-2xl font-medium tracking-tight text-white">Dossier PME Numérique</h1>
         <p className="text-[12px] text-foreground/40 font-medium tracking-wide">Gérez vos pièces administratives obligatoires (CIPM)</p>
      </div>

      {/* ───────────────────────────────────────────────────────────
          PLAN 1 — CONTENU PRINCIPAL (SPLIT-SCREEN)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        
        {/* COLONNE GAUCHE — LE BILAN IA */}
        <aside className="w-full lg:w-[380px] shrink-0 space-y-6">
          <div className="bg-[#0c0c0c]/80 backdrop-blur-md border border-white/5 rounded-[4px] p-8 shadow-sm group">
            <div className="flex flex-col items-center text-center">
                {/* JAUGE CIRCULAIRE RAFFINÉE */}
                <div className="relative h-32 w-32 flex items-center justify-center mb-6">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="65" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-white/5" />
                      <circle cx="80" cy="80" r="65" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="408" strokeDashoffset="61" className="text-primary transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black tracking-tighter text-white">85%</span>
                      <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest mt-1">Score IA</span>
                  </div>
                </div>

                <h2 className="text-[16px] font-semibold text-white mb-2 tracking-tight">Conformité Administrative</h2>
                <p className="text-[12px] text-foreground/50 leading-relaxed max-w-[240px] mb-8">
                  Votre dossier est éligible pour la majorité des appels d'offres MINMAP / ARMP.
                </p>

                <div className="w-full space-y-3 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Statut CIPM</span>
                      <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase rounded-[2px] tracking-widest">PRÊT</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Pièces actives</span>
                      <span className="text-[10px] font-bold text-white tracking-widest">08 / 10</span>
                  </div>
                </div>
            </div>
          </div>

          <div className="bg-[#0c0c0c]/80 backdrop-blur-md border border-white/5 rounded-[4px] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <Clock className="h-4 w-4 text-primary/40" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">Renouvellements</span>
            </div>
            <div className="space-y-4">
                <div className="p-4 rounded border border-red-500/10 bg-red-500/[0.02]">
                  <p className="text-[11px] font-bold text-red-500 uppercase tracking-widest mb-1">ANR — Urgent</p>
                  <p className="text-[12px] text-foreground/60 font-medium">Expiration le 04 Juin 2025</p>
                </div>
            </div>
          </div>
        </aside>

        {/* ZONE DROITE — LE COFFRE-FORT */}
        <main className="flex-1 space-y-6">
          {/* HEADER ACTIONS */}
          <header className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-[#0c0c0c]/80 backdrop-blur-sm border border-white/5 rounded-[4px] shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded bg-primary/5 flex items-center justify-center border border-primary/10">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h3 className="text-[14px] font-bold text-white tracking-tight uppercase">Dossier de Candidature</h3>
                    <p className="text-[10px] text-foreground/30 font-bold uppercase tracking-[0.1em]">Documents de référence PME</p>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-black font-black text-[10px] uppercase tracking-[0.2em] h-10 px-8 rounded shadow-xl shadow-primary/5 border-none transition-all">
                <Plus className="mr-2 h-4 w-4 stroke-[3]" /> NEW DOCUMENT
              </Button>
          </header>

          {/* LISTE DES PIÈCES (STYLE ROW) */}
          <div className="space-y-3">
              {[
                { code: "ANR", name: "Attestation de Non Redevance (ANR)", org: "DGI Cameroun", date: "04 Juin 2025", status: "urgent" },
                { code: "CNPS", name: "Quitus CNPS", org: "CNPS Centrale", date: "31 Déc 2025", status: "valid" },
                { code: "RCCM", name: "Registre de Commerce (RCCM)", org: "Greffe du Tribunal", date: "Permanent", status: "valid" },
                { code: "NUI", name: "Carte de Contribuable (NUI)", org: "DGI", date: "Permanent", status: "valid" },
                { code: "CFT", name: "Certificats de Fin de Travaux (CFT)", org: "Maîtres d'ouvrage divers", date: "Multiple", status: "valid" },
                { code: "ART", name: "Agrément ART (Télécoms)", org: "ART Cameroun", date: "22 Oct 2025", status: "valid" },
              ].map((doc) => (
                <div 
                    key={doc.code}
                    className="group relative flex flex-col md:flex-row items-center justify-between p-4 md:p-5 bg-[#0c0c0c]/40 border border-white/5 rounded-[4px] transition-all duration-300 hover:bg-white/[0.02] hover:border-white/10 hover:translate-x-1"
                >
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                      <div className={cn(
                          "h-10 w-10 rounded-[2px] flex items-center justify-center font-mono text-[10px] font-black border transition-all",
                          doc.status === 'urgent' ? "bg-red-500/5 border-red-500/10 text-red-500" : "bg-white/5 border-white/5 text-foreground/40 group-hover:bg-primary/5 group-hover:border-primary/10 group-hover:text-primary"
                      )}>
                          {doc.code}
                      </div>
                      <div className="flex-1 min-w-0">
                          <h4 className="text-[14px] font-semibold text-white group-hover:text-primary transition-colors truncate tracking-tight">{doc.name}</h4>
                          <div className="flex items-center gap-3 mt-1 opacity-40">
                            <span className="text-[9px] font-bold uppercase tracking-widest">{doc.org}</span>
                            <span className="h-1 w-1 bg-white/20 rounded-full" />
                            <span className={cn(
                                "text-[9px] font-bold uppercase tracking-widest",
                                doc.status === 'urgent' ? "text-red-500" : ""
                            )}>{doc.date}</span>
                          </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-4 md:mt-0 lg:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-[9px] font-black uppercase tracking-widest text-foreground/40">
                          <Download className="h-3 w-3" /> PDF
                      </div>
                      <Button variant="outline" className="h-10 px-6 rounded-[2px] border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-black hover:border-primary transition-all">
                          Update
                      </Button>
                    </div>

                    {/* INDICATEUR DE STATUT */}
                    <div className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3 rounded-r-full group-hover:h-8 transition-all",
                      doc.status === 'urgent' ? "bg-red-500" : "bg-primary/40 group-hover:bg-primary"
                    )} />
                </div>
              ))}
          </div>
          
          <div className="pt-10 flex flex-col items-center opacity-10">
              <p className="text-[10px] font-black uppercase tracking-[0.6em]">Coffre-fort Sécurisé CORNAi</p>
          </div>
        </main>
      </div>
    </div>
  )
}
