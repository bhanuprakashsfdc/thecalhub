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

export interface Withdrawal401kInput {
  accountBalance: number;
  expectedReturn: number;
  yearsInRetirement: number;
}

export function computeWithdrawal401k(input: Withdrawal401kInput) {
  const balance = Math.max(0, input.accountBalance);
  const years = Math.max(0, Math.floor(input.yearsInRetirement));
  const n = years * 12;
  const r = Math.max(0, input.expectedReturn) / 100 / 12;
  const monthly = n === 0 ? 0 : r === 0 ? balance / n : (balance * r) / (1 - Math.pow(1 + r, -n));
  return {
    monthly,
    annual: monthly * 12,
    total: monthly * n,
    years,
  };
}

export function Withdrawal401kCalculator() {
  const [accountBalance, setAccountBalance] = useState('900000');
  const [expectedReturn, setExpectedReturn] = useState('5');
  const [yearsInRetirement, setYearsInRetirement] = useState('20');

  const result = computeWithdrawal401k({
    accountBalance: Number(accountBalance) || 0,
    expectedReturn: Number(expectedReturn) || 0,
    yearsInRetirement: Number(yearsInRetirement) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="401(k) balance ($)" value={accountBalance} onChange={setAccountBalance} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Expected return (%)" value={expectedReturn} onChange={setExpectedReturn} step="0.1" min={0} />
              <NumberField label="Years in retirement" value={yearsInRetirement} onChange={setYearsInRetirement} min={1} max={60} />
            </div>
          </div>
          <Hint>
            This spends the balance down to zero over the chosen term while the remaining money keeps earning —
            a useful floor for a retirement income plan.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly withdrawal"
            value={`$${formatMoney(result.monthly)}`}
            sub={`Spends the balance over ${result.years} years`}
          />
          <ResultRows>
            <ResultRow label="Annual withdrawal" value={`$${formatMoney(result.annual)}`} />
            <ResultRow label="Total drawn over the term" value={`$${formatMoney(result.total)}`} />
            <ResultRow label="Starting balance" value={`$${formatMoney(Number(accountBalance) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default Withdrawal401kCalculator;
