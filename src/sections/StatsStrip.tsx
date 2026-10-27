import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItemProps {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  sublabel?: string;
}

const StatCounter: React.FC<StatItemProps> = ({
  value,
  suffix = '',
  decimals = 0,
  label,
  sublabel,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    const duration = 1800; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = easedProgress * value;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, value]);

  const formatted = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toLocaleString();

  return (
    <div ref={ref} className="flex flex-col py-6 sm:py-8 border-b md:border-b-0 md:border-r border-border last:border-0 md:px-8 first:pl-0 last:pr-0">
      <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-semibold text-text tracking-tight flex items-baseline gap-0.5">
        <span>{formatted}</span>
        {suffix && <span className="text-accent">{suffix}</span>}
      </div>
      <div className="mt-3 font-mono text-xs uppercase tracking-mono text-muted font-medium">
        {label}
      </div>
      {sublabel && (
        <div className="mt-1 font-sans text-xs text-muted/70">
          {sublabel}
        </div>
      )}
    </div>
  );
};

export const StatsStrip: React.FC = () => {
  return (
    <section className="w-full border-y border-border bg-surface/60 transition-colors">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0">
          <StatCounter
            value={38}
            label="Trails mapped"
            sublabel="Across Garhwal, Kumaon, Spiti & Sikkim"
          />
          <StatCounter
            value={4200}
            suffix="+"
            label="Trekkers guided"
            sublabel="In groups capped strictly at 10"
          />
          <StatCounter
            value={0}
            label="Compromises on safety"
            sublabel="1:5 guide ratio, full medical gear"
          />
          <StatCounter
            value={4.9}
            decimals={1}
            suffix="★"
            label="Average rating"
            sublabel="From 1,140 verified participant reviews"
          />
        </div>
      </div>
    </section>
  );
};

