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

export interface OrbitalPeriodInput {
  semiMajorAxis: number;
}

export function computeOrbitalPeriod(input: OrbitalPeriodInput) {
  const axis = Math.max(0, input.semiMajorAxis);

  const years = Math.pow(axis, 1.5);
  const days = years * 365.256;
  const months = years * 12;
  const hours = days * 24;

  return { years, days, months, hours };
}

export function OrbitalPeriodCalculator() {
  const [semiMajorAxis, setSemiMajorAxis] = useState('5.203');

  const result = computeOrbitalPeriod({ semiMajorAxis: Number(semiMajorAxis) || 0 });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Semi-major axis (AU)" value={semiMajorAxis} onChange={setSemiMajorAxis} min={0} step="0.01" />
          </div>
          <Hint>
            Kepler's third law: P² = a³ for solar-system bodies. A planet one AU out takes a year; at 5.2 AU —
            Jupiter's distance — it takes about 11.9 years.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Orbital period"
            value={`${formatMoney(result.years)} years`}
            sub={`${formatMoney(result.days)} Earth days per orbit`}
          />
          <ResultRows>
            <ResultRow label="Period in days" value={formatMoney(result.days)} />
            <ResultRow label="Period in months" value={formatMoney(result.months)} />
            <ResultRow label="Period in hours" value={formatMoney(result.hours)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default OrbitalPeriodCalculator;
