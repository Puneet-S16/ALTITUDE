import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'text-link';
  children: React.ReactNode;
  icon?: LucideIcon;
  showArrow?: boolean;
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon: Icon,
  showArrow = false,
  size = 'md',
  asLink = false,
  href,
  className = '',
  onClick,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs font-mono tracking-mono',
    md: 'px-6 py-3 text-sm font-medium',
    lg: 'px-8 py-4 text-base font-medium',
  };

  if (variant === 'text-link') {
    const Component = asLink ? 'a' : 'button';
    return (
      <Component
        href={href}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`link-sweep group inline-flex items-center gap-2 font-mono text-xs tracking-mono uppercase text-text hover:text-accent focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1 cursor-pointer transition-colors ${className}`}
        {...(rest as any)}
      >
        <span>{children}</span>
        {showArrow && (
          <motion.span
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center text-accent"
          >
            <ArrowRight size={14} strokeWidth={1.5} />
          </motion.span>
        )}
      </Component>
    );
  }

  // Primary sweep button
  if (variant === 'primary') {
    return (
      <motion.button
        whileTap={{ scale: 0.97 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className={`relative inline-flex items-center justify-center gap-2.5 rounded-btn overflow-hidden font-sans font-medium text-white bg-accent shadow-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none transition-colors duration-200 cursor-pointer ${sizeStyles[size]} ${className}`}
        {...(rest as any)}
      >
        {/* Sweep background layer from left to right */}
        <motion.span
          className="absolute inset-0 bg-[#BF3F0D] dark:bg-[#FA581D] z-0"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />

        <span className="relative z-10 flex items-center gap-2">
          {Icon && <Icon size={16} strokeWidth={1.5} />}
          <span>{children}</span>
          {showArrow && (
            <motion.span
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </motion.span>
          )}
        </span>
      </motion.button>
    );
  }

  // Secondary button (pine green)
  if (variant === 'secondary') {
    return (
      <motion.button
        whileTap={{ scale: 0.97 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className={`relative inline-flex items-center justify-center gap-2.5 rounded-btn overflow-hidden font-sans font-medium text-white dark:text-[#0E1110] bg-secondary hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent transition-all duration-200 cursor-pointer ${sizeStyles[size]} ${className}`}
        {...(rest as any)}
      >
        <span className="flex items-center gap-2">
          {Icon && <Icon size={16} strokeWidth={1.5} />}
          <span>{children}</span>
          {showArrow && (
            <motion.span
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </motion.span>
          )}
        </span>
      </motion.button>
    );
  }

  // Outline variant
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-2.5 rounded-btn border border-border bg-surface text-text hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent transition-colors duration-200 cursor-pointer ${sizeStyles[size]} ${className}`}
      {...(rest as any)}
    >
      <span className="flex items-center gap-2">
        {Icon && <Icon size={16} strokeWidth={1.5} />}
        <span>{children}</span>
        {showArrow && (
          <motion.span
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArrowRight size={16} strokeWidth={1.5} />
          </motion.span>
        )}
      </span>
    </motion.button>
  );
};

