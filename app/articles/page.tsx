'use client';

import { useState, useMemo } from 'react';
import { Hero } from '@/components/shared/Hero';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAllArticles, getArticleCategories } from '@/lib/content/articles';
import { Article } from '@/lib/types';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

const categoryLabels: Record<Article['category'], string> = {
  basics: 'Coffee Basics',
  brewing: 'Brewing',
  roasting: 'Roasting',
  equipment: 'Equipment',
  culture: 'Culture',
  science: 'Science',
};

const categoryDescriptions: Record<Article['category'], string> = {
  basics: 'Foundation knowledge for your coffee journey',
  brewing: 'Master different brewing methods and techniques',
  roasting: 'Understand how roasting shapes flavor',
  equipment: 'Gear guides and recommendations',
  culture: 'Coffee traditions from around the world',
  science: 'The chemistry and physics behind great coffee',
};

export default function ArticlesPage() {
  const allArticles = getAllArticles();
  const categories = getArticleCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Article['category'] | 'all'>('all');

  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allArticles, searchQuery, selectedCategory]);

  // Get featured article (most recent)
  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const hasFilters = searchQuery || selectedCategory !== 'all';

  return (
    <div className="min-h-screen">
      <Hero
        title="Coffee 101"
        description="Educational articles to deepen your coffee knowledge. From basics to advanced techniques."
      />

      <div className="container mx-auto px-4 py-16">
        {/* Search and filters */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles by title, topic, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-6 text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-amber-600 hover:bg-amber-500' : ''}
            >
              All Topics
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-amber-600 hover:bg-amber-500' : ''}
              >
                {categoryLabels[category]}
              </Button>
            ))}
          </div>

          {/* Active filters indicator */}
          {hasFilters && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              </span>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-amber-600">
                Clear filters
              </Button>
            </div>
          )}
        </div>

        {/* Category description */}
        {selectedCategory !== 'all' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-coffee-dark mb-2">
              {categoryLabels[selectedCategory]}
            </h2>
            <p className="text-coffee-medium/70">{categoryDescriptions[selectedCategory]}</p>
          </motion.div>
        )}

        {/* Articles grid */}
        {filteredArticles.length > 0 ? (
          <div className="space-y-12">
            {/* Featured article */}
            {featuredArticle && !searchQuery && selectedCategory === 'all' && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Badge className="bg-amber-100 text-amber-800">Featured</Badge>
                  <span className="text-sm text-muted-foreground">Latest article</span>
                </div>
                <ArticleCard article={featuredArticle} variant="featured" />
              </section>
            )}

            {/* Article grid */}
            <section>
              {!searchQuery && selectedCategory === 'all' && remainingArticles.length > 0 && (
                <h2 className="text-xl font-bold text-coffee-dark mb-6">More Articles</h2>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(searchQuery || selectedCategory !== 'all' ? filteredArticles : remainingArticles).map(
                  (article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                  )
                )}
              </div>
            </section>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-coffee-dark mb-2">No articles found</h3>
            <p className="text-coffee-medium/70 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear all filters
            </Button>
          </motion.div>
        )}

        {/* Browse by category */}
        {!hasFilters && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-coffee-dark text-center mb-8">
              Browse by Topic
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const categoryArticles = allArticles.filter((a) => a.category === category);
                return (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedCategory(category)}
                    className="text-left p-6 rounded-xl border border-amber-200/50 bg-gradient-to-br from-white to-amber-50/30 hover:shadow-lg hover:border-amber-300 transition-all group"
                  >
                    <h3 className="text-lg font-semibold text-coffee-dark mb-2 group-hover:text-amber-700 transition-colors">
                      {categoryLabels[category]}
                    </h3>
                    <p className="text-sm text-coffee-medium/70 mb-3">
                      {categoryDescriptions[category]}
                    </p>
                    <span className="text-xs text-amber-600 font-medium">
                      {categoryArticles.length} article{categoryArticles.length !== 1 ? 's' : ''}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

