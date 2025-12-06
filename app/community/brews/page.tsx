'use client';

import { useState, useCallback } from 'react';
import { Hero } from '@/components/shared/Hero';
import { BrewGallery } from '@/components/community/BrewGallery';
import { Button } from '@/components/ui/button';
import { getAllUserBrews, likeBrew } from '@/lib/content/userContent';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function BrewsPage() {
  const [brews, setBrews] = useState(getAllUserBrews());

  const handleLike = useCallback((brewId: string) => {
    likeBrew(brewId);
    setBrews((prev) =>
      prev.map((brew) =>
        brew.id === brewId ? { ...brew, likes: brew.likes + 1 } : brew
      )
    );
  }, []);

  return (
    <div className="min-h-screen">
      <Hero
        title="Brew Gallery"
        description="See what the community is brewing. Share your daily cup and discover new inspiration."
      />

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <p className="text-lg text-coffee-medium/80">
              {brews.length} brews shared by our community
            </p>
          </div>
          <Button asChild className="bg-amber-600 hover:bg-amber-500">
            <Link href="/community/submit?type=brew">
              <Plus className="w-4 h-4 mr-2" />
              Share Your Brew
            </Link>
          </Button>
        </div>

        {/* Gallery */}
        <BrewGallery brews={brews} onLike={handleLike} />
      </div>
    </div>
  );
}

