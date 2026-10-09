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

export interface BlackScholesInput {
  spot: number;
  strike: number;
  timeYears: number;
  riskFreeRate: number;
  volatility: number;
  optionType: 'call' | 'put';
}

export interface BlackScholesResult {
  price: number;
  callPrice: number;
  putPrice: number;
  intrinsic: number;
  timeValue: number;
  parityGap: number;
  d1: number;
  d2: number;
}

export const normCdf = (x: number): number => {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014327 * Math.exp((-x * x) / 2);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x > 0 ? 1 - p : p;
};

export function computeBlackScholes(input: BlackScholesInput): BlackScholesResult {
  const S = Math.max(0, Number(input.spot) || 0);
  const K = Math.max(0, Number(input.strike) || 0);
  const T = Math.max(0, Number(input.timeYears) || 0);
  const r = (Number(input.riskFreeRate) || 0) / 100;
  const sigma = Math.max(0, Number(input.volatility) || 0) / 100;
  const isCall = input.optionType !== 'put';

  const intrinsic = isCall ? Math.max(0, S - K) : Math.max(0, K - S);

  if (S <= 0 || K <= 0 || T <= 0 || sigma <= 0) {
    const call = Math.max(0, S - K);
    const put = Math.max(0, K - S);
    return {
      price: isCall ? call : put,
      callPrice: call,
      putPrice: put,
      intrinsic,
      timeValue: 0,
      parityGap: call - put - (S - K * Math.exp(-r * T)),
      d1: 0,
      d2: 0,
    };
  }

  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;
  const discount = K * Math.exp(-r * T);
  const callPrice = S * normCdf(d1) - discount * normCdf(d2);
  const putPrice = discount * normCdf(-d2) - S * normCdf(-d1);
  const price = isCall ? callPrice : putPrice;

  return {
    price,
    callPrice,
    putPrice,
    intrinsic,
    timeValue: Math.max(0, price - intrinsic),
    parityGap: callPrice - putPrice - (S - discount),
    d1,
    d2,
  };
}

export function BlackScholesCalculator() {
  const [spot, setSpot] = useState('100');
  const [strike, setStrike] = useState('100');
  const [timeYears, setTimeYears] = useState('1');
  const [riskFreeRate, setRiskFreeRate] = useState('5');
  const [volatility, setVolatility] = useState('20');
  const [optionType, setOptionType] = useState('call');

  const result = computeBlackScholes({
    spot: Number(spot) || 0,
    strike: Number(strike) || 0,
    timeYears: Number(timeYears) || 0,
    riskFreeRate: Number(riskFreeRate) || 0,
    volatility: Number(volatility) || 0,
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
            C = S·N(d₁) − K·e^(−rT)·N(d₂), P = K·e^(−rT)·N(−d₂) − S·N(−d₁), with
            d₁ = [ln(S/K) + (r + σ²/2)T] / (σ√T) and d₂ = d₁ − σ√T.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Theoretical option price"
            value={`$${formatMoney(result.price)}`}
            sub={`${optionType === 'put' ? 'Put' : 'Call'} • intrinsic $${formatMoney(
              result.intrinsic
            )} • time value $${formatMoney(result.timeValue)}`}
          />
          <ResultRows>
            <ResultRow label="Call price" value={`$${formatMoney(result.callPrice)}`} />
            <ResultRow label="Put price" value={`$${formatMoney(result.putPrice)}`} />
            <ResultRow label="Intrinsic value" value={`$${formatMoney(result.intrinsic)}`} />
            <ResultRow label="Time value" value={`$${formatMoney(result.timeValue)}`} />
            <ResultRow label="Put–call parity gap" value={`$${formatMoney(result.parityGap, 4)}`} />
            <ResultRow label="d1 / d2" value={`${formatMoney(result.d1, 4)} / ${formatMoney(result.d2, 4)}`} />
          </ResultRows>
          <Hint>
            The parity gap should be zero for a European option: C − P = S − K·e^(−rT). A non-zero value means
            the inputs are degenerate (no expiry or zero volatility).
          </Hint>
        </Panel>
      }
    />
  );
}

export default BlackScholesCalculator;
