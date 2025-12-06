import { render, screen } from '@testing-library/react';
import { EquipmentCard } from '@/components/shared/EquipmentCard';
import { Equipment } from '@/lib/types';

const mockEquipment: Equipment = {
  id: 'test-equipment',
  name: 'Test Equipment',
  category: 'grinder',
  description: 'Test description',
  pros: ['Pro 1', 'Pro 2'],
  cons: ['Con 1'],
  priceRange: 'budget',
  difficulty: 'beginner',
};

describe('EquipmentCard', () => {
  it('renders equipment card with name and description', () => {
    render(<EquipmentCard equipment={mockEquipment} />);
    expect(screen.getByText('Test Equipment')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('displays pros and cons', () => {
    render(<EquipmentCard equipment={mockEquipment} />);
    expect(screen.getByText('Pro 1')).toBeInTheDocument();
    expect(screen.getByText('Con 1')).toBeInTheDocument();
  });

  it('shows price range and difficulty badges', () => {
    render(<EquipmentCard equipment={mockEquipment} />);
    expect(screen.getByText('budget')).toBeInTheDocument();
    expect(screen.getByText('beginner')).toBeInTheDocument();
  });
});

