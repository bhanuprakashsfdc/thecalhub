import { useState, useMemo } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  ResultHero,
  Hint,
  formatMoney,
} from './kit';

export interface ExchangeRateInput {
  amount: number;
  fromRate: number;
  toRate: number;
}

export function computeExchangeRate(input: ExchangeRateInput) {
  const converted = input.amount * (input.toRate / (input.fromRate || 1));
  const crossRate = input.toRate / (input.fromRate || 1);
  return { converted, crossRate };
}

export function ExchangeRateCalculator() {
  const [amount, setAmount] = useState('100');
  const [fromRate, setFromRate] = useState('1.0');
  const [toRate, setToRate] = useState('0.92');

  const result = useMemo(
    () =>
      computeExchangeRate({
        amount: Number(amount) || 0,
        fromRate: Number(fromRate) || 0,
        toRate: Number(toRate) || 0,
      }),
    [amount, fromRate, toRate]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Amount" value={amount} onChange={setAmount} min={0} step="1" />
            <NumberField label="Source rate (USD)" value={fromRate} onChange={setFromRate} min={0} step="0.01" />
            <NumberField label="Target rate (per USD)" value={toRate} onChange={setToRate} min={0} step="0.01" />
          </div>
          <Hint>
            Convert an amount in one currency to another using rates quoted against a common
            base (usually USD). The cross rate is the target rate divided by the source rate.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Converted amount"
            value={formatMoney(result.converted)}
            sub={`Cross rate ${formatMoney(result.crossRate)}`}
          />
        </Panel>
      }
    />
  );
}

export default ExchangeRateCalculator;