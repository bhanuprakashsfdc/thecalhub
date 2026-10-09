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

export interface ReverseStockSplitInput {
  shares: number;
  price: number;
  ratio: number;
}

export interface ReverseStockSplitResult {
  newShares: number;
  newPrice: number;
  valueBefore: number;
  valueAfter: number;
  sharesCancelled: number;
  priceChangePercent: number;
}

const pos = (n: number) => {
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

export function computeReverseStockSplit(input: ReverseStockSplitInput): ReverseStockSplitResult {
  const shares = pos(input.shares);
  const price = pos(input.price);
  const rawRatio = pos(input.ratio);
  const ratio = rawRatio > 0 ? rawRatio : 1;

  const newShares = shares / ratio;
  const newPrice = price * ratio;
  const valueBefore = shares * price;
  const valueAfter = newShares * newPrice;
  const sharesCancelled = shares - newShares;
  const priceChangePercent = price > 0 ? ((newPrice - price) / price) * 100 : 0;

  return { newShares, newPrice, valueBefore, valueAfter, sharesCancelled, priceChangePercent };
}

export function ReverseStockSplitCalculator() {
  const [shares, setShares] = useState('100');
  const [price, setPrice] = useState('5');
  const [ratio, setRatio] = useState('5');

  const sharesNum = Number(shares) || 0;
  const priceNum = Number(price) || 0;
  const ratioNum = Number(ratio) || 0;

  const result = computeReverseStockSplit({
    shares: sharesNum,
    price: priceNum,
    ratio: ratioNum,
  });

  const ratioLabel = ratioNum > 0 ? `1-for-${formatMoney(ratioNum, 0)}` : 'no split';

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Shares owned" value={shares} onChange={setShares} min={0} step="1" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Current share price ($)" value={price} onChange={setPrice} min={0} step="0.01" />
              <NumberField label="Reverse ratio (1-for-N)" value={ratio} onChange={setRatio} min={0} step="1" />
            </div>
          </div>
          <Hint>
            A 1-for-5 reverse split turns 5 old shares into 1 new share: your share count is divided by 5 and
            the share price is multiplied by 5, leaving the value of your holding unchanged.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="New share price"
            value={`$${formatMoney(result.newPrice)}`}
            sub={`${formatMoney(result.newShares, 4)} shares after a ${ratioLabel} reverse split`}
          />
          <ResultRows>
            <ResultRow label="New share count" value={formatMoney(result.newShares, 4)} />
            <ResultRow label="Shares cancelled" value={formatMoney(result.sharesCancelled, 4)} />
            <ResultRow label="Value before split" value={`$${formatMoney(result.valueBefore)}`} />
            <ResultRow label="Value after split" value={`$${formatMoney(result.valueAfter)}`} />
            <ResultRow label="Share price change" value={`${formatMoney(result.priceChangePercent)}%`} />
          </ResultRows>
          <Hint>
            Total value stays the same on paper; brokers typically cash out fractional shares left after the
            ratio is applied, which is shown as shares cancelled minus whole new shares.
          </Hint>
        </Panel>
      }
    />
  );
}

export default ReverseStockSplitCalculator;
