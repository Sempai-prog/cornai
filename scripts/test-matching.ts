// ══════════════════════════════════════════
// CORNAi — Test Matching Engine
// ══════════════════════════════════════════

import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import { createEntreprise, getEntreprisesActives } from '../src/database/queries/entreprise'
import { matcherTousLesAO } from '../src/matching/profile-matcher'
import { formatFCFA } from '../src/lib/utils'

async function testMatching() {
    console.log('\n' + '═'.repeat(50))
    console.log('🌽 CORNAi — Test Matching Engine')
    console.log('═'.repeat(50))

    try {
        // 1. Création d'entreprises de test si elles n'existent pas
        const existing = await getEntreprisesActives()
        
        if (existing.length === 0) {
            console.log(`🏗️ Création d'entreprises de test...`)
            
            await createEntreprise({
                nom: 'Fouda BTP Sarl',
                telephone: '237690112233',
                secteurs: ['travaux'],
                regionsCouvertes: ['Centre', 'Littoral'],
                budgetMaxMarche: 60000000, // 60M
                nbMarchesExecutes: 4,
                actif: true
            })

            await createEntreprise({
                nom: 'Yaoundé IT Services',
                telephone: '237677998877',
                secteurs: ['fournitures', 'services'],
                regionsCouvertes: ['Centre'],
                budgetMaxMarche: 15000000, // 15M
                nbMarchesExecutes: 1,
                actif: true
            })

            await createEntreprise({
                nom: 'Africa Consulting Group',
                telephone: '237699112233',
                secteurs: ['prestations_intellectuelles'],
                regionsCouvertes: ['Toutes'],
                budgetMaxMarche: 100000000, // 100M
                nbMarchesExecutes: 10,
                actif: true
            })

            console.log('✅ 3 entreprises créées.')
        }

        const entreprisesAMatcher = await getEntreprisesActives()

        // 2. Lancer le matching
        for (const pme of entreprisesAMatcher) {
            console.log(`\n👨‍⚖️ Matching pour ${pme.nom}...`)
            const matches = await matcherTousLesAO(pme.id)
            
            if (matches.length === 0) {
                console.log(`❕ Aucun match trouvé pour ${pme.nom}.`)
                continue
            }

            console.log(`🎯 Top matches :`);
            (matches as any[]).forEach((m, i) => {
                const score = m.scoreTotal ?? 0
                const color = score >= 80 ? '🟢' : score >= 60 ? '🟡' : '🔴'
                const ao = m.appelOffre
                const details = m.details as any
                console.log(`   #${i+1} ${color} ${score}/100 — ${ao.titreComplet.substring(0, 50)}...`)
                console.log(`      Budget: ${formatFCFA(Number(ao.budgetEstime || 0))} FCFA`)
                console.log(`      Recommandation: ${details?.recommandation ?? 'N/A'}`)
                if (i === 0) {
                  // Détail pour le premier
                  console.log(`      Détails : Secteur:${m.scoreSecteur ?? 0}, Budget:${m.scoreBudget ?? 0}, Localisation:${m.scoreLocalisation ?? 0}, Exp:${m.scoreExperience ?? 0}, Docs:${m.scoreDocuments ?? 0}, Délai:${m.scoreDelai ?? 0}`)
                }
            })
        }

        console.log('\n' + '═'.repeat(50))
        console.log('🏁 Matchings terminés !')
        console.log('═'.repeat(50))

    } catch (error: any) {
        console.error(`\n❌ ERREUR MATCHING : ${error.message}`)
    }
}

testMatching().catch(console.error)
