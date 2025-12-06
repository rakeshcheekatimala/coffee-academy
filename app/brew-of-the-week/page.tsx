'use client';

import { Hero } from '@/components/shared/Hero';
import { FeaturedBrewCard } from '@/components/featured/FeaturedBrewCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCurrentFeaturedBrew, getPreviousFeaturedBrews } from '@/lib/content/featuredBrews';
import { motion } from 'framer-motion';
import { Bell, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function BrewOfTheWeekPage() {
  const currentBrew = getCurrentFeaturedBrew();
  const previousBrews = getPreviousFeaturedBrews(3);

  return (
    <div className="min-h-screen">
      <Hero
        title="Brew of the Week"
        description="Discover our curated weekly selection — a special coffee paired with the perfect brewing method and tasting guidance."
      />

      <div className="container mx-auto px-4 py-16">
        {/* Current featured brew */}
        <FeaturedBrewCard featuredBrew={currentBrew} />

        {/* Newsletter signup */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <CardContent className="py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Never Miss a Brew</h3>
                    <p className="text-white/90">Get weekly recommendations delivered to your inbox</p>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 md:w-64 px-4 py-2 rounded-lg text-coffee-dark placeholder:text-coffee-medium/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <Button className="bg-white text-amber-600 hover:bg-white/90">
                    Subscribe
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Previous brews */}
        {previousBrews.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-coffee-dark">Previous Picks</h2>
                <p className="text-muted-foreground">Explore past featured brews</p>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/recommendations">
                  View All Coffees <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousBrews.map((brew, index) => (
                <motion.div
                  key={brew.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <FeaturedBrewCard featuredBrew={brew} variant="compact" />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* How it works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Card>
            <CardHeader>
              <CardTitle>How Brew of the Week Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4 text-amber-600 font-bold">
                    1
                  </div>
                  <h4 className="font-medium text-coffee-dark mb-2">Weekly Curation</h4>
                  <p className="text-sm text-muted-foreground">
                    Every week, we select a special coffee that deserves the spotlight based on seasonality, origin, and exceptional quality.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4 text-amber-600 font-bold">
                    2
                  </div>
                  <h4 className="font-medium text-coffee-dark mb-2">Perfect Pairing</h4>
                  <p className="text-sm text-muted-foreground">
                    We match each coffee with the ideal brewing method and provide detailed tasting notes so you know what to expect.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4 text-amber-600 font-bold">
                    3
                  </div>
                  <h4 className="font-medium text-coffee-dark mb-2">Complete Experience</h4>
                  <p className="text-sm text-muted-foreground">
                    From food pairings to brewing tips, we give you everything needed to make the most of each featured coffee.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}

