'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Coffee } from 'lucide-react';
import Link from 'next/link';

export function JourneyHero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);

  return (
    <motion.section
      style={{ opacity, y, scale }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a] via-[#2d1810] to-[#3d251a]" />
      
      {/* Coffee steam animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-gradient-to-t from-transparent via-amber-100/20 to-transparent rounded-full"
            style={{
              left: `${15 + i * 14}%`,
              height: '200px',
              bottom: '30%',
            }}
            animate={{
              y: [-200, -400],
              opacity: [0, 0.6, 0],
              scaleY: [0.5, 1.5, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Logo/Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-2xl shadow-amber-900/50">
            <Coffee className="w-12 h-12 text-amber-100" />
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 mb-6 tracking-tight"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          The Coffee Journey
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-amber-100/80 mb-4 max-w-2xl mx-auto leading-relaxed"
        >
          From humble bean to perfect cup
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg text-amber-200/60 mb-12 max-w-xl mx-auto"
        >
          Discover the art, science, and passion behind every sip
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-amber-900/30 transition-all hover:shadow-xl hover:shadow-amber-800/40"
          >
            <Link href="/wizard">Find Your Perfect Brew</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="relative text-amber-50 bg-gradient-to-br from-amber-950/40 via-transparent to-amber-950/40 hover:from-amber-900/50 hover:via-amber-800/30 hover:to-amber-900/50 text-lg px-8 py-6 rounded-full backdrop-blur-md border-2 border-amber-500/30 hover:border-amber-400/50 shadow-lg shadow-amber-950/30 hover:shadow-xl hover:shadow-amber-900/40 transition-all duration-300 font-medium hover:scale-105"
          >
            <Link href="/levels">Start Learning</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-amber-200/60 text-sm tracking-widest uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-amber-400/60" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

