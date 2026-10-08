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

export interface EpsGrowthInput {
  priorEps: number;
  currentEps: number;
  years: number;
}

export function computeEpsGrowth(input: EpsGrowthInput) {
  const prior = Math.max(0, input.priorEps);
  const current = Math.max(0, input.currentEps);
  const years = Math.max(1, Math.floor(input.years));
  const totalGrowth = prior > 0 ? ((current - prior) / prior) * 100 : 0;
  const annualised = prior > 0 && current > 0 ? (Math.pow(current / prior, 1 / years) - 1) * 100 : 0;
  return { totalGrowth, annualised, change: current - prior, years };
}

export function EpsGrowthCalculator() {
  const [priorEps, setPriorEps] = useState('3.2');
  const [currentEps, setCurrentEps] = useState('4.5');
  const [years, setYears] = useState('3');

  const result = computeEpsGrowth({
    priorEps: Number(priorEps) || 0,
    currentEps: Number(currentEps) || 0,
    years: Number(years) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Prior EPS ($)" value={priorEps} onChange={setPriorEps} step="0.01" min={0} />
              <NumberField label="Current EPS ($)" value={currentEps} onChange={setCurrentEps} step="0.01" min={0} />
            </div>
            <NumberField label="Years between" value={years} onChange={setYears} min={1} max={50} />
          </div>
          <Hint>
            Total growth shows the full move, while annualised growth spreads it evenly across the years so
            periods of different length can be compared.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="EPS growth rate"
            value={`${formatMoney(result.totalGrowth)}%`}
            sub={`Over ${result.years} year(s)`}
          />
          <ResultRows>
            <ResultRow label="Annualised growth" value={`${formatMoney(result.annualised)}%`} />
            <ResultRow label="Change in EPS" value={`$${formatMoney(result.change)}`} />
            <ResultRow label="Growth per year" value={`${formatMoney(result.totalGrowth / result.years)}%`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EpsGrowthCalculator;
