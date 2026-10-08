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

export interface ThermalConductivityInput {
  power: number;
  thickness: number;
  area: number;
  deltaT: number;
}

export function computeThermalConductivity(input: ThermalConductivityInput) {
  const k =
    input.area > 0 && input.deltaT > 0 ? (input.power * input.thickness) / (input.area * input.deltaT) : 0;
  const heatFlux = safeDiv(input.power, input.area);
  const gradient = input.thickness > 0 ? input.deltaT / input.thickness : 0;
  const conductance = safeDiv(input.power, input.deltaT);
  return { k, heatFlux, gradient, conductance };
}

export function ThermalConductivityCalculator() {
  const [power, setPower] = useState('500');
  const [thickness, setThickness] = useState('0.2');
  const [area, setArea] = useState('2');
  const [deltaT, setDeltaT] = useState('25');

  const result = computeThermalConductivity({
    power: Number(power) || 0,
    thickness: Number(thickness) || 0,
    area: Number(area) || 0,
    deltaT: Number(deltaT) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Heat flow rate (W)" value={power} onChange={setPower} min={0} />
              <NumberField
                label="Thickness (m)"
                value={thickness}
                onChange={setThickness}
                min={0}
                step="0.01"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Area (m²)" value={area} onChange={setArea} min={0} step="0.1" />
              <NumberField label="Temperature difference (K)" value={deltaT} onChange={setDeltaT} min={0} />
            </div>
          </div>
          <Hint>
            Fourier’s law gives k = P·L / (A·ΔT). Typical values: 0.03 W/m·K for still air, 0.6 for concrete and
            400 for pure copper.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Thermal conductivity"
            value={`${formatMoney(result.k)} W/m·K`}
            sub="From Fourier’s steady-state law"
          />
          <ResultRows>
            <ResultRow label="Heat flux (W/m²)" value={formatMoney(result.heatFlux)} />
            <ResultRow label="Temperature gradient (K/m)" value={formatMoney(result.gradient)} />
            <ResultRow label="Thermal conductance (W/K)" value={formatMoney(result.conductance)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ThermalConductivityCalculator;
