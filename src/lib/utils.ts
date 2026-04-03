import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formate un nombre en FCFA (ex: 1 500 000 FCFA)
 */
export function formatFCFA(amount: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount) + ' FCFA'
}

/**
 * Calcule le nombre de jours restants avant une date
 */
export function joursRestants(date: Date | string | null) {
  if (!date) return 0
  const limit = new Date(date)
  const now = new Date()
  const diff = limit.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return days > 0 ? days : 0
}

/**
 * Formate un montant en format compact XAF (ex: 450M FCFA, 1.2 Mds FCFA)
 */
export function formatXAF(montant: number): string {
  if (montant >= 1_000_000_000) {
    return `${(montant / 1_000_000_000).toFixed(1)} Mds FCFA`;
  }
  if (montant >= 1_000_000) {
    return `${(montant / 1_000_000).toFixed(0)} M FCFA`;
  }
  if (montant >= 1_000) {
    return `${(montant / 1_000).toFixed(0)} K FCFA`;
  }
  return `${montant.toLocaleString('fr-FR')} FCFA`;
}

/**
 * Formate une date limite en format relatif ou complet FR
 */
export function formatDateline(date: Date | string | null): string {
  if (!date) return "N/A";
  const d = new Date(date);
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  const jours = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (jours < 0) return "Forclus";
  if (jours === 0) return "Aujourd'hui";
  if (jours === 1) return "Demain";
  if (jours <= 7) return `${jours} jours`;
  
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
