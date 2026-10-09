import { useState } from 'react';
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

export interface NormalDistributionInput {
  mean: number;
  stdDev: number;
  value: number;
}

function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t -
      0.284496736) *
      t +
      0.254829592) *
    t *
    Math.exp(-ax * ax);
  return sign * y;
}

export function normalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

export function computeNormalDistribution(input: NormalDistributionInput) {
  const sigma = Math.max(1e-9, input.stdDev);
  const z = (input.value - input.mean) / sigma;
  const cdf = normalCdf(z);
  const pdf =
    (1 / (sigma * Math.sqrt(2 * Math.PI))) *
    Math.exp(-(z * z) / 2);
  const percentile = Math.round(cdf * 100);
  return { z, cdf, pdf, percentile };
}

export function NormalDistributionCalculator() {
  const [mean, setMean] = useState('100');
  const [stdDev, setStdDev] = useState('15');
  const [value, setValue] = useState('115');

  const result = computeNormalDistribution({
    mean: Number(mean) || 0,
    stdDev: Number(stdDev) || 0,
    value: Number(value) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Mean" value={mean} onChange={setMean} step="any" />
            <NumberField label="Standard deviation" value={stdDev} onChange={setStdDev} min={0} step="any" />
            <NumberField label="Value (x)" value={value} onChange={setValue} step="any" />
          </div>
          <Hint>
            Standardises x to a z-score, then integrates the
            normal curve to the left of x for the cumulative probability.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Cumulative probability"
            value={`${formatMoney(result.cdf * 100)}%`}
            sub="P(X ≤ x)"
          />
          <ResultRows>
            <ResultRow label="Z-score" value={formatMoney(result.z)} />
            <ResultRow label="Probability density" value={formatMoney(result.pdf)} />
            <ResultRow label="Percentile" value={String(result.percentile)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default NormalDistributionCalculator;
