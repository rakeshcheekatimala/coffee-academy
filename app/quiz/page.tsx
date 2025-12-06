'use client';

import { useState } from 'react';
import { Hero } from '@/components/shared/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: Array<{ id: string; label: string; value: string }>;
}

const questions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What flavors do you typically enjoy?',
    options: [
      { id: 'a', label: 'Fruity and bright', value: 'fruity' },
      { id: 'b', label: 'Chocolatey and nutty', value: 'chocolatey' },
      { id: 'c', label: 'Bold and earthy', value: 'earthy' },
      { id: 'd', label: 'Floral and delicate', value: 'floral' },
    ],
  },
  {
    id: '2',
    question: 'How do you prefer your coffee strength?',
    options: [
      { id: 'a', label: 'Light and mild', value: 'light' },
      { id: 'b', label: 'Medium and balanced', value: 'medium' },
      { id: 'c', label: 'Strong and bold', value: 'strong' },
    ],
  },
  {
    id: '3',
    question: 'What acidity level do you prefer?',
    options: [
      { id: 'a', label: 'Low - smooth and mellow', value: 'low' },
      { id: 'b', label: 'Medium - balanced', value: 'medium' },
      { id: 'c', label: 'High - bright and tangy', value: 'high' },
    ],
  },
  {
    id: '4',
    question: 'When do you usually drink coffee?',
    options: [
      { id: 'a', label: 'Morning', value: 'morning' },
      { id: 'b', label: 'Afternoon', value: 'afternoon' },
      { id: 'c', label: 'All day', value: 'allday' },
    ],
  },
  {
    id: '5',
    question: 'Do you add milk or sugar?',
    options: [
      { id: 'a', label: 'Black coffee only', value: 'black' },
      { id: 'b', label: 'Sometimes with milk', value: 'milk' },
      { id: 'c', label: 'Always with milk/sugar', value: 'sweet' },
    ],
  },
];

const results: Record<string, { profile: string; description: string; recommendations: string[] }> = {
  fruity_light_high_morning_black: {
    profile: 'Bright & Fruity Explorer',
    description: 'You enjoy bright, fruity flavors with high acidity. Perfect for light roasts and pour-over brewing.',
    recommendations: ['Ethiopian Light Roast', 'Kenyan Light Roast', 'Pour-over brewing method'],
  },
  chocolatey_medium_low_allday_milk: {
    profile: 'Balanced & Smooth',
    description: 'You prefer balanced, chocolatey flavors that work well with milk. Medium roasts are perfect for you.',
    recommendations: ['Brazilian Medium Roast', 'Colombian Medium Roast', 'French Press or Latte'],
  },
  earthy_strong_low_morning_black: {
    profile: 'Bold & Strong',
    description: 'You love bold, earthy flavors with low acidity. Dark roasts and strong brewing methods suit you.',
    recommendations: ['Sumatran Dark Roast', 'French Press', 'Espresso'],
  },
  default: {
    profile: 'Adventurous Beginner',
    description: 'You\'re open to exploring different coffee flavors. Start with balanced medium roasts and experiment!',
    recommendations: ['Colombian Medium Roast', 'Guatemalan Medium Roast', 'Try different brewing methods'],
  },
};

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const key = `${answers['1']}_${answers['2']}_${answers['3']}_${answers['4']}_${answers['5']}`;
    return results[key] || results.default;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    const result = getResult();
    return (
      <div className="min-h-screen">
        <Hero
          title="Your Coffee Profile"
          description="Based on your preferences, here's your personalized coffee profile."
        />

        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="hover-glow">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Coffee className="h-8 w-8 text-coffee-gold" />
                  {result.profile}
                </CardTitle>
                <CardDescription className="text-lg">{result.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Recommended for You:</h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-coffee-gold font-bold mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button onClick={resetQuiz} className="w-full" size="lg">
                  Take Quiz Again
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href="/recommendations">View All Recommendations</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen">
      <Hero
        title="Find Your Coffee Flavor Profile"
        description="Answer a few questions to discover your perfect coffee match."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <ProgressBar
            current={currentQuestion + 1}
            total={questions.length}
            label="Question"
          />

          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mt-8 hover-glow">
              <CardHeader>
                <CardTitle className="text-2xl">{question.question}</CardTitle>
                <CardDescription>
                  Question {currentQuestion + 1} of {questions.length}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {question.options.map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => handleAnswer(option.value)}
                    variant="outline"
                    className="w-full justify-start h-auto py-4 text-left hover:bg-coffee-gold/10 hover:border-coffee-gold"
                  >
                    {option.label}
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

