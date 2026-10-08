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

export interface EscapeVelocityInput {
  mass: number;
  radius: number;
}

const G = 6.674e-11;

export function computeEscapeVelocity(input: EscapeVelocityInput) {
  const mass = Math.max(0, input.mass) * 1e24;
  const radius = Math.max(1, input.radius) * 1000;

  const velocity = Math.sqrt((2 * G * mass) / radius);
  const relative = velocity / 11186;
  const kinetic = 0.5 * velocity * velocity;

  return { velocity, relative, kinetic };
}

export function EscapeVelocityCalculator() {
  const [mass, setMass] = useState('5.9724');
  const [radius, setRadius] = useState('6371');

  const result = computeEscapeVelocity({
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
            <NumberField label="Mean radius (km)" value={radius} onChange={setRadius} min={1} step="10" hint="Earth is 6371, Moon 1737.4" />
          </div>
          <Hint>
            Escape velocity = √(2GM ÷ r): the speed needed to break free with no further thrust. Earth needs
            about 11.2 km/s, the Moon only 2.4.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Escape velocity"
            value={`${formatMoney(result.velocity / 1000)} km/s`}
            sub={`${formatMoney(result.velocity)} m/s`}
          />
          <ResultRows>
            <ResultRow label="Speed (m/s)" value={formatMoney(result.velocity)} />
            <ResultRow label="Relative to Earth" value={`${formatMoney(result.relative)}×`} />
            <ResultRow label="Kinetic energy per kg" value={`${formatMoney(result.kinetic)} J`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default EscapeVelocityCalculator;
