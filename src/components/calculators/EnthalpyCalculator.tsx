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

export interface EnthalpyInput {
  internalEnergy: number;
  deltaMolesGas: number;
  temperature: number;
}

const R_KJ = 0.008314;

export function computeEnthalpy(input: EnthalpyInput) {
  const rt = R_KJ * input.temperature;
  const correction = input.deltaMolesGas * rt;
  const enthalpy = input.internalEnergy + correction;
  const heatAtConstantPressure = enthalpy;
  return { rt, correction, enthalpy, heatAtConstantPressure };
}

export function EnthalpyCalculator() {
  const [internalEnergy, setInternalEnergy] = useState('100');
  const [deltaMolesGas, setDeltaMolesGas] = useState('2');
  const [temperature, setTemperature] = useState('298');

  const result = computeEnthalpy({
    internalEnergy: Number(internalEnergy) || 0,
    deltaMolesGas: Number(deltaMolesGas) || 0,
    temperature: Number(temperature) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Internal energy change ΔU (kJ)"
              value={internalEnergy}
              onChange={setInternalEnergy}
              step="0.1"
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Change in moles of gas Δn"
                value={deltaMolesGas}
                onChange={setDeltaMolesGas}
                step="0.1"
              />
              <NumberField label="Temperature (K)" value={temperature} onChange={setTemperature} min={0} />
            </div>
          </div>
          <Hint>
            For reactions involving gases, ΔH = ΔU + ΔnRT. When no gas moles change, enthalpy and internal
            energy are numerically identical.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Enthalpy change"
            value={`${formatMoney(result.enthalpy)} kJ`}
            sub="Equal to heat at constant pressure"
          />
          <ResultRows>
            <ResultRow label="ΔnRT term (kJ)" value={formatMoney(result.correction)} />
            <ResultRow label="RT (kJ/mol)" value={formatMoney(result.rt)} />
            <ResultRow label="Heat at constant pressure (kJ)" value={formatMoney(result.heatAtConstantPressure)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EnthalpyCalculator;
