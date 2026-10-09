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
} from './kit';

export interface GreatCircleDistanceInput {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
  radius: number;
}

export interface GreatCircleDistanceResult {
  km: number;
  miles: number;
  nauticalMiles: number;
  angleDeg: number;
  bearingDeg: number;
  midLat: number;
  midLon: number;
}

const toRad = (d: number) => (d * Math.PI) / 180;
const toDeg = (r: number) => (r * 180) / Math.PI;
const finite = (n: number) => (Number.isFinite(n) ? n : 0);
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

export function computeGreatCircleDistance(
  input: GreatCircleDistanceInput
): GreatCircleDistanceResult {
  const lat1 = clamp(finite(input.lat1), -90, 90);
  const lat2 = clamp(finite(input.lat2), -90, 90);
  const lon1 = finite(input.lon1);
  const lon2 = finite(input.lon2);
  const radius = finite(input.radius) > 0 ? finite(input.radius) : 6371;

  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const dPhi = toRad(lat2 - lat1);
  const dLambda = toRad(lon2 - lon1);

  const hav =
    Math.sin(dPhi / 2) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
  const a = clamp(hav, 0, 1);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const km = radius * c;
  const angleDeg = toDeg(c);

  const y = Math.sin(dLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLambda);
  const bearingDeg = a === 0 ? 0 : (toDeg(Math.atan2(y, x)) + 360) % 360;

  const bx = Math.cos(phi2) * Math.cos(dLambda);
  const by = Math.cos(phi2) * Math.sin(dLambda);
  const midLat = toDeg(
    Math.atan2(Math.sin(phi1) + Math.sin(phi2), Math.sqrt((Math.cos(phi1) + bx) ** 2 + by ** 2))
  );
  const rawLon = toDeg(toRad(lon1) + Math.atan2(by, Math.cos(phi1) + bx));
  const midLon = ((((rawLon + 180) % 360) + 360) % 360) - 180;

  return {
    km,
    miles: km / 1.609344,
    nauticalMiles: km / 1.852,
    angleDeg,
    bearingDeg,
    midLat,
    midLon,
  };
}

const UNITS: Record<string, { label: string; pick: (r: GreatCircleDistanceResult) => number }> = {
  km: { label: 'km', pick: (r) => r.km },
  mi: { label: 'mi', pick: (r) => r.miles },
  nm: { label: 'nmi', pick: (r) => r.nauticalMiles },
};

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

export function GreatCircleDistanceCalculator() {
  const [lat1, setLat1] = useState('51.5074');
  const [lon1, setLon1] = useState('-0.1278');
  const [lat2, setLat2] = useState('48.8566');
  const [lon2, setLon2] = useState('2.3522');
  const [radius, setRadius] = useState('6371');
  const [unit, setUnit] = useState('km');

  const active = UNITS[unit] ?? UNITS.km;

  const result = computeGreatCircleDistance({
    lat1: toNumber(lat1),
    lon1: toNumber(lon1),
    lat2: toNumber(lat2),
    lon2: toNumber(lon2),
    radius: toNumber(radius),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Start latitude (°)" value={lat1} onChange={setLat1} step="0.0001" />
              <NumberField label="Start longitude (°)" value={lon1} onChange={setLon1} step="0.0001" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="End latitude (°)" value={lat2} onChange={setLat2} step="0.0001" />
              <NumberField label="End longitude (°)" value={lon2} onChange={setLon2} step="0.0001" />
            </div>
            <NumberField
              label="Earth radius (km)"
              value={radius}
              onChange={setRadius}
              min={1}
              hint="6371 km is the mean Earth radius; the equatorial radius is 6378.137 km."
            />
            <SelectField
              label="Distance unit"
              value={unit}
              onChange={setUnit}
              options={[
                { value: 'km', label: 'Kilometres (km)' },
                { value: 'mi', label: 'Miles (mi)' },
                { value: 'nm', label: 'Nautical miles (nmi)' },
              ]}
            />
          </div>
          <Hint>
            The haversine formula measures the shortest path over a sphere, so the result is the
            great-circle arc between the two coordinates rather than a straight line on a map.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Great-circle distance"
            value={`${formatMoney(active.pick(result))} ${active.label}`}
            sub={`${formatMoney(result.angleDeg, 3)}° of arc around a ${formatMoney(
              toNumber(radius) > 0 ? toNumber(radius) : 6371,
              0
            )} km sphere`}
          />
          <ResultRows>
            <ResultRow label="Distance in miles" value={`${formatMoney(result.miles, 3)} mi`} />
            <ResultRow
              label="Distance in nautical miles"
              value={`${formatMoney(result.nauticalMiles, 3)} nmi`}
            />
            <ResultRow label="Initial bearing" value={`${formatMoney(result.bearingDeg, 1)}°`} />
            <ResultRow
              label="Midpoint latitude"
              value={`${formatMoney(result.midLat, 4)}°`}
            />
            <ResultRow
              label="Midpoint longitude"
              value={`${formatMoney(result.midLon, 4)}°`}
            />
          </ResultRows>
          <Hint>
            The bearing is the initial course from the start point, measured clockwise from true
            north, and the midpoint lies halfway along the great-circle path.
          </Hint>
        </Panel>
      }
    />
  );
}

export default GreatCircleDistanceCalculator;
