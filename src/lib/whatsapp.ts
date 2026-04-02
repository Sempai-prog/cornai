// ══════════════════════════════════════════
// SABI — Client WhatsApp (WATI)
// ══════════════════════════════════════════

import axios from 'axios'

const api = axios.create({
  baseURL: process.env.WATI_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.WATI_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
})

export async function envoyerMessage(telephone: string, message: string) {
  try {
    // Nettoyer le numéro (enlever le + si présent)
    const numero = telephone.replace('+', '')

    await api.post('/api/v1/sendSessionMessage/' + numero, {
      messageText: message,
    })

    return { success: true }
  } catch (error: any) {
    // Si la session est expirée, envoyer un template
    if (error.response?.status === 400) {
      return envoyerTemplate(telephone, 'notification_ao', {})
    }
    console.error('Erreur WhatsApp:', error.message)
    return { success: false, error: error.message }
  }
}

export async function envoyerTemplate(
  telephone: string,
  templateName: string,
  parametres: Record<string, string>
) {
  try {
    const numero = telephone.replace('+', '')

    await api.post('/api/v1/sendTemplateMessage/' + numero, {
      template_name: templateName,
      broadcast_name: 'SABI_notification',
      parameters: Object.entries(parametres).map(([key, value]) => ({
        name: key,
        value,
      })),
    })

    return { success: true }
  } catch (error: any) {
    console.error('Erreur template WhatsApp:', error.message)
    return { success: false, error: error.message }
  }
}

export async function envoyerDocument(
  telephone: string,
  documentUrl: string,
  nomFichier: string,
  caption?: string
) {
  try {
    const numero = telephone.replace('+', '')

    await api.post('/api/v1/sendSessionFile/' + numero, {
      url: documentUrl,
      filename: nomFichier,
      caption: caption || '',
    })

    return { success: true }
  } catch (error: any) {
    console.error('Erreur envoi document:', error.message)
    return { success: false, error: error.message }
  }
}
