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
} from './kit';

export interface LaplaceTransformInput {
  amplitude: number;
  decay: number;
  sReal: number;
  sImag: number;
}

export interface LaplaceTransformResult {
  re: number;
  im: number;
  magnitude: number;
  phaseDeg: number;
  poleReal: number;
  inRoc: boolean;
  atPole: boolean;
}

const guard = (n: number) => (Number.isFinite(n) ? n : 0);

export function computeLaplaceTransform(input: LaplaceTransformInput): LaplaceTransformResult {
  const A = guard(input.amplitude);
  const a = guard(input.decay);
  const sr = guard(input.sReal);
  const si = guard(input.sImag);
  const denRe = sr + a;
  const den = denRe * denRe + si * si;
  const poleReal = -a;
  const inRoc = sr > poleReal;
  if (den < 1e-12) {
    return { re: 0, im: 0, magnitude: 0, phaseDeg: 0, poleReal, inRoc, atPole: true };
  }
  const re = (A * denRe) / den;
  const im = (-A * si) / den;
  const magnitude = Math.hypot(re, im);
  const phaseDeg = (Math.atan2(im, re) * 180) / Math.PI;
  return { re, im, magnitude, phaseDeg, poleReal, inRoc, atPole: false };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

const fmt = (n: number) => n.toFixed(6);

export function LaplaceTransformCalculator() {
  const [amplitude, setAmplitude] = useState('1');
  const [decay, setDecay] = useState('2');
  const [sReal, setSReal] = useState('1');
  const [sImag, setSImag] = useState('0');

  const result = computeLaplaceTransform({
    amplitude: toNumber(amplitude),
    decay: toNumber(decay),
    sReal: toNumber(sReal),
    sImag: toNumber(sImag),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <p className="text-sm text-neutral-400 font-mono">x(t) = A * e^(-a t) * u(t)</p>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Amplitude A" value={amplitude} onChange={setAmplitude} step="0.1" />
              <NumberField label="Decay rate a" value={decay} onChange={setDecay} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="s real part" value={sReal} onChange={setSReal} step="0.1" />
              <NumberField label="s imag part" value={sImag} onChange={setSImag} step="0.1" />
            </div>
          </div>
          <Hint>
            The one-sided Laplace transform of a decaying exponential is X(s) = A / (s + a), with a single
            pole at s = -a and region of convergence Re(s) &gt; -a.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Magnitude |X(s)|"
            value={fmt(result.magnitude)}
            sub={result.atPole ? 's sits exactly on the pole' : `X(s) evaluated at s = ${toNumber(sReal)} + ${toNumber(sImag)}i`}
          />
          <ResultRows>
            <ResultRow label="Real part" value={fmt(result.re)} />
            <ResultRow label="Imaginary part" value={fmt(result.im)} />
            <ResultRow label="Phase (degrees)" value={fmt(result.phaseDeg)} />
            <ResultRow label="Pole (real axis)" value={fmt(result.poleReal)} />
            <ResultRow label="Inside ROC" value={result.inRoc ? 'yes' : 'no'} />
          </ResultRows>
          <Hint>
            The magnitude peaks near the imaginary-axis frequency closest to the pole, and the phase swings
            by 180 degrees as s crosses the pole's real part.
          </Hint>
        </Panel>
      }
    />
  );
}

export default LaplaceTransformCalculator;
