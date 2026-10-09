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

export interface LatitudeLongitudeInput {
  latitude: number;
  longitude: number;
}

export interface LatitudeLongitudeResult {
  latitude: number;
  longitude: number;
  latitudeDms: string;
  longitudeDms: string;
  hemisphere: string;
  equatorKm: number;
  meridianKm: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const toFinite = (n: number) => (Number.isFinite(n) ? n : 0);

const toDms = (value: number, isLatitude: boolean) => {
  const suffix = isLatitude ? (value >= 0 ? 'N' : 'S') : value >= 0 ? 'E' : 'W';
  const absolute = Math.abs(value);
  const degrees = Math.floor(absolute);
  const minuteTotal = (absolute - degrees) * 60;
  const minutes = Math.floor(minuteTotal);
  const seconds = (minuteTotal - minutes) * 60;
  return `${degrees}° ${minutes}' ${seconds.toFixed(1)}" ${suffix}`;
};

export function computeLatitudeLongitude(input: LatitudeLongitudeInput): LatitudeLongitudeResult {
  const latitude = clamp(toFinite(input.latitude), -90, 90);
  const longitude = clamp(toFinite(input.longitude), -180, 180);
  const latitudeRad = (latitude * Math.PI) / 180;

  return {
    latitude,
    longitude,
    latitudeDms: toDms(latitude, true),
    longitudeDms: toDms(longitude, false),
    hemisphere: `${latitude >= 0 ? 'N' : 'S'} / ${longitude >= 0 ? 'E' : 'W'}`,
    equatorKm: Math.abs(latitude) * 111.32,
    meridianKm: Math.abs(longitude) * 111.32 * Math.cos(latitudeRad),
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

export function LatitudeLongitudeCalculator() {
  const [latitude, setLatitude] = useState('40.4168');
  const [longitude, setLongitude] = useState('-3.7038');

  const result = computeLatitudeLongitude({
    latitude: toNumber(latitude),
    longitude: toNumber(longitude),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Latitude (decimal degrees)"
              value={latitude}
              onChange={setLatitude}
              min={-90}
              max={90}
              step="0.0001"
              hint="Positive north of the equator, negative south; valid range −90 to 90."
            />
            <NumberField
              label="Longitude (decimal degrees)"
              value={longitude}
              onChange={setLongitude}
              min={-180}
              max={180}
              step="0.0001"
              hint="Positive east of the prime meridian, negative west; valid range −180 to 180."
            />
          </div>
          <Hint>
            Degrees, minutes and seconds split the decimal reading into whole degrees, 60ths of a degree and
            60ths of a minute, which is how coordinates are printed on maps and charts.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Coordinate in DMS"
            value={`${result.latitudeDms}, ${result.longitudeDms}`}
            sub={`${formatMoney(result.latitude, 4)}°, ${formatMoney(result.longitude, 4)}° in decimal degrees`}
          />
          <ResultRows>
            <ResultRow label="Latitude in DMS" value={result.latitudeDms} />
            <ResultRow label="Longitude in DMS" value={result.longitudeDms} />
            <ResultRow label="Hemisphere" value={result.hemisphere} />
            <ResultRow label="Distance from equator" value={`${formatMoney(result.equatorKm, 1)} km`} />
            <ResultRow label="Distance from prime meridian" value={`${formatMoney(result.meridianKm, 1)} km`} />
          </ResultRows>
          <Hint>
            Both distance rows use the rough figure of 111.32 km per degree, with the meridian row scaled by the
            cosine of latitude because longitude lines converge toward the poles.
          </Hint>
        </Panel>
      }
    />
  );
}

export default LatitudeLongitudeCalculator;
