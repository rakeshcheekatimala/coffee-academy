'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: Array<{ step: number; instruction: string }>;
  currentStep?: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isCompleted = currentStep !== undefined && index < currentStep;
        const isCurrent = currentStep !== undefined && index === currentStep;
        
        return (
          <div key={step.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors',
                  isCompleted
                    ? 'bg-coffee-gold border-coffee-gold text-coffee-dark'
                    : isCurrent
                    ? 'bg-coffee-medium border-coffee-medium text-white'
                    : 'bg-muted border-muted-foreground text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.step
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-0.5 h-full min-h-[60px] mt-2',
                    isCompleted ? 'bg-coffee-gold' : 'bg-muted'
                  )}
                />
              )}
            </div>
            <div className="flex-1 pb-8">
              <p
                className={cn(
                  'text-base',
                  isCompleted || isCurrent
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                )}
              >
                {step.instruction}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

