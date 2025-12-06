'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Article } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
}

const categoryColors: Record<Article['category'], string> = {
  basics: 'bg-emerald-100 text-emerald-800',
  brewing: 'bg-blue-100 text-blue-800',
  roasting: 'bg-orange-100 text-orange-800',
  equipment: 'bg-purple-100 text-purple-800',
  culture: 'bg-pink-100 text-pink-800',
  science: 'bg-cyan-100 text-cyan-800',
};

const categoryLabels: Record<Article['category'], string> = {
  basics: 'Coffee Basics',
  brewing: 'Brewing',
  roasting: 'Roasting',
  equipment: 'Equipment',
  culture: 'Culture',
  science: 'Science',
};

export function ArticleCard({ article, index = 0, variant = 'default' }: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Link href={`/articles/${article.slug}`}>
          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/50">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={categoryColors[article.category]}>
                  {categoryLabels[article.category]}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime} min read
                </span>
              </div>
              <CardTitle className="text-2xl md:text-3xl mb-4 group-hover:text-amber-700 transition-colors">
                {article.title}
              </CardTitle>
              <CardDescription className="text-base mb-6 line-clamp-3">
                {article.excerpt}
              </CardDescription>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span>by {article.author}</span>
                </div>
                <span className="text-amber-600 group-hover:text-amber-700 flex items-center gap-1 font-medium">
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <Link href={`/articles/${article.slug}`}>
          <div className="group flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  {categoryLabels[article.category]}
                </Badge>
                <span className="text-xs text-muted-foreground">{article.readTime} min</span>
              </div>
              <h3 className="font-medium text-sm group-hover:text-amber-700 transition-colors line-clamp-2">
                {article.title}
              </h3>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/articles/${article.slug}`}>
        <Card className="h-full group hover:shadow-lg transition-all duration-300 overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={categoryColors[article.category]}>
                {categoryLabels[article.category]}
              </Badge>
            </div>
            <CardTitle className="text-lg group-hover:text-amber-700 transition-colors line-clamp-2">
              {article.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4 line-clamp-3">
              {article.excerpt}
            </CardDescription>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime} min
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-amber-600 transition-all" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

