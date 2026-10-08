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

export interface DbInput {
  inputLevel: number;
  gain: number;
}

export function computeDb(input: DbInput) {
  const level = input.inputLevel;
  const gain = input.gain;

  const output = level + gain;
  const amplitude = Math.pow(10, output / 20);
  const power = Math.pow(10, output / 10);

  return { output, amplitude, power };
}

export function DbCalculator() {
  const [inputLevel, setInputLevel] = useState('-6');
  const [gain, setGain] = useState('10');

  const result = computeDb({
    inputLevel: Number(inputLevel) || 0,
    gain: Number(gain) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Input level (dB)" value={inputLevel} onChange={setInputLevel} step="0.5" />
            <NumberField label="Gain (dB)" value={gain} onChange={setGain} step="0.5" />
          </div>
          <Hint>
            Decibels are logarithmic: +6 dB doubles voltage, +10 dB multiplies power by ten and −6 dB halves the
            signal. Levels and gains simply add in dB.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Output level"
            value={`${formatMoney(result.output)} dB`}
            sub={`${formatMoney(result.amplitude)}× the reference amplitude`}
          />
          <ResultRows>
            <ResultRow label="Amplitude ratio" value={formatMoney(result.amplitude)} />
            <ResultRow label="Power ratio" value={formatMoney(result.power)} />
            <ResultRow label="Gain applied" value={`${formatMoney(Number(gain) || 0)} dB`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DbCalculator;
