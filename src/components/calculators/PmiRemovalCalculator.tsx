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

export interface PmiRemovalInput {
  homeValue: number;
  loanBalance: number;
}

export function computePmiRemoval(input: PmiRemovalInput) {
  const value = Math.max(0, input.homeValue);
  const balance = Math.max(0, input.loanBalance);
  const ltv = value > 0 ? (balance / value) * 100 : 0;
  const targetBalance = value * 0.8;
  const paydownNeeded = Math.max(0, balance - targetBalance);
  const removable = ltv <= 80;
  return { ltv, targetBalance, paydownNeeded, removable };
}

export function PmiRemovalCalculator() {
  const [homeValue, setHomeValue] = useState('400000');
  const [loanBalance, setLoanBalance] = useState('340000');

  const result = computePmiRemoval({
    homeValue: Number(homeValue) || 0,
    loanBalance: Number(loanBalance) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Home value ($)" value={homeValue} onChange={setHomeValue} min={0} />
            <NumberField label="Current loan balance ($)" value={loanBalance} onChange={setLoanBalance} min={0} />
          </div>
          <Hint>
            Lenders must drop PMI once the balance reaches 78% of the original value, and many allow a request at
            80% once you can document the current value.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Current loan-to-value"
            value={`${formatMoney(result.ltv)}%`}
            sub={result.removable ? 'PMI can be removed now' : 'Pay down to reach 80% LTV'}
          />
          <ResultRows>
            <ResultRow label="Target balance at 80% LTV" value={`$${formatMoney(result.targetBalance)}`} />
            <ResultRow label="Paydown needed" value={`$${formatMoney(result.paydownNeeded)}`} />
            <ResultRow label="PMI removable now" value={result.removable ? 'Yes' : 'No'} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PmiRemovalCalculator;
