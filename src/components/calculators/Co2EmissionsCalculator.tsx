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

export interface Co2EmissionsInput {
  electricity: number;
  gridFactor: number;
  fuel: number;
  fuelFactor: number;
}

export function computeCo2Emissions(input: Co2EmissionsInput) {
  const electricityCo2 = input.electricity * input.gridFactor;
  const fuelCo2 = input.fuel * input.fuelFactor;
  const totalKg = electricityCo2 + fuelCo2;
  const tonnes = totalKg / 1000;
  return { electricityCo2, fuelCo2, totalKg, tonnes };
}

export function Co2EmissionsCalculator() {
  const [electricity, setElectricity] = useState('500');
  const [gridFactor, setGridFactor] = useState('0.4');
  const [fuel, setFuel] = useState('100');
  const [fuelFactor, setFuelFactor] = useState('2.31');

  const result = computeCo2Emissions({
    electricity: Number(electricity) || 0,
    gridFactor: Number(gridFactor) || 0,
    fuel: Number(fuel) || 0,
    fuelFactor: Number(fuelFactor) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Electricity used (kWh)" value={electricity} onChange={setElectricity} min={0} />
              <NumberField
                label="Grid factor (kg CO₂/kWh)"
                value={gridFactor}
                onChange={setGridFactor}
                min={0}
                step="0.01"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Fuel burned (litres)" value={fuel} onChange={setFuel} min={0} />
              <NumberField
                label="Fuel factor (kg CO₂/L)"
                value={fuelFactor}
                onChange={setFuelFactor}
                min={0}
                step="0.01"
              />
            </div>
          </div>
          <Hint>
            Grid emission factors vary widely: around 0.1 kg CO₂/kWh on hydro-heavy grids and over 0.9 kg CO₂/kWh
            on coal-heavy ones.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total CO₂ emissions"
            value={`${formatMoney(result.totalKg)} kg`}
            sub={`${formatMoney(result.tonnes)} tonnes CO₂e`
            }
          />
          <ResultRows>
            <ResultRow label="From electricity (kg)" value={formatMoney(result.electricityCo2)} />
            <ResultRow label="From fuel (kg)" value={formatMoney(result.fuelCo2)} />
            <ResultRow label="Total tonnes" value={formatMoney(result.tonnes)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default Co2EmissionsCalculator;
