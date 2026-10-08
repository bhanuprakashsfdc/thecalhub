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

export interface GrahamNumberInput {
  earningsPerShare: number;
  bookValuePerShare: number;
  marketPrice: number;
}

export function computeGrahamNumber(input: GrahamNumberInput) {
  const eps = Math.max(0, input.earningsPerShare);
  const bvps = Math.max(0, input.bookValuePerShare);
  const product = 22.5 * eps * bvps;
  const grahamNumber = product > 0 ? Math.sqrt(product) : 0;
  const price = Math.max(0, input.marketPrice);
  const gapPercent = grahamNumber > 0 ? ((grahamNumber - price) / price) * 100 : 0;
  return { grahamNumber, price, gapPercent };
}

export function GrahamNumberCalculator() {
  const [earningsPerShare, setEarningsPerShare] = useState('5');
  const [bookValuePerShare, setBookValuePerShare] = useState('40');
  const [marketPrice, setMarketPrice] = useState('80');

  const result = computeGrahamNumber({
    earningsPerShare: Number(earningsPerShare) || 0,
    bookValuePerShare: Number(bookValuePerShare) || 0,
    marketPrice: Number(marketPrice) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Earnings per share ($)" value={earningsPerShare} onChange={setEarningsPerShare} step="0.1" min={0} />
              <NumberField label="Book value per share ($)" value={bookValuePerShare} onChange={setBookValuePerShare} step="0.1" min={0} />
            </div>
            <NumberField label="Current market price ($)" value={marketPrice} onChange={setMarketPrice} min={0} />
          </div>
          <Hint>
            Benjamin Graham's number assumes a company should not trade above 15 times earnings and 1.5 times
            book value — hence the 22.5 multiplier inside the square root.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Graham number"
            value={`$${formatMoney(result.grahamNumber)}`}
            sub={`Market price $${formatMoney(result.price)}`}
          />
          <ResultRows>
            <ResultRow label="Upside vs market price" value={`${formatMoney(result.gapPercent)}%`} />
            <ResultRow label="Earnings per share" value={`$${formatMoney(Number(earningsPerShare) || 0)}`} />
            <ResultRow label="Book value per share" value={`$${formatMoney(Number(bookValuePerShare) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default GrahamNumberCalculator;
