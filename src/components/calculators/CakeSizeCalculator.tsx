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

const whole = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

export interface CakeSizeInput {
  tier1: number;
  tier2: number;
  tier3: number;
  sliceWidth: number;
  sliceLength: number;
  guests: number;
}

function tierServings(diameter: number, sliceWidth: number, sliceLength: number) {
  const d = Math.max(0, diameter);
  const sliceArea = Math.max(0.01, sliceWidth * sliceLength);
  if (d === 0) return 0;
  const radius = d / 2;
  return Math.floor((Math.PI * radius * radius) / sliceArea);
}

export function computeCakeSize(input: CakeSizeInput) {
  const sliceWidth = Math.max(0.1, input.sliceWidth);
  const sliceLength = Math.max(0.1, input.sliceLength);
  const guests = Math.max(0, input.guests);

  const servings =
    tierServings(input.tier1, sliceWidth, sliceLength) +
    tierServings(input.tier2, sliceWidth, sliceLength) +
    tierServings(input.tier3, sliceWidth, sliceLength);

  const area =
    (Math.PI * Math.pow(Math.max(0, input.tier1) / 2, 2) +
      Math.PI * Math.pow(Math.max(0, input.tier2) / 2, 2) +
      Math.PI * Math.pow(Math.max(0, input.tier3) / 2, 2));

  const cakes = servings > 0 && guests > 0 ? Math.ceil(guests / servings) : 0;
  const perGuest = guests > 0 ? servings / guests : 0;

  return { servings, area, cakes, perGuest };
}

export function CakeSizeCalculator() {
  const [tier1, setTier1] = useState('8');
  const [tier2, setTier2] = useState('6');
  const [tier3, setTier3] = useState('4');
  const [sliceWidth, setSliceWidth] = useState('1.5');
  const [sliceLength, setSliceLength] = useState('2');
  const [guests, setGuests] = useState('50');

  const result = computeCakeSize({
    tier1: Number(tier1) || 0,
    tier2: Number(tier2) || 0,
    tier3: Number(tier3) || 0,
    sliceWidth: Number(sliceWidth) || 0,
    sliceLength: Number(sliceLength) || 0,
    guests: Number(guests) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <NumberField label="Tier 1 (in)" value={tier1} onChange={setTier1} min={0} />
              <NumberField label="Tier 2 (in)" value={tier2} onChange={setTier2} min={0} />
              <NumberField label="Tier 3 (in)" value={tier3} onChange={setTier3} min={0} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Slice width (in)" value={sliceWidth} onChange={setSliceWidth} min={0.1} />
              <NumberField label="Slice length (in)" value={sliceLength} onChange={setSliceLength} min={0.1} />
            </div>
            <NumberField label="Guests" value={guests} onChange={setGuests} min={0} />
          </div>
          <Hint>
            Each tier is a circle divided into slices of your chosen footprint. Wedding slices are usually
            1 × 2 in, party slices 2 × 2 in. Enter 0 for a tier you are not baking.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Servings"
            value={whole(result.servings)}
            sub={`${result.cakes} cake set(s) to serve ${Number(guests) || 0} guests`}
          />
          <ResultRows>
            <ResultRow label="Cake surface" value={`${formatMoney(result.area)} sq in`} />
            <ResultRow label="Servings per guest" value={formatMoney(result.perGuest)} />
            <ResultRow label="Slice footprint" value={`${Number(sliceWidth) || 0} × ${Number(sliceLength) || 0} in`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default CakeSizeCalculator;
