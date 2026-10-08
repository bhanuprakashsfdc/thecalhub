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

export interface ExpenseTrackInput {
  budget: number;
  spent: number;
  daysElapsed: number;
  daysInMonth: number;
}

export function computeExpenseTrack(input: ExpenseTrackInput) {
  const budget = Math.max(0, input.budget);
  const spent = Math.max(0, input.spent);
  const elapsed = Math.max(0, input.daysElapsed);
  const days = Math.max(0, input.daysInMonth);
  const projected = elapsed > 0 ? (spent / elapsed) * days : 0;
  const usedPercent = budget > 0 ? (spent / budget) * 100 : 0;
  const variance = budget - projected;
  const dailyAverage = elapsed > 0 ? spent / elapsed : 0;

  return { projected, usedPercent, variance, dailyAverage };
}

export function ExpenseTrackCalculator() {
  const [budget, setBudget] = useState('2000');
  const [spent, setSpent] = useState('900');
  const [daysElapsed, setDaysElapsed] = useState('15');
  const [daysInMonth, setDaysInMonth] = useState('30');

  const result = computeExpenseTrack({
    budget: Number(budget) || 0,
    spent: Number(spent) || 0,
    daysElapsed: Number(daysElapsed) || 0,
    daysInMonth: Number(daysInMonth) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Monthly budget ($)" value={budget} onChange={setBudget} min={0} />
              <NumberField label="Spent so far ($)" value={spent} onChange={setSpent} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Days elapsed" value={daysElapsed} onChange={setDaysElapsed} min={0} />
              <NumberField label="Days in month" value={daysInMonth} onChange={setDaysInMonth} min={1} />
            </div>
          </div>
          <Hint>
            Mid-month tracking beats month-end surprises: project your current daily average across the full
            month and compare it with the budget while there is still time to adjust.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Projected month-end spend"
            value={`$${formatMoney(result.projected)}`}
            sub={`Daily average of $${formatMoney(result.dailyAverage)}`}
          />
          <ResultRows>
            <ResultRow label="Budget used" value={`${formatMoney(result.usedPercent)}%`} />
            <ResultRow label="Variance vs budget" value={`$${formatMoney(result.variance)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ExpenseTrackCalculator;
