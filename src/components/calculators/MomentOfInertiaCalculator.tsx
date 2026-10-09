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

export interface MomentOfInertiaInput {
  mass: number;
  radius: number;
  shape: 'hoop' | 'disc' | 'sphere' | 'rod' | 'cylinder';
  length: number;
}

const SHAPE_FACTOR: Record<MomentOfInertiaInput['shape'], { formula: string; factor: number }> = {
  hoop: { formula: 'MR²', factor: 1 },
  disc: { formula: '½MR²', factor: 0.5 },
  sphere: { formula: '⅖MR²', factor: 0.4 },
  rod: { formula: '¹⁄₁₂ML²', factor: 1 / 12 },
  cylinder: { formula: '½MR²', factor: 0.5 },
};

export function computeMomentOfInertia(input: MomentOfInertiaInput) {
  const def = SHAPE_FACTOR[input.shape];
  let i: number;
  if (input.shape === 'rod') {
    i = def.factor * input.mass * input.length * input.length;
  } else {
    i = def.factor * input.mass * input.radius * input.radius;
  }
  const ke = 0.5 * i; // placeholder, omega assumed 1 rad/s for comparison
  return { i, ke, def };
}

export function MomentOfInertiaCalculator() {
  const [mass, setMass] = useState('2');
  const [radius, setRadius] = useState('0.3');
  const [shape, setShape] = useState<MomentOfInertiaInput['shape']>('sphere');
  const [length, setLength] = useState('1');

  const result = useMemo(
    () =>
      computeMomentOfInertia({
        mass: Number(mass) || 0,
        radius: Number(radius) || 0,
        shape,
        length: Number(length) || 0,
      }),
    [mass, radius, shape, length]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Mass (kg)" value={mass} onChange={setMass} min={0} step="0.1" />
            <NumberField label="Radius (m)" value={radius} onChange={setRadius} min={0} step="0.1" />
            <NumberField label="Length (m)" value={length} onChange={setLength} min={0} step="0.1" />
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Shape</span>
              <div className="flex flex-wrap gap-2">
                {(['hoop', 'disc', 'sphere', 'rod', 'cylinder'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={shape === opt}
                    onClick={() => setShape(opt)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      shape === opt
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
            Moment of inertia depends on mass distribution about the axis. A hoop puts all mass at
            the rim (MR²); a sphere is ⅖MR²; a rod about its centre is ¹⁄₁₂ML².
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Moment of inertia"
            value={`${formatMoney(result.i)} kg·m²`}
            sub={`Formula: ${result.def.formula}`}
          />
          <ResultRows>
            <ResultRow label="Formula" value={result.def.formula} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MomentOfInertiaCalculator;