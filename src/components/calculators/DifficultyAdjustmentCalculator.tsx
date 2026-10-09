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

export interface DifficultyAdjustmentInput {
  previousDifficulty: number;
  targetMinutes: number;
  actualMinutes: number;
}

export function computeDifficultyAdjustment(input: DifficultyAdjustmentInput) {
  const target = input.targetMinutes > 0 ? input.targetMinutes : 1;
  const actual = input.actualMinutes > 0 ? input.actualMinutes : 1;
  const rawRatio = target / actual;
  const ratio = Math.min(4, Math.max(0.25, rawRatio));
  const difficulty = input.previousDifficulty * ratio;
  const change = (ratio - 1) * 100;
  return { ratio, difficulty, change, rawRatio };
}

export function DifficultyAdjustmentCalculator() {
  const [previousDifficulty, setPreviousDifficulty] = useState('15000');
  const [targetMinutes, setTargetMinutes] = useState('10');
  const [actualMinutes, setActualMinutes] = useState('12');

  const result = computeDifficultyAdjustment({
    previousDifficulty: Number(previousDifficulty) || 0,
    targetMinutes: Number(targetMinutes) || 0,
    actualMinutes: Number(actualMinutes) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Previous difficulty" value={previousDifficulty} onChange={setPreviousDifficulty} min={0} />
            <NumberField label="Target block time (minutes)" value={targetMinutes} onChange={setTargetMinutes} min={0} step="0.5" />
            <NumberField label="Actual block time (minutes)" value={actualMinutes} onChange={setActualMinutes} min={0} step="0.5" />
          </div>
          <Hint>
            Bitcoin-style adjustment: new difficulty = previous × (target ÷ actual), clamped to a 4×
            band in either direction so the network never over-corrects.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Adjusted difficulty"
            value={formatMoney(result.difficulty)}
            sub="After 2016-block retarget"
          />
          <ResultRows>
            <ResultRow label="Adjustment ratio" value={formatMoney(result.ratio)} />
            <ResultRow label="Difficulty change (%)" value={`${formatMoney(result.change)}%`} />
            <ResultRow label="Unclamped ratio" value={formatMoney(result.rawRatio)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DifficultyAdjustmentCalculator;
