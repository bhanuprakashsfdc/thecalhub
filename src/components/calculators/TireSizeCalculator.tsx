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

export interface TireSizeInput {
  widthMm: number;
  aspectRatio: number;
  rimDiameterIn: number;
}

export function computeTireSize(input: TireSizeInput) {
  const sidewallMm = input.widthMm * (input.aspectRatio / 100);
  const diameterMm = input.rimDiameterIn * 25.4 + 2 * sidewallMm;
  const diameterIn = diameterMm / 25.4;
  const circumferenceIn = Math.PI * diameterIn;
  const revolutionsPerKm = 1e6 / (Math.PI * diameterMm);
  return { sidewallMm, diameterMm, diameterIn, circumferenceIn, revolutionsPerKm };
}

export function TireSizeCalculator() {
  const [widthMm, setWidthMm] = useState('205');
  const [aspectRatio, setAspectRatio] = useState('55');
  const [rimDiameterIn, setRimDiameterIn] = useState('16');

  const result = computeTireSize({
    widthMm: Number(widthMm) || 0,
    aspectRatio: Number(aspectRatio) || 0,
    rimDiameterIn: Number(rimDiameterIn) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Tire width (mm)" value={widthMm} onChange={setWidthMm} min={0} step="1" />
            <NumberField label="Aspect ratio (%)" value={aspectRatio} onChange={setAspectRatio} min={0} max={100} step="1" />
            <NumberField label="Rim diameter (in)" value={rimDiameterIn} onChange={setRimDiameterIn} min={0} step="0.5" />
          </div>
          <Hint>
            Parses sizes like 205/55R16: sidewall = width × aspect
            ratio; overall diameter = rim + two sidewalls.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Overall diameter"
            value={`${formatMoney(result.diameterIn)} in`}
            sub={`${formatMoney(result.diameterMm)} mm`}
          />
          <ResultRows>
            <ResultRow label="Sidewall height (mm)" value={formatMoney(result.sidewallMm)} />
            <ResultRow label="Circumference (in)" value={formatMoney(result.circumferenceIn)} />
            <ResultRow label="Revolutions per km" value={formatMoney(result.revolutionsPerKm)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TireSizeCalculator;
