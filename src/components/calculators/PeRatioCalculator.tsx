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

export interface PeRatioInput {
  sharePrice: number;
  earningsPerShare: number;
  benchmarkMultiple: number;
}

export function computePeRatio(input: PeRatioInput) {
  const eps = Math.max(0, input.earningsPerShare);
  const price = Math.max(0, input.sharePrice);
  const peRatio = safeDiv(price, eps);
  const earningsYield = price > 0 ? (eps / price) * 100 : 0;
  const benchmarkPrice = eps * Math.max(0, input.benchmarkMultiple);
  return { peRatio, earningsYield, benchmarkPrice };
}

export function PeRatioCalculator() {
  const [sharePrice, setSharePrice] = useState('150');
  const [earningsPerShare, setEarningsPerShare] = useState('6');
  const [benchmarkMultiple, setBenchmarkMultiple] = useState('20');

  const result = computePeRatio({
    sharePrice: Number(sharePrice) || 0,
    earningsPerShare: Number(earningsPerShare) || 0,
    benchmarkMultiple: Number(benchmarkMultiple) || 0,
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
            <NumberField label="Benchmark P/E (x)" value={benchmarkMultiple} onChange={setBenchmarkMultiple} step="0.5" min={0} />
          </div>
          <Hint>
            The P/E ratio is the price of one dollar of annual earnings — compare it with the sector average
            rather than in isolation.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="P/E ratio"
            value={`${formatMoney(result.peRatio)}x`}
            sub={`Earnings yield ${formatMoney(result.earningsYield)}%`}
          />
          <ResultRows>
            <ResultRow label="Earnings yield" value={`${formatMoney(result.earningsYield)}%`} />
            <ResultRow label="Price at the benchmark multiple" value={`$${formatMoney(result.benchmarkPrice)}`} />
            <ResultRow label="Earnings per share" value={`$${formatMoney(Number(earningsPerShare) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PeRatioCalculator;
