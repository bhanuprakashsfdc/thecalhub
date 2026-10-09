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

export interface CurrentSpeedInput {
  boatSpeed: number;
  headingDeg: number;
  currentBearingDeg: number;
  currentSpeed: number;
}

export interface CurrentSpeedResult {
  speedOverGround: number;
  courseMadeGood: number;
  alongTrack: number;
  crossTrack: number;
  driftRate: number;
}

const nonNegative = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const normalize = (deg: number) => ((deg % 360) + 360) % 360;

export function computeCurrentSpeed(input: CurrentSpeedInput): CurrentSpeedResult {
  const boatSpeed = nonNegative(input.boatSpeed);
  const currentSpeed = nonNegative(input.currentSpeed);
  const heading = Number.isFinite(input.headingDeg) ? normalize(input.headingDeg) : 0;
  const bearing = Number.isFinite(input.currentBearingDeg) ? normalize(input.currentBearingDeg) : 0;

  const theta = ((bearing - heading) * Math.PI) / 180;
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const alongTrack = boatSpeed + currentSpeed * cos;
  const crossTrack = currentSpeed * sin;
  const speedOverGround = Math.sqrt(alongTrack * alongTrack + crossTrack * crossTrack);
  const courseMadeGood = normalize(heading + (Math.atan2(crossTrack, alongTrack) * 180) / Math.PI);
  const driftRate = Math.abs(crossTrack);

  return { speedOverGround, courseMadeGood, alongTrack, crossTrack, driftRate };
}

const UNIT_FACTORS: Record<string, number> = { kn: 1, ms: 1.943843, kmh: 0.539957 };

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export function CurrentSpeedCalculator() {
  const [unit, setUnit] = useState('kn');
  const [boatSpeed, setBoatSpeed] = useState('10');
  const [heading, setHeading] = useState('90');
  const [currentBearing, setCurrentBearing] = useState('180');
  const [currentSpeed, setCurrentSpeed] = useState('2');

  const factor = UNIT_FACTORS[unit] ?? 1;
  const suffix = unit === 'kn' ? 'kn' : unit === 'ms' ? 'm/s' : 'km/h';

  const result = computeCurrentSpeed({
    boatSpeed: toNumber(boatSpeed) * factor,
    headingDeg: Number(heading) || 0,
    currentBearingDeg: Number(currentBearing) || 0,
    currentSpeed: toNumber(currentSpeed) * factor,
  });

  const bearingWord =
    Math.abs(result.crossTrack) < 1e-9 ? 'no set' : result.crossTrack > 0 ? 'set to starboard' : 'set to port';
  const rawOffset = result.courseMadeGood - (Number(heading) || 0);
  const courseOffset = rawOffset > 180 ? rawOffset - 360 : rawOffset < -180 ? rawOffset + 360 : rawOffset;

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <SelectField
              label="Speed unit"
              value={unit}
              onChange={setUnit}
              options={[
                { value: 'kn', label: 'Knots (kn)' },
                { value: 'ms', label: 'Metres per second (m/s)' },
                { value: 'kmh', label: 'Kilometres per hour (km/h)' },
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Boat speed through water" value={boatSpeed} onChange={setBoatSpeed} min={0} step="0.1" />
              <NumberField label="Heading (° true)" value={heading} onChange={setHeading} step="1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Current bearing (° true)"
                value={currentBearing}
                onChange={setCurrentBearing}
                step="1"
                hint="Direction the current sets toward."
              />
              <NumberField label="Current speed" value={currentSpeed} onChange={setCurrentSpeed} min={0} step="0.1" />
            </div>
          </div>
          <Hint>
            Vectors are added component-wise: along-track = Vb + Vc·cos θ and cross-track = Vc·sin θ, where θ is
            the angle between heading and the direction the current sets toward.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Speed over ground"
            value={`${formatMoney(result.speedOverGround)} ${suffix}`}
            sub={`Course made good ${formatMoney(result.courseMadeGood, 1)}° · ${bearingWord}`}
          />
          <ResultRows>
            <ResultRow label="Along-track component" value={`${formatMoney(result.alongTrack)} ${suffix}`} />
            <ResultRow label="Cross-track (set) component" value={`${formatMoney(result.crossTrack)} ${suffix}`} />
            <ResultRow label="Drift rate" value={`${formatMoney(result.driftRate)} ${suffix}`} />
            <ResultRow label="Course offset from heading" value={`${formatMoney(courseOffset, 1)}°`} />
          </ResultRows>
          <Hint>
            A current straight ahead or astern only changes speed over ground; a beam current pushes the track
            sideways and is corrected by steering a compensating crab angle.
          </Hint>
        </Panel>
      }
    />
  );
}

export default CurrentSpeedCalculator;
