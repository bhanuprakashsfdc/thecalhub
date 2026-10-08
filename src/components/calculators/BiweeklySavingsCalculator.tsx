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

export interface BiweeklySavingsInput {
  loanAmount: number;
  annualRate: number;
  termYears: number;
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

export function computeBiweeklySavings(input: BiweeklySavingsInput) {
  const loan = Math.max(0, input.loanAmount);
  const years = Math.max(0, input.termYears);
  const annualRate = Math.max(0, input.annualRate);
  const rMonthly = annualRate / 100 / 12;
  const rBiweekly = annualRate / 100 / 26;
  const monthlyPayment = scheduledPayment(loan, annualRate, years);
  const biweeklyPayment = monthlyPayment / 2;

  let balance = loan;
  let months = 0;
  let paidMonthly = 0;
  while (balance > 0.005 && months < 1200) {
    const interest = balance * rMonthly;
    const pay = Math.min(monthlyPayment, balance + interest);
    balance = balance + interest - pay;
    paidMonthly += pay;
    months++;
  }

  let balance2 = loan;
  let periods = 0;
  let paidBiweekly = 0;
  const maxPeriods = Math.round(years * 26) + 120;
  while (balance2 > 0.005 && periods < maxPeriods) {
    const interest = balance2 * rBiweekly;
    const pay = Math.min(biweeklyPayment, balance2 + interest);
    balance2 = balance2 + interest - pay;
    paidBiweekly += pay;
    periods++;
  }

  const payoffMonths = Math.round((periods * 12) / 26);
  const interestMonthly = Math.max(0, paidMonthly - loan);
  const interestBiweekly = Math.max(0, paidBiweekly - loan);

  return {
    monthlyPayment,
    biweeklyPayment,
    payoffMonths,
    monthsSaved: Math.max(0, months - payoffMonths),
    interestSaved: Math.max(0, interestMonthly - interestBiweekly),
  };
}

export function BiweeklySavingsCalculator() {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [annualRate, setAnnualRate] = useState('6.5');
  const [termYears, setTermYears] = useState('30');

  const result = computeBiweeklySavings({
    loanAmount: Number(loanAmount) || 0,
    annualRate: Number(annualRate) || 0,
    termYears: Number(termYears) || 0,
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
          </div>
          <Hint>
            Paying half the monthly amount every two weeks means 13 full payments a year, which shortens the term
            and trims the interest bill.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Interest saved"
            value={`$${formatMoney(result.interestSaved)}`}
            sub={`Biweekly payment ${formatMoney(result.biweeklyPayment)}`}
          />
          <ResultRows>
            <ResultRow label="Payoff time" value={`${formatMoney(result.payoffMonths, 0)} months`} />
            <ResultRow label="Months saved" value={formatMoney(result.monthsSaved, 0)} />
            <ResultRow label="Equivalent monthly payment" value={`$${formatMoney(result.monthlyPayment)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default BiweeklySavingsCalculator;
