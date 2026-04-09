import { GenerateurPDF } from './generateur-pdf';
import { GenerationResult } from '../types';

export interface Annexe16Data {
  // Données du marché
  reference: string;
  intituleMarche: string;
  maitreDOuvrage: string;
  
  // Données de la visite
  dateVisite: Date;
  lieuVisite: string;
  representantMaitrise: string;
  functionRepresentant: string;
  
  // Données de l'entreprise soumissionnaire
  nomEntreprise: string;
  representantEntreprise: string;
  qualiteRepresentant: string;
  
  // Observations terrain
  observations: string;
}

export class Annexe16Generator extends GenerateurPDF {
  async generate(donnees: Annexe16Data): Promise<GenerationResult> {
    try {
      await this.ajouterEnTete();

      // Ministère et maître d'ouvrage (sous l'en-tête à gauche)
      this.doc.setFontSize(8);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(donnees.maitreDOuvrage, 20, 36);
      
      // TITRE DU DOCUMENT
      this.doc.setFontSize(13);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('ANNEXE N° 16', 105, 55, { align: 'center' });
      
      this.doc.setFontSize(11);
      this.doc.text('ATTESTATION DE VISITE DE SITE', 105, 63, { align: 'center' });
      
      // Ligne de séparation
      this.doc.setDrawColor(0, 0, 0);
      this.doc.setLineWidth(0.5);
      this.doc.line(20, 68, 190, 68);
      
      // CORPS DU DOCUMENT
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'normal');
      
      // Référence du marché
      this.doc.text(`Appel d'Offres N° : ${donnees.reference}`, 20, 80);
      this.doc.text(`Objet : ${donnees.intituleMarche}`, 20, 88);
      
      // Corps du texte
      const texteCorps = `
Je soussigné, ${donnees.representantMaitrise}, ${donnees.functionRepresentant} 
de ${donnees.maitreDOuvrage}, certifie que :

M./Mme ${donnees.representantEntreprise}, agissant en qualité de ${donnees.qualiteRepresentant}
de l'entreprise ${donnees.nomEntreprise}, a effectué la visite du site 
le ${donnees.dateVisite.toLocaleDateString('fr-CM', { 
    day: '2-digit', month: 'long', year: 'numeric' 
  })}
au lieu suivant : ${donnees.lieuVisite}.

Observations faites lors de la visite :
      `.trim();
      
      const lignes = this.doc.splitTextToSize(texteCorps, 170);
      this.doc.text(lignes, 20, 98);
      
      // Zone observations
      const yObservations = 98 + (lignes.length * 6);
      this.doc.rect(20, yObservations, 170, 30);
      
      const obsLignes = this.doc.splitTextToSize(donnees.observations || 'Néant', 165);
      this.doc.text(obsLignes, 22, yObservations + 6);
      
      // SIGNATURES
      const ySignatures = yObservations + 45;
      
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Pour le Maître d\'Ouvrage', 30, ySignatures);
      this.doc.text('Pour l\'Entreprise', 130, ySignatures);
      
      this.doc.setFont('helvetica', 'normal');
      this.doc.text('Signature et cachet :', 30, ySignatures + 8);
      this.doc.text('Signature et cachet :', 130, ySignatures + 8);
      
      // Zones de signature
      this.doc.rect(30, ySignatures + 12, 60, 25);
      this.doc.rect(130, ySignatures + 12, 60, 25);
      
      // Noms sous les signatures
      this.doc.setFontSize(9);
      this.doc.text(donnees.representantMaitrise, 60, ySignatures + 42, { align: 'center' });
      this.doc.text(donnees.representantEntreprise, 160, ySignatures + 42, { align: 'center' });
      
      // PIED DE PAGE (Sourced from base class metadata + localized date)
      this.doc.setFontSize(7);
      this.doc.setTextColor(150, 150, 150);
      this.doc.text(
        'Document généré par SABI — Plateforme de gestion des marchés publics', 
        105, 285, 
        { align: 'center' }
      );
      this.doc.text(
        `Généré le ${new Date().toLocaleDateString('fr-CM')} à ${new Date().toLocaleTimeString('fr-CM')}`,
        105, 289,
        { align: 'center' }
      );

      return this.finaliser();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de la génération de l\'Annexe 16'
      };
    }
  }
}
