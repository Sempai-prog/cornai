import { db } from './src/database/client'
import { sql } from 'drizzle-orm'

async function debugRaw() {
  const query = `
    select "soumissions"."id", "soumissions"."entreprise_id", "soumissions"."appel_offre_id", "soumissions"."score_conformite", "soumissions"."checklist", "soumissions"."bloquants", "soumissions"."offre_technique_url", "soumissions"."offre_financiere_url", "soumissions"."montant_offre", "soumissions"."montant_recommande", "soumissions"."marge_estimee_pourcent", "soumissions"."statut", "soumissions"."date_depot", "soumissions"."resultat", "soumissions"."raison_rejet", "soumissions"."rang_classement", "soumissions"."date_notification_attribution", "soumissions"."date_ordre_service", "soumissions"."caution_bonne_execution", "soumissions"."cout_total_dossier", "soumissions"."notes", "soumissions"."created_at", "soumissions"."updated_at", "soumissions_appelOffre"."data" as "appelOffre" from "soumissions" "soumissions" left join lateral (select json_build_array("soumissions_appelOffre"."id", "soumissions_appelOffre"."numero_marche", "soumissions_appelOffre"."numero_avis", "soumissions_appelOffre"."institution", "soumissions_appelOffre"."direction", "soumissions_appelOffre"."mo_telephone", "soumissions_appelOffre"."mo_email", "soumissions_appelOffre"."titre_complet", "soumissions_appelOffre"."resume", "soumissions_appelOffre"."type_marche", "soumissions_appelOffre"."sous_type", "soumissions_appelOffre"."secteur", "soumissions_appelOffre"."est_alloti", "soumissions_appelOffre"."lots", "soumissions_appelOffre"."budget_estime", "soumissions_appelOffre"."source_financement", "soumissions_appelOffre"."caution_soumission_montant", "soumissions_appelOffre"."monnaie", "soumissions_appelOffre"."date_publication", "soumissions_appelOffre"."date_limite_soumission", "soumissions_appelOffre"."date_ouverture_plis", "soumissions_appelOffre"."delai_execution", "soumissions_appelOffre"."visite_obligatoire", "soumissions_appelOffre"."visite_date", "soumissions_appelOffre"."visite_lieu", "soumissions_appelOffre"."lieu_execution", "soumissions_appelOffre"."region_execution", "soumissions_appelOffre"."ville_execution", "soumissions_appelOffre"."lieu_depot", "soumissions_appelOffre"."mode_evaluation", "soumissions_appelOffre"."seuil_technique_eliminatoire", "soumissions_appelOffre"."criteres_evaluation", "soumissions_appelOffre"."pieces_requises", "soumissions_appelOffre"."criteres_eliminatoires", "soumissions_appelOffre"."mode_passation", "soumissions_appelOffre"."finance_par_bailleur", "soumissions_appelOffre"."bailleur", "soumissions_appelOffre"."source_scraping", "soumissions_appelOffre"."url_source", "soumissions_appelOffre"."date_scraping", "soumissions_appelOffre"."fiabilite_extraction", "soumissions_appelOffre"."donnees_brutes", "soumissions_appelOffre"."dao_pdf_url", "soumissions_appelOffre"."statut", "soumissions_appelOffre"."attributaire_nom", "soumissions_appelOffre"."attributaire_montant", "soumissions_appelOffre"."created_at", "soumissions_appelOffre"."updated_at") as "data" from (select * from "appels_offres" "soumissions_appelOffre" where "soumissions_appelOffre"."id" = "soumissions"."appel_offre_id" limit $1) "soumissions_appelOffre") "soumissions_appelOffre" on true where "soumissions"."id" = $2 limit $3
  `
  const params = [1, "74a24c7f-d42a-4843-9aab-29a9ad66e2cf", 1]
  
  try {
    const res = await db.execute(sql.raw(query.replace('$1', '1').replace('$2', "'74a24c7f-d42a-4843-9aab-29a9ad66e2cf'").replace('$3', '1')))
    console.log("Success!")
  } catch (e: any) {
    console.error("RAW ERROR:", e.message)
    console.error("HINT:", e.hint)
  }
}

debugRaw()
