import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

export const CustomCursor: React.FC = () => {
  const { cursorMode, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging spring for the 32px ring
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 220, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 220, mass: 0.6 });

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  const isViewMode = cursorMode === 'view' || Boolean(cursorText);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* 8px Center Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isViewMode ? 0 : 1,
          opacity: isViewMode ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="w-2 h-2 rounded-full bg-accent fixed top-0 left-0"
      />

      {/* 32px Outer Ring that lags slightly behind */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isViewMode ? 64 : 32,
          height: isViewMode ? 64 : 32,
          backgroundColor: isViewMode ? 'var(--color-accent)' : 'transparent',
          borderColor: isViewMode ? 'var(--color-accent)' : 'var(--color-accent)',
          borderWidth: isViewMode ? '0px' : '1.5px',
          scale: isViewMode ? 1.15 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 260,
        }}
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none shadow-sm"
      >
        {isViewMode && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="font-mono text-[11px] font-semibold tracking-mono uppercase text-white select-none"
          >
            {cursorText || 'VIEW'}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};

