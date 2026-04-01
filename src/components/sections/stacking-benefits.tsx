'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ShieldCheck, 
  Search, 
  Calculator, 
  FileSearch,
  type LucideIcon
} from 'lucide-react';

interface BenefitCardProps {
  i: number;
  Icon: LucideIcon;
  title: string;
  description: string;
  progress: any;
  range: [number, number];
  color: string;
}

const BenefitCard = ({ i, Icon, title, description, progress, range, color }: BenefitCardProps) => {
  const container = useRef(null);
  
  // Subtle scaling for depth
  const scale = useTransform(progress, range, [1, 0.96]);

  return (
    <div 
      ref={container} 
      className="w-full flex items-center justify-center sticky"
      // Adjusted top to align higher with the "BENEFITS" badge
      style={{ top: `calc(35vh + ${i * 24}px)`, paddingBottom: '120px' }}
    >
      <motion.div
        style={{ 
          scale, 
          zIndex: i 
        }}
        className="relative w-full max-w-[420px] p-7 rounded bg-white dark:bg-[#0A0A0A] border border-border transition-all duration-300 group overflow-hidden origin-top"
      >
        {/* Watermark Number */}
        <div className="absolute top-6 right-7 text-2xl font-medium text-gray-100 dark:text-white/5 select-none tracking-tighter">
          0{i + 1}
        </div>

        {/* Icon Container */}
        <div 
          className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          <Icon className="w-5.5 h-5.5" />
        </div>

        <h3 className="text-lg font-medium tracking-tight text-foreground mb-2">
          {title}
        </h3>
        <p className="text-[13px] font-normal text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="mt-7 pt-4 border-t border-slate-50 dark:border-white/5 flex items-center gap-2 text-[9px] font-medium uppercase tracking-widest text-[#C28E64]">
          <div className="h-1 w-1 rounded-full bg-[#C28E64] opacity-50" />
          <span>Expertise Locale</span>
        </div>
      </motion.div>
    </div>
  );
};

export function StackingBenefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const benefits = [
    {
      Icon: Search,
      title: "Scanner COLEPS & JDM",
      description: "Identifier les opportunités stratégiques au Cameroun avant vos concurrents grâce à nos alertes WhatsApp directes.",
      color: "#22C55E"
    },
    {
      Icon: FileSearch,
      title: "Analyse RPAO Instantanée",
      description: "Plus besoin de lire des PDF de 200 pages. Notre IA isole les critères éliminatoires en quelques secondes.",
      color: "#3B82F6"
    },
    {
      Icon: ShieldCheck,
      title: "Conformité Zéro Rejet",
      description: "Validation automatique de vos documents fiscaux et sociaux selon les directives ARMP les plus strictes.",
      color: "#F59E0B"
    },
    {
      Icon: Calculator,
      title: "Chiffrage Offre DQE/BPU",
      description: "Éliminez les erreurs de calcul n°1 au Cameroun. Générez vos Bordereaux de Prix Unitaires avec précision.",
      color: "#8B5CF6"
    }
  ];

  return (
    <section 
      id="solutions" 
      ref={containerRef} 
      className="relative bg-transparent py-32"
    >
      <div className="container mx-auto max-w-[1100px] px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Column - Fixed Text */}
          <div className="lg:sticky lg:top-[35vh] lg:self-start space-y-6 lg:h-fit py-12">
            <div className="space-y-6">
              <span className="text-[10px] font-medium tracking-[0.3em] text-[#C28E64] uppercase transition-colors">
                BENEFITS
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-foreground">
                Pourquoi choisir <br/> la solution CORNAi ?
              </h2>
              <p className="text-lg font-normal text-muted-foreground leading-relaxed max-w-md">
                 Une IA locale pour transformer votre PME en leader incontesté des marchés publics au Cameroun.
              </p>
            </div>
          </div>

          {/* Right Column - Stacking Cards */}
          <div className="relative pt-12">
            <div className="flex flex-col gap-0 items-center lg:items-end pb-[80vh]">
              {benefits.map((benefit, i) => {
                const start = i / benefits.length;
                const end = (i + 1) / benefits.length;
                const clampedRange: [number, number] = [
                  Math.min(start, 1),
                  Math.min(end, 1)
                ];

                return (
                  <BenefitCard
                    key={i}
                    i={i}
                    {...benefit}
                    progress={scrollYProgress}
                    range={clampedRange}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
