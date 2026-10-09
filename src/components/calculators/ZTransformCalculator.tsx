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

export interface ZTransformInput {
  amplitude: number;
  pole: number;
  zReal: number;
  zImag: number;
}

export interface ZTransformResult {
  re: number;
  im: number;
  magnitude: number;
  phaseDeg: number;
  rocRadius: number;
  inRoc: boolean;
  atPole: boolean;
}

const guard = (n: number) => (Number.isFinite(n) ? n : 0);

export function computeZTransform(input: ZTransformInput): ZTransformResult {
  const A = guard(input.amplitude);
  const a = guard(input.pole);
  const xr = guard(input.zReal);
  const xi = guard(input.zImag);
  const rocRadius = Math.abs(a);
  const inRoc = Math.hypot(xr, xi) > rocRadius;
  const denRe = xr - a;
  const den = denRe * denRe + xi * xi;
  if (den < 1e-12) {
    return { re: 0, im: 0, magnitude: 0, phaseDeg: 0, rocRadius, inRoc, atPole: true };
  }
  const re = (A * (xr * denRe + xi * xi)) / den;
  const im = (A * (xi * denRe - xr * xi)) / den;
  const magnitude = Math.hypot(re, im);
  const phaseDeg = (Math.atan2(im, re) * 180) / Math.PI;
  return { re, im, magnitude, phaseDeg, rocRadius, inRoc, atPole: false };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

const fmt = (n: number) => n.toFixed(6);

export function ZTransformCalculator() {
  const [amplitude, setAmplitude] = useState('1');
  const [pole, setPole] = useState('0.5');
  const [zReal, setZReal] = useState('2');
  const [zImag, setZImag] = useState('0');

  const result = computeZTransform({
    amplitude: toNumber(amplitude),
    pole: toNumber(pole),
    zReal: toNumber(zReal),
    zImag: toNumber(zImag),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <p className="text-sm text-neutral-400 font-mono">x[n] = A * a^n * u[n]</p>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Amplitude A" value={amplitude} onChange={setAmplitude} step="0.1" />
              <NumberField label="Pole a" value={pole} onChange={setPole} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="z real part" value={zReal} onChange={setZReal} step="0.1" />
              <NumberField label="z imag part" value={zImag} onChange={setZImag} step="0.1" />
            </div>
          </div>
          <Hint>
            The causal geometric sequence transforms to X(z) = A z / (z - a) with region of convergence
            |z| &gt; |a|. Enter the complex point z to evaluate the transform there.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Magnitude |X(z)|"
            value={fmt(result.magnitude)}
            sub={result.atPole ? 'z sits exactly on the pole' : `X(z) evaluated at z = ${toNumber(zReal)} + ${toNumber(zImag)}i`}
          />
          <ResultRows>
            <ResultRow label="Real part" value={fmt(result.re)} />
            <ResultRow label="Imaginary part" value={fmt(result.im)} />
            <ResultRow label="Phase (degrees)" value={fmt(result.phaseDeg)} />
            <ResultRow label="ROC radius |a|" value={fmt(result.rocRadius)} />
            <ResultRow label="Inside ROC" value={result.inRoc ? 'yes' : 'no'} />
          </ResultRows>
          <Hint>
            The phase is the argument of the complex value X(z); the ROC row confirms whether |z| exceeds
            the pole radius, which is required for the transform to converge.
          </Hint>
        </Panel>
      }
    />
  );
}

export default ZTransformCalculator;
