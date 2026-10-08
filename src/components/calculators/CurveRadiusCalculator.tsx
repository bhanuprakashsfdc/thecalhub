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

export interface CurveRadiusInput {
  speed: number;
  elevationPercent: number;
  friction: number;
}

export function computeCurveRadius(input: CurveRadiusInput) {
  const combined = input.elevationPercent / 100 + input.friction;
  const radius = combined > 0 ? (input.speed * input.speed) / (127 * combined) : 0;
  const degreeOfCurve = radius > 0 ? 5729.57795 / radius : 0;
  const radiusFeet = radius * 3.28084;
  return { combined, radius, degreeOfCurve, radiusFeet };
}

export function CurveRadiusCalculator() {
  const [speed, setSpeed] = useState('80');
  const [elevationPercent, setElevationPercent] = useState('6');
  const [friction, setFriction] = useState('0.14');

  const result = computeCurveRadius({
    speed: Number(speed) || 0,
    elevationPercent: Number(elevationPercent) || 0,
    friction: Number(friction) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Design speed (km/h)" value={speed} onChange={setSpeed} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Superelevation (%)"
                value={elevationPercent}
                onChange={setElevationPercent}
                min={0}
                max={12}
              />
              <NumberField
                label="Side friction factor"
                value={friction}
                onChange={setFriction}
                min={0}
                max={0.4}
                step="0.01"
              />
            </div>
          </div>
          <Hint>
            Rearranging e + f = V² / 127R gives the minimum horizontal curve radius for a design speed, given
            the superelevation and friction you are willing to use.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Minimum curve radius"
            value={`${formatMoney(result.radius)} m`}
            sub={`${formatMoney(result.degreeOfCurve)}° degree of curve`
            }
          />
          <ResultRows>
            <ResultRow label="Combined e + f" value={formatMoney(result.combined)} />
            <ResultRow label="Degree of curve (degrees)" value={formatMoney(result.degreeOfCurve)} />
            <ResultRow label="Radius (ft)" value={formatMoney(result.radiusFeet)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CurveRadiusCalculator;
