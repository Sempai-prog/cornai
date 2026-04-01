# Spécifications de Construction — Dashboard CORNAi (Phase D1.7 - Elite Cockpit)

Ce document définit les règles de recomposition structurelle. L'objectif est d'adopter une esthétique "Elite Cockpit" : alignement chirurgical, éradication du bruit visuel et hiérarchie industrielle.

---

## 1. Structure Globale (The Shell)

| Élément | Adaptation CORNAi (Quiet Design V1.6) |
| :--- | :--- |
| **Mode** | **Bi-Adaptive** : Clinical Light (Surgical Grey) & Deep Night. |
| **Radius** | **`rounded-[4px]` (4px)** — Rigueur technique absolue. |
| **Surfaces** | **`bg-background`** / **`bg-card`** — Suppression de l'hexadécimal hardcodé. |
| **Gaps** | **`gap-4` (16px)** ou `gap-px` — Densité opérationnelle. |
| **Bordures** | **`border-border/40`** — Finesse adaptative. En mode clair, l'opacité est augmentée pour le contraste. |
| **Séparation** | Privilégier **`divide-border/40`** aux boîtes individuelles. |
| **Background** | **GlobalGridBackground** — Thème-aware, grille (80px), lueur centrale atténuée (< 20% opacity). |

---

## 2. Architecture & Typographie (Quiet Design Logic)

### Hiérarchie Typographique (Elite Precision)
*   **Titres de Page (H1/H2)** : **`font-semibold`** ou `font-medium` avec `tracking-tight`. Bannir le `font-black` et `font-extrabold`.
*   **Titres de Cartes / Headers** : **`font-semibold`** (text-sm/base). Pas d'italique.
*   **Labels Techniques** : **`text-[10px]`** ou `text-[11px]` en **`font-semibold`**. Garder le `uppercase` et `tracking-[0.2em]`.
*   **Interdiction de l'Italique** : L'italique est **proscrit** pour tous les textes techniques, diagnostics IA et labels. Utiliser l'opacité (`text-foreground/60`) ou le changement de graisse pour signifier la nuance.
*   **Corps de texte** : **`font-light`** (300) ou `font-normal`.

### Sidebar & Navigation
*   **État Actif** : Aucun fond vert. Utiliser **`bg-muted/10`** (ou `bg-white/5` en mode nuit) avec texte contrasté.
*   **Marqueur Actif** : Une simple ligne verticale gauche **`border-l-2 border-primary`**.
*   **Labels** : `text-[10px]` ou `text-[11px]` font-semibold.
*   **Scrollbars** : Mode-aware (sombres en mode clair, claires en mode nuit via `rgba`).

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
- **Metric Ribbon (Fusion Absolue)** : Bloc unique `grid grid-cols-1 md:grid-cols-4` avec `divide-x divide-border/40`.
- Interdiction des cartes séparées ou avec `gap`.
- Bordure extérieure unique `border border-border/40`.
- Valeurs en `font-semibold` ou `font-medium`.

### Plan 3 : Workspace Canonical (Split 8/4)
Toutes les pages internes doivent respecter ce ratio pour l'homogénéité du poste de pilotage.
- **Le Flux (8/12 - Gauche)** : Zone d'action principale (Tableaux, Kanban, Liste). Pas de bordure de carte globale, utiliser des séparateurs horizontaux `border-b border-border/40`.
- **L'Inspecteur (4/12 - Droite)** : `sticky top-6`. Cartes de diagnostic ou filtres. Fond `bg-card/80`.
- **Alignement Chirurgical** : Les titres du Flux et les titres de l'Inspecteur doivent être **parfaitement alignés sur la même ligne horizontale** (baseline) pour éviter tout saut visuel.

---

## 5. Ce qui est supprimé (Éradication du Bruit)
- ❌ **Italique** : Supprimé car il affaiblit la rigueur technique.
- ❌ `font-black` et `font-extrabold`.
- ❌ Tailles `text-[8px]` et `text-[9px]` (sauf cas exceptionnel de métadonnées).
- ❌ Décalages de baseline entre les colonnes du workspace.

---

## 6. Composants Spécifiques (UI Utilities)

### Panel-Toggle (Contrôleur de Rétractation) 
Indispensable pour basculer entre le mode "Triage" et le mode "Focus Analyse".

*   **Design & Morphologie** : 
    - Micro-bouton circulaire (**`h-6 w-6`**), fond **`bg-background`**, bordure **`1px border-border/40`**.
    - Positionnement stratégique : **`absolute -left-3 top-1/2 -translate-y-1/2`**, à cheval sur la ligne de séparation.
    - Style premium : **`shadow-xl`** pour détacher le bouton du plan et **`group`** pour les interactions d'enveloppe.
*   **Cinématique & Transitions** :
    - Transition fluide de **500ms** (**`duration-500`**) avec un easing **`ease-in-out`**.
    - Rotation d'icône dynamique (**`rotate-180`**) pour signifier le sens d'action du workflow.
    - Feedback au survol : Changement de couleur vers la **`primary`** (vert) pour le texte et la bordure (**`border-primary/40`**).
*   **Intelligence & Tooltips** :
    - Tooltip flottant (**`text-[9px] font-bold`**) apparaissant à **`left-8`** au survol.
    - Texte contextuel : "Fermer Filtres" ou "Ouvrir Filtres" selon l'état `isSidebarOpen`.
    - Masquage intelligent sur mobile (**`md:flex hidden`**) pour prioriser la surface de lecture.

---

> [!IMPORTANT]
> Cette révision **Quiet Design (V1.6)** est la nouvelle référence absolue. L'interface abandonne tout code couleur hexadécimal au profit des **tokens sémantiques** Tailwind. Le mode **Clinical Light** (Gris Chirurgical) est désormais le standard de jour pour garantir une lisibilité maximale dans les préfectures et administrations.
