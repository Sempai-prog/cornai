import { db } from './src/database/client'
import { sql } from 'drizzle-orm'

async function sync() {
  try {
    console.log("Creating new tables for 'Garage' module...")
    
    await db.execute(sql.raw(`
      CREATE TABLE IF NOT EXISTS "materiel_global" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "entreprise_id" uuid NOT NULL,
        "nom" varchar(255) NOT NULL,
        "type" varchar(50) NOT NULL,
        "marque" varchar(100),
        "modele" varchar(100),
        "immatriculation" varchar(50),
        "date_achat" date,
        "valeur_achat" bigint,
        "disponibilite" boolean DEFAULT true,
        "statut" varchar(20) DEFAULT 'actif',
        "photo_url" text,
        "created_at" timestamp with time zone DEFAULT now()
      );
    `))

    await db.execute(sql.raw(`
      CREATE TABLE IF NOT EXISTS "soumission_engins" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "soumission_id" uuid NOT NULL,
        "engin_id" uuid NOT NULL,
        "role_marche" varchar(255),
        "commentaire" text,
        "created_at" timestamp with time zone DEFAULT now()
      );
    `))

    console.log("Success!")
  } catch (e) {
    console.error(e)
  }
}

sync()
