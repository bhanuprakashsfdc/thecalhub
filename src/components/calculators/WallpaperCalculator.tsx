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

export interface WallpaperInput {
  perimeterFt: number;
  wallHeightFt: number;
  doors: number;
  windows: number;
  rollCoverageSqFt: number;
}

export function computeWallpaper(input: WallpaperInput) {
  const grossArea = input.perimeterFt * input.wallHeightFt;
  const openings = input.doors * 21 + input.windows * 15;
  const netArea = Math.max(0, grossArea - openings);
  const rolls = Math.ceil((netArea / Math.max(1, input.rollCoverageSqFt)) * 1.1);
  const waste = netArea * 0.1;
  return { grossArea, netArea, rolls, waste };
}

export function WallpaperCalculator() {
  const [perimeterFt, setPerimeterFt] = useState('48');
  const [wallHeightFt, setWallHeightFt] = useState('8');
  const [doors, setDoors] = useState('1');
  const [windows, setWindows] = useState('2');
  const [rollCoverageSqFt, setRollCoverageSqFt] = useState('56');

  const result = computeWallpaper({
    perimeterFt: Number(perimeterFt) || 0,
    wallHeightFt: Number(wallHeightFt) || 0,
    doors: Number(doors) || 0,
    windows: Number(windows) || 0,
    rollCoverageSqFt: Number(rollCoverageSqFt) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Room perimeter (ft)" value={perimeterFt} onChange={setPerimeterFt} min={0} />
            <NumberField label="Wall height (ft)" value={wallHeightFt} onChange={setWallHeightFt} min={0} />
            <NumberField label="Doors (count)" value={doors} onChange={setDoors} min={0} step="1" />
            <NumberField label="Windows (count)" value={windows} onChange={setWindows} min={0} step="1" />
            <NumberField label="Roll coverage (sq ft)" value={rollCoverageSqFt} onChange={setRollCoverageSqFt} min={0} step="1" />
          </div>
          <Hint>
            Net area = perimeter × height − 21 sq ft per door − 15 sq ft
            per window. Rolls include a 10% waste allowance.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Rolls needed" value={String(result.rolls)} sub="Including 10% waste" />
          <ResultRows>
            <ResultRow label="Gross wall area (sq ft)" value={formatMoney(result.grossArea)} />
            <ResultRow label="Net wall area (sq ft)" value={formatMoney(result.netArea)} />
            <ResultRow label="Waste allowance (sq ft)" value={formatMoney(result.waste)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default WallpaperCalculator;
