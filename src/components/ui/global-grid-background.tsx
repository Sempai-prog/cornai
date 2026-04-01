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
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
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
    <div className="fixed inset-0 z-[-50] pointer-events-none bg-background select-none transition-colors duration-500">
      {/* 1. BASE SYSTEM GRID (Matte technical draft) - VERY DISCRETE */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] text-foreground transition-opacity duration-500">
        <GridPattern id="base-grid" size={80} />
      </div>

      {/* 2. DYNAMIC SPOTLIGHT GRID (Precise highlight) - REVEAL BOOSTED X3 */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: isHovering ? 1 : 0,
          maskImage: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
        }}
      >
        <div className="absolute inset-0 opacity-20 dark:opacity-[0.15] text-primary transition-opacity duration-300">
          <GridPattern id="spotlight-grid" size={80} />
        </div>
      </motion.div>
    </div>
  );
}

function GridPattern({ id, size }: { id: string, size: number }) {
  return (
    <svg width="100%" height="100%" className="absolute inset-0">
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <path 
            d={`M ${size} 0 L 0 0 0 ${size}`} 
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
