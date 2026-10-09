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

export interface PartialPressureInput {
  totalPressure: number;
  fraction: number;
}

export function computePartialPressure(input: PartialPressureInput) {
  const partialPressure = input.totalPressure * input.fraction;
  const other = input.totalPressure - partialPressure;
  return { partialPressure, other };
}

export function PartialPressureCalculator() {
  const [totalPressure, setTotalPressure] = useState('1');
  const [fraction, setFraction] = useState('0.21');

  const result = useMemo(
    () =>
      computePartialPressure({
        totalPressure: Number(totalPressure) || 0,
        fraction: Number(fraction) || 0,
      }),
    [totalPressure, fraction]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Total pressure (atm)" value={totalPressure} onChange={setTotalPressure} min={0} step="0.1" />
            <NumberField label="Mole fraction" value={fraction} onChange={setFraction} min={0} max={1} step="0.01" />
          </div>
          <Hint>
            Dalton's law: the partial pressure of a gas in a mixture is the total pressure multiplied
            by its mole fraction. In air at sea level, oxygen (≈21%) has a partial pressure of
            about 0.21 atm.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Partial pressure"
            value={`${formatMoney(result.partialPressure)} atm`}
            sub={`Total ${formatMoney(Number(totalPressure) || 0)} atm`}
          />
          <ResultRows>
            <ResultRow label="Other gases" value={`${formatMoney(result.other)} atm`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PartialPressureCalculator;