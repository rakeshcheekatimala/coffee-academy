'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface JourneyStageProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  icon: LucideIcon;
  gradient: string;
  textGradient: string;
  index: number;
  illustration: ReactNode;
}

export function JourneyStage({
  id,
  title,
  subtitle,
  description,
  details,
  icon: Icon,
  gradient,
  textGradient,
  index,
  illustration,
}: JourneyStageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  return (
    <section
      id={id}
      ref={ref}
      className={`relative min-h-screen flex items-center py-24 overflow-hidden ${gradient}`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-6">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            isEven ? '' : 'lg:grid-flow-dense'
          }`}
        >
          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={isEven ? '' : 'lg:col-start-2'}
          >
            {/* Stage number */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="text-sm font-medium tracking-widest uppercase text-current/60">
                Stage {index + 1}
              </span>
              <div className="w-12 h-px bg-current/30" />
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-current/10 backdrop-blur-sm">
                <Icon className="w-8 h-8" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-3 ${textGradient}`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl md:text-2xl text-current/70 mb-6 font-medium"
            >
              {subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-current/80 mb-8 leading-relaxed max-w-lg"
            >
              {description}
            </motion.p>

            {/* Details list */}
            <motion.ul className="space-y-3">
              {details.map((detail, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-current/60 flex-shrink-0" />
                  <span className="text-current/70">{detail}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Illustration side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className={`relative ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-current/10 animate-pulse" />
              <div
                className="absolute inset-4 rounded-full border border-current/10"
                style={{ animationDelay: '0.5s' }}
              />
              <div
                className="absolute inset-8 rounded-full border border-current/10"
                style={{ animationDelay: '1s' }}
              />

              {/* Main illustration container */}
              <div className="absolute inset-12 rounded-full bg-current/5 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                {illustration}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

