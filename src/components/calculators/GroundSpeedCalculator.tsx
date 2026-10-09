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

export interface GroundSpeedInput {
  tas: number;
  unit: 'kn' | 'ms';
  headingDeg: number;
  windFromDeg: number;
  windSpeed: number;
  distance: number;
}

export interface GroundSpeedResult {
  groundSpeed: number;
  headwind: number;
  crosswind: number;
  driftDeg: number;
  courseMadeGood: number;
  eteHours: number;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const finite = (n: number) => (Number.isFinite(n) ? n : 0);
const KN_PER_MS = 1.943843;
const normalize = (deg: number) => ((deg % 360) + 360) % 360;

export function computeGroundSpeed(input: GroundSpeedInput): GroundSpeedResult {
  const tas = input.unit === 'ms' ? positive(input.tas) * KN_PER_MS : positive(input.tas);
  const wind = input.unit === 'ms' ? positive(input.windSpeed) * KN_PER_MS : positive(input.windSpeed);
  const heading = finite(input.headingDeg);
  const windFrom = finite(input.windFromDeg);
  const distance = positive(input.distance);

  const theta = ((windFrom - heading) * Math.PI) / 180;
  const headwind = wind * Math.cos(theta);
  const crosswind = -wind * Math.sin(theta);
  const along = tas - headwind;
  const right = crosswind;
  const groundSpeed = Math.sqrt(along * along + right * right);
  const driftDeg = (Math.atan2(right, along) * 180) / Math.PI;
  const courseMadeGood = normalize(heading + driftDeg);
  const eteHours = groundSpeed > 0 ? distance / groundSpeed : 0;

  return { groundSpeed, headwind, crosswind, driftDeg, courseMadeGood, eteHours };
}

export function GroundSpeedCalculator() {
  const [unit, setUnit] = useState<'kn' | 'ms'>('kn');
  const [tas, setTas] = useState('200');
  const [heading, setHeading] = useState('90');
  const [windFrom, setWindFrom] = useState('120');
  const [windSpeed, setWindSpeed] = useState('30');
  const [distance, setDistance] = useState('600');

  const result = computeGroundSpeed({
    tas: Number(tas) || 0,
    unit,
    headingDeg: Number(heading) || 0,
    windFromDeg: Number(windFrom) || 0,
    windSpeed: Number(windSpeed) || 0,
    distance: Number(distance) || 0,
  });

  const speedSuffix = unit === 'kn' ? 'kn' : 'm/s';
  const distSuffix = unit === 'kn' ? 'nm' : 'km';
  const eteH = Math.floor(result.eteHours);
  const eteM = Math.round((result.eteHours - eteH) * 60);

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField
              label="Unit system"
              value={unit}
              onChange={(v) => setUnit(v === 'ms' ? 'ms' : 'kn')}
              options={[
                { value: 'kn', label: 'Knots / nautical miles' },
                { value: 'ms', label: 'm/s / kilometres' },
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="True airspeed (TAS)" value={tas} onChange={setTas} min={0} step="5" />
              <NumberField label="True heading (°)" value={heading} onChange={setHeading} step="1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Wind from (° true)"
                value={windFrom}
                onChange={setWindFrom}
                step="1"
                hint="Meteorological convention: the direction the wind blows from."
              />
              <NumberField label="Wind speed" value={windSpeed} onChange={setWindSpeed} min={0} step="1" />
            </div>
            <NumberField label={`Trip distance (${distSuffix})`} value={distance} onChange={setDistance} min={0} step="50" />
          </div>
          <Hint>
            Ground speed resolves the wind triangle: GS = |TAS·û(h) − WS·û(w)|, with headwind = WS·cos(w − h)
            and right crosswind = −WS·sin(w − h).
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Ground speed"
            value={`${formatMoney(result.groundSpeed)} ${speedSuffix}`}
            sub={`Drift ${formatMoney(result.driftDeg, 1)}° · CMG ${formatMoney(result.courseMadeGood, 1)}°`}
          />
          <ResultRows>
            <ResultRow
              label="Headwind (+) / tailwind (−)"
              value={`${result.headwind >= 0 ? '+' : ''}${formatMoney(result.headwind)} ${speedSuffix}`}
            />
            <ResultRow
              label="Right (+) / left (−) crosswind"
              value={`${result.crosswind >= 0 ? '+' : ''}${formatMoney(result.crosswind)} ${speedSuffix}`}
            />
            <ResultRow label="Course made good" value={`${formatMoney(result.courseMadeGood, 1)}°`} />
            <ResultRow label="Estimated time enroute" value={result.eteHours > 0 ? `${eteH}h ${eteM}m` : '—'} />
          </ResultRows>
          <Hint>
            Wind on the nose cuts ground speed one-for-one; quartering winds produce both a speed change and
            a drift angle that must be crabbed out to stay on course.
          </Hint>
        </Panel>
      }
    />
  );
}

export default GroundSpeedCalculator;
