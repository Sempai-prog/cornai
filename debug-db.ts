import { db } from './src/database/client';
import { entreprises, soumissions, matchings } from './src/database/schema';
import { eq, desc } from 'drizzle-orm';

async function test() {
  const ID = 'cf83af70-d49b-4a72-8222-201f08a05a8a';
  try {
    console.log('Testing terrain query with ID...');
    const allActive = await db.query.soumissions.findMany({
      where: eq(soumissions.entrepriseId, ID),
      orderBy: [desc(soumissions.createdAt)],
      with: {
        appelOffre: true,
        entreprise: true,
      },
    });
    console.log('Soumissions found:', allActive.length);

    console.log('Testing matchings query with ID...');
    const matchingResults = await db.query.matchings.findMany({
      where: eq(matchings.entrepriseId, ID),
      orderBy: [desc(matchings.scoreTotal)],
      limit: 50,
      with: {
        appelOffre: true
      }
    });
    console.log('Matchings found:', matchingResults.length);
  } catch (err) {
    console.error('ERROR:', err);
  }
  process.exit(0);
}

test();
