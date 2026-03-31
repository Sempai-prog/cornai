// ══════════════════════════════════════════
// CORNAi — Profil Entreprise (Dashboard)
// ══════════════════════════════════════════

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  User, 
  MapPin, 
  Wallet, 
  Target, 
  FileText, 
  Plus, 
  Trash, 
  Globe, 
  Smartphone,
  ShieldCheck,
  Briefcase
} from "lucide-react"

export default function ProfilEntreprisePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* 1. Header with Avatar and ID */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="h-24 w-24 rounded-3xl bg-cornai text-white text-4xl font-extrabold flex items-center justify-center border-4 border-white shadow-2xl shadow-cornai/20">
          AB
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">Antigravity BTP Sarl</h1>
          <p className="text-muted-foreground flex items-center gap-2 justify-center">
             <Smartphone className="h-4 w-4" /> 237 699 001 122 • <Badge variant="secondary" className="bg-cornai/5 text-cornai font-bold">Compte Expert</Badge>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* 2. Informations de base */}
         <Card className="border-none shadow-2xl bg-white rounded-3xl p-4">
            <CardHeader>
               <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <User className="h-5 w-5 text-cornai" /> Identité & Capacité
               </CardTitle>
               <CardDescription>Informations utilisées pour le matching IA.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-muted-foreground ml-1">Secteur Principal</label>
                  <div className="p-4 bg-muted/30 rounded-2xl flex items-center justify-between group">
                     <span className="font-medium">Travaux & Construction BTP</span>
                     <Button variant="ghost" className="h-8 group-hover:text-cornai">Modifier</Button>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-muted-foreground ml-1">Capacité financière (Max)</label>
                  <div className="p-4 bg-muted/30 rounded-2xl flex items-center justify-between group">
                     <span className="font-medium">50.000.000 FCFA</span>
                     <Button variant="ghost" className="h-8 group-hover:text-cornai">Modifier</Button>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-muted-foreground ml-1">Zone de travail</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                     <Badge className="bg-primary text-white font-bold h-8 px-4 rounded-full">Centre</Badge>
                     <Badge className="bg-muted text-muted-foreground font-bold h-8 px-4 rounded-full">Littoral</Badge>
                     <Button variant="outline" className="h-8 w-8 p-0 rounded-full border-dashed"><Plus className="h-4 w-4" /></Button>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* 3. Statut Administratif (Compliance Summary) */}
         <Card className="border-none shadow-2xl bg-primary text-white rounded-3xl overflow-hidden relative p-4">
            <div className="absolute inset-0 bg-cornai/10 opacity-50" />
            <CardHeader className="relative">
               <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-cornai" /> Conformité Dossier
               </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-8">
               <div className="flex flex-col items-center">
                  <div className="text-5xl font-extrabold tracking-tighter">92%</div>
                  <p className="text-[10px] font-bold tracking-widest text-white/50 mt-1">Score administratif local</p>
               </div>
               
               <div className="space-y-4 pt-6 border-t border-white/10">
                  <p className="text-sm font-medium leading-relaxed opacity-70">
                     Votre dossier administratif est à 92% complet. <br /><br />
                     <span className="text-cornai font-bold">1 action urgente :</span> Renouvelez votre Attestation CNPS avant le 04 Avril.
                  </p>
                  <Button className="w-full bg-white text-primary h-12 rounded-xl font-bold shadow-xl shadow-black/20 hover:bg-white/90">
                     Ouvrir le coffre-fort numérique
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>

      {/* 4. Liste des documents (Tableau simple) */}
      <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden">
         <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-muted">
            <div>
               <CardTitle className="text-2xl font-extrabold mb-1">Coffre-fort Documents</CardTitle>
               <CardDescription>Vos pièces en cours de validité.</CardDescription>
            </div>
            <Button className="bg-cornai hover:bg-cornai/90 shadow-xl shadow-cornai/20 h-12 px-8 rounded-xl font-bold"><Plus className="mr-2 h-4 w-4" /> Uploader une pièce</Button>
         </CardHeader>
         <CardContent className="p-0">
            <div className="divide-y divide-muted">
               {[
                 { nom: "Attestation Non Redevance (ANR)", date: "04 Juin 2025", status: "VALID" },
                 { nom: "Attestation CNPS", date: "04 Avril 2025", status: "EXPIRES_SOON" },
                 { nom: "Statuts de l'Entreprise", date: "Illimitée", status: "VALID" },
                 { nom: "Certificat d'Immatriculation", date: "01 Jan 2026", status: "VALID" }
               ].map((d, i) => (
                 <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-8 group hover:bg-muted/30 transition-all gap-4">
                    <div className="flex items-center gap-6">
                       <div className="h-16 w-16 bg-muted rounded-2xl flex items-center justify-center font-bold text-muted-foreground group-hover:bg-white group-hover:text-cornai shadow-sm transition-all">
                          PDF
                       </div>
                       <div className="space-y-1">
                          <h4 className="font-bold text-lg group-hover:text-cornai transition-colors">{d.nom}</h4>
                          <p className="text-sm text-muted-foreground">Validité : <span className="font-bold text-primary">{d.date}</span></p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="text-right mr-4 hidden sm:block">
                          {d.status === "VALID" ? <Badge className="bg-cornai text-white font-bold h-6">Valide</Badge> : <Badge variant="destructive" className="font-bold h-6 pulse-anim">Expire bientôt</Badge>}
                       </div>
                       <Button variant="outline" className="h-12 w-12 p-0 rounded-xl hover:text-cornai"><FileText className="h-5 w-5" /></Button>
                       <Button variant="outline" className="h-12 w-12 p-0 rounded-xl text-destructive hover:bg-destructive/5"><Trash className="h-5 w-5" /></Button>
                    </div>
                 </div>
               ))}
            </div>
         </CardContent>
      </Card>

    </div>
  )
}
