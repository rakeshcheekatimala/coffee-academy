'use client';

import { Hero } from '@/components/shared/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { MapPin, Coffee, Menu, CheckCircle } from 'lucide-react';

const cafeIndicators = [
  {
    title: 'Fresh Beans',
    description: 'Look for shops that roast their own beans or source from local roasters. Fresh beans are usually dated.',
  },
  {
    title: 'Skilled Baristas',
    description: 'Good baristas know their craft. They can answer questions about origin, roast, and brewing methods.',
  },
  {
    title: 'Multiple Brewing Methods',
    description: 'Specialty shops often offer pour-over, AeroPress, or other manual brewing methods, not just espresso.',
  },
  {
    title: 'Origin Information',
    description: 'Quality cafés display information about coffee origins, processing methods, and flavor notes.',
  },
];

const menuItems = [
  {
    name: 'Espresso',
    description: 'Concentrated coffee made by forcing hot water through finely-ground coffee under pressure.',
    strength: 'Very Strong',
  },
  {
    name: 'Americano',
    description: 'Espresso diluted with hot water. Similar strength to drip coffee but with espresso flavor.',
    strength: 'Medium',
  },
  {
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk, and milk foam. Rich and creamy.',
    strength: 'Medium',
  },
  {
    name: 'Latte',
    description: 'Espresso with more steamed milk and less foam than cappuccino. Smooth and milky.',
    strength: 'Mild',
  },
  {
    name: 'Flat White',
    description: 'Similar to latte but with microfoam instead of foam. Originated in Australia/New Zealand.',
    strength: 'Medium',
  },
  {
    name: 'Cortado',
    description: 'Equal parts espresso and steamed milk. Stronger than a latte, smoother than an espresso.',
    strength: 'Strong',
  },
  {
    name: 'Macchiato',
    description: 'Espresso "stained" with a small amount of milk foam. Strong coffee flavor.',
    strength: 'Very Strong',
  },
  {
    name: 'Cold Brew',
    description: 'Coffee brewed with cold water over 12-24 hours. Smooth, sweet, less acidic.',
    strength: 'Medium',
  },
];

const processingMethods = [
  {
    name: 'Single Origin',
    description: 'Coffee from a single geographic location, farm, or region. Allows you to taste unique characteristics of that place.',
  },
  {
    name: 'Washed Process',
    description: 'Coffee cherry fruit is removed before drying. Results in clean, bright flavors that highlight the bean\'s characteristics.',
  },
  {
    name: 'Natural Process',
    description: 'Coffee cherries are dried whole with fruit attached. Results in fruity, wine-like flavors. Also called "dry process."',
  },
  {
    name: 'Honey Process',
    description: 'Skin is removed but sticky fruit (mucilage) remains during drying. Results in sweet, fruity, syrupy flavors.',
  },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen">
      <Hero
        title="Where to Explore Coffee"
        description="Learn how to find great cafés, understand menu items, and order coffee with confidence."
      />

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Finding Good Cafés */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <MapPin className="h-8 w-8 text-coffee-gold" />
              How to Find Good Cafés
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Not all coffee shops are created equal. Here's what to look for when seeking out quality coffee.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cafeIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full hover-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-coffee-gold" />
                      {indicator.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{indicator.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Menu Items */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Menu className="h-8 w-8 text-coffee-gold" />
              Common Menu Items Explained
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding what's on the menu helps you order exactly what you want.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full hover-glow">
                  <CardHeader>
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <CardDescription>{item.strength}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Processing Methods */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Coffee className="h-8 w-8 text-coffee-gold" />
              Understanding Coffee Terms
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              When you see these terms on a menu or bag, here's what they mean.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processingMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full hover-glow">
                  <CardHeader>
                    <CardTitle className="text-xl">{method.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{method.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Ordering Tips */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-coffee-medium/10 to-coffee-gold/10 border-coffee-gold/20">
              <CardHeader>
                <CardTitle className="text-2xl">Tips for Ordering with Confidence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-coffee-gold font-bold mt-1">•</span>
                    <span><strong>Ask questions:</strong> Good baristas love talking about coffee. Ask about origin, roast, or flavor notes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-coffee-gold font-bold mt-1">•</span>
                    <span><strong>Try something new:</strong> Don't always order the same thing. Ask for recommendations based on your preferences.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-coffee-gold font-bold mt-1">•</span>
                    <span><strong>Specify your preferences:</strong> Tell the barista if you like strong, mild, fruity, or chocolatey flavors.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-coffee-gold font-bold mt-1">•</span>
                    <span><strong>Learn the menu:</strong> Understanding what each drink is helps you order exactly what you want.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-coffee-gold font-bold mt-1">•</span>
                    <span><strong>Be open to suggestions:</strong> Baristas know their coffee. If they recommend something, give it a try!</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

