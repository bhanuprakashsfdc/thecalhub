import { useState, useMemo } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface DogAgeInput {
  dogYears: number;
  size: 'small' | 'medium' | 'large';
}

const SIZE_FACTOR: Record<DogAgeInput['size'], number> = {
  small: 5.5,
  medium: 6,
  large: 7,
};

export function computeDogAge(input: DogAgeInput) {
  const factor = SIZE_FACTOR[input.size];
  const humanYears = input.dogYears * factor;
  const isPuppy = input.dogYears < 1;
  return { humanYears, factor, isPuppy };
}

export function DogAgeCalculator() {
  const [dogYears, setDogYears] = useState('3');
  const [size, setSize] = useState<DogAgeInput['size']>('medium');

  const result = useMemo(
    () =>
      computeDogAge({
        dogYears: Number(dogYears) || 0,
        size,
      }),
    [dogYears, size]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Dog age (years)" value={dogYears} onChange={setDogYears} min={0} step="0.5" />
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Dog size</span>
              <div className="flex flex-wrap gap-2">
                {(['small', 'medium', 'large'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={size === opt}
                    onClick={() => setSize(opt)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      size === opt
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                    }`}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Hint>
            Dogs do not age linearly — a one-year-old puppy is not the same as a seven-year-old. Small
            breeds mature faster and live longer, so the conversion factor depends on size.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Human age equivalent"
            value={`${formatMoney(result.humanYears)} years`}
            sub={`Factor ${formatMoney(result.factor)}×`}
          />
          <ResultRows>
            <ResultRow label="Dog age" value={`${formatMoney(Number(dogYears))} years`} />
            <ResultRow label="Size factor" value={`${formatMoney(result.factor)}×`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DogAgeCalculator;