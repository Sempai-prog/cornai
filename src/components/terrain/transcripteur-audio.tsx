'use client'

import { useState, useRef } from 'react'
import { transcrireAudio } from '@/app/actions/transcripteur'
import { Upload, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

type StatutTranscription = 'idle' | 'processing' | 'complete' | 'error'

export function TranscripteurAudio({ soumissionId }: { soumissionId: string }) {
  const [statut, setStatut] = useState<StatutTranscription>('idle')
  const [transcription, setTranscription] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleFichierAudio = async (fichier: File) => {
    // Vérification taille (max 10MB pour l'API Gemini locale)
    if (fichier.size > 10 * 1024 * 1024) {
      toast.error('Fichier trop volumineux', {
        description: 'Maximum 10 Mo pour la transcription.'
      })
      return
    }
    
    setStatut('processing')
    
    // Convertir en Base64
    const reader = new FileReader()
    reader.readAsDataURL(fichier)
    
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1]
      
      const formData = new FormData()
      formData.append('audio', base64)
      formData.append('mimeType', fichier.type)
      formData.append('soumissionId', soumissionId)
      
      const resultat = await transcrireAudio(formData)
      
      if (resultat.succes && resultat.transcription) {
        setTranscription(resultat.transcription)
        setStatut('complete')
        toast.success('Transcription réussie', {
          description: 'Le rapport de visite a été généré.'
        })
      } else {
        setStatut('error')
        toast.error('Échec de la transcription', {
          description: resultat.erreur || 'Erreur inconnue'
        })
      }
    }
  }
  
  return (
    <div className="space-y-3">
      {/* Zone de drop */}
      <div 
        className="border border-dashed border-border/50 bg-muted/10 rounded-[4px] p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/20 transition-all"
        onClick={() => {
          if (statut !== 'processing') {
            inputRef.current?.click()
          }
        }}
      >
        <input 
          ref={inputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={e => e.target.files?.[0] && handleFichierAudio(e.target.files[0])}
        />
        
        {statut === 'idle' && (
          <>
            <Upload className="w-8 h-8 text-primary/40 mx-auto mb-3" />
            <h4 className="text-[11px] font-bold text-foreground uppercase tracking-widest mb-1.5">
              Uploader une note audio
            </h4>
            <p className="text-[10px] text-muted-foreground/80 max-w-[200px] mx-auto leading-relaxed">
              Glissez-déposez ou cliquez ici pour sélectionner un fichier audio de la visite (MP3, WAV, M4A).
            </p>
          </>
        )}
        
        {statut === 'processing' && (
          <div className="py-2">
            <Loader2 className="w-8 h-8 text-primary mx-auto mb-3 animate-spin" />
            <h4 className="text-[11px] font-bold text-foreground uppercase tracking-widest mb-1">
              Transcription Gemini en cours...
            </h4>
            <p className="text-[10px] text-muted-foreground/80 tabular-nums">
              Analyse et structuration du rapport DTAO.
            </p>
          </div>
        )}
        
        {statut === 'complete' && (
          <div className="py-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-emerald-500 font-black">✓</span>
            </div>
            <h4 className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest mb-1">
              Transcription complétée
            </h4>
            <p className="text-[10px] text-muted-foreground/80">
              Cliquez pour analyser un autre fichier.
            </p>
          </div>
        )}

        {statut === 'error' && (
          <div className="py-2">
            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-red-500 font-black">X</span>
            </div>
            <h4 className="text-[11px] font-bold text-red-500 uppercase tracking-widest mb-1">
              Échec de l'IA
            </h4>
            <p className="text-[10px] text-red-500/80">
              Cliquez pour réessayer.
            </p>
          </div>
        )}
      </div>
      
      {/* Résultat de transcription */}
      {transcription && (
        <div className="bg-primary/5 rounded-[4px] border border-primary/20 p-5 mt-4">
          <div className="flex items-center justify-between border-b border-primary/10 pb-3 mb-4">
            <h3 className="text-[10px] font-black text-primary uppercase tracking-widest">
              Rapport de Visite Synthétisé (IA)
            </h3>
          </div>
          <div 
            className="text-[11px] text-foreground/80 leading-relaxed space-y-4 max-w-none"
            dangerouslySetInnerHTML={{ __html: transcription.replace(/\n\n/g, '<br/><br/>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary tracking-tight uppercase">$1</strong>') }}
          />
        </div>
      )}
    </div>
  )
}
