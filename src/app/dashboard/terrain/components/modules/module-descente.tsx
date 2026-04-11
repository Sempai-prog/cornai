"use client";

import React from "react";
import { 
  Camera, 
  FileCheck, 
  Smartphone, 
  Share2, 
  MessageCircle, 
  AlertCircle, 
  PlusCircle,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DescenteData {
  id: string;
  soumissionId: string;
  entrepriseId: string | null;
  dateVisite: Date | null;
  heureVisite: string | null;
  latitude: string | null;
  longitude: string | null;
  precisionGps: string | null;
  maitreOuvrageRelais: string | null;
  observations: string | null;
  auditCritique: string | null;
  auditCritiqueImpact: string | null;
  statutVisite: string | null;
  photos?: {
    id: string;
    visiteId: string;
    urlPhoto: string | null;
    legende: string | null;
    ordre: number | null;
    tailleMb: string | null;
    gpsLatitude: string | null;
    gpsLongitude: string | null;
  }[];
}

interface ModuleDescenteProps {
  maitreOuvrage?: string;
  data?: DescenteData | null;
}

/**
 * 📍 MODULE : DESCENTE (VISITE DE SITE) — Bento Refactor (SABI V1.6)
 * Focus : Récupération des preuves de visite, coordonnées GPS et photos terrain.
 * Layout : Grid 12 (Col 1-8: Photo Canvas & Observations, Col 9-12: Certificat & GPS).
 */
export function ModuleDescente({ maitreOuvrage, data }: ModuleDescenteProps) {
  const photos = data?.photos || [];
  const displayCoords = data?.latitude && data?.longitude 
    ? `${data.latitude}° N, ${data.longitude}° E`
    : "Non capturées";

  return (
    <div className="grid grid-cols-12 gap-6 pb-8 items-start">
      
      {/* 🗺️ TOP BAR : AUDIT GÉOLOCALISATION (12 COLS) */}
      <div className="col-span-12 p-4 bg-muted/10 border border-border/10 rounded-[4px] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-[0.2em]">Précision GPS</span>
            <span className="text-sm font-semibold text-foreground tabular-nums">{data?.precisionGps || "3.2m"}</span>
          </div>
          <div className="w-px h-8 bg-border/20" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-[0.2em]">Coordonnées</span>
            <span className="text-sm font-semibold text-primary tabular-nums font-mono">{displayCoords}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="h-8 px-4 border border-border/10 rounded-[4px] text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:bg-muted transition-all flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" />
            Voir sur la Carte
          </button>
        </div>
      </div>

      {/* 📸 COL 1-8 : CANVAS DES PREUVES PHOTOS & OBSERVATIONS */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        
        {/* Photo Proof Grid */}
        <div className="bg-card border border-border/10 rounded-[4px] p-6">
          <div className="flex items-center justify-between mb-6 border-b border-border/5 pb-4">
            <div className="flex items-center gap-3">
              <Camera className="w-4 h-4 text-primary" />
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-foreground">Preuves Matérielles</h4>
            </div>
            <span className="text-[10px] font-semibold text-muted-foreground/30 uppercase tracking-widest">{photos.length} Captures</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.length > 0 ? photos.map((photo) => (
              <div key={photo.id} className="group relative aspect-[4/3] rounded-[4px] overflow-hidden border border-border/10 bg-muted/5">
                <img src={photo.urlPhoto || ""} alt={photo.legende || ""} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <p className="text-[9px] font-semibold text-white uppercase truncate">{photo.legende || "Photo Site"}</p>
                  <p className="text-[8px] text-white/60 font-medium uppercase tracking-tighter mt-1">{photo.tailleMb} MB • {photo.gpsLatitude ? 'GPS Tagged' : 'No GPS'}</p>
                </div>
              </div>
            )) : (
              <div className="col-span-full h-40 border border-dashed border-border/20 rounded-[4px] flex flex-col items-center justify-center opacity-20">
                <Camera className="w-8 h-8 mb-2" />
                <span className="text-[10px] uppercase font-semibold tracking-widest">Aucune Photo Terrain</span>
              </div>
            )}
            <button className="aspect-[4/3] border border-dashed border-border/20 rounded-[4px] flex flex-col items-center justify-center hover:bg-muted/50 transition-all group">
              <PlusCircle className="w-6 h-6 text-muted-foreground/20 group-hover:text-primary/40 transition-colors" />
              <span className="text-[9px] font-semibold text-muted-foreground/30 uppercase mt-2">Upload</span>
            </button>
          </div>
        </div>

        {/* Observations Transcription */}
        <div className="bg-card border border-border/10 rounded-[4px] p-6 relative overflow-hidden">
          <Smartphone className="absolute -top-6 -right-6 w-24 h-24 text-foreground opacity-[0.03] pointer-events-none" />
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-4 h-4 text-primary" />
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-foreground">Observations du Site</h4>
          </div>
          <div className="p-6 bg-muted/5 border-l-2 border-primary/20 rounded-[2px]">
            <p className="text-sm font-medium text-foreground/80 leading-relaxed italic">
              "{data?.observations || "Aucune observation synchronisée."}"
            </p>
          </div>
        </div>
      </div>

      {/* 📜 COL 9-12 : GÉNÉRATEUR D'ANNEXE 16 (STICKY) */}
      <aside className="col-span-12 lg:col-span-4 sticky top-6 space-y-4">
        <div className="bg-card border border-border/10 rounded-[4px] p-5">
          <div className="flex items-center gap-2 mb-6 border-b border-border/5 pb-4">
            <FileCheck className="w-4 h-4 text-primary" />
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground">
              Certificat de Visite
            </h4>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-widest">Maitre d'Ouvrage Relais</span>
              <p className="text-[10px] font-semibold text-foreground uppercase tracking-tight line-clamp-1">
                {data?.maitreOuvrageRelais || maitreOuvrage || "NON ASSIGNÉ"}
              </p>
            </div>

            <div className="p-4 bg-muted/5 border border-border/5 rounded-[4px] space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1" />
                <p className="text-[10px] font-semibold text-foreground/70 uppercase">Visite Complète (v1.6)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1" />
                <p className="text-[10px] font-semibold text-foreground/70 uppercase">Photos GPS Certifiées</p>
              </div>
            </div>

            <button className="w-full h-11 bg-primary text-black font-semibold rounded-[4px] text-[10px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2">
              <Share2 className="w-3.5 h-3.5" />
              Générer Annexe 16
            </button>
          </div>
        </div>

        {/* Audit Critique */}
        {data?.auditCritique && (
          <div className="bg-amber-500/5 border-l-2 border-amber-500 p-4 rounded-[4px]">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <h5 className="text-[10px] font-semibold uppercase tracking-widest">Alerte Exclusion</h5>
            </div>
            <p className="text-[10px] text-foreground/70 leading-relaxed font-medium">
              Risque : {data.auditCritique}. L'absence de certificat de visite est éliminatoire dans ce dossier.
            </p>
          </div>
        )}
        
        {/* WhatsApp Bridge Tile */}
        <div className="p-5 bg-green-500/5 border border-green-500/10 rounded-[4px] group hover:bg-green-500/10 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <MessageCircle className="w-4 h-4 text-green-500" />
            <span className="text-[9px] font-semibold uppercase tracking-widest text-green-500">Bridge WhatsApp</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
            Toutes les photos envoyées au bot terrain sont agrégées ici en temps réel.
          </p>
        </div>
      </aside>

    </div>
  );
}

