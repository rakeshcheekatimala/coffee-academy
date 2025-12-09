'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
    <div 
      className="relative min-h-[65vh] flex items-center justify-center overflow-hidden"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {/* Elegant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a] via-[#2d1810] to-[#3d251a]" />
      
      {/* Ultra-subtle texture overlay - classic paper grain effect */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      
      {/* Subtle radial gradient for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, transparent 60%, rgba(120, 53, 15, 0.2) 100%)',
        }}
      />
      
      {/* Decorative top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Elegant divider line above title */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mb-8"
        />
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tight"
          style={{ 
            fontFamily: 'Georgia, "Times New Roman", serif',
            letterSpacing: '-0.02em',
          }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200">
            {title}
          </span>
        </motion.h1>
        
        {/* Decorative divider line below title */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl lg:text-2xl mb-10 text-amber-100/85 leading-relaxed max-w-2xl mx-auto font-light tracking-wide"
        >
          {description}
        </motion.p>
        
        {ctaText && ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-base md:text-lg px-8 py-6 rounded-full shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-800/40 transition-all duration-300 font-medium border border-amber-500/20 hover:border-amber-400/30"
            >
              <Link 
                href={ctaLink}
                onClick={() => trackCTAClick(ctaText || '', 'hero', ctaLink || '')}
              >
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        )}
        
        {/* Decorative bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          className="mx-auto w-32 h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent mt-10"
        />
      </motion.div>
      
      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent" />
    </div>
  );
}

