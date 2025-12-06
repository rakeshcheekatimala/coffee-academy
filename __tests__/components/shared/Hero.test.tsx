import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/shared/Hero';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Hero', () => {
  it('renders title and description', () => {
    render(<Hero title="Test Title" description="Test Description" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders CTA button when provided', () => {
    render(
      <Hero
        title="Test Title"
        description="Test Description"
        ctaText="Click Me"
        ctaLink="/test"
      />
    );
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('does not render CTA when not provided', () => {
    render(<Hero title="Test Title" description="Test Description" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});

