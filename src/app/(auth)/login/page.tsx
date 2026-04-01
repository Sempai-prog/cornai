"use client"

import * as React from "react"
import Link from "next/link"
import { Smartphone, ArrowRight, MessageCircle, ShieldCheck, ArrowLeft, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginWithPhone } from "../auth-actions"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const res = await loginWithPhone(phoneNumber)
      if (res.success) {
        window.location.href = "/dashboard"
      } else {
        toast.error(res.error || "Erreur de connexion")
        setIsLoading(false)
      }
    } catch (error) {
      toast.error("Problème technique.")
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-col md:flex-row bg-card/60 dark:bg-[#0c0c0c]/80 border border-border dark:border-white/5 shadow-2xl backdrop-blur-xl overflow-hidden rounded min-h-[500px] transition-colors duration-500">
      {/* 1. PANNEAU DE GAUCHE : BRANDING / INFO */}
      <div className="hidden md:flex flex-col justify-between p-12 md:w-[400px] border-r border-border dark:border-white/5 bg-gradient-to-b from-foreground/[0.02] to-transparent">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-16 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 bg-[#25D366] flex items-center justify-center rounded">
              <ShieldCheck className="w-4 h-4 text-white dark:text-black" />
            </div>
            <span className="text-foreground font-black tracking-[0.2em] text-xs">CORNAi</span>
          </Link>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground tracking-tighter leading-none">
              Veille stratégique sur les marchés publics.
            </h2>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-[280px]">
              Optimisez vos soumissions avec l&apos;assistance IA dédiée aux PME du Cameroun.
            </p>
            
            <ul className="space-y-3 pt-6">
              {["Alertes AONO en temps réel", "Analyse de conformité PME", "Assistance WhatsApp dédiée"].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-[10px] text-muted-foreground font-black tracking-widest">
                  <div className="w-4 h-4 rounded-full bg-[#25D366]/10 dark:bg-[#25D366]/15 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-[#25D366]" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link 
          href="/" 
          className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 tracking-[0.2em]"
        >
          <ArrowLeft className="w-3 h-3" />
          RETOUR AU SITE
        </Link>
      </div>

      {/* 2. PANNEAU DE DROITE : FORMULAIRE */}
      <div className="flex-1 p-8 md:p-14 flex flex-col justify-center bg-background/20 dark:bg-[#080808]/40 transition-colors duration-500">
        <div className="max-w-[320px] mx-auto w-full">
          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center mb-8">
            <div className="w-10 h-10 bg-[#25D366] flex items-center justify-center rounded">
              <ShieldCheck className="w-6 h-6 text-white dark:text-black" />
            </div>
          </div>

          <div className="mb-8 text-center md:text-left">
            <h1 className="text-xl font-bold text-foreground tracking-tight mb-2">Connexion</h1>
            <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
              Entrez votre numéro WhatsApp pour accéder à votre espace CORNAi.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative group">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/30 group-focus-within:text-[#25D366] transition-colors" />
                <Input 
                  placeholder="699 99 99 99" 
                  className="h-12 bg-background border-border dark:border-white/5 rounded pl-11 text-foreground font-bold text-xs focus-visible:ring-1 focus-visible:ring-[#25D366]/30 transition-all shadow-sm dark:shadow-none"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-[#25D366] text-white dark:text-black font-extrabold text-[10px] rounded hover:bg-[#25D366]/90 transition-all active:scale-95 tracking-[0.2em] shadow-lg shadow-[#25D366]/10 dark:shadow-none"
              disabled={isLoading || !phoneNumber}
            >
              {isLoading ? "Vérification..." : "Continuer sur WhatsApp"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border dark:border-white/5" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#fbfcff] dark:bg-[#0c0c0c] px-4 text-[9px] font-black text-muted-foreground/20 tracking-[0.3em] transition-colors duration-500">OU</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full h-12 bg-background/50 border-border dark:border-white/5 rounded text-foreground font-bold text-[10px] hover:bg-muted/30 transition-all tracking-[0.2em]"
          >
            <MessageCircle className="mr-3 h-4 w-4 text-[#25D366] fill-[#25D366]/10" />
            Lien direct rapide
          </Button>

          <p className="mt-8 text-center text-[10px] text-muted-foreground/40 font-bold tracking-widest">
            Nouvelle PME ? {' '}
            <Link href="/register" className="text-[#25D366] hover:underline underline-offset-4 ml-1">
              Créer un profil
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
