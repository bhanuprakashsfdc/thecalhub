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

export interface TaxBracketInput {
  taxableIncome: number;
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

export function computeTaxBracket(input: TaxBracketInput) {
  const taxable = Math.max(0, input.taxableIncome);
  let tax = 0;
  let prev = 0;
  let marginal = 0;
  let nextThreshold = Infinity;
  for (const [cap, rate] of BRACKETS) {
    if (taxable <= prev) {
      nextThreshold = prev;
      break;
    }
    tax += (Math.min(taxable, cap) - prev) * rate;
    marginal = rate;
    prev = cap;
    if (taxable <= cap) {
      nextThreshold = cap;
      break;
    }
  }
  const effectiveRate = taxable > 0 ? (tax / taxable) * 100 : 0;
  return { taxable, tax, marginal, effectiveRate, nextThreshold };
}

export function TaxBracketCalculator() {
  const [taxableIncome, setTaxableIncome] = useState('105400');

  const result = computeTaxBracket({ taxableIncome: Number(taxableIncome) || 0 });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Taxable income ($)" value={taxableIncome} onChange={setTaxableIncome} min={0} />
          </div>
          <Hint>
            Only the slice of income inside each bracket is taxed at that bracket's rate, so the marginal rate is
            never applied to your whole income.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Marginal tax rate"
            value={`${formatMoney(result.marginal * 100)}%`}
            sub={`Taxable income ${formatMoney(result.taxable)}`}
          />
          <ResultRows>
            <ResultRow label="Federal tax in this bracket" value={`$${formatMoney(result.tax)}`} />
            <ResultRow label="Effective tax rate" value={`${formatMoney(result.effectiveRate)}%`} />
            <ResultRow
              label="Next bracket starts at"
              value={Number.isFinite(result.nextThreshold) ? `$${formatMoney(result.nextThreshold)}` : 'No higher bracket'}
            />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TaxBracketCalculator;
