'use client';

import { useState } from 'react';
import { getAllRecommendations, getBeginnerRecommendations, getRecommendationsByRoast } from '@/lib/content/recommendations';
import { Hero } from '@/components/shared/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Coffee, MapPin } from 'lucide-react';

export default function RecommendationsPage() {
  const allRecommendations = getAllRecommendations();
  const beginnerRecs = getBeginnerRecommendations();
  const lightRoasts = getRecommendationsByRoast('light');
  const mediumRoasts = getRecommendationsByRoast('medium');
  const darkRoasts = getRecommendationsByRoast('dark');

  const acidityColors = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
  };

  const bodyColors = {
    light: 'bg-blue-500',
    medium: 'bg-purple-500',
    full: 'bg-red-500',
  };

  return (
    <div className="min-h-screen">
      <Hero
        title="Recommended Coffee for Beginners"
        description="Discover the best coffees to start your coffee journey. These recommendations are perfect for those new to specialty coffee."
      />

      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="beginner" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="light">Light Roast</TabsTrigger>
            <TabsTrigger value="medium">Medium Roast</TabsTrigger>
            <TabsTrigger value="dark">Dark Roast</TabsTrigger>
          </TabsList>

          <TabsContent value="beginner" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beginnerRecs.map((coffee, index) => (
                <motion.div
                  key={coffee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full hover-glow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge className={acidityColors[coffee.acidity]}>
                          {coffee.acidity} acidity
                        </Badge>
                        <Badge variant="outline" className={bodyColors[coffee.body]}>
                          {coffee.body} body
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{coffee.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {coffee.origin}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{coffee.description}</p>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Flavor Profile:</p>
                        <div className="flex flex-wrap gap-2">
                          {coffee.flavorProfile.map((flavor, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {flavor}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Best For:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {coffee.bestFor.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-coffee-gold mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="light" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lightRoasts.map((coffee, index) => (
                <motion.div
                  key={coffee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full hover-glow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge className={acidityColors[coffee.acidity]}>
                          {coffee.acidity} acidity
                        </Badge>
                        <Badge variant="outline" className={bodyColors[coffee.body]}>
                          {coffee.body} body
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{coffee.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {coffee.origin}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{coffee.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {coffee.flavorProfile.map((flavor, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {flavor}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="medium" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediumRoasts.map((coffee, index) => (
                <motion.div
                  key={coffee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full hover-glow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge className={acidityColors[coffee.acidity]}>
                          {coffee.acidity} acidity
                        </Badge>
                        <Badge variant="outline" className={bodyColors[coffee.body]}>
                          {coffee.body} body
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{coffee.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {coffee.origin}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{coffee.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {coffee.flavorProfile.map((flavor, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {flavor}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dark" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {darkRoasts.map((coffee, index) => (
                <motion.div
                  key={coffee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full hover-glow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge className={acidityColors[coffee.acidity]}>
                          {coffee.acidity} acidity
                        </Badge>
                        <Badge variant="outline" className={bodyColors[coffee.body]}>
                          {coffee.body} body
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{coffee.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {coffee.origin}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{coffee.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {coffee.flavorProfile.map((flavor, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {flavor}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

