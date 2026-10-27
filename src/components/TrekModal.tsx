import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Mountain, Award, Check, AlertCircle } from 'lucide-react';
import { Trek } from '../types';
import { Button } from './Button';
import { ImageWithFallback } from './ImageWithFallback';

interface TrekModalProps {
  trek: Trek | null;
  onClose: () => void;
  onBook: (trekId: string) => void;
}

export const TrekModal: React.FC<TrekModalProps> = ({ trek, onClose, onBook }) => {
  if (!trek) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl bg-surface border border-border rounded-card overflow-hidden shadow-2xl z-10 my-8 text-text max-h-[90vh] flex flex-col"
        >
          {/* Header image using ImageWithFallback */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0 bg-[#161A18]">
            <ImageWithFallback
              src={trek.image}
              alt={trek.alt}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 z-10 pointer-events-none" />
            <button
              onClick={onClose}
              aria-label="Close details"
              className="absolute top-4 right-4 p-2 rounded-btn bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors z-20"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
            <div className="absolute bottom-5 left-6 right-6 text-white z-20">
              <span className="font-mono text-mono-sm uppercase text-accent font-semibold tracking-mono">
                {trek.region} · {trek.difficulty}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tightest mt-1">
                {trek.name}
              </h2>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-btn bg-bg border border-border">
              <div className="flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-mono text-muted flex items-center gap-1.5">
                  <Clock size={13} strokeWidth={1.5} /> Duration
                </span>
                <span className="font-serif text-lg font-semibold mt-1">
                  {trek.days} Days
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-mono text-muted flex items-center gap-1.5">
                  <Mountain size={13} strokeWidth={1.5} /> Max Altitude
                </span>
                <span className="font-serif text-lg font-semibold mt-1">
                  {trek.maxAltitude}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-mono text-muted flex items-center gap-1.5">
                  <Award size={13} strokeWidth={1.5} /> Price
                </span>
                <span className="font-serif text-lg font-semibold mt-1 text-accent">
                  ₹{trek.price.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-mono text-muted mb-2">
                The Trail in Brief
              </h4>
              <p className="font-sans text-sm text-text leading-relaxed">
                {trek.description}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-mono text-muted mb-3">
                Key Trail Highlights
              </h4>
              <ul className="space-y-2">
                {trek.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-text">
                    <Check size={16} strokeWidth={1.5} className="text-secondary shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-btn bg-bg border border-border text-xs text-muted space-y-1">
              <span className="font-mono uppercase tracking-mono font-semibold text-text flex items-center gap-1.5">
                <AlertCircle size={14} strokeWidth={1.5} className="text-accent" />
                The Altitude Guarantee
              </span>
              <p>
                Strict maximum of 10 people per batch. All forest permits, high-altitude medical tents, pulse oximeters, and mountain-rescue evacuation insurance are included with zero surcharge.
              </p>
            </div>
          </div>

          {/* Footer actions */}
          <div className="p-6 border-t border-border bg-surface flex items-center justify-between gap-4 shrink-0">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-mono text-muted block">
                Total per person
              </span>
              <span className="font-serif text-2xl font-semibold text-accent">
                ₹{trek.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                showArrow
                onClick={() => {
                  onClose();
                  onBook(trek.id);
                }}
              >
                Book This Trek
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
