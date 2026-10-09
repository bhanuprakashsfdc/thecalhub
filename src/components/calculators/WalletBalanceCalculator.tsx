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

export interface WalletBalanceInput {
  quantity: number;
  costBasis: number;
  currentPrice: number;
}

export interface WalletBalanceResult {
  marketValue: number;
  invested: number;
  unrealizedPnl: number;
  pnlPercent: number;
  priceChangePercent: number;
}

const safe = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

export function computeWalletBalance(input: WalletBalanceInput): WalletBalanceResult {
  const quantity = safe(input.quantity);
  const costBasis = safe(input.costBasis);
  const currentPrice = safe(input.currentPrice);

  const marketValue = quantity * currentPrice;
  const invested = quantity * costBasis;
  const unrealizedPnl = marketValue - invested;
  const pnlPercent = invested > 0 ? (unrealizedPnl / invested) * 100 : 0;
  const priceChangePercent = costBasis > 0 ? ((currentPrice - costBasis) / costBasis) * 100 : 0;

  return { marketValue, invested, unrealizedPnl, pnlPercent, priceChangePercent };
}

export function WalletBalanceCalculator() {
  const [quantity, setQuantity] = useState('0.5');
  const [costBasis, setCostBasis] = useState('30000');
  const [currentPrice, setCurrentPrice] = useState('45000');

  const result = computeWalletBalance({
    quantity: Number(quantity) || 0,
    costBasis: Number(costBasis) || 0,
    currentPrice: Number(currentPrice) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Coin quantity held"
              value={quantity}
              onChange={setQuantity}
              min={0}
              step="0.001"
              hint="e.g. 0.5 BTC"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Average purchase price ($)"
                value={costBasis}
                onChange={setCostBasis}
                min={0}
              />
              <NumberField
                label="Current price ($)"
                value={currentPrice}
                onChange={setCurrentPrice}
                min={0}
              />
            </div>
          </div>
          <Hint>
            Enter the coin amount you hold, what you paid on average, and the current market price to see your
            portfolio value and unrealised profit or loss.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Market value"
            value={`$${formatMoney(result.marketValue)}`}
            sub="Current value of your holdings"
          />
          <ResultRows>
            <ResultRow label="Total invested" value={`$${formatMoney(result.invested)}`} />
            <ResultRow
              label="Unrealised P&L"
              value={`$${formatMoney(result.unrealizedPnl)} (${formatMoney(result.pnlPercent)}%)`}
            />
            <ResultRow label="Price change" value={`${formatMoney(result.priceChangePercent)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WalletBalanceCalculator;
