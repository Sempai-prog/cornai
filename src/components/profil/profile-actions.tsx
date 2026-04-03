"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function ProfilImprovementButton() {
  return (
    <Button 
      variant="ghost" 
      className="w-full h-9 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/5 gap-2 rounded-[4px] border border-primary/10"
      onClick={() => {
        toast.info("Analyse de puissance technique...", {
          description: "SABI analyse vos références pour identifier les marchés à fort potentiel."
        })
      }}
    >
      Améliorer le score <ArrowRight size={12} />
    </Button>
  )
}
