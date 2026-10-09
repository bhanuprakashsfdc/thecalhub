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

export interface SwellInput {
  periodSec: number;
  depthM: number;
  waveHeightM: number;
}

export interface SwellResult {
  wavelength: number;
  phaseSpeed: number;
  groupSpeed: number;
  depthRatio: string;
  steepness: number;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const G = 9.81;

function wavenumber(periodSec: number, depthM: number): number {
  const sigma = (2 * Math.PI) / periodSec;
  const sigmaSq = sigma * sigma;
  let k = depthM > 0 ? sigma / Math.sqrt(G * depthM) : sigmaSq / G;
  for (let i = 0; i < 40; i += 1) {
    const tanh = Math.tanh(k * depthM);
    const sechSq = 1 - tanh * tanh;
    const f = sigmaSq - G * k * tanh;
    const df = -G * tanh - G * k * depthM * sechSq;
    if (df === 0) break;
    const next = k - f / df;
    if (!Number.isFinite(next) || next <= 0) break;
    if (Math.abs(next - k) < 1e-12) {
      k = next;
      break;
    }
    k = next;
  }
  return k;
}

export function computeSwell(input: SwellInput): SwellResult {
  const periodSec = positive(input.periodSec);
  const depthM = positive(input.depthM);
  const waveHeightM = positive(input.waveHeightM);
  if (periodSec === 0 || depthM === 0) {
    return { wavelength: 0, phaseSpeed: 0, groupSpeed: 0, depthRatio: 'shallow', steepness: 0 };
  }

  const k = wavenumber(periodSec, depthM);
  const wavelength = (2 * Math.PI) / k;
  const phaseSpeed = wavelength / periodSec;
  const kd = k * depthM;
  const twoKd = 2 * kd;
  const decay = twoKd > 30 ? 0 : 1 + twoKd / Math.sinh(twoKd);
  const groupSpeed = (phaseSpeed / 2) * decay;
  const ratio = depthM / wavelength;
  const depthRatio = ratio > 0.5 ? 'deep' : ratio > 0.05 ? 'intermediate' : 'shallow';
  const steepness = wavelength > 0 ? waveHeightM / wavelength : 0;

  return { wavelength, phaseSpeed, groupSpeed, depthRatio, steepness };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export function SwellCalculator() {
  const [period, setPeriod] = useState('12');
  const [depth, setDepth] = useState('60');
  const [height, setHeight] = useState('2');

  const result = computeSwell({
    periodSec: toNumber(period),
    depthM: toNumber(depth),
    waveHeightM: toNumber(height),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Swell period T (s)" value={period} onChange={setPeriod} min={0} step="0.5" hint="Time between consecutive crests." />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Water depth (m)" value={depth} onChange={setDepth} min={0} step="1" />
              <NumberField label="Wave height H (m, optional)" value={height} onChange={setHeight} min={0} step="0.1" />
            </div>
          </div>
          <Hint>
            The linear dispersion relation σ² = g·k·tanh(kd) is solved for wavenumber k with Newton iteration,
            then wavelength L = 2π/k and celerity c = L/T follow.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Wavelength" value={`${formatMoney(result.wavelength)} m`} sub={`${result.depthRatio} water · celerity ${formatMoney(result.phaseSpeed)} m/s`} />
          <ResultRows>
            <ResultRow label="Phase speed c" value={`${formatMoney(result.phaseSpeed)} m/s`} />
            <ResultRow label="Group speed cg (energy speed)" value={`${formatMoney(result.groupSpeed)} m/s`} />
            <ResultRow label="Deep-water length 1.56·T²" value={`${formatMoney(1.56 * (Number(period) || 0) ** 2)} m`} />
            <ResultRow label="Wave steepness H/L" value={result.steepness > 0 ? formatMoney(result.steepness, 4) : '—'} />
          </ResultRows>
          <Hint>
            In deep water cg = c/2, so swell energy travels at half the crest speed. Steepness above about
            1/7 means the wave is at the breaking limit.
          </Hint>
        </Panel>
      }
    />
  );
}

export default SwellCalculator;
