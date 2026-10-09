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

export interface DescentRateInput {
  altitudeToLose: number;
  groundSpeed: number;
  distanceNm: number;
}

export interface DescentRateResult {
  descentRateFpm: number;
  timeMinutes: number;
  descentAngleDeg: number;
  referenceRateFpm: number;
  gradientPercent: number;
}

const NM_IN_FEET = 6076.11549;
const THREE_DEG_RAD = (3 * Math.PI) / 180;

const positive = (value: number) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export function computeDescentRate(input: DescentRateInput): DescentRateResult {
  const altitude = positive(input.altitudeToLose);
  const speed = positive(input.groundSpeed);
  const distance = positive(input.distanceNm);

  const timeMinutes = speed > 0 && distance > 0 ? (distance / speed) * 60 : 0;
  const descentRateFpm = timeMinutes > 0 ? altitude / timeMinutes : 0;
  const horizontalFt = distance * NM_IN_FEET;
  const descentAngleDeg = horizontalFt > 0 ? (Math.atan2(altitude, horizontalFt) * 180) / Math.PI : 0;
  const gradientPercent = horizontalFt > 0 ? (altitude / horizontalFt) * 100 : 0;
  const referenceRateFpm = (speed * NM_IN_FEET * Math.tan(THREE_DEG_RAD)) / 60;

  return { descentRateFpm, timeMinutes, descentAngleDeg, referenceRateFpm, gradientPercent };
}

export function DescentRateCalculator() {
  const [altitude, setAltitude] = useState('10000');
  const [groundSpeed, setGroundSpeed] = useState('250');
  const [distance, setDistance] = useState('40');

  const result = useMemo(
    () =>
      computeDescentRate({
        altitudeToLose: Number(altitude) || 0,
        groundSpeed: Number(groundSpeed) || 0,
        distanceNm: Number(distance) || 0,
      }),
    [altitude, groundSpeed, distance]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Altitude to lose (ft)" value={altitude} onChange={setAltitude} min={0} step="100" />
            <NumberField label="Ground speed (knots)" value={groundSpeed} onChange={setGroundSpeed} min={0} step="5" />
            <NumberField label="Distance to descend (NM)" value={distance} onChange={setDistance} min={0} step="1" />
          </div>
          <Hint>
            Time aloft = distance ÷ ground speed × 60, and the required descent rate is the altitude lost
            divided by that time. The 3° reference rate is ground speed × tan(3°) × 6076 ÷ 60.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Required descent rate"
            value={`${formatMoney(result.descentRateFpm, 0)} ft/min`}
            sub={`${formatMoney(result.timeMinutes, 1)} min from ${Number(altitude) || 0} ft at ${
              Number(groundSpeed) || 0
            } kt`}
          />
          <ResultRows>
            <ResultRow label="Time to descend" value={`${formatMoney(result.timeMinutes, 1)} min`} />
            <ResultRow label="Descent angle" value={`${formatMoney(result.descentAngleDeg)}°`} />
            <ResultRow label="Average gradient" value={`${formatMoney(result.gradientPercent)}%`} />
            <ResultRow label="3° path reference rate" value={`${formatMoney(result.referenceRateFpm, 0)} ft/min`} />
          </ResultRows>
          <Hint>
            Compare your planned vertical speed with the 3° reference: a steeper angle than 3° means a higher
            descent rate than the standard approach profile requires.
          </Hint>
        </Panel>
      }
    />
  );
}

export default DescentRateCalculator;
