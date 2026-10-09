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

export interface DifferenceInput {
  valueA: number;
  valueB: number;
}

export function computeDifference(input: DifferenceInput) {
  const absolute = Math.abs(input.valueA - input.valueB);
  const average = (Math.abs(input.valueA) + Math.abs(input.valueB)) / 2 === 0 ? 0 : (input.valueA + input.valueB) / 2;
  const percentDifference =
    average !== 0 ? (absolute / Math.abs(average)) * 100 : 0;
  const percentChange = input.valueA !== 0 ? ((input.valueB - input.valueA) / Math.abs(input.valueA)) * 100 : 0;
  return { absolute, average, percentDifference, percentChange };
}

export function DifferenceCalculator() {
  const [valueA, setValueA] = useState('25');
  const [valueB, setValueB] = useState('75');

  const result = computeDifference({
    valueA: Number(valueA) || 0,
    valueB: Number(valueB) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Value A" value={valueA} onChange={setValueA} step="any" />
            <NumberField label="Value B" value={valueB} onChange={setValueB} step="any" />
          </div>
          <Hint>
            Percent difference compares two values against their average (symmetric).
            Percent change measures A → B directionally.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Percent difference"
            value={`${formatMoney(result.percentDifference)}%`}
            sub="Relative to the average"
          />
          <ResultRows>
            <ResultRow label="Absolute difference" value={formatMoney(result.absolute)} />
            <ResultRow label="Percent change (A to B)" value={`${formatMoney(result.percentChange)}%`} />
            <ResultRow label="Average of values" value={formatMoney(result.average)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DifferenceCalculator;
