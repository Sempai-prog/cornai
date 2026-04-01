// ══════════════════════════════════════════
// CORNAi — Dashboard Layout (Corrected Context)
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

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 antialiased">
        
      {/* SIDEBAR : Restauration du design "Sleek" précédent */}
      <aside className="w-64 flex-shrink-0 flex flex-col border-r border-border bg-card/40 backdrop-blur-xl z-20">
        
        {/* Header Sidebar (Logo CORNAi) */}
        <div className="h-14 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
             <div className="w-6 h-6 bg-primary flex items-center justify-center rounded">
                <ShieldCheck className="w-4 h-4 text-white" />
             </div>
             <span className="font-black tracking-tighter text-base text-foreground uppercase">CORNAi</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6 space-y-8">
          <div className="space-y-1">
            <h3 className="text-[10px] font-semibold text-foreground/40 uppercase tracking-[0.2em] mb-4 px-6">Exploitation</h3>
            <div className="px-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 py-2 text-[13px] font-semibold transition-all group pr-4",
                      isActive 
                        ? "bg-white/5 text-white border-l-2 border-primary pl-5" 
                        : "text-foreground/40 hover:text-foreground hover:bg-white/5 pl-5"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-foreground/20 group-hover:text-foreground/50")} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-[10px] font-semibold text-foreground/40 uppercase tracking-[0.2em] mb-4 px-6">Workspace</h3>
            <div className="px-3 space-y-1">
              {workspaceItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 py-2 text-[13px] font-semibold transition-all group pr-4",
                      isActive 
                        ? "bg-white/5 text-white border-l-2 border-primary pl-5" 
                        : "text-foreground/40 hover:text-foreground hover:bg-white/5 pl-5"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-foreground/20 group-hover:text-foreground/50")} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-border">
           <button className="flex w-full items-center gap-3 px-4 py-2 rounded text-[13px] font-medium text-foreground/20 hover:text-foreground hover:bg-muted/80 transition-colors">
              <LogOut className="h-4 w-4" />
              <span>Déconnexion</span>
           </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        <header className="h-14 flex items-center justify-between px-6 lg:px-8 border-b border-border bg-background/60 backdrop-blur-md z-10 shrink-0">
           <div className="flex items-center gap-6">
              <motion.button 
                 onClick={() => toggleSidebar()}
                 whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                 whileTap={{ scale: 0.95 }}
                 className="w-8 h-8 flex items-center justify-center border border-white/5 bg-white/[0.02] rounded-[4px] text-slate-500 hover:text-white transition-colors"
              >
                 <PanelLeft size={16} />
              </motion.button>
              <div className="h-4 w-px bg-border mx-1 hidden md:block" />
              
              {/* GLOBAL SEARCH OMNIBOX */}
              <GlobalSearch />
           </div>

           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded border border-white/5 bg-white/[0.02] grayscale hover:grayscale-0 transition-all">
                 <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                 <span className="text-[10px] font-semibold text-foreground/40 uppercase tracking-widest opacity-60">ACTIF</span>
              </div>
              <button className="h-8 w-8 flex items-center justify-center rounded text-foreground/40 hover:text-foreground hover:bg-muted transition-colors relative">
                 <Bell className="h-4 w-4" />
                 <span className="absolute top-2.5 right-2.5 w-1 h-1 bg-primary rounded-full" />
              </button>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-background">
           <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-8 py-8 md:py-10">
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
