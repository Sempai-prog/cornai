'use client'

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationSabiProps {
  page: number
  totalPages: number
  total: number
  onPageChange: (page: number) => void
}

/**
 * Composant de pagination globale V1.6
 * Design : Silent Cockpit (Radius 4px, Tabular Nums)
 */
export function PaginationSabi({ page, totalPages, total, onPageChange }: PaginationSabiProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between py-4 mt-6 border-t border-border/10">
      {/* Compteur d'items */}
      <span className="text-[10px] uppercase font-bold text-muted-foreground/40 tracking-[0.2em] tabular-nums">
        {total} Appels d&apos;offres en base
      </span>
      
      {/* Contrôles de navigation */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 rounded-[4px] border-border/10 hover:bg-muted/5 transition-all"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </Button>
        
        <div className="flex items-center justify-center min-w-[60px] h-8 bg-muted/5 border border-border/10 rounded-[4px] px-3">
          <span className="text-[11px] font-bold tabular-nums text-foreground/60 tracking-tight">
            {page} <span className="text-muted-foreground/30 mx-1">/</span> {totalPages}
          </span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 rounded-[4px] border-border/10 hover:bg-muted/5 transition-all"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  )
}
