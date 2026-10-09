import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  TextField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface StatisticalMeanInput {
  data: string;
}

export function parseMeanData(data: string): number[] {
  return data
    .split(/[,\s]+/)
    .map((token) => Number(token))
    .filter((n) => Number.isFinite(n));
}

export function computeStatisticalMean(input: StatisticalMeanInput) {
  const values = parseMeanData(input.data);
  const count = values.length;
  const sum = values.reduce((acc, v) => acc + v, 0);
  const mean = count > 0 ? sum / count : 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(count / 2);
  const median =
    count === 0
      ? 0
      : count % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
  const frequency = new Map<number, number>();
  for (const v of values) {
    frequency.set(v, (frequency.get(v) || 0) + 1);
  }
  let mode = 0;
  let maxCount = 0;
  for (const [value, freq] of frequency) {
    if (freq > maxCount || (freq === maxCount && value < mode)) {
      maxCount = freq;
      mode = value;
    }
  }
  const range = count > 0 ? sorted[count - 1] - sorted[0] : 0;
  return { mean, median, mode, range, count };
}

export function StatisticalMeanCalculator() {
  const [data, setData] = useState('2,4,4,4,5,5,7,9');

  const result = computeStatisticalMean({ data });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <TextField
              label="Data set (comma-separated)"
              value={data}
              onChange={setData}
              placeholder="e.g. 2, 4, 4, 4, 5"
            />
          </div>
          <Hint>
            The mean is the arithmetic average. The mode is the
            most frequent value (smallest one if tied).
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Mean" value={formatMoney(result.mean)} sub="Arithmetic average" />
          <ResultRows>
            <ResultRow label="Median" value={formatMoney(result.median)} />
            <ResultRow label="Mode" value={formatMoney(result.mode)} />
            <ResultRow label="Range" value={formatMoney(result.range)} />
            <ResultRow label="Count" value={String(result.count)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StatisticalMeanCalculator;
