Parcours Utilisateur Documenté.
RÉSUMÉ EXÉCUTIF
Ce livrable modélise 5 scénarios réels de soumission de bout en bout, en croisant les profils types de PME camerounaises avec les exigences réglementaires exactes extraites des Dossiers Types d'Appel d'Offres (DTAO) et des rapports de l'ARMP. Ces parcours démontrent concrètement la valeur ajoutée de notre intelligence artificielle pour éviter les pièges éliminatoires (vices de forme, critères essentiels non atteints, erreurs de chiffrage) et optimiser les chances de succès.
Voici le JSON structuré des 5 scénarios de parcours utilisateur, prêt à être utilisé pour la conception UX/UI et la formation du modèle de prédiction :
{
  "parcours_utilisateurs_marchespublics_ai": [
    {
      "scenario_1": {
        "titre": "PME BTP soumissionnant à un marché de construction",
        "profil_pme": "BATI-CAM SARL, entreprise de BTP, 5 ans d'expérience, catégorie MINMAP acquise, bonne santé financière mais personnel administratif réduit.",
        "ao_detecte": "Avis d'Appel d'Offres National Ouvert (AONO) pour la construction d'infrastructures (Source: DAOTravaux.pdf, Modèle d'Avis).",
        "score_matching": {
          "score": "85/100",
          "justification": "Forte adéquation sur le Chiffre d'Affaires et les références. Perte de 15 points car le Conducteur des Travaux proposé a un diplôme qui nécessite vérification selon les critères essentiels (Source: Grille d'évaluation Travaux)."
        },
        "analyse_dao": "L'IA identifie une évaluation binaire (Oui/Non). Critères éliminatoires repérés : Absence de l'attestation de visite des lieux, Non-production sous 48h d'une pièce administrative, Absence d'un prix unitaire quantifié (Source: DAOTravaux.pdf, Article 15.1).",
        "checklist_generee": "1. Caution de 2% max (Urgent : Avant ouverture). 2. Attestation de visite de site. 3. Modèle de déclaration de non-abandon de chantier. 4. Pièces fiscales (Attestation de non-redevance).",
        "offre_technique_produite": "Génération de la note méthodologique (Installation de chantier, respect des clauses ESHS) et formatage des CV du personnel clé avec obligation de joindre les copies certifiées des diplômes.",
        "chiffrage_financier": "Saisie dans le Sous-module 41.6. L'IA applique la TVA (19,25%) et le précompte AIR (5,5%), et bloque l'export PDF car la cellule 'Installation de chantier' du BPU était vide (Évitant ainsi une élimination fatale).",
        "resultat": "GAGNÉ",
        "pourquoi": "L'offre était la moins disante parmi celles ayant validé 100% des critères essentiels binaire.",
        "valeur_ajoutee_app": "Sans l'App : La PME aurait laissé la ligne BPU 'Installation chantier' vide (pensant l'offrir) et aurait été éliminée (Source: RPAO Art 15.1). Avec l'App : Blocage préventif et saisie forcée d'un montant (0 FCFA)."
      }
    },
    {
      "scenario_2": {
        "titre": "PME Informatique soumissionnant à un marché de fournitures",
        "profil_pme": "TECH-INNOVA, fournisseur de matériel informatique (PC, Serveurs), soumissionne via COLEPS.",
        "ao_detecte": "Appel d'Offres pour la Fourniture et l'installation de Systèmes d'Information (Source: Avant projet DAO type fourniture et installation des SI ok 21 3 2024.pdf).",
        "score_matching": {
          "score": "70/100",
          "justification": "Bons prix, mais la PME n'a pas uploadé d'Agrément du Fabricant dans son profil."
        },
        "analyse_dao": "Le DAO exige la livraison selon l'Incoterm DAP (Delivered At Place) et l'Agrément/Autorisation du fabricant comme critère éliminatoire strict (Source: DTAOFournLocal.pdf, Article 15.1 et CCTP).",
        "checklist_generee": "1. Autorisation du fabricant (Modèle Annexe 7). 2. Prospectus originaux en couleur. 3. Fichiers convertis en PDF/JPEG de moins de 15 Mo pour COLEPS.",
        "offre_technique_produite": "Génération du Tableau de conformité technique (Spécifications demandées vs Spécifications offertes) et du calendrier de livraison intégrant l'Incoterm DAP.",
        "chiffrage_financier": "Chiffrage sans erreurs arithmétiques dans le Détail Quantitatif et Estimatif (DQE).",
        "resultat": "PERDU (Mais riche en enseignements)",
        "pourquoi": "La PME n'a pas pu obtenir l'autorisation directe du constructeur (HP/Dell) à temps.",
        "valeur_ajoutee_app": "Sans l'App : La PME aurait acheté le DAO à 50 000 FCFA, payé une caution à la banque, pour être éliminée à l'ouverture. Avec l'App : Alerte bloquante à J-10 sur l'Agrément. La PME a économisé son temps et son argent."
      }
    },
    {
      "scenario_3": {
        "titre": "Entreprise de nettoyage soumissionnant à un marché de services",
        "profil_pme": "PROPRETE-CAM, spécialisée dans l'entretien de bâtiments, régime fiscal du Réel (AIR 2,2%).",
        "ao_detecte": "Demande de Cotation (DC) pour l'entretien et le nettoyage des locaux (Source: Avant projet DAO Type_Serv_NonQ_22 2 2024 final ok 20 3 2024.pdf).",
        "score_matching": {
          "score": "95/100",
          "justification": "Correspondance parfaite. Procédure allégée adaptée à la taille de la PME."
        },
        "analyse_dao": "Procédure d'évaluation binaire. Pas de retenue de garantie exigée pour ce marché de services (Source: CCAP Type Services, Article 11.2).",
        "checklist_generee": "1. Attestation de domiciliation bancaire. 2. Attestation CNPS valide. 3. Liste du petit matériel (Balais, aspirateurs, EPI).",
        "offre_technique_produite": "Création automatique du planning d'intervention (Heures de ménage hors horaires de bureau) et de la liste du matériel affecté au site.",
        "chiffrage_financier": "L'App calcule le salaire horaire du personnel en respectant le SMIG (pour éviter l'offre anormalement basse) + marges + TVA.",
        "resultat": "GAGNÉ",
        "pourquoi": "Dossier 100% conforme. La Commission a accordé les 48h de sursis pour la CNPS qui avait expiré la veille du dépôt (Source: RPAO Art 15.1), la PME l'a fournie le lendemain.",
        "valeur_ajoutee_app": "Sans l'App : La PME aurait paniqué pour sa CNPS expirée et n'aurait pas soumissionné. Avec l'App : L'IA lui a notifié son droit réglementaire au délai de grâce de 48h pour les pièces administratives (hors caution)."
      }
    },
    {
      "scenario_4": {
        "titre": "Bureau d'études soumissionnant à une prestation intellectuelle (SPI)",
        "profil_pme": "EXPERT-CONSEIL SUARL, cabinet d'audit et d'études informatiques.",
        "ao_detecte": "AONR pour le renforcement de capacités en cybersécurité au MINPOSTEL (Source: Rapport de synthèse ARMP 2019-2021, N°00000038/LC/MPT...).",
        "score_matching": {
          "score": "88/100",
          "justification": "La PME est sur la liste restreinte (shortlistée). Le score est très élevé."
        },
        "analyse_dao": "Évaluation par points sur 100. Seuil éliminatoire technique fixé à 70/100. Interdiction absolue de glisser des informations financières dans l'offre technique (Source: DTAOAutresSPI.pdf, Article 15.1).",
        "checklist_generee": "1. Formulaire 4A (Lettre de soumission). 2. Tableau 4B (Références). 3. Tableau 4F (CV signés).",
        "offre_technique_produite": "Génération de l'approche méthodologique (Tableau 4D) et du Diagramme d'intervention (Tableau 4G). L'IA signale qu'un expert listé est Fonctionnaire.",
        "chiffrage_financier": "Saisi séparément dans le Volume 3.",
        "resultat": "PERDU",
        "pourquoi": "La PME a ignoré l'alerte de l'IA et a soumis le CV de l'Expert Fonctionnaire sans le 'Document justifiant sa libération de l'Administration'. Conséquence : CV non évalué (0 point), la note technique de la PME a chuté à 65/100, sous le seuil éliminatoire (Source: DTAO SPI, NB évaluation des experts).",
        "valeur_ajoutee_app": "Sans l'App : Incompréhension totale de l'échec. Avec l'App : Le tableau de bord affichait le risque rouge exact. La PME sait désormais qu'elle doit remplacer cet expert à l'avenir."
      }
    },
    {
      "scenario_5": {
        "titre": "Groupement de PME soumissionnant à un gros marché alloti",
        "profil_pme": "Groupement SANTE-PLUS (Mandataire) et MEDI-CAM (Partenaire), spécialisés en distribution médicale.",
        "ao_detecte": "AO pour la Fourniture de Matériel Médical (Lot 1 et Lot 2) (Source: DTAO fournitures MATERIEL MEDICAL ok 21 3 2024.pdf).",
        "score_matching": {
          "score": "92/100",
          "justification": "La capacité financière cumulée des deux PME (Accord de groupement solidaire) permet de couvrir l'exigence du DAO."
        },
        "analyse_dao": "Chaque lot est évalué séparément. Certificat OMS et Autorisation de Mise sur le Marché (AMM) exigés pour CHAQUE article médical (Source: RPAO Art 15.1).",
        "checklist_generee": "1. Accord de groupement notarié. 2. Caution de soumission établie au nom du mandataire ou du groupement. 3. AMM et Certificats OMS pour chaque lot.",
        "offre_technique_produite": "L'IA structure les références croisées des deux entreprises et produit le catalogue coloré exigé.",
        "chiffrage_financier": "Calcul du rabais consenti en cas d'attribution des deux lots (Source: RGAO Article 12.2).",
        "resultat": "GAGNÉ (Sur 1 lot)",
        "pourquoi": "Le groupement a remporté le Lot 1. Le Lot 2 a été attribué à une autre offre moins disante.",
        "valeur_ajoutee_app": "Sans l'App : Le partenaire (MEDI-CAM) aurait émis la caution en son nom propre (Erreur fréquente) et l'offre aurait été rejetée. Avec l'App : Le bot a instruit que pour un groupement, la caution et les Ordres de Service (OS) s'adressent exclusivement au Mandataire (Source: DTAO Médical, Article 12.8)."
      }
    }
  ]
}

💡 Intégration UX (Expérience Utilisateur) dans MarchésPublics.ai
L'application utilisera la donnée structurée de ce JSON pour piloter le bot WhatsApp. Au lieu d'inonder la PME de textes juridiques, le bot adoptera une posture proactive :
Alerte SMS/WhatsApp (J-15) : "Félicitations, vous matchez à 85% avec l'AO de construction de Bandja ! Acceptez-vous que je génère la déclaration de non-abandon ?"
Suivi de conformité (J-5) : "Attention SANTE-PLUS, votre partenaire de groupement n'a pas encore fourni l'Autorisation de Mise sur le Marché. Sans ce document, c'est l'élimination directe (Art. 15.1)."
Bilan post-soumission (Résultat) : L'IA archivera le succès ou l'échec et affinera l'algorithme : si le bureau d'études perd à cause du fonctionnaire non libéré, l'IA marquera ce CV comme "Non Conforme" pour toutes les futures soumissions.