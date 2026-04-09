'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Loader2, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface BoutonAnnexe16Props {
  soumissionId: string
  disabled?: boolean
}

export function BoutonAnnexe16({ soumissionId, disabled }: BoutonAnnexe16Props) {
  const [statut, setStatut] = useState<'idle' | 'generating' | 'done'>('idle')
  
  const handleTelecharger = async () => {
    setStatut('generating')
    
    try {
      const response = await fetch(
        `/api/documents/annexe-16?soumissionId=${soumissionId}`
      )
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.erreur || 'Erreur inconnue')
      }
      
      // Déclencher le téléchargement navigateur
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      // Le nom est géré par le header Content-Disposition mais on peut forcer ici
      a.download = `Annexe-16-${soumissionId}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      setStatut('done')
      toast.success('Annexe 16 générée avec succès', {
        description: 'Le fichier PDF a été téléchargé.'
      })
      
      // Reset après 3 secondes
      setTimeout(() => setStatut('idle'), 3000)
      
    } catch (erreur) {
      setStatut('idle')
      toast.error('Échec de la génération', {
        description: erreur instanceof Error ? erreur.message : 'Veuillez réessayer.'
      })
    }
  }
  
  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-[4px] h-8 text-[11px] font-bold uppercase tracking-wider gap-2 bg-background border-border/10 hover:border-primary/20 hover:bg-primary/5 transition-all shadow-none"
      onClick={handleTelecharger}
      disabled={disabled || statut === 'generating'}
    >
      {statut === 'idle' && <Download className="w-3.5 h-3.5" />}
      {statut === 'generating' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
      {statut === 'done' && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
      
      {statut === 'idle' && 'Générer Annexe 16'}
      {statut === 'generating' && 'Génération...'}
      {statut === 'done' && 'Terminé'}
    </Button>
  )
}
