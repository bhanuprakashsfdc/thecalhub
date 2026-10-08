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

export interface RetirementGoalInput {
  desiredMonthlyIncome: number;
  yearsInRetirement: number;
  expectedReturn: number;
}

export function computeRetirementGoal(input: RetirementGoalInput) {
  const monthly = Math.max(0, input.desiredMonthlyIncome);
  const n = Math.max(0, Math.floor(input.yearsInRetirement)) * 12;
  const r = Math.max(0, input.expectedReturn) / 100 / 12;
  const nestEgg = n === 0 ? 0 : r === 0 ? monthly * n : (monthly * (1 - Math.pow(1 + r, -n))) / r;
  return { nestEgg, monthly, totalIncome: monthly * n, years: Math.floor(input.yearsInRetirement) };
}

export function RetirementGoalCalculator() {
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState('4000');
  const [yearsInRetirement, setYearsInRetirement] = useState('25');
  const [expectedReturn, setExpectedReturn] = useState('5');

  const result = computeRetirementGoal({
    desiredMonthlyIncome: Number(desiredMonthlyIncome) || 0,
    yearsInRetirement: Number(yearsInRetirement) || 0,
    expectedReturn: Number(expectedReturn) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Desired monthly income ($)" value={desiredMonthlyIncome} onChange={setDesiredMonthlyIncome} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Years in retirement" value={yearsInRetirement} onChange={setYearsInRetirement} min={1} max={60} />
              <NumberField label="Expected return (%)" value={expectedReturn} onChange={setExpectedReturn} step="0.1" min={0} />
            </div>
          </div>
          <Hint>
            The nest egg needed is the present value of every monthly payment — a higher expected return during
            retirement shrinks the pile you must save.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Nest egg needed"
            value={`$${formatMoney(result.nestEgg)}`}
            sub={`To pay $${formatMoney(result.monthly)} a month`}
          />
          <ResultRows>
            <ResultRow label="Total income over retirement" value={`$${formatMoney(result.totalIncome)}`} />
            <ResultRow label="Annual income target" value={`$${formatMoney(result.monthly * 12)}`} />
            <ResultRow label="Years covered" value={`${formatMoney(result.years, 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RetirementGoalCalculator;
