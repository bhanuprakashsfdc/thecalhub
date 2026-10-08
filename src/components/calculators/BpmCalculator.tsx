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

export interface BpmInput {
  duration: number;
  beats: number;
}

export function computeBpm(input: BpmInput) {
  const duration = Math.max(0, input.duration);
  const beats = Math.max(0, input.beats);

  const bpm = duration > 0 ? (beats * 60) / duration : 0;
  const secondsPerBeat = beats > 0 ? duration / beats : 0;
  const beatsPerSecond = duration > 0 ? beats / duration : 0;

  return { bpm, secondsPerBeat, beatsPerSecond, eightBeats: bpm > 0 ? (8 * 60) / bpm : 0 };
}

export function BpmCalculator() {
  const [duration, setDuration] = useState('18.75');
  const [beats, setBeats] = useState('40');

  const result = computeBpm({
    duration: Number(duration) || 0,
    beats: Number(beats) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Duration (seconds)" value={duration} onChange={setDuration} min={0} step="0.25" />
            <NumberField label="Beats counted" value={beats} onChange={setBeats} min={0} step="1" />
          </div>
          <Hint>
            Tap or count beats over a known time span, then divide: BPM = beats × 60 ÷ seconds. Counting 40
            beats in 18.75 seconds gives a steady 128 BPM.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Tempo"
            value={`${formatMoney(result.bpm)} BPM`}
            sub={`${formatMoney(result.beatsPerSecond)} beats per second`}
          />
          <ResultRows>
            <ResultRow label="Seconds per beat" value={formatMoney(result.secondsPerBeat)} />
            <ResultRow label="Beats per second" value={formatMoney(result.beatsPerSecond)} />
            <ResultRow label="Duration of 8 beats" value={`${formatMoney(result.eightBeats)} s`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default BpmCalculator;
