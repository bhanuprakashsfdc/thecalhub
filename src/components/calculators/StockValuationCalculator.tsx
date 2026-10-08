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

export interface StockValuationInput {
  nextDividend: number;
  dividendGrowth: number;
  requiredReturn: number;
  currentPrice: number;
}

export function computeStockValuation(input: StockValuationInput) {
  const dividend = Math.max(0, input.nextDividend);
  const growth = input.dividendGrowth / 100;
  const required = input.requiredReturn / 100;
  const value = required > growth ? dividend / (required - growth) : 0;
  const price = Math.max(0, input.currentPrice);
  const upside = value > 0 && price > 0 ? ((value - price) / price) * 100 : 0;
  const dividendYield = value > 0 ? (dividend / value) * 100 : 0;
  return { value, upside, dividendYield };
}

export function StockValuationCalculator() {
  const [nextDividend, setNextDividend] = useState('2.5');
  const [dividendGrowth, setDividendGrowth] = useState('4');
  const [requiredReturn, setRequiredReturn] = useState('9');
  const [currentPrice, setCurrentPrice] = useState('45');

  const result = computeStockValuation({
    nextDividend: Number(nextDividend) || 0,
    dividendGrowth: Number(dividendGrowth) || 0,
    requiredReturn: Number(requiredReturn) || 0,
    currentPrice: Number(currentPrice) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Dividend next year ($)" value={nextDividend} onChange={setNextDividend} step="0.05" min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Dividend growth (%)" value={dividendGrowth} onChange={setDividendGrowth} step="0.1" />
              <NumberField label="Required return (%)" value={requiredReturn} onChange={setRequiredReturn} step="0.1" />
            </div>
            <NumberField label="Current market price ($)" value={currentPrice} onChange={setCurrentPrice} min={0} />
          </div>
          <Hint>
            The Gordon growth model values a share as the next dividend divided by the gap between your required
            return and the dividend growth rate.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Intrinsic value per share"
            value={`$${formatMoney(result.value)}`}
            sub={`Upside ${formatMoney(result.upside)}% vs market`}
          />
          <ResultRows>
            <ResultRow label="Upside vs market price" value={`${formatMoney(result.upside)}%`} />
            <ResultRow label="Dividend yield at this value" value={`${formatMoney(result.dividendYield)}%`} />
            <ResultRow label="Current market price" value={`$${formatMoney(Number(currentPrice) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StockValuationCalculator;
