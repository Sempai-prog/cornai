# Spécifications de Construction — Dashboard CORNAi (Phase D1.5 - Quiet Design)

Ce document définit les règles de recomposition structurelle du dashboard CORNAi. L'objectif est d'adopter une esthétique "Quiet Design" : dense mais apaisée, ultra-lisible et sophistiquée.

---

## 1. Structure Globale (The Shell)

| Élément | Adaptation CORNAi (Quiet Design) |
| :--- | :--- |
| **Radius** | **`rounded-[4px]` (4px)** — Rigueur technique. |
| **Surfaces** | **Deep Night (`#0a0a0b`)** — Suppression du blanc massif. |
| **Gaps** | **`gap-4` (16px)** ou `gap-px` — Densité opérationnelle. |
| **Bordures** | **`border-white/5`** — Ultra-finesse. Si le fond est déjà distinct (ex: `bg-card/40`), supprimer la bordure extérieure. |
| **Séparation** | Privilégier **`divide-white/5`** aux boîtes individuelles pour éviter l'effet "boîte dans la boîte". |

---

## 2. Architecture & Typographie (Quiet Design Logic)

### Hiérarchie Typographique (Override Premium)
*   **Titres de Page (H1/H2)** : **`font-semibold`** ou `font-medium` avec `tracking-tight`. Bannir le `font-black` et `font-extrabold`.
*   **Titres de Cartes / Headers** : **`font-semibold`** (text-sm/base).
*   **Labels Techniques** : **`text-[10px]`** ou `text-[11px]` en **`font-semibold`** (au lieu de Black). Garder le `uppercase` et `tracking-wider`.
*   **Corps de texte** : **`font-light`** (300) ou `font-normal`.

### Sidebar & Navigation
*   **État Actif** : Aucun fond vert. Utiliser **`bg-white/5`** ou `bg-white/10` avec un texte blanc.
*   **Marqueur Actif** : Une simple ligne verticale gauche **`border-l-2 border-[#25D366]`**.
*   **Labels** : `text-[10px]` ou `text-[11px]` font-semibold.

### Topbar & Contextuel
*   **Breadcrumbs** : Fil d'ariane en **`text-[10px]`** font-semibold tracking-wider.
*   **Indicateurs** : Point pulsatif vert discret.

---

## 3. Gestion de la Couleur (L'Accompagnement Vert)

Le vert CORNAi (**`#25D366`**) doit être une ressource rare :

*   **Actions Primaires (CTAs)** : Conserver le vert plein (**`bg-primary text-black`**) uniquement pour les boutons d'action critique (ex: `+ SOUMETTRE`, `SYNCHRONISER`).
*   **Icônes & Badges** : Utiliser le vert uniquement pour signifier un statut "Validé" ou une icône d'état.
*   **Surfaces** : Interdire les fonds verts fluo massifs.

---

## 4. Architecture en 3 Plans (Recomposition)

### Plan 1 : Header Stratégique (`h-14`)
- Titre sophistiqué en `font-semibold tracking-tight`.
- Métadonnées en `text-[10px] font-semibold text-foreground/40`.

### Plan 2 : Résumé Opérationnel (KPIs)
- **Metric Ribbon (Fusion Absolue)** : Bloc unique `grid grid-cols-1 md:grid-cols-4` avec `divide-x divide-white/5`.
- Interdiction des cartes séparées ou avec `gap`.
- Bordure extérieure unique `border border-white/5`.
- Valeurs en `font-semibold` ou `font-medium`.

### Plan 3 : Workspace (Split 8/4)
- **Flux (8/12)** : Lignes séparées par `border-b border-white/5`. Pas de bordures de cartes.
- **Inspector (4/12)** : Fond `bg-[#0c0c0c]`. Pas de bordure si le fond contraste déjà. Diagnostic IA en `font-light`.

---

## 5. Ce qui est supprimé (Bruit Visuel)
- ❌ `font-black` et `font-extrabold`.
- ❌ Tailles `text-[8px]` et `text-[9px]`.
- ❌ Fonds verts dans la sidebar active.
- ❌ Bordures de cartes quand un fond distinct existe.
- ❌ Whitespace excessif entre éléments d'un même ruban.

---

> [!IMPORTANT]
> Cette révision "Quiet Design" (V1.4) est la nouvelle référence. L'interface doit paraître technique, apaisée et résolument premium.
