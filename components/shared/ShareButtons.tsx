'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dialog';
import { 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Link as LinkIcon, 
  Mail,
  Check,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonsProps {
  url?: string;
  title: string;
  description?: string;
  variant?: 'default' | 'compact' | 'icon';
  className?: string;
}

export function ShareButtons({
  url,
  title,
  description = '',
  variant = 'default',
  className = '',
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    }
  };

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleShare}
        className={className}
        title="Share"
      >
        <Share2 className="w-4 h-4" />
      </Button>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => window.open(shareLinks.twitter, '_blank')}
          title="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => window.open(shareLinks.facebook, '_blank')}
          title="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={copyToClipboard}
          title="Copy link"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check className="w-4 h-4 text-green-500" />
              </motion.div>
            ) : (
              <motion.div
                key="link"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <LinkIcon className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      
      <Button
        variant="outline"
        size="sm"
        className="gap-2 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]"
        onClick={() => window.open(shareLinks.twitter, '_blank')}
      >
        <Twitter className="w-4 h-4" />
        Twitter
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-2 hover:bg-[#4267B2]/10 hover:text-[#4267B2] hover:border-[#4267B2]"
        onClick={() => window.open(shareLinks.facebook, '_blank')}
      >
        <Facebook className="w-4 h-4" />
        Facebook
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-2 hover:bg-[#0077B5]/10 hover:text-[#0077B5] hover:border-[#0077B5]"
        onClick={() => window.open(shareLinks.linkedin, '_blank')}
      >
        <Linkedin className="w-4 h-4" />
        LinkedIn
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-2 hover:bg-[#25D366]/10 hover:text-[#25D366] hover:border-[#25D366]"
        onClick={() => window.open(shareLinks.whatsapp, '_blank')}
      >
        <MessageCircle className="w-4 h-4" />
        WhatsApp
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => window.open(shareLinks.email, '_blank')}
      >
        <Mail className="w-4 h-4" />
        Email
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={copyToClipboard}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-green-600"
            >
              <Check className="w-4 h-4" />
              Copied!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <LinkIcon className="w-4 h-4" />
              Copy Link
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}

// Floating share button for mobile
export function FloatingShareButton({ title, description }: { title: string; description?: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    }
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 }}
      onClick={handleShare}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-amber-600 text-white shadow-lg hover:bg-amber-500 flex items-center justify-center md:hidden"
    >
      <Share2 className="w-6 h-6" />
    </motion.button>
  );
}

