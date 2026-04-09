import { NextRequest, NextResponse } from 'next/server';
import { Annexe16Generator } from '@/lib/generateurs/pdf/annexe-16.generator';
import { getTerrainDataPourAnnexe } from '@/app/actions/terrain';

export async function GET(request: NextRequest) {
  const soumissionId = request.nextUrl.searchParams.get('soumissionId');
  
  if (!soumissionId) {
    return NextResponse.json(
      { erreur: 'soumissionId manquant' }, 
      { status: 400 }
    );
  }
  
  try {
    // Récupérer les données depuis la DB
    const donnees = await getTerrainDataPourAnnexe(soumissionId);
    
    if (!donnees) {
      return NextResponse.json(
        { erreur: 'Aucune visite terrain trouvée pour cette soumission' },
        { status: 404 }
      );
    }
    
    // Générer le PDF
    const generator = new Annexe16Generator({
      filename: `Annexe-16-${donnees.reference}.pdf`,
      title: 'Attestation de Visite de Site'
    });
    
    const result = await generator.generate(donnees);
    
    if (!result.success || !result.blob) {
      throw new Error(result.error || 'Erreur inconnue lors de la génération');
    }

    // Convertir Blob en Buffer pour NextResponse
    const arrayBuffer = await result.blob.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);
    
    // Retourner le fichier avec les bons headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Annexe-16-${donnees.reference}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
    
  } catch (erreur) {
    console.error('[API Annexe-16] Erreur de génération:', erreur);
    return NextResponse.json(
      { erreur: 'Erreur lors de la génération du document' },
      { status: 500 }
    );
  }
}
