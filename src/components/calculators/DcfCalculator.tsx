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

export interface DcfInput {
  freeCashFlow: number;
  growthRate: number;
  discountRate: number;
  forecastYears: number;
  sharesOutstanding: number;
}

export function computeDcf(input: DcfInput) {
  const years = Math.max(0, Math.floor(input.forecastYears));
  const growth = input.growthRate / 100;
  const discount = input.discountRate / 100;
  let pvCashFlows = 0;
  let lastFcf = 0;
  for (let i = 1; i <= years; i++) {
    const fcf = Math.max(0, input.freeCashFlow) * Math.pow(1 + growth, i);
    lastFcf = fcf;
    pvCashFlows += fcf / Math.pow(1 + discount, i);
  }
  let terminalPv = 0;
  if (years > 0 && discount > growth) {
    const terminal = (lastFcf * (1 + growth)) / (discount - growth);
    terminalPv = terminal / Math.pow(1 + discount, years);
  }
  const enterpriseValue = pvCashFlows + terminalPv;
  const perShare = Math.max(0, input.sharesOutstanding) > 0 ? enterpriseValue / Math.max(0, input.sharesOutstanding) : 0;
  return { pvCashFlows, terminalPv, enterpriseValue, perShare, years };
}

export function DcfCalculator() {
  const [freeCashFlow, setFreeCashFlow] = useState('100000');
  const [growthRate, setGrowthRate] = useState('3');
  const [discountRate, setDiscountRate] = useState('9');
  const [forecastYears, setForecastYears] = useState('5');
  const [sharesOutstanding, setSharesOutstanding] = useState('10000');

  const result = computeDcf({
    freeCashFlow: Number(freeCashFlow) || 0,
    growthRate: Number(growthRate) || 0,
    discountRate: Number(discountRate) || 0,
    forecastYears: Number(forecastYears) || 0,
    sharesOutstanding: Number(sharesOutstanding) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Free cash flow ($)" value={freeCashFlow} onChange={setFreeCashFlow} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Cash flow growth (%)" value={growthRate} onChange={setGrowthRate} step="0.1" />
              <NumberField label="Discount rate (%)" value={discountRate} onChange={setDiscountRate} step="0.1" min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Forecast years" value={forecastYears} onChange={setForecastYears} min={1} max={30} />
              <NumberField label="Shares outstanding" value={sharesOutstanding} onChange={setSharesOutstanding} min={0} />
            </div>
          </div>
          <Hint>
            The discount rate must exceed the growth rate for a meaningful terminal value — a perpetual growth
            rate above the discount rate implies an infinite valuation.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Enterprise value"
            value={`$${formatMoney(result.enterpriseValue)}`}
            sub={`Value per share $${formatMoney(result.perShare)}`}
          />
          <ResultRows>
            <ResultRow label="Value per share" value={`$${formatMoney(result.perShare)}`} />
            <ResultRow label="PV of forecast cash flows" value={`$${formatMoney(result.pvCashFlows)}`} />
            <ResultRow label="PV of terminal value" value={`$${formatMoney(result.terminalPv)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DcfCalculator;
