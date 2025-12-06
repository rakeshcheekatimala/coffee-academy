import { render, screen } from '@testing-library/react';
import { GrindSizeVisual } from '@/components/shared/GrindSizeVisual';

describe('GrindSizeVisual', () => {
  it('renders grind size comparison title', () => {
    render(<GrindSizeVisual />);
    expect(screen.getByText('Grind Size Comparison')).toBeInTheDocument();
  });

  it('renders grind size options', () => {
    render(<GrindSizeVisual />);
    expect(screen.getByText('Extra Fine')).toBeInTheDocument();
    expect(screen.getByText('Fine')).toBeInTheDocument();
    expect(screen.getByText('Coarse')).toBeInTheDocument();
  });

  it('renders usage information', () => {
    render(<GrindSizeVisual />);
    expect(screen.getByText('Turkish')).toBeInTheDocument();
    expect(screen.getByText('Espresso')).toBeInTheDocument();
    expect(screen.getByText('French Press')).toBeInTheDocument();
  });
});

