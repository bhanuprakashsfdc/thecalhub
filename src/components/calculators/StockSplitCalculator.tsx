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

export interface StockSplitInput {
  shares: number;
  price: number;
  ratio: number;
}

export interface StockSplitResult {
  newShares: number;
  newPrice: number;
  additionalShares: number;
  valueBefore: number;
  valueAfter: number;
  priceChangePercent: number;
}

const pos = (n: number) => {
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

export function computeStockSplit(input: StockSplitInput): StockSplitResult {
  const shares = pos(input.shares);
  const price = pos(input.price);
  const ratio = pos(input.ratio);

  const newShares = shares * ratio;
  const newPrice = ratio > 0 ? price / ratio : price;
  const additionalShares = newShares - shares;
  const valueBefore = shares * price;
  const valueAfter = newShares * newPrice;
  const priceChangePercent = price > 0 ? ((newPrice - price) / price) * 100 : 0;

  return { newShares, newPrice, additionalShares, valueBefore, valueAfter, priceChangePercent };
}

export function StockSplitCalculator() {
  const [shares, setShares] = useState('100');
  const [price, setPrice] = useState('50');
  const [ratio, setRatio] = useState('2');

  const sharesNum = Number(shares) || 0;
  const priceNum = Number(price) || 0;
  const ratioNum = Number(ratio) || 0;

  const result = computeStockSplit({
    shares: sharesNum,
    price: priceNum,
    ratio: ratioNum,
  });

  const ratioLabel = ratioNum > 0 ? `${formatMoney(ratioNum, 2)}-for-1` : 'no split';

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Shares owned" value={shares} onChange={setShares} min={0} step="1" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Current share price ($)" value={price} onChange={setPrice} min={0} step="0.01" />
              <NumberField label="Split ratio (new per old)" value={ratio} onChange={setRatio} min={0} step="0.5" />
            </div>
          </div>
          <Hint>
            A 2-for-1 split multiplies your share count by 2 and halves the share price: 100 shares at $50
            become 200 shares at $25, so the total value of the position is unchanged.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="New share price"
            value={`$${formatMoney(result.newPrice)}`}
            sub={`${formatMoney(result.newShares, 4)} shares after a ${ratioLabel} split`}
          />
          <ResultRows>
            <ResultRow label="New share count" value={formatMoney(result.newShares, 4)} />
            <ResultRow label="Additional shares" value={formatMoney(result.additionalShares, 4)} />
            <ResultRow label="Value before split" value={`$${formatMoney(result.valueBefore)}`} />
            <ResultRow label="Value after split" value={`$${formatMoney(result.valueAfter)}`} />
            <ResultRow label="Share price change" value={`${formatMoney(result.priceChangePercent)}%`} />
          </ResultRows>
          <Hint>
            Only the share count and share price change; cost basis per share is divided by the same ratio,
            so your original investment total is preserved.
          </Hint>
        </Panel>
      }
    />
  );
}

export default StockSplitCalculator;
