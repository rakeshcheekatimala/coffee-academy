import { getLevel, getTotalLevels, levels } from '@/lib/content/levels';

describe('Levels Content', () => {
  it('returns all levels', () => {
    expect(levels.length).toBeGreaterThan(0);
  });

  it('returns total number of levels', () => {
    expect(getTotalLevels()).toBe(levels.length);
  });

  it('returns level by id', () => {
    const level = getLevel(1);
    expect(level).toBeDefined();
    expect(level?.id).toBe(1);
    expect(level?.title).toBeDefined();
  });

  it('returns undefined for invalid level id', () => {
    const level = getLevel(999);
    expect(level).toBeUndefined();
  });

  it('all levels have required properties', () => {
    levels.forEach((level) => {
      expect(level.id).toBeDefined();
      expect(level.title).toBeDefined();
      expect(level.description).toBeDefined();
      expect(level.content).toBeDefined();
      expect(level.content.sections).toBeDefined();
      expect(Array.isArray(level.content.sections)).toBe(true);
    });
  });
});

