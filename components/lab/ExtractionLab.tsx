'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, Beaker, Coffee, Gauge, RotateCcw, SlidersHorizontal, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { calculateExtraction, defaultLabSettings, LabSettings } from './extractionModel';

const ExtractionScene = dynamic(() => import('./ExtractionScene'), {
  ssr: false,
  loading: () => <div className="lab-scene-loading h-full w-full" />,
});

const controls: Array<{
  key: keyof LabSettings;
  label: string;
  min: number;
  max: number;
  step: number;
  suffix: string;
}> = [
  { key: 'grind', label: 'Grind size', min: 1, max: 10, step: 0.1, suffix: '' },
  { key: 'temperature', label: 'Water temp', min: 88, max: 99, step: 1, suffix: 'C' },
  { key: 'ratio', label: 'Brew ratio', min: 12, max: 19, step: 0.5, suffix: ':1' },
  { key: 'bloom', label: 'Bloom', min: 0, max: 60, step: 5, suffix: 's' },
  { key: 'pourSpeed', label: 'Pour speed', min: 1, max: 10, step: 0.1, suffix: '' },
  { key: 'brewTime', label: 'Brew time', min: 90, max: 300, step: 5, suffix: 's' },
];

const recipes: Array<{ name: string; description: string; settings: LabSettings }> = [
  {
    name: 'Sweet V60',
    description: 'A balanced starting point for medium roasts.',
    settings: defaultLabSettings,
  },
  {
    name: 'Bright Filter',
    description: 'Coarser and lighter for fruit-forward coffees.',
    settings: { grind: 6.9, temperature: 91, ratio: 17.5, bloom: 45, pourSpeed: 4.6, brewTime: 185 },
  },
  {
    name: 'Heavy Cup',
    description: 'Richer body with higher extraction pressure.',
    settings: { grind: 3.6, temperature: 96, ratio: 14, bloom: 30, pourSpeed: 6.8, brewTime: 235 },
  },
];

function StatBar({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div>
      <div className="lab-stat-label mb-1 flex items-center justify-between text-xs">
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="lab-stat-track h-1.5 overflow-hidden">
        <div className={`h-full ${tone}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function ExtractionLab() {
  const [settings, setSettings] = useState<LabSettings>(defaultLabSettings);
  const metrics = useMemo(() => calculateExtraction(settings), [settings]);

  const updateSetting = (key: keyof LabSettings, value: number) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  return (
    <main className="extraction-lab">
      <section className="page-shell lab-shell">
        <header className="lab-header">
          <div>
            <div className="lab-eyebrow inline-flex items-center gap-2">
              <Beaker className="h-4 w-4" />
              Interactive brewing model
            </div>
            <h1 className="lab-title">Coffee Extraction Lab</h1>
          </div>
          <p className="lab-intro">
            Tune the brewing variables and watch the cup move from sharp to sweet to bitter.
            The model is simplified, but the tradeoffs mirror real pour-over decisions.
          </p>
        </header>

        <div className="lab-workbench">
          <section className="lab-scene-frame" aria-label="Live extraction visualization">
            <div className="lab-scene-viewport">
              <ExtractionScene settings={settings} metrics={metrics} />
            </div>
            <div className="lab-scene-caption">
              <span>Live extraction model</span>
              <span className="lab-live-status">
                <span aria-hidden="true" />
                Responds in real time
              </span>
            </div>
          </section>

          <section className="lab-controls-panel" aria-labelledby="lab-controls-title">
            <div className="lab-controls-heading">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                <h2 id="lab-controls-title" className="text-lg font-semibold">Brew variables</h2>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSettings(defaultLabSettings)}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>

            <div className="lab-control-summary" aria-live="polite">
              <div>
                <div className="lab-muted flex items-center gap-2 text-xs uppercase tracking-[0.12em]">
                  <Gauge className="h-4 w-4" />
                  Extraction
                </div>
                <div className="mt-1 text-4xl font-medium" data-testid="extraction-value">
                  {metrics.extraction.toFixed(1)}%
                </div>
              </div>
              <div className="lab-cup-state">{metrics.cup}</div>
            </div>

            <div className="lab-control-list">
              {controls.map((control) => (
                <label key={control.key} className="lab-control-row">
                  <span className="mb-2 flex items-center justify-between gap-3 text-sm font-medium">
                    <span>{control.label}</span>
                    <span className="lab-control-value">
                      {settings[control.key]}
                      {control.suffix}
                    </span>
                  </span>
                  <input
                    type="range"
                    min={control.min}
                    max={control.max}
                    step={control.step}
                    value={settings[control.key]}
                    onChange={(event) => updateSetting(control.key, Number(event.target.value))}
                    data-testid={`control-${control.key}`}
                    className="h-2 w-full cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="lab-analysis-grid">
          <section className="lab-metric-panel">
            <div className="lab-metric-copy">
              <p className="lab-section-kicker">Cup profile</p>
              <h2>{metrics.headline}</h2>
              <p className="lab-muted">{metrics.guidance}</p>
            </div>
            <div className="lab-profile-grid">
              <StatBar label="Sweetness" value={metrics.sweetness} tone="bg-[#f6c453]" />
              <StatBar label="Acidity" value={metrics.acidity} tone="bg-[#ff6b6b]" />
              <StatBar label="Body" value={metrics.body} tone="bg-[#5eead4]" />
              <StatBar label="Clarity" value={metrics.clarity} tone="bg-[#8bdff0]" />
              <StatBar label="Bitterness" value={metrics.bitterness} tone="bg-[#c084fc]" />
            </div>
          </section>

          <section className="lab-recipes-panel">
            <div className="mb-4 flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Try a brew</h2>
            </div>
            <div className="grid gap-2">
              {recipes.map((recipe) => (
                <button
                  key={recipe.name}
                  type="button"
                  onClick={() => setSettings(recipe.settings)}
                  className="lab-recipe-button"
                >
                  <span className="block text-sm font-semibold">{recipe.name}</span>
                  <span className="lab-muted mt-1 block text-xs leading-5">{recipe.description}</span>
                </button>
              ))}
            </div>
            <Button asChild className="mt-4 w-full">
              <Link href="/recipes" className="gap-2">
                <Coffee className="h-4 w-4" />
                Brew a real recipe
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </section>
        </div>
      </section>
    </main>
  );
}
