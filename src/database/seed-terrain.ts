// ══════════════════════════════════════════
// SABI — Seed Script : Terrain Data
// ══════════════════════════════════════════

import { db } from './client'
import {
  entreprises,
  appelsOffres,
  soumissions,
  materielProjet,
  equipeProjet,
  piecesSoumission,
} from './schema'
import { eq } from 'drizzle-orm'

const ENTREPRISE_ID = 'cf83af70-d49b-4a72-8222-201f08a05a8a' // Antigravity BTP

async function seed() {
  console.log('🌱 Début du seed Terrain...')

  // ═══════════════════════════════════════════
  // 1. Vérifier qu'un AO existe
  // ═══════════════════════════════════════════
  const existingAOs = await db.select().from(appelsOffres).limit(1)

  let aoId: string

  if (existingAOs.length === 0) {
    console.log('📋 Création d\'un AO de démonstration...')
    const [newAO] = await db.insert(appelsOffres).values({
      titreComplet: 'Construction du pont sur le Wouri — Tronçon PK 0+000 à PK 12+500',
      typeMarche: 'Travaux',
      institution: 'MINMAP',
      direction: 'Délégué Régional Centre',
      numeroMarche: 'AO-MINMAP-2024-0042',
      datePublication: '2024-02-15',
      dateLimiteSoumission: new Date('2024-04-15T17:00:00Z'),
      budgetEstime: 2500000000,
      secteur: 'BTP',
      regionExecution: 'Centre',
      villeExecution: 'Yaoundé',
      sourceScraping: 'ARMP',
      statut: 'actif',
      visiteObligatoire: true,
      visiteLieu: 'PK 0+000 — Entrée pont Wouri, Yaoundé',
      delaiExecution: '18 mois',
      modePassation: 'Appel d\'offres ouvert',
      cautionMontant: 50000000,
    }).returning()
    aoId = newAO.id
  } else {
    aoId = existingAOs[0].id
  }

  // ═══════════════════════════════════════════
  // 2. Créer une soumission active
  // ═══════════════════════════════════════════
  console.log('📝 Création de la soumission active...')

  const existingSoumissions = await db
    .select()
    .from(soumissions)
    .where(eq(soumissions.entrepriseId, ENTREPRISE_ID))
    .limit(1)

  let soumissionId: string

  if (existingSoumissions.length === 0) {
    const [newSoumission] = await db.insert(soumissions).values({
      entrepriseId: ENTREPRISE_ID,
      appelOffreId: aoId,
      statut: 'en_preparation',
      montantOffre: 2350000000,
      scoreConformite: 42,
    }).returning()
    soumissionId = newSoumission.id
  } else {
    soumissionId = existingSoumissions[0].id
    console.log('   ↳ Soumission existante trouvée:', soumissionId)
  }

  // ═══════════════════════════════════════════
  // 3. Seed MATÉRIEL (Module Garage)
  // ═══════════════════════════════════════════
  console.log('🔧 Seed matériel (Le Garage)...')

  // Nettoyer les données existantes pour cette soumission
  await db.delete(materielProjet).where(eq(materielProjet.soumissionId, soumissionId))

  await db.insert(materielProjet).values([
    {
      soumissionId,
      entrepriseId: ENTREPRISE_ID,
      nom: 'Caterpillar 320D',
      typeMateriel: 'ENGIN LOURD',
      designation: 'PELLE HYDRAULIQUE',
      quantiteRequise: 2,
      quantiteDisponible: 1,
      statut: 'complet',
      exigenceMatch: 'Pelle hydraulique > 20T',
      docsValides: 3,
      docsRequis: 3,
    },
    {
      soumissionId,
      entrepriseId: ENTREPRISE_ID,
      nom: 'Shantui SD16',
      typeMateriel: 'ENGIN LOURD',
      designation: 'BULLDOZER',
      quantiteRequise: 1,
      quantiteDisponible: 1,
      statut: 'attention',
      exigenceMatch: 'Bulldozer D6',
      docsValides: 2,
      docsRequis: 3,
    },
    {
      soumissionId,
      entrepriseId: ENTREPRISE_ID,
      nom: 'Mercedes Actros 3340',
      typeMateriel: 'LOGISTIQUE',
      designation: 'CAMION BENNE 15M3',
      quantiteRequise: 5,
      quantiteDisponible: 0,
      statut: 'incomplet',
      exigenceMatch: 'Camion Benne 15m3',
      docsValides: 0,
      docsRequis: 3,
    },
    {
      soumissionId,
      entrepriseId: ENTREPRISE_ID,
      nom: 'Bomag BW 213',
      typeMateriel: 'ENGIN LOURD',
      designation: 'COMPACTEUR VIBRANT',
      quantiteRequise: 2,
      quantiteDisponible: 2,
      statut: 'complet',
      exigenceMatch: 'Compacteur > 12T',
      docsValides: 3,
      docsRequis: 3,
    },
    {
      soumissionId,
      entrepriseId: ENTREPRISE_ID,
      nom: 'Tadano GR-300EX',
      typeMateriel: 'ENGIN LOURD',
      designation: 'GRUE MOBILE 30T',
      quantiteRequise: 1,
      quantiteDisponible: 1,
      statut: 'complet',
      exigenceMatch: 'Grue mobile ≥ 25T',
      docsValides: 3,
      docsRequis: 3,
    },
  ])

  // ═══════════════════════════════════════════
  // 4. Seed ÉQUIPE (Module Personnel)
  // ═══════════════════════════════════════════
  console.log('👷 Seed équipe (Personnel)...')

  await db.delete(equipeProjet).where(eq(equipeProjet.soumissionId, soumissionId))

  await db.insert(equipeProjet).values([
    {
      soumissionId,
      entrepriseId: ENTREPRISE_ID,
      nom: 'Marc Emmanuel NGONO',
      role: 'CHEF PROJET',
      qualification: 'Ingénieur de Conception Génie Civil',
      experienceAnnees: 12,
      cvSigne: true,
      diplomeCertifie: true,
      attestations: 'pending',
      statut: 'complet',
      alerte: null,
    },
    {
      soumissionId,
      entrepriseId: ENTREPRISE_ID,
      nom: 'Jean-Pierre MBARGA',
      role: 'CHEF CHANTIER',
      qualification: 'Technicien Supérieur',
      experienceAnnees: 8,
      cvSigne: true,
      diplomeCertifie: true,
      attestations: 'missing',
      statut: 'attention',
      alerte: 'AGENT PUBLIC DÉTECTÉ (MINEPAT). LETTRE DE MISE EN DISPONIBILITÉ OBLIGATOIRE.',
    },
    {
      soumissionId,
      entrepriseId: ENTREPRISE_ID,
      nom: 'Françoise ATEBA',
      role: 'TOPOGRAPHE',
      qualification: 'Ingénieur Géomètre',
      experienceAnnees: 6,
      cvSigne: true,
      diplomeCertifie: false,
      attestations: 'ok',
      statut: 'attention',
      alerte: null,
    },
    {
      soumissionId,
      entrepriseId: ENTREPRISE_ID,
      nom: 'Paul ESSOMBA',
      role: 'RESPONSABLE QUALITÉ',
      qualification: 'Ingénieur Génie Civil',
      experienceAnnees: 15,
      cvSigne: true,
      diplomeCertifie: true,
      attestations: 'ok',
      statut: 'complet',
      alerte: null,
    },
  ])

  // ═══════════════════════════════════════════
  // 5. Seed PIÈCES SOUMISSION (Module Compilation)
  // ═══════════════════════════════════════════
  console.log('📄 Seed pièces (Compilation)...')

  await db.delete(piecesSoumission).where(eq(piecesSoumission.soumissionId, soumissionId))

  await db.insert(piecesSoumission).values([
    {
      soumissionId,
      nomFichier: '01_MÉMOIRE_TECHNIQUE.pdf',
      typePiece: 'memoire_technique',
      tailleMb: '4.2',
      moduleSource: 'transcripteur',
      statut: 'final',
    },
    {
      soumissionId,
      nomFichier: '02_PIÈCES_MATÉRIEL.pdf',
      typePiece: 'pieces_materiel',
      tailleMb: '8.5',
      moduleSource: 'garage',
      statut: 'draft',
    },
    {
      soumissionId,
      nomFichier: '03_DOSSIER_PERSONNEL.pdf',
      typePiece: 'dossier_personnel',
      tailleMb: '3.1',
      moduleSource: 'equipe',
      statut: 'draft',
    },
  ])

  // ═══════════════════════════════════════════
  // 6. Mettre à jour le CA d'Antigravity BTP
  // ═══════════════════════════════════════════
  console.log('💰 Mise à jour CA Antigravity BTP...')

  await db
    .update(entreprises)
    .set({
      caDernierExercice: 1850000000, // 1.85 milliards FCFA
    })
    .where(eq(entreprises.id, ENTREPRISE_ID))

  // ═══════════════════════════════════════════
  // 7. Soumissions supplémentaires pour le Kanban
  // ═══════════════════════════════════════════
  console.log('📊 Seed soumissions supplémentaires (Kanban)...')

  const allAOs = await db.select().from(appelsOffres)

  if (allAOs.length < 3) {
    const newAOs = await db.insert(appelsOffres).values([
      {
        titreComplet: 'Réhabilitation de la route nationale N3 — Yaoundé-Douala (Lot 2)',
        typeMarche: 'Travaux',
        institution: 'MINHDU',
        direction: 'Direction des Routes',
        numeroMarche: 'AO-MINHDU-2024-0089',
        datePublication: '2024-01-20',
        dateLimiteSoumission: new Date('2024-03-20T17:00:00Z'),
        budgetEstime: 4200000000,
        secteur: 'BTP',
        regionExecution: 'Littoral',
        villeExecution: 'Douala',
        sourceScraping: 'ARMP',
        statut: 'actif',
        delaiExecution: '24 mois',
        modePassation: 'Appel d\'offres ouvert',
        cautionMontant: 84000000,
      },
      {
        titreComplet: 'Construction de la centrale solaire de Maroua — Phase 1',
        typeMarche: 'Travaux',
        institution: 'MINEE',
        direction: 'Direction de l\'Énergie',
        numeroMarche: 'AO-MINEE-2024-0015',
        datePublication: '2024-03-01',
        dateLimiteSoumission: new Date('2024-05-01T17:00:00Z'),
        budgetEstime: 8500000000,
        secteur: 'Énergie',
        regionExecution: 'Extrême-Nord',
        villeExecution: 'Maroua',
        sourceScraping: 'ARMP',
        statut: 'actif',
        delaiExecution: '36 mois',
        modePassation: 'Appel d\'offres ouvert',
        cautionMontant: 170000000,
      },
    ]).returning()

    // Créer des soumissions à différents stades du pipeline
    await db.insert(soumissions).values([
      {
        entrepriseId: ENTREPRISE_ID,
        appelOffreId: newAOs[0].id,
        statut: 'soumise',
        montantOffre: 3980000000,
        scoreConformite: 78,
      },
      {
        entrepriseId: ENTREPRISE_ID,
        appelOffreId: newAOs[1].id,
        statut: 'analyse',
        montantOffre: null,
        scoreConformite: 15,
      },
    ])
  }

  console.log('')
  console.log('✅ Seed terminé avec succès !')
  console.log('')
  console.log('📊 Résumé :')
  console.log('   → 1 soumission active (en_preparation)')
  console.log('   → 5 matériels dans Le Garage')
  console.log('   → 4 membres d\'équipe dans Personnel')
  console.log('   → 3 pièces dans Compilation')
  console.log('   → CA Antigravity BTP : 1.85 Mds FCFA')
  console.log('   → 2 soumissions supplémentaires pour le Kanban')

  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Erreur seed:', err)
  process.exit(1)
})
