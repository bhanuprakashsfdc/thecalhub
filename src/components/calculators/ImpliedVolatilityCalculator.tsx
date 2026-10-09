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

export interface ImpliedVolatilityInput {
  optionPrice: number;
  spot: number;
  strike: number;
  timeYears: number;
  riskFreeRate: number;
  optionType: 'call' | 'put';
}

export interface ImpliedVolatilityResult {
  impliedVolatility: number;
  impliedVolatilityPercent: number;
  modelPrice: number;
  intrinsic: number;
  d1: number;
  d2: number;
}

const normCdf = (x: number): number => {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014327 * Math.exp((-x * x) / 2);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x > 0 ? 1 - p : p;
};

export const bsPrice = (S: number, K: number, T: number, r: number, sigma: number, isCall: boolean): number => {
  if (S <= 0 || K <= 0 || T <= 0 || sigma <= 0) {
    return isCall ? Math.max(0, S - K) : Math.max(0, K - S);
  }
  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;
  const discount = K * Math.exp(-r * T);
  return isCall ? S * normCdf(d1) - discount * normCdf(d2) : discount * normCdf(-d2) - S * normCdf(-d1);
};

export function computeImpliedVolatility(input: ImpliedVolatilityInput): ImpliedVolatilityResult {
  const S = Math.max(0, Number(input.spot) || 0);
  const K = Math.max(0, Number(input.strike) || 0);
  const T = Math.max(0, Number(input.timeYears) || 0);
  const r = (Number(input.riskFreeRate) || 0) / 100;
  const target = Math.max(0, Number(input.optionPrice) || 0);
  const isCall = input.optionType !== 'put';

  const intrinsic = isCall ? Math.max(0, S - K) : Math.max(0, K - S);

  if (S <= 0 || K <= 0 || T <= 0 || target <= intrinsic) {
    return {
      impliedVolatility: 0,
      impliedVolatilityPercent: 0,
      modelPrice: intrinsic,
      intrinsic,
      d1: 0,
      d2: 0,
    };
  }

  let low = 0;
  let high = 5;
  for (let i = 0; i < 120; i += 1) {
    const mid = (low + high) / 2;
    if (bsPrice(S, K, T, r, mid, isCall) < target) low = mid;
    else high = mid;
  }
  const sigma = (low + high) / 2;
  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;

  return {
    impliedVolatility: sigma,
    impliedVolatilityPercent: sigma * 100,
    modelPrice: bsPrice(S, K, T, r, sigma, isCall),
    intrinsic,
    d1,
    d2,
  };
}

export function ImpliedVolatilityCalculator() {
  const [optionPrice, setOptionPrice] = useState('10.45');
  const [spot, setSpot] = useState('100');
  const [strike, setStrike] = useState('100');
  const [timeYears, setTimeYears] = useState('1');
  const [riskFreeRate, setRiskFreeRate] = useState('5');
  const [optionType, setOptionType] = useState('call');

  const result = computeImpliedVolatility({
    optionPrice: Number(optionPrice) || 0,
    spot: Number(spot) || 0,
    strike: Number(strike) || 0,
    timeYears: Number(timeYears) || 0,
    riskFreeRate: Number(riskFreeRate) || 0,
    optionType: optionType === 'put' ? 'put' : 'call',
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField
              label="Option type"
              value={optionType}
              onChange={setOptionType}
              options={[
                { value: 'call', label: 'Call option' },
                { value: 'put', label: 'Put option' },
              ]}
            />
            <NumberField label="Option market price ($)" value={optionPrice} onChange={setOptionPrice} min={0} step="0.01" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Spot price ($)" value={spot} onChange={setSpot} min={0} step="0.1" />
              <NumberField label="Strike price ($)" value={strike} onChange={setStrike} min={0} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Time to expiry (years)" value={timeYears} onChange={setTimeYears} min={0} step="0.01" />
              <NumberField label="Risk-free rate (%)" value={riskFreeRate} onChange={setRiskFreeRate} step="0.1" />
            </div>
          </div>
          <Hint>
            The solver searches for the volatility that makes the Black–Scholes price match the quoted option
            price. A price at or below intrinsic value implies zero volatility.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Implied volatility"
            value={`${formatMoney(result.impliedVolatilityPercent)}%`}
            sub={`Model price $${formatMoney(result.modelPrice)} vs market $${formatMoney(
              Number(optionPrice) || 0
            )}`}
          />
          <ResultRows>
            <ResultRow label="Implied volatility (decimal)" value={formatMoney(result.impliedVolatility, 6)} />
            <ResultRow label="Rebuilt option price" value={`$${formatMoney(result.modelPrice, 4)}`} />
            <ResultRow label="Intrinsic value" value={`$${formatMoney(result.intrinsic)}`} />
            <ResultRow label="d1 / d2" value={`${formatMoney(result.d1, 4)} / ${formatMoney(result.d2, 4)}`} />
          </ResultRows>
          <Hint>
            Volatility is quoted as an annualised standard deviation: 20% means the market expects the
            underlying to move roughly 20% over one year, one standard deviation.
          </Hint>
        </Panel>
      }
    />
  );
}

export default ImpliedVolatilityCalculator;
