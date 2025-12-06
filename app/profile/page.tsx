'use client';

import { useState, useEffect } from 'react';
import { Hero } from '@/components/shared/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { 
  User, 
  Heart, 
  Clock, 
  Settings, 
  Coffee, 
  BookOpen, 
  FileText,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Edit
} from 'lucide-react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/content/userContent';
import { 
  getPreferences, 
  getFavorites, 
  getHistory, 
  getUserStats,
  clearPreferences,
  UserPreferences 
} from '@/lib/utils/preferences';
import { getRecipe } from '@/lib/content/recipes';
import { getRecommendation } from '@/lib/content/recommendations';
import { getArticle } from '@/lib/content/articles';
import { RecipeCard } from '@/components/shared/RecipeCard';

export default function ProfilePage() {
  const [user, setUser] = useState(getCurrentUser());
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [favorites, setFavorites] = useState(getFavorites());
  const [history, setHistory] = useState(getHistory());
  const [stats, setStats] = useState(getUserStats());

  useEffect(() => {
    setUser(getCurrentUser());
    setPreferences(getPreferences());
    setFavorites(getFavorites());
    setHistory(getHistory());
    setStats(getUserStats());
  }, []);

  const handleResetPreferences = () => {
    if (confirm('Are you sure you want to reset your coffee preferences?')) {
      clearPreferences();
      setPreferences(null);
    }
  };

  const favoriteRecipes = favorites.recipes
    .map((id) => getRecipe(id))
    .filter(Boolean);
  
  const favoriteCoffees = favorites.coffees
    .map((id) => getRecommendation(id))
    .filter(Boolean);

  return (
    <div className="min-h-screen">
      <Hero
        title="Your Profile"
        description="Manage your preferences, favorites, and coffee journey progress."
      />

      <div className="container mx-auto px-4 py-16">
        {/* User info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user ? user.displayName.charAt(0) : 'G'}
                </div>
                <div className="flex-1">
                  {user ? (
                    <>
                      <h2 className="text-2xl font-bold text-coffee-dark">{user.displayName}</h2>
                      <p className="text-muted-foreground">@{user.username}</p>
                      {user.bio && <p className="text-sm mt-2">{user.bio}</p>}
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-coffee-dark">Guest</h2>
                      <p className="text-muted-foreground">Create a profile to save your data</p>
                    </>
                  )}
                </div>
                <Button variant="outline" asChild>
                  <Link href="/community/submit">
                    <Edit className="w-4 h-4 mr-2" />
                    {user ? 'Edit Profile' : 'Create Profile'}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card>
            <CardContent className="py-4 text-center">
              <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-coffee-dark">{stats.totalFavorites}</div>
              <div className="text-sm text-muted-foreground">Favorites</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <Coffee className="w-6 h-6 mx-auto mb-2 text-amber-600" />
              <div className="text-2xl font-bold text-coffee-dark">{stats.recipesViewed}</div>
              <div className="text-sm text-muted-foreground">Recipes Viewed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-coffee-dark">{stats.articlesViewed}</div>
              <div className="text-sm text-muted-foreground">Articles Read</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-coffee-dark">
                {history.recipes.length + history.coffees.length}
              </div>
              <div className="text-sm text-muted-foreground">Items Explored</div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="preferences" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preferences" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="w-4 h-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="w-4 h-4" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {preferences ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Your Coffee Profile</CardTitle>
                        <CardDescription>
                          Last updated: {new Date(preferences.savedAt || '').toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/wizard">
                            <Edit className="w-4 h-4 mr-1" />
                            Update
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={handleResetPreferences}
                          className="text-red-500 hover:text-red-600"
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Experience Level
                        </h4>
                        <Badge className="bg-amber-100 text-amber-800 capitalize">
                          {preferences.experience}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Intensity Preference
                        </h4>
                        <Badge className="bg-amber-100 text-amber-800 capitalize">
                          {preferences.intensity}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Roast Level
                        </h4>
                        <Badge className="bg-amber-100 text-amber-800 capitalize">
                          {preferences.roastLevel}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Brewing Time
                        </h4>
                        <Badge className="bg-amber-100 text-amber-800 capitalize">
                          {preferences.brewingTime}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Caffeine Level
                        </h4>
                        <Badge className="bg-amber-100 text-amber-800 capitalize">
                          {preferences.caffeineLevel}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Budget
                        </h4>
                        <Badge className="bg-amber-100 text-amber-800 capitalize">
                          {preferences.budget}
                        </Badge>
                      </div>
                    </div>

                    {preferences.flavorNotes.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            Flavor Preferences
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {preferences.flavorNotes.map((note) => (
                              <Badge key={note} variant="outline" className="capitalize">
                                {note}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {preferences.beanOrigin.length > 0 && !preferences.beanOrigin.includes('any') && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            Preferred Origins
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {preferences.beanOrigin.map((origin) => (
                              <Badge key={origin} variant="outline">
                                {origin}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Sparkles className="w-12 h-12 mx-auto text-amber-400 mb-4" />
                    <h3 className="text-xl font-semibold text-coffee-dark mb-2">
                      No preferences set yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Take our coffee quiz to get personalized recommendations
                    </p>
                    <Button asChild className="bg-amber-600 hover:bg-amber-500">
                      <Link href="/wizard">
                        Take the Coffee Quiz <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Favorite Recipes */}
              <div>
                <h3 className="text-lg font-semibold text-coffee-dark mb-4 flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-amber-600" />
                  Favorite Recipes
                </h3>
                {favoriteRecipes.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favoriteRecipes.map((recipe, index) => (
                      recipe && <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                    ))}
                  </div>
                ) : (
                  <Card className="text-center py-8">
                    <CardContent>
                      <p className="text-muted-foreground">No favorite recipes yet</p>
                      <Button variant="link" asChild>
                        <Link href="/recipes">Browse recipes</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Favorite Coffees */}
              <div>
                <h3 className="text-lg font-semibold text-coffee-dark mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Favorite Coffees
                </h3>
                {favoriteCoffees.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favoriteCoffees.map((coffee) => (
                      coffee && (
                        <Card key={coffee.id} className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <CardTitle className="text-lg">{coffee.name}</CardTitle>
                            <CardDescription>{coffee.origin}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-1">
                              {coffee.flavorProfile.slice(0, 3).map((flavor) => (
                                <Badge key={flavor} variant="outline" className="text-xs">
                                  {flavor}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    ))}
                  </div>
                ) : (
                  <Card className="text-center py-8">
                    <CardContent>
                      <p className="text-muted-foreground">No favorite coffees yet</p>
                      <Button variant="link" asChild>
                        <Link href="/recommendations">Browse coffees</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recently Viewed</CardTitle>
                  <CardDescription>Your browsing history across the site</CardDescription>
                </CardHeader>
                <CardContent>
                  {history.recipes.length > 0 || history.coffees.length > 0 || history.articles.length > 0 ? (
                    <div className="space-y-4">
                      {history.recipes.slice(0, 5).map((item) => {
                        const recipe = getRecipe(item.id);
                        if (!recipe) return null;
                        return (
                          <Link
                            key={item.id}
                            href={`/recipes/${item.id}`}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                          >
                            <Coffee className="w-5 h-5 text-amber-600" />
                            <div className="flex-1">
                              <p className="font-medium">{recipe.title}</p>
                              <p className="text-sm text-muted-foreground">Recipe</p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.viewedAt).toLocaleDateString()}
                            </span>
                          </Link>
                        );
                      })}
                      {history.articles.slice(0, 5).map((item) => {
                        const article = getArticle(item.id);
                        if (!article) return null;
                        return (
                          <Link
                            key={item.id}
                            href={`/articles/${article.slug}`}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                          >
                            <FileText className="w-5 h-5 text-blue-600" />
                            <div className="flex-1">
                              <p className="font-medium">{article.title}</p>
                              <p className="text-sm text-muted-foreground">Article</p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.viewedAt).toLocaleDateString()}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground">No history yet</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Start exploring recipes and articles!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

