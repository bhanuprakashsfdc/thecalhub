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

export function AzimuthMilitaryCalculator() {
  const [deg, setDeg] = useState('0');
  const d = Number(deg) || 0;
  const az = ((d % 360) + 360) % 360;
  const mil = az * (6400 / 360);

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Degrees (°)" value={deg} onChange={setDeg} step="0.1" />
          </div>
          <Hint>Military mils: 360° = 6400 mils.</Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Azimuth" value={`${formatMoney(az)}°`} />
          <ResultRows>
            <ResultRow label="Mils" value={formatMoney(mil)} />
            <ResultRow label="Normalized" value={`${formatMoney(az)}°`} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default AzimuthMilitaryCalculator;
