'use client';

import { notFound } from 'next/navigation';
import { use, useEffect } from 'react';
import { getRecipe } from '@/lib/content/recipes';
import { StepIndicator } from '@/components/shared/StepIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Users, Coffee, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { trackRecipeView } from '@/lib/utils/analytics';

interface RecipePageProps {
  params: Promise<{ recipeId: string }>;
}

export default function RecipePage({ params }: RecipePageProps) {
  const { recipeId } = use(params);
  const recipe = getRecipe(recipeId);

  useEffect(() => {
    if (recipe) {
      trackRecipeView(recipe.id, recipe.title, recipe.category);
    }
  }, [recipe]);

  if (!recipe) {
    notFound();
  }

  const difficultyColors = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500',
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/recipes">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipes
          </Link>
        </Button>

        {/* Recipe Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{recipe.description}</p>

          {/* Recipe Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-semibold">{recipe.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Servings</p>
                    <p className="font-semibold">{recipe.servings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Coffee className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="font-semibold capitalize">{recipe.difficulty}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <UtensilsCrossed className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Grind Size</p>
                    <p className="font-semibold capitalize">{recipe.grindSize}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-amber-700">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{ingredient.name}</p>
                        <p className="text-sm text-muted-foreground">{ingredient.amount} {ingredient.unit}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tools Section */}
            <Card>
              <CardHeader>
                <CardTitle>Tools You'll Need</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {recipe.tools.map((tool, index) => (
                    <Badge key={index} variant="outline" className="justify-start p-2 h-auto">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Reference */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Quick Reference</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Coffee Amount</p>
                  <p className="font-bold text-lg">{recipe.coffeeAmount}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Water Amount</p>
                  <p className="font-bold text-lg">{recipe.waterAmount}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Temperature</p>
                  <p className="font-bold text-lg">{recipe.waterTemp}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Brew Time</p>
                  <p className="font-bold text-lg">{recipe.brewTime}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Steps Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Step-by-Step Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <StepIndicator steps={recipe.steps} />
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card>
          <CardHeader>
            <CardTitle>Pro Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recipe.tips.map((tip, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-amber-600 font-bold flex-shrink-0">💡</span>
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
