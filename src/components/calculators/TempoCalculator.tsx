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

export interface TempoInput {
  originalTempo: number;
  changePercent: number;
  duration: number;
}

export function computeTempo(input: TempoInput) {
  const original = Math.max(0, input.originalTempo);
  const change = input.changePercent;
  const duration = Math.max(0, input.duration);

  const newTempo = original * (1 + change / 100);
  const ratio = original > 0 ? newTempo / original : 0;
  const newDuration = newTempo > 0 ? (duration * original) / newTempo : 0;

  return { newTempo, ratio, newDuration, beatsPerSecond: newTempo / 60 };
}

export function TempoCalculator() {
  const [originalTempo, setOriginalTempo] = useState('120');
  const [changePercent, setChangePercent] = useState('10');
  const [duration, setDuration] = useState('180');

  const result = computeTempo({
    originalTempo: Number(originalTempo) || 0,
    changePercent: Number(changePercent) || 0,
    duration: Number(duration) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Original tempo (BPM)" value={originalTempo} onChange={setOriginalTempo} min={0} step="1" />
            <NumberField label="Tempo change (%)" value={changePercent} onChange={setChangePercent} step="1" />
            <NumberField label="Original duration (seconds)" value={duration} onChange={setDuration} min={0} step="1" />
          </div>
          <Hint>
            Speeding up by 10% shortens a track by about 9%. The duration scales by original ÷ new tempo, so
            pitch-shifting playback follows the same ratio.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="New tempo"
            value={`${formatMoney(result.newTempo)} BPM`}
            sub={`${formatMoney(result.ratio)}× the original speed`}
          />
          <ResultRows>
            <ResultRow label="New duration" value={`${formatMoney(result.newDuration)} s`} />
            <ResultRow label="Speed ratio" value={formatMoney(result.ratio)} />
            <ResultRow label="Beats per second" value={formatMoney(result.beatsPerSecond)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default TempoCalculator;
