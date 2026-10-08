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

export interface OrdinaryIncomeTaxInput {
  ordinaryIncome: number;
  standardDeduction: number;
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

export function computeOrdinaryIncomeTax(input: OrdinaryIncomeTaxInput) {
  const taxable = Math.max(0, input.ordinaryIncome - Math.max(0, input.standardDeduction));
  let tax = 0;
  let prev = 0;
  let marginal = 0;
  for (const [cap, rate] of BRACKETS) {
    if (taxable <= prev) break;
    tax += (Math.min(taxable, cap) - prev) * rate;
    marginal = rate;
    prev = cap;
  }
  const effectiveRate = input.ordinaryIncome > 0 ? (tax / input.ordinaryIncome) * 100 : 0;
  return { taxable, tax, marginal, effectiveRate };
}

export function OrdinaryIncomeTaxCalculator() {
  const [ordinaryIncome, setOrdinaryIncome] = useState('150000');
  const [standardDeduction, setStandardDeduction] = useState('14600');

  const result = computeOrdinaryIncomeTax({
    ordinaryIncome: Number(ordinaryIncome) || 0,
    standardDeduction: Number(standardDeduction) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Ordinary income ($)" value={ordinaryIncome} onChange={setOrdinaryIncome} min={0} />
            <NumberField label="Standard deduction ($)" value={standardDeduction} onChange={setStandardDeduction} min={0} />
          </div>
          <Hint>
            Wages, interest and business income are all taxed as ordinary income, and each bracket only applies to
            the slice of income inside it.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Ordinary income tax"
            value={`$${formatMoney(result.tax)}`}
            sub={`Taxable income ${formatMoney(result.taxable)}`}
          />
          <ResultRows>
            <ResultRow label="Marginal tax rate" value={`${formatMoney(result.marginal * 100)}%`} />
            <ResultRow label="Effective tax rate" value={`${formatMoney(result.effectiveRate)}%`} />
            <ResultRow label="After-tax income" value={`$${formatMoney((Number(ordinaryIncome) || 0) - result.tax)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default OrdinaryIncomeTaxCalculator;
