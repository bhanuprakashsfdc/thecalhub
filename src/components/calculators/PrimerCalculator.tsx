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

export interface PrimerInput {
  wallLengthFt: number;
  wallHeightFt: number;
  wallCount: number;
  openingsSqFt: number;
  coats: number;
  coverageSqFtPerGal: number;
  wastePercent: number;
  pricePerGallon: number;
}

export function computePrimer(input: PrimerInput) {
  const length = Math.max(0, input.wallLengthFt);
  const height = Math.max(0, input.wallHeightFt);
  const count = Math.max(0, Math.floor(input.wallCount));
  const openings = Math.max(0, input.openingsSqFt);
  const coats = Math.max(1, Math.floor(input.coats));
  const coverage = Math.max(1, input.coverageSqFtPerGal);
  const waste = Math.max(0, input.wastePercent);
  const price = Math.max(0, input.pricePerGallon);

  const area = Math.max(0, length * height * count - openings);
  const covered = area * coats * (1 + waste / 100);
  const gallons = covered / coverage;
  const cans = Math.ceil(gallons);
  const cost = gallons * price;

  return { area, covered, gallons, cans, cost };
}

export function PrimerCalculator() {
  const [wallLengthFt, setWallLengthFt] = useState('40');
  const [wallHeightFt, setWallHeightFt] = useState('8');
  const [wallCount, setWallCount] = useState('4');
  const [openingsSqFt, setOpeningsSqFt] = useState('100');
  const [coats, setCoats] = useState('1');
  const [coverageSqFtPerGal, setCoverageSqFtPerGal] = useState('300');
  const [wastePercent, setWastePercent] = useState('10');
  const [pricePerGallon, setPricePerGallon] = useState('28');

  const result = computePrimer({
    wallLengthFt: Number(wallLengthFt) || 0,
    wallHeightFt: Number(wallHeightFt) || 0,
    wallCount: Number(wallCount) || 0,
    openingsSqFt: Number(openingsSqFt) || 0,
    coats: Number(coats) || 0,
    coverageSqFtPerGal: Number(coverageSqFtPerGal) || 0,
    wastePercent: Number(wastePercent) || 0,
    pricePerGallon: Number(pricePerGallon) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Wall length (ft)" value={wallLengthFt} onChange={setWallLengthFt} min={0} />
              <NumberField label="Wall height (ft)" value={wallHeightFt} onChange={setWallHeightFt} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Number of walls" value={wallCount} onChange={setWallCount} min={0} />
              <NumberField label="Doors & windows (sq ft)" value={openingsSqFt} onChange={setOpeningsSqFt} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Coats" value={coats} onChange={setCoats} min={1} />
              <NumberField
                label="Coverage (sq ft/gal)"
                value={coverageSqFtPerGal}
                onChange={setCoverageSqFtPerGal}
                min={1}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Waste (%)" value={wastePercent} onChange={setWastePercent} min={0} />
              <NumberField label="Price per gallon ($)" value={pricePerGallon} onChange={setPricePerGallon} min={0} />
            </div>
          </div>
          <Hint>
            Subtract doors and windows from the wall area, then allow an extra 10 % for rollers and cut-in work.
            Primer coverage is usually better than topcoat coverage on bare drywall.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Primer needed"
            value={`${formatMoney(result.gallons)} gal`}
            sub={`${result.cans} gallon can(s) to buy`}
          />
          <ResultRows>
            <ResultRow label="Cost" value={`$${formatMoney(result.cost)}`} />
            <ResultRow label="Wall area" value={`${formatMoney(result.area)} sq ft`} />
            <ResultRow label="Coated area" value={`${formatMoney(result.covered)} sq ft`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default PrimerCalculator;
