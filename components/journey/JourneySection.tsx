'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface JourneySectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function JourneySection({ children, className = '', delay = 0 }: JourneySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface JourneyDividerProps {
  variant?: 'wave' | 'drip' | 'steam';
  fromColor?: string;
  toColor?: string;
}

export function JourneyDivider({
  variant = 'wave',
  fromColor = '#1a0f0a',
  toColor = '#2d1810',
}: JourneyDividerProps) {
  if (variant === 'drip') {
    return (
      <div className="relative h-32 -mt-1" style={{ backgroundColor: fromColor }}>
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 w-full h-32"
          preserveAspectRatio="none"
        >
          <path
            fill={toColor}
            d="M0,120 L0,60 Q120,80 240,60 T480,60 T720,60 T960,60 T1200,60 T1440,60 L1440,120 Z"
          />
          {/* Coffee drips */}
          <ellipse cx="200" cy="50" rx="15" ry="20" fill={toColor} />
          <ellipse cx="600" cy="55" rx="12" ry="18" fill={toColor} />
          <ellipse cx="1000" cy="48" rx="18" ry="22" fill={toColor} />
          <ellipse cx="1300" cy="52" rx="14" ry="19" fill={toColor} />
        </svg>
      </div>
    );
  }

  if (variant === 'steam') {
    return (
      <div className="relative h-24 overflow-hidden" style={{ backgroundColor: fromColor }}>
        <svg
          viewBox="0 0 1440 96"
          className="absolute bottom-0 w-full h-24"
          preserveAspectRatio="none"
        >
          <path
            fill={toColor}
            d="M0,96 L0,48 Q180,32 360,48 T720,48 T1080,48 T1440,48 L1440,96 Z"
            opacity="0.5"
          />
          <path
            fill={toColor}
            d="M0,96 L0,64 Q180,48 360,64 T720,64 T1080,64 T1440,64 L1440,96 Z"
          />
        </svg>
      </div>
    );
  }

  // Default wave
  return (
    <div className="relative h-20 -mt-1" style={{ backgroundColor: fromColor }}>
      <svg
        viewBox="0 0 1440 80"
        className="absolute bottom-0 w-full h-20"
        preserveAspectRatio="none"
      >
        <path
          fill={toColor}
          d="M0,80 L0,40 Q360,0 720,40 T1440,40 L1440,80 Z"
        />
      </svg>
    </div>
  );
}

interface JourneyCallToActionProps {
  title: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export function JourneyCallToAction({
  title,
  description,
  primaryAction,
  secondaryAction,
}: JourneyCallToActionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center py-20 px-6"
    >
      <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
        {title}
      </h3>
      <p className="text-lg text-current/70 mb-8 max-w-2xl mx-auto">{description}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={primaryAction.href}
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors"
        >
          {primaryAction.label}
        </a>
        {secondaryAction && (
          <a
            href={secondaryAction.href}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-current/20 hover:bg-current/5 font-medium transition-colors"
          >
            {secondaryAction.label}
          </a>
        )}
      </div>
    </motion.div>
  );
}

