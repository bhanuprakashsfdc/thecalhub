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
} from './kit';

export function computeHashRate({ hashRate, time }: { hashRate: number; time: number }) {
  const total = hashRate * time;
  return { total };
}

export function HashRateCalculator() {
  const [hashRate, setHashRate] = useState('10');
  const [time, setTime] = useState('5');

  const total = hashRate && time ? Number(hashRate) * Number(time) : 0;

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Hashes per second (H/s)" value={hashRate} onChange={setHashRate} min={0} step="0.01" />
            <NumberField label="Time (seconds)" value={time} onChange={setTime} min={0} step="0.01" />
          </div>
          <Hint>Total hashes = hash rate × time.</Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero label="Total Hashes" value={total.toLocaleString('en-US', { maximumFractionDigits: 6 })} />
          <ResultRows>
            <ResultRow label="Total hashes" value={total.toLocaleString('en-US', { maximumFractionDigits: 6 })} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default HashRateCalculator;
