'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const grindSizes = [
  { name: 'Extra Fine', size: 2, color: '#1a1a1a', use: 'Turkish' },
  { name: 'Fine', size: 4, color: '#4a4a4a', use: 'Espresso' },
  { name: 'Medium-Fine', size: 6, color: '#6a6a6a', use: 'AeroPress' },
  { name: 'Medium', size: 8, color: '#8a8a8a', use: 'Drip' },
  { name: 'Medium-Coarse', size: 12, color: '#aaaaaa', use: 'Pour-over' },
  { name: 'Coarse', size: 16, color: '#cccccc', use: 'French Press' },
  { name: 'Extra Coarse', size: 20, color: '#e0e0e0', use: 'Cold Brew' },
];

export function GrindSizeVisual() {
  return (
    <div className="w-full py-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Grind Size Comparison</h3>
      <div className="space-y-4">
        {grindSizes.map((grind, index) => (
          <motion.div
            key={grind.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="p-4 hover-glow">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="w-full flex-shrink-0 sm:w-32">
                  <div
                    className="h-12 rounded"
                    style={{
                      backgroundColor: grind.color,
                      width: `${grind.size * 4}px`,
                    }}
                  />
                </div>
                <div className="flex-grow">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold text-lg">{grind.name}</h4>
                    <Badge variant="outline">{grind.use}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Particle size: {grind.size}px • Best for: {grind.use}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
