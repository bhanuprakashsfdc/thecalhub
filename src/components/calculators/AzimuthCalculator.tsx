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

export interface AzimuthInput {
  latitude: number;
  longitude: number;
  month: number;
  day: number;
  hour: number;
  utcOffset: number;
}

export interface AzimuthResult {
  azimuthDeg: number;
  elevationDeg: number;
  declinationDeg: number;
  solarHour: number;
  equationOfTimeMin: number;
  compass: string;
}

const DAYS_BEFORE_MONTH = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

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

export function computeAzimuth(input: AzimuthInput): AzimuthResult {
  const latitude = clamp(toFinite(input.latitude), -90, 90);
  const longitude = toFinite(input.longitude);
  const month = Math.round(clamp(toFinite(input.month), 1, 12));
  const day = Math.round(clamp(toFinite(input.day), 1, 31));
  const hour = toFinite(input.hour);
  const utcOffset = clamp(toFinite(input.utcOffset), -12, 14);

  const dayOfYear = DAYS_BEFORE_MONTH[month - 1] + day;
  const b = toRad((360 / 365) * (dayOfYear - 81));
  const equationOfTimeMin = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);

  const solarHour = hour + equationOfTimeMin / 60 + (longitude - 15 * utcOffset) / 15;
  const hourAngle = toRad(15 * (solarHour - 12));
  const declination = toRad(23.44 * Math.sin(toRad((360 / 365) * (dayOfYear + 284))));
  const phi = toRad(latitude);

  const sinAltitude = Math.sin(phi) * Math.sin(declination) + Math.cos(phi) * Math.cos(declination) * Math.cos(hourAngle);
  const elevationDeg = toDeg(Math.asin(clamp(sinAltitude, -1, 1)));

  const azimuthRaw =
    toDeg(
      Math.atan2(
        Math.sin(hourAngle),
        Math.cos(hourAngle) * Math.sin(phi) - Math.tan(declination) * Math.cos(phi)
      )
    ) + 180;
  const azimuthDeg = ((azimuthRaw % 360) + 360) % 360;

  return {
    azimuthDeg,
    elevationDeg,
    declinationDeg: toDeg(declination),
    solarHour,
    equationOfTimeMin,
    compass: compassLabel(azimuthDeg),
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

const formatSolarTime = (solarHour: number) => {
  const normalised = ((solarHour % 24) + 24) % 24;
  const hours = Math.floor(normalised);
  let minutes = Math.round((normalised - hours) * 60);
  let hour = hours;
  if (minutes === 60) {
    minutes = 0;
    hour = (hour + 1) % 24;
  }
  return `${hour}:${String(minutes).padStart(2, '0')}`;
};

export function AzimuthCalculator() {
  const [latitude, setLatitude] = useState('40');
  const [longitude, setLongitude] = useState('-74');
  const [month, setMonth] = useState('6');
  const [day, setDay] = useState('21');
  const [hour, setHour] = useState('12');
  const [utcOffset, setUtcOffset] = useState('-4');

  const result = computeAzimuth({
    latitude: toNumber(latitude),
    longitude: toNumber(longitude),
    month: toNumber(month),
    day: toNumber(day),
    hour: toNumber(hour),
    utcOffset: toNumber(utcOffset),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Latitude" value={latitude} onChange={setLatitude} min={-90} max={90} step="0.0001" />
              <NumberField label="Longitude" value={longitude} onChange={setLongitude} min={-180} max={180} step="0.0001" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Month" value={month} onChange={setMonth} min={1} max={12} />
              <NumberField label="Day" value={day} onChange={setDay} min={1} max={31} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Local clock time (hours)" value={hour} onChange={setHour} min={0} max={24} step="0.25" />
              <NumberField label="UTC offset (hours)" value={utcOffset} onChange={setUtcOffset} min={-12} max={14} />
            </div>
          </div>
          <Hint>
            Solar position comes from the day of year: declination follows a sine curve peaking near 23.44° in
            June, and the equation of time corrects clock time for the earth's orbital speed.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Solar azimuth"
            value={`${formatMoney(result.azimuthDeg, 1)}°`}
            sub={`${result.compass} • elevation ${formatMoney(result.elevationDeg, 1)}° • solar time ${formatSolarTime(result.solarHour)}`}
          />
          <ResultRows>
            <ResultRow label="Solar elevation" value={`${formatMoney(result.elevationDeg, 1)}°`} />
            <ResultRow label="Compass direction" value={result.compass} />
            <ResultRow label="Local solar time" value={formatSolarTime(result.solarHour)} />
            <ResultRow label="Solar declination" value={`${formatMoney(result.declinationDeg, 1)}°`} />
            <ResultRow label="Equation of time" value={`${formatMoney(result.equationOfTimeMin, 1)} min`} />
          </ResultRows>
          <Hint>
            Azimuth is measured clockwise from true north, so 180° is due south. At solar noon the hour angle is
            zero and the sun sits due south for northern observers.
          </Hint>
        </Panel>
      }
    />
  );
}

export default AzimuthCalculator;
