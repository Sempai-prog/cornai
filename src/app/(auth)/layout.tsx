import * as React from "react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background relative selection:bg-[#25D366]/20 transition-colors duration-500 overflow-hidden font-sans">
      {/* Background immersion neutre */}
      <div className="absolute inset-0 z-0 bg-background/50" />
      
      {/* Conteneur global et Toggle intégré */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-[1000px] relative animate-in fade-in zoom-in-95 duration-700">
            {/* Positionnement intégré à la composition du panneau */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
               <ThemeToggle />
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
