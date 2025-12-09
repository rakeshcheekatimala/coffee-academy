'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Hero } from '@/components/shared/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { WizardResults } from '@/components/wizard/WizardResults';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllEquipment } from '@/lib/content/equipment';
import { getAllRecommendations } from '@/lib/content/recommendations';
import { getAllRecipes } from '@/lib/content/recipes';
import { WizardPreferences, CoffeeRecommendation, Recipe, Equipment } from '@/lib/types';
import { ArrowLeft, Check } from 'lucide-react';
import { trackWizardStart, trackWizardStep, trackWizardComplete } from '@/lib/utils/analytics';

interface WizardStep {
  id: keyof WizardPreferences | 'welcome';
  question: string;
  description?: string;
  type: 'single' | 'multiple';
  options: Array<{ 
    id: string; 
    label: string; 
    value: string; 
    description?: string;
    icon?: string;
  }>;
}

const wizardSteps: WizardStep[] = [
  {
    id: 'experience',
    question: "What's your experience level with coffee?",
    description: "This helps us tailor recommendations to your skill level",
    type: 'single',
    options: [
      { id: 'beginner', label: 'Complete Beginner', value: 'beginner', description: "I'm just starting my coffee journey" },
      { id: 'intermediate', label: 'Some Experience', value: 'intermediate', description: "I've made coffee before and want to learn more" },
      { id: 'advanced', label: 'Coffee Enthusiast', value: 'advanced', description: 'I know the basics and want to perfect my craft' },
    ],
  },
  {
    id: 'intensity',
    question: 'How strong do you like your coffee?',
    description: 'This affects the brewing methods and coffee types we recommend',
    type: 'single',
    options: [
      { id: 'mild', label: 'Mild & Smooth', value: 'mild', description: 'Light, easy-drinking coffee' },
      { id: 'medium', label: 'Balanced', value: 'medium', description: 'A good middle ground' },
      { id: 'strong', label: 'Bold & Intense', value: 'strong', description: 'Full-bodied, powerful flavor' },
    ],
  },
  {
    id: 'flavorNotes',
    question: 'Which flavor profiles appeal to you?',
    description: 'Select all that sound delicious (pick at least one)',
    type: 'multiple',
    options: [
      { id: 'fruity', label: 'Fruity & Bright', value: 'fruity', description: 'Berry, citrus, tropical notes' },
      { id: 'chocolatey', label: 'Chocolatey', value: 'chocolatey', description: 'Dark chocolate, cocoa notes' },
      { id: 'nutty', label: 'Nutty & Caramel', value: 'nutty', description: 'Almond, hazelnut, caramel' },
      { id: 'floral', label: 'Floral & Tea-like', value: 'floral', description: 'Jasmine, bergamot, delicate' },
      { id: 'earthy', label: 'Earthy & Spicy', value: 'earthy', description: 'Cedar, tobacco, spice notes' },
      { id: 'sweet', label: 'Sweet & Smooth', value: 'sweet', description: 'Honey, vanilla, smooth finish' },
    ],
  },
  {
    id: 'roastLevel',
    question: 'Do you have a roast preference?',
    description: 'Roast level significantly affects flavor',
    type: 'single',
    options: [
      { id: 'light', label: 'Light Roast', value: 'light', description: 'Bright, acidic, origin flavors shine' },
      { id: 'medium', label: 'Medium Roast', value: 'medium', description: 'Balanced, versatile, most popular' },
      { id: 'dark', label: 'Dark Roast', value: 'dark', description: 'Bold, smoky, less acidic' },
      { id: 'any', label: 'No Preference', value: 'any', description: "I'm open to trying anything" },
    ],
  },
  {
    id: 'brewingTime',
    question: 'How much time do you want to spend brewing?',
    description: 'Different methods have different time requirements',
    type: 'single',
    options: [
      { id: 'quick', label: 'Quick (1-2 minutes)', value: 'quick', description: 'AeroPress, espresso, instant' },
      { id: 'moderate', label: 'Moderate (3-5 minutes)', value: 'moderate', description: 'Pour-over, French press' },
      { id: 'patient', label: "I Don't Mind Waiting", value: 'patient', description: 'Cold brew, slow methods' },
    ],
  },
  {
    id: 'caffeineLevel',
    question: 'What about caffeine?',
    description: 'This helps us recommend appropriate brewing methods',
    type: 'single',
    options: [
      { id: 'low', label: 'Low Caffeine', value: 'low', description: 'Decaf or lower caffeine options' },
      { id: 'regular', label: 'Regular', value: 'regular', description: 'Standard caffeine levels' },
      { id: 'high', label: 'Extra Caffeine', value: 'high', description: 'Maximum energy boost' },
    ],
  },
  {
    id: 'beanOrigin',
    question: 'Any preferred coffee origins?',
    description: 'Different regions produce distinct flavor profiles',
    type: 'multiple',
    options: [
      { id: 'brazil', label: 'Brazil', value: 'Brazil', description: 'Nutty, chocolatey, low acidity' },
      { id: 'colombia', label: 'Colombia', value: 'Colombia', description: 'Balanced, caramel, mild fruit' },
      { id: 'ethiopia', label: 'Ethiopia', value: 'Ethiopia', description: 'Fruity, floral, wine-like' },
      { id: 'guatemala', label: 'Guatemala', value: 'Guatemala', description: 'Chocolatey, nutty, citrus' },
      { id: 'kenya', label: 'Kenya', value: 'Kenya', description: 'Bright, fruity, complex' },
      { id: 'indonesia', label: 'Indonesia', value: 'Sumatra, Indonesia', description: 'Earthy, bold, full body' },
      { id: 'any', label: 'No Preference', value: 'any', description: "I'm open to any origin" },
    ],
  },
  {
    id: 'budget',
    question: "What's your budget for coffee equipment?",
    description: 'Great coffee is possible at any budget',
    type: 'single',
    options: [
      { id: 'budget', label: 'Budget ($20-50)', value: 'budget', description: 'Affordable essentials' },
      { id: 'mid-range', label: 'Mid-range ($50-200)', value: 'mid-range', description: 'Quality equipment' },
      { id: 'premium', label: 'Premium ($200+)', value: 'premium', description: 'Top-tier gear' },
    ],
  },
];

const defaultPreferences: WizardPreferences = {
  experience: 'beginner',
  intensity: 'medium',
  flavorNotes: [],
  brewingTime: 'moderate',
  caffeineLevel: 'regular',
  beanOrigin: [],
  roastLevel: 'any',
  budget: 'budget',
};

export default function WizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<WizardPreferences>(defaultPreferences);
  const [multiSelectValues, setMultiSelectValues] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Track wizard start
  useEffect(() => {
    if (currentStep === 0 && !showResults) {
      trackWizardStart();
    }
  }, []);

  const currentStepData = wizardSteps[currentStep];

  const handleSingleSelect = useCallback((value: string) => {
    const stepId = currentStepData.id as keyof WizardPreferences;
    trackWizardStep(currentStep + 1, stepId, value);
    setPreferences(prev => ({ ...prev, [stepId]: value }));
    
    // Auto-advance for single select
    if (currentStep < wizardSteps.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      trackWizardComplete({ ...preferences, [stepId]: value });
      setTimeout(() => setShowResults(true), 300);
    }
  }, [currentStep, currentStepData.id, preferences]);

  const handleMultiSelect = useCallback((value: string) => {
    setMultiSelectValues(prev => {
      if (value === 'any') {
        return prev.includes('any') ? [] : ['any'];
      }
      const filtered = prev.filter(v => v !== 'any');
      return filtered.includes(value)
        ? filtered.filter(v => v !== value)
        : [...filtered, value];
    });
  }, []);

  const handleMultiSelectConfirm = useCallback(() => {
    const stepId = currentStepData.id as keyof WizardPreferences;
    const values = multiSelectValues.length > 0 ? multiSelectValues : ['any'];
    trackWizardStep(currentStep + 1, stepId, values);
    setPreferences(prev => ({ ...prev, [stepId]: values }));
    setMultiSelectValues([]);
    
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      trackWizardComplete({ ...preferences, [stepId]: values });
      setShowResults(true);
    }
  }, [currentStep, currentStepData.id, multiSelectValues, preferences]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setMultiSelectValues([]);
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const resetWizard = useCallback(() => {
    setCurrentStep(0);
    setPreferences(defaultPreferences);
    setMultiSelectValues([]);
    setShowResults(false);
  }, []);

  // Generate recommendations based on preferences
  const recommendations = useMemo(() => {
    const allCoffees = getAllRecommendations();
    const allRecipes = getAllRecipes();
    const allEquipment = getAllEquipment();

    // Filter coffees
    let filteredCoffees = allCoffees.filter(coffee => {
      // Roast level filter
      if (preferences.roastLevel !== 'any' && coffee.roast !== preferences.roastLevel) {
        return false;
      }
      
      // Origin filter
      if (preferences.beanOrigin.length > 0 && !preferences.beanOrigin.includes('any')) {
        if (!preferences.beanOrigin.some(origin => coffee.origin.includes(origin))) {
          return false;
        }
      }
      
      // Intensity filter (based on body and acidity)
      if (preferences.intensity === 'mild' && coffee.body === 'full') return false;
      if (preferences.intensity === 'strong' && coffee.body === 'light') return false;
      
      // Flavor notes matching
      if (preferences.flavorNotes.length > 0 && !preferences.flavorNotes.includes('any')) {
        const coffeeFlavorLower = coffee.flavorProfile.map(f => f.toLowerCase());
        const hasMatchingFlavor = preferences.flavorNotes.some(note => {
          if (note === 'fruity') return coffeeFlavorLower.some(f => f.includes('fruit') || f.includes('berry') || f.includes('citrus'));
          if (note === 'chocolatey') return coffeeFlavorLower.some(f => f.includes('chocolate') || f.includes('cocoa'));
          if (note === 'nutty') return coffeeFlavorLower.some(f => f.includes('nut') || f.includes('caramel'));
          if (note === 'floral') return coffeeFlavorLower.some(f => f.includes('floral') || f.includes('tea'));
          if (note === 'earthy') return coffeeFlavorLower.some(f => f.includes('earth') || f.includes('spic'));
          if (note === 'sweet') return coffeeFlavorLower.some(f => f.includes('sweet') || f.includes('smooth'));
          return false;
        });
        if (!hasMatchingFlavor) return false;
      }
      
      return true;
    });

    // If no matches, return top recommendations based on experience
    if (filteredCoffees.length === 0) {
      filteredCoffees = allCoffees.filter(c => 
        preferences.experience === 'beginner' 
          ? c.roast === 'medium' && c.acidity !== 'high'
          : true
      );
    }

    // Filter recipes
    let filteredRecipes = allRecipes.filter(recipe => {
      // Time preference
      if (preferences.brewingTime === 'quick' && recipe.time.includes('hour')) return false;
      if (preferences.brewingTime === 'quick' && parseInt(recipe.time) > 3) return false;
      if (preferences.brewingTime === 'patient' && parseInt(recipe.time) < 5 && !recipe.time.includes('hour')) return false;
      
      // Difficulty based on experience
      if (preferences.experience === 'beginner' && recipe.difficulty === 'hard') return false;
      
      // Intensity preference
      if (preferences.intensity === 'strong' && recipe.id.includes('drip')) return false;
      if (preferences.intensity === 'mild' && recipe.id.includes('espresso')) return false;
      
      // Caffeine preference
      if (preferences.caffeineLevel === 'low' && recipe.id.includes('espresso')) return false;
      
      return true;
    });

    // If no recipe matches, show beginner-friendly ones
    if (filteredRecipes.length === 0) {
      filteredRecipes = allRecipes.filter(r => r.difficulty === 'easy');
    }

    // Filter equipment
    let filteredEquipment = allEquipment.filter(eq => {
      // Budget filter
      if (eq.priceRange !== preferences.budget && preferences.budget !== 'premium') {
        if (preferences.budget === 'budget' && eq.priceRange !== 'budget') return false;
      }
      
      // Experience filter
      if (preferences.experience === 'beginner' && eq.difficulty === 'advanced') return false;
      
      return true;
    });

    // If no equipment matches, show beginner equipment
    if (filteredEquipment.length === 0) {
      filteredEquipment = allEquipment.filter(eq => eq.difficulty === 'beginner');
    }

    // Generate tips based on preferences
    const tips: string[] = [];
    
    if (preferences.experience === 'beginner') {
      tips.push('Start with pre-ground coffee if you don\'t have a grinder yet. Once you\'re comfortable, invest in a burr grinder for fresher taste.');
      tips.push('Use a kitchen scale for consistent results. The ratio of coffee to water matters more than you think!');
    }
    
    if (preferences.intensity === 'strong') {
      tips.push('Try a French press or AeroPress for bolder extraction. Use a slightly finer grind for more intensity.');
    } else if (preferences.intensity === 'mild') {
      tips.push('Pour-over methods like the V60 produce cleaner, lighter cups. Try a coarser grind for less extraction.');
    }
    
    if (preferences.brewingTime === 'quick') {
      tips.push('The AeroPress is your best friend for quick, quality coffee. It takes just 1-2 minutes from start to finish.');
    } else if (preferences.brewingTime === 'patient') {
      tips.push('Cold brew is perfect for batch preparation. Make a concentrate on Sunday and enjoy all week!');
    }
    
    if (preferences.flavorNotes.includes('fruity')) {
      tips.push('Light roasts from Ethiopia and Kenya showcase the most fruity and floral notes. Try a pour-over to highlight these flavors.');
    }
    
    if (preferences.flavorNotes.includes('chocolatey')) {
      tips.push('Brazilian and Guatemalan coffees are known for their chocolatey notes. A French press brings out the richness beautifully.');
    }

    tips.push('Fresh beans make all the difference. Look for a roast date within the last 2-4 weeks.');

    return {
      coffees: filteredCoffees.slice(0, 3),
      recipes: filteredRecipes.slice(0, 3),
      equipment: filteredEquipment.slice(0, 3),
      tips: tips.slice(0, 5),
    };
  }, [preferences]);

  const savePreferences = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('coffeeWizardPreferences', JSON.stringify(preferences));
      alert('Preferences saved! We\'ll remember your taste profile.');
    }
  }, [preferences]);

  if (showResults) {
    return (
      <div className="min-h-screen">
        <Hero
          title="Your Coffee Profile"
          description="Personalized recommendations based on your preferences"
        />
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <WizardResults
            preferences={preferences}
            coffees={recommendations.coffees}
            recipes={recommendations.recipes}
            equipment={recommendations.equipment}
            tips={recommendations.tips}
            onReset={resetWizard}
            onSavePreferences={savePreferences}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero
        title="Coffee Finder Wizard"
        description="Answer a few questions to discover your perfect coffee match"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <ProgressBar
            current={currentStep + 1}
            total={wizardSteps.length}
            label="Question"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mt-8 hover-glow">
                <CardHeader>
                  <CardTitle className="text-2xl">{currentStepData.question}</CardTitle>
                  {currentStepData.description && (
                    <CardDescription className="text-base">
                      {currentStepData.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentStepData.options.map((option) => {
                    const isSelected = currentStepData.type === 'multiple'
                      ? multiSelectValues.includes(option.value)
                      : preferences[currentStepData.id as keyof WizardPreferences] === option.value;

                    return (
                      <Button
                        key={option.id}
                        onClick={() => 
                          currentStepData.type === 'multiple'
                            ? handleMultiSelect(option.value)
                            : handleSingleSelect(option.value)
                        }
                        variant={isSelected ? 'default' : 'outline'}
                        className={`w-full justify-start h-auto py-4 text-left transition-all ${
                          isSelected 
                            ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-600' 
                            : 'hover:bg-amber-50 hover:border-amber-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 w-full">
                          {currentStepData.type === 'multiple' && (
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                              isSelected ? 'bg-white border-white' : 'border-current'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 text-amber-600" />}
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="font-medium">{option.label}</div>
                            {option.description && (
                              <div className={`text-sm mt-1 ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>
                                {option.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </Button>
                    );
                  })}

                  {/* Multi-select confirm button */}
                  {currentStepData.type === 'multiple' && (
                    <div className="pt-4 flex gap-3">
                      <Button
                        onClick={handleMultiSelectConfirm}
                        disabled={multiSelectValues.length === 0}
                        className="flex-1 bg-amber-600 hover:bg-amber-500"
                      >
                        Continue
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="mt-6 flex justify-between">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <span className="text-sm text-muted-foreground self-center">
                  {currentStep + 1} of {wizardSteps.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
