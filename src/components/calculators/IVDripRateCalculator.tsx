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

export interface IVDripInput {
  volume: number;
  hours: number;
  dropFactor: number;
}

export function computeIVDripRate(input: IVDripInput) {
  const totalMinutes = input.hours * 60;
  const dropsPerMinute = totalMinutes > 0 ? (input.volume * input.dropFactor) / totalMinutes : 0;
  const mLPerHour = input.hours > 0 ? input.volume / input.hours : 0;
  const totalDrops = input.volume * input.dropFactor;
  return { totalMinutes, dropsPerMinute, mLPerHour, totalDrops };
}

export function IVDripRateCalculator() {
  const [volume, setVolume] = useState('1000');
  const [hours, setHours] = useState('8');
  const [dropFactor, setDropFactor] = useState('15');

  const result = computeIVDripRate({
    volume: Number(volume) || 0,
    hours: Number(hours) || 0,
    dropFactor: Number(dropFactor) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Volume to infuse (mL)" value={volume} onChange={setVolume} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Infusion time (hours)" value={hours} onChange={setHours} min={0} step="0.5" />
              <NumberField
                label="Drop factor (gtt/mL)"
                value={dropFactor}
                onChange={setDropFactor}
                min={0}
              />
            </div>
          </div>
          <Hint>
            Drop factor is printed on the IV set: 10–20 gtt/mL for macro-drip sets and 60 gtt/mL for micro-drip
            paediatric sets.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Drip rate"
            value={`${formatMoney(result.dropsPerMinute)} gtt/min`}
            sub="Drops per minute to run"
          />
          <ResultRows>
            <ResultRow label="Flow rate (mL/hour)" value={formatMoney(result.mLPerHour)} />
            <ResultRow label="Total drops" value={formatMoney(result.totalDrops)} />
            <ResultRow label="Total infusion minutes" value={formatMoney(result.totalMinutes)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default IVDripRateCalculator;
