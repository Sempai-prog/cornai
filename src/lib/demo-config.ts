/**
 * SABI — Configuration Démo & Contexte Utilisateur
 * Ce fichier centralise l'ID de l'entreprise pour la phase de prototypage.
 * À terme, ces valeurs proviendront de la session NextAuth.
 */

export const DEMO_CONFIG = {
  // ID unique pour Antigravity BTP (Seeded)
  ENTREPRISE_ID: process.env.NEXT_PUBLIC_DEMO_ENTREPRISE_ID || "cf83af70-d49b-4a72-8222-201f08a05a8a",
  ENTREPRISE_NOM: "Antigravity BTP SARL",
} as const

/**
 * Récupère le contexte dynamique de l'entreprise.
 * Prépare la transition vers un système multi-tenant avec authentification.
 */
export async function getEntrepriseContext() {
  // TODO: Implémenter la lecture de session (auth())
  
  return {
    entrepriseId: DEMO_CONFIG.ENTREPRISE_ID,
    nom: DEMO_CONFIG.ENTREPRISE_NOM,
    isDemo: true,
  }
}
