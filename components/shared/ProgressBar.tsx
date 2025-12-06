'use client';

import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>{label}</span>
          <span className="font-medium">{current} / {total}</span>
        </div>
      )}
      <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-coffee-medium to-coffee-gold rounded-full"
        />
      </div>
    </div>
  );
}

