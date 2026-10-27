import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Word: React.FC<{
  children: string;
  range: [number, number];
  progress: any;
}> = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block mr-[0.24em] my-1">
      <motion.span style={{ opacity }} className="text-text font-serif">
        {children}
      </motion.span>
    </span>
  );
};

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 35%'],
  });

  const manifestoText =
    "We trek because office chairs and lecture halls cannot teach you what happens when the mountain wind picks up at thirteen thousand feet. Out here, you carry what you need, lean on seven other people you only just met, and trust local guides who know every boulder like their own front yard. The summit is never guaranteed. The clarity you walk down with is.";

  const words = manifestoText.split(' ');

  return (
    <section
      ref={containerRef}
      className="w-full py-20 lg:py-32 bg-bg transition-colors"
    >
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Section Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-mono-sm uppercase text-accent font-semibold tracking-mono">
              The Manifesto
            </span>
            <div className="w-8 h-[1px] bg-border" />
          </div>

          {/* Large Editorial Paragraph with word-by-word scroll fill */}
          <p className="font-serif text-h2 font-medium tracking-tightest leading-[1.25] select-none">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={i} range={[start, end]} progress={scrollYProgress}>
                  {word}
                </Word>
              );
            })}
          </p>

          <div className="mt-12 flex items-center gap-4 text-muted">
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center font-mono text-xs text-accent">
              01
            </div>
            <p className="font-mono text-xs uppercase tracking-mono">
              Altitude Field Principles · Garhwal & Himachal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

