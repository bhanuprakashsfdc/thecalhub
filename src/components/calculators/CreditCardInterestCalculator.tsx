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

export interface CreditCardInterestInput {
  balance: number;
  rate: number;
  payment: number;
  months: number;
}

export function computeCreditCardInterest(input: CreditCardInterestInput) {
  const r = input.rate / 100 / 12;
  let balance = input.balance;
  let totalInterest = 0;
  for (let i = 0; i < input.months; i++) {
    const interest = balance * r;
    balance += interest - input.payment;
    if (balance <= 0) break;
    totalInterest += interest;
  }
  const remaining = Math.max(0, balance);
  const paid = input.balance - remaining + totalInterest;
  return { totalInterest, remaining, paid };
}

export function CreditCardInterestCalculator() {
  const [balance, setBalance] = useState('5000');
  const [rate, setRate] = useState('18');
  const [payment, setPayment] = useState('150');
  const [months, setMonths] = useState('12');

  const result = useMemo(
    () =>
      computeCreditCardInterest({
        balance: Number(balance) || 0,
        rate: Number(rate) || 0,
        payment: Number(payment) || 0,
        months: Number(months) || 0,
      }),
    [balance, rate, payment, months]
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
            <NumberField label="Months to project" value={months} onChange={setMonths} min={1} step="1" />
          </div>
          <Hint>
            Credit card interest compounds monthly on the unpaid balance. Making only the minimum
            payment can take years to clear the debt and cost many times the original balance.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total interest paid"
            value={`${formatMoney(result.totalInterest)}`}
            sub={`Remaining ${formatMoney(result.remaining)}`}
          />
          <ResultRows>
            <ResultRow label="Total paid" value={formatMoney(result.paid)} />
            <ResultRow label="Remaining balance" value={formatMoney(result.remaining)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CreditCardInterestCalculator;