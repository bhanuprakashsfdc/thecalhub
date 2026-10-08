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

export interface StarBrightnessInput {
  apparentMagnitude: number;
  absoluteMagnitude: number;
}

export function computeStarBrightness(input: StarBrightnessInput) {
  const apparent = input.apparentMagnitude;
  const absolute = input.absoluteMagnitude;

  const difference = apparent - absolute;
  const distanceParsecs = Math.pow(10, (difference + 5) / 5);
  const distanceLightYears = distanceParsecs * 3.261564;
  const brightnessRatio = Math.pow(10, 0.4 * difference);

  return { difference, distanceParsecs, distanceLightYears, brightnessRatio };
}

export function StarBrightnessCalculator() {
  const [apparentMagnitude, setApparentMagnitude] = useState('6');
  const [absoluteMagnitude, setAbsoluteMagnitude] = useState('4.8');

  const result = computeStarBrightness({
    apparentMagnitude: Number(apparentMagnitude) || 0,
    absoluteMagnitude: Number(absoluteMagnitude) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Apparent magnitude" value={apparentMagnitude} onChange={setApparentMagnitude} step="0.1" />
            <NumberField label="Absolute magnitude" value={absoluteMagnitude} onChange={setAbsoluteMagnitude} step="0.1" />
          </div>
          <Hint>
            Distance modulus: d = 10^((m − M + 5) ÷ 5). The gap between how bright a star looks and how bright
            it would be at 10 parsecs reveals how far away it is.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Distance"
            value={`${formatMoney(result.distanceParsecs)} pc`}
            sub={`${formatMoney(result.distanceLightYears)} light years`}
          />
          <ResultRows>
            <ResultRow label="Distance in light years" value={formatMoney(result.distanceLightYears)} />
            <ResultRow label="Brightness ratio" value={formatMoney(result.brightnessRatio)} />
            <ResultRow label="Magnitude difference" value={formatMoney(result.difference)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default StarBrightnessCalculator;
