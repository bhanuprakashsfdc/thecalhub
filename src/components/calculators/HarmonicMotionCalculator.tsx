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

export interface HarmonicMotionInput {
  massKg: number;
  springConstant: number;
  amplitude: number;
}

export function computeHarmonicMotion(input: HarmonicMotionInput) {
  const omega = Math.sqrt(Math.max(0.0001, input.springConstant) / Math.max(0.0001, input.massKg));
  const period = (2 * Math.PI) / omega;
  const frequency = 1 / period;
  const maxVelocity = input.amplitude * omega;
  return { omega, period, frequency, maxVelocity };
}

export function HarmonicMotionCalculator() {
  const [massKg, setMassKg] = useState('2');
  const [springConstant, setSpringConstant] = useState('200');
  const [amplitude, setAmplitude] = useState('0.1');

  const result = computeHarmonicMotion({
    massKg: Number(massKg) || 0,
    springConstant: Number(springConstant) || 0,
    amplitude: Number(amplitude) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Mass (kg)" value={massKg} onChange={setMassKg} min={0} step="0.1" />
            <NumberField label="Spring constant (N/m)" value={springConstant} onChange={setSpringConstant} min={0} step="1" />
            <NumberField label="Amplitude (m)" value={amplitude} onChange={setAmplitude} min={0} step="0.01" />
          </div>
          <Hint>
            Simple harmonic motion: ω = √(k/m), T = 2π/ω, f = 1/T,
            v_max = Aω for a mass-spring oscillator.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Period"
            value={`${formatMoney(result.period)} s`}
            sub="One full oscillation"
          />
          <ResultRows>
            <ResultRow label="Angular frequency (rad/s)" value={formatMoney(result.omega)} />
            <ResultRow label="Frequency (Hz)" value={formatMoney(result.frequency)} />
            <ResultRow label="Maximum velocity (m/s)" value={formatMoney(result.maxVelocity)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HarmonicMotionCalculator;
