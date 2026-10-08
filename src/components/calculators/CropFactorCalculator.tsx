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

export interface CropFactorInput {
  sensorWidth: number;
  focalLength: number;
}

export function computeCropFactor(input: CropFactorInput) {
  const sensor = Math.max(1, input.sensorWidth);
  const focal = Math.max(0, input.focalLength);

  const factor = 36 / sensor;
  const equivalent = focal * factor;
  const stopsLost = factor > 0 ? 2 * Math.log2(factor) : 0;

  return { factor, equivalent, stopsLost };
}

export function CropFactorCalculator() {
  const [sensorWidth, setSensorWidth] = useState('23.5');
  const [focalLength, setFocalLength] = useState('50');

  const result = computeCropFactor({
    sensorWidth: Number(sensorWidth) || 0,
    focalLength: Number(focalLength) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Sensor width (mm)" value={sensorWidth} onChange={setSensorWidth} min={1} step="0.1" />
            <NumberField label="Focal length (mm)" value={focalLength} onChange={setFocalLength} min={0} step="1" />
          </div>
          <Hint>
            Crop factor compares your sensor width with 36 mm full frame. Multiply the focal length by it to
            get the 35 mm-equivalent field of view.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Crop factor"
            value={`${formatMoney(result.factor)}×`}
            sub="Relative to 36 mm full-frame width"
          />
          <ResultRows>
            <ResultRow label="35mm equivalent focal length" value={`${formatMoney(result.equivalent)} mm`} />
            <ResultRow label="Field-of-view stops lost" value={formatMoney(result.stopsLost)} />
            <ResultRow label="Effective reach multiplier" value={`${formatMoney(result.factor)}×`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CropFactorCalculator;
