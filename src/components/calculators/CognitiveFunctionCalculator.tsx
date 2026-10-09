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

export function CognitiveFunctionCalculator() {
  const [score, setScore] = useState('30');
  const [max, setMax] = useState('30');

  const s = Number(score) || 0;
  const m = Number(max) || 0;
  const pct = m > 0 ? (s / m) * 100 : 0;

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Score" value={score} onChange={setScore} min={0} step="0.1" />
            <NumberField label="Max Score" value={max} onChange={setMax} min={1} step="0.1" />
          </div>
          <Hint>Simple percentage-based cognitive function estimate.</Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Percentage" value={`${formatMoney(pct)}%`} />
          <ResultRows>
            <ResultRow label="Score" value={score} />
            <ResultRow label="Max" value={max} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CognitiveFunctionCalculator;
