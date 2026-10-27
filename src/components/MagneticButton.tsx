import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for magnetic pull
  const x = useSpring(0, { damping: 15, stiffness: 150, mass: 0.2 });
  const y = useSpring(0, { damping: 15, stiffness: 150, mass: 0.2 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Pull gently within 40px margin of button boundaries
    if (distance < rect.width / 2 + 40) {
      x.set(distanceX * 0.35);
      y.set(distanceY * 0.35);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-btn overflow-hidden font-sans font-medium text-lg text-white bg-accent shadow-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none cursor-pointer transition-shadow hover:shadow-xl ${className}`}
    >
      {/* Background sweep */}
      <motion.span
        className="absolute inset-0 bg-[#BF3F0D] dark:bg-[#FA581D] z-0"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />

      <span className="relative z-10 flex items-center gap-3">
        <span>{children}</span>
        <motion.span
          animate={{ x: isHovered ? 6 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArrowRight size={20} strokeWidth={1.5} />
        </motion.span>
      </span>
    </motion.button>
  );
};

