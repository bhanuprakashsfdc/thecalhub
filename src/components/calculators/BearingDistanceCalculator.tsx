import { useState, useMemo } from 'react';
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

export interface BearingDistanceInput {
  startLat: number;
  startLon: number;
  endLat: number;
  endLon: number;
}

export interface BearingDistanceResult {
  bearingDeg: number;
  backBearingDeg: number;
  distanceKm: number;
  distanceNm: number;
}

const EARTH_RADIUS_KM = 6371;
const KM_PER_NM = 1.852;

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;
const normalizeDeg = (deg: number) => ((deg % 360) + 360) % 360;

const finite = (value: number) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

const clampLat = (value: number) => Math.max(-90, Math.min(90, finite(value)));
const clampLon = (value: number) => {
  const n = finite(value);
  return Math.max(-180, Math.min(180, n));
};

const initialBearing = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const dLambda = toRad(lon2 - lon1);
  const y = Math.sin(dLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLambda);
  return normalizeDeg(toDeg(Math.atan2(y, x)));
};

export function computeBearingDistance(input: BearingDistanceInput): BearingDistanceResult {
  const lat1 = clampLat(input.startLat);
  const lon1 = clampLon(input.startLon);
  const lat2 = clampLat(input.endLat);
  const lon2 = clampLon(input.endLon);

  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const dPhi = toRad(lat2 - lat1);
  const dLambda = toRad(lon2 - lon1);

  const a =
    Math.sin(dPhi / 2) * Math.sin(dPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) * Math.sin(dLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));

  const distanceKm = EARTH_RADIUS_KM * c;
  const distanceNm = distanceKm / KM_PER_NM;
  const bearingDeg = initialBearing(lat1, lon1, lat2, lon2);
  const backBearingDeg = initialBearing(lat2, lon2, lat1, lon1);

  return { bearingDeg, backBearingDeg, distanceKm, distanceNm };
}

export function BearingDistanceCalculator() {
  const [startLat, setStartLat] = useState('40.7128');
  const [startLon, setStartLon] = useState('-74.006');
  const [endLat, setEndLat] = useState('34.0522');
  const [endLon, setEndLon] = useState('-118.2437');

  const result = useMemo(
    () =>
      computeBearingDistance({
        startLat: Number(startLat) || 0,
        startLon: Number(startLon) || 0,
        endLat: Number(endLat) || 0,
        endLon: Number(endLon) || 0,
      }),
    [startLat, startLon, endLat, endLon]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Start latitude" value={startLat} onChange={setStartLat} step="0.0001" />
              <NumberField label="Start longitude" value={startLon} onChange={setStartLon} step="0.0001" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="End latitude" value={endLat} onChange={setEndLat} step="0.0001" />
              <NumberField label="End longitude" value={endLon} onChange={setEndLon} step="0.0001" />
            </div>
          </div>
          <Hint>
            The great-circle bearing uses atan2 of the longitude and latitude differences, and the distance
            uses the haversine formula on a spherical Earth of radius 6,371 km.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Initial bearing"
            value={`${formatMoney(result.bearingDeg, 1)}°`}
            sub={`${formatMoney(result.distanceKm)} km from start to target`}
          />
          <ResultRows>
            <ResultRow label="Great-circle distance" value={`${formatMoney(result.distanceKm)} km`} />
            <ResultRow label="Distance in nautical miles" value={`${formatMoney(result.distanceNm)} NM`} />
            <ResultRow label="Back bearing" value={`${formatMoney(result.backBearingDeg, 1)}°`} />
          </ResultRows>
          <Hint>
            Bearings are measured clockwise from true north (0°–360°). The back bearing is the same path
            measured in the opposite direction, so it sits roughly 180° away from the initial bearing.
          </Hint>
        </Panel>
      }
    />
  );
}

export default BearingDistanceCalculator;
