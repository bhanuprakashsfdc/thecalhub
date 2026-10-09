import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
  safeDiv,
} from './kit';

export interface PressureUlcerRiskInput {
  sensory: number;
  moisture: number;
  activity: number;
  mobility: number;
  nutrition: number;
  friction: number;
}

export interface PressureUlcerRiskResult {
  total: number;
  band: string;
  deficit: number;
  atRisk: number;
  lowestArea: string;
  lowestScore: number;
}

const fourPoint = [
  { value: '1', label: '1 — Completely limited' },
  { value: '2', label: '2 — Very limited' },
  { value: '3', label: '3 — Slightly limited' },
  { value: '4', label: '4 — No impairment' },
];

const frictionOptions = [
  { value: '1', label: '1 — Problem' },
  { value: '2', label: '2 — Potential problem' },
  { value: '3', label: '3 — No apparent problem' },
];

const SUBSCALES: Array<{ key: keyof PressureUlcerRiskInput; label: string; options: Array<{ value: string; label: string }>; min: number; max: number }> = [
  { key: 'sensory', label: 'Sensory perception', options: fourPoint, min: 1, max: 4 },
  { key: 'moisture', label: 'Moisture', options: fourPoint, min: 1, max: 4 },
  { key: 'activity', label: 'Activity', options: fourPoint, min: 1, max: 4 },
  { key: 'mobility', label: 'Mobility', options: fourPoint, min: 1, max: 4 },
  { key: 'nutrition', label: 'Nutrition', options: fourPoint, min: 1, max: 4 },
  { key: 'friction', label: 'Friction and shear', options: frictionOptions, min: 1, max: 3 },
];

const MAX_TOTAL = 23;

const clampSubscale = (raw: number, min: number, max: number) =>
  Number.isFinite(raw) ? Math.min(max, Math.max(min, raw)) : min;

const bandFor = (total: number) => {
  if (total <= 9) return 'Very high risk';
  if (total <= 12) return 'High risk';
  if (total <= 14) return 'Moderate risk';
  if (total <= 18) return 'Mild risk';
  return 'No significant risk';
};

export function computePressureUlcerRisk(input: PressureUlcerRiskInput): PressureUlcerRiskResult {
  const scores = SUBSCALES.map((subscale) => ({
    label: subscale.label,
    score: clampSubscale(Number(input[subscale.key]), subscale.min, subscale.max),
  }));
  const total = scores.reduce((sum, row) => sum + row.score, 0);
  const lowest = scores.reduce((best, row) => (row.score < best.score ? row : best), scores[0]);

  return {
    total,
    band: bandFor(total),
    deficit: MAX_TOTAL - total,
    atRisk: scores.filter((row) => row.score <= 2).length,
    lowestArea: lowest.label,
    lowestScore: lowest.score,
  };
}

export function PressureUlcerRiskCalculator() {
  const [answers, setAnswers] = useState<Record<string, string>>({
    sensory: '3',
    moisture: '3',
    activity: '3',
    mobility: '3',
    nutrition: '3',
    friction: '2',
  });

  const result = computePressureUlcerRisk({
    sensory: Number(answers.sensory),
    moisture: Number(answers.moisture),
    activity: Number(answers.activity),
    mobility: Number(answers.mobility),
    nutrition: Number(answers.nutrition),
    friction: Number(answers.friction),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-4">
            {SUBSCALES.map((subscale) => (
              <SelectField
                key={subscale.key}
                label={subscale.label}
                value={answers[subscale.key] ?? ''}
                onChange={(value) => setAnswers((prev) => ({ ...prev, [subscale.key]: value }))}
                options={subscale.options}
              />
            ))}
          </div>
          <Hint>
            The Braden Scale rates four subscales from 1 to 4 and friction and shear from 1 to 3, so the total
            runs from 6 (worst) to 23 (best).
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Braden Scale score"
            value={`${result.total} / ${MAX_TOTAL}`}
            sub={result.band}
          />
          <ResultRows>
            <ResultRow label="Risk band" value={result.band} />
            <ResultRow label="Points below maximum" value={`${result.deficit} of ${23 - 6}`} />
            <ResultRow label="Subscales at risk (1 or 2)" value={`${result.atRisk} of ${SUBSCALES.length}`} />
            <ResultRow
              label="Lowest scoring area"
              value={`${result.lowestArea} (${result.lowestScore})`}
            />
            <ResultRow
              label="Average subscale score"
              value={formatMoney(safeDiv(result.total, SUBSCALES.length))}
            />
          </ResultRows>
          <Hint>
            Lower totals mean higher risk: 9 or below is very high risk, 10 to 12 high, 13 to 14 moderate, 15 to
            18 mild, and 19 or more shows no significant risk.
          </Hint>
        </Panel>
      }
    />
  );
}

export default PressureUlcerRiskCalculator;
