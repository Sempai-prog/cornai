"use client";

import React, { useState } from "react";
import { 
  Mic, 
  FileText, 
  Clock, 
  Play, 
  Wand2, 
  ChevronRight, 
  ChevronDown, 
  ListMusic, 
  Zap,
  Plus
} from "lucide-react";
import { AudioSource, ChapterId } from "../../lib/terrain-types";
import { cn } from "@/lib/utils";
import { AlertPanel } from "../shared/alert-panel";
import { StatusBadge } from "../shared/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import { TranscripteurAudio } from "@/components/terrain/transcripteur-audio";

const CHAPTERS = [
  { id: "conception", title: "Chapitre 1 : Conception Technique", tag: "OBLIGATOIRE", tagType: "required" },
  { id: "plan_travail", title: "Chapitre 2 : Plan de Travail & Méthodologie", tag: "CRITÈRE DE NOTATION", tagType: "scoring" },
  { id: "organisation", title: "Chapitre 3 : Organisation de l'Implantation", tag: "ANNEXE 8.2", tagType: "annexe" },
];

interface ModuleTranscripteurProps {
  aoNom?: string;
  dtaoReference?: string;
  audios?: AudioSource[];
  soumissionId?: string;
}

/**
 * 🎨 MODULE : TRANSRIPTEUR CCTP — Wired to DB (contextual)
 * Focus : Conversion des notes vocales terrain en chapitres du Mémoire Technique.
 */
export function ModuleTranscripteur({ aoNom, dtaoReference, audios = [], soumissionId }: ModuleTranscripteurProps) {
  const [expandedChapter, setExpandedChapter] = useState<string | null>("conception");
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);

  if (audios.length === 0 && !aoNom) {
    return (
       <EmptyState 
         icon={Mic}
         titre="Transcripteur Prêt"
         description="Commencez par enregistrer une note vocale ou activez l'IA pour générer le contenu de votre mémoire technique."
       />
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start pb-8">
      {/* 🎙️ SIDEBAR : SOURCES AUDIOS */}
      <aside className="p-5 bg-card border border-border rounded-[4px] h-fit sticky top-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ListMusic className="w-4 h-4 text-primary" />
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground">
              Sources Audios
            </h3>
          </div>
          <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-[2px] tabular-nums">
            {audios.length} FILES
          </span>
        </div>

        <div className="space-y-3 max-h-[65vh] overflow-y-auto scrollbar-thin pr-2">
          {audios.map((audio) => (
            <button
              key={audio.id}
              onClick={() => setSelectedAudio(audio.id)}
              className={cn(
                "w-full text-left p-4 rounded-[4px] border transition-all duration-200 group relative overflow-hidden",
                selectedAudio === audio.id 
                  ? "bg-primary/[0.05] border-primary/30" 
                  : "bg-card border-border/10 hover:border-border hover:bg-muted/10"
              )}
            >
              {selectedAudio === audio.id && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
              )}
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                  {audio.sender}
                </span>
                <span className="text-[10px] text-muted-foreground/40 tabular-nums">
                  {audio.timestamp}
                </span>
              </div>
              
              <p className="text-xs text-foreground/80 line-clamp-2 mb-3 leading-relaxed font-medium">
                "{audio.transcription}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Play className={cn("w-3 h-3", selectedAudio === audio.id ? "text-primary" : "text-muted-foreground opacity-50")} />
                  <span className="text-[10px] font-bold text-muted-foreground/60 tabular-nums">
                    {audio.duration}
                  </span>
                </div>
                {audio.assignedToChapter && (
                  <div className="flex items-center gap-1 text-primary">
                    <Zap className="w-3 h-3 fill-primary/20" />
                    <span className="text-[9px] font-bold uppercase tracking-tighter">Matched</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <TranscripteurAudio soumissionId={soumissionId || 'demo_soumission_id'} />
        </div>
      </aside>

      {/* 📄 MAIN : MÉMOIRE TECHNIQUE ACCORDION */}
      <div className="space-y-4">
        {CHAPTERS.map((chapter) => (
          <div 
            key={chapter.id}
            className={cn(
              "border border-border rounded-[4px] overflow-hidden transition-all duration-300",
              expandedChapter === chapter.id ? "bg-card px-2" : "bg-muted/10 border-border/5"
            )}
          >
            {/* Accordion Header */}
            <button
              onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
              className="w-full flex items-center justify-between p-5 group outline-none"
            >
              <div className="flex items-center gap-5">
                <div className={cn(
                  "w-10 h-10 rounded-[4px] flex items-center justify-center transition-colors",
                  expandedChapter === chapter.id ? "bg-primary text-black" : "bg-muted text-muted-foreground/50"
                )}>
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-left space-y-1">
                  <h4 className="text-sm font-bold text-foreground tracking-tight">
                    {chapter.title}
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-5 px-2 rounded-[2px] flex items-center justify-center text-[10px] font-black uppercase tracking-widest",
                      chapter.tagType === "required" ? "bg-red-500 text-white" : "bg-primary/10 text-primary"
                    )}>
                      {chapter.tag}
                    </div>
                    {chapter.tagType === "required" && (
                      <span className="text-[10px] font-bold text-red-500/60 uppercase tracking-tight">
                        Indispensable au DTAO
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-2 border border-border rounded-[4px] text-muted-foreground/40 group-hover:text-foreground transition-colors">
                {expandedChapter === chapter.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </button>

            {/* Accordion Content */}
            {expandedChapter === chapter.id && (
              <div className="p-5 pt-0 border-t border-border animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-muted/20 border border-border rounded-[4px] p-10 mb-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[200px]">
                  <div className="w-12 h-12 rounded-[4px] bg-muted flex items-center justify-center">
                    <Clock className="w-6 h-6 text-muted-foreground/30" />
                  </div>
                  <div className="max-w-xs">
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                      Aucun contenu généré pour ce chapitre. Glissez des sources audios ou lancez l'IA.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-5">
                  <div className="flex items-center gap-2 text-muted-foreground/40">
                    <Zap className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">SABI Engine Ready</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="h-9 px-4 border border-border rounded-[4px] text-[10px] font-bold uppercase tracking-widest hover:bg-muted transition-all text-foreground/80">
                      Édition Live
                    </button>
                    <button className="h-9 px-5 bg-primary text-black rounded-[4px] text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2">
                      <Wand2 className="w-3.5 h-3.5" />
                      Générer avec SABI AI
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* SABI Alert Hint */}
        <AlertPanel 
          type="info"
          title="Mode Terrain Connecté"
          message="Utilisez l'application mobile SABI pour enregistrer vos commentaires sur site. Ils apparaîtront ici instantanément avec synchronisation DTAO."
        />
      </div>
    </div>
  );
}
