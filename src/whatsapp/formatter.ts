// ══════════════════════════════════════════
// CORNAi — Formattage WhatsApp (Bold, Italics, Emojis)
// ══════════════════════════════════════════

import { formatFCFA, joursRestants } from '../lib/utils'

/**
 * Message de bienvenue au premier contact
 */
export function formatBienvenue() {
  return `👋 *Bienvenue sur CORNAi !* 🌽

Je suis ton assistant personnel pour les *Marchés Publics au Cameroun*.

Je t'aide à :
✅ Trouver les appels d'offres qui correspondent à ton entreprise.
✅ Vérifier tes documents administratifs.
✅ Répondre à tes questions sur la réglementation (ARMP).

Pour commencer, j'ai besoin de créer ton profil professionnel. Ça prend 2 minutes.

On y va ? Tape *COMMENCER* ou n'importe quel message.`
}

/**
 * Message d'instruction selon l'étape d'inscription
 */
export function formatInscriptionPrompt(etape: string) {
  switch (etape) {
    case 'inscription_nom':
      return `🏢 *Étape 1/4 : Identité*
      
Quel est le *nom officiel* de ton entreprise ?`
    
    case 'inscription_secteur':
      return `🔧 *Étape 2/4 : Secteur d'activité*

Dans quel secteur travailles-tu principalement ? (Réponds par le chiffre)

1️⃣ BTP & Construction
2️⃣ Fournitures & Informatique
3️⃣ Services (nettoyage, gardiennage...)
4️⃣ Conseil & Prestations Intellectuelles
5️⃣ Santé & Produits Pharmaceutiques
6️⃣ Transport & Logistique
7️⃣ Autre`

    case 'inscription_budget':
      return `💰 *Étape 3/4 : Capacité financière*

Quel est le montant MAXIMUM de marché que tu peux gérer ?

1️⃣ Moins de 5 millions FCFA
2️⃣ 5 - 15 millions
3️⃣ 15 - 50 millions
4️⃣ 50 - 200 millions
5️⃣ Plus de 200 millions`

    case 'inscription_region':
      return `📍 *Étape 4/4 : Zone géographique*

Dans quelle région exerces-tu principalement ?

1️⃣ Centre (Yaoundé)
2️⃣ Littoral (Douala)
3️⃣ Ouest
4️⃣ Nord-Ouest / Sud-Ouest
5️⃣ Nord / Extrême-Nord / Adamaoua
6️⃣ Sud / Est
7️⃣ Tout le Cameroun`

    default:
      return "Désolé, je suis perdu dans l'inscription. Recommençons."
  }
}

/**
 * Notification d'un matching positif
 */
export function formatMatchNotification(ao: any, matching: any) {
  const score = matching.scoreTotal ?? 0
  const color = score >= 80 ? '🟢' : score >= 60 ? '🟡' : '🔴'
  const jours = joursRestants(ao.dateLimiteSoumission)
  
  return `${color} *Nouvelle Opportunité — Score ${score}%*

📋 ${ao.titreComplet.substring(0, 150)}...
🏛️ ${ao.institution}
💰 Budget : ${formatFCFA(Number(ao.budgetEstime || 0))}
📅 Deadline : ${ao.dateLimiteSoumission ? new Date(ao.dateLimiteSoumission).toLocaleDateString('fr-FR') : 'Non précisée'} (${jours} jours)
📍 ${ao.lieuExecution || 'Inconnu'}

✅ *Pourquoi ce match ?*
• Secteur compatible ${matching.scoreSecteur >= 30 ? '✅' : '⚠️'}
• Budget dans ta capacité ${matching.scoreBudget >= 20 ? '✅' : '⚠️'}
• Zone couverte ${matching.scoreLocalisation >= 15 ? '✅' : '⚠️'}

👉 Tape *1* pour l'analyse IA complète
👉 Tape *2* pour la checklist documents
👉 Tape *3* pour voir l'offre suivante`
}

/**
 * Détail complet d'un AO
 */
export function formatAODetail(ao: any) {
  return `🧐 *Détail de l'Offre — ${ao.numeroMarche || 'N° non défini'}*

🏛️ *Administration* : ${ao.institution}
📋 *Objet* : ${ao.titreComplet}
💰 *Estimation* : ${formatFCFA(Number(ao.budgetEstime || 0))}
📅 *Dépôt limite* : ${ao.dateLimiteSoumission ? new Date(ao.dateLimiteSoumission).toLocaleString('fr-FR') : 'Non défini'}
📍 *Lieu* : ${ao.lieuExecution}

⚠️ *Points critiques détectés par l'IA* :
${ao.criteresEliminatoires ? '• ' + ao.criteresEliminatoires.join('\n• ') : 'Aucun critère éliminatoire spécifique détecté.'}

📂 *Mode de passation* : ${ao.modePassation || "Appel d'Offre Ouvert"}

👉 Tape *CHECKLIST* pour voir les pièces à fournir.
👉 Tape *RETOUR* pour revenir aux résultats.`
}
