import { db } from './src/database/client'
import { sql } from 'drizzle-orm'

async function check() {
  const tables = ['soumissions', 'appels_offres']
  for (const table of tables) {
    const res = await db.execute(sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = ${table}
    `)
    console.log(`Columns in ${table}:`, res.rows.map(r => r.column_name).join(', '))
  }
}

check()
