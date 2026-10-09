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

export interface InterquartileRangeInput {
  data: string;
}

export function parseDataList(data: string): number[] {
  return data
    .split(/[,\s]+/)
    .map((token) => Number(token))
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b);
}

function medianOf(sorted: number[]): number {
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length === 0) return 0;
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export function computeInterquartileRange(input: InterquartileRangeInput) {
  const sorted = parseDataList(input.data);
  const mid = Math.floor(sorted.length / 2);
  const median = medianOf(sorted);
  const lowerHalf =
    sorted.length % 2 === 0 ? sorted.slice(0, mid) : sorted.slice(0, mid);
  const upperHalf =
    sorted.length % 2 === 0 ? sorted.slice(mid) : sorted.slice(mid + 1);
  const q1 = medianOf(lowerHalf);
  const q3 = medianOf(upperHalf);
  const iqr = q3 - q1;
  const upperFence = q3 + 1.5 * iqr;
  return { q1, median, q3, iqr, upperFence, count: sorted.length };
}

export function InterquartileRangeCalculator() {
  const [data, setData] = useState('5,7,8,10,12,15,18,20,22');

  const result = computeInterquartileRange({ data });

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
              placeholder="e.g. 1, 2, 3, 4, 5"
            />
          </div>
          <Hint>
            Q1 and Q3 are the medians of the lower and upper
            halves; IQR = Q3 − Q1. Outliers sit beyond Q1 − 1.5×IQR or
            Q3 + 1.5×IQR.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Interquartile range"
            value={formatMoney(result.iqr)}
            sub={`${result.count} values`}
          />
          <ResultRows>
            <ResultRow label="First quartile (Q1)" value={formatMoney(result.q1)} />
            <ResultRow label="Median" value={formatMoney(result.median)} />
            <ResultRow label="Third quartile (Q3)" value={formatMoney(result.q3)} />
            <ResultRow label="Upper outlier fence" value={formatMoney(result.upperFence)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default InterquartileRangeCalculator;
