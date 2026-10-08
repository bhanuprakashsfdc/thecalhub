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

export interface LoanPreapprovalInput {
  annualIncome: number;
  monthlyDebts: number;
  maxPaymentShare: number;
  annualRate: number;
  termYears: number;
}

export function computeLoanPreapproval(input: LoanPreapprovalInput) {
  const monthlyIncome = Math.max(0, input.annualIncome) / 12;
  const paymentBudget = (monthlyIncome * Math.max(0, input.maxPaymentShare)) / 100;
  const affordablePayment = Math.max(0, paymentBudget - Math.max(0, input.monthlyDebts));
  const n = Math.round(Math.max(0, input.termYears) * 12);
  const r = Math.max(0, input.annualRate) / 100 / 12;
  const preapprovedAmount = n === 0 ? 0 : r === 0 ? affordablePayment * n : (affordablePayment * (1 - Math.pow(1 + r, -n))) / r;
  return { monthlyIncome, paymentBudget, affordablePayment, preapprovedAmount };
}

export function LoanPreapprovalCalculator() {
  const [annualIncome, setAnnualIncome] = useState('96000');
  const [monthlyDebts, setMonthlyDebts] = useState('500');
  const [maxPaymentShare, setMaxPaymentShare] = useState('33');
  const [annualRate, setAnnualRate] = useState('7');
  const [termYears, setTermYears] = useState('5');

  const result = computeLoanPreapproval({
    annualIncome: Number(annualIncome) || 0,
    monthlyDebts: Number(monthlyDebts) || 0,
    maxPaymentShare: Number(maxPaymentShare) || 0,
    annualRate: Number(annualRate) || 0,
    termYears: Number(termYears) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Annual income ($)" value={annualIncome} onChange={setAnnualIncome} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Monthly debts ($)" value={monthlyDebts} onChange={setMonthlyDebts} min={0} />
              <NumberField label="Max payment share (%)" value={maxPaymentShare} onChange={setMaxPaymentShare} min={0} max={100} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Interest rate (%)" value={annualRate} onChange={setAnnualRate} step="0.1" min={0} />
              <NumberField label="Term (years)" value={termYears} onChange={setTermYears} min={1} max={50} />
            </div>
          </div>
          <Hint>
            Lenders preapprove an amount based on what is left of your payment budget after existing debts — a
            soft estimate that does not affect your credit score.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Preapproved loan amount"
            value={`$${formatMoney(result.preapprovedAmount)}`}
            sub={`Payment budget ${formatMoney(result.paymentBudget)} per month`}
          />
          <ResultRows>
            <ResultRow label="Affordable monthly payment" value={`$${formatMoney(result.affordablePayment)}`} />
            <ResultRow label="Gross monthly income" value={`$${formatMoney(result.monthlyIncome)}`} />
            <ResultRow label="Debts already committed" value={`$${formatMoney(Number(monthlyDebts) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default LoanPreapprovalCalculator;
