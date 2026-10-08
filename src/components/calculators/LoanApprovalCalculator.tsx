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

export interface LoanApprovalInput {
  loanAmount: number;
  annualRate: number;
  termYears: number;
  grossMonthlyIncome: number;
  maxPaymentShare: number;
}

function paymentFor(principal: number, annualRate: number, years: number) {
  const n = Math.round(Math.max(0, years) * 12);
  const r = Math.max(0, annualRate) / 100 / 12;
  if (n === 0) return 0;
  if (r === 0) return principal / n;
  const growth = Math.pow(1 + r, n);
  if (growth === 1) return principal / n;
  return (principal * r * growth) / (growth - 1);
}

export function computeLoanApproval(input: LoanApprovalInput) {
  const income = Math.max(0, input.grossMonthlyIncome);
  const payment = paymentFor(Math.max(0, input.loanAmount), input.annualRate, input.termYears);
  const allowed = (income * Math.max(0, input.maxPaymentShare)) / 100;
  const shareOfIncome = income > 0 ? (payment / income) * 100 : 0;
  const approved = payment > 0 && payment <= allowed;
  const totalInterest = Math.max(0, payment * Math.round(Math.max(0, input.termYears) * 12) - Math.max(0, input.loanAmount));
  return { payment, allowed, shareOfIncome, approved, totalInterest };
}

export function LoanApprovalCalculator() {
  const [loanAmount, setLoanAmount] = useState('15000');
  const [annualRate, setAnnualRate] = useState('8');
  const [termYears, setTermYears] = useState('4');
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState('5000');
  const [maxPaymentShare, setMaxPaymentShare] = useState('30');

  const result = computeLoanApproval({
    loanAmount: Number(loanAmount) || 0,
    annualRate: Number(annualRate) || 0,
    termYears: Number(termYears) || 0,
    grossMonthlyIncome: Number(grossMonthlyIncome) || 0,
    maxPaymentShare: Number(maxPaymentShare) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Loan amount ($)" value={loanAmount} onChange={setLoanAmount} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Interest rate (%)" value={annualRate} onChange={setAnnualRate} step="0.1" min={0} />
              <NumberField label="Term (years)" value={termYears} onChange={setTermYears} min={1} max={50} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Gross monthly income ($)" value={grossMonthlyIncome} onChange={setGrossMonthlyIncome} min={0} />
              <NumberField label="Max payment share (%)" value={maxPaymentShare} onChange={setMaxPaymentShare} min={0} max={100} />
            </div>
          </div>
          <Hint>
            Approval hinges on whether the payment fits inside the lender's allowed share of your income; the
            same loan can pass or fail as rates or income change.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Required monthly payment"
            value={`$${formatMoney(result.payment)}`}
            sub={result.approved ? 'Within the income limit' : 'Exceeds the income limit'}
          />
          <ResultRows>
            <ResultRow label="Maximum allowed payment" value={`$${formatMoney(result.allowed)}`} />
            <ResultRow label="Share of monthly income" value={`${formatMoney(result.shareOfIncome)}%`} />
            <ResultRow label="Loan approval" value={result.approved ? 'Yes' : 'No'} />
            <ResultRow label="Total interest" value={`$${formatMoney(result.totalInterest)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default LoanApprovalCalculator;
