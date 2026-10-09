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

export interface ElevationInput {
  distance: number;
  angleDegrees: number;
  instrumentHeight: number;
}

export function computeElevation(input: ElevationInput) {
  const radians = (input.angleDegrees * Math.PI) / 180;
  const rise = input.distance * Math.tan(radians);
  const elevation = rise + input.instrumentHeight;
  const slope = Math.tan(radians) * 100;
  return { radians, rise, elevation, slope };
}

export function ElevationCalculator() {
  const [distance, setDistance] = useState('100');
  const [angleDegrees, setAngleDegrees] = useState('30');
  const [instrumentHeight, setInstrumentHeight] = useState('1.5');

  const result = computeElevation({
    distance: Number(distance) || 0,
    angleDegrees: Number(angleDegrees) || 0,
    instrumentHeight: Number(instrumentHeight) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Horizontal distance (m)" value={distance} onChange={setDistance} min={0} />
            <NumberField label="Angle of elevation (°)" value={angleDegrees} onChange={setAngleDegrees} step="0.1" />
            <NumberField label="Instrument height (m)" value={instrumentHeight} onChange={setInstrumentHeight} min={0} step="0.1" />
          </div>
          <Hint>
            Trigonometric leveling: elevation = distance × tan(angle) + instrument height. Works
            for small surveys where the Earth's curvature is negligible.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Elevation (m)"
            value={`${formatMoney(result.elevation)} m`}
            sub="Height of the target point"
          />
          <ResultRows>
            <ResultRow label="Vertical rise (m)" value={formatMoney(result.rise)} />
            <ResultRow label="Slope (%)" value={`${formatMoney(result.slope)}%`} />
            <ResultRow label="Angle in radians" value={formatMoney(result.radians)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ElevationCalculator;
