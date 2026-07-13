import { calculateExtraction, defaultLabSettings } from '@/components/lab/extractionModel';

describe('extraction model', () => {
  it('starts the default recipe in the balanced range', () => {
    const metrics = calculateExtraction(defaultLabSettings);

    expect(metrics.cup).toBe('Balanced');
    expect(metrics.extraction).toBeGreaterThanOrEqual(18.5);
    expect(metrics.extraction).toBeLessThanOrEqual(22.2);
  });

  it('shows under-extraction for a cooler, coarser, faster brew', () => {
    const metrics = calculateExtraction({
      grind: 8,
      temperature: 89,
      ratio: 18,
      bloom: 10,
      pourSpeed: 3,
      brewTime: 120,
    });

    expect(metrics.cup).toBe('Under-extracted');
  });

  it('shows over-extraction for a hotter, finer, slower brew', () => {
    const metrics = calculateExtraction({
      grind: 2,
      temperature: 98,
      ratio: 13,
      bloom: 50,
      pourSpeed: 8,
      brewTime: 280,
    });

    expect(metrics.cup).toBe('Over-extracted');
  });
});
