"use server"

import { db } from "@/database/client"
import { entreprises, sessions } from "@/database/schema"
import { eq } from "drizzle-orm"
import { nanoid } from "nanoid"
import { cookies } from "next/headers"

/**
 * Onboarding minimal pour une PME sur CORNAi
 * Logique progressive profiling
 */
export async function registerCompany(data: {
  nom: string
  telephone: string
  secteur: string
  region: string
  email?: string
}) {
  try {
    // 1. Vérifier si le téléphone existe déjà
    const existing = await db.query.entreprises.findFirst({
      where: eq(entreprises.telephone, data.telephone)
    })

    let entrepriseId: string

    if (existing) {
      // Si existe déjà, on met à jour les infos (progressive profiling)
      await db.update(entreprises)
        .set({
          nom: data.nom,
          secteurs: [data.secteur], // On stocke comme premier secteur
          region: data.region,
          email: data.email || existing.email,
          updatedAt: new Date()
        })
        .where(eq(entreprises.id, existing.id))
      
      entrepriseId = existing.id
    } else {
      // 2. Créer l'entreprise (PME)
      const [newEntreprise] = await db.insert(entreprises).values({
        nom: data.nom,
        telephone: data.telephone,
        secteurs: [data.secteur],
        region: data.region,
        email: data.email,
        plan: "gratuit",
        actif: true
      }).returning({ id: entreprises.id })
      
      entrepriseId = newEntreprise.id
    }

    // 3. Créer une session (MVP Minimal)
    const sessionId = nanoid()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 jours

    await db.insert(sessions).values({
      id: sessionId,
      entrepriseId: entrepriseId,
      expiresAt: expiresAt
    })

    // 4. Déposer le cookie de session
    const cookieStore = await cookies()
    cookieStore.set("session_id", sessionId, {
      expires: expiresAt,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    })

    return { success: true }
  } catch (error) {
    console.error("Erreur registration:", error)
    return { success: false, error: "Erreur lors de l'enregistrement de l'entreprise." }
  }
}

/**
 * Connexion rapide via numéro WhatsApp
 */
export async function loginWithPhone(telephone: string) {
  try {
    const entreprise = await db.query.entreprises.findFirst({
      where: eq(entreprises.telephone, telephone)
    })

    if (!entreprise) {
      return { success: false, error: "Numéro non reconnu. Veuillez vous inscrire." }
    }

    const sessionId = nanoid()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)

    await db.insert(sessions).values({
      id: sessionId,
      entrepriseId: entreprise.id,
      expiresAt: expiresAt
    })

    const cookieStore = await cookies()
    cookieStore.set("session_id", sessionId, {
      expires: expiresAt,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    })

    return { success: true }
  } catch (error) {
    console.error("Erreur login:", error)
    return { success: false, error: "Erreur de connexion." }
  }
}
