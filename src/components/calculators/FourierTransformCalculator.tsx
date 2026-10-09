import { useState, useMemo } from 'react';
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

export interface FourierTransformInput {
  amplitude: number;
  frequency: number;
  phase: number;
  samples: number;
}

export function computeFourierTransform(input: FourierTransformInput) {
  const omega = 2 * Math.PI * input.frequency;
  const period = input.frequency > 0 ? 1 / input.frequency : 0;
  const peakValue = input.amplitude;
  const rms = input.amplitude / Math.sqrt(2);
  const peakToPeak = input.amplitude * 2;
  return { omega, period, peakValue, rms, peakToPeak };
}

export function FourierTransformCalculator() {
  const [amplitude, setAmplitude] = useState('5');
  const [frequency, setFrequency] = useState('2');
  const [phase, setPhase] = useState('0');
  const [samples, setSamples] = useState('64');

  const result = useMemo(
    () =>
      computeFourierTransform({
        amplitude: Number(amplitude) || 0,
        frequency: Number(frequency) || 0,
        phase: Number(phase) || 0,
        samples: Number(samples) || 0,
      }),
    [amplitude, frequency, phase, samples]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Amplitude" value={amplitude} onChange={setAmplitude} min={0} step="0.1" />
            <NumberField label="Frequency (Hz)" value={frequency} onChange={setFrequency} min={0} step="0.1" />
            <NumberField label="Phase (rad)" value={phase} onChange={setPhase} step="0.1" />
            <NumberField label="Samples" value={samples} onChange={setSamples} min={1} step="1" />
          </div>
          <Hint>
            A real sinusoid x(t) = A sin(2πft + φ) has a single spectral line at frequency f with
            amplitude A. RMS value is A/√2 and peak-to-peak is 2A.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="RMS amplitude"
            value={`${formatMoney(result.rms)}`}
            sub={`Peak ${formatMoney(result.peakValue)}`}
          />
          <ResultRows>
            <ResultRow label="Angular frequency" value={`${formatMoney(result.omega)} rad/s`} />
            <ResultRow label="Period" value={`${formatMoney(result.period)} s`} />
            <ResultRow label="Peak-to-peak" value={formatMoney(result.peakToPeak)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default FourierTransformCalculator;