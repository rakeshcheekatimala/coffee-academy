'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, Beaker, Coffee, Gauge, RotateCcw, SlidersHorizontal, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { calculateExtraction, defaultLabSettings, LabSettings } from './extractionModel';

const ExtractionScene = dynamic(() => import('./ExtractionScene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#101820]" />,
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
      <div className="mb-1 flex items-center justify-between text-xs text-white/70">
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/12">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${value}%` }} />
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
    <main className="min-h-screen bg-[#101820] text-white">
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <div className="absolute inset-0">
          <ExtractionScene settings={settings} metrics={metrics} />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,transparent_0,rgba(16,24,32,0.16)_38%,rgba(16,24,32,0.84)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#101820] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl pt-3">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-sm text-teal-100 backdrop-blur-md">
                <Beaker className="h-4 w-4" />
                Interactive brewing model
              </div>
              <h1 className="text-4xl font-bold tracking-normal text-white sm:text-5xl lg:text-6xl">
                Coffee Extraction Lab
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/72 sm:text-lg">
                Tune the brewing variables and watch the cup move from sharp to sweet to bitter.
                The model is simplified, but the tradeoffs mirror real pour-over decisions.
              </p>
            </div>

            <div className="w-full max-w-md rounded-lg border border-white/12 bg-[#16232b]/82 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-sm text-white/68">
                    <Gauge className="h-4 w-4 text-teal-200" />
                    Extraction
                  </div>
                  <div className="mt-1 text-4xl font-semibold text-white" data-testid="extraction-value">
                    {metrics.extraction.toFixed(1)}%
                  </div>
                </div>
                <div
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    metrics.cup === 'Balanced'
                      ? 'bg-teal-300/18 text-teal-100'
                      : metrics.cup === 'Under-extracted'
                        ? 'bg-rose-300/18 text-rose-100'
                        : 'bg-amber-300/18 text-amber-100'
                  }`}
                >
                  {metrics.cup}
                </div>
              </div>

              <h2 className="text-xl font-semibold text-white">{metrics.headline}</h2>
              <p className="mt-2 text-sm leading-6 text-white/68">{metrics.guidance}</p>

              <div className="mt-5 grid gap-3">
                <StatBar label="Sweetness" value={metrics.sweetness} tone="bg-[#f6c453]" />
                <StatBar label="Acidity" value={metrics.acidity} tone="bg-[#ff6b6b]" />
                <StatBar label="Body" value={metrics.body} tone="bg-[#5eead4]" />
                <StatBar label="Clarity" value={metrics.clarity} tone="bg-[#8bdff0]" />
                <StatBar label="Bitterness" value={metrics.bitterness} tone="bg-[#c084fc]" />
              </div>
            </div>
          </div>

          <div className="mt-auto grid gap-4 pb-3 pt-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="rounded-lg border border-white/12 bg-[#f7efe3]/95 p-4 text-[#2d1810] shadow-2xl shadow-black/25 backdrop-blur-xl">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-teal-700" />
                  <h2 className="text-lg font-semibold">Brew variables</h2>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSettings(defaultLabSettings)}
                  className="gap-2 text-[#2d1810]"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {controls.map((control) => (
                  <label key={control.key} className="block">
                    <span className="mb-2 flex items-center justify-between gap-3 text-sm font-medium">
                      <span>{control.label}</span>
                      <span className="rounded bg-[#2d1810]/8 px-2 py-1 font-mono text-xs">
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
                      className="h-2 w-full cursor-pointer accent-teal-700"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/12 bg-white/10 p-4 backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-amber-200" />
                <h2 className="text-lg font-semibold">Try a profile</h2>
              </div>
              <div className="grid gap-2">
                {recipes.map((recipe) => (
                  <button
                    key={recipe.name}
                    type="button"
                    onClick={() => setSettings(recipe.settings)}
                    className="rounded-md border border-white/12 bg-white/8 p-3 text-left transition hover:bg-white/14"
                  >
                    <span className="block text-sm font-semibold text-white">{recipe.name}</span>
                    <span className="mt-1 block text-xs leading-5 text-white/62">{recipe.description}</span>
                  </button>
                ))}
              </div>
              <Button asChild className="mt-4 w-full bg-teal-500 text-[#102022] hover:bg-teal-400">
                <Link href="/recipes" className="gap-2">
                  <Coffee className="h-4 w-4" />
                  Brew a real recipe
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
