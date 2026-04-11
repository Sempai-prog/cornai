import { db } from './src/database/client'
import { soumissions } from './src/database/schema'
import { eq } from 'drizzle-orm'

async function test() {
  try {
    const id = "74a24c7f-d42a-4843-9aab-29a9ad66e2cf"
    console.log("Testing query for ID:", id)
    const result = await db.query.soumissions.findFirst({
      where: eq(soumissions.id, id),
      with: {
        appelOffre: true
      }
    })
    console.log("Result:", result)
  } catch (error: any) {
    console.error("DEBUG ERROR MESSAGE:", error.message)
    console.error("DEBUG ERROR CODE:", error.code)
    console.error("DEBUG ERROR DETAILS:", error.detail)
  }
}

test()
