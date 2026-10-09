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

export interface CapitalGainsInput {
  purchasePrice: number;
  salePrice: number;
  taxRate: number;
  holdingPeriod: 'long' | 'short';
}

export function computeCapitalGains(input: CapitalGainsInput) {
  const gain = Math.max(0, input.salePrice - input.purchasePrice);
  const tax = gain * (input.taxRate / 100);
  const netProceeds = input.salePrice - tax;
  const roi =
    input.purchasePrice > 0 ? (gain / input.purchasePrice) * 100 : 0;
  return { gain, tax, netProceeds, roi };
}

export function CapitalGainsCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('10000');
  const [salePrice, setSalePrice] = useState('15000');
  const [taxRate, setTaxRate] = useState('15');
  const [holdingPeriod, setHoldingPeriod] = useState('long');

  const result = computeCapitalGains({
    purchasePrice: Number(purchasePrice) || 0,
    salePrice: Number(salePrice) || 0,
    taxRate: Number(taxRate) || 0,
    holdingPeriod: holdingPeriod === 'short' ? 'short' : 'long',
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Purchase price ($)" value={purchasePrice} onChange={setPurchasePrice} min={0} />
            <NumberField label="Sale price ($)" value={salePrice} onChange={setSalePrice} min={0} />
            <NumberField label="Tax rate (%)" value={taxRate} onChange={setTaxRate} min={0} max={100} step="0.1" />
            <SegmentedControl
              label="Holding period"
              value={holdingPeriod}
              onChange={setHoldingPeriod}
              options={[
                { value: 'long', label: 'Long-term' },
                { value: 'short', label: 'Short-term' },
              ]}
            />
          </div>
          <Hint>
            Gain = sale price − purchase price. Enter the
            rate that applies to your holding period and income bracket.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Net proceeds after tax"
            value={`$${formatMoney(result.netProceeds)}`}
            sub="After capital gains tax"
          />
          <ResultRows>
            <ResultRow label="Capital gain" value={`$${formatMoney(result.gain)}`} />
            <ResultRow label="Tax owed" value={`$${formatMoney(result.tax)}`} />
            <ResultRow label="Return on investment" value={`${formatMoney(result.roi)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CapitalGainsCalculator;
