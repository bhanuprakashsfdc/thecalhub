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

export interface CryptoTaxInput {
  proceeds: number;
  costBasis: number;
  fees: number;
  holdingDays: number;
  shortTermRate: number;
  longTermRate: number;
}

export interface CryptoTaxResult {
  gain: number;
  taxableGain: number;
  taxDue: number;
  netProceeds: number;
  holdingTerm: 'long' | 'short';
  appliedRate: number;
}

const num = (n: number) => (Number.isFinite(n) ? n : 0);
const pos = (n: number) => Math.max(0, num(n));

export function computeCryptoTax(input: CryptoTaxInput): CryptoTaxResult {
  const proceeds = pos(input.proceeds);
  const costBasis = pos(input.costBasis);
  const fees = pos(input.fees);
  const holdingDays = pos(input.holdingDays);
  const shortTermRate = pos(input.shortTermRate);
  const longTermRate = pos(input.longTermRate);

  const gain = proceeds - costBasis - fees;
  const holdingTerm: 'long' | 'short' = holdingDays > 365 ? 'long' : 'short';
  const appliedRate = holdingTerm === 'long' ? longTermRate : shortTermRate;
  const taxableGain = gain > 0 ? gain : 0;
  const taxDue = taxableGain * appliedRate * 0.01;

  return {
    gain,
    taxableGain,
    taxDue,
    netProceeds: proceeds - fees,
    holdingTerm,
    appliedRate,
  };
}

export function CryptoTaxCalculator() {
  const [proceeds, setProceeds] = useState('10000');
  const [costBasis, setCostBasis] = useState('6000');
  const [fees, setFees] = useState('100');
  const [holdingDays, setHoldingDays] = useState('400');
  const [shortTermRate, setShortTermRate] = useState('20');
  const [longTermRate, setLongTermRate] = useState('15');

  const result = computeCryptoTax({
    proceeds: Number(proceeds) || 0,
    costBasis: Number(costBasis) || 0,
    fees: Number(fees) || 0,
    holdingDays: Number(holdingDays) || 0,
    shortTermRate: Number(shortTermRate) || 0,
    longTermRate: Number(longTermRate) || 0,
  });

  const proceedsNum = Number(proceeds) || 0;

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Proceeds from sales ($)" value={proceeds} onChange={setProceeds} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Cost basis ($)" value={costBasis} onChange={setCostBasis} min={0} />
              <NumberField label="Trading fees ($)" value={fees} onChange={setFees} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Holding period (days)" value={holdingDays} onChange={setHoldingDays} min={0} />
              <NumberField label="Short-term tax rate (%)" value={shortTermRate} onChange={setShortTermRate} min={0} />
            </div>
            <NumberField label="Long-term tax rate (%)" value={longTermRate} onChange={setLongTermRate} min={0} />
          </div>
          <Hint>
            Gains on coins held longer than 365 days use the long-term rate; anything shorter is taxed as a
            short-term gain. Losses and losses after fees produce no tax bill in this model.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Estimated tax due"
            value={`$${formatMoney(result.taxDue)}`}
            sub={`${result.holdingTerm === 'long' ? 'Long' : 'Short'}-term gain of $${formatMoney(
              result.taxableGain
            )} taxed at ${formatMoney(result.appliedRate)}%`}
          />
          <ResultRows>
            <ResultRow
              label="Capital gain / loss"
              value={`$${formatMoney(result.gain)}`}
            />
            <ResultRow label="Taxable gain" value={`$${formatMoney(result.taxableGain)}`} />
            <ResultRow label="Net proceeds after fees" value={`$${formatMoney(result.netProceeds)}`} />
            <ResultRow
              label="Effective tax rate"
              value={`${formatMoney(safeDiv(result.taxDue, proceedsNum) * 100)}%`}
            />
          </ResultRows>
          <Hint>
            Effective tax rate divides the estimated bill by your gross proceeds, so it shows how much of the
            sale value is lost to tax after costs.
          </Hint>
        </Panel>
      }
    />
  );
}

export default CryptoTaxCalculator;
