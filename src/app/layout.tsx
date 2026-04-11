// ══════════════════════════════════════════
// SABI — Layout principal (Root)
// ══════════════════════════════════════════

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

// Inter — Corps de texte
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

// JetBrains Mono — Données & Codes
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Satoshi — Titres (local)
const satoshi = localFont({
  src: [
    {
      path: "./fonts/satoshi/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "./fonts/satoshi/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SABI — Gagnez vos marchés publics au Cameroun",
    template: "%s | SABI",
  },
  description:
    "SABI aide les PME camerounaises à trouver, analyser et gagner des marchés publics grâce à l'IA.",
  keywords: [
    "marchés publics",
    "cameroun",
    "appel offres",
    "PME",
    "soumission",
    "ARMP",
  ],
  authors: [{ name: "SABI" }],
  openGraph: {
    title: "SABI — Gagnez vos marchés publics au Cameroun",
    description:
      "L'IA qui aide les PME camerounaises à gagner des marchés publics.",
    url: "https://sabi.cm",
    siteName: "SABI",
    locale: "fr_CM",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${satoshi.variable} ${mono.variable} font-sans`} suppressHydrationWarning>
        <Providers>
          <NuqsAdapter>
            {children}
            <Toaster position="top-right" richColors />
          </NuqsAdapter>
        </Providers>
      </body>
    </html>
  );
}
