// ══════════════════════════════════════════════════════════
// CORNAi — Schéma de base de données (Drizzle ORM)
// ══════════════════════════════════════════════════════════

import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  bigint,
  timestamp,
  date,
  time,
  jsonb,
  numeric,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'

// ═══════════════════════════════════════════
// ENTREPRISES
// ═══════════════════════════════════════════
export const entreprises = pgTable('entreprises', {
  id: uuid('id').defaultRandom().primaryKey(),

  // Identité
  nom: varchar('nom', { length: 255 }).notNull(),
  formeJuridique: varchar('forme_juridique', { length: 50 }),
  niu: varchar('niu', { length: 20 }).unique(),
  rccm: varchar('rccm', { length: 50 }),
  dateCreation: date('date_creation'),

  // Contact
  gerantNom: varchar('gerant_nom', { length: 255 }),
  telephone: varchar('telephone', { length: 20 }).notNull().unique(),
  email: varchar('email', { length: 255 }),
  adresse: text('adresse'),
  ville: varchar('ville', { length: 100 }),
  region: varchar('region', { length: 50 }),

  // Capacité
  secteurs: text('secteurs').array(),
  sousSecteurs: text('sous_secteurs').array(),
  regionsCouvertes: text('regions_couvertes').array(),
  budgetMaxMarche: bigint('budget_max_marche', { mode: 'number' }),
  caDernierExercice: bigint('ca_dernier_exercice', { mode: 'number' }),

  // Expérience
  nbMarchesExecutes: integer('nb_marches_executes').default(0),
  anneePremierMarche: integer('annee_premier_marche'),

  // Abonnement
  plan: varchar('plan', { length: 20 }).default('gratuit'),
  dateInscription: timestamp('date_inscription', { withTimezone: true }).defaultNow(),
  actif: boolean('actif').default(true),

  // Préférences
  langue: varchar('langue', { length: 10 }).default('fr'),
  notificationsActives: boolean('notifications_actives').default(true),
  heureNotification: time('heure_notification_preferee').default(sql`'08:00'`),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  index('idx_entreprises_telephone').on(table.telephone),
  index('idx_entreprises_ville').on(table.ville),
  index('idx_entreprises_plan').on(table.plan),
  index('idx_entreprises_actif').on(table.actif),
])

// ═══════════════════════════════════════════
// DOCUMENTS ENTREPRISE
// ═══════════════════════════════════════════
export const documentsEntreprise = pgTable('documents_entreprise', {
  id: uuid('id').defaultRandom().primaryKey(),
  entrepriseId: uuid('entreprise_id').references(() => entreprises.id, { onDelete: 'cascade' }).notNull(),
  pieceId: varchar('piece_id', { length: 20 }).notNull(),

  disponible: boolean('disponible').default(false),
  dateObtention: date('date_obtention'),
  dateExpiration: date('date_expiration'),
  fichierUrl: text('fichier_url'),
  statut: varchar('statut', { length: 20 }).default('manquant'),
  notes: text('notes'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  uniqueIndex('idx_doc_entreprise_piece').on(table.entrepriseId, table.pieceId),
])

// ═══════════════════════════════════════════
// REFERENCES ENTREPRISE
// ═══════════════════════════════════════════
export const referencesEntreprise = pgTable('references_entreprise', {
  id: uuid('id').defaultRandom().primaryKey(),
  entrepriseId: uuid('entreprise_id').references(() => entreprises.id, { onDelete: 'cascade' }).notNull(),

  client: varchar('client', { length: 255 }),
  objet: text('objet'),
  montant: bigint('montant', { mode: 'number' }),
  annee: integer('annee'),
  dureeMois: integer('duree_mois'),

  attestationBonneExecution: boolean('attestation_bonne_execution').default(false),
  fichierAttestationUrl: text('fichier_attestation_url'),
  typeMarche: varchar('type_marche', { length: 50 }),
  secteur: varchar('secteur', { length: 100 }),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ═══════════════════════════════════════════
// APPELS D'OFFRES
// ═══════════════════════════════════════════
export const appelsOffres = pgTable('appels_offres', {
  id: uuid('id').defaultRandom().primaryKey(),

  // Identifiant
  numeroMarche: varchar('numero_marche', { length: 100 }),
  numeroAvis: varchar('numero_avis', { length: 100 }),

  // Maître d'ouvrage
  institution: varchar('institution', { length: 255 }),
  direction: varchar('direction', { length: 255 }),
  moTelephone: varchar('mo_telephone', { length: 20 }),
  moEmail: varchar('mo_email', { length: 255 }),

  // Objet
  titreComplet: text('titre_complet').notNull(),
  resume: varchar('resume', { length: 500 }),
  typeMarche: varchar('type_marche', { length: 50 }).notNull(),
  sousType: varchar('sous_type', { length: 100 }),
  secteur: varchar('secteur', { length: 100 }),

  // Allotissement
  estAlloti: boolean('est_alloti').default(false),
  lots: jsonb('lots'),

  // Finances
  budgetEstime: bigint('budget_estime', { mode: 'number' }),
  sourceFinancement: varchar('source_financement', { length: 255 }),
  cautionMontant: bigint('caution_soumission_montant', { mode: 'number' }),
  monnaie: varchar('monnaie', { length: 10 }).default('FCFA'),

  // Calendrier
  datePublication: date('date_publication'),
  dateLimiteSoumission: timestamp('date_limite_soumission', { withTimezone: true }),
  dateOuverturePlis: timestamp('date_ouverture_plis', { withTimezone: true }),
  delaiExecution: varchar('delai_execution', { length: 100 }),

  // Visite
  visiteObligatoire: boolean('visite_obligatoire').default(false),
  visiteDate: date('visite_date'),
  visiteLieu: text('visite_lieu'),

  // Lieu
  lieuExecution: text('lieu_execution'),
  regionExecution: varchar('region_execution', { length: 50 }),
  villeExecution: varchar('ville_execution', { length: 100 }),
  lieuDepot: text('lieu_depot'),

  // Évaluation
  modeEvaluation: varchar('mode_evaluation', { length: 50 }),
  seuilTechnique: numeric('seuil_technique_eliminatoire'),
  criteresEvaluation: jsonb('criteres_evaluation'),
  piecesRequises: jsonb('pieces_requises'),
  criteresEliminatoires: jsonb('criteres_eliminatoires'),

  // Mode de passation
  modePassation: varchar('mode_passation', { length: 50 }),

  // Bailleur
  financeParBailleur: boolean('finance_par_bailleur').default(false),
  bailleur: varchar('bailleur', { length: 100 }),

  // Scraping
  sourceScraping: varchar('source_scraping', { length: 50 }),
  urlSource: text('url_source'),
  dateScraping: timestamp('date_scraping', { withTimezone: true }).defaultNow(),
  fiabiliteExtraction: integer('fiabilite_extraction'),
  donneesBrutes: text('donnees_brutes'),
  daoPdfUrl: text('dao_pdf_url'),

  // Statut & Résultat
  statut: varchar('statut', { length: 20 }).default('actif'),
  attributaireNom: varchar('attributaire_nom', { length: 255 }),
  attributaireMontant: bigint('attributaire_montant', { mode: 'number' }),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  index('idx_ao_type').on(table.typeMarche),
  index('idx_ao_region').on(table.regionExecution),
  index('idx_ao_deadline').on(table.dateLimiteSoumission),
  index('idx_ao_statut').on(table.statut),
  index('idx_ao_secteur').on(table.secteur),
  index('idx_ao_source').on(table.sourceScraping),
])

// ═══════════════════════════════════════════
// MATCHINGS
// ═══════════════════════════════════════════
export const matchings = pgTable('matchings', {
  id: uuid('id').defaultRandom().primaryKey(),
  entrepriseId: uuid('entreprise_id').references(() => entreprises.id, { onDelete: 'cascade' }).notNull(),
  appelOffreId: uuid('appel_offre_id').references(() => appelsOffres.id, { onDelete: 'cascade' }).notNull(),

  scoreTotal: integer('score_total').notNull().default(0),
  scoreSecteur: integer('score_secteur').notNull().default(0),
  scoreBudget: integer('score_budget').notNull().default(0),
  scoreLocalisation: integer('score_localisation').notNull().default(0),
  scoreExperience: integer('score_experience').notNull().default(0),
  scoreDocuments: integer('score_documents').notNull().default(0),
  scoreDelai: integer('score_delai').notNull().default(0),
  details: jsonb('details'),

  notifie: boolean('notifie').default(false),
  dateNotification: timestamp('date_notification', { withTimezone: true }),
  reponsePme: varchar('reponse_pme', { length: 20 }),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  uniqueIndex('idx_matching_unique').on(table.entrepriseId, table.appelOffreId),
  index('idx_matching_score').on(table.scoreTotal),
])

// ═══════════════════════════════════════════
// SOUMISSIONS
// ═══════════════════════════════════════════
export const soumissions = pgTable('soumissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  entrepriseId: uuid('entreprise_id').references(() => entreprises.id).notNull(),
  appelOffreId: uuid('appel_offre_id').references(() => appelsOffres.id).notNull(),

  scoreConformite: integer('score_conformite'),
  checklist: jsonb('checklist'),
  bloquants: jsonb('bloquants'),

  offreTechniqueUrl: text('offre_technique_url'),
  offreFinanciereUrl: text('offre_financiere_url'),

  montantOffre: bigint('montant_offre', { mode: 'number' }),
  montantRecommande: bigint('montant_recommande', { mode: 'number' }),
  margeEstimee: numeric('marge_estimee_pourcent'),

  statut: varchar('statut', { length: 30 }).default('en_preparation'),
  dateDepot: timestamp('date_depot', { withTimezone: true }),

  resultat: varchar('resultat', { length: 20 }),
  raisonRejet: text('raison_rejet'),
  rangClassement: integer('rang_classement'),

  // Post-attribution
  dateNotificationAttribution: date('date_notification_attribution'),
  dateOrdreService: date('date_ordre_service'),
  cautionBonneExecution: bigint('caution_bonne_execution', { mode: 'number' }),

  coutTotalDossier: bigint('cout_total_dossier', { mode: 'number' }),
  notes: text('notes'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  index('idx_soumission_statut').on(table.statut),
  index('idx_soumission_entreprise').on(table.entrepriseId),
])

// ═══════════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════════
export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  entrepriseId: uuid('entreprise_id').references(() => entreprises.id).notNull(),

  type: varchar('type', { length: 30 }).notNull(),
  canal: varchar('canal', { length: 20 }).default('whatsapp'),
  contenu: text('contenu'),
  referenceAoId: uuid('reference_ao_id').references(() => appelsOffres.id),

  envoye: boolean('envoye').default(false),
  dateEnvoi: timestamp('date_envoi', { withTimezone: true }),
  lu: boolean('lu').default(false),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  index('idx_notif_entreprise').on(table.entrepriseId),
  index('idx_notif_envoye').on(table.envoye),
])

// ═══════════════════════════════════════════
// MERCURIALE (Prix de référence)
// ═══════════════════════════════════════════
export const mercuriale = pgTable('mercuriale', {
  id: uuid('id').defaultRandom().primaryKey(),

  categorie: varchar('categorie', { length: 100 }),
  sousCategorie: varchar('sous_categorie', { length: 100 }),
  designation: varchar('designation', { length: 255 }).notNull(),
  unite: varchar('unite', { length: 50 }),

  prixMin: bigint('prix_min', { mode: 'number' }),
  prixMoyen: bigint('prix_moyen', { mode: 'number' }),
  prixMax: bigint('prix_max', { mode: 'number' }),

  region: varchar('region', { length: 50 }),
  ville: varchar('ville', { length: 100 }),
  dateReleve: date('date_releve'),
  source: varchar('source', { length: 100 }),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

// ═══════════════════════════════════════════
// PIÈCES ADMINISTRATIVES (Référentiel)
// ═══════════════════════════════════════════
export const piecesAdministratives = pgTable('pieces_administratives', {
  id: varchar('id', { length: 20 }).primaryKey(),

  nomCanonique: varchar('nom_canonique', { length: 255 }).notNull(),
  variantes: text('variantes_nom').array(),
  categorie: varchar('categorie', { length: 50 }),

  obligatoireParDefaut: boolean('obligatoire_par_defaut').default(true),
  eliminatoireSiAbsent: boolean('eliminatoire_si_absent').default(true),
  rattrapable48h: boolean('rattrapable_48h').default(false),

  emetteur: varchar('emetteur', { length: 255 }),
  ouObtenir: jsonb('ou_obtenir'),
  coutEstime: jsonb('cout_estime_fcfa'),
  delaiObtention: jsonb('delai_obtention_jours'),
  dureeValidite: varchar('duree_validite', { length: 255 }),
  formatRequis: varchar('format_requis', { length: 255 }),

  referenceLegale: varchar('reference_legale', { length: 255 }),
  applicableTypesMarches: text('applicable_types_marches').array(),
  conditionsSpecifiques: text('conditions_specifiques'),

  regexDetection: text('regex_detection'),
  messageAlerte: text('message_alerte_whatsapp'),
  messageAction: text('message_action_whatsapp'),
  piegesCourants: text('pieges_courants').array(),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ═══════════════════════════════════════════
// GLOSSAIRE
// ═══════════════════════════════════════════
export const glossaire = pgTable('glossaire', {
  id: varchar('id', { length: 20 }).primaryKey(),
  terme: varchar('terme', { length: 255 }).notNull(),
  abreviation: varchar('abreviation', { length: 20 }),
  definitionLegale: text('definition_legale'),
  definitionSimple: text('definition_simple'),
  synonymes: text('synonymes').array(),
  referenceLegale: varchar('reference_legale', { length: 255 }),
  motsCles: text('mots_cles').array(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ═══════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════
export const faqTable = pgTable('faq', {
  id: varchar('id', { length: 20 }).primaryKey(),
  question: text('question').notNull(),
  reponseCourte: varchar('reponse_courte', { length: 500 }),
  reponseComplete: text('reponse_complete'),
  referenceLegale: varchar('reference_legale', { length: 255 }),
  categorie: varchar('categorie', { length: 50 }),
  motsCles: text('mots_cles').array(),
  questionsLiees: text('questions_liees').array(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ═══════════════════════════════════════════
// LOGS SCRAPING
// ═══════════════════════════════════════════
export const logsScraping = pgTable('logs_scraping', {
  id: uuid('id').defaultRandom().primaryKey(),
  source: varchar('source', { length: 50 }),
  url: text('url'),
  statut: varchar('statut', { length: 20 }),
  nbAoDetectes: integer('nb_ao_detectes'),
  nbAoNouveaux: integer('nb_ao_nouveaux'),
  erreurMessage: text('erreur_message'),
  dureeMs: integer('duree_ms'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ═══════════════════════════════════════════
// PAIEMENTS
// ═══════════════════════════════════════════
export const paiements = pgTable('paiements', {
  id: uuid('id').defaultRandom().primaryKey(),
  entrepriseId: uuid('entreprise_id').references(() => entreprises.id).notNull(),

  montant: bigint('montant', { mode: 'number' }),
  devise: varchar('devise', { length: 10 }).default('XAF'),
  methode: varchar('methode', { length: 30 }),
  referenceTransaction: varchar('reference_transaction', { length: 100 }),

  plan: varchar('plan', { length: 20 }),
  periodeDebut: date('periode_debut'),
  periodeFin: date('periode_fin'),
  statut: varchar('statut', { length: 20 }).default('pending'),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ═══════════════════════════════════════════
// SESSIONS (Auth)
// ═══════════════════════════════════════════
export const sessions = pgTable('sessions', {
  id: varchar('id', { length: 255 }).primaryKey(),
  entrepriseId: uuid('entreprise_id').references(() => entreprises.id, { onDelete: 'cascade' }).notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ═══════════════════════════════════════════
// RELATIONS
// ═══════════════════════════════════════════
export const entreprisesRelations = relations(entreprises, ({ many }) => ({
  documents: many(documentsEntreprise),
  references: many(referencesEntreprise),
  matchings: many(matchings),
  soumissions: many(soumissions),
  notifications: many(notifications),
  paiements: many(paiements),
  sessions: many(sessions),
}))

export const appelsOffresRelations = relations(appelsOffres, ({ many }) => ({
  matchings: many(matchings),
  soumissions: many(soumissions),
}))

export const matchingsRelations = relations(matchings, ({ one }) => ({
  entreprise: one(entreprises, {
    fields: [matchings.entrepriseId],
    references: [entreprises.id],
  }),
  appelOffre: one(appelsOffres, {
    fields: [matchings.appelOffreId],
    references: [appelsOffres.id],
  }),
}))

export const soumissionsRelations = relations(soumissions, ({ one }) => ({
  entreprise: one(entreprises, {
    fields: [soumissions.entrepriseId],
    references: [entreprises.id],
  }),
  appelOffre: one(appelsOffres, {
    fields: [soumissions.appelOffreId],
    references: [appelsOffres.id],
  }),
}))
