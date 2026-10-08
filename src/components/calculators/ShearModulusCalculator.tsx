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

export interface ShearModulusInput {
  youngsModulus: number;
  poisson: number;
}

export function computeShearModulus(input: ShearModulusInput) {
  const denominator = 2 * (1 + input.poisson);
  const shear = denominator !== 0 ? input.youngsModulus / denominator : 0;
  return { denominator, shear, shearMpa: shear * 1000 };
}

export function ShearModulusCalculator() {
  const [youngsModulus, setYoungsModulus] = useState('200');
  const [poisson, setPoisson] = useState('0.3');

  const result = computeShearModulus({
    youngsModulus: Number(youngsModulus) || 0,
    poisson: Number(poisson) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Young’s modulus (GPa)"
              value={youngsModulus}
              onChange={setYoungsModulus}
              min={0}
              step="1"
            />
            <NumberField
              label="Poisson’s ratio"
              value={poisson}
              onChange={setPoisson}
              step="0.01"
              hint="Usually between 0 and 0.5"
            />
          </div>
          <Hint>
            G = E / 2(1 + ν) links the three elastic constants for isotropic materials — check your inputs
            produce a positive modulus before trusting the result.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Shear modulus"
            value={`${formatMoney(result.shear)} GPa`}
            sub="Rigidity under shear loading"
          />
          <ResultRows>
            <ResultRow label="Shear modulus (MPa)" value={formatMoney(result.shearMpa)} />
            <ResultRow label="Denominator 2(1+ν)" value={formatMoney(result.denominator)} />
            <ResultRow label="E used in the relation (GPa)" value={formatMoney(Number(youngsModulus) || 0)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ShearModulusCalculator;
