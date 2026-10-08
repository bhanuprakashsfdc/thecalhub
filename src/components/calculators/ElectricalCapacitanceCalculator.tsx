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

export interface ElectricalCapacitanceInput {
  capacitanceUf: number;
  frequency: number;
  voltage: number;
}

export function computeElectricalCapacitance(input: ElectricalCapacitanceInput) {
  const farads = input.capacitanceUf * 1e-6;
  const omega = 2 * Math.PI * input.frequency;
  const denominator = omega * farads;
  const reactance = denominator !== 0 ? 1 / denominator : 0;
  const energy = 0.5 * farads * input.voltage * input.voltage;
  return { farads, omega, reactance, energy };
}

export function ElectricalCapacitanceCalculator() {
  const [capacitanceUf, setCapacitanceUf] = useState('100');
  const [frequency, setFrequency] = useState('50');
  const [voltage, setVoltage] = useState('12');

  const result = computeElectricalCapacitance({
    capacitanceUf: Number(capacitanceUf) || 0,
    frequency: Number(frequency) || 0,
    voltage: Number(voltage) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Capacitance (µF)"
              value={capacitanceUf}
              onChange={setCapacitanceUf}
              min={0}
              step="1"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Frequency (Hz)" value={frequency} onChange={setFrequency} min={0} />
              <NumberField label="Voltage (V)" value={voltage} onChange={setVoltage} min={0} step="0.1" />
            </div>
          </div>
          <Hint>
            Capacitive reactance XC = 1 ÷ (2πfC) falls as frequency climbs, while the stored energy is ½CV² —
            capacitors hold charge even with the supply removed.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Capacitive reactance"
            value={`${formatMoney(result.reactance)} Ω`}
            sub="XC = 1 ÷ (2πfC)"
          />
          <ResultRows>
            <ResultRow label="Capacitance (F)" value={formatMoney(result.farads, 6)} />
            <ResultRow label="Angular frequency (rad/s)" value={formatMoney(result.omega)} />
            <ResultRow label="Energy stored (J)" value={formatMoney(result.energy, 6)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ElectricalCapacitanceCalculator;
