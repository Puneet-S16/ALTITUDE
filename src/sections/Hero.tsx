import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { MountainScene3D } from '../components/MountainScene3D';
import { Compass, CloudSnow } from 'lucide-react';

interface HeroProps {
  onFindTrek: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onFindTrek }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const headlineWords = [
    "The", "mountains", "don't", "care", "about", "your", "plans.", "We", "do."
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between pt-28 pb-8 select-none bg-bg transition-colors"
    >
      {/* 3D Black & White Mountain Scene with Real-Time Snow & Rolling Fog */}
      <MountainScene3D />

      {/* Subtle Cold Atmospheric Fog Vignette */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg via-bg/60 to-transparent pointer-events-none" />
      </div>

      {/* MAIN HERO EDITORIAL CONTENT (Left-aligned, pristine contrast with falling snow) */}
      <div className="relative z-30 max-w-content mx-auto px-6 lg:px-8 w-full my-auto flex flex-col items-start pt-8 pb-12">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-btn bg-surface/80 backdrop-blur-md border border-border shadow-xs text-xs font-mono tracking-mono text-accent uppercase font-semibold mb-6"
          >
            <CloudSnow size={14} strokeWidth={1.5} className="text-text" />
            <span>Guided Himalayan Expeditions · Max 10 Trekkers</span>
          </motion.div>

          {/* EXACTLY ONE H1: Masked word-by-word reveal */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-semibold text-text tracking-tightest leading-[1.06] mb-6 drop-shadow-sm">
            {headlineWords.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden mr-[0.24em] align-top"
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: '115%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.08 * i + 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Body Text & Primary Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-6 max-w-xl"
          >
            <p className="font-sans text-base sm:text-lg text-muted prose-editorial font-normal leading-relaxed">
              Small-group Himalayan treks led by local guides who have walked every trail more than once.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-2 pointer-events-auto">
              <Button
                variant="primary"
                size="md"
                showArrow
                onClick={onFindTrek}
                className="shadow-md"
              >
                Find your trek
              </Button>

              <Button
                variant="text-link"
                asLink
                href="#how-it-works"
                showArrow
              >
                See how it works
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Altitude Metrics & Scroll Indicator */}
      <div className="relative z-30 max-w-content mx-auto px-6 lg:px-8 w-full flex items-center justify-between text-muted pt-4 border-t border-border/40">
        <div className="flex items-center gap-3">
          <span className="font-mono text-mono-sm uppercase tracking-mono">
            Scroll to explore
          </span>
          <div className="w-12 h-[1px] bg-border relative overflow-hidden">
            <motion.div
              animate={{ x: [-48, 48] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: 'easeInOut',
              }}
              className="w-6 h-[1px] bg-accent"
            />
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-6 font-mono text-mono-sm uppercase tracking-mono text-muted/80">
          <span>Garhwal · 15,100 FT</span>
          <span>·</span>
          <span>Spiti · 14,100 FT</span>
          <span>·</span>
          <span>Sikkim · 16,200 FT</span>
        </div>
      </div>
    </section>
  );
};
