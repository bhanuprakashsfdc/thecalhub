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

export interface BeatDurationInput {
  tempo: number;
}

export function computeBeatDuration(input: BeatDurationInput) {
  const tempo = Math.max(1, input.tempo);

  const seconds = 60 / tempo;
  const milliseconds = seconds * 1000;
  const beatsPerSecond = tempo / 60;
  const fourBeats = seconds * 4;

  return { seconds, milliseconds, beatsPerSecond, fourBeats };
}

export function BeatDurationCalculator() {
  const [tempo, setTempo] = useState('128');

  const result = computeBeatDuration({ tempo: Number(tempo) || 0 });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Tempo (BPM)" value={tempo} onChange={setTempo} min={1} step="1" />
          </div>
          <Hint>
            One beat lasts 60 ÷ BPM seconds. DJs and producers use this to beatmatch: 128 BPM is a 469 ms
            beat, the pulse of most house tracks.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Seconds per beat"
            value={formatMoney(result.seconds)}
            sub={`${formatMoney(result.milliseconds)} milliseconds per beat`}
          />
          <ResultRows>
            <ResultRow label="Milliseconds per beat" value={formatMoney(result.milliseconds)} />
            <ResultRow label="Beats per second" value={formatMoney(result.beatsPerSecond)} />
            <ResultRow label="Four beats" value={`${formatMoney(result.fourBeats)} s`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default BeatDurationCalculator;
