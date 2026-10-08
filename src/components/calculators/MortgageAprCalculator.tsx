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

export interface MortgageAprInput {
  loanAmount: number;
  noteRate: number;
  termYears: number;
  fees: number;
}

function paymentAt(principal: number, annualRate: number, years: number) {
  const n = Math.round(Math.max(0, years) * 12);
  const r = Math.max(0, annualRate) / 100 / 12;
  if (n === 0) return 0;
  if (r === 0) return principal / n;
  const growth = Math.pow(1 + r, n);
  if (growth === 1) return principal / n;
  return (principal * r * growth) / (growth - 1);
}

export function computeMortgageApr(input: MortgageAprInput) {
  const loan = Math.max(0, input.loanAmount);
  const years = Math.max(0, input.termYears);
  const fees = Math.max(0, input.fees);
  const financed = loan - fees;
  const payment = paymentAt(loan, input.noteRate, years);
  const n = Math.round(years * 12);
  const totalPaid = payment * n;
  const totalInterest = Math.max(0, totalPaid - loan);

  let apr = 0;
  if (financed > 0 && years > 0) {
    const target = payment;
    let lo = 0;
    let hi = 100;
    for (let i = 0; i < 80; i++) {
      const mid = (lo + hi) / 2;
      if (paymentAt(financed, mid, years) > target) hi = mid;
      else lo = mid;
    }
    apr = (lo + hi) / 2;
  }

  return { financed, payment, totalInterest, apr };
}

export function MortgageAprCalculator() {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [noteRate, setNoteRate] = useState('6.5');
  const [termYears, setTermYears] = useState('30');
  const [fees, setFees] = useState('4000');

  const result = computeMortgageApr({
    loanAmount: Number(loanAmount) || 0,
    noteRate: Number(noteRate) || 0,
    termYears: Number(termYears) || 0,
    fees: Number(fees) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Loan amount ($)" value={loanAmount} onChange={setLoanAmount} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Note rate (%)" value={noteRate} onChange={setNoteRate} step="0.1" min={0} />
              <NumberField label="Loan term (years)" value={termYears} onChange={setTermYears} min={1} max={50} />
            </div>
            <NumberField label="Lender fees ($)" value={fees} onChange={setFees} min={0} />
          </div>
          <Hint>
            APR folds lender fees into the rate so two offers can be compared on the same basis. It excludes
            third-party costs such as appraisal and title.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Estimated APR"
            value={`${formatMoney(result.apr)}%`}
            sub={`Note rate ${formatMoney(Number(noteRate) || 0)}% plus fees`}
          />
          <ResultRows>
            <ResultRow label="Monthly payment" value={`$${formatMoney(result.payment)}`} />
            <ResultRow label="Amount financed" value={`$${formatMoney(result.financed)}`} />
            <ResultRow label="Total interest" value={`$${formatMoney(result.totalInterest)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MortgageAprCalculator;
