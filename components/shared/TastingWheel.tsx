'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const flavorCategories = [
  { name: 'Fruity', colors: ['#FF6B6B', '#FF8E8E'], examples: ['Blueberry', 'Strawberry', 'Citrus'] },
  { name: 'Nutty', colors: ['#D4A574', '#E6C19A'], examples: ['Almond', 'Hazelnut', 'Peanut'] },
  { name: 'Chocolatey', colors: ['#8B4513', '#A0522D'], examples: ['Dark Chocolate', 'Cocoa', 'Caramel'] },
  { name: 'Floral', colors: ['#FFB6C1', '#FFC0CB'], examples: ['Jasmine', 'Lavender', 'Tea'] },
  { name: 'Spicy', colors: ['#FF8C42', '#FFA366'], examples: ['Cinnamon', 'Clove', 'Cardamom'] },
  { name: 'Earthy', colors: ['#6B4423', '#8B5A3C'], examples: ['Woody', 'Mushroom', 'Tobacco'] },
];

export function TastingWheel() {
  return (
    <div className="w-full py-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Coffee Flavor Wheel</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flavorCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <Card className="p-6 hover-glow h-full">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4"
                style={{
                  background: `linear-gradient(135deg, ${category.colors[0]}, ${category.colors[1]})`,
                }}
              />
              <h4 className="text-xl font-bold text-center mb-3">{category.name}</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {category.examples.map((example, i) => (
                  <li key={i} className="text-center">• {example}</li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

