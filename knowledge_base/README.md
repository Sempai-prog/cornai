# 📚 CORNAi — Knowledge Base

Ce dossier contient le référentiel de connaissances utilisé par CORNAi pour analyser les dossiers d'appel d'offres, vérifier la conformité et répondre aux questions des utilisateurs.

## 📄 Manifeste des fichiers (15 attendus)

1.  **calculs_financiers.json** : Formules et règles pour le chiffrage et les marges.
2.  **cartographie_sources.json** : Liste des sources de scraping (ARMP, COLEPS, JDM, etc.).
3.  **catalogue_des_erreurs_fatale.json** : Liste des erreurs éliminatoires courantes dans les DAO.
4.  **conformite_app.json** : Règles de validation pour les candidatures.
5.  **delais_procedures.json** : Délais légaux pour chaque type de procédure de passation.
6.  **dictionnaire_termes.json** : Glossaire technique et juridique des marchés publics.
7.  **elimination_patterns.json** : Patterns textuels indiquant un critère éliminatoire.
8.  **faq.json** : Questions fréquemment posées avec réponses sourcées (Code des Marchés).
9.  **grilles_notation.json** : Modèles de notation technique (binaire et par points).
10. **matrice_documents_types.json** : Correspondance entre types de marchés et pièces requises.
11. **modeles_soumission.json** : Structures types pour les offres techniques et financières.
12. **parcours_utilisateur.md** : Documentation des flux logic (WhatsApp/Dashboard).
13. **pieces_administratives.json** : Référentiel complet des pièces (émetteur, validité, coût).
14. **schema_extraction_ao.json** : Définition du schéma JSON pour l'IA Gemini.
15. **structure_dao.json** : Architecture type d'un Dossier d'Appel d'Offres standard.

> [!IMPORTANT]
> Copiez ces fichiers dans ce dossier avant de lancer le script de seed :
> `npm run seed` (ou `./scripts/push-db.sh`)
