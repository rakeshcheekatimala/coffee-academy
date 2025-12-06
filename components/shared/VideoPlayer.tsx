'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  variant?: 'default' | 'embed' | 'minimal';
}

export function VideoPlayer({
  src,
  poster,
  title,
  description,
  autoPlay = false,
  muted = true,
  loop = false,
  variant = 'default',
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [showControls, setShowControls] = useState(false);

  // Check if it's a YouTube or Vimeo embed
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  const isVimeo = src.includes('vimeo.com');

  if (isYouTube || isVimeo) {
    const embedUrl = isYouTube
      ? src.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')
      : src.replace('vimeo.com/', 'player.vimeo.com/video/');

    return (
      <div className="space-y-3">
        {title && variant !== 'minimal' && (
          <div>
            <h3 className="font-semibold text-coffee-dark">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
          <iframe
            src={`${embedUrl}?autoplay=${autoPlay ? 1 : 0}&mute=${muted ? 1 : 0}`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  // Native video player
  return (
    <div className="space-y-3">
      {title && variant !== 'minimal' && (
        <div>
          <h3 className="font-semibold text-coffee-dark">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div
        className="relative aspect-video rounded-lg overflow-hidden bg-black group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={isMuted}
          loop={loop}
          playsInline
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={(e) => {
            const video = e.currentTarget;
            if (video.paused) {
              video.play();
            } else {
              video.pause();
            }
          }}
        />

        {/* Play button overlay */}
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/30"
          >
            <button
              className="w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                const video = e.currentTarget.closest('div')?.querySelector('video');
                if (video) video.play();
              }}
            >
              <Play className="w-8 h-8 text-coffee-dark ml-1" />
            </button>
          </motion.div>
        )}

        {/* Controls overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls || !isPlaying ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
        >
          <div className="flex items-center gap-3">
            <button
              className="text-white hover:text-amber-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                const video = e.currentTarget.closest('.group')?.querySelector('video');
                if (video) {
                  if (video.paused) {
                    video.play();
                  } else {
                    video.pause();
                  }
                }
              }}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>

            <button
              className="text-white hover:text-amber-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                const video = e.currentTarget.closest('.group')?.querySelector('video');
                if (video) {
                  video.muted = !video.muted;
                  setIsMuted(video.muted);
                }
              }}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            <div className="flex-1" />

            <button
              className="text-white hover:text-amber-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                const video = e.currentTarget.closest('.group')?.querySelector('video');
                if (video) {
                  if (video.requestFullscreen) {
                    video.requestFullscreen();
                  }
                }
              }}
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Video thumbnail component for grids
interface VideoThumbnailProps {
  src: string;
  poster?: string;
  title: string;
  duration?: string;
  onClick?: () => void;
}

export function VideoThumbnail({
  src,
  poster,
  title,
  duration,
  onClick,
}: VideoThumbnailProps) {
  // Extract YouTube thumbnail if it's a YouTube URL
  const getThumbnail = () => {
    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      const videoId = src.includes('youtu.be/')
        ? src.split('youtu.be/')[1]
        : src.split('v=')[1]?.split('&')[0];
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return poster;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${getThumbnail()})` }}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-colors shadow-lg">
          <Play className="w-6 h-6 text-coffee-dark ml-1" />
        </div>
      </div>

      {/* Duration badge */}
      {duration && (
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
      )}

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white text-sm font-medium truncate">{title}</p>
      </div>
    </motion.div>
  );
}

// Cinemagraph component (animated still image)
interface CinemagraphProps {
  videoSrc: string;
  fallbackImage?: string;
  alt: string;
  className?: string;
}

export function Cinemagraph({
  videoSrc,
  fallbackImage,
  alt,
  className = '',
}: CinemagraphProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        poster={fallbackImage}
        className="w-full h-full object-cover"
        aria-label={alt}
      />
      {/* Optional overlay for text or effects */}
    </div>
  );
}

