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

export interface CompoundInterestInput {
  principal: number;
  rate: number;
  years: number;
  compounding: number;
  contribution: number;
}

export function computeCompoundInterest(input: CompoundInterestInput) {
  const r = input.rate / 100 / input.compounding;
  const n = input.years * input.compounding;
  const growth = Math.pow(1 + r, n);
  const compound = input.principal * growth;
  const annuity = input.contribution * ((growth - 1) / (r || 1));
  const total = compound + annuity;
  const principalTotal = input.principal + input.contribution * n;
  const interest = total - principalTotal;
  return { compound, annuity, total, principalTotal, interest };
}

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('10');
  const [compounding, setCompounding] = useState('12');
  const [contribution, setContribution] = useState('200');

  const result = useMemo(
    () =>
      computeCompoundInterest({
        principal: Number(principal) || 0,
        rate: Number(rate) || 0,
        years: Number(years) || 0,
        compounding: Number(compounding) || 1,
        contribution: Number(contribution) || 0,
      }),
    [principal, rate, years, compounding, contribution]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Principal ($)" value={principal} onChange={setPrincipal} min={0} step="1000" />
            <NumberField label="Annual rate (%)" value={rate} onChange={setRate} min={0} step="0.1" />
            <NumberField label="Years" value={years} onChange={setYears} min={1} step="1" />
            <NumberField label="Compounding periods/year" value={compounding} onChange={setCompounding} min={1} step="1" />
            <NumberField label="Monthly contribution ($)" value={contribution} onChange={setContribution} min={0} step="10" />
          </div>
          <Hint>
            Compound interest: A = P(1 + r/n)^(nt) + C[((1 + r/n)^(nt) − 1) / (r/n)]. More
            frequent compounding yields a higher effective rate.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Future value"
            value={formatMoney(result.total)}
            sub={`Interest ${formatMoney(result.interest)}`}
          />
          <ResultRows>
            <ResultRow label="Principal growth" value={formatMoney(result.compound)} />
            <ResultRow label="Contributions" value={formatMoney(result.annuity)} />
            <ResultRow label="Total contributions" value={formatMoney(result.principalTotal)} />
            <ResultRow label="Interest earned" value={formatMoney(result.interest)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CompoundInterestCalculator;