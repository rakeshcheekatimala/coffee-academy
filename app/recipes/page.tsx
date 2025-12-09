'use client';

import { useState } from 'react';
import { recipes, getRecipesByCategory } from '@/lib/content/recipes';
import { RecipeCard } from '@/components/shared/RecipeCard';
import { Hero } from '@/components/shared/Hero';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { trackSearch, trackTabChange } from '@/lib/utils/analytics';

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(value.toLowerCase()) ||
        recipe.description.toLowerCase().includes(value.toLowerCase())
      );
      trackSearch(value, filtered.length, 'recipes');
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const coldRecipes = getRecipesByCategory('cold');
  const hotRecipes = getRecipesByCategory('hot');
  const beginnerRecipes = recipes.filter(r => r.difficulty === 'easy');

  return (
    <div className="min-h-screen">
      <Hero
        title="Coffee Recipes"
        description="Step-by-step guides to make delicious coffee drinks at home. From simple pour-over to complex espresso drinks."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => trackTabChange(value, 'recipes_page')}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="hot">Hot</TabsTrigger>
              <TabsTrigger value="cold">Cold</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe, index) => (
                  <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hot" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotRecipes
                  .filter(r => 
                    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    r.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((recipe, index) => (
                    <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="cold" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coldRecipes
                  .filter(r => 
                    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    r.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((recipe, index) => (
                    <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="beginner" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beginnerRecipes
                  .filter(r => 
                    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    r.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((recipe, index) => (
                    <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

