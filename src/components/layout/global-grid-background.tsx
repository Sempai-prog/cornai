"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

/**
 * GlobalGridBackground — La trame technique CORNAi.
 * Rappelle le papier millimétré des dossiers techniques.
 */
export function GlobalGridBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none opacity-[0.4] dark:opacity-[0.2]">
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-black/[0.03] dark:text-white/[0.02]"
            />
          </pattern>
          <radialGradient id="fade" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--color-background)" stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* Subtile vignettage pour concentrer l'attention au centre */}
        <rect width="100%" height="100%" fill="url(#fade)" className="opacity-60" />
      </svg>
    </div>
  )
}
