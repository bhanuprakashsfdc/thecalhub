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

export interface DensityInput {
  massKg: number;
  volumeM3: number;
}

export function computeDensity(input: DensityInput) {
  const density =
    input.volumeM3 > 0 ? input.massKg / input.volumeM3 : 0;
  const gramsPerCm3 = density / 1000;
  const specificGravity = density / 1000;
  const massGrams = input.massKg * 1000;
  return { density, gramsPerCm3, specificGravity, massGrams };
}

export function DensityCalculator() {
  const [massKg, setMassKg] = useState('5');
  const [volumeM3, setVolumeM3] = useState('0.002');

  const result = computeDensity({
    massKg: Number(massKg) || 0,
    volumeM3: Number(volumeM3) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Mass (kg)" value={massKg} onChange={setMassKg} min={0} step="any" />
            <NumberField label="Volume (m³)" value={volumeM3} onChange={setVolumeM3} min={0} step="any" />
          </div>
          <Hint>
            Density = mass ÷ volume. Water is 1000 kg/m³, i.e. 1 g/cm³ —
            objects denser than that sink.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Density"
            value={`${formatMoney(result.density)} kg/m³`}
            sub="Mass per unit volume"
          />
          <ResultRows>
            <ResultRow label="Density (g/cm³)" value={formatMoney(result.gramsPerCm3)} />
            <ResultRow label="Specific gravity" value={formatMoney(result.specificGravity)} />
            <ResultRow label="Mass in grams" value={formatMoney(result.massGrams)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DensityCalculator;
