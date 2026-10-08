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

export interface LoanQualificationInput {
  grossMonthlyIncome: number;
  monthlyDebts: number;
  maxDti: number;
  annualRate: number;
  termYears: number;
}

export function computeLoanQualification(input: LoanQualificationInput) {
  const income = Math.max(0, input.grossMonthlyIncome);
  const debts = Math.max(0, input.monthlyDebts);
  const paymentBudget = (income * Math.max(0, input.maxDti)) / 100;
  const affordablePayment = Math.max(0, paymentBudget - debts);
  const n = Math.round(Math.max(0, input.termYears) * 12);
  const r = Math.max(0, input.annualRate) / 100 / 12;
  const maxLoan = n === 0 ? 0 : r === 0 ? affordablePayment * n : (affordablePayment * (1 - Math.pow(1 + r, -n))) / r;
  const leftoverIncome = Math.max(0, income - debts - affordablePayment);
  return { paymentBudget, affordablePayment, maxLoan, leftoverIncome };
}

export function LoanQualificationCalculator() {
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState('6000');
  const [monthlyDebts, setMonthlyDebts] = useState('400');
  const [maxDti, setMaxDti] = useState('40');
  const [annualRate, setAnnualRate] = useState('9');
  const [termYears, setTermYears] = useState('5');

  const result = computeLoanQualification({
    grossMonthlyIncome: Number(grossMonthlyIncome) || 0,
    monthlyDebts: Number(monthlyDebts) || 0,
    maxDti: Number(maxDti) || 0,
    annualRate: Number(annualRate) || 0,
    termYears: Number(termYears) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Gross monthly income ($)" value={grossMonthlyIncome} onChange={setGrossMonthlyIncome} min={0} />
              <NumberField label="Monthly debts ($)" value={monthlyDebts} onChange={setMonthlyDebts} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Max debt-to-income (%)" value={maxDti} onChange={setMaxDti} min={0} max={100} />
              <NumberField label="Interest rate (%)" value={annualRate} onChange={setAnnualRate} step="0.1" min={0} />
            </div>
            <NumberField label="Term (years)" value={termYears} onChange={setTermYears} min={1} max={50} />
          </div>
          <Hint>
            Qualification is about the payment, not the sticker amount: the same rate over a longer term fits a
            bigger loan into the same monthly budget.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Maximum loan amount"
            value={`$${formatMoney(result.maxLoan)}`}
            sub={`Payment budget ${formatMoney(result.paymentBudget)} per month`}
          />
          <ResultRows>
            <ResultRow label="Affordable monthly payment" value={`$${formatMoney(result.affordablePayment)}`} />
            <ResultRow label="Leftover income" value={`$${formatMoney(result.leftoverIncome)}`} />
            <ResultRow label="Existing debts" value={`$${formatMoney(Number(monthlyDebts) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default LoanQualificationCalculator;
