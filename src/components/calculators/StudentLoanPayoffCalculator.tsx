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

export interface StudentLoanPayoffInput {
  balance: number;
  ratePercent: number;
  termMonths: number;
  extraPayment: number;
}

function amortisedPayment(balance: number, r: number, months: number) {
  if (months <= 0 || balance <= 0) return 0;
  return r === 0 ? balance / months : (balance * r) / (1 - Math.pow(1 + r, -months));
}

function simulatePayoff(balance: number, r: number, payment: number) {
  let remaining = balance;
  let totalPaid = 0;
  let months = 0;
  if (payment <= 0 || remaining <= 0) return { months: 0, totalInterest: 0 };
  while (remaining > 0 && months < 1200) {
    const interest = remaining * r;
    if (payment <= interest) return { months: 0, totalInterest: 0 };
    const principal = payment - interest;
    if (principal >= remaining) {
      totalPaid += remaining + interest;
      remaining = 0;
      months += 1;
    } else {
      remaining -= principal;
      totalPaid += payment;
      months += 1;
    }
  }
  return { months, totalInterest: totalPaid - balance };
}

export function computeStudentLoanPayoff(input: StudentLoanPayoffInput) {
  const balance = Math.max(0, input.balance);
  const r = Math.max(0, input.ratePercent) / 100 / 12;
  const term = Math.max(0, Math.floor(input.termMonths));
  const minimum = amortisedPayment(balance, r, term);
  const extra = Math.max(0, input.extraPayment);
  const withExtra = minimum + extra;
  const plan = simulatePayoff(balance, r, withExtra);
  const baseline = simulatePayoff(balance, r, minimum);
  const interestSaved = baseline.totalInterest - plan.totalInterest;

  return { minimum, withExtra, months: plan.months, totalInterest: plan.totalInterest, baseline, interestSaved };
}

export function StudentLoanPayoffCalculator() {
  const [balance, setBalance] = useState('30000');
  const [ratePercent, setRatePercent] = useState('6.5');
  const [termMonths, setTermMonths] = useState('120');
  const [extraPayment, setExtraPayment] = useState('100');

  const result = computeStudentLoanPayoff({
    balance: Number(balance) || 0,
    ratePercent: Number(ratePercent) || 0,
    termMonths: Number(termMonths) || 0,
    extraPayment: Number(extraPayment) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Loan balance ($)" value={balance} onChange={setBalance} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Annual rate (%)" value={ratePercent} onChange={setRatePercent} min={0} step="0.01" />
              <NumberField label="Term (months)" value={termMonths} onChange={setTermMonths} min={1} />
            </div>
            <NumberField label="Extra monthly payment ($)" value={extraPayment} onChange={setExtraPayment} min={0} />
          </div>
          <Hint>
            Every extra dollar goes straight to principal, which cuts interest for every remaining month. The
            payoff date moves forward faster than the extra amount alone suggests.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly payment with extra"
            value={`$${formatMoney(result.withExtra)}`}
            sub={`Minimum payment of $${formatMoney(result.minimum)}`}
          />
          <ResultRows>
            <ResultRow label="Months to payoff" value={`${result.months}`} />
            <ResultRow label="Total interest" value={`$${formatMoney(result.totalInterest)}`} />
            <ResultRow label="Interest saved vs minimum" value={`$${formatMoney(result.interestSaved)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StudentLoanPayoffCalculator;
