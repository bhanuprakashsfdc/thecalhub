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
  safeDiv,
} from './kit';

export interface ElectricalResistanceInput {
  resistivity: number;
  length: number;
  area: number;
}

export function computeElectricalResistance(input: ElectricalResistanceInput) {
  const resistance = input.area !== 0 ? (input.resistivity * input.length) / input.area : 0;
  const perMetre = input.area !== 0 ? input.resistivity / input.area : 0;
  const conductance = safeDiv(1, resistance);
  const resistivityM = input.resistivity * 1e-6;
  return { resistance, perMetre, conductance, resistivityM };
}

export function ElectricalResistanceCalculator() {
  const [resistivity, setResistivity] = useState('0.0175');
  const [length, setLength] = useState('10');
  const [area, setArea] = useState('1.5');

  const result = computeElectricalResistance({
    resistivity: Number(resistivity) || 0,
    length: Number(length) || 0,
    area: Number(area) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Resistivity (Ω·mm²/m)"
              value={resistivity}
              onChange={setResistivity}
              min={0}
              step="0.0005"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Length (m)" value={length} onChange={setLength} min={0} step="0.5" />
              <NumberField label="Cross-section (mm²)" value={area} onChange={setArea} min={0} step="0.1" />
            </div>
          </div>
          <Hint>
            R = ρL ÷ A. Doubling the length doubles resistance while doubling the cross-section halves it —
            which is why mains cable is sized generously for long runs.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Electrical resistance"
            value={`${formatMoney(result.resistance)} Ω`}
            sub={`${formatMoney(result.perMetre)} Ω per metre`
            }
          />
          <ResultRows>
            <ResultRow label="Resistance per metre (Ω/m)" value={formatMoney(result.perMetre)} />
            <ResultRow label="Conductance (S)" value={formatMoney(result.conductance)} />
            <ResultRow label="Resistivity (Ω·m)" value={formatMoney(result.resistivityM, 8)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ElectricalResistanceCalculator;
