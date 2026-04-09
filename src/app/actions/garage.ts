'use server'

import { db } from '@/database/client'
import { materielProjet } from '@/database/schema'
import { revalidatePath } from 'next/cache'
import { getEntrepriseContext } from '@/lib/demo-config'
import { SchemaAjoutEngin, InputAjoutEngin } from '@/lib/validations/garage'

export async function ajouterEnginGarage(
  input: InputAjoutEngin
): Promise<{ succes: boolean; erreur?: string; id?: string }> {
  
  // Validation des données
  const validation = SchemaAjoutEngin.safeParse(input)
  if (!validation.success) {
    return { 
      succes: false, 
      erreur: validation.error.issues[0].message 
    }
  }
  
  const { entrepriseId } = await getEntrepriseContext()
  
  try {
    // Mapping des champs vers la structure abstraite 'materielProjet' de la V1.6
    const [nouvelEngin] = await db.insert(materielProjet).values({
      entrepriseId,
      nom: validation.data.designation,
      typeMateriel: 'ENGIN LOURD',
      designation: `${validation.data.marque} ${validation.data.modele || ''} - ${validation.data.etat.toUpperCase()} / ${validation.data.proprietaire.toUpperCase()} - CG: ${validation.data.numeroCarteGrise}`,
      quantiteRequise: 1,
      quantiteDisponible: 1,
      statut: 'complet',
      exigenceMatch: 'Nouveau',
      docsValides: 3,
      docsRequis: 3,
      createdAt: new Date(),
    }).returning({ id: materielProjet.id })
    
    // Invalider le cache de la page garage
    revalidatePath('/dashboard/terrain')
    
    return { succes: true, id: nouvelEngin.id }
    
  } catch (erreur) {
    console.error('[Garage] Erreur ajout engin:', erreur)
    return { succes: false, erreur: 'Erreur lors de l\'enregistrement' }
  }
}
