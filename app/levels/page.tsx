'use client';

import { levels } from '@/lib/content/levels';
import { LevelCard } from '@/components/shared/LevelCard';
import { Hero } from '@/components/shared/Hero';
import { useEffect, useState } from 'react';

export default function LevelsPage() {
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  useEffect(() => {
    // Load completed levels from localStorage
    const stored = localStorage.getItem('completedLevels');
    if (stored) {
      setCompletedLevels(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Hero
        title="Coffee Learning Levels"
        description="Progress through our comprehensive coffee education system. Complete each level to unlock new knowledge and skills."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level, index) => (
            <LevelCard
              key={level.id}
              level={level}
              completed={completedLevels.includes(level.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

