// ══════════════════════════════════════════
// CORNAi — Détail Appel d'Offre (Dashboard)
// ══════════════════════════════════════════

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Target, 
  AlertTriangle, 
  FileText, 
  ShieldCheck, 
  Search,
  Check,
  X,
  Plus
} from "lucide-react"
import Link from "next/link"
import { getAOById } from "@/database/queries/ao"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function AppelsOffreDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const ao = await getAOById(id)
  
  if (!ao) {
    notFound()
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Page Header with Back button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
           <Link href="/dashboard/appels-offres" className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-cornai transition-colors">
              <ArrowLeft className="h-4 w-4" /> Retour à la liste
           </Link>
           <h1 className="text-3xl font-extrabold tracking-tight">{ao.titreComplet}</h1>
           <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-cornai/10 text-cornai font-bold px-3 py-1 text-sm">Score Matching : 94%</Badge>
              <Badge variant="secondary">{ao.numeroMarche || 'N/A'}</Badge>
              <Badge variant="secondary">Date limite : {ao.dateLimiteSoumission ? new Date(ao.dateLimiteSoumission).toLocaleDateString('fr-FR') : 'N/A'}</Badge>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 px-6 rounded-xl font-bold shadow-lg shadow-black/5">Épingler 📎</Button>
           <Button className="bg-cornai hover:bg-cornai/90 text-white font-bold h-12 px-8 rounded-xl shadow-xl shadow-cornai/20 transition-all hover:-translate-y-1">
              Commencer la soumission 🏆
           </Button>
        </div>
      </div>

      {/* 2. Main Content Layout (Desktop: Side Column for Score) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 space-y-8">
            <Tabs defaultValue="resume" className="w-full">
               <TabsList className="bg-white border border-border/50 rounded-2xl h-14 p-1 shadow-lg shadow-black/5">
                  <TabsTrigger value="resume" className="rounded-xl h-11 px-8 font-bold data-[state=active]:bg-cornai data-[state=active]:text-white">Résumé</TabsTrigger>
                  <TabsTrigger value="criteres" className="rounded-xl h-11 px-8 font-bold data-[state=active]:bg-cornai data-[state=active]:text-white">Critères</TabsTrigger>
                  <TabsTrigger value="checklist" className="rounded-xl h-11 px-8 font-bold data-[state=active]:bg-cornai data-[state=active]:text-white">Checklist Documents</TabsTrigger>
               </TabsList>
               
               {/* 3. Tab: Résumé (IA Insights) */}
               <TabsContent value="resume" className="space-y-6 pt-6 animate-in slide-in-from-top-4 duration-500">
                  <Card className="border-none shadow-2xl bg-white rounded-3xl p-4">
                     <CardHeader>
                        <CardTitle className="text-2xl font-extrabold flex items-center gap-2">
                           <Search className="h-6 w-6 text-cornai" /> Analyse Prédictive CORNAi
                        </CardTitle>
                        <CardDescription>Extraits structurés automatiquement par l'IA à partir du DAO.</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-6">
                              <div className="p-5 bg-muted/30 rounded-3xl space-y-3">
                                 <h4 className="font-bold text-[10px] tracking-widest text-muted-foreground">Objet et budget</h4>
                                 <p className="text-sm font-medium leading-relaxed">
                                    {ao.titreComplet}. Budget prévisionnel : <strong>{ao.budgetEstime} FCFA</strong> TTC.
                                 </p>
                              </div>
                              <div className="p-5 bg-muted/30 rounded-3xl space-y-3">
                                 <h4 className="font-bold text-[10px] tracking-widest text-muted-foreground">Attention aux critères</h4>
                                 <p className="text-sm font-medium leading-relaxed text-destructive">
                                    "Avoir réalisé au moins un projet similaire au cours des 5 dernières années."
                                 </p>
                              </div>
                           </div>
                           <div className="space-y-6">
                              <Card className="border-border/50 shadow-none bg-muted/50 p-6 rounded-3xl">
                                 <h4 className="font-bold mb-4 flex items-center gap-2 text-primary font-bold"><ShieldCheck className="h-5 w-5" /> Documents Critiques</h4>
                                 <ul className="space-y-4 text-sm font-medium">
                                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-cornai" /> Caution de soumission</li>
                                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-cornai" /> Certificat Imposition</li>
                                    <li className="flex items-center gap-3 text-destructive font-bold"><X className="h-4 w-4" /> Certificat Non Redevance (À vérifier)</li>
                                 </ul>
                              </Card>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value="criteres" className="pt-6">
                  <Card className="border-none shadow-2xl bg-white rounded-3xl p-4">
                     <CardHeader>
                        <CardTitle className="text-xl font-bold">Critères Éliminatoires</CardTitle>
                        <CardDescription>Liste des points bloquants détectés.</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        {["Non-production de l'Attestation de Non-Redevance (ANR) en cours de validité", "Dossier technique insuffisant"].map((c, i) => (
                           <div key={i} className="p-4 bg-destructive/5 border border-destructive/10 rounded-2xl flex items-start gap-4">
                              <AlertTriangle className="h-5 w-5 text-destructive mt-1 shrink-0" />
                              <p className="text-sm font-medium">{c}</p>
                           </div>
                        ))}
                     </CardContent>
                  </Card>
               </TabsContent>

               <TabsContent value="checklist" className="pt-6">
                  <Card className="border-none shadow-2xl bg-white rounded-3xl p-4 overflow-hidden">
                     <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                           <CardTitle className="text-xl font-bold">Checklist Digitale COLEPS</CardTitle>
                           <CardDescription>Préparez vos fichiers selon le formalisme requis.</CardDescription>
                        </div>
                        <Button className="bg-primary text-white h-10 px-6 rounded-xl font-bold"><Plus className="h-4 w-4 mr-2" /> Scanner DAO</Button>
                     </CardHeader>
                     <CardContent className="p-0">
                        <div className="divide-y border-t mt-4">
                           {[
                              { doc: "Bulletin de versement", status: "OK", type: "Financier" },
                              { doc: "Caution de soumission", status: "OK", type: "Financier" },
                              { doc: "Attestation CNPS", status: "PENDING", type: "Administratif" },
                              { doc: "Plan de charge", status: "MISSING", type: "Technique" }
                           ].map((d, i) => (
                              <div key={i} className="flex items-center justify-between p-5 hover:bg-muted font-bold transition-all group">
                                 <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 flex items-center justify-center rounded-xl bg-muted group-hover:bg-white`}>
                                       <FileText className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                       <p className="text-sm">{d.doc}</p>
                                       <Badge variant="outline" className="text-[10px] h-5">{d.type}</Badge>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-4">
                                    {d.status === "OK" ? <Badge className="bg-cornai text-white font-bold">Prêt</Badge> : d.status === "EXPIRED" ? <Badge variant="destructive">Expiré</Badge> : <Badge variant="secondary">À fournir</Badge>}
                                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-lg group-hover:bg-white">...</Button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>
            </Tabs>
         </div>

         {/* 4. Side Widget : Matching Engine Detailed Score */}
         <div className="space-y-6">
            <Card className="border-none shadow-2xl bg-primary text-white rounded-3xl overflow-hidden relative p-4">
               <div className="absolute inset-0 bg-cornai/10 opacity-50" />
               <CardHeader className="relative">
                  <Target className="h-10 w-10 text-cornai mb-4" />
                  <CardTitle className="text-4xl font-extrabold tracking-tighter">94%</CardTitle>
                  <CardDescription className="text-white/60 font-bold tracking-widest text-[10px]">Probabilité de succès</CardDescription>
               </CardHeader>
               <CardContent className="relative space-y-4">
                  <div className="space-y-4 pt-6 border-t border-white/10">
                     {[
                        { label: "Secteur", value: 100 },
                        { label: "Budget", value: 95 },
                        { label: "Géographie", value: 80 },
                        { label: "Expérience", value: 70 }
                     ].map((s, i) => (
                        <div key={i} className="space-y-2">
                           <div className="flex justify-between text-xs font-bold">
                              <span>{s.label}</span>
                              <span className="text-cornai">{s.value}%</span>
                           </div>
                           <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-cornai rounded-full" style={{ width: `${s.value}%` }} />
                           </div>
                        </div>
                     ))}
                  </div>
                  <p className="text-[10px] text-white/50 text-center pt-4">Algorithme basé sur les décisions de l'ARMP over 2024.</p>
               </CardContent>
            </Card>

            <Card className="border border-border/50 shadow-xl bg-white rounded-3xl p-6">
               <h4 className="font-bold flex items-center gap-2 mb-4"><ShieldCheck className="h-5 w-5 text-cornai" /> Bureau d'étude Premium</h4>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Confiez-nous l'intégralité du montage de votre offre technique pour cet AO.
               </p>
               <Button variant="outline" className="w-full h-12 rounded-xl mt-6 font-bold border-cornai text-cornai hover:bg-cornai hover:text-white transition-all">
                  Demander un Assistant Dédié
               </Button>
            </Card>
         </div>
      </div>

    </div>
  )
}
