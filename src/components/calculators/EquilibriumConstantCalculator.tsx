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

export interface EquilibriumConstantInput {
  dg0: number;
  temperature: number;
}

const R_KJ = 0.008314;

export function computeEquilibriumConstant(input: EquilibriumConstantInput) {
  const rt = R_KJ * input.temperature;
  const lnK = rt !== 0 ? -input.dg0 / rt : 0;
  const k = Math.exp(lnK);
  return { rt, lnK, k };
}

export function EquilibriumConstantCalculator() {
  const [dg0, setDg0] = useState('-10');
  const [temperature, setTemperature] = useState('298');

  const result = computeEquilibriumConstant({
    dg0: Number(dg0) || 0,
    temperature: Number(temperature) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Standard free energy ΔG° (kJ/mol)"
              value={dg0}
              onChange={setDg0}
              step="0.1"
            />
            <NumberField label="Temperature (K)" value={temperature} onChange={setTemperature} min={0} />
          </div>
          <Hint>
            ΔG° = −RT ln K. A strongly negative ΔG° drives K far above one, meaning products dominate the
            equilibrium mixture.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Equilibrium constant K" value={formatMoney(result.k)} sub="Dimensionless" />
          <ResultRows>
            <ResultRow label="ln K" value={formatMoney(result.lnK)} />
            <ResultRow label="RT (kJ/mol)" value={formatMoney(result.rt)} />
            <ResultRow label="1 / K" value={formatMoney(result.k !== 0 ? 1 / result.k : 0)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EquilibriumConstantCalculator;
