export interface Level {
  id: number;
  title: string;
  description: string;
  content: LevelContent;
  unlocked: boolean;
}

export interface LevelContent {
  sections: ContentSection[];
}

export interface ContentSection {
  type: 'text' | 'image' | 'comparison' | 'diagram' | 'interactive';
  title?: string;
  content: string | ComparisonData | DiagramData | InteractiveData;
}

export interface ComparisonData {
  items: ComparisonItem[];
}

export interface ComparisonItem {
  name: string;
  description: string;
  image?: string;
  characteristics: string[];
}

export interface DiagramData {
  type: 'flow' | 'process' | 'infographic';
  steps: DiagramStep[];
}

export interface DiagramStep {
  label: string;
  description: string;
  icon?: string;
}

export interface InteractiveData {
  type: 'quiz' | 'selector' | 'wheel';
  data: unknown;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: 'cold' | 'hot' | 'beginner';
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: Ingredient[];
  tools: string[];
  grindSize: GrindSize;
  steps: RecipeStep[];
  tips: string[];
  image?: string;
  time: string;
  servings: number;
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface RecipeStep {
  step: number;
  instruction: string;
  duration?: string;
  temperature?: string;
}

export type GrindSize = 'extra-fine' | 'fine' | 'medium-fine' | 'medium' | 'medium-coarse' | 'coarse' | 'extra-coarse';

export interface Equipment {
  id: string;
  name: string;
  category: 'grinder' | 'brewer' | 'accessory' | 'kettle' | 'filter';
  description: string;
  image?: string;
  pros: string[];
  cons: string[];
  priceRange: 'budget' | 'mid-range' | 'premium';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  example?: string;
}

export interface CoffeeRecommendation {
  id: string;
  name: string;
  origin: string;
  roast: 'light' | 'medium' | 'dark';
  flavorProfile: string[];
  acidity: 'low' | 'medium' | 'high';
  body: 'light' | 'medium' | 'full';
  description: string;
  bestFor: string[];
  image?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple';
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  label: string;
  value: string;
  image?: string;
}

export interface QuizResult {
  profile: string;
  description: string;
  recommendations: string[];
  coffees: string[];
}

export interface WizardStep {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'range';
  options?: WizardOption[];
  min?: number;
  max?: number;
}

export interface WizardOption {
  id: string;
  label: string;
  value: string;
  description?: string;
}

export interface WizardResult {
  equipment: string[];
  reasoning: string;
  budget: string;
}

