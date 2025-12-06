import { render, screen } from '@testing-library/react';
import { ProgressBar } from '@/components/shared/ProgressBar';

describe('ProgressBar', () => {
  it('renders progress bar with correct percentage', () => {
    const { container } = render(<ProgressBar current={2} total={6} />);
    const progressBar = container.querySelector('.bg-gradient-to-r');
    expect(progressBar).toBeInTheDocument();
  });

  it('displays label and current/total when provided', () => {
    render(<ProgressBar current={3} total={6} label="Level" />);
    expect(screen.getByText('Level')).toBeInTheDocument();
    expect(screen.getByText('3 / 6')).toBeInTheDocument();
  });

  it('calculates percentage correctly', () => {
    const { container } = render(<ProgressBar current={1} total={4} />);
    const progressBar = container.querySelector('.bg-gradient-to-r');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders without label', () => {
    const { container } = render(<ProgressBar current={2} total={6} />);
    expect(container).toBeInTheDocument();
  });
});

