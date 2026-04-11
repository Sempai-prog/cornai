'use server'

import { db } from '@/database/client';
import { visites_terrain } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { Annexe16Data } from '@/lib/generateurs/pdf/annexe-16.generator';

/**
 * Sauvegarder ou mettre à jour un rapport de visite de site
 */
export async function upsertVisiteTerrain(
  soumissionId: string,
  data: {
    dateVisite: string,
    heureVisite: string,
    maitreOuvrageRelais: string,
    observations: string,
    latitude?: string,
    longitude?: string
  }
) {
  try {
    const existant = await db.query.visites_terrain.findFirst({
      where: eq(visites_terrain.soumissionId, soumissionId)
    });

    if (existant) {
      await db.update(visites_terrain)
        .set({
          dateVisite: new Date(data.dateVisite),
          heureVisite: data.heureVisite,
          maitreOuvrageRelais: data.maitreOuvrageRelais,
          observations: data.observations,
          latitude: data.latitude,
          longitude: data.longitude,
        })
        .where(eq(visites_terrain.id, existant.id));
    } else {
      await db.insert(visites_terrain)
        .values({
          soumissionId,
          dateVisite: new Date(data.dateVisite),
          heureVisite: data.heureVisite,
          maitreOuvrageRelais: data.maitreOuvrageRelais,
          observations: data.observations,
          latitude: data.latitude,
          longitude: data.longitude,
          statutVisite: 'effectuee'
        });
    }

    revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain/descente`);
    return { success: true };
  } catch (error: any) {
    console.error('[Terrain] Erreur upsert:', error);
    return { success: false, error: error.message };
  }
}

export async function getTerrainDataPourAnnexe(soumissionId: string): Promise<Annexe16Data | null> {
  try {
    const data = await db.query.visites_terrain.findFirst({
      where: eq(visites_terrain.soumissionId, soumissionId),
      with: {
        soumission: {
          with: {
            entreprise: true,
            appelOffre: true
          }
        }
      }
    });

    if (!data || !data.soumission) return null;

    const s = data.soumission;
    const ao = s.appelOffre;
    const e = s.entreprise;

    return {
      reference: ao.numeroMarche || ao.numeroAvis || 'N/A',
      intituleMarche: ao.titreComplet,
      maitreDOuvrage: ao.institution || 'Maître d\'Ouvrage',
      
      dateVisite: data.dateVisite ? new Date(data.dateVisite) : new Date(),
      lieuVisite: ao.visiteLieu || ao.lieuExecution || 'Site du projet',
      representantMaitrise: data.maitreOuvrageRelais || 'Le Responsable désigné',
      functionRepresentant: 'Représentant Maître d\'Ouvrage',
      
      nomEntreprise: e.nom,
      representantEntreprise: e.gerantNom || 'Représentant Mandataire',
      qualiteRepresentant: 'Gérant / Directeur Général',
      
      observations: data.observations || 'Visite effectuée conformément aux exigences du DAO.'
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données terrain:', error);
    return null;
  }
}
