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

export interface RentIncreaseInput {
  currentRent: number;
  increasePercent: number;
  marketRent: number;
}

export function computeRentIncrease(input: RentIncreaseInput) {
  const newRent = input.currentRent * (1 + input.increasePercent / 100);
  const increase = newRent - input.currentRent;
  const difference = newRent - input.marketRent;
  const percentOfMarket = input.marketRent > 0 ? (newRent / input.marketRent) * 100 : 0;
  return { newRent, increase, difference, percentOfMarket };
}

export function RentIncreaseCalculator() {
  const [currentRent, setCurrentRent] = useState('1200');
  const [increasePercent, setIncreasePercent] = useState('5');
  const [marketRent, setMarketRent] = useState('1350');

  const result = useMemo(
    () =>
      computeRentIncrease({
        currentRent: Number(currentRent) || 0,
        increasePercent: Number(increasePercent) || 0,
        marketRent: Number(marketRent) || 0,
      }),
    [currentRent, increasePercent, marketRent]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Current rent ($)" value={currentRent} onChange={setCurrentRent} min={0} step="50" />
            <NumberField label="Increase (%)" value={increasePercent} onChange={setIncreasePercent} min={0} step="0.5" />
            <NumberField label="Market rent ($)" value={marketRent} onChange={setMarketRent} min={0} step="50" />
          </div>
          <Hint>
            Apply the percentage increase to your current rent to find the new amount. Compare
            against the market rent to see whether you are above, at or below market after the
            increase.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="New rent"
            value={`${formatMoney(result.newRent)}`}
            sub={`Increase ${formatMoney(result.increase)}`}
          />
          <ResultRows>
            <ResultRow label="Increase amount" value={formatMoney(result.increase)} />
            <ResultRow label="Difference from market" value={formatMoney(result.difference)} />
            <ResultRow label="Percent of market" value={`${formatMoney(result.percentOfMarket)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default RentIncreaseCalculator;