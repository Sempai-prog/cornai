# CARTE DES ROUTES SABI V1.6

## ✅ Routes Actives & Connectées à la Sidebar
| Route | Nom UI | Statut | Notes |
|-------|--------|--------|-------|
| `/dashboard` | Poste de Pilotage | ✅ OK | Dashboard central |
| `/dashboard/appels-offres` | Le Radar (AO) | ✅ OK | Recherche globale AO |
| `/dashboard/opportunites` | Opportunités | ✅ OK | Timeline verticale V1.6 (Pipeline) |
| `/dashboard/soumissions` | Mes Soumissions | ⚠️ DETTE | Kanban horizontal obsolète |
| `/dashboard/documents` | Le Blindage | ✅ OK | Centre de conformité (Enveloppe A) |
| `/dashboard/profil` | Capacité Métier | ✅ OK | Identité, CA et Références techniques |
| `/dashboard/terrain` | Le Terrain | ✅ OK | Suite technique (Garage, Équipe, Descente) |
| `/dashboard/annexe-16` | Annexe 16 | ⚠️ AUDIT | Générateur de certificat (Design à aligner) |
| `/dashboard/notifications` | Notifications | ✅ OK | Centre d'alertes |

## ❌ Routes Orphelines (Absent de Sidebar)
| Route | Problème | Action |
|-------|----------|--------|
| `/dashboard/analytics` | Dossier `app/dashboard/analytics` présent mais absent du `layout.tsx` | **SUPPRIMER** (Dette technique non utilisée) |

## 🔄 Routes à Clarifier / Optimiser
| Route | Problème | Action |
|-------|----------|--------|
| `/dashboard/appels-offres` | Doublon sémantique partiel avec "Opportunités" | **DIFFÉRENCIER** : Radar = Exploration / Opportunités = Gestion Workflow |
| `/dashboard/soumissions` | Design Kanban horizontal cassant la fluidité V1.6 | **REFONDRE** ou **INTÉGRER** dans la vue Opportunités |
| `/` | Landing Page | Vérifier l'harmonisation V1.6 du Hero |
| `/(auth)/login` | Auth | Valider le "Silent Cockpit" sur les formulaires |

## 📁 Arborescence Physique (Audit Réel)
*Fichier source : routes_audit.txt*
- `src/app/page.tsx`
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/dashboard/analytics/page.tsx` (Orpheline)
- `src/app/dashboard/annexe-16/page.tsx`
- `src/app/dashboard/appels-offres/page.tsx`
- `src/app/dashboard/appels-offres/[id]/page.tsx`
- `src/app/dashboard/documents/page.tsx`
- `src/app/dashboard/notifications/page.tsx`
- `src/app/dashboard/opportunites/page.tsx`
- `src/app/dashboard/profil/page.tsx`
- `src/app/dashboard/soumissions/page.tsx`
- `src/app/dashboard/terrain/page.tsx`
