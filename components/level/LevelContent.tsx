'use client';

import { ContentSection, ComparisonData, DiagramData, InteractiveData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Infographic } from '@/components/shared/Infographic';
import { TastingWheel } from '@/components/shared/TastingWheel';
import { GrindSizeVisual } from '@/components/shared/GrindSizeVisual';
import { motion } from 'framer-motion';

interface LevelContentProps {
  sections: ContentSection[];
}

export function LevelContent({ sections }: LevelContentProps) {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {section.type === 'text' && (
            <Card>
              <CardHeader>
                {section.title && <CardTitle className="text-2xl">{section.title}</CardTitle>}
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed whitespace-pre-line">
                  {typeof section.content === 'string' ? section.content : ''}
                </p>
              </CardContent>
            </Card>
          )}

          {section.type === 'comparison' && (
            <div>
              {section.title && (
                <h3 className="text-2xl font-bold mb-6">{section.title}</h3>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(section.content as ComparisonData).items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="hover-glow">
                    <CardHeader>
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {item.characteristics.map((char, charIndex) => (
                          <li key={charIndex} className="flex items-start gap-2">
                            <span className="text-coffee-gold mt-1">•</span>
                            <span className="text-sm">{char}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {section.type === 'diagram' && (
            <Infographic
              data={section.content as DiagramData}
              title={section.title}
            />
          )}

          {section.type === 'interactive' && (
            <div>
              {section.title && (
                <h3 className="text-2xl font-bold mb-6">{section.title}</h3>
              )}
              {(section.content as InteractiveData).type === 'wheel' && <TastingWheel />}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

