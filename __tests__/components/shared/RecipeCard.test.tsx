import { render, screen } from '@testing-library/react';
import { RecipeCard } from '@/components/shared/RecipeCard';
import { Recipe } from '@/lib/types';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

const mockRecipe: Recipe = {
  id: 'test-recipe',
  title: 'Test Recipe',
  description: 'Test description',
  category: 'hot',
  difficulty: 'easy',
  time: '5 minutes',
  servings: 1,
  ingredients: [
    { name: 'Coffee', amount: '20', unit: 'g' },
  ],
  tools: ['Kettle'],
  grindSize: 'medium',
  steps: [
    { step: 1, instruction: 'Test step' },
  ],
  tips: ['Test tip'],
};

describe('RecipeCard', () => {
  it('renders recipe card with title and description', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('displays recipe metadata', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('5 minutes')).toBeInTheDocument();
    expect(screen.getByText('1 serving')).toBeInTheDocument();
  });

  it('shows difficulty and category badges', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText('hot')).toBeInTheDocument();
    expect(screen.getByText('easy')).toBeInTheDocument();
  });

  it('displays ingredients', () => {
    render(<RecipeCard recipe={mockRecipe} />);
    expect(screen.getByText(/Coffee/i)).toBeInTheDocument();
  });
});

