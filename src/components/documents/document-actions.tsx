"use client"

import * as React from "react"
import { LucideDownload, FileUp, MoreVertical, Eye, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function GeneratePDFButton() {
  return (
    <Button 
      className="w-full py-6 bg-foreground text-background text-[10px] font-semibold uppercase tracking-[0.2em] rounded-[4px] hover:opacity-90 transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
      onClick={() => {
        toast.promise(
          new Promise((resolve) => setTimeout(resolve, 2000)),
          {
            loading: 'Génération du certificat de conformité...',
            success: 'Certificat de Conformité Généré (Simulation)',
            error: 'Erreur lors de la génération',
          }
        )
      }}
    >
      <div className="flex items-center gap-2">
        GÉNÉRER ATTESTATION
        <span className="text-[7.5px] font-semibold px-1.5 py-0.5 rounded-[2px] bg-primary text-background tracking-widest uppercase">
          ALPHA
        </span>
      </div>
      <LucideDownload className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
    </Button>
  )
}

export function UploadZone() {
  return (
    <div 
      className="border border-dashed border-border/10 rounded-[4px] p-8 flex flex-col items-center justify-center gap-4 bg-card hover:bg-card/80 hover:border-primary/40 transition-all cursor-pointer group relative overflow-hidden"
      onClick={() => {
        toast.success("Module Scan AI Activé", {
          description: "Prêt pour l'extraction automatique des dates et montants."
        })
      }}
    >
      <div className="w-12 h-12 rounded-[4px] bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
        <FileUp className="w-6 h-6 text-primary" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-foreground/80 tracking-tight uppercase">Déposez une nouvelle pièce administrative</p>
        <p className="text-[11px] text-muted-foreground/40 mt-1 font-medium italic">SABI scanne et extrait automatiquement les dates d'expiration via Scan AI</p>
      </div>
      <div className="flex gap-2">
        <span className="text-[9px] font-semibold px-2 py-0.5 bg-muted/10 rounded-[2px] text-muted-foreground/30 border border-border/10 tracking-widest">PDF</span>
        <span className="text-[9px] font-semibold px-2 py-0.5 bg-muted/10 rounded-[2px] text-muted-foreground/30 border border-border/10 tracking-widest">MAX 10MB</span>
      </div>
    </div>
  )
}

export function ItemActions() {
  return (
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button 
        className="p-1.5 rounded-[4px] hover:bg-foreground/5 text-muted-foreground/40 hover:text-foreground transition-colors"
        onClick={() => toast.info("Visualisation sécurisée (Bientôt disponible)")}
      >
        <Eye className="w-4 h-4" />
      </button>
      <button 
        className="p-1.5 rounded-[4px] hover:bg-foreground/5 text-muted-foreground/40 hover:text-foreground transition-colors"
        onClick={() => toast.success("Mise à jour activée")}
      >
        <Upload className="w-4 h-4" />
      </button>
    </div>
  )
}
