"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * GlobalGridBackground
 * A high-performance, background grid system that follows the mouse globally.
 * Placed at z-[-50] to serve as the application's "foundation".
 */
export default function GlobalGridBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use clientX/Y for global window-relative positioning
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    // Track mouse enter/leave on the document level
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[-50] pointer-events-none bg-background select-none">
      {/* 1. BASE SYSTEM GRID (Extremely subtle structure) */}
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.012]">
        <GridPattern id="base-grid" />
      </div>

      {/* 2. DYNAMIC SPOTLIGHT GRID (The precise reveal) */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: isHovering ? 1 : 0,
          maskImage: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
        }}
      >
        <div className="absolute inset-0 opacity-25 dark:opacity-[0.08] text-primary transition-opacity duration-300">
          <GridPattern id="spotlight-grid" />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * GridPattern
 * Renders a mathematically perfect 0.5px grid.
 */
function GridPattern({ id }: { id: string }) {
  return (
    <svg width="100%" height="100%" className="absolute inset-0">
      <defs>
        <pattern id={id} width="32" height="32" patternUnits="userSpaceOnUse">
          <path 
            d="M 32 0 L 0 0 0 32" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5" 
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
