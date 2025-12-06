'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import Link from 'next/link';
import { Level } from '@/lib/types';

interface LevelCardProps {
  level: Level;
  completed?: boolean;
  index?: number;
}

export function LevelCard({ level, completed = false, index = 0 }: LevelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className={`h-full flex flex-col hover-glow transition-all ${!level.unlocked ? 'opacity-60' : ''}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-lg font-bold">
                Level {level.id}
              </Badge>
              {completed && (
                <Badge className="bg-coffee-gold text-coffee-dark">
                  <Check className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
              {!level.unlocked && (
                <Badge variant="secondary">
                  <Lock className="h-3 w-3 mr-1" />
                  Locked
                </Badge>
              )}
            </div>
          </div>
          <CardTitle className="mt-2 text-2xl">{level.title}</CardTitle>
          <CardDescription className="text-base">{level.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {level.content.sections.length} sections
            </p>
          </div>
        </CardContent>
        <CardFooter>
          {level.unlocked ? (
            <Button asChild className="w-full" variant="default">
              <Link href={`/levels/${level.id}`}>
                {completed ? 'Review Level' : 'Start Level'}
              </Link>
            </Button>
          ) : (
            <Button disabled className="w-full" variant="secondary">
              Locked
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

