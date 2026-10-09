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

export interface PaymentInput {
  loanAmount: number;
  interestRatePct: number;
  termYears: number;
}

export function computePayment(input: PaymentInput) {
  const r = input.interestRatePct / 100 / 12;
  const n = input.termYears * 12;
  const monthly =
    r > 0
      ? (input.loanAmount * r) / (1 - Math.pow(1 + r, -n))
      : n > 0
        ? input.loanAmount / n
        : 0;
  const totalRepaid = monthly * n;
  const totalInterest = totalRepaid - input.loanAmount;
  const interestShare =
    input.loanAmount > 0 ? (totalInterest / input.loanAmount) * 100 : 0;
  return { monthly, totalRepaid, totalInterest, interestShare };
}

export function PaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState('25000');
  const [interestRatePct, setInterestRatePct] = useState('7');
  const [termYears, setTermYears] = useState('5');

  const result = computePayment({
    loanAmount: Number(loanAmount) || 0,
    interestRatePct: Number(interestRatePct) || 0,
    termYears: Number(termYears) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Loan amount ($)" value={loanAmount} onChange={setLoanAmount} min={0} />
            <NumberField label="Interest rate (%)" value={interestRatePct} onChange={setInterestRatePct} min={0} step="0.1" />
            <NumberField label="Loan term (years)" value={termYears} onChange={setTermYears} min={0} step="1" />
          </div>
          <Hint>
            Standard amortising loan payment:
            P × r ÷ (1 − (1 + r)^−n), with r the monthly rate and n the
            number of months.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly payment"
            value={`$${formatMoney(result.monthly)}`}
            sub={`${(Number(termYears) || 0) * 12} monthly payments`}
          />
          <ResultRows>
            <ResultRow label="Total interest" value={`$${formatMoney(result.totalInterest)}`} />
            <ResultRow label="Total repaid" value={`$${formatMoney(result.totalRepaid)}`} />
            <ResultRow label="Interest as share of loan" value={`${formatMoney(result.interestShare)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PaymentCalculator;
