import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_PHOTOS } from '../data/content';
import { ImageWithFallback } from '../components/ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

export const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  // Parallax between alternate columns
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (col2Ref.current) {
        gsap.to(col2Ref.current, {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const col1Photos = [GALLERY_PHOTOS[0], GALLERY_PHOTOS[2], GALLERY_PHOTOS[4]];
  const col2Photos = [GALLERY_PHOTOS[1], GALLERY_PHOTOS[3], GALLERY_PHOTOS[5]];

  return (
    <section
      ref={containerRef}
      className="w-full py-20 lg:py-32 bg-bg transition-colors overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-mono-sm uppercase text-accent font-semibold tracking-mono">
              Visual Archive
            </span>
            <div className="w-8 h-[1px] bg-border" />
          </div>
          <h2 className="font-serif text-h2 font-semibold text-text tracking-tightest leading-tight">
            Raw rock, cold wind, and high camps.
          </h2>
          <p className="font-sans text-base text-muted mt-3">
            Real frames captured by our guides and trekkers across the Garhwal and Spiti ranges.
          </p>
        </div>

        {/* Parallax Two-Column Masonry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Column 1 */}
          <div ref={col1Ref} className="space-y-6 lg:space-y-8">
            {col1Photos.map((photo, i) => (
              <div
                key={i}
                className="group relative rounded-card overflow-hidden border border-border bg-surface shadow-xs hover:border-accent/50 transition-colors"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#161A18]">
                  <ImageWithFallback
                    src={photo.url}
                    alt={photo.alt}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <div className="p-4 sm:p-5 flex items-center justify-between bg-surface">
                  <span className="font-mono text-xs uppercase tracking-mono text-text">
                    {photo.caption}
                  </span>
                  <span className="font-mono text-[11px] text-muted">
                    0{i * 2 + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 (Parallax shift) */}
          <div ref={col2Ref} className="space-y-6 lg:space-y-8 md:pt-12">
            {col2Photos.map((photo, i) => (
              <div
                key={i}
                className="group relative rounded-card overflow-hidden border border-border bg-surface shadow-xs hover:border-accent/50 transition-colors"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#161A18]">
                  <ImageWithFallback
                    src={photo.url}
                    alt={photo.alt}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <div className="p-4 sm:p-5 flex items-center justify-between bg-surface">
                  <span className="font-mono text-xs uppercase tracking-mono text-text">
                    {photo.caption}
                  </span>
                  <span className="font-mono text-[11px] text-muted">
                    0{i * 2 + 2}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
