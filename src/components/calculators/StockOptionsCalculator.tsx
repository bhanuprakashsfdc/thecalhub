import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SegmentedControl,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface StockOptionsInput {
  strike: number;
  stockPrice: number;
  premium: number;
  contracts: number;
  optionType: 'call' | 'put';
}

export function computeStockOptions(input: StockOptionsInput) {
  const shares = Math.max(0, input.contracts) * 100;
  const intrinsic =
    input.optionType === 'call'
      ? Math.max(0, input.stockPrice - input.strike)
      : Math.max(0, input.strike - input.stockPrice);
  const payoffPerShare = intrinsic - input.premium;
  const profit = payoffPerShare * shares;
  const breakeven =
    input.optionType === 'call' ? input.strike + input.premium : input.strike - input.premium;
  const totalPremium = input.premium * shares;
  return { intrinsic, payoffPerShare, profit, breakeven, totalPremium, shares };
}

export function StockOptionsCalculator() {
  const [strike, setStrike] = useState('50');
  const [stockPrice, setStockPrice] = useState('55');
  const [premium, setPremium] = useState('2');
  const [contracts, setContracts] = useState('1');
  const [optionType, setOptionType] = useState('call');

  const result = computeStockOptions({
    strike: Number(strike) || 0,
    stockPrice: Number(stockPrice) || 0,
    premium: Number(premium) || 0,
    contracts: Number(contracts) || 0,
    optionType: optionType === 'put' ? 'put' : 'call',
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SegmentedControl
              label="Option type"
              value={optionType}
              onChange={setOptionType}
              options={[
                { value: 'call', label: 'Call' },
                { value: 'put', label: 'Put' },
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Strike price ($)" value={strike} onChange={setStrike} min={0} />
              <NumberField label="Stock price ($)" value={stockPrice} onChange={setStockPrice} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Premium per share ($)" value={premium} onChange={setPremium} min={0} step="0.05" />
              <NumberField label="Contracts" value={contracts} onChange={setContracts} min={0} step="1" />
            </div>
          </div>
          <Hint>
            Each contract covers 100 shares. Profit = (intrinsic value − premium) × 100 ×
            contracts. Call breakeven is strike + premium; put breakeven is strike − premium.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Profit or loss"
            value={`$${formatMoney(result.profit)}`}
            sub="At expiry"
          />
          <ResultRows>
            <ResultRow label="Intrinsic value per share" value={`$${formatMoney(result.intrinsic)}`} />
            <ResultRow label="Breakeven price" value={`$${formatMoney(result.breakeven)}`} />
            <ResultRow label="Total premium paid" value={`$${formatMoney(result.totalPremium)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StockOptionsCalculator;
