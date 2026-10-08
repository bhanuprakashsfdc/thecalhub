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

export interface SoundLevelInput {
  levelA: number;
  levelB: number;
}

export function computeSoundLevel(input: SoundLevelInput) {
  const a = input.levelA;
  const b = input.levelB;

  const combined = 10 * Math.log10(Math.pow(10, a / 10) + Math.pow(10, b / 10));
  const powerA = Math.pow(10, a / 10);
  const powerB = Math.pow(10, b / 10);
  const ratio = powerB > 0 ? powerA / powerB : 0;

  return { combined, ratio, difference: Math.abs(a - b) };
}

export function SoundLevelCalculator() {
  const [levelA, setLevelA] = useState('60');
  const [levelB, setLevelB] = useState('70');

  const result = computeSoundLevel({
    levelA: Number(levelA) || 0,
    levelB: Number(levelB) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Source A level (dB)" value={levelA} onChange={setLevelA} step="0.5" />
            <NumberField label="Source B level (dB)" value={levelB} onChange={setLevelB} step="0.5" />
          </div>
          <Hint>
            Decibels add logarithmically, so two equal sources only lift the level by 3 dB. The louder source
            dominates the total.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Combined sound level"
            value={`${formatMoney(result.combined)} dB`}
            sub={`${formatMoney(result.difference)} dB between the two sources`}
          />
          <ResultRows>
            <ResultRow label="Level difference" value={`${formatMoney(result.difference)} dB`} />
            <ResultRow label="Power ratio A to B" value={formatMoney(result.ratio)} />
            <ResultRow label="Louder source" value={`${formatMoney(Math.max(Number(levelA) || 0, Number(levelB) || 0))} dB`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SoundLevelCalculator;
