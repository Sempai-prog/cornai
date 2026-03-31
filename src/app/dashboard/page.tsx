// ══════════════════════════════════════════
// CORNAi — Dashboard Home (Server Component)
// ══════════════════════════════════════════

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Target, 
  Files, 
  FileText,
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  ArrowRight,
  Plus
} from "lucide-react"
import Link from "next/link"
import { getDerniersAO } from "@/database/queries/ao"

export const dynamic = 'force-dynamic'

export default async function DashboardHome() {
  // Fetch real AOs for recommendations section
  const recommendedAOs = await getDerniersAO(3)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Header with greeting and primary action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
        <div>
           <h1 className="text-3xl font-extrabold tracking-tight">Bonjour, Antigravity BTP 👋</h1>
           <p className="text-muted-foreground mt-1 text-lg">Bienvenue sur votre espace de pilotage CORNAi.</p>
        </div>
        <Button className="bg-cornai hover:bg-cornai/90 shadow-xl shadow-cornai/20 h-12 px-6 rounded-xl font-bold transition-all hover:-translate-y-1">
           <Plus className="mr-2 h-5 w-5" /> Ajouter un document
        </Button>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-lg shadow-black/5 bg-white">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold tracking-widest text-muted-foreground/80">AO matchés</CardTitle>
              <Target className="h-4 w-4 text-cornai" />
           </CardHeader>
           <CardContent>
              <div className="text-3xl font-extrabold">12</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                 <TrendingUp className="h-3 w-3 text-cornai" /> +3 cette semaine
              </p>
           </CardContent>
        </Card>

        <Card className="border-none shadow-lg shadow-black/5 bg-white">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold tracking-widest text-muted-foreground/80">Score moyen</CardTitle>
              <div className="h-4 w-4 rounded-full bg-cornai" />
           </CardHeader>
           <CardContent>
              <div className="text-3xl font-extrabold">87%</div>
              <p className="text-xs text-muted-foreground mt-1">Excellent profil</p>
           </CardContent>
        </Card>

        <Card className="border-none shadow-lg shadow-black/5 bg-white">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold tracking-widest text-muted-foreground/80">Soumissions</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
           </CardHeader>
           <CardContent>
              <div className="text-3xl font-extrabold">3</div>
              <p className="text-xs text-muted-foreground mt-1">En cours de préparation</p>
           </CardContent>
        </Card>

        <Card className="border-none shadow-lg shadow-black/5 bg-white">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold tracking-widest text-muted-foreground/80">Docs conformes</CardTitle>
              <Files className="h-4 w-4 text-cornai" />
           </CardHeader>
           <CardContent>
              <div className="text-3xl font-extrabold">92%</div>
              <p className="text-xs text-destructive mt-1 flex items-center gap-1 font-medium">
                 <AlertTriangle className="h-3 w-3" /> 1 document expire bientôt
              </p>
           </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* 3. Recent Opportunities */}
         <Card className="lg:col-span-2 border-none shadow-2xl bg-white rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle className="text-xl">Opportunités recommandées</CardTitle>
                  <CardDescription>Matchings basés sur votre profil IA.</CardDescription>
               </div>
               <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/appels-offres" className="text-cornai font-bold flex items-center gap-1">
                     Tout voir <ArrowRight className="h-4 w-4" />
                  </Link>
               </Button>
            </CardHeader>
            <CardContent className="space-y-4">
               {recommendedAOs && recommendedAOs.length > 0 ? (
                 recommendedAOs.map(ao => (
                   <Link 
                     key={ao.id} 
                     href={`/dashboard/appels-offres/${ao.id}`}
                     className="flex items-center gap-6 p-4 rounded-2xl hover:bg-muted/30 transition-all cursor-pointer group"
                   >
                     <div className="h-16 w-16 bg-muted rounded-xl flex items-center justify-center font-bold text-lg text-muted-foreground group-hover:bg-cornai/10 group-hover:text-cornai transition-all">
                        AO
                     </div>
                     <div className="flex-1 space-y-1">
                        <h4 className="font-bold leading-none line-clamp-1 group-hover:text-cornai transition-colors">{ao.titreComplet}</h4>
                        <p className="text-sm text-muted-foreground">{ao.institution} • {ao.budgetEstime} FCFA</p>
                        <div className="flex gap-2">
                           <Badge variant="secondary" className="bg-cornai/10 text-cornai hover:bg-cornai/20">Match 94%</Badge>
                           <Badge variant="outline" className="text-[10px] font-bold tracking-widest">{ao.typeMarche || 'Travaux'}</Badge>
                        </div>
                     </div>
                     <div className="text-right space-y-1">
                        <p className="text-sm font-bold">12 Jours</p>
                        <p className="text-[10px] text-muted-foreground">Restants</p>
                     </div>
                   </Link>
                 ))
               ) : (
                 <div className="text-center py-10">
                   <p className="text-muted-foreground">Aucune recommandation pour le moment.</p>
                 </div>
               )}
            </CardContent>
         </Card>

         {/* 4. Urgency Panel */}
         <Card className="border-none shadow-2xl bg-primary text-white rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-cornai/10 opacity-50" />
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-cornai" /> 
                  Alertes de conformité
               </CardTitle>
               <CardDescription className="text-white/60">Actions requises immédiatement.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative">
               <div className="p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
                  <p className="text-xs font-bold tracking-widest mb-1 text-cornai">Expiration</p>
                  <p className="font-bold text-sm">Attestation de Non Redevance (ANR)</p>
                  <p className="text-xs text-white/50 mt-1 flex items-center gap-1">
                     <Calendar className="h-3 w-3" /> Expire dans 4 jours
                  </p>
               </div>

               <div className="p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
                  <p className="text-xs font-bold tracking-widest mb-1 text-cornai">Manquant</p>
                  <p className="font-bold text-sm">Certificat de non-exclusion (ARMP)</p>
                  <p className="text-xs text-white/50 mt-1">Requis pour votre prochaine soumission</p>
               </div>

               <Button className="w-full bg-white text-primary hover:bg-white/90 h-12 rounded-xl font-bold mt-4 shadow-xl shadow-black/20">
                  Mettre à jour mes documents
               </Button>
            </CardContent>
         </Card>
      </div>

    </div>
  )
}
