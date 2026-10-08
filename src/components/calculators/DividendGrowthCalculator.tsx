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

export interface DividendGrowthInput {
  currentDividend: number;
  growthRate: number;
  years: number;
}

export function computeDividendGrowth(input: DividendGrowthInput) {
  const dividend = Math.max(0, input.currentDividend);
  const rate = input.growthRate / 100;
  const years = Math.max(0, Math.floor(input.years));
  const futureDividend = dividend * Math.pow(1 + rate, years);
  const totalReceived =
    rate === 0 ? dividend * years : (dividend * (Math.pow(1 + rate, years) - 1)) / rate;
  const cumulativeGrowth = dividend > 0 ? ((futureDividend - dividend) / dividend) * 100 : 0;
  return { futureDividend, totalReceived, cumulativeGrowth, years };
}

export function DividendGrowthCalculator() {
  const [currentDividend, setCurrentDividend] = useState('2');
  const [growthRate, setGrowthRate] = useState('6');
  const [years, setYears] = useState('10');

  const result = computeDividendGrowth({
    currentDividend: Number(currentDividend) || 0,
    growthRate: Number(growthRate) || 0,
    years: Number(years) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Current annual dividend ($)" value={currentDividend} onChange={setCurrentDividend} step="0.05" min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Dividend growth (%)" value={growthRate} onChange={setGrowthRate} step="0.1" />
              <NumberField label="Years held" value={years} onChange={setYears} min={0} max={60} />
            </div>
          </div>
          <Hint>
            Growing dividends compound: a payout that rises every year eventually overtakes the original
            investment's yield on cost.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Dividend in the final year"
            value={`$${formatMoney(result.futureDividend)}`}
            sub={`Paid annually after ${result.years} year(s)`}
          />
          <ResultRows>
            <ResultRow label="Total dividends received" value={`$${formatMoney(result.totalReceived)}`} />
            <ResultRow label="Cumulative dividend growth" value={`${formatMoney(result.cumulativeGrowth)}%`} />
            <ResultRow label="Starting dividend" value={`$${formatMoney(Number(currentDividend) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DividendGrowthCalculator;
