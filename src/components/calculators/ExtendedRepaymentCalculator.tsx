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

export interface ExtendedRepaymentInput {
  balance: number;
  ratePercent: number;
  years: number;
  interestOnlyMonths: number;
}

export function computeExtendedRepayment(input: ExtendedRepaymentInput) {
  const balance = Math.max(0, input.balance);
  const r = Math.max(0, input.ratePercent) / 100 / 12;
  const n = Math.max(0, Math.floor(input.years * 12));
  const interestOnly = Math.min(Math.max(0, Math.floor(input.interestOnlyMonths)), n);
  const interestOnlyPayment = balance * r;
  const remaining = n - interestOnly;
  const payment =
    remaining > 0 ? (r === 0 ? balance / remaining : (balance * r) / (1 - Math.pow(1 + r, -remaining))) : 0;
  const amortTotal = payment * remaining;
  const totalInterest = interestOnlyPayment * interestOnly + (amortTotal - balance);
  const totalPaid = interestOnlyPayment * interestOnly + amortTotal;

  return { interestOnlyPayment, payment, totalInterest, totalPaid, interestOnly, remaining };
}

export function ExtendedRepaymentCalculator() {
  const [balance, setBalance] = useState('40000');
  const [ratePercent, setRatePercent] = useState('6.5');
  const [years, setYears] = useState('25');
  const [interestOnlyMonths, setInterestOnlyMonths] = useState('12');

  const result = computeExtendedRepayment({
    balance: Number(balance) || 0,
    ratePercent: Number(ratePercent) || 0,
    years: Number(years) || 0,
    interestOnlyMonths: Number(interestOnlyMonths) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Loan balance ($)" value={balance} onChange={setBalance} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Annual rate (%)" value={ratePercent} onChange={setRatePercent} min={0} step="0.1" />
              <NumberField label="Term (years)" value={years} onChange={setYears} min={1} />
            </div>
            <NumberField
              label="Interest-only months"
              value={interestOnlyMonths}
              onChange={setInterestOnlyMonths}
              min={0}
            />
          </div>
          <Hint>
            Extended plans stretch payments over 25 years to lower the monthly bill. Time spent paying only
            interest keeps cash free but adds interest that never shrinks the balance.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly payment"
            value={`$${formatMoney(result.payment)}`}
            sub={`After ${result.interestOnly} interest-only month(s)`}
          />
          <ResultRows>
            <ResultRow label="Interest-only payment" value={`$${formatMoney(result.interestOnlyPayment)}`} />
            <ResultRow label="Total interest" value={`$${formatMoney(result.totalInterest)}`} />
            <ResultRow label="Total repaid" value={`$${formatMoney(result.totalPaid)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ExtendedRepaymentCalculator;
