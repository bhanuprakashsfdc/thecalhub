import { useState, useMemo } from 'react';
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

export interface MortgageRefinanceInput {
  currentBalance: number;
  currentRate: number;
  newRate: number;
  remainingYears: number;
  closingCosts: number;
}

export function computeMortgageRefinance(input: MortgageRefinanceInput) {
  const r1 = input.currentRate / 100 / 12;
  const r2 = input.newRate / 100 / 12;
  const n = input.remainingYears * 12;
  const p1 = r1 === 0 ? input.currentBalance / n : (input.currentBalance * r1) / (1 - Math.pow(1 + r1, -n));
  const p2 = r2 === 0 ? input.currentBalance / n : (input.currentBalance * r2) / (1 - Math.pow(1 + r2, -n));
  const monthlySaving = p1 - p2;
  const totalSaving = monthlySaving * n;
  const breakEven = monthlySaving > 0 ? input.closingCosts / monthlySaving : Infinity;
  return { p1, p2, monthlySaving, totalSaving, breakEven };
}

export function MortgageRefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState('250000');
  const [currentRate, setCurrentRate] = useState('6.5');
  const [newRate, setNewRate] = useState('5.25');
  const [remainingYears, setRemainingYears] = useState('20');
  const [closingCosts, setClosingCosts] = useState('4000');

  const result = useMemo(
    () =>
      computeMortgageRefinance({
        currentBalance: Number(currentBalance) || 0,
        currentRate: Number(currentRate) || 0,
        newRate: Number(newRate) || 0,
        remainingYears: Number(remainingYears) || 0,
        closingCosts: Number(closingCosts) || 0,
      }),
    [currentBalance, currentRate, newRate, remainingYears, closingCosts]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Current balance ($)" value={currentBalance} onChange={setCurrentBalance} min={0} step="1000" />
            <NumberField label="Current rate (%)" value={currentRate} onChange={setCurrentRate} min={0} step="0.05" />
            <NumberField label="New rate (%)" value={newRate} onChange={setNewRate} min={0} step="0.05" />
            <NumberField label="Remaining years" value={remainingYears} onChange={setRemainingYears} min={1} step="1" />
            <NumberField label="Closing costs ($)" value={closingCosts} onChange={setClosingCosts} min={0} step="100" />
          </div>
          <Hint>
            Refinancing replaces your existing mortgage with a new one at a lower rate. Compare the
            monthly savings against the closing costs to find the break-even point.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly saving"
            value={`${formatMoney(result.monthlySaving)}`}
            sub={`New payment ${formatMoney(result.p2)}`}
          />
          <ResultRows>
            <ResultRow label="Current payment" value={formatMoney(result.p1)} />
            <ResultRow label="New payment" value={formatMoney(result.p2)} />
            <ResultRow label="Total interest saving" value={formatMoney(result.totalSaving)} />
            <ResultRow label="Break-even (months)" value={result.breakEven === Infinity ? 'N/A' : formatMoney(result.breakEven)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MortgageRefinanceCalculator;