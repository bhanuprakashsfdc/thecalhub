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

export interface PutOptionInput {
  spot: number;
  strike: number;
  timeYears: number;
  riskFreeRate: number;
  volatility: number;
}

export interface PutOptionResult {
  price: number;
  intrinsic: number;
  timeValue: number;
  delta: number;
  breakEven: number;
  d1: number;
  d2: number;
}

const normCdf = (x: number): number => {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014327 * Math.exp((-x * x) / 2);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x > 0 ? 1 - p : p;
};

export function computePutOption(input: PutOptionInput): PutOptionResult {
  const S = Math.max(0, Number(input.spot) || 0);
  const K = Math.max(0, Number(input.strike) || 0);
  const T = Math.max(0, Number(input.timeYears) || 0);
  const r = (Number(input.riskFreeRate) || 0) / 100;
  const sigma = Math.max(0, Number(input.volatility) || 0) / 100;

  const intrinsic = Math.max(0, K - S);

  if (S <= 0 || K <= 0 || T <= 0 || sigma <= 0) {
    return {
      price: intrinsic,
      intrinsic,
      timeValue: 0,
      delta: S < K ? -1 : 0,
      breakEven: K + intrinsic,
      d1: 0,
      d2: 0,
    };
  }

  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;
  const discount = K * Math.exp(-r * T);
  const price = Math.max(discount * normCdf(-d2) - S * normCdf(-d1), intrinsic);

  return {
    price,
    intrinsic,
    timeValue: price - intrinsic,
    delta: normCdf(d1) - 1,
    breakEven: K + price,
    d1,
    d2,
  };
}

export function PutOptionCalculator() {
  const [spot, setSpot] = useState('100');
  const [strike, setStrike] = useState('100');
  const [timeYears, setTimeYears] = useState('1');
  const [riskFreeRate, setRiskFreeRate] = useState('5');
  const [volatility, setVolatility] = useState('20');

  const result = computePutOption({
    spot: Number(spot) || 0,
    strike: Number(strike) || 0,
    timeYears: Number(timeYears) || 0,
    riskFreeRate: Number(riskFreeRate) || 0,
    volatility: Number(volatility) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Spot price ($)" value={spot} onChange={setSpot} min={0} step="0.1" />
              <NumberField label="Strike price ($)" value={strike} onChange={setStrike} min={0} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Time to expiry (years)" value={timeYears} onChange={setTimeYears} min={0} step="0.01" />
              <NumberField label="Risk-free rate (%)" value={riskFreeRate} onChange={setRiskFreeRate} step="0.1" />
            </div>
            <NumberField label="Volatility (%)" value={volatility} onChange={setVolatility} min={0} step="0.1" />
          </div>
          <Hint>
            P = K·e^(−rT)·N(−d₂) − S·N(−d₁), the Black–Scholes value of a European put. The break-even price
            is the strike plus the premium you pay for the option.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Put option price"
            value={`$${formatMoney(result.price)}`}
            sub={`Intrinsic $${formatMoney(result.intrinsic)} • time value $${formatMoney(result.timeValue)}`}
          />
          <ResultRows>
            <ResultRow label="Intrinsic value" value={`$${formatMoney(result.intrinsic)}`} />
            <ResultRow label="Time value" value={`$${formatMoney(result.timeValue)}`} />
            <ResultRow label="Put delta" value={formatMoney(result.delta, 4)} />
            <ResultRow label="Break-even at expiry" value={`$${formatMoney(result.breakEven)}`} />
            <ResultRow label="d1 / d2" value={`${formatMoney(result.d1, 4)} / ${formatMoney(result.d2, 4)}`} />
          </ResultRows>
          <Hint>
            A long put breaks even when the underlying falls to the strike plus the premium, so the holder
            profits below that level.
          </Hint>
        </Panel>
      }
    />
  );
}

export default PutOptionCalculator;
