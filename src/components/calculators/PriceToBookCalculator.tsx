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

export interface PriceToBookInput {
  marketCap: number;
  bookEquity: number;
  targetMultiple: number;
}

export function computePriceToBook(input: PriceToBookInput) {
  const equity = Math.max(0, input.bookEquity);
  const marketCap = Math.max(0, input.marketCap);
  const ratio = safeDiv(marketCap, equity);
  const targetValue = equity * Math.max(0, input.targetMultiple);
  return { ratio, targetValue, gap: targetValue - marketCap };
}

export function PriceToBookCalculator() {
  const [marketCap, setMarketCap] = useState('600000');
  const [bookEquity, setBookEquity] = useState('400000');
  const [targetMultiple, setTargetMultiple] = useState('2');

  const result = computePriceToBook({
    marketCap: Number(marketCap) || 0,
    bookEquity: Number(bookEquity) || 0,
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
              <NumberField label="Book value of equity ($)" value={bookEquity} onChange={setBookEquity} min={0} />
            </div>
            <NumberField label="Target P/B multiple (x)" value={targetMultiple} onChange={setTargetMultiple} step="0.1" min={0} />
          </div>
          <Hint>
            A price to book below 1.0 means the market values the company for less than the accounting value of
            its equity.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Price to book ratio"
            value={`${formatMoney(result.ratio)}x`}
            sub={`Book equity $${formatMoney(Number(bookEquity) || 0)}`}
          />
          <ResultRows>
            <ResultRow label="Value at target multiple" value={`$${formatMoney(result.targetValue)}`} />
            <ResultRow label="Gap vs market cap" value={`$${formatMoney(result.gap)}`} />
            <ResultRow label="Market capitalisation" value={`$${formatMoney(Number(marketCap) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PriceToBookCalculator;
