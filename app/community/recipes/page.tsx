'use client';

import { useState, useMemo } from 'react';
import { Hero } from '@/components/shared/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllUserRecipes } from '@/lib/content/userContent';
import { motion } from 'framer-motion';
import { Plus, Search, Clock, Star, ChefHat } from 'lucide-react';
import Link from 'next/link';

export default function CommunityRecipesPage() {
  const allRecipes = getAllUserRecipes();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'hot' | 'cold'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.userName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || recipe.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === 'all' || recipe.difficulty === difficultyFilter;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [allRecipes, searchQuery, categoryFilter, difficultyFilter]);

  return (
    <div className="min-h-screen">
      <Hero
        title="Community Recipes"
        description="Discover unique recipes created and shared by coffee enthusiasts just like you."
      />

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <p className="text-lg text-coffee-medium/80">
            {allRecipes.length} recipes from our community
          </p>
          <Button asChild className="bg-amber-600 hover:bg-amber-500">
            <Link href="/community/submit?type=recipe">
              <Plus className="w-4 h-4 mr-2" />
              Submit a Recipe
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={(v: 'all' | 'hot' | 'cold') => setCategoryFilter(v)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="hot">Hot</SelectItem>
              <SelectItem value="cold">Cold</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={difficultyFilter}
            onValueChange={(v: 'all' | 'easy' | 'medium' | 'hard') => setDifficultyFilter(v)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="text-sm text-muted-foreground mb-6">
          Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
        </div>

        {/* Recipe grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-semibold">
                          {recipe.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{recipe.userName}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(recipe.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Badge
                          className={
                            recipe.category === 'hot'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }
                        >
                          {recipe.category}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-amber-700 transition-colors">
                      {recipe.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{recipe.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {recipe.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <ChefHat className="w-3 h-3" />
                        {recipe.difficulty}
                      </span>
                    </div>
                    
                    {recipe.tasteNotes && (
                      <p className="text-sm text-muted-foreground italic mb-4">
                        &quot;{recipe.tasteNotes}&quot;
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span className="font-medium">{recipe.rating.toFixed(1)}</span>
                        <span className="text-xs text-muted-foreground">
                          ({recipe.ratingCount} reviews)
                        </span>
                      </div>
                      <Badge variant="outline">{recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-coffee-dark mb-2">No recipes found</h3>
            <p className="text-coffee-medium/70 mb-6">
              {searchQuery || categoryFilter !== 'all' || difficultyFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Be the first to share a recipe!'}
            </p>
            <Button asChild className="bg-amber-600 hover:bg-amber-500">
              <Link href="/community/submit?type=recipe">Submit a Recipe</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

