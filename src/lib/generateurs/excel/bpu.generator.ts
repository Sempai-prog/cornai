import { GenerateurExcel } from './generateur-excel';
import { GenerationResult } from '../types';

export interface LigneBPU {
  numero: number;
  designation: string;
  unite: string;
  prixUnitaire: number;
}

export interface DonneesExcelBPU {
  soumission: {
    reference: string;
    intitule: string;
    maitreDOuvrage: string;
    entreprise: string;
  };
  lignesBPU: LigneBPU[];
  lignesDQE: Array<LigneBPU & { quantite: number }>;
}

export class BPUGenerator extends GenerateurExcel {
  async generate(donnees: DonneesExcelBPU): Promise<GenerationResult> {
    try {
      // ═══════════════════════════════════════
      // FEUILLE 1 : BORDEREAU DES PRIX UNITAIRES (BPU)
      // ═══════════════════════════════════════
      const feuilleBPU = this.workbook.addWorksheet('BPU', {
        pageSetup: { 
          paperSize: 9, // A4
          orientation: 'landscape',
          fitToPage: true
        }
      });
      
      // Définition des colonnes
      const columnsBPU = [
        { key: 'numero', width: 8 },
        { key: 'designation', width: 50 },
        { key: 'unite', width: 12 },
        { key: 'prixUnitaire', width: 20 },
        { key: 'prixEnLettres', width: 40 },
      ];
      feuilleBPU.columns = columnsBPU;
      
      // En-tête du document
      feuilleBPU.mergeCells('A1:E1');
      const celleTitre = feuilleBPU.getCell('A1');
      celleTitre.value = `BORDEREAU DES PRIX UNITAIRES — ${donnees.soumission.reference}`;
      Object.assign(celleTitre, {
        font: { bold: true, size: 13, color: { argb: 'FFFFFFFF' } },
        alignment: { horizontal: 'center', vertical: 'middle' },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } }
      });
      feuilleBPU.getRow(1).height = 30;
      
      feuilleBPU.mergeCells('A2:E2');
      const celleMarche = feuilleBPU.getCell('A2');
      celleMarche.value = donnees.soumission.intitule;
      celleMarche.font = { size: 10, italic: true };
      celleMarche.alignment = { horizontal: 'center' };
      
      // En-têtes des colonnes
      const enteteRow = feuilleBPU.addRow([
        'N°', 'Désignation des Travaux', 'Unité', 'Prix Unitaire (FCFA HT)', 'Prix en Lettres'
      ]);
      
      enteteRow.eachCell(cellule => {
        Object.assign(cellule, {
          font: { bold: true, size: 10, color: { argb: 'FFFFFFFF' }, name: 'Calibri' },
          alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF334155' } },
          border: {
            top: { style: 'thin' }, left: { style: 'thin' },
            bottom: { style: 'thin' }, right: { style: 'thin' }
          }
        });
      });
      enteteRow.height = 35;
      
      // Données des lignes
      donnees.lignesBPU.forEach((ligne, index) => {
        const row = feuilleBPU.addRow([
          ligne.numero,
          ligne.designation,
          ligne.unite,
          ligne.prixUnitaire,
          '' // Conversion en lettres
        ]);
        
        const couleurFond = index % 2 === 0 ? 'FFF8FAFC' : 'FFFFFFFF';
        
        row.eachCell(cellule => {
          cellule.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: couleurFond } };
          cellule.border = {
            top: { style: 'hair' }, left: { style: 'thin' },
            bottom: { style: 'hair' }, right: { style: 'thin' }
          };
        });
        
        row.getCell(4).numFmt = '#,##0 "FCFA"';
        row.getCell(4).alignment = { horizontal: 'right' };
      });
      
      // ═══════════════════════════════════════
      // FEUILLE 2 : DQE (AVEC FORMULES)
      // ═══════════════════════════════════════
      const feuilleDQE = this.workbook.addWorksheet('DQE', {
        pageSetup: { paperSize: 9, orientation: 'landscape', fitToPage: true }
      });
      
      feuilleDQE.columns = [
        { key: 'numero', width: 8 },
        { key: 'designation', width: 50 },
        { key: 'unite', width: 12 },
        { key: 'quantite', width: 15 },
        { key: 'prixUnitaire', width: 20 },
        { key: 'montantHT', width: 22 },
      ];
      
      // En-têtes DQE
      const enteteDQE = feuilleDQE.addRow([
        'N°', 'Désignation', 'Unité', 'Quantité', 'Prix Unitaire (FCFA HT)', 'Montant HT (FCFA)'
      ]);
      
      enteteDQE.eachCell(cellule => {
        Object.assign(cellule, {
          font: { bold: true, size: 10, color: { argb: 'FFFFFFFF' }, name: 'Calibri' },
          alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
          fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF334155' } },
          border: {
            top: { style: 'thin' }, left: { style: 'thin' },
            bottom: { style: 'thin' }, right: { style: 'thin' }
          }
        });
      });

      const premiereLigneDQE = 2; // Index de la première ligne de données
      
      donnees.lignesDQE.forEach((ligne, index) => {
        const numeroLigneExcel = premiereLigneDQE + index;
        const row = feuilleDQE.addRow([
          ligne.numero,
          ligne.designation,
          ligne.unite,
          ligne.quantite,
          ligne.prixUnitaire,
          // ✅ FORMULE EXCEL — Quantité × Prix Unitaire
          { formula: `D${numeroLigneExcel}*E${numeroLigneExcel}` }
        ]);
        
        row.getCell(5).numFmt = '#,##0 "FCFA"';
        row.getCell(6).numFmt = '#,##0 "FCFA"';
      });
      
      // Ligne TOTAL avec formule SOMME
      const derniereLigneDonnees = premiereLigneDQE + donnees.lignesDQE.length - 1;
      const ligneTotal = feuilleDQE.addRow([
        '', 'TOTAL GÉNÉRAL HT', '', '', '',
        // ✅ FORMULE SOMME
        { formula: `SUM(F${premiereLigneDQE}:F${derniereLigneDonnees})` }
      ]);
      
      ligneTotal.getCell(6).numFmt = '#,##0 "FCFA"';
      ligneTotal.font = { bold: true, size: 11 };
      ligneTotal.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDBEAFE' } };

      return await this.finaliser();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur de génération DQE'
      };
    }
  }
}
