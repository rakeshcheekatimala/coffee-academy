import {
  getAllGlossaryTerms,
  getGlossaryTerm,
  getGlossaryByCategory,
  getGlossaryCategories,
} from '@/lib/content/glossary';

describe('Glossary Content', () => {
  it('returns all glossary terms', () => {
    const terms = getAllGlossaryTerms();
    expect(terms.length).toBeGreaterThan(0);
  });

  it('returns term by name (case insensitive)', () => {
    const term = getGlossaryTerm('acidity');
    expect(term).toBeDefined();
    expect(term?.term.toLowerCase()).toBe('acidity');
  });

  it('returns undefined for invalid term', () => {
    const term = getGlossaryTerm('invalid-term');
    expect(term).toBeUndefined();
  });

  it('filters terms by category', () => {
    const tastingTerms = getGlossaryByCategory('Tasting');
    expect(tastingTerms.length).toBeGreaterThan(0);
    tastingTerms.forEach((term) => {
      expect(term.category).toBe('Tasting');
    });
  });

  it('returns all categories', () => {
    const categories = getGlossaryCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(Array.isArray(categories)).toBe(true);
  });

  it('all terms have required properties', () => {
    const terms = getAllGlossaryTerms();
    terms.forEach((term) => {
      expect(term.term).toBeDefined();
      expect(term.definition).toBeDefined();
      expect(term.category).toBeDefined();
    });
  });
});

