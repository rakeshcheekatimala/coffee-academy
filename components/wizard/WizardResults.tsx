'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Coffee, 
  UtensilsCrossed, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  Save,
  RotateCcw,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import { WizardPreferences, CoffeeRecommendation, Recipe, Equipment } from '@/lib/types';
import { RecipeCard } from '@/components/shared/RecipeCard';
import { EquipmentCard } from '@/components/shared/EquipmentCard';

interface WizardResultsProps {
  preferences: WizardPreferences;
  coffees: CoffeeRecommendation[];
  recipes: Recipe[];
  equipment: Equipment[];
  tips: string[];
  onReset: () => void;
  onSavePreferences?: () => void;
}

export function WizardResults({
  preferences,
  coffees,
  recipes,
  equipment,
  tips,
  onReset,
  onSavePreferences,
}: WizardResultsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 mb-6">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          Your Perfect Coffee Match
        </h2>
        <p className="text-lg text-coffee-medium/80 max-w-2xl mx-auto">
          Based on your preferences, here are our personalized recommendations to start your coffee journey.
        </p>
      </motion.div>

      {/* Preference summary */}
      <motion.div variants={itemVariants}>
        <Card className="bg-amber-50/50 border-amber-200/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-amber-600">Your Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {preferences.experience} level
              </Badge>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {preferences.intensity} intensity
              </Badge>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {preferences.roastLevel} roast
              </Badge>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {preferences.brewingTime} brew time
              </Badge>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {preferences.caffeineLevel} caffeine
              </Badge>
              {preferences.flavorNotes.slice(0, 3).map((note) => (
                <Badge key={note} variant="outline" className="border-amber-300 text-amber-700">
                  {note}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Coffee Recommendations */}
      {coffees.length > 0 && (
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Coffee className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-coffee-dark">Recommended Coffees</h3>
              <p className="text-sm text-coffee-medium/70">Beans that match your taste profile</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coffees.map((coffee, index) => (
              <motion.div
                key={coffee.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{coffee.name}</CardTitle>
                        <CardDescription>{coffee.origin}</CardDescription>
                      </div>
                      <Badge 
                        variant="secondary"
                        className={
                          coffee.roast === 'light' ? 'bg-yellow-100 text-yellow-800' :
                          coffee.roast === 'medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-amber-900 text-amber-100'
                        }
                      >
                        {coffee.roast}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{coffee.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {coffee.flavorProfile.map((flavor) => (
                        <Badge key={flavor} variant="outline" className="text-xs">
                          {flavor}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Acidity:</span>{' '}
                        <span className="font-medium capitalize">{coffee.acidity}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Body:</span>{' '}
                        <span className="font-medium capitalize">{coffee.body}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="ghost" asChild>
              <Link href="/recommendations">
                View All Coffee Recommendations <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.section>
      )}

      {/* Brewing Recipes */}
      {recipes.length > 0 && (
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-coffee-dark">Recommended Recipes</h3>
              <p className="text-sm text-coffee-medium/70">Brewing methods suited to your preferences</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="ghost" asChild>
              <Link href="/recipes">
                Browse All Recipes <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.section>
      )}

      {/* Equipment Recommendations */}
      {equipment.length > 0 && (
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-coffee-dark">Recommended Equipment</h3>
              <p className="text-sm text-coffee-medium/70">Gear that fits your budget and skill level</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item, index) => (
              <EquipmentCard key={item.id} equipment={item} index={index} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Tips */}
      {tips.length > 0 && (
        <motion.section variants={itemVariants}>
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Lightbulb className="w-5 h-5" />
                Tips for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 text-amber-800 text-sm flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <span className="text-amber-900/80">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.section>
      )}

      {/* Actions */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        {onSavePreferences && (
          <Button 
            onClick={onSavePreferences}
            className="bg-amber-600 hover:bg-amber-500"
          >
            <Save className="mr-2 h-4 w-4" />
            Save My Preferences
          </Button>
        )}
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Start Over
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/levels">
            Continue Learning <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}

