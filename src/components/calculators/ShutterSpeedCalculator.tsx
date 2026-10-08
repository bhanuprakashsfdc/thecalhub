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

export interface ShutterSpeedInput {
  focalLength: number;
  cropFactor: number;
}

export function computeShutterSpeed(input: ShutterSpeedInput) {
  const focal = Math.max(0, input.focalLength);
  const crop = Math.max(0, input.cropFactor);

  const equivalent = focal * crop;
  const seconds = equivalent > 0 ? 1 / equivalent : 0;
  const reciprocal = Math.max(1, Math.round(equivalent));
  const panning = seconds * 2;

  return { equivalent, seconds, reciprocal, panning, panningReciprocal: Math.max(1, Math.round(1 / (panning || 1))) };
}

export function ShutterSpeedCalculator() {
  const [focalLength, setFocalLength] = useState('50');
  const [cropFactor, setCropFactor] = useState('1.5');

  const result = computeShutterSpeed({
    focalLength: Number(focalLength) || 0,
    cropFactor: Number(cropFactor) || 0,
  });

  const display =
    result.seconds > 0 && result.seconds <= 1 ? `1/${result.reciprocal} s` : `${formatMoney(result.seconds)} s`;

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Focal length (mm)" value={focalLength} onChange={setFocalLength} min={0} step="1" />
            <NumberField label="Crop factor" value={cropFactor} onChange={setCropFactor} min={0} step="0.1" />
          </div>
          <Hint>
            The reciprocal rule keeps handheld shots sharp: shutter speed of at least 1 over the 35 mm-equivalent
            focal length. Stabilisation lets you go about two stops slower.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Minimum shutter speed"
            value={display}
            sub="Handheld, following the reciprocal rule"
          />
          <ResultRows>
            <ResultRow label="35mm equivalent focal length" value={`${formatMoney(result.equivalent)} mm`} />
            <ResultRow label="Shutter time (seconds)" value={formatMoney(result.seconds)} />
            <ResultRow label="Panning shutter" value={`1/${result.panningReciprocal} s`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ShutterSpeedCalculator;
