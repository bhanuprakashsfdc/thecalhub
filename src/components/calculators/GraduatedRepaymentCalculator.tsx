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

export interface GraduatedRepaymentInput {
  balance: number;
  ratePercent: number;
  years: number;
  startFactorPercent: number;
  annualIncreasePercent: number;
}

export function computeGraduatedRepayment(input: GraduatedRepaymentInput) {
  const balance = Math.max(0, input.balance);
  const r = Math.max(0, input.ratePercent) / 100 / 12;
  const n = Math.max(0, Math.floor(input.years * 12));
  const standard =
    n > 0 ? (r === 0 ? balance / n : (balance * r) / (1 - Math.pow(1 + r, -n))) : 0;
  const firstPayment = standard * (Math.max(0, input.startFactorPercent) / 100);

  let remaining = balance;
  let payment = firstPayment;
  let totalPaid = 0;
  let months = 0;
  let lastPayment = 0;
  const step = 1 + Math.max(0, input.annualIncreasePercent) / 100;

  for (let m = 1; m <= n && remaining > 0; m += 1) {
    if (m > 1 && (m - 1) % 12 === 0) payment *= step;
    const interest = remaining * r;
    if (payment <= interest) break;
    lastPayment = payment;
    const principal = payment - interest;
    if (principal >= remaining) {
      totalPaid += remaining + interest;
      remaining = 0;
      months = m;
    } else {
      remaining -= principal;
      totalPaid += payment;
      months = m;
    }
  }

  const totalInterest = balance > 0 && months > 0 ? totalPaid - balance : 0;
  const finalPayment = months > 0 ? lastPayment : 0;

  return { standard, firstPayment, finalPayment, months, totalInterest };
}

export function GraduatedRepaymentCalculator() {
  const [balance, setBalance] = useState('40000');
  const [ratePercent, setRatePercent] = useState('6.5');
  const [years, setYears] = useState('10');
  const [startFactorPercent, setStartFactorPercent] = useState('50');
  const [annualIncreasePercent, setAnnualIncreasePercent] = useState('10');

  const result = computeGraduatedRepayment({
    balance: Number(balance) || 0,
    ratePercent: Number(ratePercent) || 0,
    years: Number(years) || 0,
    startFactorPercent: Number(startFactorPercent) || 0,
    annualIncreasePercent: Number(annualIncreasePercent) || 0,
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
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Start payment factor (%)"
                value={startFactorPercent}
                onChange={setStartFactorPercent}
                min={1}
                max={100}
              />
              <NumberField
                label="Annual increase (%)"
                value={annualIncreasePercent}
                onChange={setAnnualIncreasePercent}
                min={0}
                step="0.5"
              />
            </div>
          </div>
          <Hint>
            Graduated plans start at a fraction of the standard payment and step up each year as your income is
            expected to rise — the early discount is repaid by larger later payments.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="First monthly payment"
            value={`$${formatMoney(result.firstPayment)}`}
            sub={`Standard payment would be $${formatMoney(result.standard)}`}
          />
          <ResultRows>
            <ResultRow label="Final monthly payment" value={`$${formatMoney(result.finalPayment)}`} />
            <ResultRow label="Months to payoff" value={`${result.months}`} />
            <ResultRow label="Total interest" value={`$${formatMoney(result.totalInterest)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default GraduatedRepaymentCalculator;
