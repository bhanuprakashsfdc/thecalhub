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

export interface IncomeDrivenRepaymentInput {
  annualIncome: number;
  householdSize: number;
  povertyGuideline: number;
  sharePercent: number;
}

export function computeIncomeDrivenRepayment(input: IncomeDrivenRepaymentInput) {
  const poverty = Math.max(0, input.povertyGuideline) * Math.max(0, input.householdSize);
  const threshold = poverty * 1.5;
  const discretionary = Math.max(0, Math.max(0, input.annualIncome) - threshold);
  const annualPayment = discretionary * (Math.max(0, input.sharePercent) / 100);
  const monthlyPayment = annualPayment / 12;
  const remainingIncome = discretionary - annualPayment;

  return { poverty, threshold, discretionary, annualPayment, monthlyPayment, remainingIncome };
}

export function IncomeDrivenRepaymentCalculator() {
  const [annualIncome, setAnnualIncome] = useState('55000');
  const [householdSize, setHouseholdSize] = useState('2');
  const [povertyGuideline, setPovertyGuideline] = useState('15000');
  const [sharePercent, setSharePercent] = useState('10');

  const result = computeIncomeDrivenRepayment({
    annualIncome: Number(annualIncome) || 0,
    householdSize: Number(householdSize) || 0,
    povertyGuideline: Number(povertyGuideline) || 0,
    sharePercent: Number(sharePercent) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Annual income ($)" value={annualIncome} onChange={setAnnualIncome} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Household size" value={householdSize} onChange={setHouseholdSize} min={0} />
              <NumberField label="Poverty guideline per person ($)" value={povertyGuideline} onChange={setPovertyGuideline} min={0} />
            </div>
            <NumberField label="Share of discretionary income (%)" value={sharePercent} onChange={setSharePercent} min={0} max={100} step="0.5" />
          </div>
          <Hint>
            Income-driven plans key the payment to discretionary income: what is left after 150% of the poverty
            guideline for your household size. Lower income means a lower payment.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly payment"
            value={`$${formatMoney(result.monthlyPayment)}`}
            sub={`Based on $${formatMoney(result.discretionary)} of discretionary income`}
          />
          <ResultRows>
            <ResultRow label="Income protected from repayment" value={`$${formatMoney(result.threshold)}`} />
            <ResultRow label="Discretionary income" value={`$${formatMoney(result.discretionary)}`} />
            <ResultRow label="Annual payment" value={`$${formatMoney(result.annualPayment)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default IncomeDrivenRepaymentCalculator;
