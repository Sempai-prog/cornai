# SABI Design Benchmark — Version 1.6 (Elite Cockpit Master)

> **Version :** 1.6.0 (Édition Définitive)
> **Philosophie :** Silent Cockpit — Clinical Light / Deep Night. Zéro Ombre. Zéro Lueur. Géo-précision (4px).
> **Statut :** RÉFÉRENCE ABSOLUE — Toute déviation est un bug. Ce document annule et remplace tous les guides précédents.

---

> [!IMPORTANT]
> **[DIRECTIVE DE CONTEXTE ABSOLUE]**
> L'interface SABI est un poste de pilotage (Cockpit) pour analystes de marchés publics. Elle doit être dense, chirurgicale et utiliser exclusivement le vocabulaire du Code des Marchés Publics camerounais (**ARMP, MINMAP, CIPM, COLEPS, ANR, RPAO, BPU, DQE**).

## 1. ARCHITECTURE GLOBALE (THE SHELL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 1.1 Centralisation Chirurgicale (1400px)
- **Conteneur Maître :** Tout le dashboard est encapsulé dans un `max-w-[1400px] mx-auto w-full`.
- **TopBar Sync :** Le Header global doit avoir une opacité de fond quasi-nulle (`bg-transparent` ou `bg-background/20`) pour fusionner avec la surface.
- **Vertical Flow :** Aucun décalage entre la TopBar (logo/search) et le contenu principal. Le `pt-5` du layout assure un gap vertical de **32px** synchronisé avec la grille.

### 1.2 La Règle du "Single Layer" (Atomic Inset)
- Les contenus (tables, listes, formulaires) se posent DIRECTEMENT sur le fond de page (`--background`).
- ❌ **INTERDIT :** Une carte enveloppante (wrapper) contenant d'autres cartes. Pas de "Plan 2".
- ✅ **CORRECT :** Chaque bloc est une unité autonome (`bg-card`) posée sur le `bg-background`.

---

## 2. FONDATIONS VISUELLES & GÉOMÉTRIE

### 2.1 Le Standard 4px (rounded-sabi)
- **Radius Universel :** `4px` (`rounded-sabi`) sur TOUS les éléments structurels (cartes, boutons, inputs, insets).
- **Exceptions :** Checkboxes (`2px`), Dots de statut (`rounded-full`).
- ❌ **PROSCRIT :** `rounded-lg`, `rounded-xl`, `rounded-2xl`.

### 2.2 Éradication du Bruit (Silent Design)
- **ZÉRO Ombre :** `shadow-none` sur toutes les surfaces. La profondeur est gérée par le contraste (`bg-card` sur `bg-background`).
- **ZÉRO Lueur :** Aucune classe `glow`, `blur-*`, `shadow-primary`.
- **ZÉRO Gradient :** Aucun dégradé. Utilisation exclusive de couleurs plates ou d'opacités (`/5`, `/10`, `/20`).
- **Bordures :** Toujours `1px solid var(--border)` avec une opacité de **5%** (`white/5` en nuit, `black/5` en jour).

---

## 3. SURFACES & PALETTE SÉMANTIQUE

| Token | Rôle | Mode Nuit (Deep Night) | Mode Jour (Clinical Light) |
|-------|------|------------------------|---------------------------|
| `bg-background` | Fond de page | `#0a0a0b` | `#fcfcfd` |
| `bg-card` | Surface composant | `#111112` | `#ffffff` |
| `bg-muted` | Fond secondaire | `white/5` | `black/5` |
| `text-primary` | Accent (Vert SABI) | `#25D366` | `#16a34a` |
| `text-foreground`| Texte principal | `#f8fafc` | `#0f172a` |
| `border-border` | Bordure | `rgba(255,255,255, 0.05)` | `rgba(0,0,0, 0.05)` |

---

## 4. TYPOGRAPHIE HAUTE DENSITÉ

### 4.1 Hiérarchie des Titres
- **Titre de Page (H1) :** `text-4xl font-extrabold tracking-tighter`. **Sentence Case obligatoire**. Impact chirurgical, sans l'agressivité du tout-majuscule.
- **Détails & Metadata :** `text-[12px] font-bold text-muted-foreground/40`.
- **Titre de Module (H3) :** `text-xs font-bold font-sabi uppercase tracking-widest`.
- **KPI Chiffrés :** `tabular-nums font-extrabold text-3xl tracking-tighter`.
- **Labels (Données) :** `text-[11px] font-bold text-muted-foreground/30`. (Utilisation de l'opacité pour hiérarchiser).

### 4.2 Micro-Typographie
- **Badge Statut :** `text-[8px] font-bold uppercase tracking-tight`.
- **Note / Légende :** `text-[9px] italic opacity-40`. (L'italique est réservé uniquement aux notes discrètes).

---

## 5. COMPOSANTS DE RÉFÉRENCE (ELITE)

### 5.1 Grille Bento (Standard gap-8)
- Tous les modules utilisent un espacement de **32px** (`gap-8`).
- **Items-Stretch :** Toutes les cartes d'une même rangée doivent avoir la même hauteur.

### 5.2 Système d'Onglets (Tabs)
- **Conteneur :** `bg-card border border-border p-1.5 rounded-sabi flex gap-1`.
- **Item Actif :** `bg-muted/50 border-border text-foreground rounded-sabi`.
- **Status Dot :** `size-[6px]` ou `size-[8px]` à côté du label.
  - Conforme : `#25D366` | Review/Warning : `#f59e0b` | Erreur : `#ef4444`.

### 5.3 Panneaux d'Audit (AlertPanel)
- **Style :** `bg-[color]/5 border-l-2 border-[color] py-3 px-4 rounded-sabi`.
- Pas d'icône décorative. Priorité au texte brut et à la source légale.

---

## 6. CHECKLIST DE CONFORMITÉ (QA)
1. ☐ **Layout :** Le dashboard est-il centré à 1400px via `max-w-[1400px] mx-auto` ?
2. ☐ **Radius :** Est-ce que TOUT est à `4px` (`rounded-sabi`) ?
3. ☐ **Shadows :** Est-ce que toutes les ombres ont été supprimées ?
4. ☐ **Gradients :** Est-ce que l'interface est 100% plate ?
5. ☐ **Grid :** Les modules asymétriques utilisent-ils `gap-8` ?
6. ☐ **Copy :** Le vocabulaire ARMP/COLEPS est-il respecté ?

---
---

## 7. LE HEADER "SILENT COCKPIT" (COMPOSANT MAÎTRE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 7.1 Intégration Plate (Flat Inset)
- **Fond :** `bg-transparent`. Aucune couleur de fond sur le header.
- **Bordure :** `border-b border-border/10`. Une ligne de séparation chirurgicale.
- **Padding :** `px-0 pt-0 pb-6`. Alignement parfait avec le bord supérieur du viewport.
- **Marge Basse :** `mb-6`. Transition fluide vers le contenu Bento.

### 7.2 Architecture Dual-Square (High Density)
- **Métriques :** Utilisation de cartes parfaitement carrées (`size-36`).
- **Composants d'une carte :**
    - **Accent :** Barre de couleur sémantique (`h-[1.5px]`).
    - **Label :** `text-[11px] font-bold` (très discret).
    - **Valeur :** `text-3xl font-bold tracking-tighter`.
    - **Subtext :** `text-[10px] font-medium` (tonalité sémantique).
- **Semantique :** Support des couleurs `blue` (Info), `emerald` (Succès), `amber` (Warning), `red` (Urgence).

---

**SABI V1.6 — LA RIGUEUR COMME ESTHÉTIQUE.**
