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

export interface EarningsPerShareInput {
  netIncome: number;
  preferredDividends: number;
  sharesOutstanding: number;
}

export function computeEarningsPerShare(input: EarningsPerShareInput) {
  const income = Math.max(0, input.netIncome);
  const dividends = Math.max(0, input.preferredDividends);
  const shares = Math.max(0, input.sharesOutstanding);
  const earnings = Math.max(0, income - dividends);
  const eps = shares > 0 ? earnings / shares : 0;
  return { earnings, eps };
}

export function EarningsPerShareCalculator() {
  const [netIncome, setNetIncome] = useState('500000');
  const [preferredDividends, setPreferredDividends] = useState('50000');
  const [sharesOutstanding, setSharesOutstanding] = useState('100000');

  const result = computeEarningsPerShare({
    netIncome: Number(netIncome) || 0,
    preferredDividends: Number(preferredDividends) || 0,
    sharesOutstanding: Number(sharesOutstanding) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Net income ($)" value={netIncome} onChange={setNetIncome} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Preferred dividends ($)" value={preferredDividends} onChange={setPreferredDividends} min={0} />
              <NumberField label="Shares outstanding" value={sharesOutstanding} onChange={setSharesOutstanding} min={0} />
            </div>
          </div>
          <Hint>
            Basic EPS uses the average shares outstanding during the period; diluted EPS would also count options
            and convertibles.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Earnings per share"
            value={`$${formatMoney(result.eps)}`}
            sub={`Earnings available to common shares $${formatMoney(result.earnings)}`}
          />
          <ResultRows>
            <ResultRow label="Earnings available to common" value={`$${formatMoney(result.earnings)}`} />
            <ResultRow label="Shares outstanding" value={`${formatMoney(Number(sharesOutstanding) || 0, 0)}`} />
            <ResultRow label="Earnings for every $100 of stock" value={`$${formatMoney(result.eps * 100)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EarningsPerShareCalculator;
