import { render, screen } from '@testing-library/react';
import { TastingWheel } from '@/components/shared/TastingWheel';

describe('TastingWheel', () => {
  it('renders tasting wheel title', () => {
    render(<TastingWheel />);
    expect(screen.getByText('Coffee Flavor Wheel')).toBeInTheDocument();
  });

  it('renders flavor categories', () => {
    render(<TastingWheel />);
    expect(screen.getByText('Fruity')).toBeInTheDocument();
    expect(screen.getByText('Nutty')).toBeInTheDocument();
    expect(screen.getByText('Chocolatey')).toBeInTheDocument();
  });

  it('renders flavor examples', () => {
    render(<TastingWheel />);
    expect(screen.getByText(/Blueberry/i)).toBeInTheDocument();
    expect(screen.getByText(/Almond/i)).toBeInTheDocument();
  });
});

