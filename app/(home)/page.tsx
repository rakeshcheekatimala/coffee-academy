'use client';

import { Hero } from '@/components/shared/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Coffee, UtensilsCrossed, FlaskConical, BookOpen, MapPin, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const spotlightCards = [
  {
    title: 'Equipment',
    description: 'Discover the essential tools you need to brew great coffee at home.',
    icon: UtensilsCrossed,
    href: '/levels/2',
    color: 'from-coffee-medium to-coffee-dark',
  },
  {
    title: 'Brewing',
    description: 'Master different brewing methods and find your perfect cup.',
    icon: FlaskConical,
    href: '/levels/4',
    color: 'from-coffee-light to-coffee-medium',
  },
  {
    title: 'Coffee Flavors',
    description: 'Learn to taste and appreciate coffee like a professional.',
    icon: Coffee,
    href: '/levels/5',
    color: 'from-coffee-gold to-coffee-light',
  },
  {
    title: 'Recipes',
    description: 'Step-by-step guides to make delicious coffee drinks at home.',
    icon: BookOpen,
    href: '/recipes',
    color: 'from-coffee-dark to-coffee-medium',
  },
  {
    title: 'Where to Find Good Coffee',
    description: 'Learn how to find and order great coffee at cafés.',
    icon: MapPin,
    href: '/explore',
    color: 'from-coffee-medium to-coffee-gold',
  },
  {
    title: 'Recommended Coffee',
    description: 'Discover the best coffees for beginners to start their journey.',
    icon: Award,
    href: '/recommendations',
    color: 'from-coffee-light to-coffee-gold',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero
        title="Your Coffee Journey Starts Here"
        description="Learn everything about coffee through our gamified learning system. From zero knowledge to brewing your own perfect cup at home."
        ctaText="Start Your Coffee Level Journey"
        ctaLink="/levels/1"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Learn Coffee Through Levels
            </h2>
            <p className="text-lg text-muted-foreground">
              Our gamified system guides you from coffee basics to advanced brewing techniques. 
              Complete levels, track your progress, and unlock new knowledge as you go. 
              It's like a video game, but for coffee!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {spotlightCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full hover-glow transition-all">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{card.title}</CardTitle>
                      <CardDescription className="text-base">
                        {card.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={card.href}>Explore</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Coffee Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of coffee enthusiasts learning to brew better coffee. 
              Start with Level 1 and work your way through our comprehensive guide.
            </p>
            <Button asChild size="lg" className="bg-coffee-gold hover:bg-coffee-gold/90 text-coffee-dark text-lg px-8 py-6">
              <Link href="/levels/1">Begin Level 1: Coffee Basics</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

