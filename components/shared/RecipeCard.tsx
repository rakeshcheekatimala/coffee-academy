'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Clock, Users, Coffee } from 'lucide-react';
import Link from 'next/link';
import { Recipe } from '@/lib/types';
import { trackRecipeClick } from '@/lib/utils/analytics';

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}

const difficultyColors = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-red-500',
};

const categoryColors = {
  cold: 'bg-blue-500',
  hot: 'bg-orange-500',
  beginner: 'bg-purple-500',
};

export function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover-glow transition-all">
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge className={categoryColors[recipe.category]}>
              {recipe.category}
            </Badge>
            <Badge variant="outline" className={difficultyColors[recipe.difficulty]}>
              {recipe.difficulty}
            </Badge>
          </div>
          <CardTitle className="text-2xl">{recipe.title}</CardTitle>
          <CardDescription className="text-base">{recipe.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <Coffee className="h-4 w-4" />
              <span className="capitalize">{recipe.grindSize.replace('-', ' ')}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Ingredients:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {recipe.ingredients.slice(0, 3).map((ing, i) => (
                <li key={i}>
                  {ing.amount} {ing.unit} {ing.name}
                </li>
              ))}
              {recipe.ingredients.length > 3 && (
                <li className="text-xs">+ {recipe.ingredients.length - 3} more</li>
              )}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full" variant="default">
            <Link 
              href={`/recipes/${recipe.id}`}
              onClick={() => trackRecipeClick(recipe.id, recipe.title, 'recipe_card')}
            >
              View Recipe
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

