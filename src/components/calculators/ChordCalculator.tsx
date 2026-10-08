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

export interface ChordInput {
  rootFrequency: number;
  chordType: string;
}

const CHORD_RATIOS: Record<string, number[]> = {
  major: [1, 5 / 4, 3 / 2],
  minor: [1, 6 / 5, 3 / 2],
  diminished: [1, 6 / 5, 36 / 25],
  augmented: [1, 5 / 4, 25 / 16],
};

export function computeChord(input: ChordInput) {
  const root = Math.max(0, input.rootFrequency);
  const ratios = CHORD_RATIOS[input.chordType] || CHORD_RATIOS.major;

  const third = root * ratios[1];
  const fifth = root * ratios[2];
  const thirdSemitones = root > 0 ? 12 * Math.log2(ratios[1]) : 0;

  return { third, fifth, thirdSemitones };
}

export function ChordCalculator() {
  const [rootFrequency, setRootFrequency] = useState('261.63');
  const [chordType, setChordType] = useState('major');

  const result = computeChord({
    rootFrequency: Number(rootFrequency) || 0,
    chordType,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Root frequency (Hz)" value={rootFrequency} onChange={setRootFrequency} min={0} step="0.01" />
            <SelectField
              label="Chord type"
              value={chordType}
              onChange={setChordType}
              options={[
                { value: 'major', label: 'Major triad' },
                { value: 'minor', label: 'Minor triad' },
                { value: 'diminished', label: 'Diminished triad' },
                { value: 'augmented', label: 'Augmented triad' },
              ]}
            />
          </div>
          <Hint>
            Triads stack two intervals on the root. The third defines major versus minor, while the fifth stays
            a perfect fifth except in diminished and augmented chords.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Root frequency"
            value={`${formatMoney(Number(rootFrequency) || 0)} Hz`}
            sub={`${chordType} triad`}
          />
          <ResultRows>
            <ResultRow label="Third" value={`${formatMoney(result.third)} Hz`} />
            <ResultRow label="Fifth" value={`${formatMoney(result.fifth)} Hz`} />
            <ResultRow label="Semitones to third" value={formatMoney(result.thirdSemitones)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ChordCalculator;
