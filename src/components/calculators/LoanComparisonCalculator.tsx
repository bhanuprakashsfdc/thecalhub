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

export interface LoanComparisonInput {
  loanAmount: number;
  termYears: number;
  rateA: number;
  rateB: number;
}

function paymentOf(principal: number, annualRate: number, years: number) {
  const n = Math.round(Math.max(0, years) * 12);
  const r = Math.max(0, annualRate) / 100 / 12;
  if (n === 0) return 0;
  if (r === 0) return principal / n;
  const growth = Math.pow(1 + r, n);
  if (growth === 1) return principal / n;
  return (principal * r * growth) / (growth - 1);
}

export function computeLoanComparison(input: LoanComparisonInput) {
  const loan = Math.max(0, input.loanAmount);
  const years = Math.max(0, input.termYears);
  const n = Math.round(years * 12);
  const paymentA = paymentOf(loan, input.rateA, years);
  const paymentB = paymentOf(loan, input.rateB, years);
  const costA = paymentA * n;
  const costB = paymentB * n;
  return {
    paymentA,
    paymentB,
    costA,
    costB,
    lowerPayment: Math.min(paymentA, paymentB),
    costDifference: Math.abs(costA - costB),
  };
}

export function LoanComparisonCalculator() {
  const [loanAmount, setLoanAmount] = useState('20000');
  const [termYears, setTermYears] = useState('5');
  const [rateA, setRateA] = useState('8');
  const [rateB, setRateB] = useState('6.5');

  const result = computeLoanComparison({
    loanAmount: Number(loanAmount) || 0,
    termYears: Number(termYears) || 0,
    rateA: Number(rateA) || 0,
    rateB: Number(rateB) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Loan amount ($)" value={loanAmount} onChange={setLoanAmount} min={0} />
              <NumberField label="Term (years)" value={termYears} onChange={setTermYears} min={1} max={50} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Rate A (%)" value={rateA} onChange={setRateA} step="0.1" min={0} />
              <NumberField label="Rate B (%)" value={rateB} onChange={setRateB} step="0.1" min={0} />
            </div>
          </div>
          <Hint>
            Two offers can share a rate but differ in fees; here the comparison isolates the rate so you can see
            what each percentage point is worth.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Lower monthly payment"
            value={`$${formatMoney(result.lowerPayment)}`}
            sub={`Rate A ${formatMoney(Number(rateA) || 0)}% vs Rate B ${formatMoney(Number(rateB) || 0)}%`}
          />
          <ResultRows>
            <ResultRow label="Monthly payment A" value={`$${formatMoney(result.paymentA)}`} />
            <ResultRow label="Monthly payment B" value={`$${formatMoney(result.paymentB)}`} />
            <ResultRow label="Total cost difference" value={`$${formatMoney(result.costDifference)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default LoanComparisonCalculator;
