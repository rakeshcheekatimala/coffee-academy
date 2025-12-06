'use client';

import { notFound, use } from 'next/navigation';
import { getLevel, getTotalLevels } from '@/lib/content/levels';
import { LevelContent } from '@/components/level/LevelContent';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GrindSizeVisual } from '@/components/shared/GrindSizeVisual';

interface LevelPageProps {
  params: Promise<{ levelId: string }>;
}

export default function LevelPage({ params }: LevelPageProps) {
  const { levelId } = use(params);
  const levelNumber = parseInt(levelId);
  const level = getLevel(levelNumber);
  const totalLevels = getTotalLevels();

  if (!level) {
    notFound();
  }

  const previousLevel = levelNumber > 1 ? levelNumber - 1 : null;
  const nextLevel = levelNumber < totalLevels ? levelNumber + 1 : null;

  // Check if level 6 (Grind Size Guide) to show special component
  const isGrindSizeLevel = levelNumber === 6;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Badge variant="outline" className="text-lg">
                Level {level.id}
              </Badge>
            </div>
            <ProgressBar current={level.id} total={totalLevels} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{level.title}</h1>
          <p className="text-xl text-muted-foreground">{level.description}</p>
        </div>

        {/* Special component for Level 6 */}
        {isGrindSizeLevel && (
          <div className="mb-8">
            <GrindSizeVisual />
          </div>
        )}

        {/* Level Content */}
        <LevelContent sections={level.content.sections} />

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between gap-4">
          <div className="flex-1">
            {previousLevel ? (
              <Button asChild variant="outline" className="w-full md:w-auto">
                <Link href={`/levels/${previousLevel}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Level
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>

          <Button asChild variant="outline">
            <Link href="/levels/1">All Levels</Link>
          </Button>

          <div className="flex-1 flex justify-end">
            {nextLevel ? (
              <Button asChild className="w-full md:w-auto">
                <Link href={`/levels/${nextLevel}`}>
                  Next Level
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <Button asChild className="w-full md:w-auto">
                <Link href="/recipes">
                  View Recipes
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

