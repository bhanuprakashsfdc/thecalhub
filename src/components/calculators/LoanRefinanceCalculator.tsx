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

export interface LoanRefinanceInput {
  currentBalance: number;
  currentRate: number;
  currentTermYears: number;
  newRate: number;
  newTermYears: number;
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

export function computeLoanRefinance(input: LoanRefinanceInput) {
  const balance = Math.max(0, input.currentBalance);
  const currentPayment = paymentFor(balance, input.currentRate, input.currentTermYears);
  const newPayment = paymentFor(balance, input.newRate, input.newTermYears);
  const currentMonths = Math.round(Math.max(0, input.currentTermYears) * 12);
  const newMonths = Math.round(Math.max(0, input.newTermYears) * 12);
  const currentInterest = Math.max(0, currentPayment * currentMonths - balance);
  const newInterest = Math.max(0, newPayment * newMonths - balance);
  return {
    currentPayment,
    newPayment,
    monthlySavings: currentPayment - newPayment,
    currentInterest,
    newInterest,
    interestSavings: currentInterest - newInterest,
  };
}

export function LoanRefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState('280000');
  const [currentRate, setCurrentRate] = useState('7');
  const [currentTermYears, setCurrentTermYears] = useState('25');
  const [newRate, setNewRate] = useState('6.25');
  const [newTermYears, setNewTermYears] = useState('25');

  const result = computeLoanRefinance({
    currentBalance: Number(currentBalance) || 0,
    currentRate: Number(currentRate) || 0,
    currentTermYears: Number(currentTermYears) || 0,
    newRate: Number(newRate) || 0,
    newTermYears: Number(newTermYears) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Current loan</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Current balance ($)" value={currentBalance} onChange={setCurrentBalance} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Current rate (%)" value={currentRate} onChange={setCurrentRate} step="0.1" min={0} />
              <NumberField label="Remaining term (years)" value={currentTermYears} onChange={setCurrentTermYears} min={1} max={50} />
            </div>
          </div>
          <PanelEyebrow>New loan</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="New rate (%)" value={newRate} onChange={setNewRate} step="0.1" min={0} />
              <NumberField label="New term (years)" value={newTermYears} onChange={setNewTermYears} min={1} max={50} />
            </div>
          </div>
          <Hint>
            Extending the term can lower the payment while raising total interest, so compare both numbers before
            refinancing.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly payment savings"
            value={`$${formatMoney(result.monthlySavings)}`}
            sub={`Old ${formatMoney(result.currentPayment)} vs new ${formatMoney(result.newPayment)}`}
          />
          <ResultRows>
            <ResultRow label="New monthly payment" value={`$${formatMoney(result.newPayment)}`} />
            <ResultRow label="Interest on the current loan" value={`$${formatMoney(result.currentInterest)}`} />
            <ResultRow label="Interest saved" value={`$${formatMoney(result.interestSavings)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default LoanRefinanceCalculator;
