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

export interface DistanceOnEarthInput {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}

export interface DistanceOnEarthResult {
  meters: number;
  sphericalMeters: number;
  diffMeters: number;
  exact: boolean;
}

const toRad = (d: number) => (d * Math.PI) / 180;
const finite = (n: number) => (Number.isFinite(n) ? n : 0);
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const ELLIPSOID = { a: 6378137, f: 1 / 298.257223563 };
const MEAN_RADIUS = 6371008.8;

function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number, radius: number) {
  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const dPhi = toRad(lat2 - lat1);
  const dLambda = toRad(lon2 - lon1);
  const a =
    Math.sin(dPhi / 2) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(clamp(a, 0, 1)), Math.sqrt(1 - clamp(a, 0, 1)));
}

function vincentyInverse(lat1: number, lon1: number, lat2: number, lon2: number): number | null {
  const { a, f } = ELLIPSOID;
  const b = (1 - f) * a;
  const L = toRad(lon2 - lon1);
  const U1 = Math.atan((1 - f) * Math.tan(toRad(lat1)));
  const U2 = Math.atan((1 - f) * Math.tan(toRad(lat2)));
  const sinU1 = Math.sin(U1);
  const cosU1 = Math.cos(U1);
  const sinU2 = Math.sin(U2);
  const cosU2 = Math.cos(U2);

  let lambda = L;
  let sinSigma = 0;
  let cosSigma = 0;
  let sigma = 0;
  let sinAlpha = 0;
  let cosSqAlpha = 0;
  let cos2SigmaM = 0;
  let iterations = 200;

  do {
    const sinLambda = Math.sin(lambda);
    const cosLambda = Math.cos(lambda);
    sinSigma = Math.sqrt(
      (cosU2 * sinLambda) ** 2 + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) ** 2
    );
    if (sinSigma === 0) return 0;
    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
    sigma = Math.atan2(sinSigma, cosSigma);
    sinAlpha = (cosU1 * cosU2 * sinLambda) / sinSigma;
    cosSqAlpha = 1 - sinAlpha * sinAlpha;
    cos2SigmaM = cosSqAlpha !== 0 ? cosSigma - (2 * sinU1 * sinU2) / cosSqAlpha : 0;
    const C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    const previous = lambda;
    lambda =
      L +
      (1 - C) *
        f *
        sinAlpha *
        (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM ** 2)));
    if (Math.abs(lambda - previous) <= 1e-12) break;
    iterations -= 1;
  } while (iterations > 0);

  if (iterations <= 0) return null;

  const uSq = (cosSqAlpha * (a * a - b * b)) / (b * b);
  const A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  const B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  const deltaSigma =
    B *
    sinSigma *
    (cos2SigmaM +
      (B / 4) *
        (cosSigma * (-1 + 2 * cos2SigmaM ** 2) -
          (B / 6) * cos2SigmaM * (-3 + 4 * sinSigma ** 2) * (-3 + 4 * cos2SigmaM ** 2)));

  return b * A * (sigma - deltaSigma);
}

export function computeDistanceOnEarth(input: DistanceOnEarthInput): DistanceOnEarthResult {
  const lat1 = clamp(finite(input.lat1), -90, 90);
  const lat2 = clamp(finite(input.lat2), -90, 90);
  const lon1 = finite(input.lon1);
  const lon2 = finite(input.lon2);

  const sphericalMeters = haversineMeters(lat1, lon1, lat2, lon2, MEAN_RADIUS);
  const geodesic = vincentyInverse(lat1, lon1, lat2, lon2);

  if (geodesic === null) {
    return { meters: sphericalMeters, sphericalMeters, diffMeters: 0, exact: false };
  }

  return {
    meters: geodesic,
    sphericalMeters,
    diffMeters: geodesic - sphericalMeters,
    exact: true,
  };
}

const UNITS: Record<string, { label: string; scale: number }> = {
  km: { label: 'km', scale: 1000 },
  m: { label: 'm', scale: 1 },
  mi: { label: 'mi', scale: 1609.344 },
  ft: { label: 'ft', scale: 0.3048 },
};

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

export function DistanceOnEarthCalculator() {
  const [lat1, setLat1] = useState('51.5074');
  const [lon1, setLon1] = useState('-0.1278');
  const [lat2, setLat2] = useState('48.8566');
  const [lon2, setLon2] = useState('2.3522');
  const [unit, setUnit] = useState('km');

  const active = UNITS[unit] ?? UNITS.km;

  const result = computeDistanceOnEarth({
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
              <NumberField label="Start latitude (°)" value={lat1} onChange={setLat1} step="0.0001" />
              <NumberField label="Start longitude (°)" value={lon1} onChange={setLon1} step="0.0001" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="End latitude (°)" value={lat2} onChange={setLat2} step="0.0001" />
              <NumberField label="End longitude (°)" value={lon2} onChange={setLon2} step="0.0001" />
            </div>
            <SelectField
              label="Distance unit"
              value={unit}
              onChange={setUnit}
              options={[
                { value: 'km', label: 'Kilometres (km)' },
                { value: 'm', label: 'Metres (m)' },
                { value: 'mi', label: 'Miles (mi)' },
                { value: 'ft', label: 'Feet (ft)' },
              ]}
            />
          </div>
          <Hint>
            Vincenty's inverse formula solves the geodesic on the WGS84 ellipsoid, so the answer
            follows the true shape of the Earth instead of assuming a perfect sphere.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Distance on Earth"
            value={`${formatMoney(result.meters / active.scale, 3)} ${active.label}`}
            sub={
              result.exact
                ? 'WGS84 geodesic • Vincenty inverse formula'
                : 'Near-antipodal pair • spherical fallback applied'
            }
          />
          <ResultRows>
            <ResultRow
              label="Spherical distance"
              value={`${formatMoney(result.sphericalMeters / 1000, 3)} km`}
            />
            <ResultRow
              label="Difference vs sphere"
              value={`${formatMoney(result.diffMeters, 1)} m`}
            />
            <ResultRow
              label="Distance in miles"
              value={`${formatMoney(result.meters / 1609.344, 3)} mi`}
            />
            <ResultRow
              label="Distance in feet"
              value={`${formatMoney(result.meters / 0.3048, 0)} ft`}
            />
            <ResultRow
              label="Solving method"
              value={result.exact ? 'Vincenty geodesic' : 'Haversine fallback'}
            />
          </ResultRows>
          <Hint>
            The difference row shows how much the spherical shortcut misses: over long routes the
            ellipsoid answer can differ by hundreds of metres from the haversine estimate.
          </Hint>
        </Panel>
      }
    />
  );
}

export default DistanceOnEarthCalculator;
