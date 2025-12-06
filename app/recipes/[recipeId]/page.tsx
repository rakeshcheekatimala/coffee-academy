'use client';

import { notFound, use } from 'next/navigation';
import { getRecipe } from '@/lib/content/recipes';
import { StepIndicator } from '@/components/shared/StepIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Users, Coffee, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface RecipePageProps {
  params: Promise<{ recipeId: string }>;
}

export default function RecipePage({ params }: RecipePageProps) {
  const { recipeId } = use(params);
  const recipe = getRecipe(recipeId);

  if (!recipe) {
    notFound();
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/recipes">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipes
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge className={categoryColors[recipe.category]}>
                {recipe.category}
              </Badge>
              <Badge variant="outline" className={difficultyColors[recipe.difficulty]}>
                {recipe.difficulty}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{recipe.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{recipe.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{recipe.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4 text-muted-foreground" />
                <span className="capitalize">{recipe.grindSize.replace('-', ' ')} grind</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5" />
                    Ingredients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ing, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{ing.name}</span>
                        <span className="font-medium">
                          {ing.amount} {ing.unit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tools Needed</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recipe.tools.map((tool, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-coffee-gold mt-1">•</span>
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <StepIndicator steps={recipe.steps.map(s => ({ step: s.step, instruction: s.instruction }))} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recipe.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-coffee-gold font-bold mt-1">💡</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

