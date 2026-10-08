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

export interface OhmsLawInput {
  voltage: number;
  resistance: number;
}

export function computeOhmsLaw(input: OhmsLawInput) {
  const current = input.resistance !== 0 ? input.voltage / input.resistance : 0;
  const power = input.voltage * current;
  const conductance = input.resistance !== 0 ? 1 / input.resistance : 0;
  const voltageDrop = current * input.resistance;
  return { current, power, conductance, voltageDrop };
}

export function OhmsLawCalculator() {
  const [voltage, setVoltage] = useState('10');
  const [resistance, setResistance] = useState('5');

  const result = computeOhmsLaw({
    voltage: Number(voltage) || 0,
    resistance: Number(resistance) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Voltage (V)" value={voltage} onChange={setVoltage} step="0.1" />
            <NumberField label="Resistance (Ω)" value={resistance} onChange={setResistance} min={0} step="0.1" />
          </div>
          <Hint>
            Ohm’s law: I = V ÷ R, and power P = V × I. Enter zero resistance only if you really want a short
            circuit figure — the calculator reports 0 A rather than infinity.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Current"
            value={`${formatMoney(result.current)} A`}
            sub={`${formatMoney(result.power)} W of power`
            }
          />
          <ResultRows>
            <ResultRow label="Power (W)" value={formatMoney(result.power)} />
            <ResultRow label="Conductance (S)" value={formatMoney(result.conductance)} />
            <ResultRow label="Voltage across load (V)" value={formatMoney(result.voltageDrop)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default OhmsLawCalculator;
