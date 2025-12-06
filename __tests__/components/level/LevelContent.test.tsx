import { render, screen } from '@testing-library/react';
import { LevelContent } from '@/components/level/LevelContent';
import { ContentSection } from '@/lib/types';

const mockTextSection: ContentSection = {
  type: 'text',
  title: 'Test Title',
  content: 'Test content text',
};

const mockTextSectionNoTitle: ContentSection = {
  type: 'text',
  content: 'Test content text',
};

const mockComparisonSection: ContentSection = {
  type: 'comparison',
  title: 'Comparison Title',
  content: {
    items: [
      {
        name: 'Item 1',
        description: 'Description 1',
        characteristics: ['Char 1', 'Char 2'],
      },
    ],
  },
};

const mockComparisonSectionNoTitle: ContentSection = {
  type: 'comparison',
  content: {
    items: [
      {
        name: 'Item 1',
        description: 'Description 1',
        characteristics: ['Char 1'],
      },
    ],
  },
};

const mockDiagramSection: ContentSection = {
  type: 'diagram',
  title: 'Diagram Title',
  content: {
    type: 'flow',
    steps: [
      { label: 'Step 1', description: 'Step description' },
    ],
  },
};

const mockInteractiveSection: ContentSection = {
  type: 'interactive',
  title: 'Interactive Title',
  content: {
    type: 'wheel',
    data: {},
  },
};

describe('LevelContent', () => {
  it('renders text section', () => {
    render(<LevelContent sections={[mockTextSection]} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content text')).toBeInTheDocument();
  });

  it('renders text section without title', () => {
    render(<LevelContent sections={[mockTextSectionNoTitle]} />);
    expect(screen.getByText('Test content text')).toBeInTheDocument();
  });

  it('renders comparison section', () => {
    render(<LevelContent sections={[mockComparisonSection]} />);
    expect(screen.getByText('Comparison Title')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('renders comparison section without title', () => {
    render(<LevelContent sections={[mockComparisonSectionNoTitle]} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('renders diagram section', () => {
    render(<LevelContent sections={[mockDiagramSection]} />);
    expect(screen.getByText('Diagram Title')).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('renders interactive section', () => {
    render(<LevelContent sections={[mockInteractiveSection]} />);
    expect(screen.getByText('Interactive Title')).toBeInTheDocument();
  });

  it('renders multiple sections', () => {
    render(<LevelContent sections={[mockTextSection, mockComparisonSection]} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Comparison Title')).toBeInTheDocument();
  });
});

