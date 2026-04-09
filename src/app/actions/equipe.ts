'use server'

import { db } from '@/database/client'
import { equipeProjet } from '@/database/schema'
import { revalidatePath } from 'next/cache'
import { getEntrepriseContext } from '@/lib/demo-config'
import { SchemaAjoutMembre, InputAjoutMembre } from '@/lib/validations/equipe'

export async function ajouterMembreEquipe(
  input: InputAjoutMembre
): Promise<{ succes: boolean; erreur?: string; id?: string }> {
  
  const validation = SchemaAjoutMembre.safeParse(input)
  if (!validation.success) {
    return { 
      succes: false, 
      erreur: validation.error.issues[0].message 
    }
  }
  
  const { entrepriseId } = await getEntrepriseContext()
  const data = validation.data
  
  try {
    // Mappe les données vers la table equipe_projet
    const mappedData = {
      entrepriseId,
      nom: `${data.prenom} ${data.nom.toUpperCase()}`,
      role: data.poste,
      qualification: data.diplome || 'Non renseigné',
      experienceAnnees: data.anneeExperience,
      statut: 'complet',
      cvSigne: data.cvUrl && data.cvUrl.length > 5 ? true : false,
      diplomeCertifie: false,
      attestations: 'pending',
      createdAt: new Date(),
    }

    const [nouveauMembre] = await db.insert(equipeProjet).values(mappedData).returning({ id: equipeProjet.id })
    
    // Invalide le cache SSR de la page Terrain
    revalidatePath('/dashboard/terrain')
    
    return { succes: true, id: nouveauMembre.id }
    
  } catch (erreur) {
    console.error('[Equipe] Erreur ajout membre:', erreur)
    return { succes: false, erreur: 'Erreur lors de la sauvegarde.' }
  }
}
