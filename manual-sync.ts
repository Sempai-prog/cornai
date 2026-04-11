import { db } from './src/database/client'
import { sql } from 'drizzle-orm'

async function sync() {
  try {
    console.log("Adding missing columns to 'soumissions'...")
    await db.execute(sql.raw(`
      ALTER TABLE "soumissions" 
      ADD COLUMN IF NOT EXISTS "avancement_admin" integer DEFAULT 0,
      ADD COLUMN IF NOT EXISTS "avancement_tech" integer DEFAULT 0,
      ADD COLUMN IF NOT EXISTS "avancement_financier" integer DEFAULT 0;
    `))
    console.log("Success!")
  } catch (e) {
    console.error(e)
  }
}

sync()
