// ══════════════════════════════════════════
// SABI — Moteur de Conformité Documentaire
// ══════════════════════════════════════════

import { db } from '../database/client'
import { entreprises, appelsOffres, documentsEntreprise, piecesAdministratives } from '../database/schema'
import { eq, and } from 'drizzle-orm'
import { joursRestants } from '../lib/utils'

/**
 * Analyse la conformité d'une entreprise pour un AO spécifique
 */
export async function verifierConformite(entrepriseId: string, aoId: string) {
  // 1. Charger les données
  const entreprise = await db.query.entreprises.findFirst({
    where: eq(entreprises.id, entrepriseId),
    with: {
       documents: true
    }
  })

  const ao = await db.query.appelsOffres.findFirst({
    where: eq(appelsOffres.id, aoId)
  })

  if (!entreprise || !ao) {
    throw new Error("Entreprise ou Appel d'Offre introuvable.")
  }

  // 2. Référentiel des pièces administratives (pour comparer les délais, etc.)
  const referentiel = await db.query.piecesAdministratives.findMany()
  
  // 3. Pièces requises par l'AO (simulé si non extrait proprement du scraper)
  // Dans une version réelle, ao.piecesRequises serait un JSON structuré.
  const piecesRequises = (ao.piecesRequises as any[]) || []
  
  const results = {
    score: 0,
    statut: 'soumission_possible' as 'conforme' | 'soumission_possible' | 'bloquant',
    piecesOk: [] as any[],
    piecesManquantes: [] as any[],
    piecesExpirees: [] as any[],
    bloquants: [] as any[],
    joursRestants: joursRestants(ao.dateLimiteSoumission),
    messageResume: "",
    actions: [] as any[]
  }

  let totalObligatoire = 0
  let totalPresent = 0

  for (const req of piecesRequises) {
    const isObligatoire = req.obligatoire || req.eliminatoire
    if (isObligatoire) totalObligatoire++

    const doc = entreprise.documents?.find(d => 
      d.pieceId === req.pieceId || (req.piece && d.pieceId.toLowerCase().includes(req.piece.toLowerCase()))
    )

    const pieceRef = referentiel.find(p => p.id === req.pieceId || (req.piece && p.nomCanonique.toLowerCase().includes(req.piece.toLowerCase())))

    const rawDelai = pieceRef?.delaiObtention as any
    const delaiObtentionMax = 
      typeof rawDelai === 'number' ? rawDelai :
      (rawDelai && typeof rawDelai === 'object' && 'max' in rawDelai) ? Number(rawDelai.max || 5) : 5

    if (!doc) {
      results.piecesManquantes.push(req.piece || req.pieceId)
      if (isObligatoire) {
        results.bloquants.push(`Manque : ${req.piece || req.pieceId}`)
        results.actions.push({
          piece: req.piece || req.pieceId,
          action: "Obtenir la pièce",
          delai: delaiObtentionMax,
          urgence: (results.joursRestants ?? 0) < delaiObtentionMax ? 'haute' : 'moyenne'
        })
      }
    } else {
      const estExpire = doc.dateExpiration && new Date(doc.dateExpiration) < new Date()
      if (estExpire) {
        results.piecesExpirees.push(req.piece || req.pieceId)
        if (isObligatoire) {
          results.bloquants.push(`Expiré : ${req.piece || req.pieceId}`)
          results.actions.push({
            piece: req.piece || req.pieceId,
            action: "Renouveler la pièce",
            delai: delaiObtentionMax,
            urgence: 'haute'
          })
        }
      } else {
        results.piecesOk.push(req.piece || req.pieceId)
        if (isObligatoire) totalPresent++
      }
    }
  }

  // Calcul du score
  results.score = totalObligatoire > 0 ? Math.round((totalPresent / totalObligatoire) * 100) : 100
  
  if (results.bloquants.length > 0) {
    results.statut = 'bloquant'
    results.messageResume = `⚠️ Dossier non conforme. ${results.bloquants.length} pièce(s) manquante(s) ou expirée(s).`
  } else if (results.score === 100) {
    results.statut = 'conforme'
    results.messageResume = "✅ Votre dossier est complet et à jour pour cet appel d'offres."
  } else {
    results.messageResume = "ℹ️ Dossier partiellement prêt. Vérifiez les pièces recommandées."
  }

  return results
}
