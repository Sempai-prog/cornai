// ══════════════════════════════════════════
// CORNAi — Layout principal
// ══════════════════════════════════════════

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from '@/components/providers'
import GlobalGridBackground from '@/components/ui/global-grid-background'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'CORNAi — Gagnez vos marchés publics au Cameroun',
    template: '%s | CORNAi',
  },
  description:
    'CORNAi aide les PME camerounaises à trouver, analyser et gagner des marchés publics grâce à l\'IA.',
  keywords: [
    'marchés publics',
    'cameroun',
    'appel offres',
    'PME',
    'soumission',
    'ARMP',
  ],
  authors: [{ name: 'CORNAi' }],
  openGraph: {
    title: 'CORNAi — Gagnez vos marchés publics au Cameroun',
    description:
      'L\'IA qui aide les PME camerounaises à gagner des marchés publics.',
    url: 'https://cornai.cm',
    siteName: 'CORNAi',
    locale: 'fr_CM',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <GlobalGridBackground />
          {children}
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  )
}
