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

export interface MortgagePrequalificationInput {
  grossMonthlyIncome: number;
  frontEndRatio: number;
  mortgageRate: number;
  termYears: number;
  downPaymentPct: number;
}

export function computeMortgagePrequalification(input: MortgagePrequalificationInput) {
  const income = Math.max(0, input.grossMonthlyIncome);
  const ratio = Math.max(0, input.frontEndRatio);
  const downPct = Math.min(99, Math.max(0, input.downPaymentPct));
  const housingPayment = (income * ratio) / 100;
  const n = Math.round(Math.max(0, input.termYears) * 12);
  const r = Math.max(0, input.mortgageRate) / 100 / 12;
  const maxLoan = n === 0 ? 0 : r === 0 ? housingPayment * n : (housingPayment * (1 - Math.pow(1 + r, -n))) / r;
  const homePrice = maxLoan / (1 - downPct / 100);
  const downPayment = homePrice - maxLoan;
  return { housingPayment, maxLoan, homePrice, downPayment };
}

export function MortgagePrequalificationCalculator() {
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState('9000');
  const [frontEndRatio, setFrontEndRatio] = useState('28');
  const [mortgageRate, setMortgageRate] = useState('6.5');
  const [termYears, setTermYears] = useState('30');
  const [downPaymentPct, setDownPaymentPct] = useState('20');

  const result = computeMortgagePrequalification({
    grossMonthlyIncome: Number(grossMonthlyIncome) || 0,
    frontEndRatio: Number(frontEndRatio) || 0,
    mortgageRate: Number(mortgageRate) || 0,
    termYears: Number(termYears) || 0,
    downPaymentPct: Number(downPaymentPct) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Gross monthly income ($)" value={grossMonthlyIncome} onChange={setGrossMonthlyIncome} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Front-end ratio (%)" value={frontEndRatio} onChange={setFrontEndRatio} min={0} max={100} />
              <NumberField label="Down payment (%)" value={downPaymentPct} onChange={setDownPaymentPct} min={0} max={99} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Mortgage rate (%)" value={mortgageRate} onChange={setMortgageRate} step="0.1" min={0} />
              <NumberField label="Loan term (years)" value={termYears} onChange={setTermYears} min={1} max={50} />
            </div>
          </div>
          <Hint>
            Prequalification is a ballpark based on stated income and a target housing ratio — a full
            underwritten preapproval verifies documents and carries more weight with sellers.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Prequalified home price"
            value={`$${formatMoney(result.homePrice)}`}
            sub={`Housing budget ${formatMoney(result.housingPayment)} per month`}
          />
          <ResultRows>
            <ResultRow label="Maximum loan amount" value={`$${formatMoney(result.maxLoan)}`} />
            <ResultRow label="Down payment needed" value={`$${formatMoney(result.downPayment)}`} />
            <ResultRow label="Monthly housing payment" value={`$${formatMoney(result.housingPayment)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MortgagePrequalificationCalculator;
