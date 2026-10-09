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

export interface FallRiskInput {
  history: string;
  secondary: string;
  aid: string;
  iv: string;
  gait: string;
  mental: string;
}

export interface FallRiskResult {
  total: number;
  band: string;
  contributing: number;
  topFactor: string;
  topPoints: number;
  percentOfMax: number;
}

const FACTORS: Array<{ key: keyof FallRiskInput; label: string; options: Array<{ value: string; label: string; points: number }> }> = [
  {
    key: 'history',
    label: 'History of falling',
    options: [
      { value: 'no', label: 'No', points: 0 },
      { value: 'yes', label: 'Yes', points: 25 },
    ],
  },
  {
    key: 'secondary',
    label: 'Secondary diagnosis',
    options: [
      { value: 'no', label: 'No', points: 0 },
      { value: 'yes', label: 'Yes', points: 15 },
    ],
  },
  {
    key: 'aid',
    label: 'Ambulatory aid',
    options: [
      { value: 'none', label: 'None / bed rest / crutches, cane or walker', points: 0 },
      { value: 'furniture', label: 'Furniture for balance', points: 15 },
    ],
  },
  {
    key: 'iv',
    label: 'IV therapy or heparin lock',
    options: [
      { value: 'no', label: 'No', points: 0 },
      { value: 'yes', label: 'Yes', points: 20 },
    ],
  },
  {
    key: 'gait',
    label: 'Gait',
    options: [
      { value: 'normal', label: 'Normal / bed rest / wheelchair', points: 0 },
      { value: 'weak', label: 'Weak', points: 10 },
      { value: 'impaired', label: 'Impaired', points: 20 },
    ],
  },
  {
    key: 'mental',
    label: 'Mental status',
    options: [
      { value: 'aware', label: 'Aware of own abilities', points: 0 },
      { value: 'overlooks', label: 'Forgets or overlooks limitations', points: 15 },
    ],
  },
];

const MAX_TOTAL = 125;

const pointsFor = (key: keyof FallRiskInput, value: string) =>
  FACTORS.find((factor) => factor.key === key)?.options.find((option) => option.value === value)?.points ?? 0;

export function computeFallRisk(input: FallRiskInput): FallRiskResult {
  const rows = FACTORS.map((factor) => ({
    label: factor.label,
    points: pointsFor(factor.key, input[factor.key] ?? ''),
  }));
  const total = rows.reduce((sum, row) => sum + row.points, 0);
  const top = rows.reduce((best, row) => (row.points > best.points ? row : best), rows[0] ?? { label: '', points: 0 });

  return {
    total,
    band: total >= 45 ? 'Very high risk' : total >= 25 ? 'High risk' : 'Low risk',
    contributing: rows.filter((row) => row.points > 0).length,
    topFactor: total > 0 ? top.label : 'None',
    topPoints: total > 0 ? top.points : 0,
    percentOfMax: safeDiv(total, MAX_TOTAL) * 100,
  };
}

export function FallRiskCalculator() {
  const [answers, setAnswers] = useState<Record<string, string>>({
    history: 'no',
    secondary: 'yes',
    aid: 'none',
    iv: 'no',
    gait: 'normal',
    mental: 'aware',
  });

  const result = computeFallRisk({
    history: answers.history,
    secondary: answers.secondary,
    aid: answers.aid,
    iv: answers.iv,
    gait: answers.gait,
    mental: answers.mental,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-4">
            {FACTORS.map((factor) => (
              <SelectField
                key={factor.key}
                label={factor.label}
                value={answers[factor.key] ?? ''}
                onChange={(value) => setAnswers((prev) => ({ ...prev, [factor.key]: value }))}
                options={factor.options.map(({ value, label }) => ({ value, label }))}
              />
            ))}
          </div>
          <Hint>
            The Morse Fall Scale awards 0 to 25 points per item and sums all six factors, giving a total between
            0 and 125.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Morse Fall Scale score"
            value={`${result.total} / ${MAX_TOTAL}`}
            sub={result.band}
          />
          <ResultRows>
            <ResultRow label="Risk band" value={result.band} />
            <ResultRow label="Contributing factors" value={`${result.contributing} of ${FACTORS.length}`} />
            <ResultRow
              label="Top contributing factor"
              value={result.topPoints > 0 ? `${result.topFactor} (${result.topPoints})` : 'None'}
            />
            <ResultRow label="Percent of maximum score" value={`${formatMoney(result.percentOfMax)}%`} />
            <ResultRow
              label="Fall precautions recommended"
              value={result.total >= 25 ? 'Yes' : 'No'}
            />
          </ResultRows>
          <Hint>
            Totals of 0 to 24 are treated as low risk, 25 to 44 as high risk, and 45 or above as very high risk,
            with stricter precautions required as the score climbs.
          </Hint>
        </Panel>
      }
    />
  );
}

export default FallRiskCalculator;
