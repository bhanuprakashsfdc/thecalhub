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
  safeDiv,
} from './kit';

export interface PriceToSalesInput {
  marketCap: number;
  annualRevenue: number;
  targetMultiple: number;
}

export function computePriceToSales(input: PriceToSalesInput) {
  const revenue = Math.max(0, input.annualRevenue);
  const marketCap = Math.max(0, input.marketCap);
  const ratio = safeDiv(marketCap, revenue);
  const targetValue = revenue * Math.max(0, input.targetMultiple);
  return { ratio, targetValue, revenueGap: targetValue - marketCap };
}

export function PriceToSalesCalculator() {
  const [marketCap, setMarketCap] = useState('800000');
  const [annualRevenue, setAnnualRevenue] = useState('400000');
  const [targetMultiple, setTargetMultiple] = useState('3');

  const result = computePriceToSales({
    marketCap: Number(marketCap) || 0,
    annualRevenue: Number(annualRevenue) || 0,
    targetMultiple: Number(targetMultiple) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Market capitalisation ($)" value={marketCap} onChange={setMarketCap} min={0} />
              <NumberField label="Annual revenue ($)" value={annualRevenue} onChange={setAnnualRevenue} min={0} />
            </div>
            <NumberField label="Target P/S multiple (x)" value={targetMultiple} onChange={setTargetMultiple} step="0.5" min={0} />
          </div>
          <Hint>
            Price to sales is most useful for young or loss-making companies where earnings are still negative —
            revenue is the only stable top-line anchor.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Price to sales ratio"
            value={`${formatMoney(result.ratio)}x`}
            sub={`Revenue $${formatMoney(Number(annualRevenue) || 0)}`}
          />
          <ResultRows>
            <ResultRow label="Value at target multiple" value={`$${formatMoney(result.targetValue)}`} />
            <ResultRow label="Gap vs market cap" value={`$${formatMoney(result.revenueGap)}`} />
            <ResultRow label="Market capitalisation" value={`$${formatMoney(Number(marketCap) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PriceToSalesCalculator;
