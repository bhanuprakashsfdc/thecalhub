import { useState, useMemo } from 'react';
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

export interface DividendInput {
  annualDividend: number;
  sharePrice: number;
  shares: number;
  payoutRatio: number;
}

export function computeDividend(input: DividendInput) {
  const yieldPct = input.sharePrice > 0 ? (input.annualDividend / input.sharePrice) * 100 : 0;
  const annualIncome = input.shares * input.annualDividend;
  const monthlyIncome = annualIncome / 12;
  const totalInvested = input.shares * input.sharePrice;
  const paybackYears = input.annualDividend > 0 ? totalInvested / annualIncome : 0;
  return { yieldPct, annualIncome, monthlyIncome, totalInvested, paybackYears };
}

export function DividendCalculator() {
  const [annualDividend, setAnnualDividend] = useState('2.50');
  const [sharePrice, setSharePrice] = useState('50');
  const [shares, setShares] = useState('100');
  const [payoutRatio, setPayoutRatio] = useState('40');

  const result = useMemo(
    () =>
      computeDividend({
        annualDividend: Number(annualDividend) || 0,
        sharePrice: Number(sharePrice) || 0,
        shares: Number(shares) || 0,
        payoutRatio: Number(payoutRatio) || 0,
      }),
    [annualDividend, sharePrice, shares, payoutRatio]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Annual dividend per share ($)" value={annualDividend} onChange={setAnnualDividend} min={0} step="0.10" />
            <NumberField label="Share price ($)" value={sharePrice} onChange={setSharePrice} min={0} step="0.10" />
            <NumberField label="Shares held" value={shares} onChange={setShares} min={0} step="1" />
            <NumberField label="Payout ratio (%)" value={payoutRatio} onChange={setPayoutRatio} min={0} max={100} step="1" />
          </div>
          <Hint>
            Dividend yield = annual dividend ÷ share price. Multiply by shares for annual income.
            The payout ratio shows what share of earnings is returned to shareholders.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Dividend yield"
            value={`${formatMoney(result.yieldPct)}%`}
            sub={`Annual income ${formatMoney(result.annualIncome)}`}
          />
          <ResultRows>
            <ResultRow label="Annual income" value={formatMoney(result.annualIncome)} />
            <ResultRow label="Monthly income" value={formatMoney(result.monthlyIncome)} />
            <ResultRow label="Total invested" value={formatMoney(result.totalInvested)} />
            <ResultRow label="Payback period (years)" value={formatMoney(result.paybackYears)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DividendCalculator;