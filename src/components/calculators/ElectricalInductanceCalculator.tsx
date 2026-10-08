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

export interface ElectricalInductanceInput {
  inductanceMh: number;
  frequency: number;
  current: number;
}

export function computeElectricalInductance(input: ElectricalInductanceInput) {
  const henries = input.inductanceMh / 1000;
  const omega = 2 * Math.PI * input.frequency;
  const reactance = omega * henries;
  const energy = 0.5 * henries * input.current * input.current;
  return { henries, omega, reactance, energy };
}

export function ElectricalInductanceCalculator() {
  const [inductanceMh, setInductanceMh] = useState('100');
  const [frequency, setFrequency] = useState('50');
  const [current, setCurrent] = useState('2');

  const result = computeElectricalInductance({
    inductanceMh: Number(inductanceMh) || 0,
    frequency: Number(frequency) || 0,
    current: Number(current) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Inductance (mH)"
              value={inductanceMh}
              onChange={setInductanceMh}
              min={0}
              step="1"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Frequency (Hz)" value={frequency} onChange={setFrequency} min={0} />
              <NumberField label="Current (A)" value={current} onChange={setCurrent} min={0} step="0.1" />
            </div>
          </div>
          <Hint>
            Inductive reactance XL = 2πfL rises with frequency, so inductors pass DC easily while blocking high
            frequencies.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Inductive reactance"
            value={`${formatMoney(result.reactance)} Ω`}
            sub="XL = 2πfL"
          />
          <ResultRows>
            <ResultRow label="Inductance (H)" value={formatMoney(result.henries)} />
            <ResultRow label="Angular frequency (rad/s)" value={formatMoney(result.omega)} />
            <ResultRow label="Energy stored (J)" value={formatMoney(result.energy)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ElectricalInductanceCalculator;
