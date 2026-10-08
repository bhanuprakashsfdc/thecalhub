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

export interface ExpInput {
  currentExp: number;
  expToLevel: number;
  expPerHour: number;
}

export function computeExp(input: ExpInput) {
  const current = Math.max(0, input.currentExp);
  const needed = Math.max(0, input.expToLevel);
  const rate = Math.max(0, input.expPerHour);

  const remaining = Math.max(0, needed - current);
  const hours = rate > 0 ? remaining / rate : 0;
  const minutes = hours * 60;
  const perMinute = rate / 60;

  return { remaining, hours, minutes, perMinute };
}

export function ExpCalculator() {
  const [currentExp, setCurrentExp] = useState('4500');
  const [expToLevel, setExpToLevel] = useState('10000');
  const [expPerHour, setExpPerHour] = useState('2500');

  const result = computeExp({
    currentExp: Number(currentExp) || 0,
    expToLevel: Number(expToLevel) || 0,
    expPerHour: Number(expPerHour) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Current EXP" value={currentExp} onChange={setCurrentExp} min={0} />
            <NumberField label="EXP for next level" value={expToLevel} onChange={setExpToLevel} min={0} />
            <NumberField label="EXP earned per hour" value={expPerHour} onChange={setExpPerHour} min={0} />
          </div>
          <Hint>
            Divide the EXP you still need by your farming rate to get the grind: remaining EXP ÷ EXP per hour.
            Set the rate to 0 to park the estimate.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Time to level up"
            value={`${formatMoney(result.hours)} h`}
            sub={`${formatMoney(result.minutes)} minutes of play`}
          />
          <ResultRows>
            <ResultRow label="EXP remaining" value={formatMoney(result.remaining)} />
            <ResultRow label="Minutes required" value={formatMoney(result.minutes)} />
            <ResultRow label="EXP per minute" value={formatMoney(result.perMinute)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ExpCalculator;
