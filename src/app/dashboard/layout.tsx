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
  LayoutDashboard,
  Target,
  Files,
  User,
  Bell,
  LogOut,
  Search,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GlobalSearch } from "@/components/layout/global-search";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import GlobalGridBackground from "@/components/ui/global-grid-background";

// Composant interne pour accéder au contexte SidebarProvider
function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { toggleSidebar, state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  const navItems = [
    { label: "Poste de pilotage", icon: LayoutDashboard, href: "/dashboard" },
    {
      label: "Moteur de recherche",
      icon: Search,
      href: "/dashboard/appels-offres",
    },
    {
      label: "Veille stratégique",
      icon: Target,
      href: "/dashboard/opportunites",
    },
  ];

  const workspaceItems = [
    { label: "Dossier PME", icon: Files, href: "/dashboard/documents" },
    { label: "Fiche Entreprise", icon: User, href: "/dashboard/profil" },
  ];

  // Détecter si on est sur le Kanban (Opportunités) pour désactiver le scroll global
  const isKanban = pathname === "/dashboard/opportunites";

  return (
    <div className="flex h-screen w-full bg-background/5 text-foreground overflow-hidden font-sans selection:bg-primary/20 antialiased transition-colors duration-500 relative">
      <GlobalGridBackground />

      {/* SIDEBAR V1.7 - Elite Cockpit */}
      <Sidebar
        collapsible="icon"
        className="border-r border-border/40 bg-card/80 backdrop-blur-xl z-20 transition-all duration-500 ease-in-out shadow-2xl shadow-black/20"
      >
        <SidebarHeader className="h-14 flex flex-row items-center justify-center px-4 border-b border-border/40 overflow-hidden shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity shrink-0"
          >
            <div className="w-6 h-6 bg-primary flex items-center justify-center rounded-[4px] shadow-[0_0_15px_rgba(37,211,102,0.2)]">
              <ShieldCheck className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-semibold tracking-tighter text-base text-foreground uppercase tracking-[0.05em] whitespace-nowrap"
              >
                CORNAi
              </motion.span>
            )}
          </Link>
        </SidebarHeader>

        <SidebarContent className="py-6 space-y-8 overflow-x-hidden">
          <SidebarMenu className="gap-1">
            <div className="px-6 mb-4 h-4 flex items-center">
              {!isCollapsed ? (
                <h3 className="text-[10px] font-semibold text-foreground/30 uppercase tracking-[0.2em] whitespace-nowrap">
                  Exploitation
                </h3>
              ) : (
                <div className="w-full h-px bg-foreground/5" />
              )}
            </div>
            <div className="px-2 space-y-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname?.startsWith(item.href));
                return (
                  <SidebarMenuItem key={item.href}>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            className={cn(
                              "flex items-center gap-3 py-2 text-[13px] font-semibold transition-all group rounded-[4px] relative w-full",
                              isCollapsed ? "justify-center px-0" : "pl-5 pr-4",
                              isActive
                                ? "bg-foreground/10 text-foreground border-l-2 border-primary"
                                : "text-foreground/40 hover:text-foreground hover:bg-foreground/5 border-l-2 border-transparent",
                            )}
                          >
                            <Link
                              href={item.href}
                              className="flex items-center w-full"
                            >
                              <item.icon
                                size={20}
                                className={cn(
                                  "shrink-0 transition-colors",
                                  isActive
                                    ? "text-primary"
                                    : "text-foreground/20 group-hover:text-foreground/50",
                                )}
                              />
                              {!isCollapsed && (
                                <span className="truncate">{item.label}</span>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent
                            side="right"
                            className="bg-black text-white text-[10px] font-bold uppercase tracking-widest border-white/10 ml-2"
                          >
                            {item.label}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </SidebarMenuItem>
                );
              })}
            </div>
          </SidebarMenu>

          <SidebarMenu className="gap-1">
            <div className="px-6 mb-4 mt-8 h-4 flex items-center">
              {!isCollapsed ? (
                <h3 className="text-[10px] font-semibold text-foreground/30 uppercase tracking-[0.2em] whitespace-nowrap">
                  Workspace
                </h3>
              ) : (
                <div className="w-full h-px bg-foreground/5" />
              )}
            </div>
            <div className="px-2 space-y-1">
              {workspaceItems.map((item) => {
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
                              "flex items-center gap-3 py-2 text-[13px] font-semibold transition-all group rounded-[4px] relative w-full",
                              isCollapsed ? "justify-center px-0" : "pl-5 pr-4",
                              isActive
                                ? "bg-foreground/10 text-foreground border-l-2 border-primary"
                                : "text-foreground/40 hover:text-foreground hover:bg-foreground/5 border-l-2 border-transparent",
                            )}
                          >
                            <Link
                              href={item.href}
                              className="flex items-center w-full"
                            >
                              <item.icon
                                size={20}
                                className={cn(
                                  "shrink-0 transition-colors",
                                  isActive
                                    ? "text-primary"
                                    : "text-foreground/20 group-hover:text-foreground/50",
                                )}
                              />
                              {!isCollapsed && (
                                <span className="truncate">{item.label}</span>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent
                            side="right"
                            className="bg-black text-white text-[10px] font-bold uppercase tracking-widest border-white/10 ml-2"
                          >
                            {item.label}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </SidebarMenuItem>
                );
              })}
            </div>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-2 border-t border-border/40">
          <button
            className={cn(
              "flex items-center gap-3 py-2 rounded-[4px] text-[13px] font-semibold text-foreground/30 hover:text-foreground hover:bg-foreground/5 transition-colors overflow-hidden w-full",
              isCollapsed ? "justify-center px-0" : "px-4",
            )}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 transition-all duration-500 ease-in-out">
        <header className="relative h-14 flex items-center justify-between px-6 lg:px-6 border-b border-border/40 bg-card/70 backdrop-blur-md z-30 shrink-0">
          <div className="flex items-center gap-6">
            {/* Panel-Toggle Controller v1.8 — Absolute Intersection & Perfect Circular Geometry */}
            {!isMobile && (
              <button
                onClick={() => toggleSidebar()}
                className="absolute -left-4 top-3 z-[100] flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a] text-foreground/40 hover:text-foreground hover:bg-white/5 transition-all shadow-md cursor-pointer"
              >
                <ChevronLeft
                  size={14}
                  className={cn(
                    "transition-transform duration-300",
                    isCollapsed && "rotate-180",
                  )}
                />
              </button>
            )}

            {/* Mobile Trigger */}
            <div className="md:hidden">
              <SidebarTrigger />
            </div>

            <div className="flex items-center gap-4 pl-6">
              <div className="h-4 w-px bg-border/40 mx-1 hidden md:block" />
              <GlobalSearch />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-[4px] border border-border/40 bg-muted/30 transition-all">
              <div className="w-1 h-1 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(37,211,102,0.4)]" />
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest opacity-80">
                Profil Actif
              </span>
            </div>

            <div className="w-px h-4 bg-border/40 mx-1" />

            <ThemeToggle />

            <button className="h-6 w-6 flex items-center justify-center rounded-full border border-border/40 bg-foreground/[0.02] text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-colors relative shadow-sm">
              <Bell className="h-3 w-3" />
              <span className="absolute top-1.5 right-1.5 w-1 h-1 bg-primary rounded-full shadow-[0_0_4px_rgba(37,211,102,0.4)]" />
            </button>
          </div>
        </header>

        {/* CONTAINER DYNAMIQUE */}
        <main
          className={cn(
            "flex-1 flex flex-col min-h-0",
            !isKanban && "overflow-y-auto custom-scrollbar",
          )}
        >
          <div
            className={cn(
              "w-full flex-1 flex flex-col",
              isKanban
                ? "px-6 lg:px-8 py-6"
                : "max-w-[1400px] mx-auto px-6 lg:px-8 py-8 md:py-10",
            )}
          >
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
