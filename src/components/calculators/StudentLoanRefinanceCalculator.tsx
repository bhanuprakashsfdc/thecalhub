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

export interface StudentLoanRefinanceInput {
  balance: number;
  currentRate: number;
  currentTermMonths: number;
  newRate: number;
  newTermMonths: number;
}

function payment(balance: number, annualRatePercent: number, months: number) {
  if (months <= 0) return 0;
  const r = Math.max(0, annualRatePercent) / 100 / 12;
  if (balance <= 0) return 0;
  return r === 0 ? balance / months : (balance * r) / (1 - Math.pow(1 + r, -months));
}

export function computeStudentLoanRefinance(input: StudentLoanRefinanceInput) {
  const balance = Math.max(0, input.balance);
  const currentTerm = Math.max(0, Math.floor(input.currentTermMonths));
  const newTerm = Math.max(0, Math.floor(input.newTermMonths));
  const currentPayment = payment(balance, input.currentRate, currentTerm);
  const newPayment = payment(balance, input.newRate, newTerm);
  const monthlySaving = currentPayment - newPayment;
  const currentTotal = currentPayment * currentTerm;
  const newTotal = newPayment * newTerm;
  const totalSaving = currentTotal - newTotal;

  return { currentPayment, newPayment, monthlySaving, currentTotal, newTotal, totalSaving };
}

export function StudentLoanRefinanceCalculator() {
  const [balance, setBalance] = useState('30000');
  const [currentRate, setCurrentRate] = useState('6.8');
  const [currentTermMonths, setCurrentTermMonths] = useState('120');
  const [newRate, setNewRate] = useState('5.2');
  const [newTermMonths, setNewTermMonths] = useState('120');

  const result = computeStudentLoanRefinance({
    balance: Number(balance) || 0,
    currentRate: Number(currentRate) || 0,
    currentTermMonths: Number(currentTermMonths) || 0,
    newRate: Number(newRate) || 0,
    newTermMonths: Number(newTermMonths) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Current loan</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Loan balance ($)" value={balance} onChange={setBalance} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Current rate (%)" value={currentRate} onChange={setCurrentRate} min={0} step="0.01" />
              <NumberField label="Current term (months)" value={currentTermMonths} onChange={setCurrentTermMonths} min={1} />
            </div>
          </div>
          <PanelEyebrow>Refinance offer</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="New rate (%)" value={newRate} onChange={setNewRate} min={0} step="0.01" />
              <NumberField label="New term (months)" value={newTermMonths} onChange={setNewTermMonths} min={1} />
            </div>
          </div>
          <Hint>
            Refinancing trades federal protections and income-driven plans for a lower rate. Compare total
            interest, not just the monthly payment, before signing.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly saving"
            value={`$${formatMoney(result.monthlySaving)}`}
            sub={`New payment of $${formatMoney(result.newPayment)}`}
          />
          <ResultRows>
            <ResultRow label="Current payment" value={`$${formatMoney(result.currentPayment)}`} />
            <ResultRow label="New payment" value={`$${formatMoney(result.newPayment)}`} />
            <ResultRow label="Total interest saved" value={`$${formatMoney(result.totalSaving)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StudentLoanRefinanceCalculator;
