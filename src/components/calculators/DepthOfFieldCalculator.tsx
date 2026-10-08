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

export interface DepthOfFieldInput {
  focalLength: number;
  aperture: number;
  focusDistance: number;
  circleOfConfusion: number;
}

export function computeDepthOfField(input: DepthOfFieldInput) {
  const focal = Math.max(0, input.focalLength);
  const aperture = Math.max(1, input.aperture);
  const distance = Math.max(0, input.focusDistance);
  const coc = Math.max(0.001, input.circleOfConfusion);

  const f2 = focal * focal;
  const spread = aperture * coc * (distance - focal);

  const near = f2 + spread > 0 ? (distance * f2) / (f2 + spread) : 0;
  const far = f2 - spread > 0 ? (distance * f2) / (f2 - spread) : 0;
  const total = far > near ? far - near : 0;

  return { near, far, total };
}

export function DepthOfFieldCalculator() {
  const [focalLength, setFocalLength] = useState('50');
  const [aperture, setAperture] = useState('8');
  const [focusDistance, setFocusDistance] = useState('5000');
  const [circleOfConfusion, setCircleOfConfusion] = useState('0.03');

  const result = computeDepthOfField({
    focalLength: Number(focalLength) || 0,
    aperture: Number(aperture) || 0,
    focusDistance: Number(focusDistance) || 0,
    circleOfConfusion: Number(circleOfConfusion) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Focal length (mm)" value={focalLength} onChange={setFocalLength} min={0} step="1" />
              <NumberField label="Aperture (f/)" value={aperture} onChange={setAperture} min={1} step="0.1" />
            </div>
            <NumberField label="Focus distance (mm)" value={focusDistance} onChange={setFocusDistance} min={1} step="100" />
            <NumberField
              label="Circle of confusion (mm)"
              value={circleOfConfusion}
              onChange={setCircleOfConfusion}
              min={0.001}
              step="0.001"
            />
          </div>
          <Hint>
            Depth of field is the zone between the near and far limits of acceptable sharpness. Wider apertures
            and longer lenses both shrink it quickly.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total depth of field"
            value={`${formatMoney(result.total / 1000)} m`}
            sub={`From ${formatMoney(result.near / 1000)} m to ${formatMoney(result.far / 1000)} m`}
          />
          <ResultRows>
            <ResultRow label="Near limit" value={`${formatMoney(result.near / 1000)} m`} />
            <ResultRow label="Far limit" value={`${formatMoney(result.far / 1000)} m`} />
            <ResultRow label="Focus distance" value={`${formatMoney((Number(focusDistance) || 0) / 1000)} m`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DepthOfFieldCalculator;
