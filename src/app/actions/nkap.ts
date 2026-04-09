'use server'

import { db } from '@/database/client';
import { soumissions, appelsOffres, entreprises } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { DonneesExcelBPU } from '@/lib/generateurs/excel/bpu.generator';

export async function getNkapData(soumissionId: string): Promise<DonneesExcelBPU | null> {
  try {
    const s = await db.query.soumissions.findFirst({
      where: eq(soumissions.id, soumissionId),
      with: {
        appelOffre: true,
        entreprise: true
      }
    });

    if (!s || !s.appelOffre || !s.entreprise) return null;

    // Simulation de données BPU/DQE pour la démo
    // Dans une version réelle, ces données viendraient d'une table 'lignes_chiffrage'
    const lignesBPU = [
      { numero: 101, designation: "Installation de chantier et repli", unite: "Forfait", prixUnitaire: 2500000 },
      { numero: 102, designation: "Amenée et repli du matériel", unite: "Forfait", prixUnitaire: 4500000 },
      { numero: 201, designation: "Débroussaillement et nettoyage de l'emprise", unite: "m2", prixUnitaire: 150 },
      { numero: 202, designation: "Terrassements et déblais", unite: "m3", prixUnitaire: 2500 },
      { numero: 301, designation: "Béton dosé à 350kg/m3 pour ouvrages", unite: "m3", prixUnitaire: 185000 },
      { numero: 401, designation: "Fourniture et pose de buses en béton armé Ø800", unite: "ml", prixUnitaire: 120000 },
    ];

    const lignesDQE = lignesBPU.map((l, i) => ({
      ...l,
      quantite: [1, 1, 15000, 2500, 45, 12][i] || 1
    }));

    return {
      soumission: {
        reference: s.appelOffre.numeroMarche || s.appelOffre.numeroAvis || 'N/A',
        intitule: s.appelOffre.titreComplet,
        maitreDOuvrage: s.appelOffre.institution || 'Inconnu',
        entreprise: s.entreprise.nom
      },
      lignesBPU,
      lignesDQE
    };
  } catch (error) {
    console.error('Erreur getNkapData:', error);
    return null;
  }
}
