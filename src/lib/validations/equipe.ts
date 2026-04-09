import { z } from 'zod'

export const SchemaAjoutMembre = z.object({
  nom: z.string().min(2, 'Le nom est obligatoire'),
  prenom: z.string().min(2, 'Le prénom est obligatoire'),
  poste: z.string().min(2, 'Obligatoire'),              // Ex: "Ingénieur Génie Civil"
  diplome: z.string().optional(),                       // Ex: "Master BTP - ENSP Yaoundé"
  anneeExperience: z.number().int().min(0, 'Min 0').max(50, 'Max 50'),
  disponible: z.boolean(),
  cvUrl: z.string().url('URL invalide').optional().or(z.literal('')), // URL de fallback si non spécifiée
})

export type InputAjoutMembre = z.infer<typeof SchemaAjoutMembre>
