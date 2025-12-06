'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X, ZoomIn, Download } from 'lucide-react';

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  variant?: 'grid' | 'carousel' | 'masonry';
  columns?: 2 | 3 | 4;
  showCaptions?: boolean;
  lightbox?: boolean;
}

export function ImageGallery({
  images,
  variant = 'grid',
  columns = 3,
  showCaptions = true,
  lightbox = true,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    if (lightbox) {
      setSelectedIndex(index);
    }
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  };

  if (variant === 'carousel') {
    return (
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 snap-center"
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                {showCaptions && image.caption && (
                  <p className="mt-2 text-sm text-muted-foreground text-center">
                    {image.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        <LightboxDialog
          images={images}
          selectedIndex={selectedIndex}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      </div>
    );
  }

  // Grid variant (default)
  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            {showCaptions && image.caption && (
              <p className="mt-2 text-sm text-muted-foreground">{image.caption}</p>
            )}
          </motion.div>
        ))}
      </div>
      <LightboxDialog
        images={images}
        selectedIndex={selectedIndex}
        onClose={closeLightbox}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </>
  );
}

// Lightbox dialog component
interface LightboxDialogProps {
  images: Array<{ src: string; alt: string; caption?: string }>;
  selectedIndex: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

function LightboxDialog({
  images,
  selectedIndex,
  onClose,
  onPrevious,
  onNext,
}: LightboxDialogProps) {
  if (selectedIndex === null) return null;

  const currentImage = images[selectedIndex];

  return (
    <Dialog open={selectedIndex !== null} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl w-full p-0 bg-black/95 border-none">
        <div className="relative w-full h-[80vh] flex items-center justify-center">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/10"
                onClick={onPrevious}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/10"
                onClick={onNext}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full flex items-center justify-center p-8"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {/* Caption and counter */}
          <div className="absolute bottom-4 left-0 right-0 text-center">
            {currentImage.caption && (
              <p className="text-white text-sm mb-2">{currentImage.caption}</p>
            )}
            <p className="text-white/60 text-xs">
              {selectedIndex + 1} of {images.length}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Before/After comparison component
interface BeforeAfterProps {
  beforeImage: { src: string; alt: string };
  afterImage: { src: string; alt: string };
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterComparison({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, x)));
  };

  return (
    <div
      className="relative aspect-video rounded-lg overflow-hidden cursor-col-resize select-none"
      onMouseMove={handleMouseMove}
    >
      {/* After image (background) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage.src}
          alt={afterImage.alt}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">
            {afterLabel}
          </span>
        </div>
      </div>

      {/* Before image (overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image
          src={beforeImage.src}
          alt={beforeImage.alt}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">
            {beforeLabel}
          </span>
        </div>
      </div>

      {/* Slider */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    </div>
  );
}

