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

export interface EstimatedTaxInput {
  annualIncome: number;
  standardDeduction: number;
  alreadyWithheld: number;
}

const BRACKETS: Array<[number, number]> = [
  [11600, 0.1],
  [47150, 0.12],
  [100525, 0.22],
  [191950, 0.24],
  [243725, 0.32],
  [609350, 0.35],
  [Infinity, 0.37],
];

export function progressiveTax(taxable: number) {
  let tax = 0;
  let prev = 0;
  for (const [cap, rate] of BRACKETS) {
    if (taxable <= prev) break;
    tax += (Math.min(taxable, cap) - prev) * rate;
    prev = cap;
  }
  return tax;
}

export function computeEstimatedTax(input: EstimatedTaxInput) {
  const taxable = Math.max(0, input.annualIncome - Math.max(0, input.standardDeduction));
  const liability = progressiveTax(taxable);
  const remaining = Math.max(0, liability - Math.max(0, input.alreadyWithheld));
  const quarterly = remaining / 4;
  return { taxable, liability, remaining, quarterly };
}

export function EstimatedTaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState('90000');
  const [standardDeduction, setStandardDeduction] = useState('14600');
  const [alreadyWithheld, setAlreadyWithheld] = useState('8000');

  const result = computeEstimatedTax({
    annualIncome: Number(annualIncome) || 0,
    standardDeduction: Number(standardDeduction) || 0,
    alreadyWithheld: Number(alreadyWithheld) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Annual income ($)" value={annualIncome} onChange={setAnnualIncome} min={0} />
              <NumberField label="Standard deduction ($)" value={standardDeduction} onChange={setStandardDeduction} min={0} />
            </div>
            <NumberField label="Tax already withheld ($)" value={alreadyWithheld} onChange={setAlreadyWithheld} min={0} />
          </div>
          <Hint>
            Freelancers and investors generally pay quarterly estimates so the bill is spread across the year
            instead of arriving all at once in April.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Quarterly estimated payment"
            value={`$${formatMoney(result.quarterly)}`}
            sub={`Remaining tax ${formatMoney(result.remaining)} after withholding`}
          />
          <ResultRows>
            <ResultRow label="Annual tax estimate" value={`$${formatMoney(result.liability)}`} />
            <ResultRow label="Taxable income" value={`$${formatMoney(result.taxable)}`} />
            <ResultRow label="Tax still unwithheld" value={`$${formatMoney(result.remaining)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EstimatedTaxCalculator;
