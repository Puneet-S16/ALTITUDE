import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mountain, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { TREKS } from '../data/content';
import { Trek } from '../types';
import { useCursor } from '../context/CursorContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedTreksProps {
  onSelectTrek: (trek: Trek) => void;
}

export const FeaturedTreks: React.FC<FeaturedTreksProps> = ({ onSelectTrek }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { setCursorMode, setCursorText } = useCursor();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 1024;

    if (prefersReducedMotion || !isDesktop || !sectionRef.current || !trackRef.current) {
      return;
    }

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.9,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const difficultyColors = {
    Easy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Moderate: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    Hard: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  };

  const handleScrollManual = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollOffset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="treks"
      ref={sectionRef}
      className="relative w-full bg-surface transition-colors py-20 lg:py-0 lg:h-screen lg:overflow-hidden flex flex-col justify-center"
    >
      {/* Top Header */}
      <div className="max-w-content mx-auto px-6 lg:px-8 w-full mb-8 lg:mb-10 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-mono-sm uppercase text-accent font-semibold tracking-mono">
                Featured Expeditions
              </span>
              <div className="w-8 h-[1px] bg-border" />
            </div>
            <h2 className="font-serif text-h2 font-semibold text-text tracking-tightest">
              Upcoming Small-Group Departures
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-mono text-muted hidden sm:inline">
              Strictly 6–10 Trekkers Per Ridge
            </span>
            {/* Quick manual navigation controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScrollManual('left')}
                aria-label="Previous trek"
                className="w-9 h-9 rounded-btn border border-border bg-bg text-text hover:border-accent hover:text-accent transition-colors flex items-center justify-center lg:hidden"
              >
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => handleScrollManual('right')}
                aria-label="Next trek"
                className="w-9 h-9 rounded-btn border border-border bg-bg text-text hover:border-accent hover:text-accent transition-colors flex items-center justify-center lg:hidden"
              >
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Track Container */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto lg:overflow-visible pb-8 lg:pb-0 scrollbar-none px-6 lg:px-0 scroll-smooth"
      >
        <div
          ref={trackRef}
          className="flex gap-6 lg:gap-8 lg:pl-16 w-max items-center"
        >
          {TREKS.map((trek) => (
            <div
              key={trek.id}
              onClick={() => onSelectTrek(trek)}
              onMouseEnter={() => {
                setCursorMode('view');
                setCursorText('VIEW');
              }}
              onMouseLeave={() => {
                setCursorMode('default');
                setCursorText('');
              }}
              className="group relative w-[310px] sm:w-[360px] lg:w-[410px] h-[480px] sm:h-[530px] rounded-card border border-border bg-[#161A18] overflow-hidden cursor-pointer shrink-0 transition-all duration-300 hover:border-accent hover:shadow-2xl"
            >
              {/* Full-bleed Photo using ImageWithFallback */}
              <div className="absolute inset-0 overflow-hidden">
                <ImageWithFallback
                  src={trek.image}
                  alt={trek.alt}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                {/* Vignette Overlay for Crisp Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/15 z-10 pointer-events-none" />
              </div>

              {/* Card Badges */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-btn text-xs font-mono tracking-mono border backdrop-blur-md shadow-xs ${
                    difficultyColors[trek.difficulty]
                  }`}
                >
                  {trek.difficulty}
                </span>
                <span className="px-3 py-1 rounded-btn text-xs font-mono tracking-mono bg-black/60 text-white border border-white/20 backdrop-blur-md shadow-xs">
                  {trek.days} Days
                </span>
              </div>

              {/* Card Content Overlay */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-20 text-white">
                <span className="font-mono text-mono-sm uppercase text-accent font-semibold tracking-mono mb-2 drop-shadow-xs">
                  {trek.region}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tightest leading-tight text-white mb-2">
                  {trek.name}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-white/85 line-clamp-2 mb-4 leading-relaxed">
                  {trek.tagline}
                </p>

                {/* Metrics */}
                <div className="flex items-center justify-between border-t border-white/20 pt-4 text-xs font-mono text-white/90">
                  <div className="flex items-center gap-1.5">
                    <Mountain size={14} strokeWidth={1.5} className="text-accent" />
                    <span>{trek.maxAltitude}</span>
                  </div>
                  <div>
                    <span className="text-white/60">From </span>
                    <span className="text-sm font-semibold text-accent font-sans">
                      ₹{trek.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Animated "View trek details" link that slides up on hover */}
                <div className="mt-4 overflow-hidden">
                  <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-editorial flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-mono font-semibold">
                    <span>View trek details</span>
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* End Card */}
          <div className="w-[300px] sm:w-[340px] h-[480px] sm:h-[530px] rounded-card border border-dashed border-border bg-bg/60 p-8 flex flex-col justify-between shrink-0">
            <div>
              <span className="font-mono text-mono-sm uppercase text-accent tracking-mono font-semibold">
                Custom Batches
              </span>
              <h3 className="font-serif text-2xl font-semibold text-text tracking-tightest mt-3">
                Have a team of 6–10 ready?
              </h3>
              <p className="font-sans text-sm text-muted mt-3 leading-relaxed">
                We organize private guided ascents for college mountaineering clubs, university batches, and startup teams with customized dates.
              </p>
            </div>

            <div className="pt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-mono text-accent font-semibold hover:underline"
              >
                <span>Request Custom Ridge Dates</span>
                <ArrowRight size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
