// ══════════════════════════════════════════
// SABI — Cloudflare R2 Storage Helper
// Remplace @vercel/blob · Compatible S3
// ══════════════════════════════════════════

import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// R2 est compatible S3 — On utilise le SDK AWS
export const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

/**
 * Upload un fichier (File) vers R2.
 * Remplace `put()` de @vercel/blob.
 */
export async function uploadToR2(
  fichier: File,
  chemin: string,
  options?: { contentType?: string }
): Promise<{ url: string; chemin: string }> {

  const buffer = Buffer.from(await fichier.arrayBuffer())
  const contentType = options?.contentType ?? fichier.type

  await r2Client.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: chemin,
    Body: buffer,
    ContentType: contentType,
    ContentLength: buffer.length,
  }))

  // Générer une URL signée valable 7 jours
  const url = await getSignedUrl(
    r2Client,
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: chemin,
    }),
    { expiresIn: 604800 }   // 7 jours en secondes
  )

  return { url, chemin }
}

/**
 * Upload un Buffer brut vers R2.
 * Pour les PDFs générés côté serveur (Annexe 16, etc.)
 */
export async function uploadBufferToR2(
  buffer: Buffer,
  chemin: string,
  contentType: string
): Promise<{ url: string; chemin: string }> {

  await r2Client.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: chemin,
    Body: buffer,
    ContentType: contentType,
    ContentLength: buffer.length,
  }))

  const url = await getSignedUrl(
    r2Client,
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: chemin,
    }),
    { expiresIn: 604800 }
  )

  return { url, chemin }
}

/**
 * Liste les fichiers d'un préfixe R2.
 * Pour calculer le poids total dans la Compilation (E.5).
 */
export async function listR2Files(prefix: string) {
  const response = await r2Client.send(new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET_NAME!,
    Prefix: prefix,
  }))

  return response.Contents ?? []
}
