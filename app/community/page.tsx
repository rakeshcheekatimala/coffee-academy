'use client';

import { Hero } from '@/components/shared/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Camera, BookOpen, Users, TrendingUp, ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { getAllUserBrews, getAllUserRecipes } from '@/lib/content/userContent';
import { BrewCard } from '@/components/community/BrewCard';

export default function CommunityPage() {
  const recentBrews = getAllUserBrews().slice(0, 3);
  const recentRecipes = getAllUserRecipes().slice(0, 2);
  const totalBrews = getAllUserBrews().length;
  const totalRecipes = getAllUserRecipes().length;

  const stats = [
    { label: 'Shared Brews', value: totalBrews, icon: Camera },
    { label: 'Community Recipes', value: totalRecipes, icon: BookOpen },
    { label: 'Active Members', value: '150+', icon: Users },
    { label: 'This Week', value: '+12', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen">
      <Hero
        title="Coffee Community"
        description="Share your brews, discover new recipes, and connect with fellow coffee enthusiasts."
      />

      <div className="container mx-auto px-4 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                  <div className="text-2xl font-bold text-coffee-dark">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-amber-600" />
                </div>
                <CardTitle>Share Your Brew</CardTitle>
                <CardDescription>
                  Post your daily brew, share tasting notes, and show off your setup.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-amber-600 hover:bg-amber-500 w-full">
                  <Link href="/community/submit?type=brew">
                    <Plus className="w-4 h-4 mr-2" />
                    Share a Brew
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Submit a Recipe</CardTitle>
                <CardDescription>
                  Share your signature recipe with step-by-step instructions for others to try.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-blue-600 hover:bg-blue-500 w-full">
                  <Link href="/community/submit?type=recipe">
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Recipe
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Brews */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-coffee-dark">Recent Brews</h2>
              <p className="text-muted-foreground">See what the community is brewing</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/community/brews">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBrews.map((brew, index) => (
              <BrewCard key={brew.id} brew={brew} index={index} />
            ))}
          </div>
        </section>

        {/* Community Recipes */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-coffee-dark">Community Recipes</h2>
              <p className="text-muted-foreground">Tried-and-true recipes from fellow enthusiasts</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/community/recipes">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {recentRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                          {recipe.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{recipe.userName}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(recipe.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
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
                    <CardTitle className="text-lg mt-4">{recipe.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{recipe.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>{recipe.time}</span>
                        <Badge variant="outline">{recipe.difficulty}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500">★</span>
                        <span>{recipe.rating.toFixed(1)}</span>
                        <span className="text-xs">({recipe.ratingCount})</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="text-center bg-gradient-to-br from-coffee-dark to-coffee-medium text-white">
            <CardContent className="py-12">
              <Users className="w-12 h-12 mx-auto mb-4 text-amber-400" />
              <h3 className="text-2xl font-bold mb-2">Join Our Growing Community</h3>
              <p className="text-white/80 mb-6 max-w-md mx-auto">
                Connect with coffee lovers, share your journey, and learn from others.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-amber-500 hover:bg-amber-400 text-coffee-dark">
                  <Link href="/community/brews">Browse All Brews</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link href="/community/recipes">Explore Recipes</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}

