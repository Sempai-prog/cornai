# 🗺️ SABI V1.6 — NOUVELLE FEUILLE DE ROUTE COMPLÈTE
## Fusion Sprint C + Audit Terrain Volume B

---

## 📍 ÉTAT DES LIEUX — Où on en est

```
✅ SPRINT A — Le Radar & Décodeur RPAO        → FAIT
✅ SPRINT B — Kanban Pipeline V1.6            → FAIT
✅ SPRINT C — Hub Détail Soumission           → FAIT (arrêt ici)

🔴 SPRINT D — Blindage Vol. A                → À FAIRE
🔴 SPRINT E — Terrain Vol. B (5 modules)     → UI faite, Backend mocké
🔴 SPRINT F — Nkap Vol. C + Export Final     → À FAIRE
```

---

## 🏗️ ARCHITECTURE DES ROUTES — Version Consolidée

```
src/app/
│
├── dashboard/
│   │
│   ├── layout.tsx                          ✅ Sidebar + Context Bar
│   │
│   ├── page.tsx                            ✅ Dashboard home
│   │
│   ├── appels-offres/                      ✅ SPRINT A
│   │   └── page.tsx                        → Le Radar + Décodeur RPAO
│   │
│   ├── soumissions/                        ✅ SPRINT B + C
│   │   ├── page.tsx                        → Kanban Pipeline
│   │   │
│   │   └── [soumissionId]/                 ✅ SPRINT C (Hub)
│   │       ├── layout.tsx                  → Context Bar + Volume Tabs
│   │       ├── page.tsx                    → Redirect → /blindage
│   │       │
│   │       ├── blindage/                   🔴 SPRINT D
│   │       │   └── page.tsx
│   │       │
│   │       ├── terrain/                    🔴 SPRINT E
│   │       │   ├── layout.tsx              → Tabs 5 sous-modules
│   │       │   ├── page.tsx                → Redirect → /transcripteur
│   │       │   ├── transcripteur/
│   │       │   │   └── page.tsx
│   │       │   ├── garage/
│   │       │   │   └── page.tsx
│   │       │   ├── equipe/
│   │       │   │   └── page.tsx
│   │       │   ├── descente/
│   │       │   │   └── page.tsx
│   │       │   └── compilation/
│   │       │       └── page.tsx
│   │       │
│   │       ├── nkap/                       🔴 SPRINT F
│   │       │   └── page.tsx
│   │       │
│   │       └── compiler/                   🔴 SPRINT F
│   │           └── page.tsx
│   │
│   └── profil/                             ✅ Existant
│       └── page.tsx
│
├── api/
│   ├── documents/
│   │   ├── annexe-16/
│   │   │   └── route.ts                    🔴 SPRINT E.4
│   │   ├── bpu-dqe/
│   │   │   └── route.ts                    🔴 SPRINT F
│   │   └── zip-final/
│   │       └── route.ts                    🔴 SPRINT E.5
│   │
│   └── webhooks/
│       └── audio/
│           └── route.ts                    🔴 SPRINT E.1
│
└── actions/
    ├── soumissions.ts                      ✅ engagerSoumission
    ├── blindage.ts                         🔴 SPRINT D
    ├── terrain/
    │   ├── transcripteur.ts                🔴 SPRINT E.1
    │   ├── garage.ts                       🔴 SPRINT E.2
    │   ├── equipe.ts                       🔴 SPRINT E.3
    │   ├── descente.ts                     🔴 SPRINT E.4
    │   └── compilation.ts                  🔴 SPRINT E.5
    └── nkap.ts                             🔴 SPRINT F
```

---

## 📦 ARCHITECTURE DES DONNÉES — Drizzle Schema Complet

```typescript
// src/database/schema.ts
// Vue d'ensemble des tables — Ce qui existe vs ce qui manque

// ✅ TABLES EXISTANTES
// - appels_offres
// - soumissions
// - entreprises
// - materiel_global
// - soumission_engins
// - equipe_projet
// - visites_terrain
// - photos_terrain
// - pieces_soumission

// 🔴 TABLE MANQUANTE — À créer pour Sprint E.1
export const memoireTechnique = pgTable('memoire_technique', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  soumissionId: text('soumission_id')
    .notNull()
    .references(() => soumissions.id, { onDelete: 'cascade' }),

  // Chapitres du mémoire (structure DTAO standard)
  chapitreMethodologie: text('chapitre_methodologie'),
  chapitreOrganisation: text('chapitre_organisation'),
  chapitreDelais: text('chapitre_delais'),
  chapitreQSE: text('chapitre_qse'),           // Qualité Sécurité Environnement
  chapitreMateriaux: text('chapitre_materiaux'),

  // Statut de chaque chapitre
  statutMethodologie: text('statut_methodologie')
    .default('vide').$type<'vide' | 'brouillon' | 'valide'>(),
  statutOrganisation: text('statut_organisation')
    .default('vide').$type<'vide' | 'brouillon' | 'valide'>(),
  statutDelais: text('statut_delais')
    .default('vide').$type<'vide' | 'brouillon' | 'valide'>(),
  statutQSE: text('statut_qse')
    .default('vide').$type<'vide' | 'brouillon' | 'valide'>(),
  statutMateriaux: text('statut_materiaux')
    .default('vide').$type<'vide' | 'brouillon' | 'valide'>(),

  // Métadonnées IA
  scoreConformite: integer('score_conformite'),  // 0-100
  motsClesManquants: jsonb('mots_cles_manquants').$type<string[]>(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// 🔴 TABLE MANQUANTE — Notes audio brutes
export const notesAudio = pgTable('notes_audio', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  soumissionId: text('soumission_id')
    .notNull()
    .references(() => soumissions.id, { onDelete: 'cascade' }),

  fichierUrl: text('fichier_url').notNull(),
  dureeSecondes: integer('duree_secondes'),
  transcription: text('transcription'),         // Résultat Whisper
  chaptreCible: text('chapitre_cible')
    .$type<'methodologie' | 'organisation' | 'delais' | 'qse' | 'materiaux'>(),

  statut: text('statut')
    .default('uploade')
    .$type<'uploade' | 'transcription' | 'genere' | 'valide'>(),

  createdAt: timestamp('created_at').defaultNow(),
})
```

---

## 🔴 SPRINT D — LE BLINDAGE (VOL. A)
### *Durée : 3 jours*

---

### D.1 — Query Layer Blindage

```typescript
// src/database/queries/blindage.ts

import { db } from '@/database'
import { piecesAdministratives, soumissions, appelsOffres } from '@/database/schema'
import { eq, and } from 'drizzle-orm'
import { PIECES_REFERENTIEL } from '@/lib/blindage/referentiel'

// Récupère toutes les pièces d'une soumission
// avec leur statut calculé vs la date de dépôt de l'AO
export async function getPiecesBlindage(soumissionId: string) {
  // 1. Récupérer la date de dépôt de l'AO lié
  const soumission = await db.query.soumissions.findFirst({
    where: eq(soumissions.id, soumissionId),
    with: {
      appelOffre: {
        columns: { dateDepot: true, reference: true }
      }
    }
  })

  if (!soumission) throw new Error('Soumission introuvable')

  // 2. Récupérer les pièces uploadées en DB
  const piecesEnDB = await db.query.piecesAdministratives.findMany({
    where: eq(piecesAdministratives.soumissionId, soumissionId)
  })

  // 3. Fusionner le référentiel avec les données DB
  const piecesCompletes = PIECES_REFERENTIEL.map(ref => {
    const pieceDB = piecesEnDB.find(p => p.typepiece === ref.id)
    const statut = calculerStatut(ref, pieceDB, soumission.appelOffre.dateDepot)

    return {
      ...ref,
      document: pieceDB ?? null,
      statut,
    }
  })

  // 4. Calculer l'avancement global
  const piecesObligatoires = piecesCompletes.filter(p => p.obligatoire)
  const piecesValides = piecesObligatoires.filter(
    p => p.statut === 'valide' || p.statut === 'attention'
  )
  const avancement = Math.round(
    (piecesValides.length / piecesObligatoires.length) * 100
  )

  return {
    pieces: piecesCompletes,
    avancement,
    dateDepotAO: soumission.appelOffre.dateDepot,
    referenceAO: soumission.appelOffre.reference,
  }
}
```

---

### D.2 — Server Actions Blindage

```typescript
// src/app/actions/blindage.ts
'use server'

import { db } from '@/database'
import { piecesAdministratives } from '@/database/schema'
import { revalidatePath } from 'next/cache'
import { put } from '@vercel/blob'         // Storage bucket
import { getEntrepriseContext } from '@/lib/demo-config'

// ACTION 1 : Upload d'une pièce administrative
export async function uploadPieceAdmin(
  soumissionId: string,
  typePiece: string,
  fichier: FormData
): Promise<{ succes: boolean; erreur?: string }> {

  const file = fichier.get('fichier') as File
  if (!file) return { succes: false, erreur: 'Fichier manquant' }

  // Vérifications
  if (file.size > 5 * 1024 * 1024) {
    return { succes: false, erreur: 'Fichier trop lourd (max 5 Mo)' }
  }
  if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
    return { succes: false, erreur: 'Format invalide (PDF, JPG, PNG uniquement)' }
  }

  try {
    // Upload vers Vercel Blob
    const blob = await put(
      `pieces/${soumissionId}/${typePiece}/${file.name}`,
      file,
      { access: 'private' }
    )

    // Extraire la date d'émission depuis le nom de fichier ou metadata
    // (Logique simplifiée — à enrichir avec extraction IA)
    const dateEmission = new Date()

    // Upsert en DB
    await db.insert(piecesAdministratives)
      .values({
        soumissionId,
        typePiece,
        fichierUrl: blob.url,
        fichierNom: file.name,
        fichierTailleOctets: file.size,
        dateEmission,
        statut: 'uploade',
      })
      .onConflictDoUpdate({
        target: [
          piecesAdministratives.soumissionId,
          piecesAdministratives.typePiece
        ],
        set: {
          fichierUrl: blob.url,
          fichierNom: file.name,
          dateEmission,
          statut: 'uploade',
          updatedAt: new Date(),
        }
      })

    // Recalculer et sauvegarder l'avancement admin
    await recalculerAvancementAdmin(soumissionId)

    revalidatePath(`/dashboard/soumissions/${soumissionId}/blindage`)

    return { succes: true }

  } catch (err) {
    console.error('[Blindage] Upload erreur:', err)
    return { succes: false, erreur: 'Erreur lors de l\'upload' }
  }
}

// ACTION 2 : Mettre à jour la date d'émission manuellement
export async function setDateEmissionPiece(
  soumissionId: string,
  typePiece: string,
  dateEmission: Date
): Promise<{ succes: boolean }> {

  await db.update(piecesAdministratives)
    .set({ dateEmission, updatedAt: new Date() })
    .where(and(
      eq(piecesAdministratives.soumissionId, soumissionId),
      eq(piecesAdministratives.typePiece, typePiece)
    ))

  await recalculerAvancementAdmin(soumissionId)
  revalidatePath(`/dashboard/soumissions/${soumissionId}/blindage`)

  return { succes: true }
}

// HELPER INTERNE : Recalcule l'avancement et le persiste
async function recalculerAvancementAdmin(soumissionId: string) {
  const { avancement } = await getPiecesBlindage(soumissionId)

  await db.update(soumissions)
    .set({ avancementAdmin: avancement })
    .where(eq(soumissions.id, soumissionId))
}
```

---

### D.3 — Page Blindage

```typescript
// src/app/dashboard/soumissions/[soumissionId]/blindage/page.tsx

import { getPiecesBlindage } from '@/database/queries/blindage'
import { PieceAdministrative } from '@/components/blindage/piece-administrative'
import { BlindageHeader } from '@/components/blindage/blindage-header'

export default async function BlindasePage({
  params
}: {
  params: { soumissionId: string }
}) {
  const { pieces, avancement, dateDepotAO, referenceAO } =
    await getPiecesBlindage(params.soumissionId)

  // Séparer par criticité pour l'affichage
  const piecesBloquantes = pieces.filter(
    p => p.obligatoire && (p.statut === 'manquant' || p.statut === 'perime')
  )
  const piecesAttention = pieces.filter(p => p.statut === 'attention')
  const piecesValides = pieces.filter(p => p.statut === 'valide')

  return (
    <div className="flex flex-col h-full">

      {/* Header avec jauge globale */}
      <BlindageHeader
        avancement={avancement}
        dateDepot={dateDepotAO}
        referenceAO={referenceAO}
        nbBloquants={piecesBloquantes.length}
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* SECTION 1 : Alertes critiques */}
        {piecesBloquantes.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <h3 className="text-xs font-semibold text-foreground">
                Action requise ({piecesBloquantes.length})
              </h3>
            </div>
            <div className="space-y-2">
              {piecesBloquantes.map(piece => (
                <PieceAdministrative
                  key={piece.id}
                  piece={piece}
                  soumissionId={params.soumissionId}
                />
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2 : Attention */}
        {piecesAttention.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <h3 className="text-xs font-semibold text-foreground">
                À surveiller ({piecesAttention.length})
              </h3>
            </div>
            <div className="space-y-2">
              {piecesAttention.map(piece => (
                <PieceAdministrative
                  key={piece.id}
                  piece={piece}
                  soumissionId={params.soumissionId}
                />
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3 : Valides */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <h3 className="text-xs font-semibold text-foreground">
              Conformes ({piecesValides.length})
            </h3>
          </div>
          <div className="space-y-2">
            {piecesValides.map(piece => (
              <PieceAdministrative
                key={piece.id}
                piece={piece}
                soumissionId={params.soumissionId}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
```

---

## 🔴 SPRINT E — LE TERRAIN (VOL. B)
### *Durée : 8 jours — 5 sous-modules à câbler*

---

### E.0 — Layout Terrain (Navigation entre sous-modules)

```typescript
// src/app/dashboard/soumissions/[soumissionId]/terrain/layout.tsx

import { getTerrainProgression } from '@/database/queries/terrain'

const SOUS_MODULES = [
  {
    id: 'transcripteur',
    label: 'Mémoire',
    icon: Mic,
    // Poids dans l'avancement technique total
    poids: 35,
  },
  {
    id: 'garage',
    label: 'Matériel',
    icon: Truck,
    poids: 25,
  },
  {
    id: 'equipe',
    label: 'Équipe',
    icon: Users,
    poids: 25,
  },
  {
    id: 'descente',
    label: 'Visite',
    icon: MapPin,
    poids: 15,
  },
  {
    id: 'compilation',
    label: 'Compiler',
    icon: Package,
    poids: 0,          // Pas de poids — C'est le résultat final
  },
] as const

export default async function TerrainLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { soumissionId: string }
}) {
  // Progression de chaque sous-module depuis la DB
  const progression = await getTerrainProgression(params.soumissionId)

  return (
    <div className="flex flex-col h-full">

      {/* Tabs de navigation Terrain */}
      <div className="border-b border-border bg-card">
        <div className="flex px-6 overflow-x-auto">
          {SOUS_MODULES.map(module => {
            const prog = progression[module.id] ?? 0
            const Icon = module.icon

            return (
              <Link
                key={module.id}
                href={`/dashboard/soumissions/${params.soumissionId}/terrain/${module.id}`}
                className={cn(
                  "flex items-center gap-2 px-4 py-3",
                  "border-b-2 transition-colors whitespace-nowrap",
                  "text-xs hover:text-foreground",
                  // Active state géré par le pathname
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{module.label}</span>
                {/* Mini badge de progression */}
                {module.poids > 0 && (
                  <span className={cn(
                    "text-[9px] px-1 rounded-[2px] tabular-nums",
                    prog === 100
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : prog > 0
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                  )}>
                    {prog}%
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Contenu du sous-module actif */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

    </div>
  )
}
```

---

### E.1 — TRANSCRIPTEUR (Mémoire Technique)

#### Query Layer
```typescript
// src/database/queries/terrain.ts

export async function getMemoireTechnique(soumissionId: string) {
  // Récupère le mémoire + les notes audio liées
  const memoire = await db.query.memoireTechnique.findFirst({
    where: eq(memoireTechnique.soumissionId, soumissionId),
  })

  const notes = await db.query.notesAudio.findMany({
    where: eq(notesAudio.soumissionId, soumissionId),
    orderBy: [desc(notesAudio.createdAt)]
  })

  // Calcul de progression
  // Un chapitre compte quand son statut = 'valide'
  const CHAPITRES = [
    'methodologie', 'organisation', 'delais', 'qse', 'materiaux'
  ] as const

  const chapitresValides = CHAPITRES.filter(
    ch => memoire?.[`statut${capitalize(ch)}`] === 'valide'
  ).length

  const progression = Math.round((chapitresValides / CHAPITRES.length) * 100)

  return { memoire, notes, progression, chapitres: CHAPITRES }
}
```

#### Server Actions
```typescript
// src/app/actions/terrain/transcripteur.ts
'use server'

import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { put } from '@vercel/blob'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!)

// ACTION 1 : Upload audio + Transcription Whisper
export async function uploadAudioNote(
  soumissionId: string,
  chaptreCible: string,
  formData: FormData
): Promise<{
  succes: boolean
  noteId?: string
  transcription?: string
  erreur?: string
}> {

  const fichierAudio = formData.get('audio') as File
  if (!fichierAudio) return { succes: false, erreur: 'Fichier audio manquant' }

  // Limite 10 Mo pour Whisper
  if (fichierAudio.size > 10 * 1024 * 1024) {
    return { succes: false, erreur: 'Audio trop lourd (max 10 Mo)' }
  }

  try {
    // 1. Uploader l'audio sur Vercel Blob
    const blob = await put(
      `audio/${soumissionId}/${Date.now()}_${fichierAudio.name}`,
      fichierAudio,
      { access: 'private' }
    )

    // 2. Créer l'entrée DB en statut "transcription"
    const [note] = await db.insert(notesAudio).values({
      soumissionId,
      fichierUrl: blob.url,
      dureeSecondes: null,
      chaptreCible: chaptreCible as any,
      statut: 'transcription',
    }).returning({ id: notesAudio.id })

    // 3. Transcrire avec Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: fichierAudio,
      model: 'whisper-1',
      language: 'fr',
      prompt: 'Terminologie BTP, marchés publics camerounais, MINTP, COLEPS',
    })

    // 4. Mettre à jour la note avec la transcription
    await db.update(notesAudio)
      .set({
        transcription: transcription.text,
        statut: 'transcription',
      })
      .where(eq(notesAudio.id, note.id))

    revalidatePath(
      `/dashboard/soumissions/${soumissionId}/terrain/transcripteur`
    )

    return {
      succes: true,
      noteId: note.id,
      transcription: transcription.text
    }

  } catch (err) {
    console.error('[Transcripteur] Upload/Whisper erreur:', err)
    return { succes: false, erreur: 'Transcription échouée' }
  }
}

// ACTION 2 : Générer le chapitre depuis la transcription (Gemini)
export async function generateChapter(
  soumissionId: string,
  noteId: string,
  chaptreCible: 'methodologie' | 'organisation' | 'delais' | 'qse' | 'materiaux',
  transcription: string,
  contexteAO: string         // Titre + description de l'AO pour contextualiser
): Promise<{ succes: boolean; contenu?: string; erreur?: string }> {

  const PROMPTS_CHAPITRES = {
    methodologie: `
      Tu es un expert en rédaction de mémoires techniques pour marchés publics camerounais.
      
      Contexte du marché : ${contexteAO}
      
      À partir de cette note de terrain dictée par le chef de projet :
      "${transcription}"
      
      Rédige le chapitre "MÉTHODOLOGIE D'EXÉCUTION" en français académique, 
      respectant le format DTAO MINTP. Structure :
      1. Approche générale des travaux
      2. Mode opératoire détaillé par phase
      3. Mesures de contrôle qualité
      
      Longueur : 300-500 mots. Ton : technique et professionnel.
    `,
    organisation: `...prompt organisation...`,
    delais: `...prompt planning...`,
    qse: `...prompt QSE...`,
    materiaux: `...prompt matériaux...`,
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(PROMPTS_CHAPITRES[chaptreCible])
    const contenu = result.response.text()

    // Sauvegarder dans memoireTechnique
    const champContenu = `chapitre${capitalize(chaptreCible)}`
    const champStatut = `statut${capitalize(chaptreCible)}`

    await db.insert(memoireTechnique)
      .values({
        soumissionId,
        [champContenu]: contenu,
        [champStatut]: 'brouillon',
      })
      .onConflictDoUpdate({
        target: [memoireTechnique.soumissionId],
        set: {
          [champContenu]: contenu,
          [champStatut]: 'brouillon',
          updatedAt: new Date(),
        }
      })

    // Mettre à jour le statut de la note
    await db.update(notesAudio)
      .set({ statut: 'genere' })
      .where(eq(notesAudio.id, noteId))

    revalidatePath(
      `/dashboard/soumissions/${soumissionId}/terrain/transcripteur`
    )

    return { succes: true, contenu }

  } catch (err) {
    console.error('[Transcripteur] Gemini erreur:', err)
    return { succes: false, erreur: 'Génération du chapitre échouée' }
  }
}

// ACTION 3 : Valider un chapitre (brouillon → validé)
export async function validerChapitre(
  soumissionId: string,
  chaptreCible: 'methodologie' | 'organisation' | 'delais' | 'qse' | 'materiaux'
): Promise<{ succes: boolean }> {

  const champStatut = `statut${capitalize(chaptreCible)}`

  await db.update(memoireTechnique)
    .set({ [champStatut]: 'valide', updatedAt: new Date() })
    .where(eq(memoireTechnique.soumissionId, soumissionId))

  // Recalculer l'avancement technique global
  await recalculerAvancementTech(soumissionId)

  revalidatePath(
    `/dashboard/soumissions/${soumissionId}/terrain/transcripteur`
  )

  return { succes: true }
}
```

---

### E.2 — GARAGE (Parc Matériel)

#### Server Actions
```typescript
// src/app/actions/terrain/garage.ts
'use server'

// ACTION 1 : Lire les exigences matériel du RPAO
export async function getGarageRPAORequirements(soumissionId: string) {
  const soumission = await db.query.soumissions.findFirst({
    where: eq(soumissions.id, soumissionId),
    with: {
      appelOffre: {
        columns: {
          exigencesMateriel: true,    // JSONB : { type, quantiteMin, obligatoire }
          reference: true
        }
      }
    }
  })

  // Récupérer les engins déjà affectés
  const enginsAffecter = await db.query.soumissionEngins.findMany({
    where: eq(soumissionEngins.soumissionId, soumissionId),
    with: { engin: true }
  })

  return {
    exigences: soumission?.appelOffre.exigencesMateriel ?? [],
    enginsAffecter,
  }
}

// ACTION 2 : Affecter un engin du parc global à la soumission
export async function affecterEnginToSoumission(
  soumissionId: string,
  enginId: string,
  roleMarche: string
): Promise<{ succes: boolean; erreur?: string }> {

  // Vérifier que l'engin existe et appartient à l'entreprise
  const { entrepriseId } = await getEntrepriseContext()
  const engin = await db.query.materielGlobal.findFirst({
    where: and(
      eq(materielGlobal.id, enginId),
      eq(materielGlobal.entrepriseId, entrepriseId)
    )
  })

  if (!engin) return { succes: false, erreur: 'Engin introuvable' }

  await db.insert(soumissionEngins)
    .values({ soumissionId, enginId, roleMarche })
    .onConflictDoNothing()

  await recalculerAvancementTech(soumissionId)
  revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain/garage`)

  return { succes: true }
}

// ACTION 3 : Upload carte grise
export async function uploadCarteGrise(
  enginId: string,
  soumissionId: string,
  formData: FormData
): Promise<{ succes: boolean; erreur?: string }> {

  const fichier = formData.get('carteGrise') as File
  if (!fichier) return { succes: false, erreur: 'Fichier manquant' }

  const blob = await put(
    `cartes-grises/${enginId}/${fichier.name}`,
    fichier,
    { access: 'private' }
  )

  await db.update(materielGlobal)
    .set({
      carteGriseUrl: blob.url,
      statut: 'documente',
      updatedAt: new Date()
    })
    .where(eq(materielGlobal.id, enginId))

  revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain/garage`)

  return { succes: true }
}
```

---

### E.3 — ÉQUIPE (Personnel Clé)

#### Server Actions
```typescript
// src/app/actions/terrain/equipe.ts
'use server'

// ACTION 1 : Ajouter un membre à l'équipe projet
export async function addPersonnelToEquipe(
  soumissionId: string,
  input: {
    nom: string
    prenom: string
    poste: string
    diplome?: string
    anneeExperience: number
    cvUrl?: string
  }
): Promise<{ succes: boolean; membreId?: string; erreur?: string }> {

  // Validation Zod
  const validation = SchemaPersonnel.safeParse(input)
  if (!validation.success) {
    return { succes: false, erreur: validation.error.errors[0].message }
  }

  const [membre] = await db.insert(equipeProjet)
    .values({ soumissionId, ...validation.data })
    .returning({ id: equipeProjet.id })

  await recalculerAvancementTech(soumissionId)
  revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain/equipe`)

  return { succes: true, membreId: membre.id }
}

// ACTION 2 : Upload CV d'un membre + Extraction IA des données
export async function uploadCVMembre(
  membreId: string,
  soumissionId: string,
  formData: FormData
): Promise<{
  succes: boolean
  anneesExperience?: number
  specialite?: string
  erreur?: string
}> {

  const fichierCV = formData.get('cv') as File
  if (!fichierCV) return { succes: false, erreur: 'CV manquant' }

  // 1. Upload vers Vercel Blob
  const blob = await put(
    `cvs/${soumissionId}/${membreId}/${fichierCV.name}`,
    fichierCV,
    { access: 'private' }
  )

  // 2. Extraction IA des années d'expérience (Gemini Vision)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const arrayBuffer = await fichierCV.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')

  const result = await model.generateContent([
    `Extrait de ce CV : 
     1. Le nombre total d'années d'expérience professionnelle
     2. La spécialité principale (ex: Génie Civil, BTP, Électricité...)
     3. Le niveau de diplôme le plus élevé
     
     Réponds UNIQUEMENT en JSON : 
     { "anneesExperience": number, "specialite": string, "diplome": string }`,
    {
      inlineData: { mimeType: fichierCV.type, data: base64 }
    }
  ])

  let extraction = { anneesExperience: 0, specialite: '', diplome: '' }
  try {
    extraction = JSON.parse(result.response.text())
  } catch {
    // Extraction IA échouée — On garde les données manuelles
  }

  // 3. Mettre à jour le membre avec le CV et les données extraites
  await db.update(equipeProjet)
    .set({
      cvUrl: blob.url,
      anneeExperience: extraction.anneesExperience || undefined,
      diplome: extraction.diplome || undefined,
      updatedAt: new Date()
    })
    .where(eq(equipeProjet.id, membreId))

  revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain/equipe`)

  return {
    succes: true,
    anneesExperience: extraction.anneesExperience,
    specialite: extraction.specialite,
  }
}
```

---

### E.4 — DESCENTE (Visite de Site)

#### Server Actions
```typescript
// src/app/actions/terrain/descente.ts
'use server'

// ACTION 1 : Upload photo géolocalisée
export async function uploadSitePhoto(
  soumissionId: string,
  formData: FormData
): Promise<{ succes: boolean; photoId?: string; erreur?: string }> {

  const photo = formData.get('photo') as File
  const latStr = formData.get('latitude') as string
  const lngStr = formData.get('longitude') as string

  if (!photo) return { succes: false, erreur: 'Photo manquante' }

  // S'assurer qu'une visite existe pour cette soumission
  let visite = await db.query.visitesTerrain.findFirst({
    where: eq(visitesTerrain.soumissionId, soumissionId)
  })

  if (!visite) {
    [visite] = await db.insert(visitesTerrain)
      .values({
        soumissionId,
        dateVisite: new Date(),
        statut: 'en_cours',
      })
      .returning()
  }

  // Upload photo
  const blob = await put(
    `photos-terrain/${soumissionId}/${Date.now()}_${photo.name}`,
    photo,
    { access: 'private' }
  )

  const [nouvellePhoto] = await db.insert(photosTerrain)
    .values({
      visiteId: visite.id,
      photoUrl: blob.url,
      photoNom: photo.name,
      latitude: latStr ? parseFloat(latStr) : null,
      longitude: lngStr ? parseFloat(lngStr) : null,
      priseLe: new Date(),
    })
    .returning({ id: photosTerrain.id })

  await recalculerAvancementTech(soumissionId)
  revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain/descente`)

  return { succes: true, photoId: nouvellePhoto.id }
}

// ACTION 2 : Sauvegarder les observations de visite
export async function saveObservationsVisite(
  soumissionId: string,
  observations: {
    general: string
    contraintes: string
    acces: string
    recommandations: string
  }
): Promise<{ succes: boolean }> {

  await db.update(visitesTerrain)
    .set({
      observationsGenerales: observations.general,
      contraintesIdentifiees: observations.contraintes,
      infosAcces: observations.acces,
      recommandations: observations.recommandations,
      statut: 'complete',
      updatedAt: new Date(),
    })
    .where(eq(visitesTerrain.soumissionId, soumissionId))

  await recalculerAvancementTech(soumissionId)
  revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain/descente`)

  return { succes: true }
}
```

#### Route API Annexe 16
```typescript
// src/app/api/documents/annexe-16/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { db } from '@/database'

export async function GET(request: NextRequest) {
  const soumissionId = request.nextUrl.searchParams.get('soumissionId')
  if (!soumissionId) {
    return NextResponse.json({ erreur: 'soumissionId manquant' }, { status: 400 })
  }

  // Récupérer toutes les données nécessaires
  const soumission = await db.query.soumissions.findFirst({
    where: eq(soumissions.id, soumissionId),
    with: {
      appelOffre: true,
      entreprise: true,
      visiteTerrain: {
        with: { photos: { limit: 3 } }  // Max 3 photos dans l'Annexe 16
      }
    }
  })

  if (!soumission?.visiteTerrain) {
    return NextResponse.json(
      { erreur: 'Visite terrain non complétée' },
      { status: 404 }
    )
  }

  // Générer le PDF avec pdf-lib
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595.28, 841.89])  // A4
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const { height } = page.getSize()
  const margin = 50

  // En-tête officiel
  page.drawText('RÉPUBLIQUE DU CAMEROUN', {
    x: margin, y: height - 50,
    size: 9, font,
    color: rgb(0, 0, 0),
  })
  page.drawText('Paix – Travail – Patrie', {
    x: margin, y: height - 62,
    size: 8, font,
  })

  // Titre
  page.drawText('ANNEXE N° 16', {
    x: 250, y: height - 100,
    size: 14, font: fontBold,
  })
  page.drawText('ATTESTATION DE VISITE DE SITE', {
    x: 195, y: height - 118,
    size: 11, font: fontBold,
  })

  // Séparateur
  page.drawLine({
    start: { x: margin, y: height - 128 },
    end: { x: 545, y: height - 128 },
    thickness: 0.5,
    color: rgb(0, 0, 0),
  })

  // Corps du document
  let y = height - 160

  const infos = [
    `Appel d'Offres N° : ${soumission.appelOffre.reference}`,
    `Objet : ${soumission.appelOffre.intitule}`,
    `Date de visite : ${soumission.visiteTerrain.dateVisite.toLocaleDateString('fr-CM', {
      day: '2-digit', month: 'long', year: 'numeric'
    })}`,
    `Lieu : ${soumission.appelOffre.lieuExecution ?? 'Non précisé'}`,
  ]

  for (const info of infos) {
    page.drawText(info, { x: margin, y, size: 10, font })
    y -= 18
  }

  // Texte de certification
  y -= 20
  const texte = `Je soussigné(e), représentant du Maître d'Ouvrage, certifie que ${soumission.entreprise.raisonSociale} a effectué la visite du site dans le cadre du présent appel d'offres.`
  const lignes = splitTextToLines(texte, 80)
  for (const ligne of lignes) {
    page.drawText(ligne, { x: margin, y, size: 10, font })
    y -= 15
  }

  // Observations
  y -= 20
  page.drawText('Observations :', { x: margin, y, size: 10, font: fontBold })
  y -= 15
  page.drawRectangle({
    x: margin, y: y - 60,
    width: 495, height: 60,
    borderWidth: 0.5,
    borderColor: rgb(0, 0, 0),
  })
  if (soumission.visiteTerrain.observationsGenerales) {
    const obs = splitTextToLines(soumission.visiteTerrain.observationsGenerales, 85)
    let yObs = y - 10
    for (const ligne of obs.slice(0, 3)) {
      page.drawText(ligne, { x: margin + 5, y: yObs, size: 9, font })
      yObs -= 13
    }
  }

  y -= 80

  // Signatures
  y -= 30
  page.drawText('Pour le Maître d\'Ouvrage', { x: margin, y, size: 10, font: fontBold })
  page.drawText('Pour l\'Entreprise', { x: 350, y, size: 10, font: fontBold })

  y -= 15
  page.drawText('Signature et cachet :', { x: margin, y, size: 9, font })
  page.drawText('Signature et cachet :', { x: 350, y, size: 9, font })

  y -= 10
  page.drawRectangle({ x: margin, y: y - 50, width: 150, height: 50, borderWidth: 0.5, borderColor: rgb(0,0,0) })
  page.drawRectangle({ x: 350, y: y - 50, width: 150, height: 50, borderWidth: 0.5, borderColor: rgb(0,0,0) })

  // Pied de page
  page.drawText(
    `Généré par SABI — ${new Date().toLocaleDateString('fr-CM')}`,
    { x: margin, y: 25, size: 7, font, color: rgb(0.6, 0.6, 0.6) }
  )

  const pdfBytes = await pdfDoc.save()

  return new NextResponse(pdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Annexe-16-${soumission.appelOffre.reference}.pdf"`,
    }
  })
}
```

---

### E.5 — COMPILATION (Module COLEPS)

#### Server Actions
```typescript
// src/app/actions/terrain/compilation.ts
'use server'

import JSZip from 'jszip'
import { put, list } from '@vercel/blob'

// ACTION 1 : Calculer le poids total des fichiers
export async function computeTotalWeight(
  soumissionId: string
): Promise<{
  poidsTotal: number      // En octets
  poidsMo: number         // En Mo
  depasseLimite: boolean
  detail: { module: string; poids: number }[]
}> {

  // Lister tous les blobs associés à cette soumission
  const { blobs } = await list({ prefix: `${soumissionId}/` })

  const detail = [
    {
      module: 'Administratif',
      poids: blobs
        .filter(b => b.pathname.includes('/pieces/'))
        .reduce((s, b) => s + b.size, 0)
    },
    {
      module: 'Technique',
      poids: blobs
        .filter(b =>
          b.pathname.includes('/photos-terrain/') ||
          b.pathname.includes('/cvs/') ||
          b.pathname.includes('/cartes-grises/')
        )
        .reduce((s, b) => s + b.size, 0)
    },
    {
      module: 'Audio & Mémoire',
      poids: blobs
        .filter(b => b.pathname.includes('/audio/'))
        .reduce((s, b) => s + b.size, 0)
    },
  ]

  const poidsTotal = detail.reduce((s, d) => s + d.poids, 0)
  const poidsMo = poidsTotal / (1024 * 1024)
  const LIMITE_MO = 25

  return {
    poidsTotal,
    poidsMo: Math.round(poidsMo * 100) / 100,
    depasseLimite: poidsMo > LIMITE_MO,
    detail,
  }
}

// ACTION 2 : Générer le ZIP final (taxonomie COLEPS)
export async function generateFinalZIP(
  soumissionId: string
): Promise<{ succes: boolean; zipUrl?: string; erreur?: string }> {

  const soumission = await db.query.soumissions.findFirst({
    where: eq(soumissions.id, soumissionId),
    with: {
      appelOffre: { columns: { reference: true } },
      entreprise: { columns: { raisonSociale: true, numeroRCCM: true } }
    }
  })

  if (!soumission) return { succes: false, erreur: 'Soumission introuvable' }

  const zip = new JSZip()

  // Taxonomie COLEPS officielle
  // Format : {REFERENCE_AO}_{RCCM}_{ANNEE}.zip
  const annee = new Date().getFullYear()
  const nomArchive = `${soumission.appelOffre.reference}_${soumission.entreprise.numeroRCCM}_${annee}`

  // Dossier A — Administratif
  const dossierA = zip.folder('EnveloppeA_Administrative')!
  const piecesAdmin = await db.query.piecesAdministratives.findMany({
    where: eq(piecesAdministratives.soumissionId, soumissionId)
  })
  for (const piece of piecesAdmin) {
    const response = await fetch(piece.fichierUrl)
    const buffer = await response.arrayBuffer()
    dossierA.file(piece.fichierNom, buffer)
  }

  // Dossier B — Technique
  const dossierB = zip.folder('EnveloppeB_Technique')!
  // Sous-dossiers selon norme MINTP
  const dossierCVs = dossierB.folder('Personnel_Cle')!
  const dossierMatériel = dossierB.folder('Materiel_Roulant')!
  const dossierVisite = dossierB.folder('Visite_De_Site')!

  // (Itérer sur les fichiers et les ajouter aux bons dossiers)

  // Dossier C — Financier
  const dossierC = zip.folder('EnveloppeC_Financiere')!
  // (Ajouter le BPU Excel + PDF financier)

  // Générer le ZIP
  const zipBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  })

  // Uploader sur Vercel Blob
  const zipBlob = await put(
    `archives/${soumissionId}/${nomArchive}.zip`,
    zipBuffer,
    { access: 'private', contentType: 'application/zip' }
  )

  // Sauvegarder l'URL du ZIP en DB
  await db.update(soumissions)
    .set({
      archiveZipUrl: zipBlob.url,
      archiveGenereeAt: new Date(),
    })
    .where(eq(soumissions.id, soumissionId))

  revalidatePath(`/dashboard/soumissions/${soumissionId}/terrain/compilation`)

  return { succes: true, zipUrl: zipBlob.url }
}
```

---

## 📊 TABLEAU FINAL — Feuille de Route Consolidée

```
┌──────────────┬───────────────────────────────────────┬───────┬────────────────────────────┐
│   SPRINT     │  LIVRABLE                              │ JOURS │  FICHIERS CLÉS             │
├──────────────┼───────────────────────────────────────┼───────┼────────────────────────────┤
│              │                                        │       │                            │
│  ✅ A        │  Radar + Décodeur RPAO                 │  FAIT │  —                         │
│  ✅ B        │  Kanban Pipeline                       │  FAIT │  —                         │
│  ✅ C        │  Hub Détail Soumission                 │  FAIT │  —                         │
│              │                                        │       │                            │
├──────────────┼───────────────────────────────────────┼───────┼────────────────────────────┤
│              │                                        │       │                            │
│  🔴 D        │  Blindage (Vol. A)                     │   3   │  actions/blindage.ts       │
│              │  ├─ Query layer pièces                 │       │  queries/blindage.ts       │
│              │  ├─ Upload pièces admin                │       │  components/blindage/      │
│              │  └─ Calcul avancement auto             │       │  blindage/page.tsx         │
│              │                                        │       │                            │
├──────────────┼───────────────────────────────────────┼───────┼────────────────────────────┤
│              │                                        │       │                            │
│  🔴 E.0      │  Layout Terrain + Navigation           │   1   │  terrain/layout.tsx        │
│              │                                        │       │                            │
│  🔴 E.1      │  Transcripteur                         │   2   │  actions/transcripteur.ts  │
│              │  ├─ Schema memoireTechnique (NEW)       │       │  schema.ts (migration)     │
│              │  ├─ Upload audio → Whisper             │       │  schema.ts (migration)     │
│              │  ├─ Génération chapitre → Gemini        │       │  terrain/transcripteur/    │
│              │  └─ Validation chapitre                │       │                            │
│              │                                        │       │                            │
│  🔴 E.2      │  Garage                                │   1   │  actions/garage.ts         │
│              │  ├─ Lire exigences RPAO                │       │  terrain/garage/           │
│              │  ├─ Affecter engin → soumission        │       │                            │
│              │  └─ Upload carte grise                 │       │                            │
│              │                                        │       │                            │
│  🔴 E.3      │  Équipe                                │   1   │  actions/equipe.ts         │
│              │  ├─ Ajouter membre                     │       │  terrain/equipe/           │
│              │  └─ Upload CV → Extraction IA          │       │                            │
│              │                                        │       │                            │
│  🔴 E.4      │  Descente                              │   2   │  actions/descente.ts       │
│              │  ├─ Upload photo géolocalisée          │       │  api/annexe-16/route.ts    │
│              │  ├─ Sauvegarder observations           │       │  terrain/descente/         │
│              │  └─ Générer Annexe 16 PDF (pdf-lib)    │       │                            │
│              │                                        │       │                            │
│  🔴 E.5      │  Compilation                           │   2   │  actions/compilation.ts    │
│              │  ├─ Calculer poids total               │       │  api/zip-final/route.ts    │
│              │  └─ Générer ZIP COLEPS                 │       │  terrain/compilation/      │
│              │                                        │       │                            │
├──────────────┼───────────────────────────────────────┼───────┼────────────────────────────┤
│              │                                        │       │                            │
│  🔴 F        │  Nkap (Vol. C) + Export Final          │   4   │  actions/nkap.ts           │
│              │  ├─ Tableur BPU interactif             │       │  api/bpu-dqe/route.ts      │
│              │  ├─ Calcul TTC temps réel              │       │  nkap/page.tsx             │
│              │  ├─ Export Excel (exceljs)             │       │  compiler/page.tsx         │
│              │  └─ Page compiler finale               │       │                            │
│              │                                        │       │                            │
├──────────────┼───────────────────────────────────────┼───────┼────────────────────────────┤
│   TOTAL      │                                        │  16   │                            │
│  RESTANT     │                                        │ jours │                            │
└──────────────┴───────────────────────────────────────┴───────┴────────────────────────────┘
```

---

## 🎯 RÈGLE D'EXÉCUTION — Ordre Strict

```
1. D   → Blindage d'abord    (le plus simple, valide le pattern Upload → DB → Avancement)
2. E.0 → Layout Terrain      (débloquer la navigation avant de coder les sous-modules)
3. E.1 → Transcripteur       (le plus complexe, créer le schema d'abord)
4. E.2 → Garage              (tables existent, câblage direct)
5. E.3 → Équipe              (tables existent, câblage direct)
6. E.4 → Descente + Annexe16 (PDF réel — valider que pdf-lib est installé)
7. E.5 → Compilation + ZIP   (dernier — agrège tout le travail précédent)
8. F   → Nkap + Export final (clôture le parcours utilisateur complet)
```