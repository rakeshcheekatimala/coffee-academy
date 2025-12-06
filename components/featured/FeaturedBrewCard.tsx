'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Coffee, 
  Utensils, 
  Lightbulb, 
  BookOpen, 
  ChevronRight,
  Star,
  Clock,
  Thermometer,
  Scale
} from 'lucide-react';
import Link from 'next/link';
import { FeaturedBrew } from '@/lib/types';

interface FeaturedBrewCardProps {
  featuredBrew: FeaturedBrew;
  variant?: 'full' | 'compact';
}

export function FeaturedBrewCard({ featuredBrew, variant = 'full' }: FeaturedBrewCardProps) {
  const { coffee, recipe, tastingNotes, pairings, brewingTips, story } = featuredBrew;

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
          <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500" />
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-amber-100 text-amber-800">
                Week of {new Date(featuredBrew.weekOf).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </Badge>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-sm font-medium">Featured</span>
              </div>
            </div>
            <CardTitle className="text-lg group-hover:text-amber-700 transition-colors">
              {coffee.name}
            </CardTitle>
            <CardDescription>{coffee.origin} • {coffee.roast} roast</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1 mb-4">
              {coffee.flavorProfile.slice(0, 3).map((flavor) => (
                <Badge key={flavor} variant="outline" className="text-xs">
                  {flavor}
                </Badge>
              ))}
            </div>
            <Button variant="ghost" size="sm" asChild className="w-full group-hover:bg-amber-50">
              <Link href="/brew-of-the-week">
                View Details <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 text-white p-8 md:p-12"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30">
              <Star className="w-3 h-3 mr-1 fill-amber-300" />
              Brew of the Week
            </Badge>
            <span className="text-amber-200/70 text-sm">
              Week of {new Date(featuredBrew.weekOf).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            {coffee.name}
          </h1>

          <p className="text-xl text-amber-100/90 mb-6 max-w-2xl">
            {coffee.description}
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
              <Coffee className="w-4 h-4" />
              <span>{coffee.origin}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
              <Thermometer className="w-4 h-4" />
              <span className="capitalize">{coffee.roast} Roast</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
              <Scale className="w-4 h-4" />
              <span className="capitalize">{coffee.body} Body</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Flavor Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-amber-600" />
                  Flavor Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {coffee.flavorProfile.map((flavor) => (
                    <Badge key={flavor} className="bg-amber-100 text-amber-800 px-3 py-1 text-sm">
                      {flavor}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Acidity:</span>
                    <span className="ml-2 font-medium capitalize">{coffee.acidity}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Body:</span>
                    <span className="ml-2 font-medium capitalize">{coffee.body}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tasting Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-600" />
                  Tasting Notes
                </CardTitle>
                <CardDescription>What to expect in your cup</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tastingNotes.map((note, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-coffee-medium/80">{note}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recipe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  Recommended Recipe: {recipe.title}
                </CardTitle>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 p-4 bg-amber-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-800">{recipe.coffeeAmount}</p>
                    <p className="text-sm text-muted-foreground">Coffee</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-800">{recipe.waterAmount}</p>
                    <p className="text-sm text-muted-foreground">Water</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-800">{recipe.brewTime}</p>
                    <p className="text-sm text-muted-foreground">Time</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Steps</h4>
                  <ol className="space-y-2">
                    {recipe.steps.map((step) => (
                      <li key={step.step} className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5">{step.step}</Badge>
                        <span className="text-sm text-coffee-medium/80">{step.instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <Button asChild className="w-full bg-amber-600 hover:bg-amber-500">
                  <Link href={`/recipes/${recipe.id}`}>
                    View Full Recipe <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/50">
              <CardHeader>
                <CardTitle>The Story Behind This Coffee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-coffee-medium/80 leading-relaxed">{story}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Brewing Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  Brewing Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {brewingTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-amber-500 mt-1">•</span>
                      <span className="text-coffee-medium/80">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pairings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Utensils className="w-5 h-5 text-amber-600" />
                  Food Pairings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pairings.map((pairing, index) => (
                  <div key={index} className="pb-4 last:pb-0 border-b last:border-0">
                    <h4 className="font-medium text-coffee-dark">{pairing.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{pairing.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Best For */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Best For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {coffee.bestFor.map((use) => (
                    <Badge key={use} variant="secondary" className="bg-amber-100/50">
                      {use}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-coffee-dark text-white">
              <CardContent className="py-6 text-center">
                <h4 className="font-bold mb-2">Ready to Try It?</h4>
                <p className="text-white/80 text-sm mb-4">
                  Find this coffee at your local specialty roaster
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/recommendations">Browse All Coffees</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

