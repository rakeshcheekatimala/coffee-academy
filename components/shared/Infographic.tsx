'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DiagramData } from '@/lib/types';

interface InfographicProps {
  data: DiagramData;
  title?: string;
}

export function Infographic({ data, title }: InfographicProps) {
  if (data.type === 'flow') {
    return (
      <div className="w-full py-8">
        {title && <h3 className="text-2xl font-bold mb-6 text-center">{title}</h3>}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 flex-wrap">
          {data.steps.map((step, index) => (
            <div key={index} className="flex items-center gap-2 md:gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card border-2 border-coffee-medium rounded-lg p-4 md:p-6 min-w-[200px] max-w-[250px] text-center hover-glow"
              >
                <div className="text-2xl font-bold text-coffee-gold mb-2">
                  {index + 1}
                </div>
                <h4 className="font-semibold mb-2">{step.label}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
              {index < data.steps.length - 1 && (
                <ArrowRight className="hidden md:block h-6 w-6 text-coffee-medium flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      {title && <h3 className="text-2xl font-bold mb-6">{title}</h3>}
      <div className="space-y-4">
        {data.steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-card border rounded-lg p-4 hover-glow"
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl font-bold text-coffee-gold flex-shrink-0">
                {index + 1}
              </div>
              <div>
                <h4 className="font-semibold mb-1">{step.label}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

