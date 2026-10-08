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

export interface RetirementAgeInput {
  currentAge: number;
  desiredAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
}

export function computeRetirementAge(input: RetirementAgeInput) {
  const years = Math.max(0, input.desiredAge - input.currentAge);
  const n = years * 12;
  const i = Math.max(0, input.expectedReturn) / 100 / 12;
  const savings = Math.max(0, input.currentSavings);
  const monthly = Math.max(0, input.monthlyContribution);
  const grownSavings = i === 0 ? savings : savings * Math.pow(1 + i, n);
  const grownContributions = i === 0 ? monthly * n : monthly * ((Math.pow(1 + i, n) - 1) / i);
  return {
    years,
    months: n,
    projectedBalance: grownSavings + grownContributions,
    totalContributed: savings + monthly * n,
  };
}

export function RetirementAgeCalculator() {
  const [currentAge, setCurrentAge] = useState('35');
  const [desiredAge, setDesiredAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [expectedReturn, setExpectedReturn] = useState('6');

  const result = computeRetirementAge({
    currentAge: Number(currentAge) || 0,
    desiredAge: Number(desiredAge) || 0,
    currentSavings: Number(currentSavings) || 0,
    monthlyContribution: Number(monthlyContribution) || 0,
    expectedReturn: Number(expectedReturn) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Current age" value={currentAge} onChange={setCurrentAge} min={0} max={100} />
              <NumberField label="Desired retirement age" value={desiredAge} onChange={setDesiredAge} min={0} max={100} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Current savings ($)" value={currentSavings} onChange={setCurrentSavings} min={0} />
              <NumberField label="Monthly contribution ($)" value={monthlyContribution} onChange={setMonthlyContribution} min={0} />
            </div>
            <NumberField label="Expected return (%)" value={expectedReturn} onChange={setExpectedReturn} step="0.1" min={0} />
          </div>
          <Hint>
            Every extra year to retirement adds twelve more compounding periods — pushing the date out often
            helps more than raising contributions.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Years until retirement"
            value={`${result.years} years`}
            sub={`${result.months} months of saving ahead`}
          />
          <ResultRows>
            <ResultRow label="Projected balance" value={`$${formatMoney(result.projectedBalance)}`} />
            <ResultRow label="Total contributed" value={`$${formatMoney(result.totalContributed)}`} />
            <ResultRow label="Growth earned" value={`$${formatMoney(result.projectedBalance - result.totalContributed)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RetirementAgeCalculator;
