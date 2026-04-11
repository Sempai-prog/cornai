import { getNkapData, importerBPU } from "@/app/actions/nkap"
import { NkapClient } from "./nkap-client"

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function VolumeNkapPage({ params }: PageProps) {
  const { id } = await params

  // 1. Récupérer toutes les données via l'action unifiée
  let data = await getNkapData(id)

  // 2. Fallback Seed (si vide)
  if (data.lignesRaw.length === 0) {
    const defaultLignes = [
      { numero: '101', designation: 'INSTALLATION DE CHANTIER (AMÉNAGEMENT GÉNÉRAL)', unite: 'FF', quantite: '1', prixUnitaire: 2500000, section: 'LOT 100' },
      { numero: '201', designation: 'DÉCAPAGE DE LA TERRE VÉGÉTALE SUR 20CM', unite: 'M2', quantite: '12500', prixUnitaire: 850, section: 'LOT 200', prixReference: 950, scoreAnomalie: 55 },
      { numero: '202', designation: 'TERRASSEMENT EN TRANCHÉES (SOL MEUBLE)', unite: 'M3', quantite: '450', prixUnitaire: 4500, section: 'LOT 200' },
      { numero: '301', designation: 'BÉTON ARMÉ DOSÉ À 350KG/M3 POUR RADIER', unite: 'M3', quantite: '85', prixUnitaire: 185000, section: 'LOT 300', prixReference: 210000, scoreAnomalie: 65 },
      { numero: '401', designation: 'FOURNITURE ET POSE DE BUSE EN BÉTON ARMÉ Ø800', unite: 'ML', quantite: '120', prixUnitaire: 55000, section: 'LOT 400' },
    ]
    await importerBPU(id, defaultLignes)
    data = await getNkapData(id)
  }

  return (
    <div className="p-8 h-full overflow-y-auto animate-in slide-in-from-right-2 duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-foreground uppercase tracking-tighter">Volume C — Offre Financière</h1>
            <p className="text-[10px] font-semibold text-muted-foreground/30 uppercase tracking-[0.2em]">
              Étude de Prix · BPU · DQE · Devis Estimatif · Sprint F
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">Référence DTAO</span>
            <div className="px-3 py-1 bg-muted/20 border border-border/10 rounded-[2px] text-[10px] font-black uppercase text-foreground/60">
              Section V — Offre Financière
            </div>
          </div>
        </div>

        <NkapClient 
          lignes={data.lignesRaw as any} 
          soumissionId={id} 
          montantTotal={data.soumission?.montantOffre || 0} 
        />
      </div>
    </div>
  )
}
