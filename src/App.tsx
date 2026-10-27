import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ThemeProvider } from './context/ThemeContext';
import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { BookingModal } from './components/BookingModal';
import { TrekModal } from './components/TrekModal';

import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { StatsStrip } from './sections/StatsStrip';
import { Manifesto } from './sections/Manifesto';
import { WhyAltitude } from './sections/WhyAltitude';
import { FeaturedTreks } from './sections/FeaturedTreks';
import { HowItWorks } from './sections/HowItWorks';
import { Stories } from './sections/Stories';
import { Gallery } from './sections/Gallery';
import { FAQ } from './sections/FAQ';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';

import { Trek } from './types';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTrekForBooking, setSelectedTrekForBooking] = useState<string | undefined>(undefined);
  const [selectedTrekModal, setSelectedTrekModal] = useState<Trek | null>(null);

  // Lenis Smooth Scroll integrated with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleOpenBooking = (trekId?: string) => {
    setSelectedTrekForBooking(trekId);
    setIsBookingOpen(true);
  };

  const handleSelectTrek = (trek: Trek) => {
    setSelectedTrekModal(trek);
  };

  return (
    <ThemeProvider>
      <CursorProvider>
        {/* Subtle Film-grain noise overlay on the whole page at 4% opacity */}
        <div className="film-grain-overlay" aria-hidden="true" />

        {/* Desktop Custom Cursor */}
        <CustomCursor />

        {/* Thin accent-coloured scroll-progress bar at the top */}
        <ScrollProgress />

        <div className="min-h-screen bg-bg text-text transition-colors duration-300 relative flex flex-col">
          {/* Section 1: Navbar */}
          <Navbar onOpenBooking={() => handleOpenBooking()} />

          <main className="flex-1">
            {/* Section 2: Hero (100vh) */}
            <Hero onFindTrek={() => handleOpenBooking()} />

            {/* Section 3: Stats strip */}
            <StatsStrip />

            {/* Section 4: Manifesto */}
            <Manifesto />

            {/* Section 5: Why Altitude */}
            <WhyAltitude />

            {/* Section 6: Featured treks */}
            <FeaturedTreks onSelectTrek={handleSelectTrek} />

            {/* Section 7: How it works */}
            <HowItWorks />

            {/* Section 8: Stories */}
            <Stories />

            {/* Section 9: Gallery */}
            <Gallery />

            {/* Section 10: FAQ */}
            <FAQ />

            {/* Section 11: Final CTA */}
            <FinalCTA onOpenBooking={() => handleOpenBooking()} />
          </main>

          {/* Section 12: Footer */}
          <Footer />

          {/* Trek Detail Modal */}
          <TrekModal
            trek={selectedTrekModal}
            onClose={() => setSelectedTrekModal(null)}
            onBook={(trekId) => handleOpenBooking(trekId)}
          />

          {/* Booking Modal */}
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            selectedTrekId={selectedTrekForBooking}
          />
        </div>
      </CursorProvider>
    </ThemeProvider>
  );
};

export default App;

