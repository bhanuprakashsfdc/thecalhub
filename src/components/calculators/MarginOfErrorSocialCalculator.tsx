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

export interface MarginOfErrorSocialInput {
  sampleSize: number;
  proportion: number;
  confidence: '90' | '95' | '99';
}

const Z_SCORE: Record<MarginOfErrorSocialInput['confidence'], number> = {
  '90': 1.645,
  '95': 1.96,
  '99': 2.576,
};

export function computeMarginOfErrorSocial(input: MarginOfErrorSocialInput) {
  const p = Math.min(1, Math.max(0, input.proportion / 100));
  const z = Z_SCORE[input.confidence];
  const se = Math.sqrt((p * (1 - p)) / input.sampleSize);
  const margin = z * se;
  const lower = Math.max(0, p - margin) * 100;
  const upper = Math.min(1, p + margin) * 100;
  return { margin, lower, upper, z, se };
}

export function MarginOfErrorSocialCalculator() {
  const [sampleSize, setSampleSize] = useState('400');
  const [proportion, setProportion] = useState('50');
  const [confidence, setConfidence] = useState<MarginOfErrorSocialInput['confidence']>('95');

  const result = useMemo(
    () =>
      computeMarginOfErrorSocial({
        sampleSize: Number(sampleSize) || 0,
        proportion: Number(proportion) || 0,
        confidence,
      }),
    [sampleSize, proportion, confidence]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Sample size" value={sampleSize} onChange={setSampleSize} min={1} step="1" />
            <NumberField label="Observed proportion (%)" value={proportion} onChange={setProportion} min={0} max={100} step="1" />
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
            Margin of error = z × √(p(1−p) / n). It tells you how far the true population proportion
            could be from your sample observation at the chosen confidence level.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Margin of error"
            value={`${formatMoney(result.margin * 100)}%`}
            sub={`z = ${formatMoney(result.z)}`}
          />
          <ResultRows>
            <ResultRow label="Confidence interval" value={`${formatMoney(result.lower)}% – ${formatMoney(result.upper)}%`} />
            <ResultRow label="Standard error" value={`${formatMoney(result.se * 100)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MarginOfErrorSocialCalculator;