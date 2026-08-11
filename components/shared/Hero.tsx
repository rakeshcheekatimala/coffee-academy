'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { trackCTAClick } from '@/lib/utils/analytics';

interface HeroProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

export function Hero({ title, description, ctaText, ctaLink, backgroundImage }: HeroProps) {
  return (
    <section
      className="page-hero"
      style={backgroundImage ? { '--page-hero-image': `url(${backgroundImage})` } as React.CSSProperties : undefined}
    >
      <div className="page-hero-inner page-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.2, 0.75, 0.2, 1] }}
          className="page-hero-copy"
        >
          <p className="eyebrow"><span /> Coffee Academy / Field guide</p>
          <h1>{title}</h1>
          <p className="page-hero-description">{description}</p>
          {ctaText && ctaLink ? (
            <Link
              className="button-primary page-hero-action"
              href={ctaLink}
              onClick={() => trackCTAClick(ctaText, 'hero', ctaLink)}
            >
              {ctaText}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.75, 0.2, 1] }}
          className="page-hero-diagram"
          aria-hidden="true"
        >
          <span className="page-hero-axis page-hero-axis-x" />
          <span className="page-hero-axis page-hero-axis-y" />
          <span className="page-hero-ring page-hero-ring-outer" />
          <span className="page-hero-ring page-hero-ring-inner" />
          <span className="page-hero-core"><span>CA</span></span>
          <span className="page-hero-note page-hero-note-a">ORIGIN</span>
          <span className="page-hero-note page-hero-note-b">METHOD</span>
          <span className="page-hero-note page-hero-note-c">TASTE</span>
        </motion.div>
      </div>
    </section>
  );
}
