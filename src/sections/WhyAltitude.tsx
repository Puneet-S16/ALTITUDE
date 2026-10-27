import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, FileCheck, ShieldAlert, Receipt } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { getAssetUrl } from '../data/content';

interface BentoTiltCardProps {
  children: React.ReactNode;
  className?: string;
  hasPhoto?: boolean;
}

const BentoTiltCard: React.FC<BentoTiltCardProps> = ({ children, className = '', hasPhoto = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlightPos({ x, y });

    // Calculate tilt up to 6 degrees towards the mouse
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -6;
    const rY = ((x - centerX) / centerX) * 6;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? 1.015 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative rounded-card border border-border bg-surface overflow-hidden transition-colors ${className}`}
    >
      {/* Soft radial spotlight that follows the cursor inside each card */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, var(--color-accent), transparent 70%)`,
          mixBlendMode: hasPhoto ? 'overlay' : 'normal',
          opacity: isHovered ? (hasPhoto ? 0.25 : 0.08) : 0,
        }}
      />

      <div className="relative z-20 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};

export const WhyAltitude: React.FC = () => {
  return (
    <section id="why-altitude" className="w-full py-20 lg:py-32 bg-bg transition-colors">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-mono-sm uppercase text-accent font-semibold tracking-mono">
              Why Altitude
            </span>
            <div className="w-8 h-[1px] bg-border" />
          </div>
          <h2 className="font-serif text-h2 font-semibold text-text tracking-tightest leading-tight">
            How we do things differently on the mountain.
          </h2>
          <p className="font-sans text-base text-muted mt-4">
            Commercial trek companies overload trails with 40-person herds. We keep it tight, local, and accountable.
          </p>
        </div>

        {/* Asymmetric Bento Grid of 5 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1: Large card with local photo - Certified Local Guides */}
          <BentoTiltCard
            hasPhoto
            className="md:col-span-2 lg:col-span-2 md:row-span-2 min-h-[380px] p-6 sm:p-8 text-white relative flex flex-col justify-end overflow-hidden"
          >
            {/* Guaranteed Local Image with graceful fallback */}
            <ImageWithFallback
              src={getAssetUrl('images/guide.jpg')}
              alt="Himalayan mountain guide leading small group across high snowy ridge"
              containerClassName="absolute inset-0 w-full h-full z-0"
              className="w-full h-full object-cover object-center"
            />
            {/* Vignette Gradient for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30 z-0 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-btn bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono tracking-mono text-white w-fit shadow-xs">
                <Award size={15} strokeWidth={1.5} className="text-accent" />
                <span>NIM & HMI Certified</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tightest text-white leading-tight">
                Certified local guides born on these passes
              </h3>
              <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed max-w-lg">
                Every leader is born in Uttarakhand, Himachal, or Sikkim, and holds Advanced Mountaineering from premier institutes. They read cloud shifts, know hidden water springs, and keep pace with the slowest walker in the crew.
              </p>
            </div>
          </BentoTiltCard>

          {/* Card 2: Groups Capped at 10 */}
          <BentoTiltCard className="p-6 sm:p-8 md:col-span-1 lg:col-span-2 min-h-[220px]">
            <div className="w-12 h-12 rounded-btn bg-bg border border-border flex items-center justify-center text-accent mb-6">
              <Users size={24} strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-mono text-mono-sm text-accent tracking-mono uppercase font-semibold mb-2">
                Strict Limit
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-text tracking-tightest mb-3">
                Groups capped strictly at 10
              </h3>
              <p className="font-sans text-sm text-muted leading-relaxed">
                You will never walk behind forty people in single file. Small groups move faster, bond deeper, leave zero trail waste, and stay safe.
              </p>
            </div>
          </BentoTiltCard>

          {/* Card 3: All Permits Handled */}
          <BentoTiltCard className="p-6 sm:p-8 md:col-span-1 lg:col-span-1 min-h-[220px]">
            <div className="w-12 h-12 rounded-btn bg-bg border border-border flex items-center justify-center text-accent mb-6">
              <FileCheck size={24} strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-mono text-mono-sm text-accent tracking-mono uppercase font-semibold mb-2">
                Paperwork
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-text tracking-tightest mb-2">
                All forest permits handled
              </h3>
              <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed">
                National park clearance, inner-line passes, camping paperwork, and environmental fees are filed before you reach base camp.
              </p>
            </div>
          </BentoTiltCard>

          {/* Card 4: Emergency Evacuation Cover */}
          <BentoTiltCard className="p-6 sm:p-8 md:col-span-1 lg:col-span-1 min-h-[220px]">
            <div className="w-12 h-12 rounded-btn bg-bg border border-border flex items-center justify-center text-accent mb-6">
              <ShieldAlert size={24} strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-mono text-mono-sm text-accent tracking-mono uppercase font-semibold mb-2">
                Medical Cover
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-text tracking-tightest mb-2">
                Emergency evacuation cover
              </h3>
              <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed">
                Pulse oximeter checks twice daily, portable oxygen, Wilderness First Aid leaders, and mountain rescue insurance included.
              </p>
            </div>
          </BentoTiltCard>

          {/* Card 5: Fixed Price with No Hidden Costs */}
          <BentoTiltCard className="p-6 sm:p-8 md:col-span-2 lg:col-span-2 min-h-[220px]">
            <div className="w-12 h-12 rounded-btn bg-bg border border-border flex items-center justify-center text-accent mb-6">
              <Receipt size={24} strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-mono text-mono-sm text-accent tracking-mono uppercase font-semibold mb-2">
                Zero Surcharges
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-text tracking-tightest mb-3">
                Fixed price with zero hidden costs
              </h3>
              <p className="font-sans text-sm text-muted leading-relaxed">
                What you see is what you pay. That means your mountain meals, four-season tents, gaiters, microspikes, and guide fees are covered with zero surprise fees on arrival.
              </p>
            </div>
          </BentoTiltCard>
        </div>
      </div>
    </section>
  );
};
