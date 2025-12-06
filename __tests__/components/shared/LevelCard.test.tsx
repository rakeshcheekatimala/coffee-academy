import { render, screen } from '@testing-library/react';
import { LevelCard } from '@/components/shared/LevelCard';
import { Level } from '@/lib/types';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

const mockLevel: Level = {
  id: 1,
  title: 'Test Level',
  description: 'Test description',
  unlocked: true,
  content: {
    sections: [
      {
        type: 'text',
        content: 'Test content',
      },
    ],
  },
};

describe('LevelCard', () => {
  it('renders level card with title and description', () => {
    render(<LevelCard level={mockLevel} />);
    expect(screen.getByText('Test Level')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('shows completed badge when completed', () => {
    render(<LevelCard level={mockLevel} completed={true} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('shows locked badge when level is locked', () => {
    const lockedLevel = { ...mockLevel, unlocked: false };
    const { container } = render(<LevelCard level={lockedLevel} />);
    const lockedBadge = container.querySelector('button:disabled');
    expect(lockedBadge).toBeInTheDocument();
    expect(lockedBadge?.textContent).toContain('Locked');
  });

  it('renders level number badge', () => {
    render(<LevelCard level={mockLevel} />);
    expect(screen.getByText('Level 1')).toBeInTheDocument();
  });
});

