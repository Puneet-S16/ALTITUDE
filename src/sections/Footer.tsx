import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

// Lucide-styled icons with exact stroke width 1.5
const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="w-full bg-bg border-t border-border pt-16 sm:pt-24 pb-12 transition-colors overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Main Grid: Newsletter + Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-border">
          {/* Newsletter / Dispatch Signup (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-mono-sm uppercase text-accent font-semibold tracking-mono">
              The High Country Dispatch
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-text tracking-tightest">
              Straight trail reports twice a month.
            </h3>
            <p className="font-sans text-sm text-muted leading-relaxed max-w-md">
              Snow pack updates, pass conditions, early bird departure windows, and honest kit reviews. Zero marketing spam.
            </p>

            {/* Email Field with Styled Button */}
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-surface border border-border rounded-btn px-4 py-3 text-text text-sm font-sans placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-btn bg-accent text-white font-sans text-sm font-medium hover:bg-accent-hover transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <span>Dispatch</span>
                  <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-btn bg-surface border border-border text-sm text-text flex items-center gap-2 max-w-md">
                <Check size={16} strokeWidth={1.5} className="text-secondary" />
                <span>You are on the dispatch list. We only write when there is snow news.</span>
              </div>
            )}
          </div>

          {/* Nav columns (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-mono text-muted font-semibold block">
                Expeditions
              </span>
              <ul className="space-y-2.5 text-sm font-sans">
                <li>
                  <a href="#treks" className="link-sweep text-text hover:text-accent">
                    Kedarkantha Peak
                  </a>
                </li>
                <li>
                  <a href="#treks" className="link-sweep text-text hover:text-accent">
                    Hampta Pass Crossing
                  </a>
                </li>
                <li>
                  <a href="#treks" className="link-sweep text-text hover:text-accent">
                    Valley of Flowers
                  </a>
                </li>
                <li>
                  <a href="#treks" className="link-sweep text-text hover:text-accent">
                    Brahmatal Ridge
                  </a>
                </li>
                <li>
                  <a href="#treks" className="link-sweep text-text hover:text-accent">
                    Goechala Pass
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-mono text-muted font-semibold block">
                Resources
              </span>
              <ul className="space-y-2.5 text-sm font-sans">
                <li>
                  <a href="#how-it-works" className="link-sweep text-text hover:text-accent">
                    Essential Kit List
                  </a>
                </li>
                <li>
                  <a href="#faq" className="link-sweep text-text hover:text-accent">
                    Acclimatization 101
                  </a>
                </li>
                <li>
                  <a href="#faq" className="link-sweep text-text hover:text-accent">
                    Safety & Medical Protocols
                  </a>
                </li>
                <li>
                  <a href="#faq" className="link-sweep text-text hover:text-accent">
                    Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="#why-altitude" className="link-sweep text-text hover:text-accent">
                    Leave No Trace Charter
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <span className="font-mono text-xs uppercase tracking-mono text-muted font-semibold block">
                Base Camps
              </span>
              <div className="space-y-2 text-xs font-mono text-muted uppercase">
                <p>Sankri · Uttarakhand</p>
                <p>Manali · Himachal</p>
                <p>Yuksom · West Sikkim</p>
                <p>Joshimath · Chamoli</p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Altitude on Instagram"
                  className="w-9 h-9 rounded-btn border border-border bg-surface flex items-center justify-center text-text hover:border-accent hover:text-accent transition-colors"
                >
                  <InstagramIcon size={17} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe to Altitude on YouTube"
                  className="w-9 h-9 rounded-btn border border-border bg-surface flex items-center justify-center text-text hover:border-accent hover:text-accent transition-colors"
                >
                  <YoutubeIcon size={17} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* GIANT "ALTITUDE" WORDMARK SPANNING FULL WIDTH */}
        <div className="py-8 sm:py-12 text-center select-none overflow-hidden">
          <span className="font-serif font-bold text-[18vw] leading-none tracking-tightest text-border/60 dark:text-[#26302B]/60 inline-block pointer-events-none">
            ALTITUDE
          </span>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-mono text-muted">
          <div>
            © {new Date().getFullYear()} Altitude Trekking Co. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>High Himalaya Guided Treks</span>
            <span>·</span>
            <span>Max 10 per batch</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
