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

export interface GrowthInput {
  initial: number;
  final: number;
  periods: number;
}

export function computeGrowth(input: GrowthInput) {
  const totalGrowth = ((input.final - input.initial) / (input.initial || 1)) * 100;
  const cagr = input.initial > 0 && input.periods > 0 ? (Math.pow(input.final / input.initial, 1 / input.periods) - 1) * 100 : 0;
  const perPeriod = input.initial > 0 && input.periods > 0 ? (input.final - input.initial) / input.periods : 0;
  return { totalGrowth, cagr, perPeriod };
}

export function GrowthCalculator() {
  const [initial, setInitial] = useState('1000');
  const [final, setFinal] = useState('1500');
  const [periods, setPeriods] = useState('5');

  const result = useMemo(
    () =>
      computeGrowth({
        initial: Number(initial) || 0,
        final: Number(final) || 0,
        periods: Number(periods) || 0,
      }),
    [initial, final, periods]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Initial value" value={initial} onChange={setInitial} min={0} step="10" />
            <NumberField label="Final value" value={final} onChange={setFinal} min={0} step="10" />
            <NumberField label="Number of periods" value={periods} onChange={setPeriods} min={1} step="1" />
          </div>
          <Hint>
            Total growth is the percentage change from initial to final. CAGR (compound annual
            growth rate) is the constant annual rate that would take the initial value to the
            final value over the given periods.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="CAGR"
            value={`${formatMoney(result.cagr)}%`}
            sub={`Total growth ${formatMoney(result.totalGrowth)}%`}
          />
          <ResultRows>
            <ResultRow label="Total growth" value={`${formatMoney(result.totalGrowth)}%`} />
            <ResultRow label="Growth per period" value={formatMoney(result.perPeriod)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default GrowthCalculator;