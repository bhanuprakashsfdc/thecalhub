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

export interface TaxDueInput {
  annualIncome: number;
  standardDeduction: number;
  taxWithheld: number;
  taxCredits: number;
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
  let marginal = 0;
  for (const [cap, rate] of BRACKETS) {
    if (taxable <= prev) break;
    const slice = Math.min(taxable, cap) - prev;
    tax += slice * rate;
    marginal = rate;
    prev = cap;
  }
  return { tax, marginal };
}

export function computeTaxDue(input: TaxDueInput) {
  const taxable = Math.max(0, input.annualIncome - Math.max(0, input.standardDeduction));
  const { tax } = progressiveTax(taxable);
  const payments = Math.max(0, input.taxWithheld) + Math.max(0, input.taxCredits);
  const netDue = tax - payments;
  const effectiveRate = input.annualIncome > 0 ? (tax / input.annualIncome) * 100 : 0;
  return { taxable, liability: tax, payments, netDue, effectiveRate };
}

export function TaxDueCalculator() {
  const [annualIncome, setAnnualIncome] = useState('120000');
  const [standardDeduction, setStandardDeduction] = useState('14600');
  const [taxWithheld, setTaxWithheld] = useState('18000');
  const [taxCredits, setTaxCredits] = useState('1000');

  const result = computeTaxDue({
    annualIncome: Number(annualIncome) || 0,
    standardDeduction: Number(standardDeduction) || 0,
    taxWithheld: Number(taxWithheld) || 0,
    taxCredits: Number(taxCredits) || 0,
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
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Tax withheld ($)" value={taxWithheld} onChange={setTaxWithheld} min={0} />
              <NumberField label="Tax credits ($)" value={taxCredits} onChange={setTaxCredits} min={0} />
            </div>
          </div>
          <Hint>
            The balance due is your bracket tax minus everything already withheld or credited — a negative result
            means the IRS owes you a refund.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label={result.netDue > 0 ? 'Tax still due' : 'Estimated refund'}
            value={`$${formatMoney(Math.abs(result.netDue))}`}
            sub={`Taxable income ${formatMoney(result.taxable)}`}
          />
          <ResultRows>
            <ResultRow label="Federal tax liability" value={`$${formatMoney(result.liability)}`} />
            <ResultRow label="Total payments applied" value={`$${formatMoney(result.payments)}`} />
            <ResultRow label="Effective tax rate" value={`${formatMoney(result.effectiveRate)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TaxDueCalculator;
