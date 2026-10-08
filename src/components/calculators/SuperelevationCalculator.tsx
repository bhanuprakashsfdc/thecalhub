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

export interface SuperelevationInput {
  speed: number;
  radius: number;
  friction: number;
}

export function computeSuperelevation(input: SuperelevationInput) {
  const total = (input.speed * input.speed) / (127 * Math.max(1, input.radius));
  const elevation = total - input.friction;
  const percent = elevation * 100;
  const acceleration = total * 9.81;
  const frictionPercent = input.friction * 100;
  return { total, elevation, percent, acceleration, frictionPercent };
}

export function SuperelevationCalculator() {
  const [speed, setSpeed] = useState('60');
  const [radius, setRadius] = useState('150');
  const [friction, setFriction] = useState('0.12');

  const result = computeSuperelevation({
    speed: Number(speed) || 0,
    radius: Number(radius) || 0,
    friction: Number(friction) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Design speed (km/h)" value={speed} onChange={setSpeed} min={0} />
              <NumberField label="Curve radius (m)" value={radius} onChange={setRadius} min={1} />
            </div>
            <NumberField
              label="Side friction factor"
              value={friction}
              onChange={setFriction}
              min={0}
              max={0.4}
              step="0.01"
            />
          </div>
          <Hint>
            e + f = V² / 127R. Remaining after friction is taken up becomes superelevation, usually capped near
            6–8 % on fast roads.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Required superelevation"
            value={`${formatMoney(result.percent)} %`}
            sub={`e + f = ${formatMoney(result.total * 100)} %`
            }
          />
          <ResultRows>
            <ResultRow label="e + f requirement (%)" value={formatMoney(result.total * 100)} />
            <ResultRow label="Centripetal acceleration (m/s²)" value={formatMoney(result.acceleration)} />
            <ResultRow
              label="Side friction used (%)"
              value={formatMoney(result.frictionPercent)}
            />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SuperelevationCalculator;
