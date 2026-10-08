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

export interface IntervalInput {
  lowerFrequency: number;
  higherFrequency: number;
}

export function computeInterval(input: IntervalInput) {
  const lower = Math.max(0, input.lowerFrequency);
  const higher = Math.max(0, input.higherFrequency);

  const ratio = lower > 0 ? higher / lower : 0;
  const octaves = ratio > 0 ? Math.log2(ratio) : 0;
  const semitones = octaves * 12;
  const cents = octaves * 1200;

  return { ratio, octaves, semitones, cents };
}

export function IntervalCalculator() {
  const [lowerFrequency, setLowerFrequency] = useState('261.63');
  const [higherFrequency, setHigherFrequency] = useState('392.445');

  const result = computeInterval({
    lowerFrequency: Number(lowerFrequency) || 0,
    higherFrequency: Number(higherFrequency) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Lower frequency (Hz)" value={lowerFrequency} onChange={setLowerFrequency} min={0} step="0.01" />
            <NumberField label="Higher frequency (Hz)" value={higherFrequency} onChange={setHigherFrequency} min={0} step="0.01" />
          </div>
          <Hint>
            Musical intervals are logarithmic: 12 semitones per octave, 100 cents per semitone. A perfect fifth
            is 7.02 semitones — not exactly 7.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Interval (semitones)"
            value={formatMoney(result.semitones)}
            sub={`${formatMoney(result.octaves)} octaves apart`}
          />
          <ResultRows>
            <ResultRow label="Frequency ratio" value={formatMoney(result.ratio)} />
            <ResultRow label="Cents" value={formatMoney(result.cents)} />
            <ResultRow label="Octaves" value={formatMoney(result.octaves)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default IntervalCalculator;
