"use server";

import { db } from "@/database/client";
import { appelsOffres, documentsEntreprise } from "@/database/schema";
import { ilike, or, eq, and } from "drizzle-orm";

const DEMO_ENTREPRISE_ID = "cf83af70-d49b-4a72-8222-201f08a05a8a";

export async function searchGlobal(query: string) {
  if (!query || query.length < 2) return { aos: [], docs: [] };

  const [aos, docs] = await Promise.all([
    // Search Appels d'Offres
    db.select({
      id: appelsOffres.id,
      titreComplet: appelsOffres.titreComplet,
      numeroMarche: appelsOffres.numeroMarche,
      institution: appelsOffres.institution,
      typeMarche: appelsOffres.typeMarche,
    })
    .from(appelsOffres)
    .where(
      or(
        ilike(appelsOffres.titreComplet, `%${query}%`),
        ilike(appelsOffres.numeroMarche, `%${query}%`),
        ilike(appelsOffres.institution, `%${query}%`)
      )
    )
    .limit(5),

    // Search Documents
    db.select({
      id: documentsEntreprise.id,
      pieceId: documentsEntreprise.pieceId,
      statut: documentsEntreprise.statut,
    })
    .from(documentsEntreprise)
    .where(
      and(
        eq(documentsEntreprise.entrepriseId, DEMO_ENTREPRISE_ID),
        ilike(documentsEntreprise.pieceId, `%${query}%`)
      )
    )
    .limit(5)
  ]);

  return { aos, docs };
}

// Utility for search row detail redirection or panel opening
import { getAOById } from "@/database/queries/ao";
export async function getAoDetails(id: string) {
  return await getAOById(id);
}

// PROFILE ACTIONS
import { entreprises } from "@/database/schema";

export async function getProfile() {
    const result = await db.select().from(entreprises).where(eq(entreprises.id, DEMO_ENTREPRISE_ID)).limit(1);
    return result[0];
}

export async function updateProfile(data: any) {
    await db.update(entreprises).set(data).where(eq(entreprises.id, DEMO_ENTREPRISE_ID));
    return { success: true };
}
