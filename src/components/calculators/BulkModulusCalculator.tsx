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

export interface BulkModulusInput {
  pressureMpa: number;
  reductionPct: number;
}

export function computeBulkModulus(input: BulkModulusInput) {
  const strain = input.reductionPct / 100;
  const pressurePa = input.pressureMpa * 1e6;
  const modulus = strain !== 0 ? pressurePa / strain : 0;
  const modulusMpa = modulus / 1e6;
  const modulusGpa = modulus / 1e9;
  return { strain, pressurePa, modulus, modulusMpa, modulusGpa };
}

export function BulkModulusCalculator() {
  const [pressureMpa, setPressureMpa] = useState('10');
  const [reductionPct, setReductionPct] = useState('0.5');

  const result = computeBulkModulus({
    pressureMpa: Number(pressureMpa) || 0,
    reductionPct: Number(reductionPct) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Applied pressure (MPa)"
              value={pressureMpa}
              onChange={setPressureMpa}
              min={0}
              step="0.5"
            />
            <NumberField
              label="Volume reduction (%)"
              value={reductionPct}
              onChange={setReductionPct}
              min={0}
              step="0.05"
            />
          </div>
          <Hint>
            Bulk modulus K = ΔP / (ΔV/V) measures resistance to uniform compression — water sits near 2.2 GPa
            while steel reaches about 160 GPa.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Bulk modulus"
            value={`${formatMoney(result.modulusGpa)} GPa`}
            sub={`${formatMoney(result.modulusMpa)} MPa under compression`
            }
          />
          <ResultRows>
            <ResultRow label="Bulk modulus (Pa)" value={formatMoney(result.modulus)} />
            <ResultRow label="Volumetric strain" value={formatMoney(result.strain)} />
            <ResultRow label="Applied pressure (Pa)" value={formatMoney(result.pressurePa)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default BulkModulusCalculator;
