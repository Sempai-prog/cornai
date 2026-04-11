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
import { AudioSource } from "../../lib/terrain-types";
import { cn } from "@/lib/utils";
import { StatusBadge } from "../shared/status-badge";
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
 * 🎨 MODULE : TRANSRIPTEUR CCTP — Bento Refactor (SABI V1.6)
 * Focus : Extraction IA des spécifications techniques depuis l'audio terrain.
 * Layout : Grid 12 (Col 1-8: Canvas & Chapters, Col 9-12: Legal Analysis).
 */
export function ModuleTranscripteur({ audios = [], soumissionId }: ModuleTranscripteurProps) {
  const [expandedChapter, setExpandedChapter] = useState<string | null>("conception");
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);

  if (audios.length === 0) {
    return (
       <div className="flex flex-col items-center justify-center p-12 bg-card border border-border/50 border-dashed rounded-[4px]">
         <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-4">
           <Mic className="w-8 h-8 text-primary/50" />
         </div>
         <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-widest">Studio Vide</h3>
         <p className="text-xs text-muted-foreground text-center max-w-md mx-auto mb-6">
           Zéro note vocale capturée. Le Mémoire Technique requiert des preuves d'études de terrain.
         </p>
         <TranscripteurAudio soumissionId={soumissionId || 'demo'} />
       </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6 pb-8 items-start">
      
      {/* 🤖 TOP BAR : AUDIT DE QUALITÉ IA (12 COLS) */}
      <div className="col-span-12 p-4 bg-primary/[0.03] border border-primary/10 rounded-[4px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Wand2 className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-foreground">Audit de Cohérence CCTP</h4>
            <p className="text-[10px] text-muted-foreground font-medium">L'IA a identifié 85% des mots-clés obligatoires du DAO dans vos notes vocales.</p>
          </div>
        </div>
        <StatusBadge status="complete" />
      </div>

      {/* 🖋️ COL 1-8 : CANVAS DE TRANSCRIPTION & CHAPITRES */}
      <div className="col-span-12 lg:col-span-8 space-y-4">
        
        {/* Source Audio Selection (Dense) */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {audios.map(audio => (
            <button 
              key={audio.id}
              onClick={() => setSelectedAudio(audio.id)}
              className={cn(
                "shrink-0 px-4 py-2 border rounded-[4px] flex items-center gap-3 transition-all",
                selectedAudio === audio.id ? "border-primary bg-primary/5" : "border-border/10 bg-card hover:border-border/40"
              )}
            >
              <div className={cn("w-2 h-2 rounded-full", selectedAudio === audio.id ? "bg-primary animate-pulse" : "bg-muted-foreground/30")} />
              <div className="text-left">
                <p className="text-[9px] font-semibold text-foreground uppercase tracking-tighter">{audio.timestamp}</p>
                <p className="text-[10px] text-muted-foreground font-medium">{audio.duration}</p>
              </div>
            </button>
          ))}
          <button className="shrink-0 w-10 h-10 border border-dashed border-border/20 rounded-[4px] flex items-center justify-center hover:bg-muted/50 transition-all">
            <Plus className="w-4 h-4 text-muted-foreground/40" />
          </button>
        </div>

        {/* Chapters Cards (Asymmetrical Bento) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CHAPTERS.map((chapter) => (
            <div 
              key={chapter.id}
              onClick={() => setExpandedChapter(chapter.id)}
              className={cn(
                "p-5 rounded-[4px] border cursor-pointer transition-all duration-300 group relative",
                expandedChapter === chapter.id 
                  ? "bg-card border-primary/20 ring-1 ring-primary/10" 
                  : "bg-muted/5 border-border/5 hover:border-border/20"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "w-8 h-8 rounded-[4px] flex items-center justify-center",
                  expandedChapter === chapter.id ? "bg-primary text-black" : "bg-muted text-muted-foreground/40"
                )}>
                  <FileText className="w-4 h-4" />
                </div>
                <div className={cn(
                  "px-2 py-0.5 rounded-[2px] text-[8px] font-semibold uppercase tracking-widest",
                  chapter.tagType === "required" ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"
                )}>
                  {chapter.tag}
                </div>
              </div>
              
              <h4 className="text-[11px] font-semibold text-foreground uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                {chapter.title}
              </h4>
              
              <p className="text-[10px] text-muted-foreground leading-relaxed font-medium mb-4">
                {expandedChapter === chapter.id 
                  ? "Contenu en cours de structuration par SABI AI. Plus de 3 segments audios détectés pour ce chapitre."
                  : "Aucun segment audio n'est encore lié à cette section technique."}
              </p>

              {expandedChapter === chapter.id && (
                <div className="flex items-center justify-between pt-4 border-t border-border/5">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-primary" />
                    <span className="text-[9px] font-semibold text-primary uppercase">Draft Ready</span>
                  </div>
                  <button className="text-[9px] font-semibold text-foreground/40 uppercase hover:text-primary tracking-widest">Ouvrir Éditeur</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 🧐 COL 9-12 : ANALYSEUR DE MOTS-CLÉS LÉGAUX (STICKY) */}
      <aside className="col-span-12 lg:col-span-4 sticky top-6 space-y-4">
        <div className="bg-card border border-border/10 rounded-[4px] p-5">
          <div className="flex items-center gap-2 mb-6 border-b border-border/5 pb-4">
            <Zap className="w-4 h-4 text-primary" />
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground">
              Extracteur Légal IA
            </h4>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-widest">Spécificités CCTP Détectées</span>
              <div className="flex flex-wrap gap-2">
                {['Norme NF-P', 'Dosage 350kg/m3', 'Bétons B25', 'Acier HA12'].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-primary/5 border border-primary/20 rounded-[2px] text-[9px] font-semibold text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-muted/5 border border-border/5 rounded-[4px] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase">Taux de couverture</span>
                <span className="text-xs font-semibold text-primary">85%</span>
              </div>
              <div className="h-1.5 bg-muted/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[85%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-500/5 border-l-2 border-red-500 p-4 rounded-[4px]">
          <h5 className="text-[10px] font-semibold text-red-500 uppercase tracking-widest mb-1">Mots-clés Manquants</h5>
          <p className="text-[10px] text-foreground/70 leading-relaxed font-medium">
            Attention : Les mentions "Vibration mécanique" et "Cure de béton" sont absentes de vos notes. Éléments critiques du DTAO Section III.
          </p>
        </div>
      </aside>

    </div>
  );
}
