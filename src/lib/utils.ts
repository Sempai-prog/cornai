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
