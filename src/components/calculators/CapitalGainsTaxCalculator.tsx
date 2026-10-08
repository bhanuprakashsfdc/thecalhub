import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SegmentedControl,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface CapitalGainsTaxInput {
  salePrice: number;
  costBasis: number;
  annualIncome: number;
  holdingPeriod: 'long' | 'short';
}

export function capitalGainsRate(annualIncome: number, holdingPeriod: 'long' | 'short') {
  if (holdingPeriod === 'short') {
    if (annualIncome <= 11600) return 0.1;
    if (annualIncome <= 47150) return 0.12;
    if (annualIncome <= 100525) return 0.22;
    if (annualIncome <= 191950) return 0.24;
    if (annualIncome <= 243725) return 0.32;
    if (annualIncome <= 609350) return 0.35;
    return 0.37;
  }
  if (annualIncome <= 47025) return 0;
  if (annualIncome <= 518900) return 0.15;
  return 0.2;
}

export function computeCapitalGainsTax(input: CapitalGainsTaxInput) {
  const gain = Math.max(0, input.salePrice - input.costBasis);
  const rate = capitalGainsRate(Math.max(0, input.annualIncome), input.holdingPeriod);
  const tax = gain * rate;
  const afterTaxProceeds = input.salePrice - tax;
  return { gain, rate, tax, afterTaxProceeds };
}

export function CapitalGainsTaxCalculator() {
  const [salePrice, setSalePrice] = useState('50000');
  const [costBasis, setCostBasis] = useState('30000');
  const [annualIncome, setAnnualIncome] = useState('80000');
  const [holdingPeriod, setHoldingPeriod] = useState<'long' | 'short'>('long');

  const result = computeCapitalGainsTax({
    salePrice: Number(salePrice) || 0,
    costBasis: Number(costBasis) || 0,
    annualIncome: Number(annualIncome) || 0,
    holdingPeriod,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Sale price ($)" value={salePrice} onChange={setSalePrice} min={0} />
              <NumberField label="Cost basis ($)" value={costBasis} onChange={setCostBasis} min={0} />
            </div>
            <NumberField label="Annual income ($)" value={annualIncome} onChange={setAnnualIncome} min={0} />
            <SegmentedControl
              label="Holding period"
              value={holdingPeriod}
              onChange={(v) => setHoldingPeriod(v === 'short' ? 'short' : 'long')}
              options={[
                { value: 'long', label: 'Long-term' },
                { value: 'short', label: 'Short-term' },
              ]}
            />
          </div>
            <Hint>
              Assets held longer than a year qualify for lower long-term rates; short-term gains are taxed at your
            ordinary income rate instead.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Capital gains tax"
            value={`$${formatMoney(result.tax)}`}
            sub={`${holdingPeriod === 'long' ? 'Long-term' : 'Short-term'} rate ${formatMoney(result.rate * 100)}%`}
          />
          <ResultRows>
            <ResultRow label="Gain on sale" value={`$${formatMoney(result.gain)}`} />
            <ResultRow label="Tax rate applied" value={`${formatMoney(result.rate * 100)}%`} />
            <ResultRow label="After-tax proceeds" value={`$${formatMoney(result.afterTaxProceeds)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CapitalGainsTaxCalculator;
