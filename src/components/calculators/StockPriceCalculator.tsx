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

export interface StockPriceInput {
  marketCap: number;
  sharesOutstanding: number;
  targetMarketCap: number;
}

export function computeStockPrice(input: StockPriceInput) {
  const shares = Math.max(0, input.sharesOutstanding);
  const cap = Math.max(0, input.marketCap);
  const price = safeDiv(cap, shares);
  const targetPrice = safeDiv(Math.max(0, input.targetMarketCap), shares);
  const upside = price > 0 ? ((targetPrice - price) / price) * 100 : 0;
  return { price, targetPrice, upside, shares };
}

export function StockPriceCalculator() {
  const [marketCap, setMarketCap] = useState('12000000');
  const [sharesOutstanding, setSharesOutstanding] = useState('500000');
  const [targetMarketCap, setTargetMarketCap] = useState('15000000');

  const result = computeStockPrice({
    marketCap: Number(marketCap) || 0,
    sharesOutstanding: Number(sharesOutstanding) || 0,
    targetMarketCap: Number(targetMarketCap) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Market capitalisation ($)" value={marketCap} onChange={setMarketCap} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Shares outstanding" value={sharesOutstanding} onChange={setSharesOutstanding} min={0} />
              <NumberField label="Target market cap ($)" value={targetMarketCap} onChange={setTargetMarketCap} min={0} />
            </div>
          </div>
          <Hint>
            The share price is simply market capitalisation divided by shares — buybacks push the price up as
            the share count falls.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Share price"
            value={`$${formatMoney(result.price)}`}
            sub={`From ${formatMoney(result.shares, 0)} shares outstanding`}
          />
          <ResultRows>
            <ResultRow label="Price at the target market cap" value={`$${formatMoney(result.targetPrice)}`} />
            <ResultRow label="Upside to the target cap" value={`${formatMoney(result.upside)}%`} />
            <ResultRow label="Market capitalisation" value={`$${formatMoney(Number(marketCap) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StockPriceCalculator;
