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

export interface BearingInput {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}

export interface BearingResult {
  bearing: number;
  reverseBearing: number;
  distanceKm: number;
  distanceMiles: number;
  compass: string;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const toFinite = (n: number) => (Number.isFinite(n) ? n : 0);
const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

const COMPASS_POINTS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
];

const compassLabel = (deg: number) =>
  Number.isFinite(deg) ? COMPASS_POINTS[Math.round(deg / 22.5) % 16] : '—';

export function computeBearing(input: BearingInput): BearingResult {
  const lat1 = clamp(toFinite(input.lat1), -90, 90);
  const lon1 = clamp(toFinite(input.lon1), -180, 180);
  const lat2 = clamp(toFinite(input.lat2), -90, 90);
  const lon2 = clamp(toFinite(input.lon2), -180, 180);

  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const deltaLon = toRad(lon2 - lon1);

  const y = Math.sin(deltaLon) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLon);
  const bearing = ((toDeg(Math.atan2(y, x)) % 360) + 360) % 360;

  const deltaPhi = toRad(lat2 - lat1);
  const hav =
    Math.sin(deltaPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLon / 2) ** 2;
  const distanceKm = 6371 * 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(Math.max(0, 1 - hav)));

  return {
    bearing,
    reverseBearing: (bearing + 180) % 360,
    distanceKm,
    distanceMiles: distanceKm / 1.609344,
    compass: compassLabel(bearing),
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

export function BearingCalculator() {
  const [lat1, setLat1] = useState('51.5074');
  const [lon1, setLon1] = useState('-0.1278');
  const [lat2, setLat2] = useState('48.8566');
  const [lon2, setLon2] = useState('2.3522');

  const result = computeBearing({
    lat1: toNumber(lat1),
    lon1: toNumber(lon1),
    lat2: toNumber(lat2),
    lon2: toNumber(lon2),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Latitude of A" value={lat1} onChange={setLat1} min={-90} max={90} step="0.0001" />
              <NumberField label="Longitude of A" value={lon1} onChange={setLon1} min={-180} max={180} step="0.0001" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Latitude of B" value={lat2} onChange={setLat2} min={-90} max={90} step="0.0001" />
              <NumberField label="Longitude of B" value={lon2} onChange={setLon2} min={-180} max={180} step="0.0001" />
            </div>
          </div>
          <Hint>
            The initial bearing is the angle you would turn at point A to face point B, measured clockwise from
            true north. From (0, 0) to (0, 1) the answer is exactly 90°, due east.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Initial bearing"
            value={`${formatMoney(result.bearing, 1)}°`}
            sub={`${result.compass} from A towards B • ${formatMoney(result.distanceKm, 1)} km apart`}
          />
          <ResultRows>
            <ResultRow label="Compass direction" value={result.compass} />
            <ResultRow label="Reverse bearing" value={`${formatMoney(result.reverseBearing, 1)}°`} />
            <ResultRow label="Distance (kilometres)" value={`${formatMoney(result.distanceKm)} km`} />
            <ResultRow label="Distance (miles)" value={`${formatMoney(result.distanceMiles)} mi`} />
          </ResultRows>
          <Hint>
            The reverse bearing is always 180° away, and the distance uses the haversine formula on a sphere of
            radius 6371 km so it follows the curve of the earth rather than a flat plane.
          </Hint>
        </Panel>
      }
    />
  );
}

export default BearingCalculator;
