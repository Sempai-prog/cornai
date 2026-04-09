import { z } from 'zod'

export const SchemaAjoutEngin = z.object({
  designation: z.string().min(3, 'Minimum 3 caractères').max(100),
  marque: z.string().min(2, 'Obligatoire').max(50),
  modele: z.string().optional(),
  annee: z.number().int().min(1980).max(new Date().getFullYear()),
  numeroCarteGrise: z.string().min(5, 'Minimum 5 caractères').max(20),
  etat: z.enum(['excellent', 'bon', 'moyen', 'a_reviser']),
  proprietaire: z.enum(['propre', 'loue', 'credit_bail']),
})

export type InputAjoutEngin = z.infer<typeof SchemaAjoutEngin>
