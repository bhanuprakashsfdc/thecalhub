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

export interface MortgageQualificationInput {
  grossMonthlyIncome: number;
  monthlyDebts: number;
  dtiRatio: number;
  mortgageRate: number;
  termYears: number;
}

export function loanFromPayment(payment: number, annualRate: number, years: number) {
  const n = Math.round(Math.max(0, years) * 12);
  const r = Math.max(0, annualRate) / 100 / 12;
  if (n === 0) return 0;
  if (r === 0) return payment * n;
  return (payment * (1 - Math.pow(1 + r, -n))) / r;
}

export function computeMortgageQualification(input: MortgageQualificationInput) {
  const income = Math.max(0, input.grossMonthlyIncome);
  const debts = Math.max(0, input.monthlyDebts);
  const ratio = Math.max(0, input.dtiRatio);
  const totalBudget = (income * ratio) / 100;
  const housingPayment = Math.max(0, totalBudget - debts);
  const maxLoan = loanFromPayment(housingPayment, input.mortgageRate, input.termYears);
  const homePrice = maxLoan / 0.8;
  return { totalBudget, housingPayment, maxLoan, homePrice };
}

export function MortgageQualificationCalculator() {
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState('8000');
  const [monthlyDebts, setMonthlyDebts] = useState('800');
  const [dtiRatio, setDtiRatio] = useState('36');
  const [mortgageRate, setMortgageRate] = useState('6.5');
  const [termYears, setTermYears] = useState('30');

  const result = computeMortgageQualification({
    grossMonthlyIncome: Number(grossMonthlyIncome) || 0,
    monthlyDebts: Number(monthlyDebts) || 0,
    dtiRatio: Number(dtiRatio) || 0,
    mortgageRate: Number(mortgageRate) || 0,
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
              <NumberField label="Monthly debt payments ($)" value={monthlyDebts} onChange={setMonthlyDebts} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Max debt-to-income (%)" value={dtiRatio} onChange={setDtiRatio} min={0} max={100} />
              <NumberField label="Mortgage rate (%)" value={mortgageRate} onChange={setMortgageRate} step="0.1" min={0} />
            </div>
            <NumberField label="Loan term (years)" value={termYears} onChange={setTermYears} min={1} max={50} />
          </div>
          <Hint>
            Lenders size loans from the payment you can afford after existing debts, so lowering debts or raising
            income increases the amount you can borrow.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Maximum loan amount"
            value={`$${formatMoney(result.maxLoan)}`}
            sub={`Leaving ${formatMoney(result.housingPayment)} for housing`}
          />
          <ResultRows>
            <ResultRow label="Max monthly housing payment" value={`$${formatMoney(result.housingPayment)}`} />
            <ResultRow label="Total debt budget" value={`$${formatMoney(result.totalBudget)}`} />
            <ResultRow label="Home price with 20% down" value={`$${formatMoney(result.homePrice)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MortgageQualificationCalculator;
