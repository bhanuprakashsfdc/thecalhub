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

export interface NoteLengthInput {
  tempo: number;
  beatsPerNote: number;
  notes: number;
}

export function computeNoteLength(input: NoteLengthInput) {
  const tempo = Math.max(1, input.tempo);
  const beats = Math.max(0, input.beatsPerNote);
  const notes = Math.max(0, Math.floor(input.notes));

  const secondsPerNote = beats * (60 / tempo);
  const totalSeconds = secondsPerNote * notes;
  const totalBeats = beats * notes;

  return { secondsPerNote, totalSeconds, totalBeats, milliseconds: secondsPerNote * 1000 };
}

export function NoteLengthCalculator() {
  const [tempo, setTempo] = useState('90');
  const [beatsPerNote, setBeatsPerNote] = useState('2');
  const [notes, setNotes] = useState('4');

  const result = computeNoteLength({
    tempo: Number(tempo) || 0,
    beatsPerNote: Number(beatsPerNote) || 0,
    notes: Number(notes) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Tempo (BPM)" value={tempo} onChange={setTempo} min={1} step="1" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Beats per note" value={beatsPerNote} onChange={setBeatsPerNote} min={0} step="0.5" />
              <NumberField label="Number of notes" value={notes} onChange={setNotes} min={0} />
            </div>
          </div>
          <Hint>
            A whole note takes 4 beats, a half note 2, a quarter 1 and an eighth ½. Enter the beat count of your
            note value and the number of them in the phrase.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Total duration"
            value={`${formatMoney(result.totalSeconds)} s`}
            sub={`${result.totalBeats} beats at ${tempo || 0} BPM`}
          />
          <ResultRows>
            <ResultRow label="Seconds per note" value={`${formatMoney(result.secondsPerNote)} s`} />
            <ResultRow label="Milliseconds per note" value={formatMoney(result.milliseconds)} />
            <ResultRow label="Total beats" value={formatMoney(result.totalBeats)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default NoteLengthCalculator;
