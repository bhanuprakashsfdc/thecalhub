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

export interface StudentLoanInput {
  balance: number;
  ratePercent: number;
  years: number;
}

export function computeStudentLoan(input: StudentLoanInput) {
  const balance = Math.max(0, input.balance);
  const r = Math.max(0, input.ratePercent) / 100 / 12;
  const n = Math.max(0, Math.floor(input.years * 12));
  const payment = n > 0 ? (r === 0 ? balance / n : (balance * r) / (1 - Math.pow(1 + r, -n))) : 0;
  const totalPaid = payment * n;
  const totalInterest = totalPaid - balance;

  return { payment, totalPaid, totalInterest, months: n };
}

export function StudentLoanCalculator() {
  const [balance, setBalance] = useState('35000');
  const [ratePercent, setRatePercent] = useState('5.5');
  const [years, setYears] = useState('10');

  const result = computeStudentLoan({
    balance: Number(balance) || 0,
    ratePercent: Number(ratePercent) || 0,
    years: Number(years) || 0,
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
              <NumberField label="Term (years)" value={years} onChange={setYears} min={1} />
            </div>
          </div>
          <Hint>
            Federal plans fix the payment for a set term; refinancing or extra payments change the term, not the
            rate. Compare both before choosing a repayment route.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly payment"
            value={`$${formatMoney(result.payment)}`}
            sub={`Over ${result.months} monthly instalments`}
          />
          <ResultRows>
            <ResultRow label="Total repaid" value={`$${formatMoney(result.totalPaid)}`} />
            <ResultRow label="Total interest" value={`$${formatMoney(result.totalInterest)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StudentLoanCalculator;
