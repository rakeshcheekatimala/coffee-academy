export interface LabSettings {
  grind: number;
  temperature: number;
  ratio: number;
  bloom: number;
  pourSpeed: number;
  brewTime: number;
}

export interface ExtractionMetrics {
  extraction: number;
  balance: number;
  sweetness: number;
  acidity: number;
  bitterness: number;
  body: number;
  clarity: number;
  cup: 'Under-extracted' | 'Balanced' | 'Over-extracted';
  headline: string;
  guidance: string;
}

export const defaultLabSettings: LabSettings = {
  grind: 5.2,
  temperature: 94,
  ratio: 16,
  bloom: 35,
  pourSpeed: 5.5,
  brewTime: 210,
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function calculateExtraction(settings: LabSettings): ExtractionMetrics {
  const fineGrindEffect = (10 - settings.grind) * 1.15;
  const temperatureEffect = (settings.temperature - 88) * 0.34;
  const ratioEffect = (17.5 - settings.ratio) * 0.42;
  const bloomEffect = Math.min(settings.bloom, 45) * 0.035;
  const pourEffect = (settings.pourSpeed - 5) * 0.34;
  const timeEffect = (settings.brewTime - 150) * 0.022;

  const extraction = clamp(
    9.6 + fineGrindEffect + temperatureEffect + ratioEffect + bloomEffect + pourEffect + timeEffect,
    12,
    27
  );

  const distanceFromIdeal = Math.abs(extraction - 20.5);
  const balance = clamp(100 - distanceFromIdeal * 18, 0, 100);
  const acidity = clamp(82 - (extraction - 16) * 8 + (settings.grind - 5) * 4, 5, 100);
  const bitterness = clamp((extraction - 20.5) * 18 + (settings.temperature - 94) * 3, 0, 100);
  const sweetness = clamp(100 - Math.abs(extraction - 20) * 14 - Math.abs(settings.ratio - 16) * 4, 0, 100);
  const body = clamp(74 - (settings.ratio - 14) * 6 + (10 - settings.grind) * 2, 10, 100);
  const clarity = clamp(42 + settings.grind * 5 - Math.max(0, settings.pourSpeed - 7) * 8, 5, 100);

  const cup =
    extraction < 18.5 ? 'Under-extracted' : extraction > 22.2 ? 'Over-extracted' : 'Balanced';

  const headline =
    cup === 'Balanced'
      ? 'Sweet center, clean finish'
      : cup === 'Under-extracted'
        ? 'Bright, thin, and a little sharp'
        : 'Heavy, dry, and bitter-edged';

  const guidance =
    cup === 'Balanced'
      ? 'You are in the specialty sweet spot. Nudge ratio or pour speed for texture, not rescue.'
      : cup === 'Under-extracted'
        ? 'Go finer, brew hotter, or extend contact time to pull more sweetness from the grounds.'
        : 'Go coarser, cool the water, or shorten contact time to reduce dry bitter compounds.';

  return {
    extraction,
    balance,
    sweetness,
    acidity,
    bitterness,
    body,
    clarity,
    cup,
    headline,
    guidance,
  };
}
