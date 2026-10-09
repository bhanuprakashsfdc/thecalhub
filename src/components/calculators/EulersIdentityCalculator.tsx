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

export interface EulersIdentityInput {
  degrees: number;
}

export function computeEulersIdentity(input: EulersIdentityInput) {
  const radians = (input.degrees * Math.PI) / 180;
  const real = Math.cos(radians);
  const imaginary = Math.sin(radians);
  const realPlusOne = real + 1;
  return { radians, real, imaginary, realPlusOne };
}

export function EulersIdentityCalculator() {
  const [degrees, setDegrees] = useState('180');

  const result = computeEulersIdentity({ degrees: Number(degrees) || 0 });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Angle (degrees)" value={degrees} onChange={setDegrees} step="1" />
          </div>
          <Hint>
            Euler's formula: e^(iθ) = cos θ + i·sin θ. At θ = 180° this gives the
            famous identity e^(iπ) + 1 = 0.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="e^(iθ) + 1"
            value={`${formatMoney(result.realPlusOne)} + ${formatMoney(result.imaginary)}i`}
            sub="Complex result"
          />
          <ResultRows>
            <ResultRow label="Real part (cos θ)" value={formatMoney(result.real)} />
            <ResultRow label="Imaginary part (sin θ)" value={formatMoney(result.imaginary)} />
            <ResultRow label="Magnitude" value={formatMoney(1)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EulersIdentityCalculator;
