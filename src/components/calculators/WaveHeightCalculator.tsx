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

export interface WaveHeightInput {
  windSpeedMs: number;
  fetchM: number;
}

export interface WaveHeightResult {
  significantHeight: number;
  maxHeight: number;
  peakPeriod: number;
  wavelength: number;
  steepness: number;
  fullyDeveloped: boolean;
}

const positive = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
const G = 9.81;

export function computeWaveHeight(input: WaveHeightInput): WaveHeightResult {
  const u = positive(input.windSpeedMs);
  const fetch = positive(input.fetchM);
  if (u === 0 || fetch === 0) {
    return { significantHeight: 0, maxHeight: 0, peakPeriod: 0, wavelength: 0, steepness: 0, fullyDeveloped: false };
  }

  const chi = (G * fetch) / (u * u);
  const hArg = Math.tanh(0.53 * chi ** 0.75);
  const hm0 = ((u * u) / G) * 0.283 * hArg * Math.tanh((0.00565 * chi ** 0.5) / hArg);
  const tArg = Math.tanh(0.833 * chi ** 0.375);
  const tp = (u / G) * 7.54 * tArg * Math.tanh((0.0379 * chi ** (1 / 3)) / tArg);
  const fdCap = 0.283 * ((u * u) / G);
  const fdPeriodCap = 7.54 * (u / G);
  const significantHeight = Math.min(hm0, fdCap);
  const peakPeriod = Math.min(tp, fdPeriodCap);
  const maxHeight = 1.86 * significantHeight;
  const wavelength = (G * peakPeriod * peakPeriod) / (2 * Math.PI);
  const steepness = wavelength > 0 ? significantHeight / wavelength : 0;

  return {
    significantHeight,
    maxHeight,
    peakPeriod,
    wavelength,
    steepness,
    fullyDeveloped: hm0 >= fdCap * 0.999,
  };
}

const toNumber = (raw: string) => {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export function WaveHeightCalculator() {
  const [wind, setWind] = useState('15');
  const [fetch, setFetch] = useState('50000');

  const result = computeWaveHeight({
    windSpeedMs: toNumber(wind),
    fetchM: toNumber(fetch),
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField
              label="Wind speed at 10 m (m/s)"
              value={wind}
              onChange={setWind}
              min={0}
              step="0.5"
              hint="10 m/s ≈ 19.4 kn ≈ 36 km/h."
            />
            <NumberField
              label="Fetch length (m)"
              value={fetch}
              onChange={setFetch}
              min={0}
              step="1000"
              hint="Uninterrupted distance the wind blows over water."
            />
          </div>
          <Hint>
            Fetch-limited growth follows the SPM (1984) deep-water curves: dimensionless fetch χ = gF/U² drives
            both wave height and peak period until the fully-developed cap is reached.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Significant wave height Hs"
            value={`${formatMoney(result.significantHeight)} m`}
            sub={result.fullyDeveloped ? 'Fully developed sea for this wind' : 'Fetch-limited sea state'}
          />
          <ResultRows>
            <ResultRow label="Maximum wave height" value={`${formatMoney(result.maxHeight)} m`} />
            <ResultRow label="Peak period Tp" value={`${formatMoney(result.peakPeriod)} s`} />
            <ResultRow label="Wavelength at Tp" value={`${formatMoney(result.wavelength)} m`} />
            <ResultRow label="Steepness Hs/L" value={result.steepness > 0 ? formatMoney(result.steepness, 4) : '—'} />
          </ResultRows>
          <Hint>
            Hs is the average height of the highest one-third of waves; individual crests average about 1.86×Hs
            and can reach roughly 2×Hs. Assumes the wind blew long enough for the given fetch.
          </Hint>
        </Panel>
      }
    />
  );
}

export default WaveHeightCalculator;
