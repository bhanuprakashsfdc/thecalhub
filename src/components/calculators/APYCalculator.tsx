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

export interface ApyInput {
  nominalRate: number;
  compoundsPerYear: number;
}

export function computeApy(input: ApyInput) {
  const n = Math.max(1, Math.floor(input.compoundsPerYear));
  const r = Math.max(0, input.nominalRate) / 100;
  const apy = (Math.pow(1 + r / n, n) - 1) * 100;
  const monthlyRate = (Math.pow(1 + apy / 100, 1 / 12) - 1) * 100;
  const interestOn1000 = 1000 * (apy / 100);
  return { compounds: n, apy, monthlyRate, interestOn1000 };
}

export function APYCalculator() {
  const [nominalRate, setNominalRate] = useState('5');
  const [compoundsPerYear, setCompoundsPerYear] = useState('365');

  const result = computeApy({
    nominalRate: Number(nominalRate) || 0,
    compoundsPerYear: Number(compoundsPerYear) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Stated annual rate (%)" value={nominalRate} onChange={setNominalRate} step="0.01" min={0} />
            <NumberField
              label="Compounds per year"
              value={compoundsPerYear}
              onChange={setCompoundsPerYear}
              min={1}
              hint="1 = yearly, 12 = monthly, 365 = daily"
            />
          </div>
          <Hint>
            APY includes compounding, so it is always at least as large as the stated annual rate. The more often
            interest compounds, the higher the APY becomes.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Annual percentage yield"
            value={`${formatMoney(result.apy)}%`}
            sub={`Compounded ${result.compounds} time(s) per year`}
          />
          <ResultRows>
            <ResultRow label="Effective monthly rate" value={`${formatMoney(result.monthlyRate)}%`} />
            <ResultRow label="Interest on $1,000 in one year" value={`$${formatMoney(result.interestOn1000)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default APYCalculator;
