# SABI Theme System — Phase D1.5 (Quiet Design)

> **Version :** 1.5.2
> **Dernière mise à jour :** Terrain Module Integration
> **Statut :** ACTIF — Toute déviation est un bug.

---

> [!IMPORTANT]
> **[DIRECTIVE DE CONTEXTE ABSOLUE]**
> Avant d'écrire la moindre ligne de code, tu DOIS lire et parcourir les documents du dossier `knowledge_base`. et SabiCopy.tsx L'interface DOIT utiliser le vocabulaire exact du Code des Marchés Publics camerounais (**ARMP, MINMAP, CIPM, COLEPS, ANR, RPAO, BPU, DQE**).

## 0. DIRECTIVE ARCHITECTURALE ABSOLUE
RÈGLE N°1 — PAS DE CARTE ENVELOPPANTE (No Wrapper Card)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Les contenus (tableaux, listes, formulaires) se posent DIRECTEMENT
sur le fond de page (#0a0a0b / #f4f5f7).

❌ INTERDIT : Une carte #0c0c0c qui contient une autre carte #0c0c0c
❌ INTERDIT : Un wrapper/container avec fond distinct autour d'un module entier
✅ CORRECT : Chaque élément individuel (ligne de tableau, KPI, panneau)
est une carte autonome posée sur le fond de page

Il n'y a que 2 plans :
Plan 0 = Fond de page (Surface)
Plan 1 = Carte individuelle (Card)

Jamais de Plan 2 (carte dans une carte).

text


---

## 1. Surfaces & Plans

### 🌑 Mode Nuit (Deep Night) — Classe CSS : `dark`

| Rôle | Token | Valeur | Tailwind |
|------|-------|--------|----------|
| **Surface (fond de page)** | `--sabi-surface` | `#0a0a0b` | `bg-[#0a0a0b]` |
| **Card (Plan 1)** | `--sabi-card` | `#0c0c0c` | `bg-[#0c0c0c]` |
| **Card Hover** | `--sabi-card-hover` | `rgba(255,255,255, 0.04)` | `hover:bg-white/[0.04]` |
| **Input Field** | `--sabi-input` | `rgba(255,255,255, 0.02)` | `bg-white/[0.02]` |
| **Bordure par défaut** | `--sabi-border` | `rgba(255,255,255, 0.05)` | `border-white/5` |
| **Bordure hover** | `--sabi-border-hover` | `rgba(255,255,255, 0.10)` | `border-white/10` |
| **Bordure active/focus** | `--sabi-border-active` | `#25D366` | `border-[#25D366]` |

### ☀️ Mode Jour (Clinical Light) — Classe CSS : `light` (défaut)

| Rôle | Token | Valeur | Tailwind |
|------|-------|--------|----------|
| **Surface (fond de page)** | `--sabi-surface` | `#f4f5f7` | `bg-[#f4f5f7]` |
| **Card (Plan 1)** | `--sabi-card` | `#ffffff` | `bg-white` |
| **Card Hover** | `--sabi-card-hover` | `rgba(0,0,0, 0.02)` | `hover:bg-black/[0.02]` |
| **Input Field** | `--sabi-input` | `rgba(0,0,0, 0.02)` | `bg-black/[0.02]` |
| **Bordure par défaut** | `--sabi-border` | `rgba(0,0,0, 0.05)` | `border-black/5` |
| **Bordure hover** | `--sabi-border-hover` | `rgba(0,0,0, 0.10)` | `border-black/10` |
| **Bordure active/focus** | `--sabi-border-active` | `#16a34a` | `border-[#16a34a]` |

---

## 2. Typographie

### Hiérarchie des textes

| Niveau | Rôle | Mode Nuit | Mode Jour | Tailwind Nuit | Tailwind Jour |
|--------|------|-----------|-----------|---------------|---------------|
| **Primaire** | Titres de page, titres de section | `#f8fafc` | `#0f172a` | `text-[#f8fafc]` | `dark:text-[#f8fafc] text-[#0f172a]` |
| **Secondaire** | Sous-titres, métadonnées, descriptions | `#94a3b8` | `#475569` | `text-[#94a3b8]` | `dark:text-[#94a3b8] text-[#475569]` |
| **Tertiaire** | Hints, placeholders, notes | `#64748b` | `#94a3b8` | `text-[#64748b]` | `dark:text-[#64748b] text-[#94a3b8]` |
| **Label Tech** | RPAO, ANNEXE, BPU, DTAO, COLEPS | `#25D366` | `#16a34a` | `text-[#25D366]` | `dark:text-[#25D366] text-[#16a34a]` |
| **Alerte Critique** | Warnings, éléments à risque | `#f59e0b` | `#d97706` | `text-[#f59e0b]` | `dark:text-[#f59e0b] text-[#d97706]` |
| **Alerte Éliminatoire** | Erreurs, blocages, rejets | `#ef4444` | `#dc2626` | `text-[#ef4444]` | `dark:text-[#ef4444] text-[#dc2626]` |

### Tailles standardisées

| Usage | Taille | Weight | Extra |
|-------|--------|--------|-------|
| Titre de page | `text-[28px]` | `font-semibold` | `leading-tight` |
| Titre de section | `text-[16px]` | `font-semibold` | `uppercase tracking-[0.03em]` |
| Label de module | `text-[11px]` | `font-semibold` | `uppercase tracking-[0.08em]` |
| Corps de texte | `text-[14px]` | `font-normal` | `leading-relaxed` |
| Métadonnée | `text-[13px]` | `font-normal` | — |
| Badge | `text-[10px]` | `font-semibold` | `uppercase tracking-[0.05em]` |
| Caption / Note | `text-[11px]` | `font-medium` | — |
| KPI (grand nombre) | `text-[28px]` | `font-bold` | `tabular-nums` |
| KPI (petit nombre) | `text-[20px]` | `font-bold` | `tabular-nums` |

---

## 3. Composants Atomiques

### 3.1 Cartes (Cards)
RÈGLE : Chaque carte est un élément AUTONOME posé sur le fond de page.
PAS de carte parent. PAS de wrapper.

Mode Nuit :
bg-[#0c0c0c] border border-white/5 rounded-[4px]
hover:bg-white/[0.04] hover:border-white/10
transition-all duration-200

Mode Jour :
bg-white border border-black/5 rounded-[4px]
hover:bg-black/[0.02] hover:border-black/10
transition-all duration-200

Tailwind unifié (avec dark:) :
bg-white dark:bg-[#0c0c0c]
border border-black/5 dark:border-white/5
rounded-[4px]
hover:bg-black/[0.02] dark:hover:bg-white/[0.04]
hover:border-black/10 dark:hover:border-white/10
transition-all duration-200

text


### 3.2 Badges de Statut
Pattern universel :
rounded-[4px] px-2 py-0.5
text-[10px] font-semibold uppercase tracking-[0.05em]
border

Variantes :

● Conforme / Ready / Validé
Nuit : text-[#25D366] bg-[#25D366]/10 border-[#25D366]/20
Jour : text-[#16a34a] bg-[#16a34a]/10 border-[#16a34a]/20

● Critique / Warning / En cours
Nuit : text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/20
Jour : text-[#d97706] bg-[#d97706]/10 border-[#d97706]/20

● Éliminatoire / Erreur / Manquant
Nuit : text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20
Jour : text-[#dc2626] bg-[#dc2626]/10 border-[#dc2626]/20

● Info / Référence
Nuit : text-[#3b82f6] bg-[#3b82f6]/10 border-[#3b82f6]/20
Jour : text-[#2563eb] bg-[#2563eb]/10 border-[#2563eb]/20

● Neutre / Pending
Nuit : text-[#94a3b8] bg-[#94a3b8]/10 border-[#94a3b8]/20
Jour : text-[#475569] bg-[#475569]/10 border-[#475569]/20

text


### 3.3 Boutons
● Primaire (Action principale)
Nuit : bg-[#25D366] text-[#0a0a0b] rounded-[4px] font-semibold px-5 py-2.5
hover:bg-[#1db954]
Jour : bg-[#16a34a] text-white rounded-[4px] font-semibold px-5 py-2.5
hover:bg-[#15803d]

● Secondaire (Action secondaire)
Nuit : bg-transparent text-[#94a3b8] rounded-[4px]
border border-white/5 px-4 py-2
hover:text-[#f8fafc] hover:border-white/10 hover:bg-white/[0.04]
Jour : bg-transparent text-[#475569] rounded-[4px]
border border-black/5 px-4 py-2
hover:text-[#0f172a] hover:border-black/10 hover:bg-black/[0.02]

● Danger (Action destructive / Alerte)
Nuit : bg-transparent text-[#ef4444] rounded-[4px]
border border-[#ef4444]/20 px-4 py-2
hover:bg-[#ef4444]/10
Jour : bg-transparent text-[#dc2626] rounded-[4px]
border border-[#dc2626]/20 px-4 py-2
hover:bg-[#dc2626]/10

● Ghost (Lien/Action tertiaire)
Nuit : bg-transparent text-[#94a3b8] px-3 py-1.5
hover:text-[#25D366]
Jour : bg-transparent text-[#475569] px-3 py-1.5
hover:text-[#16a34a]

TOUJOURS : rounded-[4px], transition-all duration-200
JAMAIS : rounded-lg, rounded-xl, box-shadow

text


### 3.4 Barres de Progression
Container :
Nuit : h-[3px] w-full bg-white/5 rounded-[2px]
Jour : h-[3px] w-full bg-black/5 rounded-[2px]

Fill :
h-[3px] rounded-[2px]
Largeur dynamique via style={{ width: ${percentage}% }}

Couleur dynamique :
> 60% → bg-[#25D366] (nuit) / bg-[#16a34a] (jour)
30-60% → bg-[#f59e0b] (nuit) / bg-[#d97706] (jour)
< 30% → bg-[#ef4444] (nuit) / bg-[#dc2626] (jour)

text


### 3.5 Panneaux d'Alerte
Container :
Nuit : bg-[couleur]/5 border-l-2 border-[couleur] rounded-[4px] px-4 py-3
Jour : bg-[couleur]/5 border-l-2 border-[couleur] rounded-[4px] px-4 py-3
(Identique — la couleur de fond à 5% fonctionne dans les deux modes)

Titre de l'alerte :
text-[couleur] text-[12px] font-semibold uppercase tracking-[0.03em]

Corps :
Nuit : text-[#94a3b8] text-[13px]
Jour : text-[#475569] text-[13px]

Source légale :
Nuit : text-[#64748b] text-[11px] italic mt-1
Jour : text-[#94a3b8] text-[11px] italic mt-1

Variantes de couleur :
Rouge (Éliminatoire) : border-[#ef4444] bg-[#ef4444]/5
Orange (Critique) : border-[#f59e0b] bg-[#f59e0b]/5
Bleu (Info) : border-[#3b82f6] bg-[#3b82f6]/5
Vert (Succès) : border-[#25D366] bg-[#25D366]/5

text


### 3.6 Tableaux (Tables)
RÈGLE CRITIQUE : Les tableaux prennent TOUTE la largeur disponible (w-full).
Pas de marge latérale. Pas de wrapper card autour.

Container :
w-full

Header Row :
Nuit : border-b border-white/5 bg-transparent
Jour : border-b border-black/5 bg-transparent

Cellules header :
text-[11px] font-semibold uppercase tracking-[0.05em]
Nuit : text-[#64748b]
Jour : text-[#94a3b8]
py-3 px-4 text-left

Body Rows :
Nuit : border-b border-white/[0.03] hover:bg-white/[0.04]
Jour : border-b border-black/[0.03] hover:bg-black/[0.02]
transition-colors duration-150

Cellules body :
text-[13px]
Nuit : text-[#f8fafc] (primaire) ou text-[#94a3b8] (secondaire)
Jour : text-[#0f172a] (primaire) ou text-[#475569] (secondaire)
py-3 px-4

ALIGNEMENT :
Toutes les colonnes sont alignées sur la même grille.
Utiliser des largeurs fixes ou proportionnelles cohérentes.
La première colonne commence à px-4.
La dernière colonne se termine à px-4.

text


### 3.7 Tabs (Navigation par Onglets)
Container :
w-full px-6 flex gap-1
Nuit : border-b border-white/5
Jour : border-b border-black/5

Tab Item (inactif) :
px-4 py-3 flex items-center gap-2
text-[12px] font-medium uppercase tracking-[0.05em]
rounded-t-[4px]
border-b-2 border-transparent
Nuit : text-[#94a3b8] hover:text-[#f8fafc] hover:bg-white/[0.04]
Jour : text-[#475569] hover:text-[#0f172a] hover:bg-black/[0.02]
transition-all duration-200

Tab Item (actif) :
Nuit : text-[#25D366] border-b-2 border-[#25D366] bg-white/[0.02]
Jour : text-[#16a34a] border-b-2 border-[#16a34a] bg-black/[0.02]

Tab Icon :
size: 14px, strokeWidth: 1.5
Couleur héritée du texte

Tab Status Dot :
w-1.5 h-1.5 rounded-full
complete → bg-[#25D366]
warning → bg-[#f59e0b]
empty → bg-[#ef4444]
pending → bg-[#94a3b8]

text


### 3.8 Input Fields
Container :
w-full rounded-[4px] px-3 py-2
text-[14px]
Nuit : bg-white/[0.02] border border-white/5 text-[#f8fafc]
placeholder:text-[#64748b]
focus:border-[#25D366] focus:ring-0 focus:outline-none
Jour : bg-black/[0.02] border border-black/5 text-[#0f172a]
placeholder:text-[#94a3b8]
focus:border-[#16a34a] focus:ring-0 focus:outline-none
transition-colors duration-200

text


---

## 4. Grille & Alignement
SYSTÈME DE GRILLE :
━━━━━━━━━━━━━━━━━

Base unit : 4px
Padding de page : px-6 (24px = 6 × 4px)
Gap entre cartes : gap-4 (16px) — OU gap-3 (12px) pour densité haute
Padding de carte : p-5 (20px) — OU p-4 (16px) pour cartes compactes
Margin de section : mt-6 (24px) entre sections verticales

RÈGLE D'ALIGNEMENT :
━━━━━━━━━━━━━━━━━━━

Tous les éléments d'une même rangée DOIVENT avoir la même hauteur
→ Utiliser items-stretch sur le parent flex/grid

Les bords gauche de TOUTES les cartes/tableaux d'un module
DOIVENT être alignés sur la même verticale
→ Pas de marge gauche supplémentaire sur les sous-éléments

Les tableaux occupent 100% de la largeur du conteneur (w-full)
→ Jamais de max-w-* sur un tableau

Les grilles de cartes utilisent grid avec colonnes uniformes :
→ grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4

Les KPI en rangée utilisent grid avec colonnes égales :
→ grid grid-cols-3 gap-4 (chaque KPI a la même largeur)

text


---

## 5. Responsive
BREAKPOINTS :
Mobile : < 768px (md)
Tablet : 768px — 1024px (lg)
Desktop : > 1024px

COMPORTEMENTS :
Tabs : Mobile = scroll horizontal, icône seule
Desktop = flex, icône + label + dot

Grilles : Mobile = grid-cols-1
Tablet = grid-cols-2
Desktop = grid-cols-3

Tableaux : Mobile = scroll horizontal (overflow-x-auto)
Desktop = pleine largeur

Header : Mobile = stack vertical (titre au-dessus du score)
Desktop = flex row (titre à gauche, score à droite)

text


---

## 6. Transitions & Animations
TRANSITIONS PAR DÉFAUT :
Cartes / Boutons : transition-all duration-200 ease
Couleurs de tab : transition-colors duration-150
Changement thème : transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)

ANIMATIONS :
Aucune animation complexe. Pas de bounce, pas de slide-in.
Le Quiet Design est CALME.

Seule exception : la rotation de l'icône du Theme Toggle (360° en 500ms)

text


---

## 7. Implémentation CSS Variables (globals.css)

```css
@layer base {
  :root {
    /* ── Mode Jour (défaut) ── */
    --sabi-surface: #f4f5f7;
    --sabi-card: #ffffff;
    --sabi-card-hover: rgba(0, 0, 0, 0.02);
    --sabi-input: rgba(0, 0, 0, 0.02);
    --sabi-border: rgba(0, 0, 0, 0.05);
    --sabi-border-hover: rgba(0, 0, 0, 0.10);
    --sabi-border-active: #16a34a;

    --sabi-text-primary: #0f172a;
    --sabi-text-secondary: #475569;
    --sabi-text-tertiary: #94a3b8;
    --sabi-text-label: #16a34a;
    --sabi-text-warning: #d97706;
    --sabi-text-danger: #dc2626;
    --sabi-text-success: #16a34a;

    --sabi-accent: #16a34a;
    --sabi-accent-hover: #15803d;
    --sabi-accent-bg: rgba(22, 163, 74, 0.1);
    --sabi-accent-border: rgba(22, 163, 74, 0.2);
  }

  .dark {
    /* ── Mode Nuit ── */
    --sabi-surface: #0a0a0b;
    --sabi-card: #0c0c0c;
    --sabi-card-hover: rgba(255, 255, 255, 0.04);
    --sabi-input: rgba(255, 255, 255, 0.02);
    --sabi-border: rgba(255, 255, 255, 0.05);
    --sabi-border-hover: rgba(255, 255, 255, 0.10);
    --sabi-border-active: #25D366;

    --sabi-text-primary: #f8fafc;
    --sabi-text-secondary: #94a3b8;
    --sabi-text-tertiary: #64748b;
    --sabi-text-label: #25D366;
    --sabi-text-warning: #f59e0b;
    --sabi-text-danger: #ef4444;
    --sabi-text-success: #25D366;

    --sabi-accent: #25D366;
    --sabi-accent-hover: #1db954;
    --sabi-accent-bg: rgba(37, 211, 102, 0.1);
    --sabi-accent-border: rgba(37, 211, 102, 0.2);
  }
}
8. Tailwind Config Addendum (tailwind.config.ts)
TypeScript

// Ajouter dans extend.colors :
sabi: {
  surface: 'var(--sabi-surface)',
  card: 'var(--sabi-card)',
  'card-hover': 'var(--sabi-card-hover)',
  input: 'var(--sabi-input)',
  border: 'var(--sabi-border)',
  'border-hover': 'var(--sabi-border-hover)',
  'border-active': 'var(--sabi-border-active)',
  'text-primary': 'var(--sabi-text-primary)',
  'text-secondary': 'var(--sabi-text-secondary)',
  'text-tertiary': 'var(--sabi-text-tertiary)',
  'text-label': 'var(--sabi-text-label)',
  'text-warning': 'var(--sabi-text-warning)',
  'text-danger': 'var(--sabi-text-danger)',
  'text-success': 'var(--sabi-text-success)',
  accent: 'var(--sabi-accent)',
  'accent-hover': 'var(--sabi-accent-hover)',
  'accent-bg': 'var(--sabi-accent-bg)',
  'accent-border': 'var(--sabi-accent-border)',
}

// Ajouter dans extend.borderRadius :
'sabi': '4px',
'sabi-sm': '2px',
9. Checklist de Validation (QA)
Avant de considérer TOUT composant comme terminé :

text

☐ border-radius: 4px sur TOUS les éléments
☐ ZÉRO carte dans une carte (pas de double fond)
☐ Tableaux en w-full (toute la largeur)
☐ Alignement vertical identique sur tous les éléments d'une rangée
☐ Bord gauche aligné entre toutes les sections d'un module
☐ Mode Nuit ET Mode Jour fonctionnels (tester les deux)
☐ Les CSS variables --sabi-* sont utilisées (pas de couleurs hardcodées)
☐ Hover states présents sur cartes et boutons
☐ ZÉRO box-shadow
☐ ZÉRO gradient
☐ Transitions duration-200
☐ Vocabulaire métier camerounais correct
☐ Responsive mobile vérifié (< 768px)
10. Anti-Patterns (Ce qui est INTERDIT)
text

❌ rounded-lg, rounded-xl, rounded-2xl, rounded-full (sauf dots 6px)
❌ box-shadow de quelque nature que ce soit
❌ gradient (linear-gradient, radial-gradient)
❌ bg-violet, bg-purple, bg-indigo (hors badges info bleu)
❌ Carte enveloppante (wrapper card avec fond distinct)
❌ Double bordure (carte bordée dans un conteneur bordé)
❌ Texte blanc pur (#ffffff) pour du contenu — utiliser #f8fafc
❌ Fond blanc pur (#ffffff) en mode nuit
❌ Animations bounce, slide, fade-in au chargement
❌ ring-* sur les focus (utiliser border-color uniquement)