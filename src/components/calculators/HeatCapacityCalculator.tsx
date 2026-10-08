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

export interface HeatCapacityInput {
  mass: number;
  specificHeat: number;
  deltaT: number;
}

export function computeHeatCapacity(input: HeatCapacityInput) {
  const capacity = input.mass * input.specificHeat;
  const heat = capacity * input.deltaT;
  const heatKj = heat / 1000;
  return { capacity, heat, heatKj };
}

export function HeatCapacityCalculator() {
  const [mass, setMass] = useState('5');
  const [specificHeat, setSpecificHeat] = useState('4186');
  const [deltaT, setDeltaT] = useState('20');

  const result = computeHeatCapacity({
    mass: Number(mass) || 0,
    specificHeat: Number(specificHeat) || 0,
    deltaT: Number(deltaT) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Mass (kg)" value={mass} onChange={setMass} min={0} step="0.1" />
              <NumberField
                label="Specific heat (J/kg·K)"
                value={specificHeat}
                onChange={setSpecificHeat}
                min={0}
              />
            </div>
            <NumberField label="Temperature change (K)" value={deltaT} onChange={setDeltaT} step="0.1" />
          </div>
          <Hint>
            Heat capacity C = m·c is the energy needed to raise the whole body by one kelvin; multiply by ΔT to
            get the actual heat input Q = m·c·ΔT.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Heat required"
            value={`${formatMoney(result.heat)} J`}
            sub={`${formatMoney(result.heatKj)} kJ of energy input`
            }
          />
          <ResultRows>
            <ResultRow label="Heat capacity (J/K)" value={formatMoney(result.capacity)} />
            <ResultRow label="Heat added (kJ)" value={formatMoney(result.heatKj)} />
            <ResultRow label="ΔT applied (K)" value={formatMoney(Number(deltaT) || 0)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HeatCapacityCalculator;
