import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

export interface CurrencyConverterInput {
  amount: number;
  from: string;
  to: string;
}

export const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  INR: 83.2,
  AUD: 1.52,
  CAD: 1.36,
  CHF: 0.88,
  CNY: 7.24,
};

export function computeCurrencyConverter(input: CurrencyConverterInput) {
  const fromRate = EXCHANGE_RATES[input.from] || 1;
  const toRate = EXCHANGE_RATES[input.to] || 1;
  const rate = toRate / fromRate;
  const converted = input.amount * rate;
  const inverse = fromRate / toRate;
  const inUsd = fromRate > 0 ? input.amount / fromRate : 0;
  return { converted, rate, inverse, inUsd };
}

const CURRENCY_OPTIONS = Object.keys(EXCHANGE_RATES).map((code) => ({
  value: code,
  label: code,
}));

export function CurrencyConverterCalculator() {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const result = computeCurrencyConverter({
    amount: Number(amount) || 0,
    from,
    to,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Amount" value={amount} onChange={setAmount} min={0} step="any" />
            <SelectField label="From currency" value={from} onChange={setFrom} options={CURRENCY_OPTIONS} />
            <SelectField label="To currency" value={to} onChange={setTo} options={CURRENCY_OPTIONS} />
          </div>
          <Hint>
            Uses indicative static rates pegged to the US dollar.
            Live rates move constantly — check a feed before transacting.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Converted amount"
            value={`${formatMoney(result.converted)} ${to}`}
            sub={`From ${from}`}
          />
          <ResultRows>
            <ResultRow label="Exchange rate" value={formatMoney(result.rate)} />
            <ResultRow label="Inverse rate" value={formatMoney(result.inverse)} />
            <ResultRow label="Amount in USD" value={formatMoney(result.inUsd)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CurrencyConverterCalculator;
