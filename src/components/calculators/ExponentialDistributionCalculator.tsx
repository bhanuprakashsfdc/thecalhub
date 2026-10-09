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

export interface ExponentialDistributionInput {
  lambda: number;
  x: number;
}

export function computeExponentialDistribution(input: ExponentialDistributionInput) {
  const lambda = input.lambda;
  const pdf = lambda * Math.exp(-lambda * input.x);
  const cdf = 1 - Math.exp(-lambda * input.x);
  const mean = 1 / (lambda || 1);
  const variance = 1 / ((lambda * lambda) || 1);
  const stdDev = Math.sqrt(variance);
  return { pdf, cdf, mean, variance, stdDev };
}

export function ExponentialDistributionCalculator() {
  const [lambda, setLambda] = useState('0.5');
  const [x, setX] = useState('2');

  const result = useMemo(
    () =>
      computeExponentialDistribution({
        lambda: Number(lambda) || 0,
        x: Number(x) || 0,
      }),
    [lambda, x]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="λ (rate)" value={lambda} onChange={setLambda} min={0} step="0.1" />
            <NumberField label="x" value={x} onChange={setX} min={0} step="0.1" />
          </div>
          <Hint>
            Exponential distribution: PDF = λe^(−λx), CDF = 1 − e^(−λx). Mean = 1/λ, variance =
            1/λ². It models waiting times between independent events.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="CDF"
            value={formatMoney(result.cdf)}
            sub={`PDF ${formatMoney(result.pdf)}`}
          />
          <ResultRows>
            <ResultRow label="PDF" value={formatMoney(result.pdf)} />
            <ResultRow label="Mean" value={formatMoney(result.mean)} />
            <ResultRow label="Variance" value={formatMoney(result.variance)} />
            <ResultRow label="Std dev" value={formatMoney(result.stdDev)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ExponentialDistributionCalculator;