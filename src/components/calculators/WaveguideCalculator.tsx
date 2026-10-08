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

export interface WaveguideInput {
  widthCm: number;
  frequencyGhz: number;
}

export function computeWaveguide(input: WaveguideInput) {
  const width = Math.max(0.0001, input.widthCm);
  const frequency = Math.max(0, input.frequencyGhz);
  const cutoff = 15 / width;
  const freeSpace = frequency > 0 ? 30 / frequency : 0;
  const guide = frequency > cutoff ? freeSpace / Math.sqrt(1 - Math.pow(cutoff / frequency, 2)) : 0;
  const operating = frequency > cutoff;

  return { cutoff, freeSpace, guide, operating };
}

export function WaveguideCalculator() {
  const [widthCm, setWidthCm] = useState('2.286');
  const [frequencyGhz, setFrequencyGhz] = useState('10');

  const result = computeWaveguide({
    widthCm: Number(widthCm) || 0,
    frequencyGhz: Number(frequencyGhz) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Waveguide width (cm)" value={widthCm} onChange={setWidthCm} min={0.01} step="0.001" />
            <NumberField label="Operating frequency (GHz)" value={frequencyGhz} onChange={setFrequencyGhz} min={0} step="0.1" />
          </div>
          <Hint>
            A rectangular waveguide only passes signals above its cutoff frequency. For the dominant TE10 mode
            the cutoff is 15 GHz divided by the broad-wall width in centimetres.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Cutoff frequency"
            value={`${formatMoney(result.cutoff)} GHz`}
            sub={result.operating ? 'Frequency is above cutoff' : 'Below cutoff — signal will not propagate'}
          />
          <ResultRows>
            <ResultRow label="Free-space wavelength" value={`${formatMoney(result.freeSpace)} cm`} />
            <ResultRow
              label="Guide wavelength"
              value={result.operating ? `${formatMoney(result.guide)} cm` : 'None'}
            />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WaveguideCalculator;
