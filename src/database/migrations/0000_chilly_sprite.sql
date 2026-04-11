CREATE TABLE "appels_offres" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"numero_marche" varchar(100),
	"numero_avis" varchar(100),
	"institution" varchar(255),
	"direction" varchar(255),
	"mo_telephone" varchar(20),
	"mo_email" varchar(255),
	"titre_complet" text NOT NULL,
	"resume" varchar(500),
	"type_marche" varchar(50) NOT NULL,
	"sous_type" varchar(100),
	"secteur" varchar(100),
	"est_alloti" boolean DEFAULT false,
	"lots" jsonb,
	"budget_estime" bigint,
	"source_financement" varchar(255),
	"caution_soumission_montant" bigint,
	"monnaie" varchar(10) DEFAULT 'FCFA',
	"date_publication" date,
	"date_limite_soumission" timestamp with time zone,
	"date_ouverture_plis" timestamp with time zone,
	"delai_execution" varchar(100),
	"visite_obligatoire" boolean DEFAULT false,
	"visite_date" date,
	"visite_lieu" text,
	"lieu_execution" text,
	"region_execution" varchar(50),
	"ville_execution" varchar(100),
	"lieu_depot" text,
	"mode_evaluation" varchar(50),
	"seuil_technique_eliminatoire" numeric,
	"criteres_evaluation" jsonb,
	"pieces_requises" jsonb,
	"criteres_eliminatoires" jsonb,
	"mode_passation" varchar(50),
	"finance_par_bailleur" boolean DEFAULT false,
	"bailleur" varchar(100),
	"source_scraping" varchar(50),
	"url_source" text,
	"date_scraping" timestamp with time zone DEFAULT now(),
	"fiabilite_extraction" integer,
	"donnees_brutes" text,
	"dao_pdf_url" text,
	"statut" varchar(20) DEFAULT 'actif',
	"attributaire_nom" varchar(255),
	"attributaire_montant" bigint,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "documents_entreprise" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entreprise_id" uuid NOT NULL,
	"piece_id" varchar(20) NOT NULL,
	"disponible" boolean DEFAULT false,
	"date_obtention" date,
	"date_expiration" date,
	"fichier_url" text,
	"statut" varchar(20) DEFAULT 'manquant',
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "entreprises" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nom" varchar(255) NOT NULL,
	"forme_juridique" varchar(50),
	"niu" varchar(20),
	"rccm" varchar(50),
	"date_creation" date,
	"gerant_nom" varchar(255),
	"telephone" varchar(20) NOT NULL,
	"email" varchar(255),
	"adresse" text,
	"ville" varchar(100),
	"region" varchar(50),
	"secteurs" text[],
	"sous_secteurs" text[],
	"regions_couvertes" text[],
	"budget_max_marche" bigint,
	"ca_dernier_exercice" bigint,
	"nb_marches_executes" integer DEFAULT 0,
	"annee_premier_marche" integer,
	"plan" varchar(20) DEFAULT 'gratuit',
	"date_inscription" timestamp with time zone DEFAULT now(),
	"actif" boolean DEFAULT true,
	"langue" varchar(10) DEFAULT 'fr',
	"notifications_actives" boolean DEFAULT true,
	"heure_notification_preferee" time DEFAULT '08:00',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "entreprises_niu_unique" UNIQUE("niu"),
	CONSTRAINT "entreprises_telephone_unique" UNIQUE("telephone")
);
--> statement-breakpoint
CREATE TABLE "equipe_projet" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"soumission_id" uuid,
	"entreprise_id" uuid,
	"nom" varchar(255) NOT NULL,
	"role" varchar(100),
	"qualification" varchar(255),
	"experience_annees" integer DEFAULT 0,
	"cv_signe" boolean DEFAULT false,
	"diplome_certifie" boolean DEFAULT false,
	"attestations" varchar(50) DEFAULT 'pending',
	"statut" varchar(50) DEFAULT 'incomplet',
	"alerte" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "faq" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"reponse_courte" varchar(500),
	"reponse_complete" text,
	"reference_legale" varchar(255),
	"categorie" varchar(50),
	"mots_cles" text[],
	"questions_liees" text[],
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "glossaire" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"terme" varchar(255) NOT NULL,
	"abreviation" varchar(20),
	"definition_legale" text,
	"definition_simple" text,
	"synonymes" text[],
	"reference_legale" varchar(255),
	"mots_cles" text[],
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "logs_scraping" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source" varchar(50),
	"url" text,
	"statut" varchar(20),
	"nb_ao_detectes" integer,
	"nb_ao_nouveaux" integer,
	"erreur_message" text,
	"duree_ms" integer,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "matchings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entreprise_id" uuid NOT NULL,
	"appel_offre_id" uuid NOT NULL,
	"score_total" integer DEFAULT 0 NOT NULL,
	"score_secteur" integer DEFAULT 0 NOT NULL,
	"score_budget" integer DEFAULT 0 NOT NULL,
	"score_localisation" integer DEFAULT 0 NOT NULL,
	"score_experience" integer DEFAULT 0 NOT NULL,
	"score_documents" integer DEFAULT 0 NOT NULL,
	"score_delai" integer DEFAULT 0 NOT NULL,
	"details" jsonb,
	"notifie" boolean DEFAULT false,
	"date_notification" timestamp with time zone,
	"reponse_pme" varchar(20),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "materiel_projet" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"soumission_id" uuid,
	"entreprise_id" uuid,
	"nom" varchar(255) NOT NULL,
	"type_materiel" varchar(100),
	"designation" varchar(255),
	"quantite_requise" integer DEFAULT 1,
	"quantite_disponible" integer DEFAULT 0,
	"statut" varchar(50) DEFAULT 'incomplet',
	"exigence_match" varchar(255),
	"docs_valides" integer DEFAULT 0,
	"docs_requis" integer DEFAULT 3,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "mercuriale" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"categorie" varchar(100),
	"sous_categorie" varchar(100),
	"designation" varchar(255) NOT NULL,
	"unite" varchar(50),
	"prix_min" bigint,
	"prix_moyen" bigint,
	"prix_max" bigint,
	"region" varchar(50),
	"ville" varchar(100),
	"date_releve" date,
	"source" varchar(100),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entreprise_id" uuid NOT NULL,
	"type" varchar(30) NOT NULL,
	"canal" varchar(20) DEFAULT 'whatsapp',
	"contenu" text,
	"reference_ao_id" uuid,
	"envoye" boolean DEFAULT false,
	"date_envoi" timestamp with time zone,
	"lu" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "paiements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entreprise_id" uuid NOT NULL,
	"montant" bigint,
	"devise" varchar(10) DEFAULT 'XAF',
	"methode" varchar(30),
	"reference_transaction" varchar(100),
	"plan" varchar(20),
	"periode_debut" date,
	"periode_fin" date,
	"statut" varchar(20) DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "photos_terrain" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"visite_id" uuid NOT NULL,
	"url_photo" varchar(500),
	"legende" varchar(255),
	"ordre" integer DEFAULT 0,
	"taille_mb" numeric DEFAULT '0',
	"gps_latitude" numeric,
	"gps_longitude" numeric,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "pieces_administratives" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"nom_canonique" varchar(255) NOT NULL,
	"variantes_nom" text[],
	"categorie" varchar(50),
	"obligatoire_par_defaut" boolean DEFAULT true,
	"eliminatoire_si_absent" boolean DEFAULT true,
	"rattrapable_48h" boolean DEFAULT false,
	"emetteur" varchar(255),
	"ou_obtenir" jsonb,
	"cout_estime_fcfa" jsonb,
	"delai_obtention_jours" jsonb,
	"duree_validite" varchar(255),
	"format_requis" varchar(255),
	"reference_legale" varchar(255),
	"applicable_types_marches" text[],
	"conditions_specifiques" text,
	"regex_detection" text,
	"message_alerte_whatsapp" text,
	"message_action_whatsapp" text,
	"pieges_courants" text[],
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "pieces_soumission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"soumission_id" uuid NOT NULL,
	"nom_fichier" varchar(255) NOT NULL,
	"type_piece" varchar(100),
	"taille_mb" numeric DEFAULT '0',
	"module_source" varchar(50),
	"statut" varchar(50) DEFAULT 'draft',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "references_entreprise" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entreprise_id" uuid NOT NULL,
	"client" varchar(255),
	"objet" text,
	"montant" bigint,
	"annee" integer,
	"duree_mois" integer,
	"attestation_bonne_execution" boolean DEFAULT false,
	"fichier_attestation_url" text,
	"type_marche" varchar(50),
	"secteur" varchar(100),
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"entreprise_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "soumissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entreprise_id" uuid NOT NULL,
	"appel_offre_id" uuid NOT NULL,
	"score_conformite" integer,
	"checklist" jsonb,
	"bloquants" jsonb,
	"offre_technique_url" text,
	"offre_financiere_url" text,
	"montant_offre" bigint,
	"montant_recommande" bigint,
	"marge_estimee_pourcent" numeric,
	"avancement_admin" integer DEFAULT 0,
	"avancement_tech" integer DEFAULT 0,
	"avancement_financier" integer DEFAULT 0,
	"statut" varchar(30) DEFAULT 'en_preparation',
	"date_depot" timestamp with time zone,
	"resultat" varchar(20),
	"raison_rejet" text,
	"rang_classement" integer,
	"date_notification_attribution" date,
	"date_ordre_service" date,
	"caution_bonne_execution" bigint,
	"cout_total_dossier" bigint,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "visites_terrain" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"soumission_id" uuid NOT NULL,
	"entreprise_id" uuid,
	"date_visite" timestamp with time zone,
	"heure_visite" varchar(10),
	"latitude" numeric,
	"longitude" numeric,
	"precision_gps" varchar(100),
	"maitre_ouvrage_relais" varchar(255),
	"observations" text,
	"audit_critique" text,
	"audit_critique_impact" varchar(255),
	"transcription" text,
	"transcription_statut" varchar(50) DEFAULT 'idle',
	"transcription_date" timestamp with time zone,
	"statut_visite" varchar(50) DEFAULT 'planifiee',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "documents_entreprise" ADD CONSTRAINT "documents_entreprise_entreprise_id_entreprises_id_fk" FOREIGN KEY ("entreprise_id") REFERENCES "public"."entreprises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "equipe_projet" ADD CONSTRAINT "equipe_projet_soumission_id_soumissions_id_fk" FOREIGN KEY ("soumission_id") REFERENCES "public"."soumissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "equipe_projet" ADD CONSTRAINT "equipe_projet_entreprise_id_entreprises_id_fk" FOREIGN KEY ("entreprise_id") REFERENCES "public"."entreprises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matchings" ADD CONSTRAINT "matchings_entreprise_id_entreprises_id_fk" FOREIGN KEY ("entreprise_id") REFERENCES "public"."entreprises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matchings" ADD CONSTRAINT "matchings_appel_offre_id_appels_offres_id_fk" FOREIGN KEY ("appel_offre_id") REFERENCES "public"."appels_offres"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "materiel_projet" ADD CONSTRAINT "materiel_projet_soumission_id_soumissions_id_fk" FOREIGN KEY ("soumission_id") REFERENCES "public"."soumissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "materiel_projet" ADD CONSTRAINT "materiel_projet_entreprise_id_entreprises_id_fk" FOREIGN KEY ("entreprise_id") REFERENCES "public"."entreprises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_entreprise_id_entreprises_id_fk" FOREIGN KEY ("entreprise_id") REFERENCES "public"."entreprises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_reference_ao_id_appels_offres_id_fk" FOREIGN KEY ("reference_ao_id") REFERENCES "public"."appels_offres"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "paiements" ADD CONSTRAINT "paiements_entreprise_id_entreprises_id_fk" FOREIGN KEY ("entreprise_id") REFERENCES "public"."entreprises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "photos_terrain" ADD CONSTRAINT "photos_terrain_visite_id_visites_terrain_id_fk" FOREIGN KEY ("visite_id") REFERENCES "public"."visites_terrain"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pieces_soumission" ADD CONSTRAINT "pieces_soumission_soumission_id_soumissions_id_fk" FOREIGN KEY ("soumission_id") REFERENCES "public"."soumissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "references_entreprise" ADD CONSTRAINT "references_entreprise_entreprise_id_entreprises_id_fk" FOREIGN KEY ("entreprise_id") REFERENCES "public"."entreprises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_entreprise_id_entreprises_id_fk" FOREIGN KEY ("entreprise_id") REFERENCES "public"."entreprises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "soumissions" ADD CONSTRAINT "soumissions_entreprise_id_entreprises_id_fk" FOREIGN KEY ("entreprise_id") REFERENCES "public"."entreprises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "soumissions" ADD CONSTRAINT "soumissions_appel_offre_id_appels_offres_id_fk" FOREIGN KEY ("appel_offre_id") REFERENCES "public"."appels_offres"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visites_terrain" ADD CONSTRAINT "visites_terrain_soumission_id_soumissions_id_fk" FOREIGN KEY ("soumission_id") REFERENCES "public"."soumissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visites_terrain" ADD CONSTRAINT "visites_terrain_entreprise_id_entreprises_id_fk" FOREIGN KEY ("entreprise_id") REFERENCES "public"."entreprises"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_ao_type" ON "appels_offres" USING btree ("type_marche");--> statement-breakpoint
CREATE INDEX "idx_ao_region" ON "appels_offres" USING btree ("region_execution");--> statement-breakpoint
CREATE INDEX "idx_ao_deadline" ON "appels_offres" USING btree ("date_limite_soumission");--> statement-breakpoint
CREATE INDEX "idx_ao_statut" ON "appels_offres" USING btree ("statut");--> statement-breakpoint
CREATE INDEX "idx_ao_secteur" ON "appels_offres" USING btree ("secteur");--> statement-breakpoint
CREATE INDEX "idx_ao_source" ON "appels_offres" USING btree ("source_scraping");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_doc_entreprise_piece" ON "documents_entreprise" USING btree ("entreprise_id","piece_id");--> statement-breakpoint
CREATE INDEX "idx_entreprises_telephone" ON "entreprises" USING btree ("telephone");--> statement-breakpoint
CREATE INDEX "idx_entreprises_ville" ON "entreprises" USING btree ("ville");--> statement-breakpoint
CREATE INDEX "idx_entreprises_plan" ON "entreprises" USING btree ("plan");--> statement-breakpoint
CREATE INDEX "idx_entreprises_actif" ON "entreprises" USING btree ("actif");--> statement-breakpoint
CREATE INDEX "idx_equipe_soumission" ON "equipe_projet" USING btree ("soumission_id");--> statement-breakpoint
CREATE INDEX "idx_equipe_entreprise" ON "equipe_projet" USING btree ("entreprise_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_matching_unique" ON "matchings" USING btree ("entreprise_id","appel_offre_id");--> statement-breakpoint
CREATE INDEX "idx_matching_score" ON "matchings" USING btree ("score_total");--> statement-breakpoint
CREATE INDEX "idx_materiel_soumission" ON "materiel_projet" USING btree ("soumission_id");--> statement-breakpoint
CREATE INDEX "idx_materiel_entreprise" ON "materiel_projet" USING btree ("entreprise_id");--> statement-breakpoint
CREATE INDEX "idx_notif_entreprise" ON "notifications" USING btree ("entreprise_id");--> statement-breakpoint
CREATE INDEX "idx_notif_envoye" ON "notifications" USING btree ("envoye");--> statement-breakpoint
CREATE INDEX "idx_photo_visite" ON "photos_terrain" USING btree ("visite_id");--> statement-breakpoint
CREATE INDEX "idx_pieces_soumission" ON "pieces_soumission" USING btree ("soumission_id");--> statement-breakpoint
CREATE INDEX "idx_soumission_statut" ON "soumissions" USING btree ("statut");--> statement-breakpoint
CREATE INDEX "idx_soumission_entreprise" ON "soumissions" USING btree ("entreprise_id");--> statement-breakpoint
CREATE INDEX "idx_visite_soumission" ON "visites_terrain" USING btree ("soumission_id");