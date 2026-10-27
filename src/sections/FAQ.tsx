import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQS } from '../data/content';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="w-full py-20 lg:py-32 bg-surface transition-colors">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-mono-sm uppercase text-accent font-semibold tracking-mono">
                  Everything You Need to Know
                </span>
                <div className="w-8 h-[1px] bg-border" />
              </div>

              <h2 className="font-serif text-h2 font-semibold text-text tracking-tightest leading-tight">
                Frequently asked questions.
              </h2>

              <p className="font-sans text-base text-muted leading-relaxed">
                Clear answers with no marketing fluff. If you have a specific medical condition or route question, write to us directly.
              </p>

              <div className="pt-6">
                <a
                  href="mailto:trailhead@altitudetreks.in"
                  className="link-sweep font-mono text-xs uppercase tracking-mono text-accent font-semibold inline-flex items-center gap-2"
                >
                  <span>trailhead@altitudetreks.in</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="rounded-card border border-border bg-bg overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                  >
                    <span className="font-serif text-lg sm:text-xl font-medium text-text tracking-tight">
                      {faq.question}
                    </span>

                    {/* Plus icon rotates 45 deg into cross */}
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="w-8 h-8 rounded-btn border border-border bg-surface flex items-center justify-center shrink-0 text-text"
                    >
                      <Plus size={18} strokeWidth={1.5} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-muted leading-relaxed font-sans border-t border-border/40 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

