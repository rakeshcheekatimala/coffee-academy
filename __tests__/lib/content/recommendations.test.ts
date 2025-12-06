import {
  getAllRecommendations,
  getRecommendation,
  getRecommendationsByRoast,
  getRecommendationsByAcidity,
  getBeginnerRecommendations,
} from '@/lib/content/recommendations';

describe('Recommendations Content', () => {
  it('returns all recommendations', () => {
    const recommendations = getAllRecommendations();
    expect(recommendations.length).toBeGreaterThan(0);
  });

  it('returns recommendation by id', () => {
    const rec = getRecommendation('brazilian-medium');
    expect(rec).toBeDefined();
    expect(rec?.id).toBe('brazilian-medium');
  });

  it('returns undefined for invalid id', () => {
    const rec = getRecommendation('invalid-id');
    expect(rec).toBeUndefined();
  });

  it('filters by roast level', () => {
    const mediumRoasts = getRecommendationsByRoast('medium');
    expect(mediumRoasts.length).toBeGreaterThan(0);
    mediumRoasts.forEach((rec) => {
      expect(rec.roast).toBe('medium');
    });
  });

  it('filters by acidity', () => {
    const lowAcidity = getRecommendationsByAcidity('low');
    expect(lowAcidity.length).toBeGreaterThan(0);
    lowAcidity.forEach((rec) => {
      expect(rec.acidity).toBe('low');
    });
  });

  it('returns beginner recommendations', () => {
    const beginnerRecs = getBeginnerRecommendations();
    expect(beginnerRecs.length).toBeGreaterThan(0);
    beginnerRecs.forEach((rec) => {
      expect(rec.roast).toBe('medium');
      expect(['low', 'medium']).toContain(rec.acidity);
    });
  });

  it('all recommendations have required properties', () => {
    const recommendations = getAllRecommendations();
    recommendations.forEach((rec) => {
      expect(rec.id).toBeDefined();
      expect(rec.name).toBeDefined();
      expect(rec.origin).toBeDefined();
      expect(rec.roast).toBeDefined();
      expect(rec.flavorProfile).toBeDefined();
      expect(rec.acidity).toBeDefined();
      expect(rec.body).toBeDefined();
      expect(rec.description).toBeDefined();
      expect(rec.bestFor).toBeDefined();
    });
  });
});

