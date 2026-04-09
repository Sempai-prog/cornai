import { jsPDF } from 'jspdf';

/**
 * Applique l'en-tête officiel de la République du Cameroun sur une page PDF
 */
export function appliquerEnTeteOfficiel(doc: jsPDF) {
  const oldFontSize = doc.getFontSize();
  const oldFont = doc.getFont();

  // RÉPUBLIQUE DU CAMEROUN
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('RÉPUBLIQUE DU CAMEROUN', 20, 15);
  doc.setFont('helvetica', 'normal');
  doc.text('Paix - Travail - Patrie', 25, 19);
  
  // REPUBLIC OF CAMEROON
  doc.setFont('helvetica', 'bold');
  doc.text('REPUBLIC OF CAMEROON', 150, 15);
  doc.setFont('helvetica', 'normal');
  doc.text('Peace - Work - Fatherland', 155, 19);

  // Séparateur
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 23, 190, 23);

  // Restaurer
  doc.setFont(oldFont.fontName, oldFont.fontStyle);
  doc.setFontSize(oldFontSize);
}
