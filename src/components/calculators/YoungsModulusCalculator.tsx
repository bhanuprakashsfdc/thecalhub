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

export interface YoungsModulusInput {
  stressMpa: number;
  strain: number;
}

export function computeYoungsModulus(input: YoungsModulusInput) {
  const stressPa = input.stressMpa * 1e6;
  const modulus = input.strain !== 0 ? stressPa / input.strain : 0;
  const modulusMpa = input.strain !== 0 ? input.stressMpa / input.strain : 0;
  return { stressPa, modulus, modulusMpa, modulusGpa: modulus / 1e9 };
}

export function YoungsModulusCalculator() {
  const [stressMpa, setStressMpa] = useState('250');
  const [strain, setStrain] = useState('0.00125');

  const result = computeYoungsModulus({
    stressMpa: Number(stressMpa) || 0,
    strain: Number(strain) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Stress (MPa)" value={stressMpa} onChange={setStressMpa} min={0} step="5" />
            <NumberField label="Axial strain" value={strain} onChange={setStrain} min={0} step="0.00005" />
          </div>
          <Hint>
            Young’s modulus is the slope of the linear part of the stress–strain curve: aluminium near 70 GPa,
            steel near 200 GPa, concrete around 30 GPa.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Young’s modulus"
            value={`${formatMoney(result.modulusGpa)} GPa`}
            sub="Stress divided by strain"
          />
          <ResultRows>
            <ResultRow label="Modulus (MPa)" value={formatMoney(result.modulusMpa)} />
            <ResultRow label="Stress (Pa)" value={formatMoney(result.stressPa)} />
            <ResultRow label="Strain (%)" value={formatMoney((Number(strain) || 0) * 100)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default YoungsModulusCalculator;
