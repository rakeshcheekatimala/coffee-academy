import { render, screen } from '@testing-library/react';
import { ProgressBar } from '@/components/shared/ProgressBar';

describe('ProgressBar', () => {
  it('renders progress bar with correct percentage', () => {
    render(<ProgressBar current={2} total={6} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '33');
  });

  it('displays label and current/total when provided', () => {
    render(<ProgressBar current={3} total={6} label="Level" />);
    expect(screen.getByText('Level')).toBeInTheDocument();
    expect(screen.getByText('3 / 6')).toBeInTheDocument();
  });

  it('calculates percentage correctly', () => {
    render(<ProgressBar current={1} total={4} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '25');
  });

  it('renders without label', () => {
    const { container } = render(<ProgressBar current={2} total={6} />);
    expect(container).toBeInTheDocument();
  });
});
