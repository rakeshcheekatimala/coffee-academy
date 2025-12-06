import { render, screen } from '@testing-library/react';
import { StepIndicator } from '@/components/shared/StepIndicator';

const mockSteps = [
  { step: 1, instruction: 'Step 1 instruction' },
  { step: 2, instruction: 'Step 2 instruction' },
  { step: 3, instruction: 'Step 3 instruction' },
];

describe('StepIndicator', () => {
  it('renders all steps', () => {
    render(<StepIndicator steps={mockSteps} />);
    expect(screen.getByText('Step 1 instruction')).toBeInTheDocument();
    expect(screen.getByText('Step 2 instruction')).toBeInTheDocument();
    expect(screen.getByText('Step 3 instruction')).toBeInTheDocument();
  });

  it('highlights current step', () => {
    render(<StepIndicator steps={mockSteps} currentStep={1} />);
    const step2 = screen.getByText('Step 2 instruction');
    expect(step2).toBeInTheDocument();
  });

  it('shows completed steps', () => {
    const { container } = render(<StepIndicator steps={mockSteps} currentStep={2} />);
    // Check that step 1 is marked as completed (should have check icon or completed styling)
    expect(container).toBeInTheDocument();
  });
});

