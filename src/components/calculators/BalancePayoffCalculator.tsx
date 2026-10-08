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

export interface BalancePayoffInput {
  balance: number;
  annualRate: number;
  monthlyPayment: number;
}

export function computeBalancePayoff(input: BalancePayoffInput) {
  const loan = Math.max(0, input.balance);
  const payment = Math.max(0, input.monthlyPayment);
  const r = Math.max(0, input.annualRate) / 100 / 12;
  let balance = loan;
  let months = 0;
  let paid = 0;
  let never = false;

  while (balance > 0.005 && months < 1200) {
    const interest = balance * r;
    if (payment <= interest) {
      never = true;
      months = 0;
      paid = 0;
      break;
    }
    const pay = Math.min(payment, balance + interest);
    balance = balance + interest - pay;
    paid += pay;
    months++;
  }

  return { months, totalPaid: paid, totalInterest: Math.max(0, paid - loan), never };
}

export function BalancePayoffCalculator() {
  const [balance, setBalance] = useState('5000');
  const [annualRate, setAnnualRate] = useState('18');
  const [monthlyPayment, setMonthlyPayment] = useState('250');

  const result = computeBalancePayoff({
    balance: Number(balance) || 0,
    annualRate: Number(annualRate) || 0,
    monthlyPayment: Number(monthlyPayment) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Current balance ($)" value={balance} onChange={setBalance} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Annual interest rate (%)" value={annualRate} onChange={setAnnualRate} step="0.1" min={0} />
              <NumberField label="Monthly payment ($)" value={monthlyPayment} onChange={setMonthlyPayment} min={0} />
            </div>
          </div>
          <Hint>
            If the monthly payment is no larger than the interest charged, the balance never shrinks — raise the
            payment to clear the debt.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Time to pay off"
            value={`${formatMoney(result.months, 0)} months`}
            sub={result.never ? 'Payment does not cover the interest' : 'Assuming no new charges'}
          />
          <ResultRows>
            <ResultRow label="Total paid" value={`$${formatMoney(result.totalPaid)}`} />
            <ResultRow label="Total interest" value={`$${formatMoney(result.totalInterest)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default BalancePayoffCalculator;
