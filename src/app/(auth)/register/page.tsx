"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, Smartphone, MapPin, Target, Mail, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { registerCompany } from "../auth-actions"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function RegisterPage() {
  const [step, setStep] = React.useState(1)
  const [formData, setFormData] = React.useState({
    nom: "",
    telephone: "",
    secteur: "",
    region: "",
    email: "",
  })
  const [isSubmitting, setIsLoading] = React.useState(false)

  const hangleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => setStep(prev => prev + 1)
  const handlePrev = () => setStep(prev => prev - 1)

  const handleRegister = async () => {
    setIsLoading(true)
    const res = await registerCompany({
       nom: formData.nom,
       telephone: formData.telephone,
       secteur: formData.secteur,
       region: formData.region,
       email: formData.email || undefined
    })

    if (res.success) {
       window.location.href = "/dashboard"
    } else {
       toast.error(res.error || "Une erreur est survenue")
       setIsLoading(false)
    }
  }

  const steps = [
    { title: "Identité", icon: Building2 },
    { title: "Ciblage", icon: Target },
    { title: "Activation", icon: Mail }
  ]

  return (
    <div className="w-full flex flex-col md:flex-row bg-card/60 dark:bg-card/80 border border-border dark:border-border/10 shadow-2xl backdrop-blur-xl overflow-hidden rounded min-h-[600px] transition-colors duration-500">
      
      {/* 1. PANNEAU DE GAUCHE : ÉTAPES / INFO */}
      <div className="hidden md:flex flex-col justify-between p-12 md:w-[350px] border-r border-border dark:border-border/10 bg-gradient-to-b from-foreground/[0.02] to-transparent">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-16 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 bg-[#25D366] flex items-center justify-center rounded">
              <ShieldCheck className="w-4 h-4 text-white dark:text-black" />
            </div>
            <span className="text-foreground font-semibold tracking-[0.2em] text-xs">SABI</span>
          </Link>
          
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground tracking-tighter uppercase leading-none">
                Profil PME
              </h2>
              <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                Configurez votre veille stratégique pour ne rater aucune opportunité AONO ou ARMP.
              </p>
            </div>
            
            <div className="space-y-6">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-4 relative">
                  <div className={cn(
                    "w-6 h-6 rounded flex items-center justify-center text-[10px] font-semibold transition-all border",
                    step > i + 1 
                      ? "bg-[#25D366] text-white dark:text-black border-[#25D366] shadow-sm shadow-[#25D366]/20" 
                      : step === i + 1 
                        ? "bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20" 
                        : "bg-muted text-muted-foreground/30 border-border"
                  )}>
                    {step > i + 1 ? <Check className="w-3 h-3" /> : i + 1}
                  </div>
                  <span className={cn(
                    "text-[10px] font-semibold tracking-widest transition-colors",
                    step >= i + 1 ? "text-foreground" : "text-muted-foreground/20"
                  )}>
                    {s.title}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="absolute left-3 top-6 w-[1px] h-6 bg-border dark:bg-border/10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Link 
          href="/" 
          className="text-[10px] font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 tracking-[0.2em]"
        >
          <ArrowLeft className="w-3 h-3" />
          RETOUR AU SITE
        </Link>
      </div>

      {/* 2. PANNEAU DE DROITE : FORMULAIRE ÉTAPES */}
      <div className="flex-1 p-8 md:p-14 bg-background/20 dark:bg-muted/10 transition-colors duration-500">
        <div className="max-w-[400px] mx-auto h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8 text-center md:text-left">
                <span className="text-[10px] font-semibold text-[#25D366] uppercase tracking-[0.3em] bg-[#25D366]/10 px-2 py-0.5 rounded inline-block mb-3">
                  Étape {step} sur 3
                </span>
                <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-2">
                  {step === 1 ? "Identité professionnelle" : step === 2 ? "Filtres de veille" : "Activation compte"}
                </h1>
              </div>

              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/40 pl-0.5">Raison sociale</label>
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/30 group-focus-within:text-[#25D366] transition-colors" />
                      <Input 
                        placeholder="Nom de l'entreprise" 
                        className="h-12 bg-background border-border dark:border-border/10 rounded pl-11 text-foreground font-semibold text-xs uppercase focus-visible:ring-1 focus-visible:ring-[#25D366]/30 shadow-sm dark:shadow-none transition-all"
                        value={formData.nom}
                        onChange={(e) => hangleChange("nom", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/40 pl-0.5">WhatsApp de contact</label>
                    <div className="relative group">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/30 group-focus-within:text-[#25D366] transition-colors" />
                      <Input 
                        placeholder="699 99 99 99" 
                        className="h-12 bg-background border-border dark:border-border/10 rounded pl-11 text-foreground font-semibold text-xs focus-visible:ring-1 focus-visible:ring-[#25D366]/30 shadow-sm dark:shadow-none transition-all"
                        value={formData.telephone}
                        onChange={(e) => hangleChange("telephone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/40 pl-0.5">Secteur principal</label>
                    <select 
                      className="h-12 w-full px-4 bg-background border border-border dark:border-border/10 rounded text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-[#25D366]/30 uppercase transition-all"
                      value={formData.secteur}
                      onChange={(e) => hangleChange("secteur", e.target.value)}
                    >
                      <option value="">Sélectionnez...</option>
                      <option value="Fournitures">FOURNITURES</option>
                      <option value="Travaux">TRAVAUX</option>
                      <option value="Services">SERVICES</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/40 pl-0.5">Région d&apos;intérêt</label>
                    <select 
                      className="h-12 w-full px-4 bg-background border border-border dark:border-border/10 rounded text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-[#25D366]/30 uppercase transition-all"
                      value={formData.region}
                      onChange={(e) => hangleChange("region", e.target.value)}
                    >
                      <option value="">Cible géographique...</option>
                      <option value="Centre">CENTRE</option>
                      <option value="Littoral">LITTORAL</option>
                      <option value="Ouest">OUEST</option>
                      <option value="National">NATIONAL (CEMAC)</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/40 pl-0.5">Adresse de veille (email)</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/30 group-focus-within:text-[#25D366] transition-colors" />
                      <Input 
                        placeholder="exemple@pme.cm" 
                        className="h-12 bg-background border-border dark:border-border/10 rounded pl-11 text-foreground font-semibold text-xs focus-visible:ring-1 focus-visible:ring-[#25D366]/30 shadow-sm dark:shadow-none transition-all"
                        value={formData.email}
                        onChange={(e) => hangleChange("email", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-[#25D366]/5 border border-[#25D366]/10 rounded shadow-sm shadow-[#25D366]/5 transition-all">
                    <div className="flex gap-3">
                       <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                       <div className="space-y-2">
                          <p className="text-[10px] font-semibold text-foreground tracking-tight">Vérification instantanée</p>
                          <p className="text-[9px] text-muted-foreground/60 leading-relaxed tracking-tighter">
                            En appuyant sur démarrer, vous acceptez nos CGU PME et lancez la veille AONO sur votre profil.
                          </p>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex gap-3">
                {step > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={handlePrev}
                    className="h-12 px-6 border-border dark:border-border/10 rounded bg-background/50 text-muted-foreground/40 hover:text-foreground"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                )}
                <Button 
                  onClick={step < 3 ? handleNext : handleRegister}
                  className="flex-1 h-12 bg-[#25D366] text-white dark:text-black font-semibold text-[10px] rounded hover:bg-[#25D366]/90 transition-all tracking-[0.2em] shadow-lg shadow-[#25D366]/10 dark:shadow-none"
                  disabled={isSubmitting || (step === 1 && (!formData.nom || !formData.telephone)) || (step === 2 && (!formData.secteur || !formData.region))}
                >
                  {isSubmitting ? "Initialisation..." : step < 3 ? "Continuer" : "Lancer SABI"}
                  {step < 3 && !isSubmitting && <ArrowRight className="ml-2 w-3 h-3" />}
                </Button>
              </div>

              <div className="mt-8 flex justify-center divide-x divide-border dark:divide-border/10 md:hidden">
                 <Link href="/login" className="px-4 text-[9px] font-semibold text-muted-foreground/40 tracking-widest hover:text-[#25D366]">Se connecter</Link>
                 <Link href="/" className="px-4 text-[9px] font-semibold text-muted-foreground/40 tracking-widest hover:text-foreground">Landing</Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
