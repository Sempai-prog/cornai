// ══════════════════════════════════════════
// CORNAi — Coffre-fort Documents (Phase D1.6 — Marchés Publics Domain Knowledge)
// ══════════════════════════════════════════

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 bg-background text-foreground antialiased">
      
      {/* ───────────────────────────────────────────────────────────
          PLAN 1 — HEADER (SOPHISTICATION PREMIUM)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5 mt-0 lg:mt-[-4px]">
        <div className="space-y-2.5">
           <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground leading-none">
              Dossier Administratif PME
           </h1>
           <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/30">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary/60" /> CONFORMITÉ ARMP / MINMAP</span>
              <span className="opacity-10">/</span>
              <span className="">8 PIÈCES ACTIVES</span>
           </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 text-[10px] font-semibold uppercase tracking-widest text-foreground/40 hover:text-foreground border-white/10 bg-white/5 rounded transition-all">
             Vérification CIPM
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-black font-semibold text-[10px] uppercase tracking-[0.2em] h-9 px-8 rounded shadow-xl shadow-primary/10 border-none transition-all active:scale-95">
             <Plus className="mr-2 h-4 w-4" /> UPLOADER PIÈCE
          </Button>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          PLAN 2 — CATEGORIES (SANS BRUIT VISUEL)
          ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Dossier Administratif (DTAO)", count: 5, icon: FileText, color: "text-primary/60" },
           { label: "Capacité Technique (BTP/SRV)", count: 2, icon: ShieldCheck, color: "text-primary/40" },
           { label: "Capacité Financière", count: 1, icon: Clock, color: "text-foreground/20" }
         ].map((cat, i) => (
           <Card key={i} className="border border-white/5 bg-card/40 backdrop-blur-md rounded p-6 hover:border-primary/20 transition-all group cursor-pointer">
              <div className="flex items-center justify-between mb-4 leading-none">
                 <cat.icon className={cn("h-5 w-5 opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all", cat.color)} />
                 <span className="text-[10px] font-semibold text-foreground/10 group-hover:text-primary/20 transition-colors uppercase tracking-[0.2em]">0{i+1}</span>
              </div>
              <h3 className="text-[14px] font-semibold tracking-tight text-foreground mb-1 group-hover:text-primary transition-colors">{cat.label}</h3>
              <p className="text-[10px] font-semibold text-foreground/20 uppercase tracking-widest">{cat.count} Documents</p>
           </Card>
         ))}
      </div>

      {/* ───────────────────────────────────────────────────────────
          PLAN 3 — DOCUMENTS LIST (PIÈCES RÉGLEMENTAIRES CAMEROUN)
          ─────────────────────────────────────────────────────────── */}
      <div className="bg-card/20 backdrop-blur-xl overflow-hidden rounded min-h-[400px] shadow-2xl shadow-black/5">
         <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-white/[0.02] text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/30">
            <div className="w-10 shrink-0">CODE</div>
            <div className="flex-1">PIÈCE ADMINISTRATIVE (RÉGLEMENTAIRE)</div>
            <div className="w-[120px] shrink-0 text-center">VALIDITÉ</div>
            <div className="w-[130px] shrink-0 text-right pr-4">ACTIONS</div>
         </div>

         <div className="divide-y divide-white/5">
            {[
              { id: "A1", nom: "Attestation de Non Redevance (ANR)", org: "Direction Générale des Impôts", type: "ADM", date: "04 Juin 2025", status: "VALID" },
              { id: "A2", nom: "Quitus CNPS", org: "Caisse Nationale de Prévoyance Sociale", type: "ADM", date: "31 Déc 2025", status: "VALID" },
              { id: "A3", nom: "Attestation de Domiciliation Bancaire", org: "Banque (Agrément MINFI)", type: "FIN", date: "Permanent", status: "VALID" },
              { id: "A4", nom: "Registre de Commerce (RCCM / GFF)", org: "Greffe du Tribunal de Commerce", type: "ADM", date: "Permanent", status: "VALID" },
              { id: "A5", nom: "Plan de Localisation visé", org: "Services Fiscaux", type: "ADM", date: "Permanent", status: "VALID" },
              { id: "T1", nom: "Références Techniques BTP (3 ans)", org: "Certificats de Fin de Travaux (PV)", type: "TEC", date: "Permanent", status: "VALID" }
            ].map((doc, i) => (
              <div key={i} className="flex items-center gap-4 px-6 h-20 py-4 hover:bg-white/[0.03] transition-all group">
                <div className="w-10 shrink-0">
                   <div className="h-8 w-8 rounded bg-background border border-white/5 flex items-center justify-center font-semibold text-[10px] text-foreground/30 group-hover:bg-primary group-hover:text-black transition-all">
                      {doc.id}
                   </div>
                </div>
                <div className="flex-1 min-w-0 pr-4">
                   <h4 className="text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors truncate tracking-tight">{doc.nom}</h4>
                   <p className="text-[10px] text-foreground/20 font-light truncate uppercase tracking-[0.05em] mt-0.5">{doc.org}</p>
                </div>
                <div className="w-[120px] shrink-0 text-center">
                   <span className="text-[10px] font-semibold uppercase tracking-tight text-foreground/40">{doc.date}</span>
                </div>
                <div className="w-[130px] shrink-0 flex items-center justify-end gap-2 pr-1">
                   <Button variant="outline" title="Générer certification" className="h-9 w-9 p-0 rounded border border-white/10 text-foreground/30 hover:text-primary hover:border-primary/50 transition-all"><ExternalLink size={14} /></Button>
                   <Button variant="outline" className="h-9 w-9 p-0 rounded border border-white/10 text-foreground/30 hover:text-primary hover:border-primary/50 transition-all"><Download size={14} /></Button>
                   <Button variant="outline" className="h-9 w-9 p-0 rounded border border-white/5 text-foreground/10 hover:text-red-500 hover:border-red-500/50 transition-all"><Trash size={14} /></Button>
                </div>
              </div>
            ))}
         </div>
         
         <div className="p-12 text-center opacity-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em]">Fin de chargement du dossier PME</p>
         </div>
      </div>

    </div>
  )
}
