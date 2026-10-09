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

export interface ConfidenceIntervalInput {
  sampleMean: number;
  stdDev: number;
  sampleSize: number;
  confidence: '90' | '95' | '99';
}

const Z_SCORE: Record<ConfidenceIntervalInput['confidence'], number> = {
  '90': 1.645,
  '95': 1.96,
  '99': 2.576,
};

export function computeConfidenceInterval(input: ConfidenceIntervalInput) {
  const z = Z_SCORE[input.confidence];
  const se = input.sampleSize > 0 ? input.stdDev / Math.sqrt(input.sampleSize) : 0;
  const margin = z * se;
  const lower = input.sampleMean - margin;
  const upper = input.sampleMean + margin;
  return { z, se, margin, lower, upper };
}

export function ConfidenceIntervalCalculator() {
  const [sampleMean, setSampleMean] = useState('100');
  const [stdDev, setStdDev] = useState('15');
  const [sampleSize, setSampleSize] = useState('30');
  const [confidence, setConfidence] = useState<ConfidenceIntervalInput['confidence']>('95');

  const result = useMemo(
    () =>
      computeConfidenceInterval({
        sampleMean: Number(sampleMean) || 0,
        stdDev: Number(stdDev) || 0,
        sampleSize: Number(sampleSize) || 0,
        confidence,
      }),
    [sampleMean, stdDev, sampleSize, confidence]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Sample mean" value={sampleMean} onChange={setSampleMean} step="0.1" />
            <NumberField label="Population std dev" value={stdDev} onChange={setStdDev} min={0} step="0.1" />
            <NumberField label="Sample size" value={sampleSize} onChange={setSampleSize} min={1} step="1" />
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Confidence level</span>
              <div className="flex flex-wrap gap-2">
                {(['90', '95', '99'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={confidence === opt}
                    onClick={() => setConfidence(opt)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      confidence === opt
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                    }`}
                  >
                    {opt}%
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Hint>
            Confidence interval = x̄ ± z* × (σ / √n). The margin shrinks with larger samples and
            wider confidence levels require larger z values.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Margin of error"
            value={formatMoney(result.margin)}
            sub={`CI (${formatMoney(result.lower)}, ${formatMoney(result.upper)})`}
          />
          <ResultRows>
            <ResultRow label="Lower bound" value={formatMoney(result.lower)} />
            <ResultRow label="Upper bound" value={formatMoney(result.upper)} />
            <ResultRow label="Standard error" value={formatMoney(result.se)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ConfidenceIntervalCalculator;