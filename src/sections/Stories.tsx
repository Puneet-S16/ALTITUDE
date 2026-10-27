import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { STORIES } from '../data/content';

export const Stories: React.FC = () => {
  return (
    <section id="stories" className="w-full py-20 lg:py-32 bg-surface transition-colors">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-mono-sm uppercase text-accent font-semibold tracking-mono">
              Field Dispatch
            </span>
            <div className="w-8 h-[1px] bg-border" />
          </div>
          <h2 className="font-serif text-h2 font-semibold text-text tracking-tightest leading-tight">
            Notes from the ridge.
          </h2>
          <p className="font-sans text-base text-muted mt-3">
            Real words from students, solo travellers, and young professionals who left their laptops behind.
          </p>
        </div>

        {/* Sticky Stacking Cards Container */}
        <div className="relative max-w-4xl mx-auto space-y-8 sm:space-y-12 pb-16">
          {STORIES.map((story, idx) => {
            // Increasing sticky top offsets for card stacking effect
            const topOffset = 110 + idx * 24;

            return (
              <div
                key={story.id}
                style={{ top: `${topOffset}px` }}
                className="sticky rounded-card border border-border bg-bg p-8 sm:p-12 shadow-md transition-all duration-300 hover:border-accent/40"
              >
                <div className="flex flex-col justify-between h-full space-y-8">
                  {/* Quote header */}
                  <div className="flex items-start justify-between gap-4">
                    <Quote
                      size={36}
                      strokeWidth={1.5}
                      className="text-accent/40 shrink-0"
                    />
                    <span className="font-mono text-xs uppercase tracking-mono text-muted/70">
                      {story.year}
                    </span>
                  </div>

                  {/* Main Quote */}
                  <blockquote className="font-serif text-xl sm:text-2xl text-text leading-relaxed tracking-tight">
                    “{story.quote}”
                  </blockquote>

                  {/* Author Meta */}
                  <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-sans font-semibold text-text text-base">
                        {story.name}
                      </h4>
                      <p className="font-sans text-xs text-muted mt-0.5">
                        {story.credential}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-btn bg-surface border border-border text-xs font-mono tracking-mono text-accent">
                      <span>{story.trek}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

