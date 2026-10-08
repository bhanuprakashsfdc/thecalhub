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

export interface PitchInput {
  referencePitch: number;
  semitones: number;
}

export function computePitch(input: PitchInput) {
  const reference = Math.max(0, input.referencePitch);
  const semitones = input.semitones;

  const ratio = Math.pow(2, semitones / 12);
  const frequency = reference * ratio;
  const midi = 69 + semitones;

  return { ratio, frequency, midi, octaves: semitones / 12 };
}

export function PitchCalculator() {
  const [referencePitch, setReferencePitch] = useState('440');
  const [semitones, setSemitones] = useState('0');

  const result = computePitch({
    referencePitch: Number(referencePitch) || 0,
    semitones: Number(semitones) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Reference pitch (Hz)" value={referencePitch} onChange={setReferencePitch} min={0} step="0.01" />
            <NumberField label="Semitones from reference" value={semitones} onChange={setSemitones} step="1" />
          </div>
          <Hint>
            Pitch shifts geometrically: each semitone multiplies the frequency by 2^(1/12) ≈ 1.0595. Concert
            pitch A4 = 440 Hz by convention.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Frequency"
            value={`${formatMoney(result.frequency)} Hz`}
            sub={`${formatMoney(Number(semitones) || 0)} semitones from the reference`}
          />
          <ResultRows>
            <ResultRow label="Ratio to reference" value={formatMoney(result.ratio)} />
            <ResultRow label="MIDI note" value={formatMoney(result.midi)} />
            <ResultRow label="Octaves from reference" value={formatMoney(result.octaves)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PitchCalculator;
