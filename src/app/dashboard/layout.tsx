// ══════════════════════════════════════════
// CORNAi — Dashboard Layout (Flexible Full-Height)
// ══════════════════════════════════════════

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  SidebarProvider, 
  useSidebar
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
  PanelLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { GlobalSearch } from "@/components/layout/global-search"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import GlobalGridBackground from "@/components/ui/global-grid-background"

// Composant interne pour accéder au contexte SidebarProvider
function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()

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
        
      {/* SIDEBAR */}
      <aside className="w-64 flex-shrink-0 flex flex-col border-r border-border/40 bg-card/80 backdrop-blur-xl z-20">
        <div className="h-14 flex items-center px-6 border-b border-border/40">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
             <div className="w-6 h-6 bg-primary flex items-center justify-center rounded-[4px]">
                <ShieldCheck className="w-4 h-4 text-white" strokeWidth={2.5} />
             </div>
             <span className="font-semibold tracking-tighter text-base text-foreground uppercase tracking-[0.05em]">CORNAi</span>
          </Link>
        </div>

        <div className="flex-1 py-6 space-y-8 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            <h3 className="text-[10px] font-semibold text-foreground/30 uppercase tracking-[0.2em] mb-4 px-6">Exploitation</h3>
            <div className="px-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 py-2 text-[13px] font-semibold transition-all group pr-4 rounded-[4px] relative",
                      isActive 
                        ? "bg-foreground/10 text-foreground pl-5 border-l-2 border-primary" 
                        : "text-foreground/40 hover:text-foreground hover:bg-foreground/5 pl-5 border-l-2 border-transparent"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-foreground/20 group-hover:text-foreground/50")} />
                    <span className={cn(isActive && "text-foreground")}>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-[10px] font-semibold text-foreground/30 uppercase tracking-[0.2em] mb-4 px-6">Workspace</h3>
            <div className="px-3 space-y-1">
              {workspaceItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 py-2 text-[13px] font-semibold transition-all group pr-4 rounded-[4px] relative",
                      isActive 
                        ? "bg-foreground/10 text-foreground pl-5 border-l-2 border-primary" 
                        : "text-foreground/40 hover:text-foreground hover:bg-foreground/5 pl-5 border-l-2 border-transparent"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-foreground/20 group-hover:text-foreground/50")} />
                    <span className={cn(isActive && "text-foreground")}>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-border/40">
           <button className="flex w-full items-center gap-3 px-4 py-2 rounded-[4px] text-[13px] font-semibold text-foreground/30 hover:text-foreground hover:bg-foreground/5 transition-colors">
              <LogOut className="h-4 w-4" />
              <span>Déconnexion</span>
           </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <header className="h-14 flex items-center justify-between px-6 lg:px-8 border-b border-border/40 bg-card/70 backdrop-blur-md z-10 shrink-0">
           <div className="flex items-center gap-6">
              <motion.button 
                 onClick={() => toggleSidebar()}
                 whileHover={{ scale: 1.05, backgroundColor: "hsla(var(--foreground), 0.05)" }}
                 whileTap={{ scale: 0.95 }}
                 className="w-8 h-8 flex items-center justify-center border border-border/40 bg-foreground/[0.02] rounded-[4px] text-foreground/40 hover:text-foreground transition-colors shadow-sm"
              >
                 <PanelLeft size={16} />
              </motion.button>
              <div className="h-4 w-px bg-border/40 mx-1 hidden md:block" />
              <GlobalSearch />
           </div>

           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-[4px] border border-border/40 bg-muted/30 transition-all">
                 <div className="w-1 h-1 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(37,211,102,0.4)]" />
                 <span className="text-[10px] font-semibold text-foreground/40 uppercase tracking-widest opacity-80 italic">SME ACTIVE</span>
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
