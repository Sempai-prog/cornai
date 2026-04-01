import re

with open('src/components/search/search-sidebar.tsx', 'r') as f:
    content = f.read()

# Add tooltip imports
tooltip_imports = 'import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"'
if tooltip_imports not in content:
    content = content.replace('import { cn } from "@/lib/utils"', f'import {{ cn }} from "@/lib/utils"\n{tooltip_imports}')

# Add motion import
motion_imports = 'import { motion, AnimatePresence } from "framer-motion"'
if motion_imports not in content:
    content = content.replace('import { cn } from "@/lib/utils"', f'import {{ cn }} from "@/lib/utils"\n{motion_imports}')

# Modify FilterListItem to handle isCollapsed state
old_filter_item = '''function FilterListItem({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between group rounded-[4px] px-2.5 py-1.5 transition-all text-left",
        isActive ? "bg-secondary text-foreground" : "text-foreground/40 hover:bg-secondary/50 hover:text-foreground/60"
      )}
    >
      <span className={cn("text-[10px] tracking-tight", isActive ? "font-medium" : "font-normal")}>{label}</span>
      <div className={cn(
        "h-3.5 w-3.5 rounded-[2px] border transition-all flex items-center justify-center shrink-0",
        isActive ? "border-primary bg-primary text-white" : "border-border/60 bg-background group-hover:border-foreground/30"
      )}>
        {isActive && <CheckCircle2 className="h-2.5 w-2.5" />}
      </div>
    </button>
  )
}'''

new_filter_item = '''function FilterListItem({ label, isActive, onClick, isCollapsed, icon: Icon }: { label: string, isActive: boolean, onClick: () => void, isCollapsed?: boolean, icon?: any }) {
  const content = (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center group rounded-[4px] transition-all text-left",
        isCollapsed ? "justify-center p-2" : "justify-between px-2.5 py-1.5",
        isActive ? "bg-secondary text-foreground" : "text-foreground/40 hover:bg-secondary/50 hover:text-foreground/60"
      )}
    >
      {!isCollapsed && (
        <span className={cn("text-[10px] tracking-tight truncate mr-2", isActive ? "font-medium" : "font-normal")}>{label}</span>
      )}

      {isCollapsed && Icon && (
        <Icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-primary" : "text-foreground/40 group-hover:text-foreground/60")} />
      )}

      {!isCollapsed && (
        <div className={cn(
          "h-3.5 w-3.5 rounded-[2px] border transition-all flex items-center justify-center shrink-0",
          isActive ? "border-primary bg-primary text-white" : "border-border/60 bg-background group-hover:border-foreground/30"
        )}>
          {isActive && <CheckCircle2 className="h-2.5 w-2.5" />}
        </div>
      )}
      {isCollapsed && isActive && !Icon && (
         <div className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-primary" />
      )}
    </button>
  )

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative w-full">{content}</div>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-[10px] font-medium z-[150]">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return content
}'''

content = content.replace(old_filter_item, new_filter_item)

# Modify the rendering to use AnimatePresence and layout
# We will just rewrite the return of SearchSidebar

# In SearchSidebar props, add motion layout to elements
sidebar_return_old = '''  return (
    <div className="flex h-full flex-col bg-card">
      {/* Search Navigation Context (Always Visible) */}
      <div className={cn(
        "flex h-14 items-center gap-3 px-6 border-b border-border/50",
        isCollapsed && "justify-center px-0"
      )}>
        <div className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-primary group-hover:scale-105 transition-transform shadow-sm shrink-0">
           <Zap className="h-5 w-5 text-white fill-white" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-medium tracking-tight text-foreground truncate">Veille Stratégique</span>
            <span className="text-[8px] font-medium tracking-[0.1em] text-primary -mt-0.5 uppercase truncate">Filtres Actifs</span>
          </div>
        )}
      </div>'''

# Adjust the old return part to search for
with open('src/components/search/search-sidebar.tsx', 'w') as f:
    f.write(content)
