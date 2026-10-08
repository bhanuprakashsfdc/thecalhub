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

export interface TimeSignatureInput {
  beatsPerMeasure: number;
  noteValue: number;
  tempo: number;
}

export function computeTimeSignature(input: TimeSignatureInput) {
  const beats = Math.max(1, input.beatsPerMeasure);
  const noteValue = Math.max(1, input.noteValue);
  const tempo = Math.max(1, input.tempo);

  const noteSeconds = (4 / noteValue) * (60 / tempo);
  const measureSeconds = beats * noteSeconds;
  const measuresPerMinute = measureSeconds > 0 ? 60 / measureSeconds : 0;

  return { noteSeconds, measureSeconds, measuresPerMinute };
}

export function TimeSignatureCalculator() {
  const [beatsPerMeasure, setBeatsPerMeasure] = useState('4');
  const [noteValue, setNoteValue] = useState('4');
  const [tempo, setTempo] = useState('120');

  const result = computeTimeSignature({
    beatsPerMeasure: Number(beatsPerMeasure) || 0,
    noteValue: Number(noteValue) || 0,
    tempo: Number(tempo) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Beats per measure" value={beatsPerMeasure} onChange={setBeatsPerMeasure} min={1} />
              <NumberField label="Note value" value={noteValue} onChange={setNoteValue} min={1} />
            </div>
            <NumberField label="Tempo (BPM)" value={tempo} onChange={setTempo} min={1} step="1" />
          </div>
          <Hint>
            The top number counts beats per bar, the bottom names the note that gets one beat. In 6/8 the beat
            unit is an eighth, so each bar is three quarters of a 4/4 bar at the same BPM.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Seconds per measure"
            value={`${formatMoney(result.measureSeconds)} s`}
            sub={`${beatsPerMeasure || 0}/${noteValue || 0} at ${tempo || 0} BPM`}
          />
          <ResultRows>
            <ResultRow label="Note duration" value={`${formatMoney(result.noteSeconds)} s`} />
            <ResultRow label="Beats per measure" value={formatMoney(Math.max(1, Number(beatsPerMeasure) || 0))} />
            <ResultRow label="Measures per minute" value={formatMoney(result.measuresPerMinute)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TimeSignatureCalculator;
