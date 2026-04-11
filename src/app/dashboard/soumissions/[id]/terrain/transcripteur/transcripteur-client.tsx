// ══════════════════════════════════════════
// SABI — Le Transcripteur IA (Sprint E.1)
// ══════════════════════════════════════════

'use client'

import * as React from "react"
import { Mic, Upload, FileAudio, Trash2, Send, Wand2, Play, Pause, Loader2 } from "lucide-react"
import { uploadAudioNoteR2, deleteAudioNote } from "@/app/actions/transcripteur"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface TranscripteurClientProps {
  soumissionId: string
  initialNotes: any[]
}

export function TranscripteurClient({
  soumissionId,
  initialNotes
}: TranscripteurClientProps) {
  const [notes, setNotes] = React.useState(initialNotes)
  const [isRecording, setIsRecording] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)
  const [mediaRecorder, setMediaRecorder] = React.useState<MediaRecorder | null>(null)
  const [audioChunks, setAudioChunks] = React.useState<Blob[]>([])

  // Gestion de l'upload de fichier existant
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('audio', file)

    const res = await uploadAudioNoteR2(soumissionId, formData)
    
    if (res.success) {
      toast.success("Note audio transcrite avec succès")
      // On re-fetch ou on ajoute manuellement (le revalidatePath du serveur fera le travail au refresh)
      window.location.reload() 
    } else {
      toast.error(res.error || "Erreur lors de la transcription")
    }
    setIsUploading(false)
  }

  // Suppression d'une note
  const handleDelete = async (noteId: string) => {
    const res = await deleteAudioNote(noteId, soumissionId)
    if (res.success) {
      setNotes(prev => prev.filter(n => n.id !== noteId))
      toast.success("Note supprimée")
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* ZONE D'ACTION PRINCIPALE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* RECORDER (MOCK FOR NOW OR REAL IF TESTED) */}
        <div className="p-8 rounded-[4px] border border-primary/20 bg-primary/5 flex flex-col items-center justify-center text-center space-y-4">
          <div className={cn(
            "size-16 rounded-full flex items-center justify-center transition-all duration-300",
            isRecording ? "bg-red-500 animate-pulse scale-110" : "bg-primary/20"
          )}>
            <Mic className={cn("w-8 h-8", isRecording ? "text-white" : "text-primary")} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest">Enregistrement Vocal</h3>
            <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-tighter mt-1">
              Prenez des notes directement depuis le garage
            </p>
          </div>
          <button 
            disabled={true} // À activer après tests cross-browser
            className="h-10 px-6 rounded-[2px] bg-foreground text-background text-[10px] font-semibold uppercase tracking-widest opacity-50 cursor-not-allowed"
          >
             Bientôt disponible
          </button>
        </div>

        {/* UPLOAD MANUEL */}
        <label className={cn(
          "p-8 rounded-[4px] border border-dashed border-border/20 bg-card hover:bg-muted/30 cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-4",
          isUploading && "opacity-50 pointer-events-none"
        )}>
          <input 
            type="file" 
            accept="audio/*" 
            className="hidden" 
            onChange={handleFileUpload} 
          />
          <div className="size-16 rounded-full bg-muted flex items-center justify-center">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest">Importer un fichier</h3>
            <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-tighter mt-1">
              Formats supportés : .mp3, .m4a, .wav (Max 10Mo)
            </p>
          </div>
          <span className="h-10 px-6 rounded-[2px] border border-border/10 flex items-center text-[10px] font-semibold uppercase tracking-widest">
            {isUploading ? "Transcription..." : "Choisir un fichier"}
          </span>
        </label>

      </div>

      {/* LISTE DES TRANSCRIPTIONS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/10 pb-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em]">Notes audio de terrain</h2>
          <span className="text-[10px] font-semibold text-muted-foreground/30 uppercase">{notes.length} enregistrements</span>
        </div>

        <div className="grid gap-4">
          {notes.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-border/10 rounded-[4px]">
               <FileAudio className="size-8 text-muted-foreground/20 mx-auto mb-4" />
               <p className="text-[10px] font-semibold text-muted-foreground/30 uppercase tracking-widest">Aucune note pour le moment</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="group bg-card border border-border/10 rounded-[4px] overflow-hidden hover:border-primary/30 transition-all">
                <div className="p-4 flex flex-col md:flex-row gap-6">
                  {/* METADATA */}
                  <div className="md:w-48 shrink-0 space-y-3">
                    <div className="flex items-center gap-2">
                       <div className="size-8 rounded-[2px] bg-primary/10 flex items-center justify-center">
                         <Play className="size-3 text-primary fill-current" />
                       </div>
                       <div>
                         <p className="text-[10px] font-semibold text-foreground truncate max-w-[120px]">{note.nomFichier}</p>
                         <p className="text-[8px] font-semibold text-muted-foreground/40 uppercase tracking-tighter">
                            {format(new Date(note.createdAt), 'dd MMM yyyy HH:mm', { locale: fr })}
                         </p>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[9px] font-semibold text-muted-foreground/30 uppercase">
                      <span>{note.tailleMb} Mo</span>
                      <span>•</span>
                      <span className="text-emerald-500/60">{note.statut}</span>
                    </div>

                    <button 
                      onClick={() => handleDelete(note.id)}
                      className="flex items-center gap-2 text-[9px] font-semibold text-red-500/40 hover:text-red-500 uppercase tracking-widest transition-colors"
                    >
                      <Trash2 className="size-3" />
                      Supprimer
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 space-y-4">
                    <div className="bg-muted/10 p-4 rounded-[2px] border border-border/5 relative">
                       <Wand2 className="absolute top-4 right-4 size-4 text-primary/20" />
                       <p className="text-xs text-foreground/80 leading-relaxed font-medium whitespace-pre-wrap">
                          {note.transcription || "Transcription en cours..."}
                       </p>
                    </div>

                    {note.resumeAI && (
                      <div className="flex gap-2 p-3 bg-primary/5 rounded-[2px] border border-primary/10">
                        <span className="text-[9px] font-semibold text-primary uppercase tracking-widest">Auto-Résumé :</span>
                        <p className="text-[10px] text-primary/80 font-medium italic">{note.resumeAI}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  )
}
