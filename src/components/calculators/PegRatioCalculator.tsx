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

export interface PegRatioInput {
  sharePrice: number;
  earningsPerShare: number;
  epsGrowth: number;
}

export function computePegRatio(input: PegRatioInput) {
  const eps = Math.max(0, input.earningsPerShare);
  const price = Math.max(0, input.sharePrice);
  const peRatio = safeDiv(price, eps);
  const growth = Math.max(0, input.epsGrowth);
  const peg = growth > 0 ? peRatio / growth : 0;
  const verdict = peg === 0 ? 'No growth input' : peg < 1 ? 'Often seen as undervalued' : peg <= 2 ? 'In line with growth' : 'Expensive vs growth';
  return { peRatio, growth, peg, verdict };
}

export function PegRatioCalculator() {
  const [sharePrice, setSharePrice] = useState('120');
  const [earningsPerShare, setEarningsPerShare] = useState('4');
  const [epsGrowth, setEpsGrowth] = useState('15');

  const result = computePegRatio({
    sharePrice: Number(sharePrice) || 0,
    earningsPerShare: Number(earningsPerShare) || 0,
    epsGrowth: Number(epsGrowth) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Share price ($)" value={sharePrice} onChange={setSharePrice} min={0} />
              <NumberField label="Earnings per share ($)" value={earningsPerShare} onChange={setEarningsPerShare} step="0.01" min={0} />
            </div>
            <NumberField label="EPS growth (% per year)" value={epsGrowth} onChange={setEpsGrowth} step="0.5" min={0} />
          </div>
          <Hint>
            PEG adds a growth dimension to the P/E ratio: below 1.0 is often read as cheap relative to expected
            earnings growth, above 2.0 as expensive.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="PEG ratio"
            value={formatMoney(result.peg)}
            sub={result.verdict}
          />
          <ResultRows>
            <ResultRow label="P/E ratio" value={formatMoney(result.peRatio)} />
            <ResultRow label="EPS growth rate" value={`${formatMoney(result.growth)}%`} />
            <ResultRow label="Earnings per share" value={`$${formatMoney(Number(earningsPerShare) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PegRatioCalculator;
