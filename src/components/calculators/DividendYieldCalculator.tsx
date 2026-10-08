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

export interface DividendYieldInput {
  annualDividend: number;
  sharePrice: number;
  sharesOwned: number;
}

export function computeDividendYield(input: DividendYieldInput) {
  const dividend = Math.max(0, input.annualDividend);
  const price = Math.max(0, input.sharePrice);
  const shares = Math.max(0, input.sharesOwned);
  const yieldPct = safeDiv(dividend, price) * 100;
  const annualIncome = dividend * shares;
  return { yieldPct, annualIncome, quarterlyIncome: annualIncome / 4 };
}

export function DividendYieldCalculator() {
  const [annualDividend, setAnnualDividend] = useState('1.8');
  const [sharePrice, setSharePrice] = useState('60');
  const [sharesOwned, setSharesOwned] = useState('500');

  const result = computeDividendYield({
    annualDividend: Number(annualDividend) || 0,
    sharePrice: Number(sharePrice) || 0,
    sharesOwned: Number(sharesOwned) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Annual dividend per share ($)" value={annualDividend} onChange={setAnnualDividend} step="0.05" min={0} />
              <NumberField label="Share price ($)" value={sharePrice} onChange={setSharePrice} min={0} />
            </div>
            <NumberField label="Shares owned" value={sharesOwned} onChange={setSharesOwned} min={0} />
          </div>
          <Hint>
            Yield moves inversely with price: the same dividend pays a higher yield when the share price falls.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Dividend yield"
            value={`${formatMoney(result.yieldPct)}%`}
            sub={`$${formatMoney(result.annualIncome)} paid each year`}
          />
          <ResultRows>
            <ResultRow label="Annual income from dividends" value={`$${formatMoney(result.annualIncome)}`} />
            <ResultRow label="Quarterly income" value={`$${formatMoney(result.quarterlyIncome)}`} />
            <ResultRow label="Yield on $10,000 invested" value={`$${formatMoney((result.yieldPct / 100) * 10000)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DividendYieldCalculator;
