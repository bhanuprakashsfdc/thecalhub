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

export interface RetirementSavingsInput {
  currentSavings: number;
  monthlyContribution: number;
  years: number;
  expectedReturn: number;
}

export function computeRetirementSavings(input: RetirementSavingsInput) {
  const savings = Math.max(0, input.currentSavings);
  const monthly = Math.max(0, input.monthlyContribution);
  const n = Math.max(0, Math.floor(input.years)) * 12;
  const i = Math.max(0, input.expectedReturn) / 100 / 12;
  const grownSavings = i === 0 ? savings : savings * Math.pow(1 + i, n);
  const grownContributions = i === 0 ? monthly * n : monthly * ((Math.pow(1 + i, n) - 1) / i);
  const projected = grownSavings + grownContributions;
  const contributed = savings + monthly * n;
  return { projected, contributed, growth: projected - contributed, months: n };
}

export function RetirementSavingsCalculator() {
  const [currentSavings, setCurrentSavings] = useState('10000');
  const [monthlyContribution, setMonthlyContribution] = useState('400');
  const [years, setYears] = useState('25');
  const [expectedReturn, setExpectedReturn] = useState('6');

  const result = computeRetirementSavings({
    currentSavings: Number(currentSavings) || 0,
    monthlyContribution: Number(monthlyContribution) || 0,
    years: Number(years) || 0,
    expectedReturn: Number(expectedReturn) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Current savings ($)" value={currentSavings} onChange={setCurrentSavings} min={0} />
              <NumberField label="Monthly contribution ($)" value={monthlyContribution} onChange={setMonthlyContribution} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Years until retirement" value={years} onChange={setYears} min={1} max={60} />
              <NumberField label="Expected return (%)" value={expectedReturn} onChange={setExpectedReturn} step="0.1" min={0} />
            </div>
          </div>
          <Hint>
            Compounding does most of the heavy lifting late on — the growth row shows how much of your final
            balance you never had to earn yourself.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Projected retirement savings"
            value={`$${formatMoney(result.projected)}`}
            sub={`${formatMoney(result.months, 0)} months of contributions`}
          />
          <ResultRows>
            <ResultRow label="Total contributed" value={`$${formatMoney(result.contributed)}`} />
            <ResultRow label="Investment growth" value={`$${formatMoney(result.growth)}`} />
            <ResultRow label="Growth share of balance" value={`${result.projected > 0 ? formatMoney((result.growth / result.projected) * 100) : '0.00'}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RetirementSavingsCalculator;
