"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";

/**
 * GlobalGridBackground — La trame technique SABI.
 * Rappelle le papier millimétré des dossiers techniques.
 * Inclut un effet de "reveal" interactif qui suit la souris.
 */
export function GlobalGridBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Suivi de la souris pour l'effet de reveal
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring de lissage pour que le reveal soit fluide (SABI spirit)
  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    // Écouteur global pour le mouvement de souris
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Masque radial qui suit la souris
  // On définit un cercle avec un gradient : 100% au centre, 0% à l'extérieur
  // "6 squares" radius target: approx 100px for a concentrated look
  const mask = useMotionTemplate`radial-gradient(100px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 80%)`;

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Grille de base (FONDAMENTALE) — Quasi invisible (proche de 0) */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0] dark:opacity-[0]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="base-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-black dark:text-white"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#base-grid)" />
      </svg>

      {/* 2. REVEAL LAYER (INTERACTIVE) — Intensité SABI (60-80%) masquée radialement */}
      <motion.div
        className="absolute inset-0 h-full w-full opacity-[0.5] dark:opacity-[0.5]"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#base-grid)" />
        </svg>
      </motion.div>
    </div>
  );
}
