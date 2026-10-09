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

function normCdf(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014327 * Math.exp((-x * x) / 2);
  const p =
    d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x > 0 ? 1 - p : p;
}

export interface CallOptionInput {
  spot: number;
  strike: number;
  timeToExpiry: number;
  riskFreeRate: number;
  volatility: number;
}

export function computeCallOption(input: CallOptionInput) {
  const S = Math.max(0, input.spot);
  const K = Math.max(0, input.strike);
  const T = Math.max(0, input.timeToExpiry);
  const r = input.riskFreeRate / 100;
  const sigma = input.volatility / 100;
  if (T === 0 || sigma === 0) {
    return { price: Math.max(0, S - K), d1: 0, d2: 0, delta: 0, intrinsic: Math.max(0, S - K), timeValue: 0 };
  }
  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;
  const price = S * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d2);
  const intrinsic = Math.max(0, S - K);
  return { price, d1, d2, delta: normCdf(d1), intrinsic, timeValue: Math.max(0, price - intrinsic) };
}

export function CallOptionCalculator() {
  const [spot, setSpot] = useState('100');
  const [strike, setStrike] = useState('100');
  const [timeToExpiry, setTimeToExpiry] = useState('0.5');
  const [riskFreeRate, setRiskFreeRate] = useState('5');
  const [volatility, setVolatility] = useState('20');

  const result = useMemo(
    () =>
      computeCallOption({
        spot: Number(spot) || 0,
        strike: Number(strike) || 0,
        timeToExpiry: Number(timeToExpiry) || 0,
        riskFreeRate: Number(riskFreeRate) || 0,
        volatility: Number(volatility) || 0,
      }),
    [spot, strike, timeToExpiry, riskFreeRate, volatility]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Spot price ($)" value={spot} onChange={setSpot} min={0} step="0.1" />
            <NumberField label="Strike price ($)" value={strike} onChange={setStrike} min={0} step="0.1" />
            <NumberField label="Time to expiry (years)" value={timeToExpiry} onChange={setTimeToExpiry} min={0} step="0.01" />
            <NumberField label="Risk-free rate (%)" value={riskFreeRate} onChange={setRiskFreeRate} min={0} step="0.1" />
            <NumberField label="Volatility (%)" value={volatility} onChange={setVolatility} min={0} step="0.1" />
          </div>
          <Hint>
            Black–Scholes call price: C = S·N(d₁) − K·e^(−rT)·N(d₂). d₁ = (ln(S/K) + (r + σ²/2)T) / (σ√T).
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Call option price"
            value={`${formatMoney(result.price)} USD`}
            sub={`Delta ${formatMoney(result.delta)}`}
          />
          <ResultRows>
            <ResultRow label="Intrinsic value" value={`${formatMoney(result.intrinsic)} $`} />
            <ResultRow label="Time value" value={`${formatMoney(result.timeValue)} $`} />
            <ResultRow label="d1" value={formatMoney(result.d1)} />
            <ResultRow label="d2" value={formatMoney(result.d2)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CallOptionCalculator;