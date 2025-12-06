import {
  getAllEquipment,
  getEquipment,
  getEquipmentByCategory,
} from '@/lib/content/equipment';

describe('Equipment Content', () => {
  it('returns all equipment', () => {
    const equipment = getAllEquipment();
    expect(equipment.length).toBeGreaterThan(0);
  });

  it('returns equipment by id', () => {
    const item = getEquipment('burr-grinder');
    expect(item).toBeDefined();
    expect(item?.id).toBe('burr-grinder');
  });

  it('returns undefined for invalid id', () => {
    const item = getEquipment('invalid-id');
    expect(item).toBeUndefined();
  });

  it('filters by category', () => {
    const grinders = getEquipmentByCategory('grinder');
    expect(grinders.length).toBeGreaterThan(0);
    grinders.forEach((item) => {
      expect(item.category).toBe('grinder');
    });
  });

  it('all equipment have required properties', () => {
    const equipment = getAllEquipment();
    equipment.forEach((item) => {
      expect(item.id).toBeDefined();
      expect(item.name).toBeDefined();
      expect(item.category).toBeDefined();
      expect(item.description).toBeDefined();
      expect(item.pros).toBeDefined();
      expect(item.cons).toBeDefined();
      expect(item.priceRange).toBeDefined();
      expect(item.difficulty).toBeDefined();
    });
  });
});

