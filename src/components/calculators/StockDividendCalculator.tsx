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

export function StockDividendCalculator() {
  const [price, setPrice] = useState('100');
  const [dividend, setDividend] = useState('5');
  const [shares, setShares] = useState('0');

  const p = Number(price) || 0;
  const d = Number(dividend) || 0;
  const s = Number(shares) || 0;
  const yieldPct = p > 0 ? (d / p) * 100 : 0;
  const annual = d * s;

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Share Price ($)" value={price} onChange={setPrice} min={0} step="0.01" />
            <NumberField label="Dividend Per Share ($)" value={dividend} onChange={setDividend} min={0} step="0.01" />
            <NumberField label="Number of Shares" value={shares} onChange={setShares} min={0} step="1" />
          </div>
          <Hint>Dividend yield = (dividend per share / share price) × 100%.</Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Dividend Yield" value={`${yieldPct.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`} />
          <ResultRows>
            <ResultRow label="Annual Dividend Income" value={`$${formatMoney(annual)}`} />
            <ResultRow label="Dividend per share" value={`$${formatMoney(d)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StockDividendCalculator;
