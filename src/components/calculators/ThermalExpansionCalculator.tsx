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

export interface ThermalExpansionInput {
  length: number;
  alpha: number;
  deltaT: number;
  volume: number;
}

export function computeThermalExpansion(input: ThermalExpansionInput) {
  const deltaL = input.length * input.alpha * input.deltaT;
  const beta = 3 * input.alpha;
  const deltaV = input.volume * beta * input.deltaT;
  return { deltaL, deltaLmm: deltaL * 1000, beta, deltaV, deltaVLitres: deltaV * 1000 };
}

export function ThermalExpansionCalculator() {
  const [length, setLength] = useState('1');
  const [alpha, setAlpha] = useState('0.000012');
  const [deltaT, setDeltaT] = useState('50');
  const [volume, setVolume] = useState('1');

  const result = computeThermalExpansion({
    length: Number(length) || 0,
    alpha: Number(alpha) || 0,
    deltaT: Number(deltaT) || 0,
    volume: Number(volume) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Original length (m)" value={length} onChange={setLength} min={0} step="0.1" />
              <NumberField label="Original volume (m³)" value={volume} onChange={setVolume} min={0} step="0.1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField
                label="Expansion coefficient (1/K)"
                value={alpha}
                onChange={setAlpha}
                step="0.000001"
              />
              <NumberField label="Temperature change (K)" value={deltaT} onChange={setDeltaT} step="1" />
            </div>
          </div>
          <Hint>
            Linear expansion is ΔL = L·α·ΔT; isotropic materials expand about three times as much by volume.
            Steel sits near 12 × 10⁻⁶ /K, aluminium near 23 × 10⁻⁶ /K.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Change in length"
            value={`${formatMoney(result.deltaLmm)} mm`}
            sub={`ΔL = L·α·ΔT over ${formatMoney(Number(length) || 0)} m`
            }
          />
          <ResultRows>
            <ResultRow label="Change in length (m)" value={formatMoney(result.deltaL)} />
            <ResultRow label="Volumetric coefficient (1/K)" value={formatMoney(result.beta)} />
            <ResultRow label="Change in volume (L)" value={formatMoney(result.deltaVLitres)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default ThermalExpansionCalculator;
