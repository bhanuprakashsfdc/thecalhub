import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface SurveySampleInput {
  population: number;
  marginError: number;
  proportion: number;
  zScore: number;
}

export function computeSurveySample(input: SurveySampleInput) {
  const p = Math.min(1, Math.max(0, input.proportion / 100));
  const e = Math.max(0.0001, input.marginError / 100);
  const z = input.zScore;
  const raw = (z * z * p * (1 - p)) / (e * e);
  const corrected = input.population > 0 ? raw / (1 + (raw - 1) / input.population) : raw;
  return { raw, corrected, z };
}

const CONFIDENCE_OPTIONS = [
  { value: '1.645', label: '90% (z = 1.645)' },
  { value: '1.96', label: '95% (z = 1.96)' },
  { value: '2.576', label: '99% (z = 2.576)' },
];

export function SurveySampleCalculator() {
  const [population, setPopulation] = useState('10000');
  const [marginError, setMarginError] = useState('5');
  const [proportion, setProportion] = useState('50');
  const [zScore, setZScore] = useState('1.96');

  const result = computeSurveySample({
    population: Number(population) || 0,
    marginError: Number(marginError) || 0,
    proportion: Number(proportion) || 0,
    zScore: Number(zScore) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField
              label="Confidence level"
              value={zScore}
              onChange={setZScore}
              options={CONFIDENCE_OPTIONS}
            />
            <NumberField label="Population size" value={population} onChange={setPopulation} min={0} />
            <NumberField label="Margin of error (%)" value={marginError} onChange={setMarginError} min={0} step="0.1" />
            <NumberField label="Estimated proportion (%)" value={proportion} onChange={setProportion} min={0} max={100} step="1" />
          </div>
          <Hint>
            Cochran's formula with finite population correction. Use 50% proportion when unknown —
            it maximises the required sample.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Required sample size"
            value={String(Math.ceil(result.corrected))}
            sub="Respondents to survey"
          />
          <ResultRows>
            <ResultRow label="Sample before correction" value={formatMoney(result.raw)} />
            <ResultRow label="Z-score" value={formatMoney(result.z)} />
            <ResultRow label="Margin of error (±%)" value={`${formatMoney(Number(marginError) || 0)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SurveySampleCalculator;
