'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
      className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-coffee-dark via-coffee-medium to-coffee-light text-white overflow-hidden"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-dark/90 via-coffee-medium/80 to-coffee-light/70" />
      )}
      <div className="absolute inset-0 bg-[url('/images/grain-texture.png')] opacity-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 text-white/90"
        >
          {description}
        </motion.p>
        {ctaText && ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button asChild size="lg" className="bg-coffee-gold hover:bg-coffee-gold/90 text-coffee-dark text-lg px-8 py-6">
              <Link href={ctaLink}>
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

