import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  ArrowRight
} from "lucide-react"

import { getDerniersAO } from "@/database/queries/ao"
import { mapDBAOToUI } from "@/components/search/search-utils"
import { SearchShellCompact } from "@/components/search/search-shell-compact"

export default async function AppelsOffresPage() {
  const dbAos = await getDerniersAO(20)
  const results = dbAos.map(mapDBAOToUI)
  
  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-140px)]">
      <div className="shrink-0 space-y-2">
         <h1 className="text-2xl font-black tracking-tight">Marchés publics en temps réel</h1>
         <p className="text-muted-foreground text-sm">Données synchronisées avec COLEPS et le Journal des Marchés.</p>
      </div>

      <div className="flex-1 min-h-0">
        <SearchShellCompact initialResults={results} />
      </div>
    </div>
  )
}
