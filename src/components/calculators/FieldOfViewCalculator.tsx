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

export interface FieldOfViewInput {
  focalLength: number;
  sensorSize: number;
  distance: number;
}

export function computeFieldOfView(input: FieldOfViewInput) {
  const focal = Math.max(0.01, input.focalLength);
  const sensor = Math.max(0, input.sensorSize);
  const distance = Math.max(0, input.distance);

  const widthMetres = (sensor * distance) / focal;
  const widthMm = widthMetres * 1000;
  const angle = 2 * Math.atan(sensor / (2 * focal)) * (180 / Math.PI);

  return { widthMetres, widthMm, angle };
}

export function FieldOfViewCalculator() {
  const [focalLength, setFocalLength] = useState('35');
  const [sensorSize, setSensorSize] = useState('36');
  const [distance, setDistance] = useState('10');

  const result = computeFieldOfView({
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
            <NumberField label="Distance to subject (m)" value={distance} onChange={setDistance} min={0} step="0.5" />
          </div>
          <Hint>
            The width in frame scales linearly with distance: width = sensor × distance ÷ focal length. Step
            back twice and you double the scene you capture.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Field of view width"
            value={`${formatMoney(result.widthMetres)} m`}
            sub={`${formatMoney(result.widthMm)} mm across the frame`}
          />
          <ResultRows>
            <ResultRow label="Field of view (mm)" value={`${formatMoney(result.widthMm)} mm`} />
            <ResultRow label="Angle of view" value={`${formatMoney(result.angle)}°`} />
            <ResultRow label="Coverage at half distance" value={`${formatMoney(result.widthMetres / 2)} m`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FieldOfViewCalculator;
