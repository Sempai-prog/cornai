"use client";

import React from "react";
import { 
  MapPin, 
  Camera, 
  FileCheck, 
  Smartphone, 
  Share2, 
  Navigation, 
  MessageCircle, 
  AlertCircle, 
  PlusCircle,
  Clock,
  Globe
} from "lucide-react";
import { MOCK_AUDIOS } from "../../lib/terrain-mock-data";
import { cn } from "@/lib/utils";
import { AlertPanel } from "../shared/alert-panel";

/**
 * 📍 MODULE : DESCENTE (VISITE DE SITE)
 * Focus : Récupération des preuves de visite, coordonnées GPS et photos terrain.
 */
export function ModuleDescente() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 h-full pb-8">
      {/* 🧭 LEFT : VISIT SUMMARY & GPS DATA */}
      <div className="space-y-6">
        <aside className="p-6 bg-card border border-border rounded-[4px] space-y-6 relative overflow-hidden">
          {/* Subtle Background Icon */}
          <Globe className="absolute -bottom-6 -right-6 w-32 h-32 text-foreground opacity-[0.02] pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-[4px] bg-amber-500/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                Détails Descente
              </h3>
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-tight">
                Visite Obligatoire CCTP
              </p>
            </div>
          </div>

          <div className="space-y-5 pt-6 border-t border-border relative z-10">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Date & Heure</span>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-muted-foreground opacity-30" />
                <p className="text-sm font-bold text-foreground tabular-nums">28 Mars 2024 • 14:30</p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Coordonnées GPS</span>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="p-1 px-1.5 rounded-[2px] bg-muted border border-border group-hover:border-primary/30 transition-colors">
                   <Navigation className="w-3.5 h-3.5 text-primary" />
                </div>
                <p className="text-sm font-bold text-foreground tabular-nums underline decoration-primary/20 underline-offset-4 group-hover:decoration-primary transition-all">
                  3.8480° N, 11.5021° E
                </p>
              </div>
              <p className="text-[9px] text-muted-foreground/60 italic font-medium uppercase tracking-tight mt-1">
                Précision : 5m (Yaoundé, PK 0+000)
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Maître d'Ouvrage Relais</span>
              <p className="text-sm font-bold text-foreground uppercase tracking-tight">
                MINMAP / Délégué Régional Centre
              </p>
            </div>
          </div>

          <button className="w-full mt-6 h-12 flex items-center justify-center gap-3 bg-primary text-black font-bold rounded-[4px] text-[10px] uppercase tracking-widest transition-all hover:opacity-90 relative z-10">
            <FileCheck className="w-4 h-4" />
            Générer l'Annexe 16 (Certificat)
          </button>
        </aside>

        {/* 📱 WHATSAPP BRIDGE TILE */}
        <div className="p-5 bg-muted/10 border border-primary/20 border-dashed rounded-[4px] group hover:bg-muted/20 transition-all cursor-default relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-1.5 bg-primary/10 rounded-full">
               <MessageCircle className="w-4 h-4 text-primary" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">SABI Mobile Bridge</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
            Vos notes vocales et photos envoyées au bot WhatsApp SABI sont automatiquement synchronisées ici via API.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Live Sync Active</span>
          </div>
        </div>
      </div>

      {/* 🖼️ RIGHT : PHOTO GALLERY & OBSERVATIONS */}
      <div className="space-y-6">
        {/* PHOTO GRID TABLEAU */}
        <div className="bg-card border border-border rounded-[4px] p-6 shadow-none">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[4px] bg-muted flex items-center justify-center">
                <Camera className="w-4 h-4 text-muted-foreground/60" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                Preuves de Visite (Site)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em]">
              4 PHOTOS CAPTURÉES
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] bg-muted/20 rounded-[4px] border border-border relative group cursor-zoom-in overflow-hidden transition-all hover:ring-1 hover:ring-primary/40">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                  <Camera className="w-10 h-10" />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <p className="text-[8px] font-bold text-white uppercase tracking-tighter truncate">
                    Photo_PK_12_{i}.jpg
                  </p>
                  <p className="text-[7px] text-white/60 font-medium uppercase tracking-widest mt-1">
                    1.2 MB • GPS TAGGED
                  </p>
                </div>
              </div>
            ))}
            <button className="aspect-[4/5] border border-dashed border-border rounded-[4px] flex flex-col items-center justify-center gap-3 hover:bg-muted/30 hover:border-primary/30 transition-all text-muted-foreground group">
              <div className="w-8 h-8 rounded-[4px] bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <PlusCircle className="w-5 h-5 opacity-40 group-hover:text-primary group-hover:opacity-100" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-primary">
                Add Photo
              </span>
            </button>
          </div>
        </div>

        {/* 📋 OBSERVATIONS TRANSCRIPTION BLOCK */}
        <div className="bg-card border border-border rounded-[4px] p-6 space-y-6">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[4px] bg-muted flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-muted-foreground/60" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                Observations Terrain
              </h3>
           </div>
           
           <div className="bg-background/40 border border-border p-6 rounded-[4px] relative group border-l-2 border-l-primary/30">
              <div className="absolute top-4 right-4 p-2 opacity-10 group-hover:opacity-60 transition-opacity cursor-pointer">
                <Share2 className="w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-foreground leading-relaxed pr-8">
                "PK 5+200 : Présence d'un pont de secours en bois en mauvais état. Prévoir une déviation lourde par le village Mbankomo. Les sols semblent latéritiques sur les 3 premiers kilomètres."
              </p>
           </div>
           
           <AlertPanel 
             type="warning"
             title="Point d'Audit Critique"
             message="Analyse de risque requise pour la déviation PK 5+200. Impact potentiel sur le Bordereau des Prix Unitaires (BPU) estimé à +12% sur ce lot."
           />
        </div>
      </div>
    </div>
  );
}
