'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RatingStars } from './RatingStars';
import { Review } from '@/lib/types';
import { ThumbsUp, Check, X } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
  index?: number;
  onMarkHelpful?: (reviewId: string) => void;
}

export function ReviewCard({ review, index = 0, onMarkHelpful }: ReviewCardProps) {
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const days = Math.floor((now.getTime() - date.getTime()) / 86400000);

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-semibold">
                {review.userName.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-sm">{review.userName}</p>
                <p className="text-xs text-muted-foreground">{timeAgo(review.createdAt)}</p>
              </div>
            </div>
            <RatingStars rating={review.rating} size="sm" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-coffee-dark mb-2">{review.title}</h4>
            <p className="text-sm text-coffee-medium/80">{review.content}</p>
          </div>

          {/* Pros and Cons */}
          {(review.pros || review.cons) && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              {review.pros && review.pros.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-green-700 mb-2 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Pros
                  </p>
                  <ul className="space-y-1">
                    {review.pros.map((pro, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-green-500 mt-0.5">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {review.cons && review.cons.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-red-700 mb-2 flex items-center gap-1">
                    <X className="w-3 h-3" /> Cons
                  </p>
                  <ul className="space-y-1">
                    {review.cons.map((con, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-red-500 mt-0.5">-</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Helpful */}
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-xs text-muted-foreground">
              {review.helpful} people found this helpful
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-muted-foreground hover:text-amber-600"
              onClick={() => onMarkHelpful?.(review.id)}
            >
              <ThumbsUp className="w-3 h-3" />
              Helpful
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ReviewSummaryProps {
  average: number;
  count: number;
  distribution?: { rating: number; count: number }[];
}

export function ReviewSummary({ average, count, distribution }: ReviewSummaryProps) {
  const defaultDistribution = distribution || [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: 0,
  }));

  const maxCount = Math.max(...defaultDistribution.map((d) => d.count), 1);

  return (
    <Card>
      <CardContent className="py-6">
        <div className="flex items-center gap-8">
          {/* Average score */}
          <div className="text-center">
            <div className="text-4xl font-bold text-coffee-dark">{average.toFixed(1)}</div>
            <RatingStars rating={average} size="md" />
            <p className="text-sm text-muted-foreground mt-1">
              {count} review{count !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Distribution */}
          <div className="flex-1 space-y-2">
            {defaultDistribution.map(({ rating, count: ratingCount }) => (
              <div key={rating} className="flex items-center gap-2 text-sm">
                <span className="w-3 text-muted-foreground">{rating}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${(ratingCount / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-xs text-muted-foreground text-right">
                  {ratingCount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface WriteReviewFormProps {
  onSubmit: (review: {
    rating: number;
    title: string;
    content: string;
    pros?: string[];
    cons?: string[];
  }) => void;
  onCancel: () => void;
}

export function WriteReviewForm({ onSubmit, onCancel }: WriteReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pros, setPros] = useState(['']);
  const [cons, setCons] = useState(['']);

  const handleSubmit = () => {
    if (rating === 0 || !title.trim() || !content.trim()) return;

    onSubmit({
      rating,
      title: title.trim(),
      content: content.trim(),
      pros: pros.filter((p) => p.trim()),
      cons: cons.filter((c) => c.trim()),
    });
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Write a Review</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Your Rating *</label>
          <RatingStars rating={rating} size="lg" interactive onChange={setRating} />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Review Title *</label>
          <input
            type="text"
            placeholder="Summarize your experience"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Your Review *</label>
          <textarea
            placeholder="Share your experience in detail..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[120px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-green-700">Pros (optional)</label>
            {pros.map((pro, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="What did you like?"
                  value={pro}
                  onChange={(e) => {
                    const updated = [...pros];
                    updated[index] = e.target.value;
                    setPros(updated);
                  }}
                  className="flex-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                />
                {index === pros.length - 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setPros([...pros, ''])}
                  >
                    +
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block text-red-700">Cons (optional)</label>
            {cons.map((con, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="What could be better?"
                  value={con}
                  onChange={(e) => {
                    const updated = [...cons];
                    updated[index] = e.target.value;
                    setCons(updated);
                  }}
                  className="flex-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                />
                {index === cons.length - 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setCons([...cons, ''])}
                  >
                    +
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || !title.trim() || !content.trim()}
            className="flex-1 bg-amber-600 hover:bg-amber-500"
          >
            Submit Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


