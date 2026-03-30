# 🌽 CORNAi — Gagnez vos marchés publics au Cameroun

CORNAi est une plateforme propulsée par l'IA conçue pour aider les PME camerounaises à identifier, analyser et remporter les appels d'offres publics.

## 🚀 Fonctionnalités
- **Veille Stratégique** : Détection automatique des avis d'appels d'offres (ARMP, COLEPS, etc.).
- **Analyse de DAO** : Extraction structurée des critères et pièces requises en quelques minutes.
- **Checklist de Conformité** : Vérification intelligente de votre dossier administratif.
- **Assistance à la Rédaction** : Génération d'offres techniques basées sur votre profil.
- **Intégration WhatsApp** : Recevez des notifications et interagissez avec CORNAi directement sur WhatsApp.

## 🛠️ Stack Technique
- **Frontend** : Next.js 15 (App Router), Tailwind CSS v4, shadcn/ui.
- **Backend** : Hono API, Cloudflare Workers.
- **Database** : Neon (PostgreSQL) avec Drizzle ORM.
- **IA** : Google Gemini 2.5 Flash.
- **Comms** : WhatsApp Business API (via WATI), Resend (Emails).

## 📦 Installation & Setup

1. **Clonage & Dépendances** :
   ```bash
   git clone <repo-url>
   cd cornai
   npm install
   ```

2. **Configuration** :
   Copiez `.env.local.example` vers `.env.local` et remplissez vos clés API.

3. **Base de Données** :
   ```bash
   # Pousser le schéma vers Neon
   ./scripts/push-db.sh
   ```

4. **Lancement** :
   ```bash
   npm run dev
   ```

## 📄 Licence
© 2026 CORNAi. Tous droits réservés. Fait avec ❤️ au Cameroun.
