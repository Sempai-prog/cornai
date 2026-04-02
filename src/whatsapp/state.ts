// ══════════════════════════════════════════
// SABI — Gestion de l'état (State Management)
// ══════════════════════════════════════════

export type ConversationState = {
  telephone: string
  etape: 'idle' | 'inscription_nom' | 'inscription_secteur' | 
         'inscription_budget' | 'inscription_region' | 
         'inscription_confirmation' | 'attente_reponse_ao'
  data: Record<string, any>
  lastActivity: Date
}

// Pour le dev, on garde en mémoire. En prod, on utilisera Cloudflare KV ou Redis.
const states = new Map<string, ConversationState>()

const SESSION_TIMEOUT_MS = 30 * 60 * 1000 // 30 minutes

/**
 * Récupère l'état d'un utilisateur
 */
export function getState(telephone: string): ConversationState {
  const state = states.get(telephone)
  
  if (!state) {
    return createInitialState(telephone)
  }

  // Vérifier l'expiration
  if (isExpired(state)) {
    clearState(telephone)
    return createInitialState(telephone)
  }

  return state
}

/**
 * Met à jour l'état d'un utilisateur
 */
export function setState(telephone: string, part: Partial<ConversationState>) {
  const current = getState(telephone)
  states.set(telephone, {
    ...current,
    ...part,
    lastActivity: new Date()
  })
}

/**
 * Reset l'état
 */
export function clearState(telephone: string) {
  states.delete(telephone)
}

/**
 * Vérifie si la session est expirée
 */
export function isExpired(state: ConversationState): boolean {
  const now = new Date().getTime()
  const last = state.lastActivity.getTime()
  return (now - last) > SESSION_TIMEOUT_MS
}

/**
 * Crée un état initial
 */
function createInitialState(telephone: string): ConversationState {
  return {
    telephone,
    etape: 'idle',
    data: {},
    lastActivity: new Date()
  }
}
