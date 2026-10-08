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

export interface OrbitalDistanceInput {
  periodYears: number;
}

export function computeOrbitalDistance(input: OrbitalDistanceInput) {
  const period = Math.max(0, input.periodYears);

  const au = Math.pow(period, 2 / 3);
  const millionKm = au * 149.597871;
  const lightHours = (au * 499.004784) / 3600;
  const lightMinutes = (au * 499.004784) / 60;

  return { au, millionKm, lightHours, lightMinutes };
}

export function OrbitalDistanceCalculator() {
  const [periodYears, setPeriodYears] = useState('1.881');

  const result = computeOrbitalDistance({ periodYears: Number(periodYears) || 0 });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Orbital period (years)" value={periodYears} onChange={setPeriodYears} min={0} step="0.01" />
          </div>
          <Hint>
            Kepler's third law in AU units: a³ = P², so distance in astronomical units is the period squared
            cubed — P^(2/3).
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Orbital distance"
            value={`${formatMoney(result.au)} AU`}
            sub={`${formatMoney(result.millionKm)} million km from the star`}
          />
          <ResultRows>
            <ResultRow label="Distance (million km)" value={formatMoney(result.millionKm)} />
            <ResultRow label="One-way light time (hours)" value={formatMoney(result.lightHours)} />
            <ResultRow label="One-way light time (minutes)" value={formatMoney(result.lightMinutes)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default OrbitalDistanceCalculator;
