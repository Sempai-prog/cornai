import * as React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: React.ElementType
  titre: string
  description: string
  className?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export function EmptyState({ icon: Icon, titre, description, action, className }: EmptyStateProps) {
  const content = (
    <div className={cn(
      "flex flex-col items-center justify-center py-16 px-8 animate-in fade-in duration-500",
      className
    )}>
      <div className="w-12 h-12 rounded-[4px] bg-muted/20 border border-border/10 flex items-center justify-center mb-4 transition-colors group">
        <Icon className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
      </div>
      <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-[0.2em] mb-2">{titre}</h3>
      <p className="text-[11px] text-muted-foreground/40 text-center max-w-[280px] mb-6 font-medium leading-relaxed uppercase tracking-widest">
        {description}
      </p>
      {action && (
        <>
          {action.href ? (
            <Link href={action.href}>
              <Button variant="outline" size="sm" className="rounded-[4px] text-[10px] h-9 px-6 font-semibold uppercase tracking-widest border-border/10 hover:border-primary/20 hover:bg-primary/[0.02]">
                {action.label}
              </Button>
            </Link>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={action.onClick}
              className="rounded-[4px] text-[10px] h-9 px-6 font-semibold uppercase tracking-widest border-border/10 hover:border-primary/20 hover:bg-primary/[0.02]"
            >
              {action.label}
            </Button>
          )}
        </>
      )}
    </div>
  )

  return content
}
