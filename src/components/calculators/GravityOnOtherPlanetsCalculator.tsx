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

export interface PlanetGravityInput {
  mass: number;
  radius: number;
}

const G = 6.674e-11;

export function computeGravity(input: PlanetGravityInput) {
  const mass = Math.max(0, input.mass) * 1e24;
  const radius = Math.max(1, input.radius) * 1000;

  const gravity = (G * mass) / (radius * radius);
  const relative = gravity / 9.80665;
  const escape = Math.sqrt((2 * G * mass) / radius);

  return { gravity, relative, escape };
}

export function GravityOnOtherPlanetsCalculator() {
  const [mass, setMass] = useState('0.64171');
  const [radius, setRadius] = useState('3389.5');

  const result = computeGravity({
    mass: Number(mass) || 0,
    radius: Number(radius) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Mass (×10²⁴ kg)" value={mass} onChange={setMass} min={0} step="0.01" hint="Earth is 5.9724, Mars 0.64171" />
            <NumberField label="Mean radius (km)" value={radius} onChange={setRadius} min={1} step="10" hint="Earth is 6371, Mars 3389.5" />
          </div>
          <Hint>
            Newton's law of gravitation: g = G·M ÷ r². Double the mass and gravity doubles; double the radius
            and it falls to a quarter.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Surface gravity"
            value={`${formatMoney(result.gravity)} m/s²`}
            sub={`${formatMoney(result.relative)}× Earth gravity`}
          />
          <ResultRows>
            <ResultRow label="Relative to Earth" value={`${formatMoney(result.relative)}×`} />
            <ResultRow label="Escape velocity" value={`${formatMoney(result.escape / 1000)} km/s`} />
            <ResultRow label="Fall in first second" value={`${formatMoney(result.gravity / 2)} m`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default GravityOnOtherPlanetsCalculator;
