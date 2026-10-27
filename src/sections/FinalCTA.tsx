import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../components/MagneticButton';
import { Compass, ShieldCheck } from 'lucide-react';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  return (
    <section className="w-full bg-[#1F3A2E] text-[#EDEAE3] py-24 lg:py-32 relative overflow-hidden">
      {/* Background subtle mountain contour silhouette */}
      <svg
        viewBox="0 0 1440 320"
        fill="none"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[45%] opacity-10 pointer-events-none"
      >
        <path
          d="M0 320L0 120L180 60L360 160L540 40L720 140L900 70L1080 180L1260 90L1440 150L1440 320Z"
          fill="#FFFFFF"
        />
      </svg>

      <div className="max-w-content mx-auto px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-btn bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono tracking-mono text-[#8FB9A0] mb-8"
        >
          <Compass size={14} strokeWidth={1.5} />
          <span>Small Groups Only · Capped At 10 Trekkers</span>
        </motion.div>

        {/* Large Fraunces Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-h2 font-semibold tracking-tightest leading-tight max-w-3xl mb-8"
        >
          Your first summit is closer than you think.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          No previous mountaineering experience required. Pick your dates, get your boot size ready, and let local leaders guide you to the pass.
        </motion.p>

        {/* Magnetic Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MagneticButton onClick={onOpenBooking}>
            Book your batch
          </MagneticButton>
        </motion.div>

        {/* Reassurance pill */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/60 uppercase tracking-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} strokeWidth={1.5} className="text-[#8FB9A0]" />
            Full Refund Protection
          </span>
          <span>·</span>
          <span>Zero Mass Batches</span>
          <span>·</span>
          <span>Certified Trail Masters</span>
        </div>
      </div>
    </section>
  );
};

