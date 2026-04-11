// ══════════════════════════════════════════
// CORNAi — Détail Dossier (Phase D1.6 — Marchés Publics Domain Knowledge)
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
  Plus,
  Calculator,
  Gavel,
  ShieldAlert,
  FileCheck2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { startWorkflowAction } from "@/app/actions/soumissions"
import { db } from "@/database/client"
import { soumissions } from "@/database/schema"
import { eq, and } from "drizzle-orm"
import { getAOById } from "@/database/queries/ao"
import { notFound } from "next/navigation"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function AppelsOffreDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const ao = await getAOById(id)
  
  if (!ao) {
    notFound()
  }

  // Check if a dossier already exists for this AO (using hardcoded entrepriseId for now)
  const entrepriseId = "cf83af70-d49b-4a72-8222-201f08a05a8a"
  const existingSoumission = await db.query.soumissions.findFirst({
    where: and(
      eq(soumissions.entrepriseId, entrepriseId),
      eq(soumissions.appelOffreId, id)
    )
  })
  const hasExistingDossier = !!existingSoumission

  // Domain logic mocks for demo
  const mo = ao.institution || "Maître d'Ouvrage (MO)"
  const mod = "Direction des Infrastructures (MOD)"
  const caution = ao.cautionMontant ? `${ao.cautionMontant.toLocaleString()} FCFA` : "2% du budget (Estimé)"

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 antialiased bg-transparent">
      
      {/* ───────────────────────────────────────────────────────────
          PLAN 1 — HEADER (Elite Precision)
          ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/10 mt-0 lg:mt-[-4px]">
        <div className="space-y-4 flex-1">
           <Link href="/dashboard/appels-offres" className="flex items-center gap-2 text-[10px] font-semibold text-muted-foreground/60 hover:text-primary transition-all uppercase tracking-[0.2em]">
              <ArrowLeft className="h-3 w-3" /> Retour au flux JDM
           </Link>
           <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                 <Badge variant="outline" className="h-5 rounded-[4px] border-primary/20 bg-primary/5 px-2 text-[9px] font-semibold text-primary uppercase tracking-tight">
                    {ao.typeMarche || "AONO"}
                 </Badge>
                 <span className="text-[10px] font-semibold text-muted-foreground/30 uppercase tracking-[0.2em]">RÉF: {ao.numeroMarche || "N/A"}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground leading-[1.1] max-w-4xl">
                 {ao.titreComplet}
              </h1>
           </div>
           
           <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex flex-col">
                 <span className="text-[9px] font-semibold text-muted-foreground/30 uppercase tracking-[0.2em]">Maître d&apos;Ouvrage</span>
                 <span className="text-[12px] font-medium text-foreground/70">{mo}</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[9px] font-semibold text-muted-foreground/30 uppercase tracking-[0.2em]">Date Clôture</span>
                 <span className="text-[12px] font-semibold text-primary/80">{ao.dateLimiteSoumission ? new Date(ao.dateLimiteSoumission).toLocaleDateString('fr-FR') : 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[9px] font-semibold text-muted-foreground/30 uppercase tracking-[0.2em]">Budget Estimé</span>
                 <span className="text-[12px] font-medium text-foreground/80">{ao.budgetEstime?.toLocaleString()} FCFA</span>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 mb-1">
           <Button variant="outline" className="h-9 px-4 rounded-[4px] border-border/40 bg-muted/10 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-all">
              Archiver
           </Button>
           <form action={async () => {
             "use server"
             await startWorkflowAction(id)
           }}>
             <Button type="submit" className="h-9 px-8 rounded-[4px] bg-primary text-black text-[10px] font-semibold uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-lg shadow-primary/10 border-none group">
                {hasExistingDossier ? (
                  <>REPRENDRE LE DOSSIER <FileCheck2 className="ml-2 h-3.5 w-3.5 transition-transform group-hover:scale-110" /></>
                ) : (
                  <>PRÉPARER LA SOUMISSION <ArrowLeft className="ml-2 h-3.5 w-3.5 rotate-180 transition-transform group-hover:translate-x-1" /></>
                )}
             </Button>
           </form>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          PLAN 2 — WORKSPACE CANONICAL (8/4 Split)
          ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* DUEL FLUX (8/12) — ANALYSE DÉTAILLÉE */}
         <div className="lg:col-span-8 space-y-8 flex flex-col min-w-0">
            <Tabs defaultValue="analyse" className="w-full">
               <TabsList className="bg-transparent border-b border-border/10 w-full justify-start rounded-none h-11 p-0 gap-8">
                  <TabsTrigger value="analyse" className="bg-transparent text-[10px] uppercase tracking-[0.2em] font-semibold h-full px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary transition-all rounded-none shadow-none">Diagnostic RPAO</TabsTrigger>
                  <TabsTrigger value="technique" className="bg-transparent text-[10px] uppercase tracking-[0.2em] font-semibold h-full px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary transition-all rounded-none shadow-none">Offre Technique</TabsTrigger>
                  <TabsTrigger value="financier" className="bg-transparent text-[10px] uppercase tracking-[0.2em] font-semibold h-full px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary transition-all rounded-none shadow-none">Offre Financière (BPU)</TabsTrigger>
               </TabsList>
               
               {/* DIAGNOSTIC RPAO */}
               <TabsContent value="analyse" className="space-y-6 pt-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-card/80 backdrop-blur-md border border-border/40 rounded-[4px] p-6 shadow-sm">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary/60 mb-6 flex items-center gap-2">
                           <ShieldAlert className="h-4 w-4" /> Critères Éliminatoires
                        </h3>
                        <div className="space-y-4">
                           {[
                             "Non-conformité de l'Attestation de Non-Redevance (ANR)",
                             "Absence de la caution de soumission authentifiée",
                             "Note technique inférieure à 70/100",
                             "Fausse déclaration ou pièce falsifiée"
                           ].map((c, i) => (
                             <div key={i} className="flex items-start gap-4 p-3.5 rounded-[4px] bg-red-500/[0.03] border border-red-500/10 group">
                                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                <p className="text-[13px] font-medium text-foreground/80 leading-snug tracking-tight">{c}</p>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="bg-card/80 backdrop-blur-md border border-border/40 rounded-[4px] p-6 shadow-sm">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40 mb-6 flex items-center gap-2">
                           <FileText className="h-4 w-4" /> Pièces du DTAO
                        </h3>
                        <div className="space-y-3">
                           {[
                             { d: "Liasse fiscale (DGI)", status: "VALIDE" },
                             { d: "Quitus CNPS", status: "VALIDE" },
                             { d: "Attestation Domiciliation", status: "VALIDE" },
                             { d: "Plan de Localisation", status: "À VÉRIFIER" },
                             { d: "Certificat Non-Exclusion", status: "À VÉRIFIER" }
                           ].map((doc, i) => (
                             <div key={i} className="flex items-center justify-between p-3 rounded-[4px] bg-muted/10 border border-border/10">
                                <span className="text-[12px] font-medium text-foreground/70 tracking-tight">{doc.d}</span>
                                <Badge variant="outline" className={cn(
                                   "h-4 text-[7px] font-semibold uppercase tracking-tighter rounded-[2px] border-none",
                                   doc.status === "VALIDE" ? "bg-primary/20 text-primary" : "bg-orange-500/20 text-orange-500"
                                )}>
                                   {doc.status}
                                </Badge>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="bg-primary/[0.03] border border-primary/20 rounded-[4px] p-8">
                     <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80 mb-4">Recommandation Stratégique CORNAi</h3>
                     <p className="text-[14px] text-foreground/70 leading-relaxed border-l-2 border-primary/20 pl-6 font-medium tracking-tight">
                        &quot;Ce marché AONO présente un profil de risque faible grâce à votre solvabilité fiscale. Cependant, le Maître d&apos;Ouvrage est exigeant sur la méthodologie de chantier. Nous recommandons de soigner particulièrement le mémoire technique et le plan de protection environnemental.&quot;
                     </p>
                  </div>
               </TabsContent>

               {/* OFFRE TECHNIQUE */}
               <TabsContent value="technique" className="pt-6">
                  <div className="p-20 border border-dashed border-border/40 rounded-[4px] bg-muted/5 flex flex-col items-center justify-center text-center">
                     <Target className="h-10 w-10 text-muted-foreground/10 mb-4" />
                     <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/30">Moteur de génération de mémoire technique (Beta)</p>
                  </div>
               </TabsContent>

               {/* OFFRE FINANCIÈRE (BPU) */}
               <TabsContent value="financier" className="pt-6">
                  <div className="p-20 border border-dashed border-border/40 rounded-[4px] bg-muted/5 flex flex-col items-center justify-center text-center">
                     <Calculator className="h-10 w-10 text-muted-foreground/10 mb-4" />
                     <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/30">Module de chiffrage BPU / DQE (En attente d&apos;estimation)</p>
                  </div>
               </TabsContent>
            </Tabs>
         </div>

         {/* L'INSPECTEUR (4/12) — SCORE & PILOTAGE */}
         <div className="lg:col-span-4 flex flex-col gap-6 sticky top-6 self-start">
            <div className="bg-card/80 backdrop-blur-md border border-border/40 rounded-[4px] p-8 relative overflow-hidden shadow-sm">
               <div className="relative space-y-6">
                  <div className="space-y-1">
                     <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/40">Score de Matching</p>
                     <p className="text-5xl font-semibold tracking-tighter text-foreground">94<span className="text-xl opacity-40">%</span></p>
                  </div>
                  
                  <div className="space-y-4 border-t border-border/10 pt-6">
                     {[
                        { l: "Capacité Financière", v: 100 },
                        { l: "Conformité Administrative", v: 92 },
                        { l: "Expérience Technique", v: 78 }
                     ].map((s, i) => (
                        <div key={i} className="space-y-2">
                           <div className="flex justify-between text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60">
                              <span>{s.l}</span>
                              <span className="text-foreground">{s.v}%</span>
                           </div>
                           <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${s.v}%` }} />
                           </div>
                        </div>
                     ))}
                  </div>
                  
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/30 text-center pt-4">Calculé selon Référentiel ARMP 2024</p>
               </div>
            </div>

            <div className="bg-card/80 backdrop-blur-md border border-border/40 rounded-[4px] p-8 space-y-6">
               <div className="space-y-2">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40 flex items-center gap-2">
                     <Gavel className="h-4 w-4" /> Pilotage Soumission
                  </h4>
                  <p className="text-[13px] text-foreground/60 font-medium leading-relaxed tracking-tight">
                     Souhaitez-vous déléguer le montage de ce dossier à un expert ?
                  </p>
               </div>
               
               <Button className="w-full bg-muted/10 border border-border/40 text-muted-foreground hover:text-foreground font-semibold text-[10px] uppercase tracking-[0.2em] h-11 rounded-[4px] hover:bg-muted/20 transition-all">
                  Contacter Expert BTP
               </Button>
               
               <div className="pt-4 border-t border-border/10 flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/20">Assistance WhatsApp</span>
                  <div className="flex gap-2">
                     <Button size="icon" variant="ghost" className="h-9 w-9 rounded-[4px] text-primary hover:bg-primary/10 transition-all">
                        <Check size={18} />
                     </Button>
                  </div>
               </div>
            </div>
         </div>

      </div>

    </div>
  )
}
