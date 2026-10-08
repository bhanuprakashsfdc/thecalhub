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

export interface StressStrainInput {
  force: number;
  area: number;
  length: number;
  extension: number;
}

export function computeStressStrain(input: StressStrainInput) {
  const stress = input.area > 0 ? input.force / input.area : 0;
  const strain = input.length > 0 ? input.extension / input.length : 0;
  const modulus = strain !== 0 ? stress / strain : 0;
  const energyDensity = 0.5 * stress * 1e6 * strain * 0.001;
  return { stress, strain, modulus, energyDensity };
}

export function StressStrainCalculator() {
  const [force, setForce] = useState('50000');
  const [area, setArea] = useState('250');
  const [length, setLength] = useState('100');
  const [extension, setExtension] = useState('0.5');

  const result = computeStressStrain({
    force: Number(force) || 0,
    area: Number(area) || 0,
    length: Number(length) || 0,
    extension: Number(extension) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Applied force (N)" value={force} onChange={setForce} min={0} />
              <NumberField label="Cross-section area (mm²)" value={area} onChange={setArea} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Original length (mm)" value={length} onChange={setLength} min={0} />
              <NumberField label="Extension (mm)" value={extension} onChange={setExtension} min={0} step="0.01" />
            </div>
          </div>
          <Hint>
            Stress is force over area (N/mm² = MPa), strain is extension over original length; their ratio in the
            elastic range gives Young’s modulus.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Engineering stress"
            value={`${formatMoney(result.stress)} MPa`}
            sub={`${formatMoney(result.strain * 100)} % engineering strain`
            }
          />
          <ResultRows>
            <ResultRow label="Strain" value={formatMoney(result.strain)} />
            <ResultRow label="Young’s modulus (MPa)" value={formatMoney(result.modulus)} />
            <ResultRow label="Strain energy density (kJ/m³)" value={formatMoney(result.energyDensity)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StressStrainCalculator;
