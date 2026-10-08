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

export interface SavingsBondInput {
  purchasePrice: number;
  annualRate: number;
  years: number;
}

export function computeSavingsBond(input: SavingsBondInput) {
  const years = Math.max(0, input.years);
  const maturityValue = input.purchasePrice * Math.pow(1 + input.annualRate / 100, years);
  const interestEarned = maturityValue - input.purchasePrice;
  const totalReturnPct = input.purchasePrice > 0 ? (interestEarned / input.purchasePrice) * 100 : 0;
  return { years, maturityValue, interestEarned, totalReturnPct };
}

export function SavingsBondCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('1000');
  const [annualRate, setAnnualRate] = useState('4.5');
  const [years, setYears] = useState('10');

  const result = computeSavingsBond({
    purchasePrice: Number(purchasePrice) || 0,
    annualRate: Number(annualRate) || 0,
    years: Number(years) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Purchase price ($)" value={purchasePrice} onChange={setPurchasePrice} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Annual interest rate (%)" value={annualRate} onChange={setAnnualRate} step="0.1" min={0} />
              <NumberField label="Years to maturity" value={years} onChange={setYears} min={0} max={50} />
            </div>
          </div>
          <Hint>
            Savings bonds compound until they mature, so the longer you hold them the more the interest earns
            interest. Compare the final value with inflation before deciding to hold to maturity.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Value at maturity"
            value={`$${formatMoney(result.maturityValue)}`}
            sub={`After ${result.years} year(s) of compounding`}
          />
          <ResultRows>
            <ResultRow label="Interest earned" value={`$${formatMoney(result.interestEarned)}`} />
            <ResultRow label="Total return" value={`${formatMoney(result.totalReturnPct)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SavingsBondCalculator;
