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

export interface BoxPlotInput {
  q1: number;
  q2: number;
  q3: number;
  min: number;
  max: number;
}

export function computeBoxPlot(input: BoxPlotInput) {
  const iqr = input.q3 - input.q1;
  const lowerFence = input.q1 - 1.5 * iqr;
  const upperFence = input.q3 + 1.5 * iqr;
  const lowerWhisker = Math.max(input.min, lowerFence);
  const upperWhisker = Math.min(input.max, upperFence);
  const outliersLow = input.min < lowerFence ? [input.min] : [];
  const outliersHigh = input.max > upperFence ? [input.max] : [];
  return { iqr, lowerFence, upperFence, lowerWhisker, upperWhisker, outliersLow, outliersHigh };
}

export function BoxPlotCalculator() {
  const [q1, setQ1] = useState('25');
  const [q2, setQ2] = useState('50');
  const [q3, setQ3] = useState('75');
  const [min, setMin] = useState('10');
  const [max, setMax] = useState('90');

  const result = useMemo(
    () =>
      computeBoxPlot({
        q1: Number(q1) || 0,
        q2: Number(q2) || 0,
        q3: Number(q3) || 0,
        min: Number(min) || 0,
        max: Number(max) || 0,
      }),
    [q1, q2, q3, min, max]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Min" value={min} onChange={setMin} step="1" />
            <NumberField label="Q1" value={q1} onChange={setQ1} step="1" />
            <NumberField label="Median (Q2)" value={q2} onChange={setQ2} step="1" />
            <NumberField label="Q3" value={q3} onChange={setQ3} step="1" />
            <NumberField label="Max" value={max} onChange={setMax} step="1" />
          </div>
          <Hint>
            The IQR is Q3 − Q1. Fences are 1.5×IQR outside the quartiles; points beyond are
            outliers. Whiskers extend to the most extreme non-outlier data points.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="IQR"
            value={formatMoney(result.iqr)}
            sub={`Whiskers ${formatMoney(result.lowerWhisker)} – ${formatMoney(result.upperWhisker)}`}
          />
          <ResultRows>
            <ResultRow label="Lower fence" value={formatMoney(result.lowerFence)} />
            <ResultRow label="Upper fence" value={formatMoney(result.upperFence)} />
            <ResultRow label="Lower whisker" value={formatMoney(result.lowerWhisker)} />
            <ResultRow label="Upper whisker" value={formatMoney(result.upperWhisker)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default BoxPlotCalculator;