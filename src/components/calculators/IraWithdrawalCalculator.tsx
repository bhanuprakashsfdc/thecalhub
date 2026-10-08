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

export interface IraWithdrawalInput {
  iraBalance: number;
  withdrawalRate: number;
  years: number;
  expectedReturn: number;
}

export function computeIraWithdrawal(input: IraWithdrawalInput) {
  const balance = Math.max(0, input.iraBalance);
  const rate = Math.max(0, input.withdrawalRate) / 100;
  const years = Math.max(0, Math.floor(input.years));
  const growth = Math.max(0, input.expectedReturn) / 100;
  const annualWithdrawal = balance * rate;

  let running = balance;
  let totalWithdrawn = 0;
  let depletedAt = 0;
  for (let y = 1; y <= years; y++) {
    running = running * (1 + growth) - annualWithdrawal;
    totalWithdrawn += annualWithdrawal;
    if (running <= 0) {
      running = 0;
      depletedAt = y;
      break;
    }
  }

  return {
    annualWithdrawal,
    monthlyWithdrawal: annualWithdrawal / 12,
    totalWithdrawn,
    endingBalance: running,
    depletedAt,
    years,
  };
}

export function IraWithdrawalCalculator() {
  const [iraBalance, setIraBalance] = useState('600000');
  const [withdrawalRate, setWithdrawalRate] = useState('4');
  const [years, setYears] = useState('25');
  const [expectedReturn, setExpectedReturn] = useState('5');

  const result = computeIraWithdrawal({
    iraBalance: Number(iraBalance) || 0,
    withdrawalRate: Number(withdrawalRate) || 0,
    years: Number(years) || 0,
    expectedReturn: Number(expectedReturn) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="IRA balance ($)" value={iraBalance} onChange={setIraBalance} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Withdrawal rate (%)" value={withdrawalRate} onChange={setWithdrawalRate} step="0.1" min={0} />
              <NumberField label="Years in retirement" value={years} onChange={setYears} min={1} max={60} />
            </div>
            <NumberField label="Expected return (%)" value={expectedReturn} onChange={setExpectedReturn} step="0.1" min={0} />
          </div>
          <Hint>
            A withdrawal rate above the expected return draws down principal quickly; below it the balance can
            last indefinitely.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Annual withdrawal"
            value={`$${formatMoney(result.annualWithdrawal)}`}
            sub={`$${formatMoney(result.monthlyWithdrawal)} per month`}
          />
          <ResultRows>
            <ResultRow label="Total withdrawn" value={`$${formatMoney(result.totalWithdrawn)}`} />
            <ResultRow
              label="Balance at the end"
              value={result.depletedAt > 0 ? `Depleted in year ${result.depletedAt}` : `$${formatMoney(result.endingBalance)}`}
            />
            <ResultRow label="Years funded" value={`${formatMoney(result.years, 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default IraWithdrawalCalculator;
