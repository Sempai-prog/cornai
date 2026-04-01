import re

with open('src/components/search/search-sidebar.tsx', 'r') as f:
    content = f.read()

# Replace the ScrollArea content logic to handle both collapsed and open state cleanly with tooltips and centered icons.
# We will just rewrite the `SearchSidebar` component body completely to ensure it's clean and matches specs.

new_component = '''export function SearchSidebar({ isCollapsed, filters, onFilterChange }: SidebarProps) {
  const toggleFilter = (key: string, value: string) => {
    const currentValues = filters[key] || []
    if (currentValues.includes(value)) {
      onFilterChange(key, currentValues.filter((v: string) => v !== value))
    } else {
      onFilterChange(key, [...currentValues, value])
    }
  }

  const renderFilterSection = (
    title: string,
    key: string,
    options: { val: string, label: string }[],
    Icon: any
  ) => {
    return (
      <div className={cn("space-y-3", isCollapsed ? "px-0 flex flex-col items-center" : "px-3")}>
        {!isCollapsed && (
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-medium tracking-widest text-foreground/30 uppercase">{title}</h4>
            <Icon className="h-3 w-3 text-foreground/20" />
          </div>
        )}
        <div className={cn("space-y-1 w-full", isCollapsed && "flex flex-col items-center gap-2")}>
          {options.map((opt) => (
            <FilterListItem
              key={opt.val}
              label={opt.label}
              isActive={filters[key].includes(opt.val)}
              onClick={() => toggleFilter(key, opt.val)}
              isCollapsed={isCollapsed}
              icon={isCollapsed ? Icon : undefined}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-card w-full">
      {/* Search Navigation Context (Always Visible) */}
      <div className={cn(
        "flex h-14 items-center gap-3 border-b border-border/50 shrink-0",
        isCollapsed ? "justify-center px-0 w-full" : "px-6"
      )}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-primary transition-transform shadow-sm">
           <Zap className="h-5 w-5 text-white fill-white" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-medium tracking-tight text-foreground truncate">Veille Stratégique</span>
            <span className="text-[8px] font-medium tracking-[0.1em] text-primary -mt-0.5 uppercase truncate">Filtres Actifs</span>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 overflow-x-hidden">
        <div className={cn("py-4", isCollapsed ? "px-2" : "px-3")}>
          <div className="space-y-6">
            {renderFilterSection(
              "Secteurs",
              "secteurs",
              [
                { val: "Travaux", label: "BTP / Génie Civil" },
                { val: "Fournitures", label: "Fournitures" },
                { val: "Services", label: "Intellectuelles" }
              ],
              Layers
            )}

            <Separator className={cn("opacity-30", isCollapsed ? "mx-2" : "mx-3")} />

            {renderFilterSection(
              "Procédures",
              "procedures",
              [
                { val: "AONO", label: "AONO" },
                { val: "AONR", label: "AONR" },
                { val: "DC", label: "DC" },
                { val: "AAMI", label: "AAMI" }
              ],
              Activity
            )}

            <Separator className={cn("opacity-30", isCollapsed ? "mx-2" : "mx-3")} />

            <div className={cn("space-y-3", isCollapsed ? "px-0 flex flex-col items-center" : "px-3")}>
              {!isCollapsed && (
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-medium tracking-widest text-foreground/30 uppercase">Régions</h4>
                  <MapPin className="h-3 w-3 text-foreground/20" />
                </div>
              )}
              {isCollapsed ? (
                <div className="space-y-2 w-full flex flex-col items-center">
                   {["Centre", "Littoral", "Ouest", "Nord", "Est", "Sud"].map(r => (
                     <FilterListItem
                        key={r}
                        label={r}
                        isActive={filters.regions.includes(r)}
                        onClick={() => toggleFilter("regions", r)}
                        isCollapsed={true}
                        icon={MapPin}
                     />
                   ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1.5">
                  {["Centre", "Littoral", "Ouest", "Nord", "Est", "Sud"].map((r) => (
                    <button
                      key={r}
                      onClick={() => toggleFilter("regions", r)}
                      className={cn(
                        "flex items-center justify-center rounded-[4px] border py-1.5 text-[9px] font-medium transition-all w-full",
                        filters.regions.includes(r)
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-foreground/30 hover:border-foreground/20"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reset Logic */}
            {!isCollapsed && (
              <div className="px-3 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                      onFilterChange("secteurs", [])
                      onFilterChange("procedures", [])
                      onFilterChange("regions", [])
                      onFilterChange("matchLevels", [])
                  }}
                  className="h-8 w-full justify-center text-[10px] font-normal text-foreground/30 hover:text-foreground/60 p-0 hover:bg-transparent"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}'''

# Extract the part between `export function SearchSidebar` and `function FilterListItem`
old_pattern = re.compile(r'export function SearchSidebar.*?return \(.*?</ScrollArea>\s*</div>\s*\)\s*}', re.DOTALL)
content = old_pattern.sub(new_component, content)

with open('src/components/search/search-sidebar.tsx', 'w') as f:
    f.write(content)
