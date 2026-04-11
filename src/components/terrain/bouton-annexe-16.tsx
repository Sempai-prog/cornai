// ══════════════════════════════════════════
// SABI — Générateur Annexe 16 (Sprint E.2)
// ══════════════════════════════════════════

'use client'

import * as React from "react"
import { jsPDF } from "jspdf"
import { Button } from "@/components/ui/button"
import { FileText, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface BoutonAnnexe16Props {
  soumissionId: string
  disabled?: boolean
  visiteData?: any
}

export function BoutonAnnexe16({ soumissionId, disabled, visiteData }: BoutonAnnexe16Props) {
  const [isGenerating, setIsGenerating] = React.useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)
    try {
      const doc = new jsPDF()
      
      // DESIGN BRUTALISTE PDF
      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.text("REPUBLIQUE DU CAMEROUN", 105, 15, { align: "center" })
      doc.text("MINISTÈRE DES MARCHÉS PUBLICS", 105, 20, { align: "center" })
      doc.text("----------------", 105, 25, { align: "center" })
      
      doc.setFontSize(14)
      doc.text("ANNEXE 16 : MODÈLE D'ATTESTATION DE VISITE DE SITE", 105, 45, { align: "center" })
      
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text(`ID Soumission: ${soumissionId.toUpperCase()}`, 20, 60)
      doc.text(`Date de Visite: ${visiteData?.dateVisite || "N/A"}`, 20, 70)
      doc.text(`Lieu: ${visiteData?.visiteLieu || "SUR SITE"}`, 20, 80)
      doc.text(`Représentant MO: ${visiteData?.maitreOuvrageRelais || "...................................."}`, 20, 90)
      
      doc.setFont("helvetica", "bold")
      doc.text("DÉCLARATION DU SOUMISSIONNAIRE :", 20, 110)
      doc.setFont("helvetica", "normal")
      const text = `Je soussigné, certifie avoir procédé à une visite approfondie du site des travaux et avoir pris pleine connaissance des réalités du terrain, des contraintes d'accès et de toutes les spécificités locales de nature à influencer l'exécution du marché.`
      doc.text(doc.splitTextToSize(text, 170), 20, 120)

      doc.text("Observations :", 20, 150)
      doc.text(doc.splitTextToSize(visiteData?.observations || "........................................................................................................................................................................................................................", 170), 20, 160)
      
      doc.text("Signé le : ................................", 20, 220)
      doc.text("Cachet et signature :", 150, 220, { align: "center" })
      
      doc.setDrawColor(0, 0, 0)
      doc.rect(140, 225, 40, 40) // Cadre signature
      
      doc.save(`Annexe16_VisiteSite_${soumissionId.slice(0, 8)}.pdf`)
      toast.success("Annexe 16 générée avec succès")
    } catch (e) {
      console.error(e)
      toast.error("Échec de la génération")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={generatePDF}
      disabled={disabled || isGenerating}
      className="rounded-[4px] text-[10px] font-semibold uppercase tracking-widest gap-2 bg-emerald-500/5 border-emerald-500/10 hover:bg-emerald-500/10 hover:border-emerald-500/20 text-emerald-600 transition-all shadow-none"
    >
      {isGenerating ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <FileText className="w-3.5 h-3.5" />
      )}
      Générer Annexe 16
    </Button>
  )
}
