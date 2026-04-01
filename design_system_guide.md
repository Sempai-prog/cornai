# CORNAi Quiet Design — Système de Design V1.6 (Phase D1.6)

Ce guide définit les standards visuels et techniques pour l'implémentation du **Quiet Design** de CORNAi. Ce système privilégie la **densité opérationnelle**, la **clarté typographique** et une esthétique **"Deep Night"** minimaliste, sans bruit visuel.

---

## 🎨 Palette Chromatique (Thématisation Sémantique)

L'interface utilise des variables CSS (`--background`, `--foreground`, etc.) pour supporter nativement les modes Clair et Sombre.

### 🌑 Mode Sombre (Deep Night)
*   **Fond principal (`--background`)**: `#0a0a0b` (Matte pur, évite le bleu/gris profond standard).
*   **Cartes & Insets (`--card`)**: `#111112` (ou `bg-card/40` avec backdrop-blur).
*   **Bordures (`--border`)**: `rgba(255, 255, 255, 0.05)` (Extrêmement subtile).
*   **Accents (`--primary`)**: `#25D366` (Vert CORNAi, haute saturation, utilisé avec parcimonie).

### ☀️ Mode Clair (Clinical Light)
*   **Fond principal (`--background`)**: `#fcfcfd` (Gris clinique ultra-clair).
*   **Cartes & Insets (`--card`)**: `#ffffff`.
*   **Bordures (`--border`)**: `rgba(0, 0, 0, 0.05)`.
*   **Accents**: Identiques au mode sombre.

---

## 📐 Structure & Géométrie

### 1. Border Radius (Règle d'Or)
*   **Standard Universel**: `4px` (`rounded-[4px]`). 
*   **Interdiction**: Pas de `rounded-lg`, `rounded-xl` ou `rounded-full` (sauf pour les icônes circulaires ou avatars).
*   **Checkboxes**: `2px` (`rounded-[2px]`).

### 2. Bordures & Séparateurs
*   **Épaisseur**: Toujours `1px`.
*   **Opacité**: `5%` par défaut (`border-black/5` ou `border-white/5`).
*   **Effet "Card-in-Card"**: Éviter les empilements de bordures. Utilser le `divide-y` avec une opacité très basse pour les listes.

---

## ✍️ Typographie & Densité

Le système est conçu pour des utilisateurs traitant des volumes massifs de données (Analystes Marchés, Chefs d'Entreprise).

### 1. Hiérarchie
*   **H1 / H2**: `font-medium`, `tracking-tight`. Jamais de `font-black` ou `font-extrabold`.
*   **Labels / Meta-data**: `text-[10px]` ou `text-[11px]`. **Minimum absolu: 10px.**
*   **Corps de texte**: `text-[13px]` (Standard SaaS moderne).

### 2. Labels & Étiquettes
*   **Style**: `font-semibold`, `uppercase`, `tracking-[0.1em]`.
*   **Opacité**: Les labels secondaires doivent être à `text-foreground/40` ou `text-foreground/20`.

---

## ⚙️ Composants Signature

### 1. GlobalGridBackground
*   Fondation technique composée d'une grille matte (`opacity-[0.02]`) et d'un spotlight dynamique (`radial-gradient`) suivant la souris.
*   *Z-index*: `-50`.

### 2. Panel-Toggle
*   Bouton flottant circulaire (`h-6 w-6`) positionné à cheval sur les bordures de séparation.
*   Action: Rétraction fluide de la sidebar de recherche.

---

## 👔 Terminologie Métier (Cameroun - ARMP)

Toute l'UI doit utiliser le vocabulaire exact du Code des Marchés Publics camerounais :
*   **ARMP** (Agence de Régulation des Marchés Publics).
*   **MINMAP** (Ministère des Marchés Publics).
*   **COLEPS** (Commission Locale de Passation des Marchés).
*   **RPAO** (Règlement Particulier de l'Appel d'Offres).
*   **DTAO** (Dossier Type d'Appel d'Offres).
*   **BPU / DQE** (Bordereau des Prix Unitaires / Devis Quantitatif Estimatif).
*   **Caution de Soumission**: Doit être mise en avant pour les PME.

---

## 🛠️ Instructions de Mise à Jour (Checklist)

Pour chaque nouveau module ou refactor :
1. ✅ Vérifier que toutes les couleurs hardcodées (`bg-zinc-900`, etc.) sont remplacées par des tokens thème (`bg-card/40`, `border-border/40`).
2. ✅ S'assurer que le radius est strictement à `4px`.
3. ✅ Supprimer les ombres portées lourdes (`shadow-lg`, etc.). Utiliser `shadow-sm` ou rien du tout.
4. ✅ Valider le contraste en mode Clair ET Sombre.
