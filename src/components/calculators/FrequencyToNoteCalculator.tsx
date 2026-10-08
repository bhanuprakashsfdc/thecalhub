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

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function frequencyToNote(frequency: number) {
  if (!(frequency > 0)) return { name: '—', midi: 0, exact: 0, cents: 0 };

  const midiExact = 69 + 12 * Math.log2(frequency / 440);
  const midi = Math.round(midiExact);
  const pc = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  const exact = 440 * Math.pow(2, (midi - 69) / 12);

  return {
    name: `${NOTE_NAMES[pc]}${octave}`,
    midi,
    exact,
    cents: (midiExact - midi) * 100,
  };
}

export interface FrequencyToNoteInput {
  frequency: number;
}

export function computeFrequencyToNote(input: FrequencyToNoteInput) {
  return frequencyToNote(Math.max(0, input.frequency));
}

export function FrequencyToNoteCalculator() {
  const [frequency, setFrequency] = useState('440');

  const result = computeFrequencyToNote({ frequency: Number(frequency) || 0 });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Frequency (Hz)" value={frequency} onChange={setFrequency} min={0} step="0.01" />
          </div>
          <Hint>
            The nearest equal-tempered note is found from 69 + 12·log₂(f ÷ 440). The cents value shows how far
            the pitch sits from true concert pitch.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Nearest note"
            value={result.name}
            sub={`${formatMoney(Number(frequency) || 0)} Hz measured`}
          />
          <ResultRows>
            <ResultRow label="Exact note frequency" value={`${formatMoney(result.exact)} Hz`} />
            <ResultRow label="Cents off" value={formatMoney(result.cents)} />
            <ResultRow label="MIDI note" value={formatMoney(result.midi)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FrequencyToNoteCalculator;
