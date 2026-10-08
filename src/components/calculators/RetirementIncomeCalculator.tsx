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

export interface RetirementIncomeInput {
  retirementSavings: number;
  withdrawalRate: number;
  annualExpenses: number;
}

export function computeRetirementIncome(input: RetirementIncomeInput) {
  const savings = Math.max(0, input.retirementSavings);
  const rate = Math.max(0, input.withdrawalRate) / 100;
  const expenses = Math.max(0, input.annualExpenses);
  const annualIncome = savings * rate;
  return {
    annualIncome,
    monthlyIncome: annualIncome / 12,
    surplus: annualIncome - expenses,
    dailyIncome: annualIncome / 365,
  };
}

export function RetirementIncomeCalculator() {
  const [retirementSavings, setRetirementSavings] = useState('800000');
  const [withdrawalRate, setWithdrawalRate] = useState('4');
  const [annualExpenses, setAnnualExpenses] = useState('60000');

  const result = computeRetirementIncome({
    retirementSavings: Number(retirementSavings) || 0,
    withdrawalRate: Number(withdrawalRate) || 0,
    annualExpenses: Number(annualExpenses) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Retirement savings ($)" value={retirementSavings} onChange={setRetirementSavings} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Withdrawal rate (%)" value={withdrawalRate} onChange={setWithdrawalRate} step="0.1" min={0} />
              <NumberField label="Annual expenses ($)" value={annualExpenses} onChange={setAnnualExpenses} min={0} />
            </div>
          </div>
          <Hint>
            The classic 4% rule is a starting point: compare the income it produces against your real spending
            before deciding whether the plan holds.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Annual retirement income"
            value={`$${formatMoney(result.annualIncome)}`}
            sub={`$${formatMoney(result.monthlyIncome)} per month`}
          />
          <ResultRows>
            <ResultRow label="Monthly income" value={`$${formatMoney(result.monthlyIncome)}`} />
            <ResultRow
              label="Surplus vs expenses"
              value={`${result.surplus >= 0 ? '' : '-'}$${formatMoney(Math.abs(result.surplus))}`}
            />
            <ResultRow label="Daily income" value={`$${formatMoney(result.dailyIncome)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RetirementIncomeCalculator;
