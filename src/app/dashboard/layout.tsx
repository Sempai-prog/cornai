// ══════════════════════════════════════════
// CORNAi — Dashboard Layout (Flexible Full-Height)
// ══════════════════════════════════════════

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Globe,
  LogOut,
  Bell,
  TrendingUp,
  Zap,
  LayoutDashboard,
  History,
  FolderLock,
  Map,
  ChevronLeft,
  ShieldCheck,
} from "lucide-react"
import { SABI_COPY } from "@/lib/SabiCopy";
import { cn } from "@/lib/utils";
import { GlobalSearch } from "@/components/layout/global-search";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getUnreadCount } from "@/app/actions/notifications";
import * as React from "react";

// Composant interne pour accéder au contexte SidebarProvider
function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const SIDEBAR_WIDTH_ICON = "4rem";
  const { toggleSidebar, state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [unreadCount, setUnreadCount] = React.useState(0);

  React.useEffect(() => {
    async function loadCount() {
      try {
        const count = await getUnreadCount();
        setUnreadCount(count);
      } catch (e) {
        console.error("Failed to load notifications count", e);
      }
    }
    loadCount();
  }, []);
  
  interface NavigationItem {
    title: string;
    icon: any;
    href: string;
    badge?: string;
  }

  const navigation: { EXPLOITATION: NavigationItem[], WORKSPACE: NavigationItem[] } = {
    EXPLOITATION: [
      { 
        title: SABI_COPY.NAVIGATION.PILOTAGE, 
        icon: LayoutDashboard, 
        href: "/dashboard" 
      },
      { 
        title: SABI_COPY.NAVIGATION.RADAR, 
        icon: Globe, 
        href: "/dashboard/appels-offres" 
      },
      { 
        title: SABI_COPY.NAVIGATION.OPPORTUNITES, 
        icon: Zap, 
        href: "/dashboard/opportunites",
        badge: "IA"
      },
      { 
        title: SABI_COPY.NAVIGATION.SOUMISSIONS, 
        icon: History, 
        href: "/dashboard/soumissions" 
      },
    ],
    WORKSPACE: [
      { 
        title: SABI_COPY.NAVIGATION.BLINDAGE, 
        icon: FolderLock, 
        href: "/dashboard/documents" 
      },
      { 
        title: SABI_COPY.NAVIGATION.OFFRE_FINANCIERE, 
        icon: FolderLock, 
        href: "/dashboard/profil" 
      },
      { 
        title: SABI_COPY.NAVIGATION.TERRAIN, 
        icon: Map, 
        href: "/dashboard/terrain" 
      },
      { 
        title: SABI_COPY.NAVIGATION.ANNEXE_16, 
        icon: TrendingUp, 
        href: "/dashboard/annexe-16",
      },
      { 
        title: SABI_COPY.NAVIGATION.NOTIFICATIONS, 
        icon: Bell, 
        href: "/dashboard/notifications",
      }
    ]
  };

  // Détecter si on est sur le Kanban (Opportunités) pour désactiver le scroll global
  const isKanban = pathname === "/dashboard/opportunites";
  const isTerrain = pathname === "/dashboard/terrain";

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 antialiased transition-colors duration-500 relative">
      {/* SIDEBAR V1.7 - Elite Cockpit */}
      <Sidebar
        collapsible="icon"
        className="border-r border-border/10 bg-card z-10 transition-all duration-500 ease-in-out"
      >
        <SidebarHeader className="h-14 flex flex-row items-center justify-center px-4 border-b border-border/10 overflow-hidden shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity shrink-0"
          >
            <div className="w-6 h-6 bg-primary flex items-center justify-center rounded-[4px] border border-primary/20">
              <ShieldCheck className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={cn(
                  "ml-3 font-semibold text-lg tracking-tight text-primary",
                  isCollapsed ? "opacity-0" : "opacity-100"
                )}
              >
                {SABI_COPY.BRAND.NAME}
              </motion.span>
            )}
          </Link>
        </SidebarHeader>

        <SidebarContent className="flex-1 px-4 py-6">
          <SidebarMenu>
            <div className="space-y-6">
              {/* SECTION EXPLOITATION */}
              <div className="space-y-2">
                {!isCollapsed && (
                  <h3 className="px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/20 mb-4">
                    EXPLOITATION
                  </h3>
                )}
                {navigation.EXPLOITATION.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              asChild
                              isActive={isActive}
                              className={cn(
                                "h-10 transition-all duration-300 group relative",
                                isCollapsed ? "px-0 justify-center" : "px-4 gap-3",
                                isActive
                                  ? "bg-primary/5 text-primary border-l-2 border-primary"
                                  : "text-foreground/40 hover:text-foreground hover:bg-foreground/5 border-l-2 border-transparent"
                              )}
                            >
                                <Link href={item.href} className="flex items-center w-full">
                                  <item.icon
                                    size={18}
                                    className={cn(
                                      "shrink-0 transition-transform duration-300 group-hover:scale-110",
                                      isActive ? "text-primary" : "text-foreground/40"
                                    )}
                                    strokeWidth={isActive ? 2.5 : 2}
                                  />
                                  {!isCollapsed && (
                                    <div className="flex-1 flex items-center justify-between ml-3 overflow-hidden">
                                      <span className="font-semibold tracking-tight text-[13px] truncate">
                                        {item.title}
                                      </span>
                                      {item.badge && (
                                        <span className="text-[7.5px] font-semibold px-1.5 py-0.5 rounded-[2px] bg-primary/10 text-primary border border-primary/20 tracking-widest uppercase shrink-0 ml-2">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </Link>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          {isCollapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
                        </Tooltip>
                      </TooltipProvider>
                    </SidebarMenuItem>
                  );
                })}
              </div>

              {/* SECTION WORKSPACE */}
              <div className="space-y-2 pt-2">
                {!isCollapsed && (
                  <h3 className="px-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/20 mb-4">
                    WORKSPACE
                  </h3>
                )}
                {navigation.WORKSPACE.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              asChild
                              isActive={isActive}
                              className={cn(
                                "h-10 transition-all duration-300 group relative",
                                isCollapsed ? "px-0 justify-center" : "px-4 gap-3",
                                isActive
                                  ? "bg-primary/5 text-primary border-l-2 border-primary"
                                  : "text-foreground/40 hover:text-foreground hover:bg-foreground/5 border-l-2 border-transparent"
                              )}
                            >
                                <Link href={item.href} className="flex items-center w-full">
                                  <item.icon
                                    size={18}
                                    className={cn(
                                      "shrink-0 transition-transform duration-300 group-hover:scale-110",
                                      isActive ? "text-primary" : "text-foreground/40"
                                    )}
                                    strokeWidth={isActive ? 2.5 : 2}
                                  />
                                  {!isCollapsed && (
                                    <div className="flex-1 flex items-center justify-between ml-3 overflow-hidden">
                                      <span className="font-semibold tracking-tight text-[13px] truncate">
                                        {item.title}
                                      </span>
                                      {item.badge && (
                                        <span className="text-[7.5px] font-semibold px-1.5 py-0.5 rounded-[2px] bg-primary/10 text-primary border border-primary/20 tracking-widest uppercase shrink-0 ml-2">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </Link>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          {isCollapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
                        </Tooltip>
                      </TooltipProvider>
                    </SidebarMenuItem>
                  );
                })}
              </div>
            </div>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-2 border-t border-border/10">
          <button
            className={cn(
              "flex items-center gap-3 py-2 rounded-[4px] text-[13px] font-semibold text-foreground/30 hover:text-foreground hover:bg-foreground/5 transition-colors overflow-hidden w-full",
              isCollapsed ? "justify-center px-0" : "px-4"
            )}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative z-20 transition-all duration-500 ease-in-out">
        {/* BARRE DE NAVIGATION — Centralisation Globale Alignée */}
        <header className="relative h-16 flex items-center shrink-0 z-30 bg-transparent border-none">
          <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!isMobile && (
                <button
                  onClick={() => toggleSidebar()}
                  className="h-8 w-8 flex items-center justify-center rounded-[4px] border border-border/10 bg-card text-foreground/40 hover:text-foreground hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
                >
                  <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", isCollapsed && "rotate-180")} />
                </button>
              )}
              <GlobalSearch />
            </div>
            
            <div className="flex items-center gap-3">
              <Link 
                href="/dashboard/notifications"
                className="h-10 w-10 flex items-center justify-center rounded-[4px] border border-border/10 bg-card hover:bg-muted/50 transition-colors relative group"
              >
                <Bell className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                {unreadCount > 0 && (
                  <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-primary border-2 border-background animate-pulse" />
                )}
              </Link>

              <ThemeToggle />
              
              <div className="h-8 w-px bg-border/20 mx-1" />
              
              <button className="flex items-center gap-3 pl-1 pr-1 py-1 rounded-[4px] border border-border/10 bg-card hover:bg-muted/50 transition-colors group">
                <div className="h-8 w-8 rounded-[4px] bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <span className="text-[11px] font-semibold text-primary">JD</span>
                </div>
                <div className="flex flex-col items-start pr-3 hidden sm:flex">
                  <span className="text-[11px] font-semibold leading-tight group-hover:text-primary transition-colors">Joker Design</span>
                  <span className="text-[9px] text-muted-foreground/40 uppercase tracking-widest font-semibold leading-none mt-1">Elite Member</span>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* CONTENEUR PRINCIPAL — Centralisation & Alignement Strict */}
        {/* 🚀 MAIN CONTENT AREA (Scrollable) */}
        <main className="flex-1 overflow-y-auto bg-background scroll-p-4 lg:scroll-p-6">
          {/* 🎯 CONTENT CONTAINER (Centered 1400px) */}
          <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8 pt-3 pb-8 lg:pt-3 lg:pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardShell>{children}</DashboardShell>
    </SidebarProvider>
  );
}
