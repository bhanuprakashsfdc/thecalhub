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

export interface MonthlyPaymentInput {
  principal: number;
  annualRate: number;
  years: number;
}

export function computeMonthlyPayment(input: MonthlyPaymentInput) {
  const r = input.annualRate / 100 / 12;
  const n = input.years * 12;
  const payment = r === 0 ? input.principal / n : (input.principal * r) / (1 - Math.pow(1 + r, -n));
  const total = payment * n;
  const interest = total - input.principal;
  return { payment, total, interest };
}

export function MonthlyPaymentCalculator() {
  const [principal, setPrincipal] = useState('200000');
  const [annualRate, setAnnualRate] = useState('5');
  const [years, setYears] = useState('30');

  const result = useMemo(
    () =>
      computeMonthlyPayment({
        principal: Number(principal) || 0,
        annualRate: Number(annualRate) || 0,
        years: Number(years) || 0,
      }),
    [principal, annualRate, years]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Principal ($)" value={principal} onChange={setPrincipal} min={0} step="10000" />
            <NumberField label="Annual rate (%)" value={annualRate} onChange={setAnnualRate} min={0} step="0.1" />
            <NumberField label="Term (years)" value={years} onChange={setYears} min={1} step="1" />
          </div>
          <Hint>
            Standard amortisation: payment = P × r ÷ (1 − (1+r)^(−n)). Total paid is payment × n,
            and the difference from the principal is total interest.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Monthly payment"
            value={formatMoney(result.payment)}
            sub={`Total paid ${formatMoney(result.total)}`}
          />
          <ResultRows>
            <ResultRow label="Total interest" value={formatMoney(result.interest)} />
            <ResultRow label="Total paid" value={formatMoney(result.total)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MonthlyPaymentCalculator;