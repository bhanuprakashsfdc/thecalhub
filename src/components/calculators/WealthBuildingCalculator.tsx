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

export interface WealthBuildingInput {
  currentNetWorth: number;
  monthlyContribution: number;
  annualRate: number;
  targetNetWorth: number;
}

export function computeWealthBuilding(input: WealthBuildingInput) {
  const start = Math.max(0, input.currentNetWorth);
  const contribution = Math.max(0, input.monthlyContribution);
  const r = Math.max(0, input.annualRate) / 100 / 12;
  const target = Math.max(0, input.targetNetWorth);
  let balance = start;
  let months = 0;

  if (target > 0 && balance < target && (contribution > 0 || r > 0)) {
    while (balance < target && months < 600) {
      balance = balance * (1 + r) + contribution;
      months += 1;
    }
    if (balance < target) months = -1;
  }

  const years = months >= 0 ? months / 12 : -1;
  const contributed = months > 0 ? contribution * months : 0;
  const growth = months > 0 ? balance - start - contributed : 0;
  const progress = target > 0 ? (start / target) * 100 : 0;

  return { balance, months, years, contributed, growth, progress };
}

export function WealthBuildingCalculator() {
  const [currentNetWorth, setCurrentNetWorth] = useState('20000');
  const [monthlyContribution, setMonthlyContribution] = useState('1000');
  const [annualRate, setAnnualRate] = useState('7');
  const [targetNetWorth, setTargetNetWorth] = useState('500000');

  const result = computeWealthBuilding({
    currentNetWorth: Number(currentNetWorth) || 0,
    monthlyContribution: Number(monthlyContribution) || 0,
    annualRate: Number(annualRate) || 0,
    targetNetWorth: Number(targetNetWorth) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Current net worth ($)" value={currentNetWorth} onChange={setCurrentNetWorth} min={0} />
            <NumberField label="Monthly contribution ($)" value={monthlyContribution} onChange={setMonthlyContribution} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Annual return (%)" value={annualRate} onChange={setAnnualRate} min={0} step="0.1" />
              <NumberField label="Target net worth ($)" value={targetNetWorth} onChange={setTargetNetWorth} min={0} />
            </div>
          </div>
          <Hint>
            Wealth building is a race between the savings rate and the target: raising the monthly contribution
            shortens the timeline faster than most people expect.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Time to target"
            value={result.months >= 0 ? `${formatMoney(result.years)} years` : 'Not reachable'}
            sub={`From $${formatMoney(Number(currentNetWorth) || 0)} today`}
          />
          <ResultRows>
            <ResultRow label="Months to target" value={result.months >= 0 ? `${result.months}` : '—'} />
            <ResultRow label="Total contributed" value={`$${formatMoney(result.contributed)}`} />
            <ResultRow label="Growth earned" value={`$${formatMoney(result.growth)}`} />
            <ResultRow label="Progress today" value={`${formatMoney(result.progress)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WealthBuildingCalculator;
