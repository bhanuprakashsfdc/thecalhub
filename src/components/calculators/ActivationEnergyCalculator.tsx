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

export interface ActivationEnergyInput {
  k1: number;
  k2: number;
  t1: number;
  t2: number;
}

export function computeActivationEnergy(input: ActivationEnergyInput) {
  const numerator = -8.314 * Math.log(safeDiv(input.k2, input.k1));
  const denominator = 1 / input.t2 - 1 / input.t1;
  const ea = denominator === 0 ? 0 : numerator / denominator;
  const rateRatio = safeDiv(input.k2, input.k1);
  const tempDiff = input.t2 - input.t1;
  return { ea, eaKj: ea / 1000, rateRatio, tempDiff };
}

export function ActivationEnergyCalculator() {
  const [k1, setK1] = useState('1');
  const [k2, setK2] = useState('4');
  const [t1, setT1] = useState('300');
  const [t2, setT2] = useState('320');

  const result = computeActivationEnergy({
    k1: Number(k1) || 0,
    k2: Number(k2) || 0,
    t1: Number(t1) || 0,
    t2: Number(t2) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Rate constant k₁" value={k1} onChange={setK1} min={0} step="0.01" />
              <NumberField label="Rate constant k₂" value={k2} onChange={setK2} min={0} step="0.01" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Temperature T₁ (K)" value={t1} onChange={setT1} min={0} />
              <NumberField label="Temperature T₂ (K)" value={t2} onChange={setT2} min={0} />
            </div>
          </div>
          <Hint>
            The two-point Arrhenius form removes the pre-exponential factor: measure the same reaction at two
            temperatures and the slope gives the activation energy.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Activation energy"
            value={`${formatMoney(result.eaKj)} kJ/mol`}
            sub="From the two-point Arrhenius equation"
          />
          <ResultRows>
            <ResultRow label="Activation energy (J/mol)" value={formatMoney(result.ea)} />
            <ResultRow label="Rate ratio k₂/k₁" value={formatMoney(result.rateRatio)} />
            <ResultRow label="Temperature difference (K)" value={formatMoney(result.tempDiff)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ActivationEnergyCalculator;
