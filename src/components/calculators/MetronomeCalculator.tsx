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

export interface MetronomeInput {
  tempo: number;
  beatsPerMeasure: number;
  measures: number;
}

export function computeMetronome(input: MetronomeInput) {
  const tempo = Math.max(1, input.tempo);
  const beats = Math.max(1, Math.floor(input.beatsPerMeasure));
  const measures = Math.max(0, Math.floor(input.measures));

  const secondsPerBeat = 60 / tempo;
  const secondsPerMeasure = secondsPerBeat * beats;
  const totalBeats = beats * measures;
  const totalSeconds = secondsPerBeat * totalBeats;

  return { secondsPerBeat, secondsPerMeasure, totalBeats, totalSeconds };
}

export function MetronomeCalculator() {
  const [tempo, setTempo] = useState('120');
  const [beatsPerMeasure, setBeatsPerMeasure] = useState('4');
  const [measures, setMeasures] = useState('4');

  const result = computeMetronome({
    tempo: Number(tempo) || 0,
    beatsPerMeasure: Number(beatsPerMeasure) || 0,
    measures: Number(measures) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Tempo (BPM)" value={tempo} onChange={setTempo} min={1} step="1" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Beats per measure" value={beatsPerMeasure} onChange={setBeatsPerMeasure} min={1} />
              <NumberField label="Measures" value={measures} onChange={setMeasures} min={0} />
            </div>
          </div>
          <Hint>
            Beat length is 60 ÷ BPM. Multiply by beats per measure and by the number of measures to time a
            practice run exactly.
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
            <ResultRow label="Seconds per beat" value={formatMoney(result.secondsPerBeat)} />
            <ResultRow label="Seconds per measure" value={formatMoney(result.secondsPerMeasure)} />
            <ResultRow label="Total beats" value={formatMoney(result.totalBeats)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default MetronomeCalculator;
