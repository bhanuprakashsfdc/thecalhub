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

const whole = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

const FL_OZ_IN3 = 1.80467;

export interface CaulkInput {
  gapLengthFt: number;
  gapWidthIn: number;
  gapDepthIn: number;
  tubeFlOz: number;
}

export function computeCaulk(input: CaulkInput) {
  const lengthIn = Math.max(0, input.gapLengthFt) * 12;
  const width = Math.max(0, input.gapWidthIn);
  const depth = Math.max(0, input.gapDepthIn);
  const tubeFlOz = Math.max(0.1, input.tubeFlOz);

  const volumeIn3 = lengthIn * width * depth;
  const tubeIn3 = tubeFlOz * FL_OZ_IN3;
  const tubes = Math.ceil(volumeIn3 / tubeIn3);
  const feetPerTube = width * depth > 0 ? tubeIn3 / (width * depth) / 12 : 0;

  return { volumeIn3, tubes, flOzNeeded: volumeIn3 / FL_OZ_IN3, feetPerTube, tubeIn3 };
}

export function CaulkCalculator() {
  const [gapLengthFt, setGapLengthFt] = useState('40');
  const [gapWidthIn, setGapWidthIn] = useState('0.25');
  const [gapDepthIn, setGapDepthIn] = useState('0.25');
  const [tubeFlOz, setTubeFlOz] = useState('10.5');

  const result = computeCaulk({
    gapLengthFt: Number(gapLengthFt) || 0,
    gapWidthIn: Number(gapWidthIn) || 0,
    gapDepthIn: Number(gapDepthIn) || 0,
    tubeFlOz: Number(tubeFlOz) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Gap length (ft)" value={gapLengthFt} onChange={setGapLengthFt} min={0} step="0.5" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Gap width (in)" value={gapWidthIn} onChange={setGapWidthIn} min={0} step="0.0625" />
              <NumberField label="Gap depth (in)" value={gapDepthIn} onChange={setGapDepthIn} min={0} step="0.0625" />
            </div>
            <NumberField
              label="Tube size (fl oz)"
              value={tubeFlOz}
              onChange={setTubeFlOz}
              min={0.1}
              step="0.5"
              hint="A standard acrylic tube is 10.5 fl oz"
            />
          </div>
          <Hint>
            Caulk fills the gap as a simple box: length × width × depth. Round up to whole tubes — an opened
            tube will not keep until the next job.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Tubes required"
            value={whole(result.tubes)}
            sub={`${formatMoney(result.flOzNeeded)} fl oz of caulk`}
          />
          <ResultRows>
            <ResultRow label="Gap volume" value={`${formatMoney(result.volumeIn3)} in³`} />
            <ResultRow label="Coverage per tube" value={`${formatMoney(result.feetPerTube)} ft`} />
            <ResultRow label="Tube volume" value={`${formatMoney(result.tubeIn3)} in³`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CaulkCalculator;
