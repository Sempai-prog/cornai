// ══════════════════════════════════════════
// CORNAi — Dashboard Layout
// ══════════════════════════════════════════

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarProvider, 
  SidebarTrigger,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  Files, 
  User, 
  Settings, 
  Bell, 
  HelpCircle,
  LogOut,
  Search,
  Menu
} from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/20">
        <Sidebar className="border-r border-border bg-white" variant="inset" collapsible="icon">
          <SidebarHeader className="h-16 flex items-center px-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
               <span className="text-2xl">🌽</span>
               <span className="group-data-[collapsible=icon]:hidden">CORNAi</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-[10px] font-bold tracking-widest text-muted-foreground/60 mb-2">Principal</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Tableau de bord">
                    <Link href="/dashboard" className="flex items-center gap-3">
                      <LayoutDashboard className="h-5 w-5" />
                      <span>Tableau de bord</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Appels d'offres">
                    <Link href="/dashboard/appels-offres" className="flex items-center gap-3">
                      <Search className="h-5 w-5" />
                      <span>Appels d'offres</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Mes opportunités">
                    <Link href="/dashboard/opportunites" className="flex items-center gap-3">
                      <Target className="h-5 w-5" />
                      <span>Mes opportunités</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-[10px] font-bold tracking-widest text-muted-foreground/60 mb-2 mt-4">Gestion</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Mes documents">
                    <Link href="/dashboard/documents" className="flex items-center gap-3">
                      <Files className="h-5 w-5" />
                      <span>Mes documents</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Profil Entreprise">
                    <Link href="/dashboard/profil" className="flex items-center gap-3">
                      <User className="h-5 w-5" />
                      <span>Profil Entreprise</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-border/50 p-4">
             <SidebarMenu>
                <SidebarMenuItem>
                   <SidebarMenuButton className="text-muted-foreground hover:text-destructive">
                      <LogOut className="h-5 w-5" />
                      <span className="group-data-[collapsible=icon]:hidden">Déconnexion</span>
                   </SidebarMenuButton>
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col flex-1">
          <header className="h-16 flex items-center justify-between px-6 border-b bg-white/50 backdrop-blur-sm sticky top-0 z-40">
             <div className="flex items-center gap-4">
                <SidebarTrigger className="h-9 w-9" />
                <div className="h-4 w-px bg-border hidden md:block" />
                <h2 className="font-semibold hidden md:block">Tableau de Bord</h2>
             </div>

             <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                   <Bell className="h-5 w-5" />
                   <span className="absolute top-2 right-2 h-2 w-2 bg-cornai rounded-full ring-2 ring-white" />
                </Button>
                <div className="flex items-center gap-3 pl-2 border-l">
                   <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold leading-none">Antigravity BTP</p>
                      <p className="text-[10px] text-muted-foreground tracking-tight">Secteur Travaux</p>
                   </div>
                   <div className="h-9 w-9 rounded-full bg-cornai text-white font-bold flex items-center justify-center border-2 border-white shadow-sm">
                      AB
                   </div>
                </div>
             </div>
          </header>

          <main className="flex-1 p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
