import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  NumberField,
  SelectField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
  safeDiv,
} from './kit';

export interface TreadmillDistanceInput {
  speed: number;
  minutes: number;
  inclinePct: number;
  unit: 'kmh' | 'mph';
}

export interface TreadmillDistanceResult {
  kilometers: number;
  miles: number;
  elevationMeters: number;
  pacePerKm: number;
  pacePerMile: number;
  speedKmh: number;
}

const finite = (n: number) => (Number.isFinite(n) ? n : 0);
const nonNegative = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

export function computeTreadmillDistance(input: TreadmillDistanceInput): TreadmillDistanceResult {
  const speed = nonNegative(input.speed);
  const minutes = nonNegative(input.minutes);
  const incline = Math.max(-100, Math.min(60, finite(input.inclinePct)));

  const speedKmh = input.unit === 'mph' ? speed * 1.609344 : speed;
  const kilometers = speedKmh * (minutes / 60);
  const miles = kilometers / 1.609344;

  return {
    kilometers,
    miles,
    elevationMeters: kilometers * 1000 * (incline / 100),
    pacePerKm: safeDiv(minutes, kilometers),
    pacePerMile: safeDiv(minutes, miles),
    speedKmh,
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

const UNIT_OPTIONS = [
  { value: 'kmh', label: 'Kilometres per hour' },
  { value: 'mph', label: 'Miles per hour' },
];

export function TreadmillDistanceCalculator() {
  const [unit, setUnit] = useState('kmh');
  const [speed, setSpeed] = useState('10');
  const [minutes, setMinutes] = useState('30');
  const [incline, setIncline] = useState('2');

  const activeUnit = unit === 'mph' ? 'mph' : 'kmh';

  const result = computeTreadmillDistance({
    speed: toNumber(speed),
    minutes: toNumber(minutes),
    inclinePct: toNumber(incline),
    unit: activeUnit,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField label="Speed unit" value={unit} onChange={setUnit} options={UNIT_OPTIONS} />
            <NumberField label="Treadmill speed" value={speed} onChange={setSpeed} min={0} step="0.1" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Duration (minutes)" value={minutes} onChange={setMinutes} min={0} />
              <NumberField label="Incline (%)" value={incline} onChange={setIncline} step="0.5" />
            </div>
          </div>
          <Hint>
            Distance equals speed times time, and the incline percentage turns the horizontal distance into
            vertical elevation gained. Running 10 km/h for 30 minutes at 2% incline covers 5 km and climbs 100 m.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Distance covered"
            value={activeUnit === 'mph' ? `${formatMoney(result.miles)} mi` : `${formatMoney(result.kilometers)} km`}
            sub={`${formatMoney(result.speedKmh)} km/h for ${formatMoney(toNumber(minutes), 0)} minutes`}
          />
          <ResultRows>
            <ResultRow label="Distance in kilometres" value={`${formatMoney(result.kilometers)} km`} />
            <ResultRow label="Distance in miles" value={`${formatMoney(result.miles)} mi`} />
            <ResultRow label="Elevation gain" value={`${formatMoney(result.elevationMeters, 0)} m`} />
            <ResultRow label="Pace per kilometre" value={`${formatMoney(result.pacePerKm)} min`} />
            <ResultRow label="Pace per mile" value={`${formatMoney(result.pacePerMile)} min`} />
          </ResultRows>
          <Hint>
            Pace divides the workout minutes by the distance run, so a faster speed shortens both pace rows
            while a steep incline adds elevation without changing the distance.
          </Hint>
        </Panel>
      }
    />
  );
}

export default TreadmillDistanceCalculator;
