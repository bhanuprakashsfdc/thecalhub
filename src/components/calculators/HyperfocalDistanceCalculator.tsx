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

export interface HyperfocalInput {
  focalLength: number;
  aperture: number;
  circleOfConfusion: number;
}

export function computeHyperfocal(input: HyperfocalInput) {
  const focal = Math.max(0, input.focalLength);
  const aperture = Math.max(1, input.aperture);
  const coc = Math.max(0.001, input.circleOfConfusion);

  const hyperfocalMm = focal > 0 ? (focal * focal) / (aperture * coc) + focal : 0;
  const metres = hyperfocalMm / 1000;

  return { hyperfocalMm, metres, nearLimit: metres / 2 };
}

export function HyperfocalDistanceCalculator() {
  const [focalLength, setFocalLength] = useState('50');
  const [aperture, setAperture] = useState('8');
  const [circleOfConfusion, setCircleOfConfusion] = useState('0.03');

  const result = computeHyperfocal({
    focalLength: Number(focalLength) || 0,
    aperture: Number(aperture) || 0,
    circleOfConfusion: Number(circleOfConfusion) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Focal length (mm)" value={focalLength} onChange={setFocalLength} min={0} step="1" />
            <NumberField label="Aperture (f/)" value={aperture} onChange={setAperture} min={1} step="0.1" />
            <NumberField
              label="Circle of confusion (mm)"
              value={circleOfConfusion}
              onChange={setCircleOfConfusion}
              min={0.001}
              step="0.001"
              hint="0.03 mm is the full-frame standard"
            />
          </div>
          <Hint>
            Focus at the hyperfocal distance and everything from half that distance to infinity stays sharp.
            Stopping down (smaller aperture) pulls the hyperfocal point closer.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Hyperfocal distance"
            value={`${formatMoney(result.metres)} m`}
            sub="Focus here for maximum depth of field"
          />
          <ResultRows>
            <ResultRow label="Near sharp limit" value={`${formatMoney(result.nearLimit)} m`} />
            <ResultRow label="Hyperfocal (mm)" value={`${formatMoney(result.hyperfocalMm)} mm`} />
            <ResultRow label="Aperture used" value={`f/${formatMoney(Number(aperture) || 0)}`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HyperfocalDistanceCalculator;
