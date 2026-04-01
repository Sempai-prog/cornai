// ══════════════════════════════════════════
// CORNAi — Profil Entreprise (Dashboard High-End — Quiet Design)
// ══════════════════════════════════════════

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  User, 
  Plus, 
  Trash, 
  Smartphone,
  ShieldCheck,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProfilEntreprisePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20 bg-background text-foreground selection:bg-primary/20 antialiased">
      
      {/* 1. Header with Avatar - Quiet Elegance */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="h-24 w-24 rounded bg-primary text-black text-3xl font-semibold flex items-center justify-center border-4 border-background shadow-2xl shadow-primary/10">
          AB
        </div>
        <div className="space-y-2.5">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-none">Antigravity BTP Sarl</h1>
          <div className="flex items-center gap-3 justify-center text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/40">
             <span className="flex items-center gap-1.5"><Smartphone className="h-4 w-4 opacity-40" /> 237 699 001 122</span>
             <span className="opacity-20">•</span>
             <Badge className="bg-primary/10 text-primary border-none font-semibold px-3 py-0.5 rounded shadow-none uppercase tracking-wider text-[10px]">Compte Expert</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* 2. Informations de base - Card Style Quiet */}
         <Card className="border border-white/5 bg-card/40 backdrop-blur-xl rounded p-2">
            <CardHeader className="pb-4">
               <CardTitle className="text-[11px] font-semibold uppercase tracking-[0.2em] flex items-center gap-2.5 text-foreground/80">
                  <User className="h-4 w-4 text-primary/60" /> Identité & Capacité
               </CardTitle>
               <CardDescription className="text-[10px] font-semibold text-foreground/30 uppercase tracking-wider">Paramètres de matching IA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/20 ml-1">Secteur Principal</label>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded flex items-center justify-between group">
                     <span className="text-[14px] font-semibold text-foreground/80">Travaux & Construction BTP</span>
                     <Button variant="ghost" className="h-7 text-[10px] font-semibold uppercase tracking-widest text-primary hover:bg-primary/10">Modifier</Button>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/20 ml-1">Capacité financière</label>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded flex items-center justify-between group">
                     <span className="text-[14px] font-semibold text-foreground/80">50.000.000 FCFA</span>
                     <Button variant="ghost" className="h-7 text-[10px] font-semibold uppercase tracking-widest text-primary hover:bg-primary/10">Modifier</Button>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/20 ml-1">Zone de déploiement</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                     <Badge className="bg-primary/10 text-primary/80 border-none font-semibold h-7 px-4 rounded uppercase tracking-wider text-[10px]">Centre</Badge>
                     <Badge className="bg-white/[0.03] text-foreground/40 border border-white/5 font-semibold h-7 px-4 rounded uppercase tracking-wider text-[10px]">Littoral</Badge>
                     <Button variant="outline" className="h-7 w-7 p-0 rounded border border-white/10 text-foreground/20 hover:text-primary transition-all"><Plus size={14} /></Button>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* 3. Statut Administratif - Aligné sur le Style Primary de la Landing */}
         <Card className="border border-primary/10 bg-primary/[0.03] backdrop-blur-xl rounded overflow-hidden relative p-2 shadow-2xl shadow-primary/5">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
               <ShieldCheck size={120} className="text-primary rotate-12" />
            </div>
            <CardHeader className="relative">
               <CardTitle className="text-[11px] font-semibold uppercase tracking-[0.2em] flex items-center gap-2.5 text-primary/60">
                  <ShieldCheck className="h-4 w-4" /> Conformité PME
               </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-8 h-full">
               <div className="flex flex-col items-center py-4">
                  <div className="text-6xl font-semibold tracking-tighter text-foreground">92<span className="text-2xl text-primary opacity-60">%</span></div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/80 mt-1">Status Global</p>
               </div>
               
               <div className="space-y-4 pt-6 border-t border-white/5">
                  <p className="text-[12px] font-light leading-relaxed text-foreground/60 tracking-tight">
                     Votre dossier est quasi-complet. Une action immédiate est requise pour maintenir votre éligibilité aux marchés de type AONO.
                  </p>
                  <Button className="w-full bg-primary text-black h-11 rounded font-semibold text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all active:scale-95">
                     Coffre-fort numérique
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>

      {/* 4. Documents Vault - Aligné Table Style */}
      <Card className="border border-white/5 bg-white/[0.02] backdrop-blur-xl rounded overflow-hidden shadow-2xl shadow-black/5">
         <CardHeader className="flex flex-col sm:flex-row items-center justify-between p-8 border-b border-white/5 gap-6">
            <div className="text-center sm:text-left">
               <CardTitle className="text-2xl font-semibold tracking-tight mb-1 text-foreground">Coffre-fort Documents</CardTitle>
               <CardDescription className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/30">Pièces d&apos;identité et agréments techniques</CardDescription>
            </div>
            <Button className="bg-foreground text-background hover:bg-primary hover:text-black h-11 px-8 rounded font-semibold text-[10px] uppercase tracking-[0.25em] transition-all"><Plus className="mr-2 h-4 w-4" /> NOUVELLE PIÈCE</Button>
         </CardHeader>
         <CardContent className="p-0">
            <div className="divide-y divide-white/5">
               {[
                 { nom: "Attestation Non Redevance (ANR)", date: "04 Juin 2025", status: "VALID" },
                 { nom: "Attestation CNPS", date: "04 Avril 2025", status: "EXPIRES_SOON" },
                 { nom: "Statuts de l'Entreprise", date: "Illimitée", status: "VALID" }
               ].map((d, i) => (
                 <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-white/[0.02] transition-all gap-4 group">
                    <div className="flex items-center gap-6">
                       <div className="h-14 w-14 bg-background border border-white/5 rounded flex items-center justify-center font-semibold text-[10px] text-foreground/20 group-hover:text-primary group-hover:border-primary/50 transition-all shadow-sm">
                          JSON
                       </div>
                       <div className="space-y-1">
                          <h4 className="font-semibold text-[15px] text-foreground group-hover:text-primary transition-colors tracking-tight">{d.nom}</h4>
                          <p className="text-[10px] font-light text-foreground/30 uppercase tracking-[0.05em]">Expire le <span className="text-foreground/60">{d.date}</span></p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="text-right mr-4 hidden sm:block">
                          {d.status === "VALID" ? <Badge className="bg-primary/10 text-primary/80 border-none font-semibold text-[10px] uppercase tracking-wider p-1 px-3">VALIDE</Badge> : <Badge className="bg-red-500/10 text-red-500/80 border-none font-semibold text-[10px] uppercase tracking-wider p-1 px-3">URGENT</Badge>}
                       </div>
                       <Button variant="outline" className="h-10 w-10 p-0 rounded border border-white/10 text-foreground/30 hover:text-primary hover:border-primary/50 transition-all"><FileText size={16} /></Button>
                       <Button variant="outline" className="h-10 w-10 p-0 rounded border border-white/5 text-foreground/10 hover:text-red-500 hover:border-red-500/50 transition-all"><Trash size={16} /></Button>
                    </div>
                 </div>
               ))}
            </div>
         </CardContent>
      </Card>

    </div>
  )
}
