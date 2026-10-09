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

export interface RothIraInput {
  currentBalance: number;
  annualContribution: number;
  years: number;
  returnRatePct: number;
}

export function computeRothIra(input: RothIraInput) {
  const r = input.returnRatePct / 100 / 12;
  const n = input.years * 12;
  const monthlyContribution = input.annualContribution / 12;
  const growth = Math.pow(1 + r, n);
  const balanceAtMaturity = input.currentBalance * growth;
  const contributionFuture =
    r > 0
      ? monthlyContribution * ((growth - 1) / r) * (1 + r)
      : monthlyContribution * n;
  const total = balanceAtMaturity + contributionFuture;
  const contributions = input.currentBalance + input.annualContribution * input.years;
  const investmentGrowth = total - contributions;
  return { total, contributions, investmentGrowth, balanceAtMaturity };
}

export function RothIraCalculator() {
  const [currentBalance, setCurrentBalance] = useState('10000');
  const [annualContribution, setAnnualContribution] = useState('7000');
  const [years, setYears] = useState('30');
  const [returnRatePct, setReturnRatePct] = useState('8');

  const result = computeRothIra({
    currentBalance: Number(currentBalance) || 0,
    annualContribution: Number(annualContribution) || 0,
    years: Number(years) || 0,
    returnRatePct: Number(returnRatePct) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Current balance ($)" value={currentBalance} onChange={setCurrentBalance} min={0} />
            <NumberField label="Annual contribution ($)" value={annualContribution} onChange={setAnnualContribution} min={0} />
            <NumberField label="Years to grow" value={years} onChange={setYears} min={0} step="1" />
            <NumberField label="Annual return rate (%)" value={returnRatePct} onChange={setReturnRatePct} min={0} step="0.1" />
          </div>
          <Hint>
            Projects a Roth IRA with monthly compounding and
            contributions made at the start of each month. Gains are
            tax-free at retirement.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Future value"
            value={`$${formatMoney(result.total)}`}
            sub="Tax-free at retirement"
          />
          <ResultRows>
            <ResultRow label="Total contributions" value={`$${formatMoney(result.contributions)}`} />
            <ResultRow label="Investment growth" value={`$${formatMoney(result.investmentGrowth)}`} />
            <ResultRow label="Current balance at maturity" value={`$${formatMoney(result.balanceAtMaturity)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RothIraCalculator;
