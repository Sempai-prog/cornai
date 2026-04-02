// ══════════════════════════════════════════
// SABI — Scraper ARMP.cm
// ══════════════════════════════════════════

import axios from 'axios'
import * as cheerio from 'cheerio'
import { nanoid } from 'nanoid'

export interface RawAO {
  titre: string
  url: string
  datePublication: string
  maitreOuvrage: string
  dateLimite: string
  source: 'armp' | 'coleps' | 'other'
}

const ARMP_BASE_URL = 'https://www.armp.cm'
const ARMP_AO_URL = `${ARMP_BASE_URL}/index.php/fr/avis-d-appels-d-offres`

/**
 * Scraper principal pour ARMP
 */
export async function scrapeARMP(useMock: boolean = false): Promise<RawAO[]> {
  console.log(`\n🔍 Lancement du scraping ARMP... (Mode: ${useMock ? 'MOCK' : 'LIVE'})`)
  
  if (useMock) {
    return generateMockAO()
  }

  try {
    const response = await axios.get(ARMP_AO_URL, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    const $ = cheerio.load(response.data)
    const results: RawAO[] = []

    // Sélecteurs basés sur la structure typique Joomla/ARMP (à ajuster si nécessaire)
    // On cherche les lignes de tableau ou les articles
    $('.category-list tbody tr, .article-list .item').each((i, el) => {
      const titre = $(el).find('a').text().trim() || $(el).find('.title').text().trim()
      const path = $(el).find('a').attr('href')
      const url = path ? (path.startsWith('http') ? path : `${ARMP_BASE_URL}${path}`) : ''
      
      // Extraction simplifiée des métadonnées
      // Souvent dans des <td> ou des spans
      const cells = $(el).find('td')
      const datePublication = $(cells[2]).text().trim() || new Date().toISOString()
      const maitreOuvrage = $(cells[1]).text().trim() || 'Inconnu'
      const dateLimite = $(cells[3]).text().trim() || ''

      if (titre && url) {
        results.push({
          titre,
          url,
          datePublication,
          maitreOuvrage,
          dateLimite,
          source: 'armp'
        })
      }
    })

    console.log(`✅ Scraper : ${results.length} AO trouvés sur ARMP.cm`)
    return results
  } catch (error: any) {
    console.error(`❌ Erreur réseau ARMP: ${error.message}`)
    console.log('💡 Passage en mode MOCK par défaut pour continuer le développement...')
    return generateMockAO()
  }
}

/**
 * Données de test réalistes (Cameroun)
 */
function generateMockAO(): RawAO[] {
  const regions = ['Centre', 'Littoral', 'Ouest', 'Nord', 'Sud-Ouest', 'Adamaoua']
  const ministeres = [
    'MINTP (Ministère des Travaux Publics)',
    'MINMAP (Ministère des Marchés Publics)',
    'MINEE (Ministère de l\'Eau et de l\'Énergie)',
    'MINESEC (Ministère des Enseignements Secondaires)',
    'CUD (Communauté Urbaine de Douala)',
    'CUY (Communauté Urbaine de Yaoundé)'
  ]

  const templates = [
    { titre: "Travaux de construction d'un pont sur la rivière Nyong", cat: "BTP" },
    { titre: "Fourniture de matériel informatique et serveurs", cat: "Informatique" },
    { titre: "Entretien routier du tronçon Yaoundé-Bafoussam", cat: "BTP" },
    { titre: "Études techniques pour l'électrification rurale de Mbalmayo", cat: "Prestations Intellectuelles" },
    { titre: "Fourniture de mobilier de bureau pour les délégations régionales", cat: "Fournitures" },
    { titre: "Audit financier et comptable de la société d'État", cat: "Audit" },
    { titre: "Curage des caniveaux et assainissement urbain", cat: "Services" },
    { titre: "Construction de 10 salles de classe à l'école publique de Maroua", cat: "BTP" },
    { titre: "Acquisition de 5 véhicules de type 4x4 tout-terrain", cat: "Fournitures" },
    { titre: "Mise en place d'un système de gestion électronique des documents", cat: "Informatique" }
  ]

  return templates.map((t, i) => {
    const dateLimit = new Date()
    dateLimit.setDate(dateLimit.getDate() + 15 + i)
    
    return {
      titre: `AO N°0${i+1}/${t.cat}/${ministeres[i % ministeres.length]?.split(' (')[0]}/${new Date().getFullYear()} : ${t.titre}`,
      url: `${ARMP_BASE_URL}/mock-ao-${nanoid(8)}`,
      datePublication: new Date().toLocaleDateString('fr-FR'),
      maitreOuvrage: ministeres[i % ministeres.length]!,
      dateLimite: dateLimit.toLocaleDateString('fr-FR'),
      source: 'armp'
    }
  })
}
