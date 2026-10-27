import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { Button } from '../components/Button';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Blur & hairline border after 80px scroll
      setIsScrolled(currentScrollY > 80);

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
          setIsVisible(false); // scrolling down
        } else if (lastScrollY - currentScrollY > 6) {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Treks', href: '#treks' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Stories', href: '#stories' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-surface/85 backdrop-blur-md border-b border-border shadow-xs py-3'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-content mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Wordmark */}
          <a
            href="#"
            className="font-serif font-semibold text-2xl tracking-tightest text-text select-none flex items-center gap-1 group"
          >
            <span>ALTITUDE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block transform group-hover:scale-125 transition-transform" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="link-sweep font-sans text-sm font-medium text-text/90 hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Theme Toggle + Book a Trek Button */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="primary"
              size="sm"
              showArrow
              onClick={onOpenBooking}
            >
              Book a trek
            </Button>
          </div>

          {/* Mobile Right Controls: Toggle + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-btn border border-border bg-surface text-text hover:border-accent transition-colors"
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-bg pt-28 px-6 pb-12 flex flex-col justify-between md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              <span className="font-mono text-mono-sm uppercase text-accent font-semibold tracking-mono">
                Menu
              </span>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * (idx + 1), duration: 0.4 }}
                  className="font-serif text-3xl font-medium text-text hover:text-accent flex items-center justify-between border-b border-border/40 pb-4"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={20} strokeWidth={1.5} className="text-muted" />
                </motion.a>
              ))}
            </nav>

            <div className="mt-12 space-y-4">
              <Button
                variant="primary"
                size="lg"
                showArrow
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
              >
                Book a trek
              </Button>
              <p className="font-mono text-xs uppercase tracking-mono text-muted text-center pt-2">
                Himalayan Treks · Groups Capped At 10
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

