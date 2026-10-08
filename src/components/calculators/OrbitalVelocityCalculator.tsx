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

export interface OrbitalVelocityInput {
  semiMajorAxis: number;
}

const GM_SUN = 1.32712440018e20;
const AU = 149597870.7;

export function computeOrbitalVelocity(input: OrbitalVelocityInput) {
  const axis = Math.max(0.01, input.semiMajorAxis);
  const radius = axis * AU * 1000;

  const velocity = Math.sqrt(GM_SUN / radius);
  const periodYears = Math.pow(axis, 1.5);
  const circumference = 2 * Math.PI * axis * 149.597871;

  return { velocity, periodYears, circumference };
}

export function OrbitalVelocityCalculator() {
  const [semiMajorAxis, setSemiMajorAxis] = useState('1');

  const result = computeOrbitalVelocity({ semiMajorAxis: Number(semiMajorAxis) || 0 });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Orbital radius (AU)" value={semiMajorAxis} onChange={setSemiMajorAxis} min={0.01} step="0.1" />
          </div>
          <Hint>
            Circular orbital speed = √(GM ÷ r). Earth circles the Sun at 29.8 km/s; speed falls with the square
            root of distance, so outer planets crawl compared with Mercury.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Orbital velocity"
            value={`${formatMoney(result.velocity / 1000)} km/s`}
            sub={`${formatMoney(result.velocity)} m/s around the Sun`}
          />
          <ResultRows>
            <ResultRow label="Speed (m/s)" value={formatMoney(result.velocity)} />
            <ResultRow label="Orbital period" value={`${formatMoney(result.periodYears)} years`} />
            <ResultRow label="Orbit length (million km)" value={formatMoney(result.circumference)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default OrbitalVelocityCalculator;
