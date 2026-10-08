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

export interface AlternativeMinimumTaxInput {
  taxableIncome: number;
  preferenceItems: number;
  amtExemption: number;
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

const AMT_BREAKPOINT = 232600;

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

export function computeAlternativeMinimumTax(input: AlternativeMinimumTaxInput) {
  const taxable = Math.max(0, input.taxableIncome);
  const amti = taxable + Math.max(0, input.preferenceItems);
  const amtBase = Math.max(0, amti - Math.max(0, input.amtExemption));
  const tentative =
    Math.min(amtBase, AMT_BREAKPOINT) * 0.26 + Math.max(0, amtBase - AMT_BREAKPOINT) * 0.28;
  const regularTax = progressiveTax(taxable);
  const amtOwed = Math.max(0, tentative - regularTax);
  return { amti, amtBase, tentative, regularTax, amtOwed };
}

export function AlternativeMinimumTaxCalculator() {
  const [taxableIncome, setTaxableIncome] = useState('200000');
  const [preferenceItems, setPreferenceItems] = useState('60000');
  const [amtExemption, setAmtExemption] = useState('85700');

  const result = computeAlternativeMinimumTax({
    taxableIncome: Number(taxableIncome) || 0,
    preferenceItems: Number(preferenceItems) || 0,
    amtExemption: Number(amtExemption) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Regular taxable income ($)" value={taxableIncome} onChange={setTaxableIncome} min={0} />
            <NumberField
              label="Tax preference items ($)"
              value={preferenceItems}
              onChange={setPreferenceItems}
              min={0}
              hint="Income counted for AMT but excluded from regular tax"
            />
            <NumberField label="AMT exemption ($)" value={amtExemption} onChange={setAmtExemption} min={0} />
          </div>
          <Hint>
            AMT is a parallel tax system: you pay the larger of the regular tax or the tentative minimum tax after
            adding preference items back to income.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Alternative minimum tax owed"
            value={`$${formatMoney(result.amtOwed)}`}
            sub={`AMT base ${formatMoney(result.amtBase)}`}
          />
          <ResultRows>
            <ResultRow label="Tentative minimum tax" value={`$${formatMoney(result.tentative)}`} />
            <ResultRow label="Regular income tax" value={`$${formatMoney(result.regularTax)}`} />
            <ResultRow label="AMT taxable income" value={`$${formatMoney(result.amti)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AlternativeMinimumTaxCalculator;
