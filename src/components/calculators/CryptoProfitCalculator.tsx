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

export interface CryptoProfitInput {
  buyPrice: number;
  sellPrice: number;
  quantity: number;
  feePercent: number;
}

export interface CryptoProfitResult {
  cost: number;
  revenue: number;
  fees: number;
  profit: number;
  roiPercent: number;
  breakEvenPrice: number;
}

const pos = (n: number) => {
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

export function computeCryptoProfit(input: CryptoProfitInput): CryptoProfitResult {
  const buyPrice = pos(input.buyPrice);
  const sellPrice = pos(input.sellPrice);
  const quantity = pos(input.quantity);
  const feePercent = Math.min(100, pos(input.feePercent));

  const cost = buyPrice * quantity;
  const revenue = sellPrice * quantity;
  const buyFee = cost * feePercent * 0.01;
  const sellFee = revenue * feePercent * 0.01;
  const fees = buyFee + sellFee;
  const profit = revenue - sellFee - cost - buyFee;
  const roiPercent = cost > 0 ? (profit / cost) * 100 : 0;
  const breakEvenPrice =
    feePercent < 100 && quantity > 0 ? (buyFee + cost) / (quantity * (1 - feePercent * 0.01)) : 0;

  return { cost, revenue, fees, profit, roiPercent, breakEvenPrice };
}

export function CryptoProfitCalculator() {
  const [buyPrice, setBuyPrice] = useState('30000');
  const [sellPrice, setSellPrice] = useState('45000');
  const [quantity, setQuantity] = useState('0.5');
  const [feePercent, setFeePercent] = useState('0.1');

  const result = computeCryptoProfit({
    buyPrice: Number(buyPrice) || 0,
    sellPrice: Number(sellPrice) || 0,
    quantity: Number(quantity) || 0,
    feePercent: Number(feePercent) || 0,
  });

  const breakEven = Number(buyPrice) > 0 && Number(feePercent) < 100;

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Buy price ($)" value={buyPrice} onChange={setBuyPrice} min={0} />
              <NumberField label="Sell price ($)" value={sellPrice} onChange={setSellPrice} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Quantity held" value={quantity} onChange={setQuantity} min={0} step="0.001" />
              <NumberField label="Trading fee (%)" value={feePercent} onChange={setFeePercent} min={0} step="0.01" />
            </div>
          </div>
          <Hint>
            Fees are charged on both the buy and the sell side, so the break-even price sits slightly above your
            entry price. Return on investment is measured against the capital you put in.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Net profit"
            value={`$${formatMoney(result.profit)}`}
            sub={`ROI ${formatMoney(result.roiPercent)}% on $${formatMoney(result.cost)} invested`}
          />
          <ResultRows>
            <ResultRow label="Total cost" value={`$${formatMoney(result.cost)}`} />
            <ResultRow label="Gross revenue" value={`$${formatMoney(result.revenue)}`} />
            <ResultRow label="Trading fees paid" value={`$${formatMoney(result.fees)}`} />
            <ResultRow label="Return on investment" value={`${formatMoney(result.roiPercent)}%`} />
            <ResultRow
              label="Break-even sell price"
              value={breakEven ? `$${formatMoney(result.breakEvenPrice)}` : '—'}
            />
          </ResultRows>
          <Hint>
            Profit equals revenue minus both trading fees and your original cost; a negative figure means the
            trade closed at a loss.
          </Hint>
        </Panel>
      }
    />
  );
}

export default CryptoProfitCalculator;
