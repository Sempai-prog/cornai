// ══════════════════════════════════════════
// SABI — Variables d'environnement typées
// ══════════════════════════════════════════

export const env = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL!,

  // AI
  GEMINI_API_KEY: process.env.GEMINI_API_KEY!,

  // WhatsApp
  WATI_API_URL: process.env.WATI_API_URL!,
  WATI_API_TOKEN: process.env.WATI_API_TOKEN!,
  WATI_WEBHOOK_VERIFY_TOKEN: process.env.WATI_WEBHOOK_VERIFY_TOKEN!,

  // Payment
  NOTCHPAY_PUBLIC_KEY: process.env.NOTCHPAY_PUBLIC_KEY!,
  NOTCHPAY_SECRET_KEY: process.env.NOTCHPAY_SECRET_KEY!,

  // Email
  RESEND_API_KEY: process.env.RESEND_API_KEY!,

  // R2 Storage
  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID!,
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY!,
  R2_BUCKET_NAME: process.env.R2_BUCKET_NAME || 'SABI-docs',
  R2_ENDPOINT: process.env.R2_ENDPOINT!,

  // App
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003',
  APP_SECRET: process.env.APP_SECRET!,
  NODE_ENV: process.env.NODE_ENV || 'development',

  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const
