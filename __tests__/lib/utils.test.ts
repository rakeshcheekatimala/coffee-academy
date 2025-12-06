import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('class1', 'class2');
    expect(result).toContain('class1');
    expect(result).toContain('class2');
  });

  it('handles conditional classes', () => {
    const result = cn('base', true && 'conditional');
    expect(result).toContain('base');
    expect(result).toContain('conditional');
  });

  it('handles undefined and null', () => {
    const result = cn('base', undefined, null, 'valid');
    expect(result).toContain('base');
    expect(result).toContain('valid');
    expect(result).not.toContain('undefined');
    expect(result).not.toContain('null');
  });

  it('handles empty strings', () => {
    const result = cn('base', '');
    expect(result).toContain('base');
  });
});

