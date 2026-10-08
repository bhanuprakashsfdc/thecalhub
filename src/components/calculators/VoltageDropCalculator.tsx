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

export interface VoltageDropInput {
  current: number;
  length: number;
  area: number;
  resistivity: number;
  supply: number;
}

export function computeVoltageDrop(input: VoltageDropInput) {
  const resistance = (input.resistivity * (2 * input.length)) / (input.area || 1);
  const drop = input.current * resistance;
  const loss = input.current * input.current * resistance;
  const percent = input.supply !== 0 ? (drop / input.supply) * 100 : 0;
  const loadVoltage = input.supply - drop;
  return { resistance, drop, loss, percent, loadVoltage };
}

export function VoltageDropCalculator() {
  const [current, setCurrent] = useState('10');
  const [length, setLength] = useState('10');
  const [area, setArea] = useState('2.5');
  const [resistivity, setResistivity] = useState('0.0175');
  const [supply, setSupply] = useState('12');

  const result = computeVoltageDrop({
    current: Number(current) || 0,
    length: Number(length) || 0,
    area: Number(area) || 0,
    resistivity: Number(resistivity) || 0,
    supply: Number(supply) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Current (A)" value={current} onChange={setCurrent} min={0} step="0.5" />
              <NumberField label="One-way length (m)" value={length} onChange={setLength} min={0} step="0.5" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Conductor area (mm²)" value={area} onChange={setArea} min={0} step="0.1" />
              <NumberField
                label="Resistivity (Ω·mm²/m)"
                value={resistivity}
                onChange={setResistivity}
                min={0}
                step="0.0005"
              />
            </div>
            <NumberField label="Supply voltage (V)" value={supply} onChange={setSupply} min={0} step="0.1" />
          </div>
          <Hint>
            The current travels out and back, so the conductor resistance uses twice the one-way length —
            0.0175 Ω·mm²/m is copper at room temperature.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Voltage drop"
            value={`${formatMoney(result.drop)} V`}
            sub={`${formatMoney(result.percent)} % of the supply voltage`
            }
          />
          <ResultRows>
            <ResultRow label="Conductor resistance (Ω)" value={formatMoney(result.resistance)} />
            <ResultRow label="Power lost in cable (W)" value={formatMoney(result.loss)} />
            <ResultRow label="Voltage at load (V)" value={formatMoney(result.loadVoltage)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default VoltageDropCalculator;
