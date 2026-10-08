import { useState } from 'react';
import {
  CalcGrid,
  Panel,
  PanelEyebrow,
  TextField,
  ResultHero,
  ResultRows,
  ResultRow,
  Hint,
  formatMoney,
} from './kit';

const NOTE_INDEX: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

export function noteToMidi(note: string): number | null {
  const match = /^([A-Ga-g])([#b]?)(-?\d+)$/.exec(note.trim());
  if (!match) return null;
  const index = NOTE_INDEX[match[1].toUpperCase()] + (match[2] === '#' ? 1 : match[2] === 'b' ? -1 : 0);
  return (parseInt(match[3], 10) + 1) * 12 + index;
}

export interface NoteToFrequencyInput {
  note: string;
}

export function computeNoteToFrequency(input: NoteToFrequencyInput) {
  const midi = noteToMidi(input.note);
  if (midi === null) return { midi: 0, frequency: 0, wavelength: 0, centsFromA4: 0 };

  const frequency = 440 * Math.pow(2, (midi - 69) / 12);
  return {
    midi,
    frequency,
    wavelength: frequency > 0 ? 34300 / frequency : 0,
    centsFromA4: (midi - 69) * 100,
  };
}

export function NoteToFrequencyCalculator() {
  const [note, setNote] = useState('A4');

  const result = computeNoteToFrequency({ note });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <TextField label="Note name" value={note} onChange={setNote} placeholder="A4, F#3, Bb2" />
          </div>
          <Hint>
            Enter scientific pitch notation — letter, optional sharp or flat, then octave. Middle C is C4 and
            the tuning reference A4 sits at 440 Hz.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Frequency"
            value={`${formatMoney(result.frequency)} Hz`}
            sub={`Note ${note || '—'} as a MIDI number`}
          />
          <ResultRows>
            <ResultRow label="MIDI note number" value={formatMoney(result.midi)} />
            <ResultRow label="Wavelength" value={`${formatMoney(result.wavelength)} cm`} />
            <ResultRow label="Cents from A4" value={formatMoney(result.centsFromA4)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default NoteToFrequencyCalculator;
