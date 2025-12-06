'use client';

import { useState } from 'react';
import { Hero } from '@/components/shared/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { motion } from 'framer-motion';
import { getAllEquipment } from '@/lib/content/equipment';
import { EquipmentCard } from '@/components/shared/EquipmentCard';
import { UtensilsCrossed } from 'lucide-react';

interface WizardStep {
  id: string;
  question: string;
  options: Array<{ id: string; label: string; value: string; description?: string }>;
}

const wizardSteps: WizardStep[] = [
  {
    id: '1',
    question: 'What\'s your experience level with coffee brewing?',
    options: [
      { id: 'a', label: 'Complete beginner', value: 'beginner', description: 'Just starting out' },
      { id: 'b', label: 'Some experience', value: 'intermediate', description: 'Made coffee before' },
      { id: 'c', label: 'Experienced', value: 'advanced', description: 'Know the basics well' },
    ],
  },
  {
    id: '2',
    question: 'What\'s your budget range?',
    options: [
      { id: 'a', label: 'Budget ($20-50)', value: 'budget', description: 'Affordable options' },
      { id: 'b', label: 'Mid-range ($50-200)', value: 'mid-range', description: 'Good quality' },
      { id: 'c', label: 'Premium ($200+)', value: 'premium', description: 'Top of the line' },
    ],
  },
  {
    id: '3',
    question: 'What type of coffee do you prefer?',
    options: [
      { id: 'a', label: 'Strong and bold', value: 'strong', description: 'French press, espresso' },
      { id: 'b', label: 'Clean and bright', value: 'clean', description: 'Pour-over, drip' },
      { id: 'c', label: 'Smooth and versatile', value: 'versatile', description: 'AeroPress, cold brew' },
    ],
  },
  {
    id: '4',
    question: 'How much time do you want to spend brewing?',
    options: [
      { id: 'a', label: 'Quick (1-2 minutes)', value: 'quick', description: 'AeroPress, espresso' },
      { id: 'b', label: 'Moderate (3-5 minutes)', value: 'moderate', description: 'Pour-over, French press' },
      { id: 'c', label: 'I don\'t mind waiting', value: 'patient', description: 'Cold brew, slow methods' },
    ],
  },
];

export default function WizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [wizardSteps[currentStep].id]: value };
    setAnswers(newAnswers);

    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const getRecommendations = () => {
    const allEquipment = getAllEquipment();
    const experience = answers['1'] || 'beginner';
    const budget = answers['2'] || 'budget';
    const coffeeType = answers['3'] || 'versatile';
    const time = answers['4'] || 'moderate';

    // Filter equipment based on answers
    let recommendations = allEquipment.filter((eq) => {
      if (experience === 'beginner' && eq.difficulty !== 'beginner') return false;
      if (budget && eq.priceRange !== budget) return false;
      return true;
    });

    // If no matches, show all beginner-friendly equipment
    if (recommendations.length === 0) {
      recommendations = allEquipment.filter((eq) => eq.difficulty === 'beginner');
    }

    return recommendations.slice(0, 6);
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const recommendations = getRecommendations();
    return (
      <div className="min-h-screen">
        <Hero
          title="Your Equipment Recommendations"
          description="Based on your preferences, here are the best equipment options for you."
        />

        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="hover-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <UtensilsCrossed className="h-6 w-6 text-coffee-gold" />
                  Recommended Equipment
                </CardTitle>
                <CardDescription>
                  These equipment options match your preferences and experience level.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((equipment, index) => (
              <EquipmentCard key={equipment.id} equipment={equipment} index={index} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button onClick={resetWizard} variant="outline" size="lg">
              Start Over
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const step = wizardSteps[currentStep];

  return (
    <div className="min-h-screen">
      <Hero
        title="Choose Your First Brewing Gear"
        description="Answer a few questions to get personalized equipment recommendations."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <ProgressBar
            current={currentStep + 1}
            total={wizardSteps.length}
            label="Step"
          />

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mt-8 hover-glow">
              <CardHeader>
                <CardTitle className="text-2xl">{step.question}</CardTitle>
                <CardDescription>
                  Step {currentStep + 1} of {wizardSteps.length}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {step.options.map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => handleAnswer(option.value)}
                    variant="outline"
                    className="w-full justify-start h-auto py-4 text-left hover:bg-coffee-gold/10 hover:border-coffee-gold"
                  >
                    <div>
                      <div className="font-medium">{option.label}</div>
                      {option.description && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

