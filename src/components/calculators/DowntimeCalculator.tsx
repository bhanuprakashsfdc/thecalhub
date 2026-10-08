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

export interface DowntimeInput {
  downtimeMinutes: number;
  periodMinutes: number;
  outages: number;
}

export function computeDowntime(input: DowntimeInput) {
  const period = Math.max(0, input.periodMinutes);
  const down = Math.min(Math.max(0, input.downtimeMinutes), period);
  const downtimeHours = down / 60;
  const availability = period > 0 ? ((period - down) / period) * 100 : 0;
  const outages = Math.max(0, input.outages);
  const mtbf = outages > 0 ? (period - down) / 60 / outages : 0;

  return { downtimeHours, availability, mtbf };
}

export function DowntimeCalculator() {
  const [downtimeMinutes, setDowntimeMinutes] = useState('90');
  const [periodMinutes, setPeriodMinutes] = useState('43200');
  const [outages, setOutages] = useState('2');

  const result = computeDowntime({
    downtimeMinutes: Number(downtimeMinutes) || 0,
    periodMinutes: Number(periodMinutes) || 0,
    outages: Number(outages) || 0,
  });

  return (
    <CalcGrid
      inputs={
        <Panel>
          <PanelEyebrow>Inputs</PanelEyebrow>
          <div className="space-y-6">
            <NumberField label="Downtime (minutes)" value={downtimeMinutes} onChange={setDowntimeMinutes} min={0} />
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Period (minutes)" value={periodMinutes} onChange={setPeriodMinutes} min={0} />
              <NumberField label="Number of outages" value={outages} onChange={setOutages} min={0} />
            </div>
          </div>
          <Hint>
            A month is 43,200 minutes, so “90 minutes down” sounds tiny until you express it as availability —
            the number SLAs are actually written against.
          </Hint>
        </Panel>
      }
      results={
        <Panel>
          <PanelEyebrow>Result</PanelEyebrow>
          <ResultHero
            label="Availability"
            value={`${formatMoney(result.availability)}%`}
            sub={`${formatMoney(result.downtimeHours)} hours of downtime`}
          />
          <ResultRows>
            <ResultRow label="Downtime hours" value={formatMoney(result.downtimeHours)} />
            <ResultRow label="MTBF (hours)" value={formatMoney(result.mtbf)} />
          </ResultRows>
        </Panel>
      }
    />
  );
}

export default DowntimeCalculator;
