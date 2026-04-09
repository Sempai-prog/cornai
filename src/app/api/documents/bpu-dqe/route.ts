import { NextRequest, NextResponse } from 'next/server';
import { BPUGenerator } from '@/lib/generateurs/excel/bpu.generator';
import { getNkapData } from '@/app/actions/nkap';

export async function GET(request: NextRequest) {
  const soumissionId = request.nextUrl.searchParams.get('soumissionId');
  
  if (!soumissionId) {
    return NextResponse.json({ erreur: 'soumissionId manquant' }, { status: 400 });
  }
  
  try {
    const donnees = await getNkapData(soumissionId);
    
    if (!donnees) {
      return NextResponse.json({ erreur: 'Données financières introuvables' }, { status: 404 });
    }
    
    const generator = new BPUGenerator({
      filename: `SABI-BPU-DQE-${donnees.soumission.reference}.xlsx`,
      title: 'Bordereau des Prix Unitaires & DQE',
      author: 'SABI Finance'
    });
    
    const result = await generator.generate(donnees);
    
    if (!result.success || !result.blob) {
      throw new Error(result.error || 'Erreur inconnue lors de la génération Excel');
    }

    const arrayBuffer = await result.blob.arrayBuffer();
    const excelBuffer = Buffer.from(arrayBuffer);
    const nomFichier = `SABI-BPU-DQE-${donnees.soumission.reference}.xlsx`;
    
    return new NextResponse(excelBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${nomFichier}"`,
        'Content-Length': excelBuffer.length.toString(),
      },
    });
  } catch (erreur) {
    console.error('[API BPU-DQE] Erreur:', erreur);
    return NextResponse.json({ erreur: 'Erreur lors de la génération du fichier Excel' }, { status: 500 });
  }
}
