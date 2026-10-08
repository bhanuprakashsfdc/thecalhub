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

export interface SavingsGrowthInput {
  startingBalance: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
}

export function computeSavingsGrowth(input: SavingsGrowthInput) {
  const r = Math.max(0, input.annualRate) / 100 / 12;
  const n = Math.max(0, Math.floor(input.years * 12));
  const growth = Math.pow(1 + r, n);
  const start = Math.max(0, input.startingBalance);
  const contribution = Math.max(0, input.monthlyContribution);
  const futureValue = r > 0 ? start * growth + contribution * ((growth - 1) / r) : start + contribution * n;
  const contributed = contribution * n;
  const interest = futureValue - start - contributed;

  return { futureValue, contributed, interest, growth };
}

export function SavingsGrowthCalculator() {
  const [startingBalance, setStartingBalance] = useState('5000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [annualRate, setAnnualRate] = useState('6');
  const [years, setYears] = useState('10');

  const result = computeSavingsGrowth({
    startingBalance: Number(startingBalance) || 0,
    monthlyContribution: Number(monthlyContribution) || 0,
    annualRate: Number(annualRate) || 0,
    years: Number(years) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Starting balance ($)" value={startingBalance} onChange={setStartingBalance} min={0} />
            <NumberField label="Monthly contribution ($)" value={monthlyContribution} onChange={setMonthlyContribution} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Annual return (%)" value={annualRate} onChange={setAnnualRate} min={0} step="0.1" />
              <NumberField label="Years" value={years} onChange={setYears} min={1} />
            </div>
          </div>
          <Hint>
            Contributions matter as much as returns in the early years: raising the monthly deposit usually
            beats hunting for a slightly higher rate.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Future value"
            value={`$${formatMoney(result.futureValue)}`}
            sub={`After ${years} year(s) of compounding`}
          />
          <ResultRows>
            <ResultRow label="Total contributed" value={`$${formatMoney(result.contributed)}`} />
            <ResultRow label="Interest earned" value={`$${formatMoney(result.interest)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SavingsGrowthCalculator;
