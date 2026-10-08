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

export interface StockReturnInput {
  purchasePrice: number;
  salePrice: number;
  dividendsReceived: number;
  yearsHeld: number;
}

export function computeStockReturn(input: StockReturnInput) {
  const buy = Math.max(0, input.purchasePrice);
  const sell = Math.max(0, input.salePrice);
  const dividends = Math.max(0, input.dividendsReceived);
  const years = Math.max(1, input.yearsHeld);
  const profit = sell - buy + dividends;
  const totalReturn = buy > 0 ? (profit / buy) * 100 : 0;
  const growthFactor = 1 + totalReturn / 100;
  const annualised = growthFactor > 0 ? (Math.pow(growthFactor, 1 / years) - 1) * 100 : 0;
  return { profit, totalReturn, annualised };
}

export function StockReturnCalculator() {
  const [purchasePrice, setPurchasePrice] = useState('50');
  const [salePrice, setSalePrice] = useState('75');
  const [dividendsReceived, setDividendsReceived] = useState('6');
  const [yearsHeld, setYearsHeld] = useState('3');

  const result = computeStockReturn({
    purchasePrice: Number(purchasePrice) || 0,
    salePrice: Number(salePrice) || 0,
    dividendsReceived: Number(dividendsReceived) || 0,
    yearsHeld: Number(yearsHeld) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Purchase price ($)" value={purchasePrice} onChange={setPurchasePrice} min={0} />
              <NumberField label="Selling price ($)" value={salePrice} onChange={setSalePrice} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Dividends received ($)" value={dividendsReceived} onChange={setDividendsReceived} min={0} />
              <NumberField label="Years held" value={yearsHeld} onChange={setYearsHeld} min={1} max={60} />
            </div>
          </div>
          <Hint>
            Total return combines price change and dividends, so two stocks with identical price moves can still
            perform very differently.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total return"
            value={`${formatMoney(result.totalReturn)}%`}
            sub={`Profit of $${formatMoney(result.profit)} per share`}
          />
          <ResultRows>
            <ResultRow label="Profit per share" value={`$${formatMoney(result.profit)}`} />
            <ResultRow label="Annualised return" value={`${formatMoney(result.annualised)}%`} />
            <ResultRow label="Dividends included" value={`$${formatMoney(Number(dividendsReceived) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StockReturnCalculator;
