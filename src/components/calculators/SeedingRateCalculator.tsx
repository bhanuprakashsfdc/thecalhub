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

export interface SeedingRateInput {
  areaSqM: number;
  densityPerSqM: number;
  seedWeightMg: number;
  germinationPct: number;
}

export function computeSeedingRate(input: SeedingRateInput) {
  const area = Math.max(0, input.areaSqM);
  const density = Math.max(0, input.densityPerSqM);
  const weight = Math.max(0, input.seedWeightMg);
  const germination = Math.min(100, Math.max(1, input.germinationPct));

  const viablePlants = area * density;
  const seedsToSow = (area * density) / (germination / 100);
  const massKg = (seedsToSow * weight) / 1_000_000;

  return { viablePlants, seedsToSow, massKg };
}

export function SeedingRateCalculator() {
  const [areaSqM, setAreaSqM] = useState('1000');
  const [densityPerSqM, setDensityPerSqM] = useState('40');
  const [seedWeightMg, setSeedWeightMg] = useState('50');
  const [germinationPct, setGerminationPct] = useState('80');

  const result = computeSeedingRate({
    areaSqM: Number(areaSqM) || 0,
    densityPerSqM: Number(densityPerSqM) || 0,
    seedWeightMg: Number(seedWeightMg) || 0,
    germinationPct: Number(germinationPct) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Field area (m²)" value={areaSqM} onChange={setAreaSqM} min={0} />
              <NumberField label="Plants per m²" value={densityPerSqM} onChange={setDensityPerSqM} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Seed weight (mg)" value={seedWeightMg} onChange={setSeedWeightMg} min={0} />
              <NumberField
                label="Germination (%)"
                value={germinationPct}
                onChange={setGerminationPct}
                min={1}
                max={100}
              />
            </div>
          </div>
          <Hint>
            Divide the wanted plant count by the germination percentage to allow for losses, then multiply by
            the thousand-seed weight to get the mass of seed you need to buy.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Seed needed"
            value={`${formatMoney(result.massKg)} kg`}
            sub={`${formatMoney(result.seedsToSow, 0)} seeds to sow`}
          />
          <ResultRows>
            <ResultRow label="Viable plants" value={formatMoney(result.viablePlants, 0)} />
            <ResultRow label="Seeds to sow" value={formatMoney(result.seedsToSow, 0)} />
            <ResultRow label="Field area" value={`${formatMoney(Number(areaSqM) || 0, 0)} m²`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default SeedingRateCalculator;
