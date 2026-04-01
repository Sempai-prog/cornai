// ══════════════════════════════════════════
// CORNAi — Dashboard Layout (Flexible Full-Height)
// ══════════════════════════════════════════

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  SidebarProvider, 
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  Target, 
  Files, 
  User, 
  Bell, 
  LogOut,
  Search,
  ShieldCheck,
  ChevronLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { GlobalSearch } from "@/components/layout/global-search"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import GlobalGridBackground from "@/components/ui/global-grid-background"

// Composant interne pour accéder au contexte SidebarProvider
function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { toggleSidebar, state, isMobile } = useSidebar()
  const isCollapsed = state === "collapsed"

  const navItems = [
    { label: "Poste de pilotage", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Moteur de recherche", icon: Search, href: "/dashboard/appels-offres" },
    { label: "Veille stratégique", icon: Target, href: "/dashboard/opportunites" },
  ]

  const workspaceItems = [
    { label: "Dossier PME", icon: Files, href: "/dashboard/documents" },
    { label: "Fiche Entreprise", icon: User, href: "/dashboard/profil" },
  ]

  // Détecter si on est sur le Kanban (Opportunités) pour désactiver le scroll global
  const isKanban = pathname === "/dashboard/opportunites"

  return (
    <div className="flex h-screen w-full bg-background/5 text-foreground overflow-hidden font-sans selection:bg-primary/20 antialiased transition-colors duration-500 relative">
      <GlobalGridBackground />
        
      {/* SIDEBAR V1.7 - Elite Cockpit */}
      <Sidebar 
        collapsible="icon" 
        className="border-r border-border/40 bg-card/80 backdrop-blur-xl z-30 transition-all duration-500 ease-in-out shadow-2xl shadow-black/20"
      >
        <SidebarHeader className="h-14 flex flex-row items-center justify-between px-6 border-b border-border/40 overflow-hidden shrink-0">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity shrink-0">
             <div className="w-6 h-6 bg-primary flex items-center justify-center rounded-[4px] shadow-[0_0_15px_rgba(37,211,102,0.2)]">
                <ShieldCheck className="w-4 h-4 text-white" strokeWidth={2.5} />
             </div>
             {!isCollapsed && (
               <motion.span 
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -10 }}
                 className="font-semibold tracking-tighter text-base text-foreground uppercase tracking-[0.05em]"
               >
                 CORNAi
               </motion.span>
             )}
          </Link>
        </SidebarHeader>

        <SidebarContent className="py-6 space-y-8">
          <SidebarMenu>
            <div className="px-6 mb-4">
              <h3 className={cn(
                "text-[10px] font-semibold text-foreground/30 uppercase tracking-[0.2em] transition-opacity duration-300",
                isCollapsed ? "opacity-0" : "opacity-100"
              )}>
                Exploitation
              </h3>
            </div>
            <div className="px-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      tooltip={isCollapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center gap-3 py-2 text-[13px] font-semibold transition-all group pr-4 rounded-[4px] relative",
                        isActive 
                          ? "bg-foreground/10 text-foreground pl-5 border-l-2 border-primary" 
                          : "text-foreground/40 hover:text-foreground hover:bg-foreground/5 pl-5 border-l-2 border-transparent"
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-foreground/20 group-hover:text-foreground/50")} />
                        {!isCollapsed && <span>{item.label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </div>
          </SidebarMenu>

          <SidebarMenu>
            <div className="px-6 mb-4 mt-8">
              <h3 className={cn(
                "text-[10px] font-semibold text-foreground/30 uppercase tracking-[0.2em] transition-opacity duration-300",
                isCollapsed ? "opacity-0" : "opacity-100"
              )}>
                Workspace
              </h3>
            </div>
            <div className="px-3 space-y-1">
              {workspaceItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      tooltip={isCollapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center gap-3 py-2 text-[13px] font-semibold transition-all group pr-4 rounded-[4px] relative",
                        isActive 
                          ? "bg-foreground/10 text-foreground pl-5 border-l-2 border-primary" 
                          : "text-foreground/40 hover:text-foreground hover:bg-foreground/5 pl-5 border-l-2 border-transparent"
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-foreground/20 group-hover:text-foreground/50")} />
                        {!isCollapsed && <span>{item.label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </div>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-border/40">
           <button className="flex w-full items-center gap-3 px-4 py-2 rounded-[4px] text-[13px] font-semibold text-foreground/30 hover:text-foreground hover:bg-foreground/5 transition-colors overflow-hidden">
              <LogOut className="h-4 w-4 shrink-0" />
              {!isCollapsed && <span>Déconnexion</span>}
           </button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative z-20 transition-all duration-500 ease-in-out">
        {/* Panel-Toggle Controller v1.7 - Elite Cockpit Priority Layering */}
        {!isMobile && (
          <motion.button
            onClick={() => toggleSidebar()}
            className={cn(
              "fixed top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center bg-background border border-border/40 rounded-full shadow-xl z-[100] group hover:border-primary/40 transition-all duration-500 ring-4 ring-background",
              "left-[calc(var(--sidebar-width)+1px)] -translate-x-1/2",
              isCollapsed && "left-[calc(var(--sidebar-width-icon)+1px)]"
            )}
            style={{ 
              transitionProperty: "left",
              transitionDuration: "500ms",
              transitionTimingFunction: "ease-in-out"
            }}
            whileHover={{ scale: 1.1, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft 
              size={12} 
              className={cn(
                "text-foreground/40 group-hover:text-primary transition-transform duration-500 ease-in-out",
                isCollapsed && "rotate-180"
              )} 
            />
            
            {/* Intelligence Tooltip */}
            <div className="absolute left-8 px-2 py-1 bg-black text-white text-[9px] font-bold rounded-[4px] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-white/5 translate-x-2 group-hover:translate-x-0">
              {isCollapsed ? "OUVRIR NAVIGATION" : "FERMER NAVIGATION"}
            </div>
          </motion.button>
        )}

        <header className="h-14 flex items-center justify-between px-6 lg:px-8 border-b border-border/40 bg-card/70 backdrop-blur-md z-40 shrink-0 relative">

              {/* Mobile Trigger */}
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              
              <div className="h-4 w-px bg-border/40 mx-1 hidden md:block" />
              <GlobalSearch />
            </div>

           <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1 rounded-[4px] border border-border/40 bg-muted/30 transition-all">
                 <div className="w-1 h-1 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(37,211,102,0.4)]" />
                 <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest opacity-80">SME ACTIVE</span>
              </div>
              
              <div className="w-px h-4 bg-border/40 mx-1" />

              <ThemeToggle />

               <button className="h-6 w-6 flex items-center justify-center rounded-full border border-border/40 bg-foreground/[0.02] text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-colors relative shadow-sm">
                 <Bell className="h-3 w-3" />
                 <span className="absolute top-1.5 right-1.5 w-1 h-1 bg-primary rounded-full shadow-[0_0_4px_rgba(37,211,102,0.4)]" />
              </button>
           </div>
        </header>

        {/* CONTAINER DINAMIQUE */}
        <main className={cn(
          "flex-1 flex flex-col min-h-0",
          !isKanban && "overflow-y-auto custom-scrollbar"
        )}>
           <div className={cn(
             "w-full flex-1 flex flex-col",
             isKanban ? "px-6 lg:px-8 py-6" : "max-w-[1400px] mx-auto px-6 lg:px-8 py-8 md:py-10"
           )}>
              {children}
           </div>
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardShell>{children}</DashboardShell>
    </SidebarProvider>
  )
}
