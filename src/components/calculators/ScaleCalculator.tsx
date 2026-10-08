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
} from './kit';

export interface ScaleInput {
  rootFrequency: number;
  scale: string;
}

const SCALE_RATIOS: Record<string, number[]> = {
  major: [1, 9 / 8, 5 / 4, 4 / 3, 3 / 2, 5 / 3, 15 / 8, 2],
  minor: [1, 9 / 8, 6 / 5, 4 / 3, 3 / 2, 8 / 5, 9 / 5, 2],
  chromatic: Array.from({ length: 8 }, (_, i) => Math.pow(2, i / 12)),
};

export function computeScale(input: ScaleInput) {
  const root = Math.max(0, input.rootFrequency);
  const ratios = SCALE_RATIOS[input.scale] || SCALE_RATIOS.major;

  return {
    tonic: root,
    third: root * ratios[2],
    fifth: root * ratios[4],
    octave: root * ratios[7],
  };
}

export function ScaleCalculator() {
  const [rootFrequency, setRootFrequency] = useState('261.63');
  const [scale, setScale] = useState('major');

  const result = computeScale({
    rootFrequency: Number(rootFrequency) || 0,
    scale,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Root frequency (Hz)" value={rootFrequency} onChange={setRootFrequency} min={0} step="0.01" />
            <SelectField
              label="Scale type"
              value={scale}
              onChange={setScale}
              options={[
                { value: 'major', label: 'Major' },
                { value: 'minor', label: 'Natural minor' },
                { value: 'chromatic', label: 'Chromatic' },
              ]}
            />
          </div>
          <Hint>
            Scale degrees are frequency ratios stacked on the root: a major third is 5:4, a perfect fifth is
            3:2 and the octave doubles the frequency.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Tonic frequency" value={`${formatMoney(result.tonic)} Hz`} sub={`Scale root at ${scale}`} />
          <ResultRows>
            <ResultRow label="Third degree" value={`${formatMoney(result.third)} Hz`} />
            <ResultRow label="Fifth degree" value={`${formatMoney(result.fifth)} Hz`} />
            <ResultRow label="Octave" value={`${formatMoney(result.octave)} Hz`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ScaleCalculator;
