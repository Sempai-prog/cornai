import ExcelJS from 'exceljs';
import { GenerateurOptions, GenerationResult } from '../types';

export abstract class GenerateurExcel {
  protected workbook: ExcelJS.Workbook;
  protected options: GenerateurOptions;

  constructor(options: GenerateurOptions) {
    this.options = options;
    this.workbook = new ExcelJS.Workbook();
    this.workbook.creator = options.author || 'SABI System';
    this.workbook.title = options.title || 'Export SABI';
    this.workbook.created = new Date();
  }

  /**
   * Méthode principale à implémenter pour construire le classeur
   */
  abstract generate(data: any): Promise<GenerationResult>;

  /**
   * Finalise le classeur et retourne le blob
   */
  protected async finaliser(): Promise<GenerationResult> {
    try {
      const buffer = await this.workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      let url = undefined;

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
        error: error instanceof Error ? error.message : 'Erreur de finalisation Excel'
      };
    }
  }
}
