import { jsPDF } from 'jspdf';
import { GenerateurOptions, GenerationResult } from '../types';
import { appliquerEnTeteOfficiel } from './templates/en-tete';
import 'jspdf-autotable';

export abstract class GenerateurPDF {
  protected doc: jsPDF;
  protected options: GenerateurOptions;

  constructor(options: GenerateurOptions) {
    this.options = options;
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true
    });
  }

  /**
   * Méthode principale à implémenter pour construire le document
   */
  abstract generate(data: any): Promise<GenerationResult>;

  /**
   * Ajoute une en-tête standard (Logo, République du Cameroun, etc.)
   */
  protected async ajouterEnTete() {
    appliquerEnTeteOfficiel(this.doc);
  }

  /**
   * Sauvegarde le document ou retourne le blob
   */
  protected finaliser(): GenerationResult {
    try {
      const blob = this.doc.output('blob');
      let url = undefined;
      
      // Sécurité serveur (URL.createObjectURL n'existe pas sur Node.js)
      if (typeof window !== 'undefined') {
        url = URL.createObjectURL(blob);
      }
      
      return {
        success: true,
        blob,
        url
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur de finalisation PDF'
      };
    }
  }
}
