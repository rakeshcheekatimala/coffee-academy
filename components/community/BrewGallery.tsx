'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BrewCard } from './BrewCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserBrew } from '@/lib/types';
import { Search, SlidersHorizontal } from 'lucide-react';

interface BrewGalleryProps {
  brews: UserBrew[];
  onLike?: (brewId: string) => void;
}

type SortOption = 'recent' | 'popular' | 'rating';

export function BrewGallery({ brews, onLike }: BrewGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedBrews = useMemo(() => {
    let filtered = brews.filter((brew) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        brew.title.toLowerCase().includes(query) ||
        brew.description.toLowerCase().includes(query) ||
        brew.userName.toLowerCase().includes(query) ||
        brew.tasteNotes.some((note) => note.toLowerCase().includes(query)) ||
        brew.equipmentUsed.some((eq) => eq.toLowerCase().includes(query))
      );
    });

    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => b.likes - a.likes);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'recent':
      default:
        return filtered.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }, [brews, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search brews by title, notes, or equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Liked</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-amber-50 border-amber-300' : ''}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredAndSortedBrews.length} brew{filteredAndSortedBrews.length !== 1 ? 's' : ''}
      </div>

      {/* Brews grid */}
      {filteredAndSortedBrews.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedBrews.map((brew, index) => (
            <BrewCard key={brew.id} brew={brew} index={index} onLike={onLike} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">☕</div>
          <h3 className="text-xl font-semibold text-coffee-dark mb-2">No brews found</h3>
          <p className="text-coffee-medium/70 mb-6">
            {searchQuery
              ? 'Try adjusting your search'
              : 'Be the first to share your brew!'}
          </p>
          {searchQuery && (
            <Button onClick={() => setSearchQuery('')} variant="outline">
              Clear search
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
}

