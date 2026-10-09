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

export interface CreditCardPayoffInput {
  balance: number;
  rate: number;
  payment: number;
}

export function computeCreditCardPayoff(input: CreditCardPayoffInput) {
  const r = input.rate / 100 / 12;
  let months = 0;
  let balance = input.balance;
  let totalInterest = 0;
  while (balance > 0 && months < 600) {
    const interest = balance * r;
    const principalPaid = Math.min(input.payment - interest, balance);
    balance -= principalPaid;
    totalInterest += interest;
    months++;
  }
  const totalPaid = input.balance + totalInterest;
  return { months, totalInterest, totalPaid, paidOff: balance <= 0 };
}

export function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState('5000');
  const [rate, setRate] = useState('18');
  const [payment, setPayment] = useState('200');

  const result = useMemo(
    () =>
      computeCreditCardPayoff({
        balance: Number(balance) || 0,
        rate: Number(rate) || 0,
        payment: Number(payment) || 0,
      }),
    [balance, rate, payment]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Current balance ($)" value={balance} onChange={setBalance} min={0} step="100" />
            <NumberField label="APR (%)" value={rate} onChange={setRate} min={0} step="0.1" />
            <NumberField label="Monthly payment ($)" value={payment} onChange={setPayment} min={0} step="10" />
          </div>
          <Hint>
            Credit card debt compounds monthly. Paying more than the interest each month reduces
            the principal; the payoff time is found by iterating until the balance reaches zero.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Months to payoff"
            value={`${result.months}`}
            sub={result.paidOff ? 'Paid off' : 'Not paid off in 600 months'}
          />
          <ResultRows>
            <ResultRow label="Total interest" value={formatMoney(result.totalInterest)} />
            <ResultRow label="Total paid" value={formatMoney(result.totalPaid)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CreditCardPayoffCalculator;