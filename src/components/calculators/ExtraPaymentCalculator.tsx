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

export interface ExtraPaymentInput {
  loanAmount: number;
  annualRate: number;
  termYears: number;
  extraPayment: number;
}

function scheduledPayment(principal: number, annualRate: number, years: number) {
  const n = Math.round(Math.max(0, years) * 12);
  const r = Math.max(0, annualRate) / 100 / 12;
  if (n === 0) return 0;
  if (r === 0) return principal / n;
  const growth = Math.pow(1 + r, n);
  if (growth === 1) return principal / n;
  return (principal * r * growth) / (growth - 1);
}

export function computeExtraPayment(input: ExtraPaymentInput) {
  const loan = Math.max(0, input.loanAmount);
  const years = Math.max(0, input.termYears);
  const extra = Math.max(0, input.extraPayment);
  const n = Math.round(years * 12);
  const r = Math.max(0, input.annualRate) / 100 / 12;
  const basePayment = scheduledPayment(loan, input.annualRate, years);
  const baselineInterest = Math.max(0, basePayment * n - loan);

  const payment = basePayment + extra;
  let balance = loan;
  let months = 0;
  let paid = 0;
  while (balance > 0.005 && months < 1200) {
    const interest = balance * r;
    const due = balance + interest;
    if (payment <= interest) break;
    const pay = Math.min(payment, due);
    balance = due - pay;
    paid += pay;
    months++;
  }

  const interestWithExtra = Math.max(0, paid - loan);
  return {
    basePayment,
    payment,
    baselineInterest,
    interestWithExtra,
    interestSaved: Math.max(0, baselineInterest - interestWithExtra),
    monthsWithExtra: months,
    monthsSaved: Math.max(0, n - months),
  };
}

export function ExtraPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState('250000');
  const [annualRate, setAnnualRate] = useState('6.5');
  const [termYears, setTermYears] = useState('30');
  const [extraPayment, setExtraPayment] = useState('200');

  const result = computeExtraPayment({
    loanAmount: Number(loanAmount) || 0,
    annualRate: Number(annualRate) || 0,
    termYears: Number(termYears) || 0,
    extraPayment: Number(extraPayment) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Loan amount ($)" value={loanAmount} onChange={setLoanAmount} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Annual interest rate (%)" value={annualRate} onChange={setAnnualRate} step="0.1" min={0} />
              <NumberField label="Loan term (years)" value={termYears} onChange={setTermYears} min={1} max={50} />
            </div>
            <NumberField label="Extra monthly payment ($)" value={extraPayment} onChange={setExtraPayment} min={0} />
          </div>
          <Hint>
            Every extra dollar goes straight to principal, which cuts interest for the rest of the loan and pulls
            the payoff date forward.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Interest saved"
            value={`$${formatMoney(result.interestSaved)}`}
            sub={`New payment ${formatMoney(result.payment)} per month`}
          />
          <ResultRows>
            <ResultRow label="Payoff time with extra payment" value={`${formatMoney(result.monthsWithExtra, 0)} months`} />
            <ResultRow label="Months saved" value={formatMoney(result.monthsSaved, 0)} />
            <ResultRow label="Interest without extra payment" value={`$${formatMoney(result.baselineInterest)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ExtraPaymentCalculator;
