"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

/**
 * ThemeToggle - CORNAi Quiet Design Component
 * 
 * Un bouton de bascule ultra-minimaliste (h-6 w-6) qui gère le passage
 * entre le mode Jour (Light) et le mode Nuit (Dark).
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Évite les erreurs d'hydratation (Next.js)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-6 w-6 rounded-full border border-black/5 bg-black/[0.02]" />
  }

  const isDark = theme === "dark"

  return (
    <motion.button
      whileHover={{ 
        scale: 1.1,
      }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-6 w-6 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-card hover:border-primary/40 text-foreground/40 hover:text-primary transition-all shadow-sm focus:outline-none group overflow-hidden"
      title={isDark ? "Passer en mode Jour (Clinical Light)" : "Passer en mode Nuit (Deep Night)"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="h-3 w-3 transition-colors" strokeWidth={2.5} />
          ) : (
            <Sun className="h-3 w-3 transition-colors" strokeWidth={2.5} />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Tooltip ultra-minimaliste façon Panel-Toggle */}
      <div className="absolute left-8 px-2 py-1 bg-black text-white text-[10px] font-bold rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-white/5">
        {isDark ? "MODE JOUR" : "MODE NUIT"}
      </div>
    </motion.button>
  )
}
