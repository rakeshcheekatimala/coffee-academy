'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Coffee, Clock, Star } from 'lucide-react';
import { UserBrew } from '@/lib/types';
import Link from 'next/link';
import { trackBrewLike } from '@/lib/utils/analytics';

interface BrewCardProps {
  brew: UserBrew;
  index?: number;
  onLike?: (brewId: string) => void;
}

export function BrewCard({ brew, index = 0, onLike }: BrewCardProps) {
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
        {/* Header */}
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Avatar placeholder */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-semibold">
                {brew.userName.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-sm">{brew.userName}</p>
                <p className="text-xs text-muted-foreground">{timeAgo(brew.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < brew.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Title */}
          <div>
            <CardTitle className="text-lg mb-2 line-clamp-2">{brew.title}</CardTitle>
            <CardDescription className="line-clamp-3">{brew.description}</CardDescription>
          </div>

          {/* Recipe link */}
          {brew.recipeId && (
            <Link href={`/recipes/${brew.recipeId}`}>
              <Badge variant="secondary" className="gap-1 hover:bg-amber-100 cursor-pointer">
                <Coffee className="w-3 h-3" />
                View Recipe
              </Badge>
            </Link>
          )}

          {/* Equipment */}
          {brew.equipmentUsed.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {brew.equipmentUsed.slice(0, 3).map((equipment) => (
                <Badge key={equipment} variant="outline" className="text-xs">
                  {equipment}
                </Badge>
              ))}
              {brew.equipmentUsed.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{brew.equipmentUsed.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Taste notes */}
          {brew.tasteNotes.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Tasting Notes</p>
              <div className="flex flex-wrap gap-1">
                {brew.tasteNotes.map((note) => (
                  <Badge
                    key={note}
                    className="bg-amber-100 text-amber-800 text-xs hover:bg-amber-200"
                  >
                    {note}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground hover:text-red-500"
                onClick={() => {
                  onLike?.(brew.id);
                  trackBrewLike(brew.id);
                }}
              >
                <Heart className="w-4 h-4" />
                <span>{brew.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                <MessageCircle className="w-4 h-4" />
                <span>0</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

