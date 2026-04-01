# Guide du Système de Design : CORNAi (Phase D1.5 — Quiet Design)

> [!IMPORTANT]
> **[DIRECTIVE DE CONTEXTE ABSOLUE]**
> Avant d'écrire la moindre ligne de code, tu DOIS lire le fichier `dashboard_recomposition_specs.md` (règles strictes : radius 4px, densité, bordures 1px) et parcourir les documents du dossier `knowledge_base`. L'interface DOIT utiliser le vocabulaire exact du Code des Marchés Publics camerounais (**ARMP, MINMAP, CIPM, COLEPS, ANR, RPAO, BPU, DQE**).

Ce document définit l'ADN chromatique et opérationnel de CORNAi. Le passage du Mode Nuit (Deep Night) au Mode Jour (Clinical Light) doit maintenir une densité opérationnelle identique, adaptée à la rigueur des procédures de passation de marchés publics au Cameroun.

---

## 1. Les Fondations (Surfaces & Plans)

Le "Quiet Design" repose sur une hiérarchie de plans minimisant le bruit visuel pour favoriser le traitement de données denses (BPU, DQE, RPAO).

### 🌑 Mode Nuit (Deep Night)
*   **Surface (Fond de page)** : `#0a0a0b` — Un noir "encre" profond.
*   **Fond de Grille (GlobalGridBackground)** : Grille de **`16px`** subtile en **`stroke-[#ffffff]/[0.02]`**.
*   **Plan 1 (Cartes/Sidebar)** : `#0c0c0c` — Séparation par contraste de gris profond.
*   **Bordures Universelles** : `border-white/5` — Finesse chirurgicale (1px).

### ☀️ Mode Jour (Clinical Light)
*   **Surface (Fond de page)** : `#f4f5f7` — Un gris technique "clinique", pas de blanc pur.
*   **Fond de Grille (GlobalGridBackground)** : Grille de **`16px`** subtile en **`stroke-[#000000]/[0.03]`**.
*   **Plan 1 (Cartes/Sidebar)** : `#ffffff` — Élévation par brillance pure.
*   **Bordures Universelles** : `border-black/5` — Séparation douce pour la lecture des DAO.

---

## 2. Vocabulaire & Sémantique Métier (Cameroon Procurement)

L'interface doit refléter l'expertise légale :
- **Appels d'Offres (AAO)** : Toujours mentionner la référence COLEPS ou ARMP.
- **Offre Financière** : Distinction nette entre le **BPU** (Prix Unitaires) et le **DQE** (Détail Quantitatif).
- **Conformité Administrative** : Usage strict du terme **Dossier de Consultation (DCE)** ou **DAO**.
- **Acteurs** : **CIPM** (Commission Interne), **RPA** (Représentant de l'Autorité).

---

## 3. Hiérarchie des Textes (Typography Logic)

| Niveau | Role | Mode Nuit | Mode Jour |
| :--- | :--- | :--- | :--- |
| **Primaire** | Titres (AAO, DQE) | `#f8fafc` | `#0f172a` |
| **Secondaire** | Meta-données COLEPS | `#94a3b8` | `#475569` |
| **Labels Tech** | **RPAO, BPU, ANR** | `#25D366` | `#16a34a` (Bold 600) |
| **Alertes Scrutin** | Défaut de Caution | `#ef4444` | `#dc2626` |

---

## 4. Composants Thématiques

### Theme-Toggle (Sélecteur Nuit/Jour)
*   **Morphologie** : Jumeau du **Panel-Toggle**. Micro-cercle (**`h-6 w-6`**) avec icône adaptable (Soleil/Lune).
*   **Transition** : Rotation de **360°** en **500ms** avec changement chromatique global instantané pour éviter le flash blanc (Next-Themes `dark:` mode).

### GlobalGridBackground (La Trame Technique)
*   **Raison d'être** : Rappeler le papier millimétré des dossiers techniques de génie civil et de fournitures.
*   **Implémentation** : Masque de fond en `fixed` ou `absolute inset-0`, avec `opacity-20` et un motif de répétition linéaire ultra-léger.

---

## 5. États Interactifs & Transitions

### Survol (Hover)
*   **Nuit** : Background `bg-white/[0.04]`, Border `border-white/10`.
*   **Jour** : Background `bg-black/[0.02]`, Border `border-black/10`.

### Cinématique
Le changement de thème doit être une expérience "Quiet" : 
- **Transition** : `all 500ms cubic-bezier(0.4, 0, 0.2, 1)`.
- **Z-Index** : La grille de fond reste sous le Plan 1 mais au-dessus de la Surface de base pour créer une profondeur sans ombre.

---

> [!IMPORTANT]
> Chaque nouvelle page ou module (Gestion des DQE, Suivi ARMP, Plateforme COLEPS) doit impérativement hériter de ces jetons de design. Aucun écart n'est toléré pour maintenir l'aspect premium et pro de CORNAi.

