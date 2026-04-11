// ══════════════════════════════════════════
// SABI — Système Typographique V1.6
// "Satoshi + Inter — Quiet · Clinique · Dense"
// ══════════════════════════════════════════

import { cn } from '@/lib/utils'

/* ══════════════════════════════════════════
   TITRES — Satoshi (Display), max semibold (600)
   ══════════════════════════════════════════ */

/**
 * PageTitle — Titre de page principal
 * Utilisé pour les en-têtes de modules majeurs.
 */
export function PageTitle({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h1 className={cn(
      'font-display',          // Satoshi
      'text-lg md:text-xl',    // 18px / 20px
      'font-semibold',         // 600 — Plafond SABI
      'text-foreground',
      'leading-tight',
      'tracking-[-0.01em]',
      className
    )}>
      {children}
    </h1>
  )
}

/**
 * SectionTitle — Titre de section ou de carte
 */
export function SectionTitle({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2 className={cn(
      'font-display',          // Satoshi
      'text-sm font-semibold', // 14px / 600
      'text-foreground',
      'leading-tight',
      className
    )}>
      {children}
    </h2>
  )
}

/**
 * SubTitle — Titre de sous-section
 */
export function SubTitle({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3 className={cn(
      'font-display',          // Satoshi
      'text-xs font-medium',   // 12px / 500
      'text-foreground',
      className
    )}>
      {children}
    </h3>
  )
}

/* ══════════════════════════════════════════
   CORPS — Inter (Sans), regular / medium
   ══════════════════════════════════════════ */

/**
 * BodyText — Texte standard de l'interface
 */
export function BodyText({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn(
      'font-sans',             // Inter
      'text-sm font-normal',   // 14px / 400
      'text-foreground',
      'leading-normal',
      className
    )}>
      {children}
    </p>
  )
}

/**
 * MetaText — Texte secondaire, descriptions ou métadonnées
 */
export function MetaText({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn(
      'font-sans',             // Inter
      'text-xs font-sabi-light', // 12px / 300
      'text-muted-foreground',
      'leading-snug',
      className
    )}>
      {children}
    </p>
  )
}

/**
 * Label — Étiquettes de formulaires ou de champs
 */
export function Label({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn(
      'font-sans',             // Inter
      'text-xs font-medium',   // 12px / 500
      'text-muted-foreground',
      'uppercase tracking-wider',
      className
    )}>
      {children}
    </span>
  )
}

/* ══════════════════════════════════════════
   DONNÉES — Mono, chiffres & références
   ══════════════════════════════════════════ */

/**
 * DataValue — Montants financiers, statistiques, chiffres
 */
export function DataValue({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn(
      'font-mono',             // JetBrains Mono
      'text-sm font-medium',   // 14px / 500
      'tabular-nums',
      'text-foreground',
      className
    )}>
      {children}
    </span>
  )
}

/**
 * CodeRef — Références d'appels d'offres, codes internes
 */
export function CodeRef({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn(
      'font-mono',
      'text-[10px] font-normal', // 10px / 400
      'text-muted-foreground',
      'tracking-wider uppercase',
      className
    )}>
      {children}
    </span>
  )
}
