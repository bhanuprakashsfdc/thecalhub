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

export interface GreeksInput {
  spot: number;
  strike: number;
  timeYears: number;
  riskFreeRate: number;
  volatility: number;
  optionType: 'call' | 'put';
}

export interface GreeksResult {
  price: number;
  delta: number;
  gamma: number;
  thetaPerDay: number;
  vegaPerPercent: number;
  rhoPerPercent: number;
  d1: number;
  d2: number;
}

const normCdf = (x: number): number => {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014327 * Math.exp((-x * x) / 2);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x > 0 ? 1 - p : p;
};

const normPdf = (x: number) => 0.3989422804014327 * Math.exp((-x * x) / 2);

export function computeGreeks(input: GreeksInput): GreeksResult {
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
      delta: isCall ? (S > K ? 1 : 0) : S < K ? -1 : 0,
      gamma: 0,
      thetaPerDay: 0,
      vegaPerPercent: 0,
      rhoPerPercent: 0,
      d1: 0,
      d2: 0,
    };
  }

  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;
  const discount = K * Math.exp(-r * T);
  const pdf = normPdf(d1);
  const delta = isCall ? normCdf(d1) : normCdf(d1) - 1;
  const gamma = pdf / (S * sigma * sqrtT);
  const vegaPerPercent = (S * pdf * sqrtT) / 100;
  const thetaPerDay = isCall
    ? (-(S * pdf * sigma) / (2 * sqrtT) - r * discount * normCdf(d2)) / 365
    : (-(S * pdf * sigma) / (2 * sqrtT) + r * discount * normCdf(-d2)) / 365;
  const rhoPerPercent = isCall
    ? (discount * T * normCdf(d2)) / 100
    : (-discount * T * normCdf(-d2)) / 100;
  const price = isCall
    ? S * normCdf(d1) - discount * normCdf(d2)
    : discount * normCdf(-d2) - S * normCdf(-d1);

  return { price: Math.max(price, intrinsic), delta, gamma, thetaPerDay, vegaPerPercent, rhoPerPercent, d1, d2 };
}

export function GreeksCalculator() {
  const [spot, setSpot] = useState('100');
  const [strike, setStrike] = useState('100');
  const [timeYears, setTimeYears] = useState('1');
  const [riskFreeRate, setRiskFreeRate] = useState('5');
  const [volatility, setVolatility] = useState('20');
  const [optionType, setOptionType] = useState('call');

  const result = computeGreeks({
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
            Delta and gamma measure price sensitivity, theta is the daily time decay, vega reacts to a 1%
            change in volatility and rho to a 1% change in the interest rate.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Delta"
            value={formatMoney(result.delta, 4)}
            sub={`${optionType === 'put' ? 'Put' : 'Call'} price $${formatMoney(result.price)} • gamma ${formatMoney(
              result.gamma,
              5
            )}`}
          />
          <ResultRows>
            <ResultRow label="Gamma" value={formatMoney(result.gamma, 6)} />
            <ResultRow label="Theta (per day)" value={`$${formatMoney(result.thetaPerDay, 4)}`} />
            <ResultRow label="Vega (per 1% vol)" value={formatMoney(result.vegaPerPercent, 4)} />
            <ResultRow label="Rho (per 1% rate)" value={formatMoney(result.rhoPerPercent, 4)} />
            <ResultRow label="Option price" value={`$${formatMoney(result.price)}`} />
          </ResultRows>
          <Hint>
            Vega and rho are quoted per one percentage point; theta is divided by 365 to give the decay you
            would see holding everything else constant for a day.
          </Hint>
        </Panel>
      }
    />
  );
}

export default GreeksCalculator;
