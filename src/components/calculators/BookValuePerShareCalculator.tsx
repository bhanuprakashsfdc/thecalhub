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

export interface BookValuePerShareInput {
  totalEquity: number;
  preferredEquity: number;
  sharesOutstanding: number;
}

export function computeBookValuePerShare(input: BookValuePerShareInput) {
  const commonEquity = Math.max(0, input.totalEquity) - Math.max(0, input.preferredEquity);
  const shares = Math.max(0, input.sharesOutstanding);
  const bookValuePerShare = shares > 0 ? Math.max(0, commonEquity) / shares : 0;
  return { commonEquity: Math.max(0, commonEquity), bookValuePerShare };
}

export function BookValuePerShareCalculator() {
  const [totalEquity, setTotalEquity] = useState('2000000');
  const [preferredEquity, setPreferredEquity] = useState('200000');
  const [sharesOutstanding, setSharesOutstanding] = useState('100000');

  const result = computeBookValuePerShare({
    totalEquity: Number(totalEquity) || 0,
    preferredEquity: Number(preferredEquity) || 0,
    sharesOutstanding: Number(sharesOutstanding) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total shareholders equity ($)" value={totalEquity} onChange={setTotalEquity} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Preferred equity ($)" value={preferredEquity} onChange={setPreferredEquity} min={0} />
              <NumberField label="Shares outstanding" value={sharesOutstanding} onChange={setSharesOutstanding} min={0} />
            </div>
          </div>
          <Hint>
            Preferred shareholders are paid before common holders, so their claim is removed before the equity is
            divided across common shares.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Book value per share"
            value={`$${formatMoney(result.bookValuePerShare)}`}
            sub={`Common equity $${formatMoney(result.commonEquity)}`}
          />
          <ResultRows>
            <ResultRow label="Common equity" value={`$${formatMoney(result.commonEquity)}`} />
            <ResultRow label="Shares outstanding" value={`${formatMoney(Number(sharesOutstanding) || 0, 0)}`} />
            <ResultRow label="Equity per $1,000 shares" value={`$${formatMoney(result.bookValuePerShare * 1000)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default BookValuePerShareCalculator;
