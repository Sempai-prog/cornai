// ══════════════════════════════════════════
// SABI — Client Neon + Drizzle
// ══════════════════════════════════════════

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const sql = neon(process.env.DATABASE_URL!)

export const db = drizzle(sql, { schema })

export type DB = typeof db
