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

export interface AngleOfViewInput {
  focalLength: number;
  sensorSize: number;
  distance: number;
}

export function computeAngleOfView(input: AngleOfViewInput) {
  const focal = Math.max(0.01, input.focalLength);
  const sensor = Math.max(0, input.sensorSize);
  const distance = Math.max(0, input.distance);

  const angle = 2 * Math.atan(sensor / (2 * focal)) * (180 / Math.PI);
  const coverage = (sensor * distance * 1000) / focal;

  return { angle, halfAngle: angle / 2, coverage };
}

export function AngleOfViewCalculator() {
  const [focalLength, setFocalLength] = useState('50');
  const [sensorSize, setSensorSize] = useState('36');
  const [distance, setDistance] = useState('5');

  const result = computeAngleOfView({
    focalLength: Number(focalLength) || 0,
    sensorSize: Number(sensorSize) || 0,
    distance: Number(distance) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Focal length (mm)" value={focalLength} onChange={setFocalLength} min={0.01} step="1" />
            <NumberField label="Sensor size (mm)" value={sensorSize} onChange={setSensorSize} min={0} step="0.1" />
            <NumberField label="Subject distance (m)" value={distance} onChange={setDistance} min={0} step="0.5" />
          </div>
          <Hint>
            Angle of view = 2 × arctan(sensor ÷ (2 × focal)). A 50 mm lens on 36 mm full frame covers about 40°
            horizontally.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Angle of view"
            value={`${formatMoney(result.angle)}°`}
            sub={`${formatMoney(result.halfAngle)}° on either side of the axis`}
          />
          <ResultRows>
            <ResultRow label="Half angle" value={`${formatMoney(result.halfAngle)}°`} />
            <ResultRow label="Coverage at subject distance" value={`${formatMoney(result.coverage)} mm`} />
            <ResultRow label="Focal length used" value={`${formatMoney(Number(focalLength) || 0)} mm`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AngleOfViewCalculator;
