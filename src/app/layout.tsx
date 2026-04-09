// ══════════════════════════════════════════
// SABI — Layout principal (Root)
// ══════════════════════════════════════════

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className} suppressHydrationWarning>
        <NuqsAdapter>
          <Providers>
            {children}
            <Toaster position="top-right" richColors />
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
