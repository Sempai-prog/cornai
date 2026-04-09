'use server'

import { db } from '@/database/client';
import { visites_terrain, soumissions, entreprises, appelsOffres } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { Annexe16Data } from '@/lib/generateurs/pdf/annexe-16.generator';

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
