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

export interface PoissonsRatioInput {
  lateral: number;
  axial: number;
}

export function computePoissonsRatio(input: PoissonsRatioInput) {
  const poisson = input.axial !== 0 ? -(input.lateral / input.axial) : 0;
  const magnitude = Math.abs(input.lateral / (input.axial || 1));
  const volumeStrain = input.axial + 2 * input.lateral;
  return { poisson, magnitude, volumeStrain };
}

export function PoissonsRatioCalculator() {
  const [lateral, setLateral] = useState('-0.001');
  const [axial, setAxial] = useState('0.004');

  const result = computePoissonsRatio({
    lateral: Number(lateral) || 0,
    axial: Number(axial) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Lateral strain"
              value={lateral}
              onChange={setLateral}
              step="0.0001"
              hint="Negative when the bar narrows"
            />
            <NumberField label="Axial strain" value={axial} onChange={setAxial} step="0.0001" />
          </div>
          <Hint>
            Poisson’s ratio is −lateral strain divided by axial strain: about 0.3 for most metals, 0.5 for
            incompressible rubber, and near zero for cork.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Poisson’s ratio"
            value={formatMoney(result.poisson)}
            sub={`${formatMoney(result.magnitude)} strain ratio by magnitude`
            }
          />
          <ResultRows>
            <ResultRow label="Strain ratio" value={formatMoney(result.magnitude)} />
            <ResultRow label="Axial strain ×100 (%)" value={formatMoney((Number(axial) || 0) * 100)} />
            <ResultRow label="Volumetric strain" value={formatMoney(result.volumeStrain)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PoissonsRatioCalculator;
