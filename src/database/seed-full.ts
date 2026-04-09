// ══════════════════════════════════════════
// SABI — Seed Script : Full Platform Data (15 AO + Pipeline + Core)
// ══════════════════════════════════════════

import { db } from './client'
import {
  entreprises,
  appelsOffres,
  soumissions,
  matchings,
  notifications,
  piecesAdministratives,
  documentsEntreprise,
  referencesEntreprise,
  materielProjet,
  equipeProjet,
  piecesSoumission,
  visites_terrain,
  photos_terrain
} from './schema'
import { eq } from 'drizzle-orm'
import { addDays, subDays } from 'date-fns'

const DEMO_ENTREPRISE_ID = 'cf83af70-d49b-4a72-8222-201f08a05a8a'

async function seed() {
  console.log('🌱 Début du seed complet SABI (Core + Pipeline + Terrain)...')

  // 1. Nettoyage (Ordre important pour les FK)
  console.log('🧹 Nettoyage des anciennes données...')
  await db.delete(photos_terrain)
  await db.delete(visites_terrain)
  await db.delete(piecesSoumission)
  await db.delete(equipeProjet)
  await db.delete(materielProjet)
  await db.delete(documentsEntreprise)
  await db.delete(referencesEntreprise)
  await db.delete(notifications)
  await db.delete(soumissions)
  await db.delete(matchings)
  await db.delete(appelsOffres)
  await db.delete(piecesAdministratives)
  // On garde l'entreprise mais on s'assure qu'elle existe

  // 2. Entreprise
  const existing = await db.query.entreprises.findFirst({
    where: eq(entreprises.id, DEMO_ENTREPRISE_ID)
  })

  if (!existing) {
    console.log('🏢 Création de l\'entreprise "Antigravity BTP"...')
    await db.insert(entreprises).values({
      id: DEMO_ENTREPRISE_ID,
      nom: 'Antigravity BTP',
      niu: 'M123456789012',
      rccm: 'RC/YAO/2024/B/1234',
      telephone: '+237 600 00 00 00',
      email: 'contact@antigravity-btp.cm',
      ville: 'Yaoundé',
      region: 'Centre',
      plan: 'premium',
      caDernierExercice: 1850000000,
    })
  }

  // 3. Pièces Administratives (Référentiel)
  console.log('📁 Création du référentiel des pièces administratives...')
  await db.insert(piecesAdministratives).values([
    {
      id: 'ANR',
      nomCanonique: 'Attestation de Non Redevance',
      categorie: 'fiscal',
      obligatoireParDefaut: true,
      eliminatoireSiAbsent: true
    },
    {
      id: 'CNPS',
      nomCanonique: 'Attestation de Soumission CNPS',
      categorie: 'social',
      obligatoireParDefaut: true,
      eliminatoireSiAbsent: true
    },
    {
      id: 'RCCM',
      nomCanonique: 'Registre du Commerce',
      categorie: 'legal',
      obligatoireParDefaut: true,
      eliminatoireSiAbsent: true
    },
    {
      id: 'PLAN_LOCAL',
      nomCanonique: 'Plan de Localisation visé par les impôts',
      categorie: 'legal',
      obligatoireParDefaut: true,
      eliminatoireSiAbsent: false
    }
  ])

  // 4. Documents Entreprise
  console.log('📄 Ajout des documents de l\'entreprise...')
  await db.insert(documentsEntreprise).values([
    {
      entrepriseId: DEMO_ENTREPRISE_ID,
      pieceId: 'ANR',
      disponible: true,
      dateExpiration: addDays(new Date(), 45).toISOString().split('T')[0],
      statut: 'valide'
    },
    {
      entrepriseId: DEMO_ENTREPRISE_ID,
      pieceId: 'CNPS',
      disponible: true,
      dateExpiration: subDays(new Date(), 2).toISOString().split('T')[0],
      statut: 'expire',
      notes: 'Renouvellement en cours'
    },
    {
      entrepriseId: DEMO_ENTREPRISE_ID,
      pieceId: 'RCCM',
      disponible: true,
      dateExpiration: addDays(new Date(), 365).toISOString().split('T')[0],
      statut: 'valide'
    }
  ])

  // 5. Références Entreprise
  console.log('🏆 Ajout des références de l\'entreprise...')
  await db.insert(referencesEntreprise).values([
    {
      entrepriseId: DEMO_ENTREPRISE_ID,
      client: 'MINTP',
      objet: 'Construction de la route départementale D12',
      montant: 850000000,
      annee: 2023,
      attestationBonneExecution: true,
      typeMarche: 'Travaux',
      secteur: 'BTP'
    },
    {
      entrepriseId: DEMO_ENTREPRISE_ID,
      client: 'Mairie de Yaoundé 1er',
      objet: 'Construction du marché moderne',
      montant: 420000000,
      annee: 2022,
      attestationBonneExecution: true,
      typeMarche: 'Travaux',
      secteur: 'BTP'
    }
  ])

  // 6. Génération des 15 Appels d'Offres
  console.log('📋 Génération de 15 Appels d\'Offres diversifiés...')

  const aosData = [
    {
      titreComplet: "Réhabilitation de la route nationale N3 — Tronçon Yaoundé-Edea",
      typeMarche: "AONO",
      institution: "MINTP",
      budgetEstime: 4500000000,
      secteur: "Bâtiment / TP",
      regionExecution: "Centre",
      dateLimiteSoumission: addDays(new Date(), 15),
      score: 95
    },
    {
      titreComplet: "Fourniture de matériel informatique et serveurs pour le MINMAP",
      typeMarche: "DC",
      institution: "MINMAP",
      budgetEstime: 450000000,
      secteur: "Fournitures",
      regionExecution: "Centre",
      dateLimiteSoumission: addDays(new Date(), 5),
      score: 88,
      soumissionStatut: 'en_preparation'
    },
    {
      titreComplet: "Entretien routier du tronçon Yaoundé-Bafoussam (Lot 1)",
      typeMarche: "AONR",
      institution: "MINEE",
      budgetEstime: 850000000,
      secteur: "Bâtiment / TP",
      regionExecution: "Ouest",
      dateLimiteSoumission: addDays(new Date(), 2),
      score: 75,
      soumissionStatut: 'en_preparation'
    },
    {
      titreComplet: "Construction de 10 forages à énergie solaire dans le Septentrion",
      typeMarche: "AONO",
      institution: "MINEE",
      budgetEstime: 120000000,
      secteur: "Bâtiment / TP",
      regionExecution: "Extrême-Nord",
      dateLimiteSoumission: addDays(new Date(), 30),
      score: 62
    },
    {
      titreComplet: "Audit financier des projets financés par la Banque Mondiale",
      typeMarche: "ASMI",
      institution: "MINEPAT",
      budgetEstime: 85000000,
      secteur: "Services Prestations Intellectuelles",
      regionExecution: "Centre",
      dateLimiteSoumission: addDays(new Date(), 10),
      score: 94
    },
    {
      titreComplet: "Fourniture de kits scolaires pour les écoles de l'Est",
      typeMarche: "DC",
      institution: "MINEDUB",
      budgetEstime: 210000000,
      secteur: "Fournitures",
      regionExecution: "Est",
      dateLimiteSoumission: addDays(new Date(), 20),
      score: 31
    },
    {
      titreComplet: "Bitumage des voiries urbaines de la ville de Kribi",
      typeMarche: "AONO",
      institution: "MINHDU",
      budgetEstime: 2200000000,
      secteur: "Bâtiment / TP",
      regionExecution: "Sud",
      dateLimiteSoumission: addDays(new Date(), -2),
      score: 91,
      soumissionStatut: 'soumis'
    },
    {
      titreComplet: "Acquisition de véhicules de fonction pour le FEICOM",
      typeMarche: "AONO",
      institution: "FEICOM",
      budgetEstime: 350000000,
      secteur: "Fournitures",
      regionExecution: "Centre",
      dateLimiteSoumission: addDays(new Date(), 12),
      score: 82,
      soumissionStatut: 'gagne'
    },
    {
      titreComplet: "Études techniques pour la construction d'un marché moderne à Bamenda",
      typeMarche: "ASMI",
      institution: "MINDDEVEL",
      budgetEstime: 45000000,
      secteur: "Services Prestations Intellectuelles",
      regionExecution: "Nord-Ouest",
      dateLimiteSoumission: addDays(new Date(), 25),
      score: 55
    },
    {
      titreComplet: "Développement d'une plateforme de e-santé pour le MINSANTE",
      typeMarche: "AONO",
      institution: "MINSANTE",
      budgetEstime: 150000000,
      secteur: "Services Prestations Intellectuelles",
      regionExecution: "Centre",
      dateLimiteSoumission: addDays(new Date(), 18),
      score: 96
    },
    {
      titreComplet: "Fourniture de médicaments essentiels — Région du Sud-Ouest",
      typeMarche: "DC",
      institution: "MINSANTE",
      budgetEstime: 600000000,
      secteur: "Fournitures",
      regionExecution: "Sud-Ouest",
      dateLimiteSoumission: addDays(new Date(), 8),
      score: 42
    },
    {
      titreComplet: "Construction d'un bâtiment R+2 pour la préfecture de Bafoussam",
      typeMarche: "AONO",
      institution: "MINAT",
      budgetEstime: 320000000,
      secteur: "Bâtiment / TP",
      regionExecution: "Ouest",
      dateLimiteSoumission: addDays(new Date(), 14),
      score: 87,
      soumissionStatut: 'perdu'
    },
    {
      titreComplet: "Maintenance des groupes électrogènes du Port Autonome de Douala",
      typeMarche: "DC",
      institution: "PAD",
      budgetEstime: 95000000,
      secteur: "Fournitures",
      regionExecution: "Littoral",
      dateLimiteSoumission: addDays(new Date(), 7),
      score: 79,
      soumissionStatut: 'depose'
    },
    {
      titreComplet: "Construction d'un complexe sportif à Garoua",
      typeMarche: "AONO",
      institution: "MINSEP",
      budgetEstime: 5500000000,
      secteur: "Bâtiment / TP",
      regionExecution: "Nord",
      dateLimiteSoumission: addDays(new Date(), 40),
      score: 93
    },
    {
      titreComplet: "Production de supports de communication pour le cinquantenaire",
      typeMarche: "DC",
      institution: "MINCOM",
      budgetEstime: 25000000,
      secteur: "Fournitures",
      regionExecution: "Centre",
      dateLimiteSoumission: addDays(new Date(), 3),
      score: 12
    }
  ]

  let soumissionTerrainId: string | null = null;

  for (const data of aosData) {
    const [ao] = await db.insert(appelsOffres).values({
      titreComplet: data.titreComplet,
      typeMarche: data.typeMarche,
      institution: data.institution,
      budgetEstime: data.budgetEstime,
      secteur: data.secteur,
      regionExecution: data.regionExecution,
      dateLimiteSoumission: data.dateLimiteSoumission,
      cautionMontant: Math.floor(data.budgetEstime * 0.02),
      statut: 'actif',
      sourceScraping: 'ARMP',
      numeroMarche: `AO-${data.institution}-${new Date().getFullYear()}-${Math.floor(Math.random()*1000)}`
    }).returning()

    // Créer le matching correspondant
    await db.insert(matchings).values({
      entrepriseId: DEMO_ENTREPRISE_ID,
      appelOffreId: ao.id,
      scoreTotal: data.score,
      scoreSecteur: Math.floor(Math.random() * 20) + 80,
      scoreBudget: Math.floor(Math.random() * 40) + 60,
      scoreLocalisation: Math.floor(Math.random() * 100),
      details: { match: "IA Analysis robust" }
    })

    // Créer la soumission si spécifié
    if (data.soumissionStatut) {
      const [soum] = await db.insert(soumissions).values({
        entrepriseId: DEMO_ENTREPRISE_ID,
        appelOffreId: ao.id,
        statut: data.soumissionStatut as any,
        montantOffre: Math.floor(data.budgetEstime * 0.95),
        scoreConformite: Math.floor(Math.random() * 30) + 60
      }).returning()

      // On garde l'ID de la soumission "Entretien Yaoundé-Bafoussam" pour le seed Terrain
      if (data.titreComplet.includes("Yaoundé-Bafoussam")) {
        soumissionTerrainId = soum.id;
      }
    }
  }

  // 7. Seed Terrain, Matériel, Équipe, Pièces  (pour la Soumission ciblée)
  if (soumissionTerrainId) {
    console.log('🚙 Seed des données Terrain, Matériel et Équipe pour une soumission clé...')

    // Matériel
    await db.insert(materielProjet).values([
      { soumissionId: soumissionTerrainId, entrepriseId: DEMO_ENTREPRISE_ID, nom: 'Caterpillar 320D', typeMateriel: 'ENGIN LOURD', designation: 'PELLE HYDRAULIQUE', quantiteRequise: 2, quantiteDisponible: 1, statut: 'complet', exigenceMatch: 'Pelle hydraulique > 20T', docsValides: 3, docsRequis: 3 },
      { soumissionId: soumissionTerrainId, entrepriseId: DEMO_ENTREPRISE_ID, nom: 'Shantui SD16', typeMateriel: 'ENGIN LOURD', designation: 'BULLDOZER', quantiteRequise: 1, quantiteDisponible: 1, statut: 'attention', exigenceMatch: 'Bulldozer D6', docsValides: 2, docsRequis: 3 },
      { soumissionId: soumissionTerrainId, entrepriseId: DEMO_ENTREPRISE_ID, nom: 'Mercedes Actros', typeMateriel: 'LOGISTIQUE', designation: 'CAMION BENNE 15M3', quantiteRequise: 5, quantiteDisponible: 0, statut: 'incomplet', exigenceMatch: 'Camion Benne 15m3', docsValides: 0, docsRequis: 3 },
      { soumissionId: soumissionTerrainId, entrepriseId: DEMO_ENTREPRISE_ID, nom: 'Bomag BW 213', typeMateriel: 'ENGIN LOURD', designation: 'COMPACTEUR VIBRANT', quantiteRequise: 2, quantiteDisponible: 2, statut: 'complet', exigenceMatch: 'Compacteur > 12T', docsValides: 3, docsRequis: 3 },
    ])

    // Équipe
    await db.insert(equipeProjet).values([
      { soumissionId: soumissionTerrainId, entrepriseId: DEMO_ENTREPRISE_ID, nom: 'Marc Emmanuel NGONO', role: 'CHEF PROJET', qualification: 'Ingénieur de Conception', experienceAnnees: 12, cvSigne: true, diplomeCertifie: true, attestations: 'pending', statut: 'complet', alerte: null },
      { soumissionId: soumissionTerrainId, entrepriseId: DEMO_ENTREPRISE_ID, nom: 'Jean-Pierre MBARGA', role: 'CHEF CHANTIER', qualification: 'Technicien Supérieur', experienceAnnees: 8, cvSigne: true, diplomeCertifie: true, attestations: 'missing', statut: 'attention', alerte: 'AGENT PUBLIC DÉTECTÉ (MINEPAT).' },
      { soumissionId: soumissionTerrainId, entrepriseId: DEMO_ENTREPRISE_ID, nom: 'Françoise ATEBA', role: 'TOPOGRAPHE', qualification: 'Ingénieur Géomètre', experienceAnnees: 6, cvSigne: true, diplomeCertifie: false, attestations: 'ok', statut: 'attention', alerte: null },
    ])

    // Pièces Soumission
    await db.insert(piecesSoumission).values([
      { soumissionId: soumissionTerrainId, nomFichier: '01_MÉMOIRE_TECHNIQUE.pdf', typePiece: 'memoire_technique', tailleMb: '4.2', moduleSource: 'transcripteur', statut: 'final' },
      { soumissionId: soumissionTerrainId, nomFichier: '02_PIÈCES_MATÉRIEL.pdf', typePiece: 'pieces_materiel', tailleMb: '8.5', moduleSource: 'garage', statut: 'draft' },
      { soumissionId: soumissionTerrainId, nomFichier: '03_DOSSIER_PERSONNEL.pdf', typePiece: 'dossier_personnel', tailleMb: '3.1', moduleSource: 'equipe', statut: 'draft' },
    ])

    // Visites Terrain
    const [visite] = await db.insert(visites_terrain).values({
      soumissionId: soumissionTerrainId,
      entrepriseId: DEMO_ENTREPRISE_ID,
      dateVisite: new Date('2024-03-10T09:00:00Z'),
      heureVisite: '09:00',
      latitude: '3.8483',
      longitude: '11.5021',
      precisionGps: '± 3 mètres',
      maitreOuvrageRelais: 'Ing. Mballa (Délégué Régional MINMAP)',
      observations: 'Le site est accessible par une piste latéritique. Le PK 0+000 est bien identifié. Présence de réseaux électriques à déplacer.',
      auditCritique: 'Nécessité de déplacement de 12 poteaux Moyenne Tension non prévus au DAO initial.',
      auditCritiqueImpact: 'Risque de retard de 2 mois sur la phase d\'installation du chantier.',
      statutVisite: 'terminee',
    }).returning()

    // Photos Terrain
    await db.insert(photos_terrain).values([
      { visiteId: visite.id, urlPhoto: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800', legende: 'Vue d\'ensemble du site (PK 0+000)', ordre: 1, tailleMb: '2.4' },
      { visiteId: visite.id, urlPhoto: 'https://images.unsplash.com/photo-1504307651254-35682f94a1d8?auto=format&fit=crop&q=80&w=800', legende: 'Détail de la zone de franchissement', ordre: 2, tailleMb: '3.1' },
      { visiteId: visite.id, urlPhoto: 'https://images.unsplash.com/photo-1517089535819-de372141d2cc?auto=format&fit=crop&q=80&w=800', legende: 'Obstacle : Poteaux MT à déplacer', ordre: 3, tailleMb: '1.8' },
    ])
  }

  // 8. Notifications
  console.log('🔔 Génération de notifications...')
  await db.insert(notifications).values([
    {
      entrepriseId: DEMO_ENTREPRISE_ID,
      type: 'Nouveau Match AO',
      contenu: "Un nouvel Appel d'Offres du MINTP vient d'être publié avec un score de matching de 95%.",
      lu: false
    },
    {
      entrepriseId: DEMO_ENTREPRISE_ID,
      type: 'Alerte Deadline',
      contenu: "ALERTE : Plus que 48h pour soumettre votre dossier pour le marché informatique du MINMAP.",
      lu: false
    },
    {
      entrepriseId: DEMO_ENTREPRISE_ID,
      type: 'Document Expiré',
      contenu: "Votre Attestation de Non Redevance (ANR) expire dans 3 jours. Pensez à la renouveler.",
      lu: true
    }
  ])

  console.log('✅ Seed ALL/Core terminé avec succès !')
  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Erreur seed:', err)
  process.exit(1)
})
