import { render, screen } from '@testing-library/react';
import { Infographic } from '@/components/shared/Infographic';
import { DiagramData } from '@/lib/types';

const mockFlowData: DiagramData = {
  type: 'flow',
  steps: [
    { label: 'Step 1', description: 'Description 1' },
    { label: 'Step 2', description: 'Description 2' },
  ],
};

const mockProcessData: DiagramData = {
  type: 'process',
  steps: [
    { label: 'Process 1', description: 'Process description 1' },
  ],
};

describe('Infographic', () => {
  it('renders flow diagram with title', () => {
    render(<Infographic data={mockFlowData} title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });

  it('renders process diagram', () => {
    render(<Infographic data={mockProcessData} />);
    expect(screen.getByText('Process 1')).toBeInTheDocument();
  });

  it('renders without title', () => {
    render(<Infographic data={mockFlowData} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });
});

