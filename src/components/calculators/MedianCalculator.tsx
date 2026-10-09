import { useState, useMemo } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface MedianInput {
  values: string;
}

export function computeMedian(input: MedianInput) {
  const nums = input.values.split(/[,;\s]+/)    .map(Number).filter((n) => Number.isFinite(n)).sort((a, b) => a - b);
  if (nums.length === 0) return { median: 0, count: 0, sorted: [] };
  const mid = Math.floor(nums.length / 2);
  const median = nums.length % 2 === 0 ? (nums[mid - 1] + nums[mid]) / 2 : nums[mid];
  return { median, count: nums.length, sorted: nums };
}

export function MedianCalculator() {
  const [values, setValues] = useState('3, 7, 8, 5, 12, 14, 21, 13, 18');

  const result = useMemo(
    () =>
      computeMedian({
        values,
      }),
    [values]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Values</span>
              <textarea
                aria-label="Values"
                className="w-full h-32 bg-surface-container-highest border border-white/5 rounded-lg p-4 text-white font-mono text-lg outline-none focus:border-primary-fixed/50 resize-none"
                value={values}
                onChange={(e) => setValues(e.target.value)}
              />
            </div>
          </div>
          <Hint>
            The median is the middle value when the data is sorted. For an even count it is the
            average of the two middle values. Enter numbers separated by commas, semicolons or
            spaces.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Median"
            value={formatMoney(result.median)}
            sub={`${result.count} values`}
          />
          <ResultRows>
            <ResultRow label="Count" value={`${result.count}`} />
            <ResultRow label="Sorted" value={result.sorted.join(', ')} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MedianCalculator;