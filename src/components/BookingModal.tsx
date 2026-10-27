import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShieldCheck, Users, Calendar, MapPin } from 'lucide-react';
import { Button } from './Button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTrekId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedTrekId,
}) => {
  const [selectedTrek, setSelectedTrek] = useState(selectedTrekId || 'kedarkantha');
  const [groupSize, setGroupSize] = useState('2');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'beginner',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl bg-surface border border-border rounded-card p-6 sm:p-8 shadow-2xl z-10 my-8 text-text max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-6 right-6 p-2 rounded-btn text-muted hover:text-text hover:bg-bg transition-colors"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {!submitted ? (
              <div>
                <span className="font-mono text-mono-sm uppercase text-accent font-semibold tracking-mono">
                  Small-Group Registration
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold mt-2 tracking-tightest">
                  Hold your spot on the ridge
                </h3>
                <p className="font-sans text-sm text-muted mt-2">
                  Groups are capped strictly at 10 trekkers. No mass batches, no hidden fees.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-mono text-muted mb-2">
                      Choose Your Trek
                    </label>
                    <div className="relative">
                      <select
                        value={selectedTrek}
                        onChange={(e) => setSelectedTrek(e.target.value)}
                        className="w-full bg-bg border border-border rounded-btn px-4 py-3 text-text font-sans text-sm focus:border-accent focus:outline-none transition-colors appearance-none"
                      >
                        <option value="kedarkantha">Kedarkantha Peak (12,500 ft · 6 Days · ₹9,500)</option>
                        <option value="hampta-pass">Hampta Pass Crossing (14,100 ft · 5 Days · ₹11,200)</option>
                        <option value="valley-of-flowers">Valley of Flowers & Hemkund (14,400 ft · 6 Days · ₹10,800)</option>
                        <option value="brahmatal">Brahmatal Ridge (12,250 ft · 6 Days · ₹9,800)</option>
                        <option value="goechala">Goechala Pass (15,100 ft · 11 Days · ₹21,500)</option>
                      </select>
                      <MapPin size={16} strokeWidth={1.5} className="absolute right-4 top-3.5 text-muted pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-mono text-muted mb-2">
                        Group Size (Max 10)
                      </label>
                      <div className="relative">
                        <select
                          value={groupSize}
                          onChange={(e) => setGroupSize(e.target.value)}
                          className="w-full bg-bg border border-border rounded-btn px-4 py-3 text-text font-sans text-sm focus:border-accent focus:outline-none transition-colors"
                        >
                          <option value="1">Solo Trekker (1)</option>
                          <option value="2">2 Friends</option>
                          <option value="3-4">Small Group (3–4)</option>
                          <option value="5-8">College/Work Crew (5–8)</option>
                          <option value="10">Full Private Group (10 Max)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase tracking-mono text-muted mb-2">
                        Preferred Month
                      </label>
                      <div className="relative">
                        <select
                          className="w-full bg-bg border border-border rounded-btn px-4 py-3 text-text font-sans text-sm focus:border-accent focus:outline-none transition-colors"
                        >
                          <option>Next available batch</option>
                          <option>October – Autumn Clear Skies</option>
                          <option>December – Fresh Winter Snow</option>
                          <option>January / February – Deep Winter</option>
                          <option>May / June – Spring Meadows</option>
                          <option>July / August – Monsoon Flora</option>
                        </select>
                        <Calendar size={16} strokeWidth={1.5} className="absolute right-4 top-3.5 text-muted pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-mono text-muted mb-2">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Rohan Sharma"
                        className="w-full bg-bg border border-border rounded-btn px-4 py-3 text-text font-sans text-sm focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase tracking-mono text-muted mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rohan@example.com"
                        className="w-full bg-bg border border-border rounded-btn px-4 py-3 text-text font-sans text-sm focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-mono text-muted mb-2">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-bg border border-border rounded-btn px-4 py-3 text-text font-sans text-sm focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="p-4 rounded-btn bg-bg/80 border border-border/60 text-xs text-muted flex items-start gap-3">
                    <ShieldCheck size={18} strokeWidth={1.5} className="text-secondary shrink-0 mt-0.5" />
                    <span>
                      Zero advance payment needed right now. Our trek leader will review your physical profile and confirm batch availability within 4 hours.
                    </span>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" showArrow className="w-full justify-center">
                      Reserve Spot in Batch
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary mx-auto flex items-center justify-center mb-6">
                  <CheckCircle size={36} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl font-semibold text-text tracking-tightest">
                  You are on the list, {formData.name || 'trekker'}.
                </h3>
                <p className="font-sans text-muted text-base mt-3 max-w-md mx-auto">
                  We sent a confirmation and kit preparation checklist to <span className="font-medium text-text">{formData.email || 'your email'}</span>. Our base camp coordinator will ping your WhatsApp shortly.
                </p>
                <div className="mt-8">
                  <Button variant="outline" onClick={resetForm}>
                    Back to site
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

