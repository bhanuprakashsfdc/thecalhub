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
} from './kit';

function uuidv4(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export interface UUIDGeneratorInput {
  version: 'v4' | 'v1' | 'v7';
  count: number;
}

export function computeUUID(input: UUIDGeneratorInput) {
  const ids: string[] = [];
  for (let i = 0; i < input.count; i++) {
    ids.push(uuidv4());
  }
  return { ids };
}

export function UUIDGeneratorCalculator() {
  const [version, setVersion] = useState<UUIDGeneratorInput['version']>('v4');
  const [count, setCount] = useState('1');

  const result = useMemo(
    () =>
      computeUUID({
        version,
        count: Math.max(1, Math.min(10, Number(count) || 1)),
      }),
    [version, count]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">UUID version</span>
              <div className="flex flex-wrap gap-2">
                {(['v4', 'v1', 'v7'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={version === opt}
                    onClick={() => setVersion(opt)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      version === opt
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <NumberField label="How many" value={count} onChange={setCount} min={1} max={10} step="1" />
          </div>
          <Hint>
            UUIDs are 128-bit identifiers. v4 is fully random, v1 is time-based, and v7 embeds a Unix
            timestamp. Generate one or several for testing, seeding or debugging.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Generated UUIDs"
            value={`${result.ids.length}`}
          />
          <ResultRows>
            {result.ids.map((id, i) => (
              <ResultRow key={id} label={i === 0 ? 'UUID' : `UUID ${i + 1}`} value={id} />
            ))}
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default UUIDGeneratorCalculator;