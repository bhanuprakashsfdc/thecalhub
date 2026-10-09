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

export interface HypothesisTestingInput {
  sampleMean: number;
  populationMean: number;
  stdDev: number;
  sampleSize: number;
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

function normalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

export function computeHypothesisTesting(input: HypothesisTestingInput) {
  const sigma = Math.max(1e-9, input.stdDev);
  const n = Math.max(1, input.sampleSize);
  const standardError = sigma / Math.sqrt(n);
  const z = (input.sampleMean - input.populationMean) / standardError;
  const pValue = 2 * (1 - normalCdf(Math.abs(z)));
  const decision = pValue < 0.05 ? 'Reject H₀' : 'Fail to reject H₀';
  return { standardError, z, pValue, decision };
}

export function HypothesisTestingCalculator() {
  const [sampleMean, setSampleMean] = useState('102');
  const [populationMean, setPopulationMean] = useState('100');
  const [stdDev, setStdDev] = useState('15');
  const [sampleSize, setSampleSize] = useState('30');

  const result = computeHypothesisTesting({
    sampleMean: Number(sampleMean) || 0,
    populationMean: Number(populationMean) || 0,
    stdDev: Number(stdDev) || 0,
    sampleSize: Number(sampleSize) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Sample mean" value={sampleMean} onChange={setSampleMean} step="any" />
            <NumberField label="Population mean" value={populationMean} onChange={setPopulationMean} step="any" />
            <NumberField label="Population std dev" value={stdDev} onChange={setStdDev} min={0} step="any" />
            <NumberField label="Sample size" value={sampleSize} onChange={setSampleSize} min={1} step="1" />
          </div>
          <Hint>
            One-sample z-test, two-tailed. The p-value is the
            probability of a sample mean this extreme if H₀ were true.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="P-value" value={formatMoney(result.pValue)} sub="Two-tailed" />
          <ResultRows>
            <ResultRow label="Z-statistic" value={formatMoney(result.z)} />
            <ResultRow label="Standard error" value={formatMoney(result.standardError)} />
            <ResultRow label="Decision (alpha = 0.05)" value={result.decision} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HypothesisTestingCalculator;
