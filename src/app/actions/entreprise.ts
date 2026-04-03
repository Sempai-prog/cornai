"use server"

import { db } from "@/database/client"
import { entreprises } from "@/database/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

const DEMO_ENTREPRISE_ID = "cf83af70-d49b-4a72-8222-201f08a05a8a"

export async function updateEntrepriseField(fieldName: string, value: string | number) {
  try {
    // Basic validation
    if (!fieldName) throw new Error("Nom de champ manquant")

    const updateData: any = {
      [fieldName]: value,
      updatedAt: new Date()
    }

    await db
      .update(entreprises)
      .set(updateData)
      .where(eq(entreprises.id, DEMO_ENTREPRISE_ID))

    revalidatePath("/dashboard/profil")
    return { success: true }
  } catch (error) {
    console.error("[UPDATE ENTREPRISE ERROR]", error)
    return { success: false, error: "Impossible de mettre à jour le profil" }
  }
}
