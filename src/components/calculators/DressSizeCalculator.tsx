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

const SIZE_TABLE = [
  { size: 2, bust: 32.5, waist: 24.5, hips: 34.5 },
  { size: 4, bust: 33.5, waist: 25.5, hips: 35.5 },
  { size: 6, bust: 34.5, waist: 26.5, hips: 36.5 },
  { size: 8, bust: 35.5, waist: 27.5, hips: 37.5 },
  { size: 10, bust: 36.5, waist: 28.5, hips: 38.5 },
  { size: 12, bust: 38, waist: 30, hips: 40 },
  { size: 14, bust: 39.5, waist: 31.5, hips: 41.5 },
  { size: 16, bust: 41, waist: 33, hips: 43 },
  { size: 18, bust: 42.5, waist: 34.5, hips: 44.5 },
  { size: 20, bust: 44, waist: 36, hips: 46 },
];

function nearestSize(measurement: number, key: 'bust' | 'waist' | 'hips') {
  let best = SIZE_TABLE[0];
  let bestDiff = Math.abs(SIZE_TABLE[0][key] - measurement);
  for (const row of SIZE_TABLE) {
    const diff = Math.abs(row[key] - measurement);
    if (diff < bestDiff) {
      best = row;
      bestDiff = diff;
    }
  }
  return best.size;
}

export interface DressSizeInput {
  bust: number;
  waist: number;
  hips: number;
}

export function computeDressSize(input: DressSizeInput) {
  const bust = Math.max(0, input.bust);
  const waist = Math.max(0, input.waist);
  const hips = Math.max(0, input.hips);

  const bustSize = nearestSize(bust, 'bust');
  const waistSize = nearestSize(waist, 'waist');
  const hipSize = nearestSize(hips, 'hips');
  const girth = bust + waist + hips;
  const spread = Math.max(bustSize, waistSize, hipSize) - Math.min(bustSize, waistSize, hipSize);
  const note = spread === 0 ? 'All measurements agree' : 'Between sizes — size up';

  return { bustSize, waistSize, hipSize, girth, spread, note, uk: bustSize + 4, eu: bustSize + 28 };
}

export function DressSizeCalculator() {
  const [bust, setBust] = useState('35.5');
  const [waist, setWaist] = useState('27.5');
  const [hips, setHips] = useState('37.5');

  const result = computeDressSize({
    bust: Number(bust) || 0,
    waist: Number(waist) || 0,
    hips: Number(hips) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Bust (in)" value={bust} onChange={setBust} min={0} step="0.25" />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Waist (in)" value={waist} onChange={setWaist} min={0} step="0.25" />
              <NumberField label="Hips (in)" value={hips} onChange={setHips} min={0} step="0.25" />
            </div>
          </div>
          <Hint>
            Measure over underwear at the fullest point of the bust, the natural waist and the widest point of
            the hips. Bridal gowns often run two sizes smaller than ready-to-wear.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="US dress size"
            value={`US ${result.bustSize}`}
            sub={`UK ${result.uk} · EU ${result.eu}`}
          />
          <ResultRows>
            <ResultRow label="Total girth" value={`${formatMoney(result.girth)} in`} />
            <ResultRow label="Waist size" value={`US ${result.waistSize}`} />
            <ResultRow label="Hip size" value={`US ${result.hipSize}`} />
            <ResultRow label="Fit note" value={result.note} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DressSizeCalculator;
