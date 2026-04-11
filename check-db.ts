import { db } from './src/database/client'
import { sql } from 'drizzle-orm'

async function checkCols() {
  try {
    const res = await db.execute(sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'soumissions';
    `)
    console.log("Columns in 'soumissions':")
    console.log(JSON.stringify(res.rows, null, 2))
    
    const res2 = await db.execute(sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'appels_offres';
    `)
    console.log("Columns in 'appels_offres':")
    console.log(JSON.stringify(res2.rows, null, 2))
  } catch (e) {
    console.error(e)
  }
}

checkCols()
