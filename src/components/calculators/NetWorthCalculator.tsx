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

export interface NetWorthInput {
  assets: number;
  liabilities: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export function computeNetWorth(input: NetWorthInput) {
  const netWorth = input.assets - input.liabilities;
  const netMonthly = input.monthlyIncome - input.monthlyExpenses;
  const netAnnual = netMonthly * 12;
  const savingsRate = input.monthlyIncome > 0 ? (netMonthly / input.monthlyIncome) * 100 : 0;
  return { netWorth, netMonthly, netAnnual, savingsRate };
}

export function NetWorthCalculator() {
  const [assets, setAssets] = useState('250000');
  const [liabilities, setLiabilities] = useState('150000');
  const [monthlyIncome, setMonthlyIncome] = useState('6000');
  const [monthlyExpenses, setMonthlyExpenses] = useState('4000');

  const result = useMemo(
    () =>
      computeNetWorth({
        assets: Number(assets) || 0,
        liabilities: Number(liabilities) || 0,
        monthlyIncome: Number(monthlyIncome) || 0,
        monthlyExpenses: Number(monthlyExpenses) || 0,
      }),
    [assets, liabilities, monthlyIncome, monthlyExpenses]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total assets ($)" value={assets} onChange={setAssets} min={0} step="1000" />
            <NumberField label="Total liabilities ($)" value={liabilities} onChange={setLiabilities} min={0} step="1000" />
            <NumberField label="Monthly income ($)" value={monthlyIncome} onChange={setMonthlyIncome} min={0} step="100" />
            <NumberField label="Monthly expenses ($)" value={monthlyExpenses} onChange={setMonthlyExpenses} min={0} step="100" />
          </div>
          <Hint>
            Net worth is assets minus liabilities. Positive net worth means you own more than you
            owe. Your savings rate shows what share of income you keep each month.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Net worth"
            value={`${formatMoney(result.netWorth)}`}
            sub={`Savings rate ${formatMoney(result.savingsRate)}%`}
          />
          <ResultRows>
            <ResultRow label="Net monthly" value={formatMoney(result.netMonthly)} />
            <ResultRow label="Net annual" value={formatMoney(result.netAnnual)} />
            <ResultRow label="Savings rate" value={`${formatMoney(result.savingsRate)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default NetWorthCalculator;