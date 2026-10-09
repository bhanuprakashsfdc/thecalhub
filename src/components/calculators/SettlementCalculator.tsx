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

export interface SettlementInput {
  principal: number;
  rate: number;
  years: number;
  compounding: number;
}

export function computeSettlement(input: SettlementInput) {
  const r = input.rate / 100;
  const n = input.years * input.compounding;
  const amount = input.principal * Math.pow(1 + r / input.compounding, n);
  const interest = amount - input.principal;
  return { amount, interest, effectiveRate: (Math.pow(1 + r / input.compounding, input.compounding) - 1) * 100 };
}

export function SettlementCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('10');
  const [compounding, setCompounding] = useState('12');

  const result = useMemo(
    () =>
      computeSettlement({
        principal: Number(principal) || 0,
        rate: Number(rate) || 0,
        years: Number(years) || 0,
        compounding: Number(compounding) || 1,
      }),
    [principal, rate, years, compounding]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Principal ($)" value={principal} onChange={setPrincipal} min={0} step="100" />
            <NumberField label="Annual rate (%)" value={rate} onChange={setRate} min={0} step="0.1" />
            <NumberField label="Years" value={years} onChange={setYears} min={0} step="1" />
            <NumberField label="Compounding periods/year" value={compounding} onChange={setCompounding} min={1} step="1" />
          </div>
          <Hint>
            Compound interest: A = P(1 + r/n)^(nt). The effective annual rate is higher than the
            nominal rate when compounding is more frequent than annually.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Future value"
            value={`${formatMoney(result.amount)}`}
            sub={`Interest ${formatMoney(result.interest)}`}
          />
          <ResultRows>
            <ResultRow label="Interest earned" value={formatMoney(result.interest)} />
            <ResultRow label="Effective annual rate" value={`${formatMoney(result.effectiveRate)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SettlementCalculator;