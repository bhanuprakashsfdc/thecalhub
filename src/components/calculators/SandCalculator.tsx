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

export interface SandInput {
  area: number;
  depth: number;
  density: number;
}

export function computeSand(input: SandInput) {
  const volume = input.area * input.depth;
  const mass = volume * input.density;
  const tons = mass / 1000;
  const bags25kg = mass / 25;
  return { volume, mass, tons, bags25kg };
}

export function SandCalculator() {
  const [area, setArea] = useState('10');
  const [depth, setDepth] = useState('0.05');
  const [density, setDensity] = useState('1600');

  const result = useMemo(
    () =>
      computeSand({
        area: Number(area) || 0,
        depth: Number(depth) || 0,
        density: Number(density) || 0,
      }),
    [area, depth, density]
  );

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Area (m²)" value={area} onChange={setArea} min={0} step="1" />
            <NumberField label="Depth (m)" value={depth} onChange={setDepth} min={0} step="0.01" />
            <NumberField label="Density (kg/m³)" value={density} onChange={setDensity} min={0} step="10" />
          </div>
          <Hint>
            Volume = area × depth. Multiply by the bulk density of sand (≈1,600 kg/m³ for dry
            building sand) to get the mass you need to order.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Sand needed"
            value={`${formatMoney(result.mass)} kg`}
            sub={`${formatMoney(result.tons)} tonnes`}
          />
          <ResultRows>
            <ResultRow label="Volume" value={`${formatMoney(result.volume)} m³`} />
            <ResultRow label="Tons" value={formatMoney(result.tons)} />
            <ResultRow label="25 kg bags" value={formatMoney(result.bags25kg)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SandCalculator;