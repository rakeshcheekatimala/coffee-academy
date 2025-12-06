'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Equipment } from '@/lib/types';

interface EquipmentCardProps {
  equipment: Equipment;
  index?: number;
}

const priceColors = {
  budget: 'bg-green-500',
  'mid-range': 'bg-yellow-500',
  premium: 'bg-red-500',
};

const difficultyColors = {
  beginner: 'bg-blue-500',
  intermediate: 'bg-purple-500',
  advanced: 'bg-orange-500',
};

export function EquipmentCard({ equipment, index = 0 }: EquipmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover-glow transition-all">
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge className={priceColors[equipment.priceRange]}>
              {equipment.priceRange}
            </Badge>
            <Badge variant="outline" className={difficultyColors[equipment.difficulty]}>
              {equipment.difficulty}
            </Badge>
          </div>
          <CardTitle className="text-2xl">{equipment.name}</CardTitle>
          <CardDescription className="text-base capitalize">{equipment.category}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <p className="text-sm text-muted-foreground">{equipment.description}</p>
          
          <div>
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              Pros
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
              {equipment.pros.map((pro, i) => (
                <li key={i} className="list-disc">{pro}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2 flex items-center gap-2">
              <X className="h-4 w-4 text-red-600" />
              Cons
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
              {equipment.cons.map((con, i) => (
                <li key={i} className="list-disc">{con}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

