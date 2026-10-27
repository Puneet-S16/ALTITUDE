import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Compass, Backpack, Users, MountainSnow } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ['start 75%', 'end 70%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const steps = [
    {
      number: '01',
      title: 'Pick a trek that matches your calendar',
      icon: Compass,
      description:
        'Browse our open departures across Uttarakhand, Himachal, or Sikkim. Filter by difficulty, duration, and seasonal conditions. Every batch is locked at 10 slots to ensure zero overcrowding.',
      tag: 'Step One',
    },
    {
      number: '02',
      title: 'Get your kit checklist and rental options',
      icon: Backpack,
      description:
        'We send a stripped-down, practical packing guide. Don’t own expensive waterproof summit boots or down jackets? You can rent certified alpine gear directly at base camp for a nominal daily fee.',
      tag: 'Step Two',
    },
    {
      number: '03',
      title: 'Meet your small crew at base camp',
      icon: Users,
      description:
        'Meet your trek leader and the 7–9 other trekkers over hot ginger lemon tea. We do medical pulse checks, gear inspections, and a thorough briefing on pacing, breathing, and trail ethics.',
      tag: 'Step Three',
    },
    {
      number: '04',
      title: 'Summit with a crew that looks out for you',
      icon: MountainSnow,
      description:
        'Wake for the 4 AM ridge push. With one local guide for every four to five trekkers, nobody gets pushed too hard and nobody gets left behind in the dark. Summit, take it in, and descend safely.',
      tag: 'Step Four',
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="w-full py-20 lg:py-32 bg-bg transition-colors"
    >
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Sticky Heading */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-mono-sm uppercase text-accent font-semibold tracking-mono">
                  The Blueprint
                </span>
                <div className="w-8 h-[1px] bg-border" />
              </div>

              <h2 className="font-serif text-h2 font-semibold text-text tracking-tightest leading-tight">
                Four steps from your desk to the mountain pass.
              </h2>

              <p className="font-sans text-base text-muted leading-relaxed max-w-md">
                We eliminated commercial fluff. No endless orientation calls or 40-page PDFs. Just straight logistics, proper gear checks, and small teams on the ridge.
              </p>

              <div className="pt-4 hidden lg:block">
                <div className="p-6 rounded-card border border-border bg-surface">
                  <div className="font-mono text-xs uppercase tracking-mono text-accent font-semibold mb-2">
                    Preparation Guarantee
                  </div>
                  <p className="font-sans text-xs text-muted leading-relaxed">
                    Have questions before signing up? You can schedule a direct 10-minute call with an active trek leader anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Numbered Steps with Vertical Progress Line */}
          <div ref={stepsRef} className="lg:col-span-7 relative pl-8 sm:pl-12">
            {/* Background vertical line */}
            <div className="absolute left-2.5 sm:left-3.5 top-4 bottom-4 w-[2px] bg-border" />

            {/* Filling accent line */}
            <motion.div
              style={{ scaleY }}
              className="absolute left-2.5 sm:left-3.5 top-4 bottom-4 w-[2px] bg-accent origin-top"
            />

            <div className="space-y-12 sm:space-y-16">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.7,
                      delay: idx * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative group"
                  >
                    {/* Node Circle on Line */}
                    <div className="absolute -left-8 sm:-left-12 top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-border bg-surface group-hover:border-accent flex items-center justify-center transition-colors">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>

                    <div className="p-6 sm:p-8 rounded-card border border-border bg-surface hover:border-accent/40 transition-colors">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="font-mono text-mono-sm uppercase text-accent font-semibold tracking-mono">
                          {step.tag}
                        </span>
                        <span className="font-mono text-2xl font-semibold text-border group-hover:text-accent/40 transition-colors">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-text tracking-tightest mb-3">
                        {step.title}
                      </h3>

                      <p className="font-sans text-sm text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

